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
        init: function() {
        },
        initValue:function() {
            let getDataFromLink = window
                .location
                .search
                .replace('?', '')
                .split('&')
                .reduce(
                    function(p, e) {
                        let a = e.split('=');
                        p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                        return p;
                    }, {}
                );
            let defaultValue = {
                dateFrom: new Date(getDataFromLink['dateStart']),
                dateTo: new Date(getDataFromLink['dateEnd'])
            }
            this.setDefaultValue(defaultValue);
        },
        destroy() {
            console.log('Date Filter says Bye!');
        }
    };
}());
