(function() {
    return {
        chartConfig: {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Надійшло звернень з сайту з'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
            },
            yAxis: {},
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [
                {
                    type: 'line',
                    name: 'Кількість',
                    color: '#b0de35',
                    enabled: true,
                    crop: false,
                    order:2,
                    yAxis: 0,
                    justify: 'none',
                    data: [30, 20, 10, 30, 40],
                    dataLabels: {
                        enabled: true,
                        textOutline: false,
                        allowOverlap:false,
                        color: '#000',
                        style: {
                            textOutline: false,
                            fontWeight: '500'
                        }
                    }
                },
                {
                    type: 'line',
                    name: 'Кількість2',
                    color: 'lightblue',
                    enabled: true,
                    crop: false,
                    order:1,
                    yAxis: 0,
                    justify: 'none',
                    data: [30, 20, 10, 30, 40],
                    dataLabels: {
                        enabled: true,
                        textOutline: false,
                        allowOverlap:false,
                        color: '#000',
                        style: {
                            textOutline: false,
                            fontWeight: '500'
                        }
                    }
                }
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
            this.chartConfig.subtitle.text = `${this.dateFrom.toISOString().slice(0,10)} по ${this.dateTo.toISOString().slice(0,10)}`;
            if(this.sendQuery) {
                this.sendQuery = false;
                this.RecalcData();
            }
        },
        init() {
            this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.executeSql, this));
            this.sendQuery = true;
            this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.RecalcData, this));
        },
        RecalcData: function() {
            let executeQuery = {
                queryCode: 'SAFS_graph_Received',
                parameterValues: [
                    {key: '@date_from', value: this.dateFrom},
                    {key: '@date_to', value: this.dateTo}
                ],
                limit: -1
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        load: function(data) {
            let rows = data.rows;
            let columns = data.columns;

            this.chartConfig.xAxis.categories = rows.map(row => row.values[0]);
            for (let i = 0; i <= 1; i++) {
                this.chartConfig.series[i].name = columns[i + 1].name;
                this.chartConfig.series[i].data = rows.map(row => row.values[i + 1]);
            }
            this.render();
        }
    };
}());
