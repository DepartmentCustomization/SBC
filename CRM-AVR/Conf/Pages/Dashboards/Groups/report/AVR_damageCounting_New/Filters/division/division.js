(function() {
    return {
        placeholder: 'Підрозділ',
        keyValue: 'Id',
        displayValue: 'Short_name',
        baseQueryOptions: {
            queryCode: 'List_Organization_WithTypeAccess',
            filterColumns: null,
            limit: -1,
            parameterValues: [
                {
                    'key': '@typeAccessId',
                    'value': null
                }
            ],
            pageNumber: 1,
            sortColumns: [
                {
                    key: 'Id',
                    value: 0
                }
            ]
        },
        init: function() {
            this.sub = this.messageService.subscribe('showAccess', this.setAccess, this);
        },
        onItemSelect: function() {},
        setAccess: function(message) {
            this.globalFilterValues[1].value = [];
            let param;
            if (message.package.type) {
                param = message.package.type.value;
            } else {
                param = null;
            }
            this.baseQueryOptions.parameterValues = [{
                'key': '@typeAccessId',
                'value': param
            }]
        },
        destroy: function() {
            this.sub.unsubscribe();
        }
    };
}());
