(function() {
    return {
        chartConfig: {
            chart: {
                type: 'area'
            },
            accessibility: {
                description: ''
            },
            title: {
                text: 'Повернуто заявникові за період'
            },
            subtitle: {
            },
            xAxis: {
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            tooltip: {
                pointFormat: '{series.name} <b>{point.y}</b><br/>'
            },
            colors: ['#c9e6e3', '#2CD395', '#A0AFCF','#8F949A'],
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [
            ]
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
                queryCode: 'SAFS_graph_Returned',
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
            const dateIndex = columns.findIndex(c=>c.code === 'date');
            const indicatorValueIndex = columns.findIndex(c=>c.code === 'indicator_value');
            this.chartConfig.xAxis.categories = rows.map(row => this.changeDateTimeValues(row.values[dateIndex]));
            const name = 'Кількість звернень';
            const data = [];
            for(let i = 0; i < rows.length; i++) {
                const counter = rows[i].values[indicatorValueIndex];
                const value = counter === null ? 0 : counter;
                data.push(value);
            }
            this.chartConfig.series.push({name, data});
            this.render();
        }
    };
}());
