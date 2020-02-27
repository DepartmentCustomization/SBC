(function () {
  return {
    placeholder: '',
    onItemSelect: function(date) {
        this.yourFunctionName(date);
    },
    yourFunctionName(date) {
        let message = {
            name: '',
            package: {
                dateFrom: date.dateFrom,
                dateTo: date.dateTo
            }
        }
        this.messageService.publish(message);
    }
};
}());
