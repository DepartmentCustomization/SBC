(function () {
  return {
    
    value_city: 1,
    formatTitle: function() {
        return `
           
        `;
    },
    chartConfig: {
     chart: {
        type: 'pie',
        backgroundColor: '#eff2f5'
    },
    title: {
        text: 'Контроль завантаження фахівців'
    },
    credits:{
      enabled: false  
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'bottom',
      labelFormat: 'Частина - {point.percentage:.1f}%'
    },
     plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                 format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                distance: 1,
                style: {
                    fontWeight: '100',
                    color: 'black'
                }
            },
            startAngle: -180,
            endAngle: 180,
            center: ['50%', '50%']
        }
    },
    series: [{
        name: '',
        innerSize: '30%',
        data: []
    }]
},
    
    init: function() {
      
        let executeQuery = {
            queryCode: 'Chart_Control_of_downl_specialists'
        };
        this.queryExecutor(executeQuery, this.load, this);
        
    },
  
    valuesForOrg: [],
    load: function(data, options) {
      
       
        options.series[0].name = data.rows[0].values[0];
        this.valuesForOrg.push(['У зміні', data.rows[0].values[1]],['Працюють', data.rows[0].values[2]], ['Вільні', data.rows[0].values[3]]);
        
         options.series[0].data = this.valuesForOrg;
       
        
     this.renderChart();
    }
    
         
}
;
}());
