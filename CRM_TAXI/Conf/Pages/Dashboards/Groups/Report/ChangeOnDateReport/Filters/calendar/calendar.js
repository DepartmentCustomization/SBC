(function () {
    return {
        placeholder: 'Дата',
        minDate: null,
        maxDate: null,
        showTime: false,
        showSeconds: false,
        hourFormat: 24,
        showButtonBar: false,
        numberOfMonths: 1,
        dateFormat: 'dd.mm.yy',
        monthNavigator: false,
        yearNavigator: false,
        yearRange: null,
        timeOnly: false,
        readonlyInput: null,
        view: 'date',
        type: 'Date',
        disabledDays: null,
        disabledDates: null,
        onItemSelect: function (date) {
            this.yourFunctionName(date);
        },
        initValue: function () {
            let calendar = new Date(Date.now())
            this.setDefaultValue(calendar);
        },
        yourFunctionName: function (value) {
            let message = {
                name: '',
                package: {
                    value: value
                }
            }
            this.messageService.publish(message);
        }
    };
}());
