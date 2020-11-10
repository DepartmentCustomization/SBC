(function() {
    return {
        placeholder: 'Напрямок',
        keyValue: 'Id',
        displayValue: 'Name',
        baseQueryOptions: {
            queryCode: 'List_AccessTypes',
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
            this.publishValue(item);
        },
        publishValue(item) {
            let message = {
                name: 'showAccess',
                package: {
                    type: item
                }
            }
            this.messageService.publish(message);
        }
    };
}());
