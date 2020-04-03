(function() {
    return {
        init: function() {
            let executeQuery = {
                queryCode: 'Work_time_of_employees',
                parameterValues: [{key: '@start_date', value: new Date(2018, 1, 1)},{key: 'finish_date', value: new Date() }, {key: '@name', value: '%' }]
            };
            this.getPageValues(executeQuery, this.load, this);
        // debugger;
        },
        load: function(data) {
        // debugger;
        }
    };
}());
