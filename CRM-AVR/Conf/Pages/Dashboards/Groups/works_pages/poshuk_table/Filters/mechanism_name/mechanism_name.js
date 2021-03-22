(function () {
    return {
        placeholder: 'Назва техніки у виїзді',
        keyValue: 'Id',
        displayValue: 'Name',
        baseQueryOptions: {
            queryCode: 'mechanism_name',
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
        onItemSelect: function (item) {
            this.yourFunctionName(item);
        },
        onClearFilter: function () {
        },
        yourFunctionName: function (item) {
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
