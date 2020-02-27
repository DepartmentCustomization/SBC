(function () {
  return {
    placeholder: 'Організація',
    keyValue: 'Id',
    displayValue: 'Name',
    baseQueryOptions: {
        queryCode: 'List_Organization',
        filterColumns: null,
        limit: -1,
        parameterValues: [],
        pageNumber: 1,
        sortColumns: [
            {
            key: 'Name',
            value: 0
            }
        ]
    },
    onItemSelect: function(item) {
        console.log('Ми вибрали значення з фільтру');
        this.itemFilter(item);
    },
    onClearFilter: function() {
        console.log('Ми відминили фільтер'); 
    },
    itemFilter(item) {
        console.log('Значення котре ми вибрали', item);
        // let message = {
        //     name: 'Org_Filter',
        //     package: {
        //         type: item.value
        //     }
        // }
        // this.messageService.publish(message);
    },
    init: function() {
        // Любые вашие действия
      this.setDefaultValue("first");
    },
    destroy() {
        console.log('Ми покинули данний дашбоард');
    }
};
}());
