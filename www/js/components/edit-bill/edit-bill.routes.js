(function () {
  angular
    .module('editBill')
    .config(editBillConfig);

  function editBillConfig($stateProvider) {
    $stateProvider
      .state('app.edit-bill', {
        url: '/edit-bill/:key',
        views: {
          'content': {
            templateUrl: 'js/components/edit-bill/edit-bill.tpl.html',
            controller: 'EditBillController',
            controllerAs: '$ctrl'
          }
        }
      });
  }
})();
