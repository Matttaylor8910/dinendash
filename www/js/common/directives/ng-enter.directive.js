(function () {
  angular
    .module('dinendash')
    .directive('ngEnter', ngEnter);

  function ngEnter() {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    }
  }
})();