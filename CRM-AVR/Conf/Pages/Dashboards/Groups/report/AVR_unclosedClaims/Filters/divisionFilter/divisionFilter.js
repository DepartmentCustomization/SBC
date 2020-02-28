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
        onClearFilter: function() {
        },
        init: function() {
        },
        initValue: function() {
            this.setDefaultValue('first');
        },
        publishValue(item) {
            let message = {
                name: 'showDivision',
                package: {
                    type: item.value
                }
            }
            this.messageService.publish(message);
        },
        destroy() {
            console.log('Don\'t be an Asshole, delete debuggers after yourself ');
        }
    };
}());
