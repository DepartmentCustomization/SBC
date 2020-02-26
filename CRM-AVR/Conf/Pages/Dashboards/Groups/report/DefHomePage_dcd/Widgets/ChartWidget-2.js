(function () {
  return {
    
    value_city: 1,
    formatTitle: function() {
        return `
           
        `;
    },
    chartConfig: {
     chart: {
        type: 'bar',
        backgroundColor: '#eff2f5',
        zoomType: 'xy'
    },
    title: {
        text: 'Заявки з відключеннями'
    },
    tooltip: {
        formatter: function() {
            return `<b style="font-size: 1.5vh;">${this.point.name}: ${this.y}</b>`;
        }
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
      enabled: false,
      layout: 'vertical',
      align: 'bottom',
      verticalAlign: 'bottom',
      labelFormat: ''
    },
   
    
     plotOptions: {
        bar: {
            dataLabels: {
                enabled: false,
                align: 'right',
                verticalAlign: 'top',
                format: '<b>{point.name}</b>',
                distance: 1,
                style: {
                    fontWeight: '60',
                    color: 'black'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '50%']
        }
    },
    series: [
    {
        data: []
    }
    ]
},
    init: function() {
        let executeQuery = {
            queryCode: 'Chart_Claims_SwitchOff'
        };
        this.queryExecutor(executeQuery, this.load, this);
        
    },
  
    valuesForOrg: [],
    load: function(data, options) {
      
     
      
      
        options.series[0].name = data.rows[0].values[0];
        this.valuesForOrg.push(
            {name:'Відключені об\'єкти', y: data.rows[0].values[1], color: 'orange'},
            {name:'Місця термін відключення яких спливає', y: data.rows[0].values[2], color: 'red'},
            {name:'Заявки з відключеннями', y: data.rows[0].values[3], color: 'blue'},
            {name:'Заявки з місцями термін відключення яких спливає', y: data.rows[0].values[4], color: 'green'},
            {name:'Заявки з відключеннями, строк виконання яких (заявок) спливає', y: data.rows[0].values[5], color: 'yellow'}
        );
        
         options.series[0].data = this.valuesForOrg;
       
        
     this.renderChart();
  //  debugger;
        
    }
    
         
}
;
}());
