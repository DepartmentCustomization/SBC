(function() {
    return {
        placeholder: 'Підрозділ',
        keyValue: 'Id',
        displayValue: 'Short_name',
        baseQueryOptions: {
            queryCode: 'List_Organization',
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
                name: 'showDivision',
                package: {
                    type: item
                }
            }
            this.messageService.publish(message);
        }
    };
}());
