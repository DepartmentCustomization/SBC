(function () {
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
    init: function(){
        
    },
    initValue:function() {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let monthFrom = currentDate.getMonth();
        
        let defaultValue = {
                dateFrom: new Date(year, monthFrom, 1),
                dateTo: new Date()
            }
            
        this.setDefaultValue(defaultValue);    
    },
    destroy() {
        console.log("Date Filter says Bye!");
    }
};
}());
