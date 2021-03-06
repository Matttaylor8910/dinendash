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
          items: _.filter(_.sortBy(bill.items, 'title'), function (item) {
            return item.names && item.names.includes(name);
          })
        };
        person.subtotal = _(person.items).map('costPerPerson').map(parseFloat).sum().toFixed(2);
        return person;
      });

      bill.subtotal = _(bill.people).map('subtotal').map(parseFloat).sum().toFixed(2);
      bill.total = parseFloat(bill.subtotal) + parseFloat(bill.tax) + parseFloat(bill.tip);

      bill.people = _.map(bill.people, function (person) {
        person.billPercent = parseFloat(person.subtotal) / parseFloat(bill.subtotal);
        person.taxAndTip = ((parseFloat(bill.tax) + parseFloat(bill.tip)) * parseFloat(person.billPercent)).toFixed(2);
        person.total = (parseFloat(person.subtotal) + parseFloat(person.taxAndTip)).toFixed(2);
        return person;
      });

      bill.items = _.reverse(bill.items);

      return bill;
    }
  }
})();