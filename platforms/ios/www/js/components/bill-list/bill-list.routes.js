(function () {
  angular
    .module('billList')
    .config(billListConfig);

  function billListConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.bill-list', {
        url: '/bill-list',
        views: {
          'content': {
            templateUrl: 'js/components/bill-list/bill-list.tpl.html',
            controller: 'BillListController',
            controllerAs: '$ctrl'
          }
        }
      });

    // If no other routes are matched always default to their bill list
    $urlRouterProvider.otherwise('/bill-list');
  }
})();
