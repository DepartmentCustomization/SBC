(function() {
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
                <span style="">Відпрацьований час бригадами</span>
            </div>
        `
            ;
        },
        table: {
            header: [{
                title: '№/№',
                columnCode: 'num'
            },{
                title: 'Відділ',
                columnCode: 'organizations_name'
            },{
                title: 'Дата',
                columnCode: 'Shift_date'
            },{
                title: 'Зміна',
                columnCode: 'shifts'
            },{
                title: 'Бригадир',
                columnCode: 'contact_name'
            },{
                title: 'Транспорт',
                columnCode: 'mechnisms_name'
            },{
                title: 'Нарядів',
                columnCode: 'count_orders'
            },{
                title: 'Робіт',
                columnCode: 'count_actions'
            },{
                title: 'Затрачений час',
                columnCode: 'hour_spells'
            },{
                title: 'Ефективний час',
                columnCode: 'effective_hour'
            },{
                title: 'organizations_id',
                columnCode: 'organizations_id'
            }],
            columns: [{
                columnCode: 'organizations_name',
                visible: true,
                onCellClick(cell, column, row, value, rowIndex) {
                    debugger;
                    cell.setStyle('background-color: #389784');
                },
                onCellDblClick(cell, column, row, value, rowIndex) {
                    row.setStyle('background-color: #d8a03c');
                },
                format(cell, column, row, value, rowIndex) {
                    return '<b>' + value + '</b>';
                }
            },
            {
                columnCode: 'organizations_id',
                visible: false
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
                queryCode: 'Working_time_brigades',
                parameterValues: [{key: '@start_date', value: new Date(2018, 1, 1)},{key: 'finish_date', value: new Date() }, {key: '@name', value: '%' }]
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
            function brigadir(name) {
                return name ? name.value : '%';
            }
            //brigadir(message.package.value.values[2].value);
            function extractOrgValues(val) {
    	    let valuesList = [];
    	    if (val.length > 0) {
    	        for (let i = 0; i < val.length; i++) {
    	            valuesList.push(val[i].value);
    	        }
    	    }
    	    return valuesList.length > 0 ? valuesList : [];
    	}
            let executeQuery = {
                queryCode: 'Working_time_brigades',
                parameterValues: [{key: '@start_date', value: checkDateFrom(message.package.value.values[1].value) },{key: '@finish_date', value: checkDateTo(message.package.value.values[1].value) }, {key: '@name', value: brigadir(message.package.value.values[2]) }],
                filterColumns: []
            };
            if (extractOrgValues(message.package.value.values[0].value).length > 0) {
                const filter = {
                    key: 'organizations_id',
                    value: {
                        operation: 0,
                        not: false,
                        values: extractOrgValues(message.package.value.values[0].value)
                    }
                };
                executeQuery.filterColumns.push(filter);
            }
            this.queryExecutor(executeQuery, this.load, this);
        },
        load:function(data) {
        },
        destroy: function() {
            this.sub1.unsubscribe();
        }
    };
}());
