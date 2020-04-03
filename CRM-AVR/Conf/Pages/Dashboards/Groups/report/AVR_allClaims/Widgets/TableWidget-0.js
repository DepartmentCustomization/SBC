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
                <span style="">Довідка по всіх работах в заявках</span>
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
                title: 'Дата закриття',
                columnCode: 'Fact_finish_at'
            }],
            columns: [{
                columnCode: '',
                visible: true,
                onCellClick(cell, column, row, value, rowIndex) {
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
                columnCode: 'Claim_Number',
                visible: true,
                onCellClick(cell, column, row, value, rowIndex, tableMethods) {
                    tableMethods.goToSection('Claims/edit/' + row.values[0]);
                    // sections/Claims/view/
                },
                format(cell, column, row, value, rowIndex) {
                    cell.setStyle('cursor:pointer; text-decoration: underline; color:#1565c0;');
                    return '<b title="перейти до заявки" >' + value + '</b>';
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
            // let executeQuery = {
            //     queryCode: 'Inform_closed_claims',
            //     parameterValues: [{key: "@start_date", value: new Date(2018, 1, 1)},{key: "@end_date", value: new Date() }, {key: "@OrgId", value: 28 }]
            // };
        // this.queryExecutor(executeQuery, this.load, this);
        },
        executeSql:function(message) {
        //debugger;
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
                queryCode: 'Inform_closed_claims',
                parameterValues: [{key: '@start_date', value: checkDateFrom(message.package.value.values[1].value) },{key: '@end_date', value: checkDateTo(message.package.value.values[1].value)},{key: '@OrgId', value: checkFilterValue(message.package.value.values[0].value)} ]
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        load:function(data) {
        },
        destroy: function() {
            this.sub1.unsubscribe();
        }
    };
}());
