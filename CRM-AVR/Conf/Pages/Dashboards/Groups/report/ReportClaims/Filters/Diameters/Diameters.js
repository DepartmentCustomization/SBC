(function() {
    return {
        placeholder: 'Головний діаметр в заявці',
        keyValue: 'Id',
        displayValue: 'Name',
        baseQueryOptions: {
            queryCode: 'Query_Filter_Diameters',
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
                name: 'chance_filter_Diameters',
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
