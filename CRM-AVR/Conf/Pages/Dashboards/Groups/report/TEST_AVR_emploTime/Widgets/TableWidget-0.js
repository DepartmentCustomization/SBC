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
                <span style="">Відпрацьований час співробітників</span>
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
                title: 'ПІБ співробітника',
                columnCode: 'contact_name'
            },{
                title: 'Робочі години',
                columnCode: 'hours_work'
            },{
                title: 'Ефективний час',
                columnCode: 'effective_hour'
            },{
                title: 'Нарядів',
                columnCode: 'count_orders'
            },{
                title: 'Проїхав (км)',
                columnCode: 'distans'
            }],
            columns: [{
                columnCode: 'hours_work',
                visible: true,
                format(cell, column, row, value, rowIndex, test) {
                    cell.setStyle('text-align:center;');
                    if(value) {
                        return '<span>' + value + '</span>';
                    }
                    return '<span> 0 </span>';
                }
            },{
                columnCode: 'effective_hour',
                visible: true,
                format(cell, column, row, value, rowIndex, test) {
                    cell.setStyle('text-align:center;');
                    if (value) {
                        return '<span>' + value + '</span>';
                    }
                    return '<span> 0 </span>';
                }
            },{
                columnCode: 'count_orders',
                visible: true,
                format(cell, column, row, value, rowIndex) {
                    cell.setStyle('text-align:center;');
                    return '<span>' + value + '</span>';
                }
            },{
                columnCode: 'distans',
                visible: true,
                format(cell, column, row, value, rowIndex) {
                    cell.setStyle('text-align:center;');
                    return '<span>' + value + '</span>';
                }
            },{
                columnCode: 'num',
                visible: true,
                format(cell, column, row, value, rowIndex) {
                    cell.setStyle('text-align:center;');
                    if ((value % 2) == 0) {
                        row.setStyle('background: #DEDDDB');
                    } else {
                        row.setStyle('background: #FFFFFF');
                    }
                    return '<span>' + value + '</span>';
                }
            },{
                columnCode: 'Id',
                visible: false
            }
            ]
        },
        sub1: {},
        init:function() {
            this.sub1 = this.messageService.subscribe('GlobalFilterChanged', this.executeSql, this);
            //Org_Filter
            // let executeQuery = {
            //     queryCode: 'test_work_employee',
            //     parameterValues: [{key: "@start_date", value: new Date(2018, 1, 1)},{key: "@finish_date", value: new Date() }, {key: "@name", value: '%' },{key: "@organizations_id", value: 19) }]
            // };
        // this.queryExecutor(executeQuery, this.load, this);
        },
        executeSql:function(message) {
            debugger;
            function checkDateFrom(val) {
                return val ? val.dateFrom : null;
            }
            function checkDateTo(val) {
                return val ? val.dateTo : null;
            }
            function employee(name) {
                return name ? name.value : '%';
            }
            function extractOrgValues(val) {
                return val ? val.value : 0;
            }
            let executeQuery = {
                queryCode: 'test_work_employee',
                parameterValues: [{key: '@start_date', value: checkDateFrom(message.package.value.values[0].value) },{key: '@finish_date', value: checkDateTo(message.package.value.values[0].value) }, {key: '@name', value: employee(message.package.value.values[1]) },{key: '@organizations_id', value: extractOrgValues(message.package.value.values[2].value) }]
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
