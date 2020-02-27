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
                <span style="">Довідка по залученим матеріалам (загальна)</span>
            </div>
        ` 
        
        ;
    },
    table: {
        header: [{
            title: '№/№',
            columnCode: 'num'
            },
            {
            title: 'Використано/видобуто',
            columnCode: 'is_out'
            },
            {
            title: 'Матеріал',
            columnCode: 'material'
            },
            {
            title: 'Диаметр, мм',
            columnCode: 'Size'
            },{
            title: 'Район',
            columnCode: 'districts'
            },{
            title: 'Підрозділ',
            columnCode: 'organizations'
            },{
            title: 'Кількісь / Вага',
            columnCode: 'count_volume'
            },{
            title: 'Кількість заявок що використали',
            columnCode: 'count_claims'
            }],
        columns: [{
                columnCode: 'details',
                visible: true,
                onCellClick(cell, column, row, value, rowIndex, tableMethods){
                    debugger;
                    const startDate = tableMethods.globalFilterValues[1].value.dateFrom
                    const endDate = tableMethods.globalFilterValues[1].value.dateTo
                    const mater = row.values[8] || 0;
                    const size = row.values[9] || 0;
                    const distr = row.values[10] || 0;
                    const org_id = row.values[11] || 0;
                    
                    
                        tableMethods.goToDashboard('AVR_materials_Details', { queryParams: { startDate, endDate, mater, size, distr, org_id } } );
                    
                    
                },
                // onCellDblClick(cell, column, row, value, rowIndex){
                //     row.setStyle('background-color: #d8a03c');
                // },
                format(cell, column, row, value, rowIndex){
                    return '<p style="color: blue; text-decoration: underline; cursor: pointer">' + value+'</p>';
                  }
                },
                {
                    columnCode: 'materials_id',
                    visible: false
                },
                {
                    columnCode: 'diameters_id',
                    visible: false
                },
                {
                    columnCode: 'districts_id',
                    visible: false
                },
                {
                    columnCode: 'org_id',
                    visible: false
                }
               
        ]
    },
    sub1: {},
    init:function() {
        this.sub1 = this.messageService.subscribe('GlobalFilterChanged', this.executeSql, this);
        
        // let executeQuery = {
        //     queryCode: 'Reference_on_the_materials_involved',
        //     parameterValues: [{key: "@start_date", value: new Date(2018, 1, 1)},{key: "@end_date", value: new Date() }, {key: "@org_id", value: 25 }]
        // };
        
        // this.queryExecutor(executeQuery, this.load, this);
    },
    executeSql:function(message) {
        // debugger;
        function checkFilterValue(val) {
            return val ? val.value : null;
        }
        function checkDateFrom(val) {
            return val ? val.dateFrom : null;
        }
        function checkDateTo(val) {
            return val ? val.dateTo : null;
        }
        // function checkDivVlaue(val) {
        //     return val ? val.dateTo : null;
        // }
        
        //checkValue(message.package.value.values[0].value)
        let executeQuery = {
           queryCode: 'Reference_on_the_materials_involved',
           parameterValues: [{key: "@start_date", value: checkDateFrom(message.package.value.values[1].value) },{key: "@end_date", value: checkDateTo(message.package.value.values[1].value)},{key: "@org_id", value: checkFilterValue(message.package.value.values[0].value)} ]
        };
        this.queryExecutor(executeQuery, this.load, this);   
    },
    load:function(data) {
        // debugger
    },
    destroy: function() {
        this.sub1.unsubscribe();
    }
};
}());
