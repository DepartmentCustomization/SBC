(function () {
  return {
        chartConfig: {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Якість даних заявника, отриманих з сайту за період'
            },
            subtitle:{
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Chrome',
                    y: 61.41,
                }, {
                    name: 'Internet Explorer',
                    y: 11.84
                }, {
                    name: 'Firefox',
                    y: 10.85
                }, {
                    name: 'Edge',
                    y: 4.67
                }, {
                    name: 'Safari',
                    y: 4.18
                }, {
                    name: 'Other',
                    y: 7.05
                }]
            }]
        },
        executeSql: function(message) {
            function checkDateFrom(val) {
                return val ? val.dateFrom : null;
            }
            function checkDateTo(val) {
                return val ? val.dateTo : null;
            }

            if (message.package.value.values.find(f => f.name === 'DateAndTime').value) {
                this.start_date = checkDateFrom(message.package.value.values.find(f => f.name === 'DateAndTime').value);
            }
            if (message.package.value.values.find(f => f.name === 'DateAndTime').value) {
                this.finish_date = checkDateTo(message.package.value.values.find(f => f.name === 'DateAndTime').value);
            }
            this.chartConfig.subtitle.text = `${this.start_date.toISOString().slice(0,10)} по ${this.finish_date.toISOString().slice(0,10)}`
        },
        init() {
            this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.executeSql, this));
            this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.RecalcData, this));
            let DateMinusWeek = new Date();
            DateMinusWeek.setDate(DateMinusWeek.getDate() - 0);
            this.start_date = DateMinusWeek;
            this.finish_date = new Date();

            let executeQuery = {
                queryCode: 'SAFS_graph_Quality',
                parameterValues: [{key: "@date_from", value: this.start_date},
                                    {key: "@date_to", value: this.finish_date}
                                    ],
                limit: -1
            };
            this.queryExecutor(executeQuery, this.load, this);


        },
        RecalcData: function() {
            let executeQuery = {
                queryCode: 'SAFS_graph_Quality',
                parameterValues: [{key: "@date_from", value: this.start_date},
                                    {key: "@date_to", value: this.finish_date}
                                ],
                limit: -1
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        load: function(data) {
            let rows = data.rows;
            let columns = data.columns;
            this.chartConfig.series[0].data = [];
            if(rows.length > 0) {
            const newArr = rows.map(elem=>{
                    const num = elem.values[2]
                    const arr = {
                        name: `${elem.values[1]}`,
                        y: elem.values[2]
                    }
                
                    return arr
                    
                })
            this.chartConfig.series[0].data = newArr
           
            }
            
                

            
            this.render(); 
        }

    };
}());
