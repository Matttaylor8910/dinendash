(function () {
  angular
    .module('addNames')
    .config(addNamesConfig);

  function addNamesConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.add-names', {
        url: '/add-names',
        views: {
          'content': {
            templateUrl: 'js/components/add-names/add-names.tpl.html',
            controller: 'AddNamesController',
            controllerAs: '$ctrl'
          }
        }
      });

    // If no other routes are matched always default to add-names
    $urlRouterProvider.otherwise('/add-names');
  }
})();
