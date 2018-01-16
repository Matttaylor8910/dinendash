(function () {
  angular
    .module('editBill')
    .factory('editBillService', editBillService);

  function editBillService($rootScope, $state, billService) {
    var service = {
      selectedBill: undefined,

      selectBill: selectBill
    };

    $rootScope.$on('billsUpdated', selectBill);

    return service;

    function selectBill(bill) {
      if (bill && bill.restaurant) {
        service.selectedBill = mapBill(bill);
      }
      else if ($state.params.key) {
        service.selectedBill = mapBill(billService.getBill($state.params.key));
      }
      else {
        console.log('SHITS FUCKED');
        return;
      }

      $rootScope.$broadcast('billSelected');
    }

    function mapBill(bill) {
      // generate objects for the people
      bill.people = _.map(bill.names, function (name) {
        var person = {
          name: name,
          // map their items to them
          items: _.filter(bill.items, function (item) {
            return item.names && item.names.includes(name);
          })
        };
        person.total = _(person.items).map('costPerPerson').map(parseFloat).sum().toFixed(2);
        return person;
      });

      return bill;
    }
  }
})();