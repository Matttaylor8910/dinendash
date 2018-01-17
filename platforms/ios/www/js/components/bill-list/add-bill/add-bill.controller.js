(function () {
  angular
    .module('billList')
    .controller('AddBillController', AddBillController);

  function AddBillController($scope, billService) {
    var $ctrl = this;

    $ctrl.newBill = newBill();
    $ctrl.currentName = '';

    $ctrl.addName = addName;
    $ctrl.updateName = updateName;
    $ctrl.selectNameInput = selectNameInput;
    $ctrl.addBill = addBill;

    function addName() {
      if ($ctrl.currentName.length === 0) return;

      $ctrl.newBill.names.push($ctrl.currentName);
      $ctrl.currentName = '';
      selectNameInput();
    }

    function updateName(name, index) {
      $ctrl.newBill.names[index] = name;
    }

    function selectNameInput() {
      $scope.$broadcast('nameInputSelect');
    }

    function addBill() {
      billService.addBill($ctrl.newBill);
      $ctrl.newBill = newBill();
      $scope.modal.hide();
    }

    function newBill() {
      return {
        restaurant: '',
        currency: 'USD',
        names: [],
        total: 0,
        tax: 0,
        tip: 0
      };
    }
  }
})();