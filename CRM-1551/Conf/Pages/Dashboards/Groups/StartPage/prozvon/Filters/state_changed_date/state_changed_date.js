(function () {
    return {
        placeholder: 'Розглянуто',
        type: 'Date',
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
        }
    };
}());
