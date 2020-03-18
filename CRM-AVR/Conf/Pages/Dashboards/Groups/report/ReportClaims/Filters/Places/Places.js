(function() {
    return {
        placeholder: 'Місце (адреса)',
        keyValue: 'Id',
        displayValue: 'Name',
        baseQueryOptions: {
            queryCode: 'Query_Filter_Places',
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
            let message = {
                name: 'chance_filter_Places',
                value: item
            };
            this.messageService.publish(message);
        },
        onClearFilter: function() {
        },
        init:function() {
        },
        destroy() {
        }
    //initValue: function(){ }
    };
}());
