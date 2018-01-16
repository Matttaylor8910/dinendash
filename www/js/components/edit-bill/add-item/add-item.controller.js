(function () {
  angular
    .module('editBill')
    .controller('AddItemController', AddItemController);

  function AddItemController($scope, $rootScope, $ionicScrollDelegate, editBillService, itemService) {
    var $ctrl = this;

    $ctrl.newItem = newItem();
    $ctrl.editing = false;
    $ctrl.editBillService = editBillService;

    $ctrl.saveItem = saveItem;
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