/**
 * This is a directive that listens for an event
 * to be broadcasted using $scope.$broadcast, then focuses
 * on the input this directive is attached to.
 *
 * Usage in your template:
 *
 *  <input type="text" ng-model="$ctrl.name" focus-on="nameInputSelect">
 *
 * Do the following in your JS when you want to focus on the input above:
 *
 *  $scope.$broadcast('nameInputSelect');
 */
(function () {
  angular
    .module('wca.focusOn', [])
    .directive('focusOn', focusOn);

  function focusOn($timeout) {
    return function (scope, elem, attr) {
      scope.$on(attr.focusOn, function (e) {
        $timeout(function () {
          elem[0].focus();
          elem[0].select();
        });
      });
    };
  }
})();
