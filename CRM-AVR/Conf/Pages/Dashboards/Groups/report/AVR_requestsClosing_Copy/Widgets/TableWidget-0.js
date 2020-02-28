(function () {
  return {
    limit: 100,
    formatTitle: function() {
        return `
            <style>
                thead tr:last-child th {
                    background: rgb(79,129,189) !important;         
                }
                
                thead tr th:nth-child(1) {
                    background: rgb(226,107,10) !important;    
                }
                thead tr th:nth-child(2)  {
                    background: rgb(192,80,77) !important; 
                }
            
            </style>        
        ` ;
    },
    table: {
        header: [{
            title: 'Підрозділ',
            columnCode: 'organizations_name'
            },
            {
            title: 'Заявка №',
            columnCode: 'Claim_Number'
            },
            {
            title: 'Адреса',
            columnCode: 'places_name'
            },{
            title: 'Дата реєстрації',
            columnCode: 'Created_at'
            },{
            title: 'Дата Закриття',
            columnCode: 'Fact_finish_at'
            } ],
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
                }
        ]
    },
    sub1: {},
    init:function() {
        this.sub1 = this.messageService.subscribe('GlobalFilterChanged', this.executeSql, this);
        let executeQuery = {
            queryCode: 'Table_Comparative_Reference',
            parameterValues: [{key: "@dateStart", value: new Date(2018, 0, 1)},{key: "@dateFinish", value: new Date() },{key: "@OrgId", value:19}]
        };
        
        this.queryExecutor(executeQuery, this.load, this);
    },
    executeSql:function(message) {
        
        function checkDateFrom(val) {
            return val ? val.dateFrom : null;
        }
        function checkDateTo(val) {
            return val ? val.dateTo : null;
        }
        function checkValue(val) {
            return val ? val.value : null;
        }
        //checkValue(message.package.value.values[0].value)
        let executeQuery = {
            queryCode: 'Table_ClaimsType',
            parameterValues: [{key: "@dateStart", value: checkDateFrom(message.package.value.values[0].value) },{key: "@dateFinish", value: checkDateTo(message.package.value.values[0].value)},{key: "@OrgId", value: 19}]
        };
        this.queryExecutor(executeQuery, this.load, this);   
    },
    load:function(data) {
        //debugger;
    },
    destroy: function() {
        this.sub1.unsubscribe();
    }
};
}());
