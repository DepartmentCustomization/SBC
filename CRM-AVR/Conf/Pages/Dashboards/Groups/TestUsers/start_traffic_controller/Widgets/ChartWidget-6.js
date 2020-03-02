(function() {
    return {
        chartConfig: {
            chart: {
                type: 'column'
            },
            query: {
                queryCode: 'DistrictCreated1',
                parameterValues: [{key: '@UsersId', value: this.users},
                    {key: '@DistrictId', value: this.districts},
                    {key: '@dateStart', value: this.start_date},
                    {key: '@dateEnd', value: this.finish_date},
                    {key: '@QueryCode', value: '1=1'}]
            },
            title: {
                text: ' '
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [
                    'Споживачi'
                ]
            },
            yAxis: {
                title: {
                    text: 'Загальна кiлькiсть вiдключених споживачiв'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color:  'gray'
                    }
                }
            },
            colors: [ '#f44336'],
            legend: {
                align: 'center',
                x: 30,
                verticalAlign: 'bottom'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: 'white'
                    }
                }
            },
            series: []
        },
        init: function() {
            let executeQuery = {
                queryCode: 'es_show_all_flats',
                limit: -1,
                parameterValues: [ ]
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        load: function(data) {
            this.chartConfig.series = [];
            // let value1 = {
            //     name: 'Без вiдключень',
            //     data: [  data.rows[0].values[2] ]
            // }
            let value2 = {
                name: 'Вiдключено',
                data: [data.rows[0].values[0] ]
            }
            let container = [];
            // container.push(value1);
            container.push(value2);
            // this.chartConfig.title.text = data.rows[0].values[1];
            this.chartConfig.series = container;
            this.render();
        }
    };
}());
