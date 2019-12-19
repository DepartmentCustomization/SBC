(function () {
  return {
    placeholder: 'Позывной',
    keyValue: 'Id',
    displayValue: 'cars_name',
    baseQueryOptions: {
        queryCode: 'List_Cars',
        filterColumns: null,
        limit: -1,
        parameterValues: [],
        pageNumber: 1,
        sortColumns: [
            {
            key: 'Id',
            value: 0
            }
        ]
    },
    onItemSelect: function(item) {
        this.yourFunctionName(item);
    },
    onClearFilter: function() {
    },
    yourFunctionName: function(item) {
        let message = {
            name: '',
            package: {
                type: item.value
            }
        }
        this.messageService.publish(message);
    }
};
}());
