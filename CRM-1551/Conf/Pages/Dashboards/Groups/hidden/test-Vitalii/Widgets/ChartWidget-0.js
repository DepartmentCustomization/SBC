(function() {
    return {
        chartConfig: {
            title: {
                text: 'Combination chart'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
            },
            labels: {
                items: [{
                    html: 'Total fruit consumption',
                    style: {
                        left: '50px',
                        top: '18px',
                        color:  'black'
                    }
                }]
            },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    point: {
                        events: {
                            select: function(event) {
                                let chart = event.target.series.chart;
                                let text = event.target.options.y
                                chart.lbl = chart.renderer.label(text, 100, 70)
                                    .attr({
                                        padding: 10,
                                        r: 5,
                                        fill: 'grey',
                                        zIndex: 5
                                    })
                                    .css({
                                        color: '#FFFFFF'
                                    })
                                    .add();
                            }
                        }
                    }
                }
            },
            series: [{
                type: 'column',
                name: 'Jane',
                data: [3, 2, 1, 3, 4]
            }, {
                type: 'column',
                name: 'John',
                data: [2, 3, 5, 7, 6]
            }, {
                type: 'column',
                name: 'Joe',
                data: [4, 3, 3, 9, 0]
            }, {
                type: 'spline',
                name: 'Average',
                data: [3, 2.67, 3, 6.33, 3.33],
                marker: {
                    lineWidth: 2,
                    lineColor: 'black',
                    fillColor: 'white'
                }
            }, {
                type: 'pie',
                name: 'Total consumption',
                data: [{
                    name: 'Jane',
                    y: 13,
                    color: 'green'
                }, {
                    name: 'John',
                    y: 23,
                    color: 'red'
                }, {
                    name: 'Joe',
                    y: 19,
                    color: 'grey'
                }],
                center: [100, 80],
                size: 100,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
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
                this.dateFrom = checkDateFrom(message.package.value.values.find(f => f.name === 'DateAndTime').value);
            }
            if (message.package.value.values.find(f => f.name === 'DateAndTime').value) {
                this.dateTo = checkDateTo(message.package.value.values.find(f => f.name === 'DateAndTime').value);
            }
            this.chartConfig.subtitle.text = `${this.changeDateTimeValues(this.dateFrom)} по ${this.changeDateTimeValues(this.dateTo)}`;
            if(this.sendQuery) {
                this.sendQuery = false;
                this.recalcData();
            }
        },
        init() {
            this.messageService.subscribe('showValue', this.changeValue, this);
            this.load()
        },
        changeValue(message) {
            this.chartConfig.series[0].data[0] = message.package.value;
            this.render();
        },
        load: function() {
            this.render()
        }
    };
}());
