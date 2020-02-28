(function () {
  return {
    placeholder: '',
    onItemSelect: function(date) {
        this.yourFunctionName(date);
    },
    yourFunctionName: function(date) {
        let message = {
            name: '',
            package: {
                dateFrom: date.dateFrom,
                dateTo: date.dateTo
            }
        }
        this.messageService.publish(message);
    },
    initValue: function() {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let monthFrom = currentDate.getMonth();
        let dayTo = currentDate.getDate();
        
        let hh = currentDate.getHours();
        let mm = currentDate.getMinutes();
        
        let defaultValue = {
            // dateFrom  поменять месяц на 01
            dateFrom: new Date(year, '10', '01'),
            dateTo: new Date( year, monthFrom, dayTo)
        }
        this.setDefaultValue(defaultValue); 
    },
};
}());
