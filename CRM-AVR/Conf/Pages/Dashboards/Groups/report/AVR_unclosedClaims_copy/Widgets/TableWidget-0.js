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
            title: '№/№',
            columnCode: 'num'
            },
            {
            title: 'Підрозділ',
            columnCode: 'organizations_name'
            },
            {
            title: 'Заявка №',
            columnCode: 'Claim_Number'
            },
            {
            title: 'Дата реєстрації',
            columnCode: 'Created_at'
            },{
            title: 'Адреса',
            columnCode: 'places_name'
            },{
            title: 'Зміст заявки',
            columnCode: 'Description'
            },{
            title: 'Виконані роботи',
            columnCode: 'actions_type'
            },{
            title: 'Затрачений час',
            columnCode: 'hour_spells'
            },{
            title: 'Приміткі по роботі',
            columnCode: 'actions_comment'
            },{
            title: 'Відключенні об\'єкти',
            columnCode: 'swich_off'
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
                }
        ]
    },
    sub1: {},
    init:function() {
        this.sub1 = this.messageService.subscribe('GlobalFilterChanged', this.executeSql, this);
        let executeQuery = {
            queryCode: 'Inform_not_closed_claims',
            parameterValues: [{key: "@claim_class", value: 2}, {key: "@OrgId", value:19}]
        };
        
        this.queryExecutor(executeQuery, this.load, this);
    },
    executeSql:function(message) {
        
        function checkFilterValue(val) {
            return val ? val.value : null;
        }
        // function checkDivVlaue(val) {
        //     return val ? val.dateTo : null;
        // }
        debugger;
        //checkValue(message.package.value.values[0].value)
        let executeQuery = {
            queryCode: 'Inform_not_closed_claims',
            parameterValues: [{key: "@claim_class", value: checkFilterValue(message.package.value.values[1].value)},{key: "@OrgId", value: checkFilterValue(message.package.value.values[0].value)} ]
        };
        this.queryExecutor(executeQuery, this.load, this);   
    },
    load:function(data) {
        debugger;
    },
    destroy: function() {
        this.sub1.unsubscribe();
    }
};
}());
