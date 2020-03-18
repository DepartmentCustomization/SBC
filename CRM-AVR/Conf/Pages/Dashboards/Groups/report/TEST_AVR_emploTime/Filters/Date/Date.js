(function() {
    return {
        placeholder: 'Період',
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
        //debugger;
            let currentDate = new Date();
            // currentMonth =currentDate.getMonth();
            let year = currentDate.getFullYear();
            let monthFrom = currentDate.getMonth();
            let dayFrom = currentDate.getDay()
            // (monthFrom > 0) ? year: --year;
            let defaultValue = {
                dateFrom: new Date(year, --monthFrom, 1),
                dateTo: new Date(year, ++monthFrom , 00)
            }
            this.setDefaultValue(defaultValue);
        },
        destroy() {
            console.log('Date Filter says Bye!');
        }
    }
    ;
}());
