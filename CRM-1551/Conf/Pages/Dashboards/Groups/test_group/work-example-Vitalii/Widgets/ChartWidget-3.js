(function() {
    return {
        chartConfig: {
            chart: {
                type: 'area',
                zoomType: 'x',
                panning: true,
                panKey: 'shift',
                scrollablePlotArea: {
                    minWidth: 600
                }
            },
            caption: {
                text: ''
            },
            title: {
                text: 'Повернуто заявникові за період'
            },

            subtitle: {
                text: ''
            },
            accessibility: {
                description: ''
            },
            credits: {
                enabled: false
            },
            annotations: [{
                labelOptions: {
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    verticalAlign: 'top',
                    y: 15
                },
                labels: [{
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: 27.98,
                        y: 255
                    },
                    text: 'Arbois'
                }, {
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: 45.5,
                        y: 611
                    },
                    text: 'Montrond'
                }, {
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: 63,
                        y: 651
                    },
                    text: 'Mont-sur-Monnet'
                }, {
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: 84,
                        y: 789
                    },
                    x: -10,
                    text: 'Bonlieu'
                }, {
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: 129.5,
                        y: 382
                    },
                    text: 'Chassal'
                }, {
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: 159,
                        y: 443
                    },
                    text: 'Saint-Claude'
                }]
            }, {
                labels: [{
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: 101.44,
                        y: 1026
                    },
                    x: -30,
                    text: 'Col de la Joux'
                }, {
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: 138.5,
                        y: 748
                    },
                    text: 'Côte de Viry'
                }, {
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: 176.4,
                        y: 1202
                    },
                    text: 'Montée de la Combe<br>de Laisia Les Molunes'
                }]
            }, {
                labelOptions: {
                    shape: 'connector',
                    align: 'right',
                    justify: false,
                    crop: true,
                    style: {
                        fontSize: '0.8em',
                        textOutline: '1px white'
                    }
                }
            }],
            xAxis: {
                labels: {
                    format: '{value} km'
                },
                minRange: 5,
                title: {
                    text: 'Distance'
                },
                accessibility: {
                    rangeDescription: 'Range: 0 to 187.8km.'
                }
            },
            yAxis: {
                startOnTick: true,
                endOnTick: false,
                maxPadding: 0.35,
                title: {
                    text: null
                },
                labels: {
                    format: '{value} m'
                }
            },
            tooltip: {
                headerFormat: 'Distance: {point.x:.1f} km<br>',
                pointFormat: '{point.y} m a. s. l.',
                shared: true
            },
            legend: {
                enabled: false
            },
            series: [{
                accessibility: {
                    keyboardNavigation: {
                        enabled: false
                    }
                },
                fillOpacity: 0.5,
                name: 'Elevation',
                marker: {
                    enabled: false
                },
                threshold: null
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
            this.chartConfig.subtitle.text = `${this.dateFrom.toISOString().slice(0,10)} по ${this.dateTo.toISOString().slice(0,10)}`;
            if(this.sendQuery) {
                this.sendQuery = false;
                this.RecalcData()
            }
        },
        init() {
            this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.executeSql, this));
            this.sendQuery = true;
            this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.RecalcData, this));
        },
        RecalcData: function() {
            let executeQuery = {
                queryCode: 'SAFS_graph_Returned',
                parameterValues: [{key: '@date_from', value: this.dateFrom},
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
                this.chartConfig.series[0].name = columns[i + 1].name;
                this.chartConfig.series[0].data = rows.map(row => row.values[i + 1]);
            }
            this.render()
        }
    };
}());
