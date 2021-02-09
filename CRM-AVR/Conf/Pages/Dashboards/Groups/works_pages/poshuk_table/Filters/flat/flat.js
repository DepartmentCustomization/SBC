(function () {
    return {
        placeholder: 'Квартира',
        keyValue: 'Id',
        displayValue: 'Name',
        baseQueryOptions: {
            queryCode: 'flat',
            filterColumns: null,
            limit: -1,
            parameterValues: [],
            pageNumber: 1,
            sortColumns: [
                {
                    key: 'Number',
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
