(function() {
    return {
        chartConfig: {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Кількість звернень зареєстровано модератором за період'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: []
        },
        executeSql: function(message) {
            function checkDateFrom(val) {
                return val ? val.dateFrom : null;
            }
            function checkDateTo(val) {
                return val ? val.dateTo : null;
            }
            if (message.package.value.values.find(f => f.name === 'DateAndTime').value) {
                this.dateFrom = checkDateFrom(message.package.value.values.find(f => f.name === 'DateAndTime').value);
            }
            if (message.package.value.values.find(f => f.name === 'DateAndTime').value) {
                this.dateTo = checkDateTo(message.package.value.values.find(f => f.name === 'DateAndTime').value);
            }
            this.chartConfig.subtitle.text = `${this.changeDateTimeValues(this.dateFrom)} по ${this.changeDateTimeValues(this.dateTo)}`;
            if(this.sendQuery) {
                this.sendQuery = false;
                this.recalcData()
            }

        },
        init() {
            this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.executeSql, this));
            this.sendQuery = true;
            this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.recalcData, this));
        },
        recalcData: function() {
            let executeQuery = {
                queryCode: 'SAFS_graph_Registered',
                parameterValues: [{key: '@date_from', value: this.dateFrom},
                    {key: '@date_to', value: this.dateTo}
                ],
                limit: -1
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        changeDateTimeValues: function(value) {
            let date = new Date(value);
            let dd = date.getDate().toString();
            let mm = (date.getMonth() + 1).toString();
            let yyyy = date.getFullYear().toString();
            dd = dd.length === 1 ? '0' + dd : dd;
            mm = mm.length === 1 ? '0' + mm : mm;
            return `${dd}.${mm}.${yyyy}`;
        },
        load: function(params) {
            this.chartConfig.series = [];
            let rows = params.rows;
            let columns = params.columns;
            const userNameIndex = columns.findIndex(c=>c.code === 'user_name');
            const userNameArr = rows.map(e=>e.values[userNameIndex]);
            const indicatorValueIndex = columns.findIndex(c=>c.code === 'indicator_value');
            const sortedUsers = [...new Set(userNameArr)];
            const dateIndex = columns.findIndex(c=>c.code === 'date');
            this.chartConfig.xAxis.categories = rows.map(row => this.changeDateTimeValues(row.values[dateIndex]));
            sortedUsers.forEach(name=>{
                const data = rows.map(elem=>{
                    let value = 0;
                    if(elem.values.includes(name)) {
                        value = elem.values[indicatorValueIndex]
                    }
                    return value
                })
                this.chartConfig.series.push({name,data});
            })
            this.render()
        }
    };
}());
