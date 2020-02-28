(function() {
    return {
        placeholder: 'Період',
        onItemSelect: function(date) {
        //debugger;
            this.pickDate(date);
        },
        pickDate(date) {
        // debugger;
            let message = {
                name: 'dateSelector',
                package: {
                    dateFrom: date.dateFrom,
                    dateTo: date.dateTo
                }
            }
            this.messageService.publish(message);
        },
        init: function() {
        },
        initValue:function() {
            let currentDate = new Date();
            let yearFrom = currentDate.getFullYear();
            let month = currentDate.getMonth();
            let defaultValue = {
                dateFrom: new Date(yearFrom, month, 1),
                dateTo: new Date()
            }
            this.setDefaultValue(defaultValue);
        },
        destroy() {
            console.log('Date Filter says Bye!');
        }
    };
}());
