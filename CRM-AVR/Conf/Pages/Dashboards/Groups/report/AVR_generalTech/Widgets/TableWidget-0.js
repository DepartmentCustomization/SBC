(function () {
  return {
    limit: 100,
    formatTitle: function() {
        return `
            <style>
                thead tr[class^='ng-star']:last-child th {
                    background: rgb(79,129,189) !important;         
                }
                
                thead tr[class^='ng-star'] th:nth-child(1) {
                    background: rgb(226,107,10) !important;    
                }
                thead tr[class^='ng-star'] th:nth-child(2)  {
                    background: rgb(192,80,77) !important; 
                }
            
            </style>
            
            <div style="display:flex; justify-content:center; align-items:center; color: #555; text-shadow: 1px 1px 2px #9E9E9E; height: 35px; font-weight: 700; font-size:1.2em; padding:2px;">
                <span style="">Довідка по техниці (загальна)</span>
            </div>
            
        ` ;
    },
    table: {
        header: [{
            title: '№/№',
            columnCode: 'num'
            },
            {
            title: 'Тип техніки',
            columnCode: 'mechanisms_type_name'
            },
            {
            title: 'Модель',
            columnCode: 'mechanisms_name'
            },
            {
            title: 'Держ номер',
            columnCode: 'Number'
            },{
            title: 'Належить до підрозділу',
            columnCode: 'organizations_name'
            },{
            title: 'Проїхав загалом',
            columnCode: 'distance'
            },{
            title: 'Виконав нарядів',
            columnCode: 'count_orders'
            },{
            title: 'Кількість разів на ремонті',
            columnCode: 'service'
            },{
            title: 'Неробила днів',
            columnCode: 'not_work_day'
            }],
        columns: [{
                columnCode: '',
                visible: true,
                onCellClick(cell, column, row, value, rowIndex){
                    cell.setStyle('background-color: #389784');
                },
                onCellDblClick(cell, column, row, value, rowIndex){
                    row.setStyle('background-color: #d8a03c');
                },
                format(cell, column, row, value, rowIndex){
                    return '<b>' + value+'</b>';
                  }
                },
                {
                    columnCode: 'Id',
                    visible: false
                },
                {
                columnCode: 'mechanisms_name', //mechanisms_name
                visible: true,
           
                  onCellClick(cell, column, row, value, rowIndex, config){
                    cell.setStyle('cursor: pointer;');
                    debugger;
                    let itemId = row.values[1];
                    let dateStart = config.globalFilterValues[1].value.dateFrom;
                    let dateEnd = config.globalFilterValues[1].value.dateTo;
                    
                    // let executeQuery = {
                    //     queryCode: 'testWork',
                    //     limit: -1,
                    //     parameterValues: []
                    // };
                    
                    // config.sendQuery(executeQuery, config.myFunc)
                    
                    
                        config.goToDashboard('AVR_detailTech', { queryParams: { itemId: itemId ,dateStart: dateStart , dateEnd: dateEnd } } );
                    
                },
                myFunc: function(data){
                  console.log(data);  
                },
                
                format(cell, column, row, value, rowIndex){
                    cell.setStyle('color: #1e88e5; cursor: pointer; text-decoration:underline;');
                    return '<b>' + value+'</b>';
                  }
                }
               
        ]
    },
    sub1: {},
    init:function() {
        this.sub1 = this.messageService.subscribe('GlobalFilterChanged', this.executeSql1, this);
        
            let executeQuery = {
                queryCode: 'General_Tech_Reference',
                parameterValues: [{key: "@start_date", value: new Date(2018, 1, 1)},{key: "@end_date", value: new Date() },{key: "@org_id", value: 28 }]
            };
            
            this.queryExecutor(executeQuery, this.load, this);
    },
    executeSql1:function(message) {
        
        function checkValue(values, index, property) {
            // debugger;
            let val = values[index] && values[index].value;
            if (val) {
                return val ? val[property] : null;
            } else {
                return null;
            }
        }

        this.startDate = checkValue(message.package.value.values, 1, 'dateFrom');  
            console.log('startD', this.startDate);
        this.endDate = checkValue(message.package.value.values, 1, 'dateTo');
            console.log('endD', this.endDate);
        this.orgId = checkValue(message.package.value.values, 0, 'value');
            console.log('orgId', this.orgId);
            
        let executeQuery = {
            queryCode: 'General_Tech_Reference',
            parameterValues: [{key: "@start_date", value: this.startDate },{key: "@end_date", value: this.endDate}, {key: "@org_id", value: this.orgId }]
        };
        //debugger;
        this.queryExecutor(executeQuery, this.load, this);   
    },
    load:function(data) {
        
    },
    destroy: function() {
        this.sub1.unsubscribe();
    }
};
}());
