(function () {
  return {
    
    value_city: 1,
    formatTitle: function() {
        return `
           
        `;
    },
    chartConfig: {
        colors: ['#7CB5EC', '#96A7BC'],
        chart: {
            backgroundColor: '#eff2f5',
            type: 'line'
        },
        credits: {
             enabled: false
            },
        title: {
            text: 'Поточний стан вирішення заявок',
            style: {
                fontSize: '1em'
            }
        },
        subtitle: {
            text: '',
            style: {
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#000'
            }
        },
        xAxis: {
            categories:  [],
        },
        exporting: {
            enabled: false
        },
        yAxis: {
            title: {
                text: ' '
            },
            labels: {
                    align: 'left',
                    format: '{value:.,0f}'
                }, 
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: true
            }
        },
        series: [
             {
             name: 'Зареєстровано нових заявок',
             data: [],
             color: 'orange'
             },
            /* {
             name: 'У роботі',
             data: [],
             color: 'blue'
             },*/
             {
             name: 'Закрито заявок',
             data: [],
             color: 'red'
             }
             ]
    },
    
    init: function() {
      
        let executeQuery = {
            queryCode: 'Chart_Status_Claims'
        };
        this.queryExecutor(executeQuery, this.load, this);
        
    },
  
    
    load: function(data, options) {
        
        let categories = data.rows.map(function(hrs) {
            return hrs.values[0];
        });
        options.xAxis.categories = categories;
        
        
    
        let categories0 = data.rows.map(function(hrs) {
            return hrs.values[1];
        });
        /*let categories1= data.rows.map(function(hrs) {
            return hrs.values[2];
        });;*/
        let categories2= data.rows.map(function(hrs) {
            return hrs.values[3];
        });;
        
        let categ = [categories0,/*categories1,*/categories2];
        
        for(let i=0; i< options.series.length; i++){
            options.series[i].data =categ[i];
        }
      
        
       this.renderChart();
    }
    
         
}
;
}());
