(function () {
  angular
    .module('editBill')
    .factory('itemService', itemService);

  function itemService(editBillService, billService) {
    var service = {
      selectedItem: undefined,

      addItem: addItem,
      updateItem: updateItem,
      removeItem: removeItem,
      selectItem: selectItem
    };

    return service;

    function addItem(item) {
      removeFields(item);
      billService.addItemToBill(editBillService.selectedBill.key, item);
    }

    function updateItem(item) {
      removeFields(item);
      billService.updateItemOnBill(editBillService.selectedBill.key, item);
    }

    function removeItem(item) {
      billService.removeItemOnBill(editBillService.selectedBill.key, item)
    }

    function selectItem(item) {
      service.selectedItem = item;
    }

    function removeFields(item) {
      delete item.costPerPerson;
      delete item.shared;
    }
  }
})();