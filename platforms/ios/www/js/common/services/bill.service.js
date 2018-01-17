(function () {
  angular
    .module('dinendash')
    .factory('billService', billService);

  function billService($state, $rootScope, $firebaseArray, firebaseService) {
    var billsRef;
    var billsCollection;

    var service = {
      bills: undefined,

      addBill: addBill,
      getBill: getBill,

      addItemToBill: addItemToBill,
      updateItemOnBill: updateItemOnBill,
      removeItemOnBill: removeItemOnBill
    };

    init();

    return service;

    function init() {
      billsRef = firebaseService.dbRef.ref('bills');
      billsCollection = $firebaseArray(billsRef);
      billsRef.on('value', function (snapshot) {
        service.bills = mapBills(firebaseService.snapshotToArray(snapshot));
        $rootScope.$broadcast('billsUpdated');
      });
    }

    function mapBills(bills) {
      return _.map(bills, function (bill) {
        bill.names = _.sortBy(bill.names);
        bill.items = _.map(bill.items, function (item, index) {
          item.key = index;
          item.cost = item.cost ? parseFloat(item.cost).toFixed(2) : 0;
          item.names = item.names || [];
          item.shared = parseFloat(item.quantity) === 1 && item.names.length > 1;
          if (item.shared) {
            item.costPerPerson = (parseFloat(item.cost) / item.names.length).toFixed(2);
          }
          else {
            item.costPerPerson = item.cost;
          }
          return item;
        });
        bill.total = _(bill.items).map('cost').map(parseFloat).sum().toFixed(2);
        return bill;
      })
    }

    function addBill(bill) {
      billsCollection.$add(bill);
    }

    function getBill(key) {
      return _.find(service.bills, {key: key});
    }

    function addItemToBill(key, item) {
      var index = billsCollection.$indexFor(key);
      if (index >= 0 && item) {
        // initialize the array if it's not there yet
        var array = billsCollection[index].items || [];
        billsCollection[index].items = array.concat([item]);
      }
      billsCollection.$save(index);
    }

    function updateItemOnBill(key, item) {
      var index = billsCollection.$indexFor(key);
      if (index >= 0 && item && item.key >= 0) {
        var key = item.key;
        delete item.key;
        billsCollection[index].items[key] = item;
      }
      billsCollection.$save(index);
    }

    function removeItemOnBill(key, item) {
      var index = billsCollection.$indexFor(key);
      if (index >= 0 && item && item.key >= 0) {
        billsCollection[index].items.splice(item.key, 1);
      }
      billsCollection.$save(index);
    }
  }
})();
