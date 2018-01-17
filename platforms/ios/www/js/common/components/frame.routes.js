(function () {
  angular
    .module('dinendash')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'js/common/components/frame.tpl.html'
      });
  }
})();
