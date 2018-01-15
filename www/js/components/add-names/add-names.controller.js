(function () {
  angular
    .module('addNames')
    .controller('AddNamesController', AddNamesController);

  function AddNamesController() {
    var $ctrl = this;

    $ctrl.text = 'Hello World';
  }
})();