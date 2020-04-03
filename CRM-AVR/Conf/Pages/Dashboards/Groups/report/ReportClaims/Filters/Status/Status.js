(function() {
    return {
        placeholder: 'Стан',
        keyValue: 'Id',
        displayValue: 'Name',
        baseQueryOptions: {
            queryCode: 'Query_Filter_Status',
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
                name: 'chance_filter_Status',
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
