(function () {
  return {
      
    chartConfig: {   
        
        chart: {
            zoomType: 'xy'
        },
        colorArr:['green','blue','lightblue','lightgreen'],    
        title: {
            text: 'Повернуто заявникові за період'
        },
        subtitle: {
           
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            crosshair: true
        },
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}°C',
                style: {
                   
                    color: "green"
                }
            },
            title: {
               
                style: {
                    color: "red"
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Rainfall',
                style: {
                    color: "grey"
                }
            },
            labels: {
                format: '{value} mm',
                style: {
                    color: "blue"
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            
        },
        series: [{
            name: 'Rainfall',
            type: 'column',
            yAxis: 1,
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            tooltip: {
                valueSuffix: ' mm'
            }
    
        }, {
            name: 'Temperature',
            type: 'spline',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
            tooltip: {
                valueSuffix: '°C'
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
          this.start_date = checkDateFrom(message.package.value.values.find(f => f.name === 'DateAndTime').value);
      };
      
      if (message.package.value.values.find(f => f.name === 'DateAndTime').value) {
          this.finish_date = checkDateTo(message.package.value.values.find(f => f.name === 'DateAndTime').value);
      };
    
      this.chartConfig.subtitle.text = `${this.start_date.toISOString().slice(0,10)} по ${this.finish_date.toISOString().slice(0,10)}`

}, 
    init() {
      this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.executeSql, this));            
        this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.RecalcData, this));
        let DateMinusWeek = new Date();
        DateMinusWeek.setDate(DateMinusWeek.getDate() - 0);
        this.start_date = DateMinusWeek;
        this.finish_date = new Date();
        let executeQuery = {
            queryCode: 'SAFS_graph_Returned',
            parameterValues: [ ],
            limit: -1
        };
        this.queryExecutor(executeQuery, this.load, this);
   
    
  },
  RecalcData: function() {
    let executeQuery = {
        queryCode: 'SAFS_graph_Returned',
        parameterValues: [{key: "@date_from", value: this.start_date},
                            {key: "@date_to", value: this.finish_date}
                           ],
        limit: -1
    };
    this.queryExecutor(executeQuery, this.load, this);
},
  load: function(data) {
    let rows = data.rows;
    let columns = data.columns;
    this.chartConfig.xAxis.categories = rows.map( row => row.values[0] );
    
    for (let i=0; i <= 1; i++) {
        this.chartConfig.series[i].name = columns[i+1].name;
        this.chartConfig.series[i].data = rows.map( row => row.values[i+1] );
    }   
    
    this.render(); 
}
};
}());
