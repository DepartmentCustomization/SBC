(function () {
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
                              {key: '@QueryCode', value: '1=1'}],
        },
        title: {
            text: ' '
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                'Будинки',
            ],
        },
        yAxis: {
            title: {
                text: 'Загальна кiлькiсть вiдключених будинкiв'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color:  'gray'
                }
            }
        },
        colors: ['#f44336'],       
        tooltip: {
            headerFormat: '',
            pointFormat: 'Разом: {point.stackTotal}<br/>{series.name}: {point.y}'
        },
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
        this.sub = this.messageService.subscribe( 'showThisDistrictApplecations', this.showGraphics, this);  
        this.render();
    },
    showGraphics: function(message){
        let executeQuery = {
            queryCode: 'chart_SwitchOffOn_CentralControlRoom_countHouses',
            limit: -1,
            parameterValues: [ { key: '@Id', value: message.value} ]
        };
        this.queryExecutor(executeQuery, this.load, this);
        
    },
    load: function(data){
        this.chartConfig.series = [];
        let value1 = {
            name: 'Вiдключено',
            data: [  data.rows[0].values[0] ]
        }
        let container = [];
        container.push(value1);
        // container.push(value2);
        // this.chartConfig.title.text = data.rows[0].values[1];
        this.chartConfig.series = container;
        this.render();
    },
};
}());
