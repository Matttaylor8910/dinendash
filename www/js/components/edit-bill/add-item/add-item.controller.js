(function () {
  angular
    .module('editBill')
    .controller('AddItemController', AddItemController);

  function AddItemController($scope, $rootScope, $ionicPopup, $ionicScrollDelegate, editBillService, itemService) {
    var $ctrl = this;

    $ctrl.newItem = newItem();
    $ctrl.editing = false;
    $ctrl.editBillService = editBillService;

    $ctrl.saveItem = saveItem;
    $ctrl.removeItem = confirmRemove;
    $ctrl.selectPerson = selectPerson;
    $ctrl.recalculateSharedCost = recalculateSharedCost;

    init();
    $rootScope.$on('billSelected', init);
    $scope.$on('modal.shown', checkForSelection);

    function init() {
      if (editBillService.selectedBill) {
        $ctrl.people = _.map(editBillService.selectedBill.names, function (name) {
          return {
            name: name,
            selected: false
          };
        });
        $ionicScrollDelegate.resize();
      }
    }

    function checkForSelection() {
      if (itemService.selectedItem) {
        $ctrl.newItem = _.extend(newItem(), itemService.selectedItem);
      }
      else {
        $ctrl.newItem = newItem();
      }

      // redetermine the checked people
      _.each($ctrl.people, function (person) {
        person.selected = $ctrl.newItem.names.includes(person.name);
      });
      $ctrl.editing = !_.isUndefined($ctrl.newItem.key);
    }

    function saveItem() {
      if ($ctrl.editing) {
        itemService.updateItem($ctrl.newItem);
      }
      else {
        itemService.addItem($ctrl.newItem);
      }

      $scope.modal.hide();
    }

    function confirmRemove() {
      var itemToRemove = $ctrl.newItem.title || 'this item';
      $ionicPopup.confirm({
        title: 'Remove ' + itemToRemove,
        template: '<div class="text-center">Do you really want to remove <strong>' + itemToRemove  +'</strong>?</div>',
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Remove',
            type: 'button-assertive',
            onTap: removeItem
          }
        ]
      });
    }

    function removeItem() {
      itemService.removeItem($ctrl.newItem);
      $scope.modal.hide();
    }

    function selectPerson(person) {
      person.selected = !person.selected;
      $ctrl.newItem.names = _.map(_.filter($ctrl.people, 'selected'), 'name');

      recalculateSharedCost();
    }

    function recalculateSharedCost() {
      $ctrl.newItem.shared = parseFloat($ctrl.newItem.quantity) === 1 && $ctrl.newItem.names && $ctrl.newItem.names.length > 1;
      if ($ctrl.newItem.shared && $ctrl.newItem.cost) {
        $ctrl.newItem.costPerPerson = (parseFloat($ctrl.newItem.cost) / $ctrl.newItem.names.length).toFixed(2);
      }
      else {
        $ctrl.newItem.costPerPerson = undefined;
      }
    }

    function newItem() {
      return {
        title: '',
        quantity: 1,
        cost: '',
        names: []
      }
    }
  }
})();