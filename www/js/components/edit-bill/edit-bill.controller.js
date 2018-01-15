(function () {
  angular
    .module('editBill', [])
    .controller('EditBillController', EditBillController);

  function EditBillController($scope, billService) {
    var $ctrl = this;

    $ctrl.tabs = ['Items', 'People'];
    $ctrl.billService = billService;

    $ctrl.selectTab = selectTab;

    $scope.$on('$ionicView.beforeEnter', init);

    function init() {
      selectTab($ctrl.tabs[0]);
    }

    function selectTab(tab) {
      $ctrl.selectedTab = tab;
    }
  }
})();