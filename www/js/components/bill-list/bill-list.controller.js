(function () {
  angular
    .module('billList', [])
    .controller('BillListController', BillListController);

  function BillListController($scope, $state, $ionicModal, billService) {
    var $ctrl = this;

    $ctrl.billList = billService;
    $ctrl.selectBill = selectBill;

    init();

    function init() {
      // share the controller's scope and set up a modal to add bills
      $ionicModal.fromTemplateUrl('js/components/bill-list/add-bill/add-bill.modal.html', {
        scope: $scope
      }).then(function (modal) {
        $scope.modal = modal;
      })
    }

    function selectBill(bill) {
      billService.selectBill(bill);
      $state.go('app.edit-bill', {key: bill.key});
    }
  }
})();