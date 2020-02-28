(function () {
  return {
    chartConfig: {
        chart: {
            type: 'column'
        },
        query: {
            queryCode: 'DistrictCreated1',
            parameterValues: [ ],
        },
        title: {
            text: '   '
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                'Заявки',
            ],
        },
        yAxis: {
            title: {
                text: 'Загальна кiлькiсть заявок'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color:  'gray'
                }
            }
        },
        colors: ['#36f439', '#f44336'],  
        legend: {
            align: 'center',
            x: 30,
            verticalAlign: 'bottom',
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
    
    
    
    
    init: function(){
        let executeQuery = {
            queryCode: 'es_show_all_claims_org',
            limit: -1,
            parameterValues: [  ]
        };
        this.queryExecutor(executeQuery, this.load, this);
    },
    load: function(data){
        is_on =  data.columns.findIndex(el => el.code.toLowerCase() === 'is_on' );
        is_off =  data.columns.findIndex(el => el.code.toLowerCase() === 'is_off' );
        this.chartConfig.series = [];
        let value1 = {
            name: 'Без вiдключень',
            data: [  data.rows[0].values[is_on] ]
        }
        let value2 = {
            name: '3 вiдключеннями',
            data: [data.rows[0].values[is_off] ]
        }
        let container = [];
        container.push(value1);
        container.push(value2);
        this.chartConfig.series = container;
        this.render();
    },
};
}());
