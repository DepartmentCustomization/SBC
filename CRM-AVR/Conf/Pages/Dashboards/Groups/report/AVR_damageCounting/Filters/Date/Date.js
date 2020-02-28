(function() {
    return {
        placeholder: '',
        onItemSelect: function(date) {
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
        },
        initValue: function() {
            let currentDate = new Date();
            let year = currentDate.getFullYear();
            let month = currentDate.getMonth();
            let defaultValue = {
                dateFrom: new Date(year, month, 1),
                dateTo: new Date()
            }
            this.setDefaultValue(defaultValue);
        },
        destroy() {
            console.log('Date Filter says Bye!');
        }
    };
}());
