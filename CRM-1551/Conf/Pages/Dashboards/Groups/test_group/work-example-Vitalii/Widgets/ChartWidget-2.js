(function () {
  return {
    chartConfig: {       
        chart: {
          type: 'line'
      },
      title: {
          text: 'Зареєстровано модератором за період'
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: {
          
      },
      plotOptions: {
          line: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: false
          }
      },
      series: [{
          name: 'Tokyo',
          data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
      }, {
          name: 'London',
          data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
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
      init(){
        this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.executeSql, this));            
        this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.RecalcData, this));
        let DateMinusWeek = new Date();
        DateMinusWeek.setDate(DateMinusWeek.getDate() - 0);
        this.start_date = DateMinusWeek;
        this.finish_date = new Date();

        let executeQuery = {
            queryCode: 'SAFS_graph_Registered',
            parameterValues: [ ],
            limit: -1
        };
        this.queryExecutor(executeQuery, this.load, this);
   
    },
    RecalcData: function() {
      let executeQuery = {
          queryCode: 'SAFS_graph_Registered',
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
