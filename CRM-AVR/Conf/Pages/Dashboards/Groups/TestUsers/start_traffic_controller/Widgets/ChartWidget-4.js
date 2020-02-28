(function() {
    return {
        chartConfig: {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Поточний стан відкритих заявок по організаціям'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>',
                        style: {
                            color: 'black'
                        }
                    }
                },
                series: {
                    allowPointSelect: true,
                    point: {}
                }
            },
            series: []
        },
        init: function() {
            // this.sub = this.messageService.subscribe('showThisTeamMembers', this.showColumnsGraphics);
            let loadPie = {
                queryCode: 'pie_OrgName_CentralControlRoom'
            };
            this.queryExecutor(loadPie, this.load, this);
            document.getElementById('chart_schedule_current_status').style.display = 'none';
            this.render();
            this.sub = this.messageService.subscribe('showPie', this.foo, this);
            let executeQuery = {
                queryCode: 'chart_Shift_count_people',
                limit: -1,
                parameterValues: []
            };
            // this.queryExecutor(executeQuery, this.load, this);
            this.sub1 = this.messageService.subscribe('tabsClick', this.showTable);
        },
        showTable: function(message) {
            if(message.value != 'btn_schedule') {
                document.getElementById('chart_schedule_current_status').style.display = 'none';
            }else{
                document.getElementById('chart_schedule_current_status').style.display = 'block';
            }
        },
        foo: function(message) {
            document.getElementById('result_brigad').style.display = 'none';
            document.getElementById('pei_brigad').style.display = 'block';
        },
        load: function(data, options) {
            this.title = ' ';
            let series = this.chartConfig.series;
            this.seriesData = [];
            for(let i = 0; i < data.rows.length; i++) {
                let element = {
                    id: data.rows[i].values[0],
                    name:  data.rows[i].values[1],
                    y:  data.rows[i].values[2]
                }
                this.seriesData.push(element);
            }
            let obj = {
                name: 'Кіл-ть заявок',
                colorByPoint: true,
                data: this.seriesData
            }
            series.push(obj);
            this.render();
        },
        onPointSelect: function(event) {
            let message = {
                name: 'showThisDistrictApplecations',
                value: event.point.id
            }
            this.messageService.publish(message);
        }
    };
}());
