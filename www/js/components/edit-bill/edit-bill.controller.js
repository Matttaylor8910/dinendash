(function () {
  angular
    .module('editBill', [])
    .controller('EditBillController', EditBillController);

  function EditBillController($scope, $state, $ionicModal, $ionicScrollDelegate, editBillService, itemService) {
    var $ctrl = this;

    $ctrl.tabs = ['Items', 'People'];
    $ctrl.editBillService = editBillService;

    $ctrl.updateBill = updateBill;
    $ctrl.selectTab = selectTab;
    $ctrl.openModal = openModal;
    $ctrl.openModalWithItem = openModalWithItem;
    $ctrl.openModalWithPerson = openModalWithPerson;

    $scope.$on('$ionicView.beforeEnter', init);

    function init() {
      selectTab($state.params.tab || $ctrl.tabs[0]);

      // share the controller's scope and set up a modal to add bills
      $ionicModal.fromTemplateUrl('js/components/edit-bill/add-item/add-item.modal.html', {
        scope: $scope
      }).then(function (modal) {
        $scope.modal = modal;
      })
    }

    function updateBill() {
      console.log(editBillService.selectedBill);
    }

    function selectTab(tab) {
      $ctrl.selectedTab = tab;
      $state.go('app.edit-bill', {tab: tab}, {notify: false});
      $ionicScrollDelegate.resize();
    }

    function openModal($event) {
      itemService.selectItem(undefined);
      $scope.modal.show($event);
    }

    function openModalWithItem(item, $event) {
      itemService.selectItem(item);
      $scope.modal.show($event);
    }

    function openModalWithPerson(person, $event) {
      itemService.selectItem({
        names: [person.name]
      });
      $scope.modal.show($event);
    }
  }
})();