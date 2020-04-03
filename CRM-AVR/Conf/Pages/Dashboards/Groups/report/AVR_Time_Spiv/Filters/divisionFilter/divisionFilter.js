(function() {
    return {
        placeholder: 'Організації',
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
        // debugger;
        },
        publishValue(item) {
        //debugger
            let message = {
                name: 'showDivision',
                package: {
                    type: item.value
                }
            }
            this.messageService.publish(message);
        },
        init:function() {
        },
        initValue: function() {
            this.setDefaultValue('first');
        },
        destroy() {
            console.log('Kastular-Filter says Bye!comment all your debuggers');
        }
    };
}());
