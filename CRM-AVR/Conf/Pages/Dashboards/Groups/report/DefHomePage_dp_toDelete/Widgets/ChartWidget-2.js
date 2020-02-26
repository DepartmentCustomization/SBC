(function () {
  return {
    
    value_city: 1,
    formatTitle: function() {
        return `
        <style>.highcharts-title {
            font-size: 1.4em!important;
        }</style>
           
        `;
    },
    chartConfig: {
     chart: {
        type: 'column',
        backgroundColor: '#eff2f5'
    },
    title: {
        text: 'Поточна кількість відключень'
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
        reversed: true
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Залагом відключень: {point.stackTotal}'
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [
    {
        name: 'Прострочених відключень', //'Прострочено',
        color: 'red',
        data: []
    },
    {
        name: 'Відключень', //'За графіком',
        color: 'green',
        data: []
    }]
},
    
    init: function() {
      
        let executeQuery = {
            queryCode: 'Chart_Control_of_trips'
        };
        this.queryExecutor(executeQuery, this.load, this);
        
    },
  
    
    load: function(data, options) {
        
      let categories = data.rows.map(function(hrs) {
            return hrs.values[0];
        });
        options.xAxis.categories = categories;
        
        
    
        let categories0 = data.rows.map(function(hrs) {
            return hrs.values[2];
        });
        let categories1= data.rows.map(function(hrs) {
            return hrs.values[3];
        });
        
        let categ = [categories1, categories0];
        
        for(let i=0; i< options.series.length; i++){
            options.series[i].data =categ[i];
        }    
        
        console.log(data);
        console.log(options);
        
     this.renderChart();
    }
    
         
}
;
}());
