(function () {
  angular
    .module('dinendash')
    .factory('billService', billService);

  function billService($state, $rootScope, $firebaseArray, firebaseService) {
    var billsRef;
    var billsCollection;

    var service = {
      bills: undefined,
      selectedBill: undefined,

      addBill: addBill,
      selectBill: selectBill
    };

    init();

    return service;

    function init() {
      billsRef = firebaseService.dbRef.ref('bills');
      billsCollection = $firebaseArray(billsRef);
      billsRef.on('value', function (snapshot) {
        service.bills = mapBills(firebaseService.snapshotToArray(snapshot));
        if ($state.params.key) {
          service.selectedBill = _.find(service.bills, {key: $state.params.key});
        }
        $rootScope.$emit('firebase.billsUpdated');
      });
    }

    function mapBills(bills) {
      return _.map(bills, function (bill) {
        bill.items = bill.items || [];
        return bill;
      })
    }

    function addBill(bill) {
      billsCollection.$add(bill);
    }

    function selectBill(bill) {
      service.selectedBill = bill;
    }
  }
})();
