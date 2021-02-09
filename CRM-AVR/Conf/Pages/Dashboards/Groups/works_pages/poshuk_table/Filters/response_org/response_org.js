(function () {
    return {
        placeholder: 'Підрозділ',
        keyValue: 'Id',
        displayValue: 'Name',
        baseQueryOptions: {
            queryCode: 'response_org',
            filterColumns: null,
            limit: -1,
            parameterValues: [],
            pageNumber: 1,
            sortColumns: [
                {
                    key: 'Short_Name',
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
