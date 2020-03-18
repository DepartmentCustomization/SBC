(function() {
    return {
        placeholder: 'Період',
        onItemSelect: function(date) {
        //debugger;
            this.pickDate(date);
        },
        pickDate(date) {
            let message = {
                name: 'dateSelector',
                package: {
                    dateFrom: date.dateFrom,
                    dateTo: date.dateTo
                }
            }
            this.messageService.publish(message);
        },
        init:function() {
            let defaultValue = {
                dateFrom: new Date(2018, 0, 1),
                dateTo: new Date()
            }
            this.setDefaultValue(defaultValue);
        },
        destroy() {
            console.log('Date Filter says Bye!');
        }
    };
}());
