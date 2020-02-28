(function() {
    return {
        limit: 100,
        formatTitle: function() {
            return `
            <style>
                thead th[colspan="8"],
                thead th[colspan="9"],
                thead th[colspan="3"] {
                    background: rgb(177,160,199) !important;
                }
                thead th[rowspan="2"] {
                    background: rgb(226,107,10) !important;
                }
                thead th[colspan='2'] {
                    background: rgb(192,80,77) !important;    
                }
                thead tr[class^='ng-star']:last-child th {
                    background: rgb(79,129,189) !important;         
                }
                thead tr[class^='ng-star']:last-child th:nth-child(1),
                thead tr[class^='ng-star']:last-child th:nth-child(2)  {
                    background: rgb(192,80,77) !important; 
                }
                thead tr[class^='ng-star']:last-child th:nth-child(10),
                thead tr[class^='ng-star']:last-child th:nth-child(19),
                thead tr[class^='ng-star']:last-child th:nth-child(22) {
                    background: rgb(155,187,89) !important;         
                }
            
            </style>
            
             <div style="display:flex; justify-content:center; align-items:center; color: #555; text-shadow: 1px 1px 2px #9E9E9E; height: 35px; font-weight: 700; font-size:1.2em; padding:2px;">
                <span id="test" style="">Відомість обліку пошкоджень</span>
            </div>
        `;
        },
        table: {
            header: [{
                title: 'Підрозділ',
                columnCode: 'Org_Name'
            },
            {
                title: 'Загалом заявок',
                subHeaders: [{
                    title: '',
                    columnCode: 'Column2'
                },
                {
                    title: '',
                    columnCode: 'Column3'
                }]
            },
            {
                title: 'Течія',
                subHeaders: [{
                    title: 'Магістраль',
                    columnCode: 'Type1_Par1'
                },
                {
                    title: 'Підводні',
                    columnCode: 'Type1_Par2'
                },
                {
                    title: 'Колодязі',
                    columnCode: 'Type1_Par3'
                },
                {
                    title: 'ПГ',
                    columnCode: 'Type1_Par4'
                },
                {
                    title: 'ВРК',
                    columnCode: 'Type1_Par5'
                },
                {
                    title: 'Колектор',
                    columnCode: 'Type1_Par6'
                },
                {
                    title: 'Інше',
                    columnCode: 'Type1_Par7'
                },
                {
                    title: 'Загально',
                    columnCode: 'Type1_Zagal'
                }]
            },
            {
                title: 'Ремонт',
                subHeaders: [{
                    title: 'Магістраль',
                    columnCode: 'Type2_Par1'
                },
                {
                    title: 'Підводні',
                    columnCode: 'Type2_Par2'
                },
                {
                    title: 'Колодязі',
                    columnCode: 'Type2_Par3'
                },
                {
                    title: 'ПГ',
                    columnCode: 'Type2_Par4'
                },
                {
                    title: 'ВРК',
                    columnCode: 'Type2_Par5'
                },
                {
                    title: 'Колектор',
                    columnCode: 'Type2_Par6'
                },
                {
                    title: 'Інше',
                    columnCode: 'Type2_Par7'
                },
                {
                    title: 'Арматура',
                    columnCode: 'Type2_Par8'
                },
                {
                    title: 'Загально',
                    columnCode: 'Type2_Zagal'
                }]
            },
            {
                title: 'Інше',
                subHeaders: [{
                    title: 'Колодязі',
                    columnCode: 'Type3_Par1'
                },
                {
                    title: 'Інше',
                    columnCode: 'Type3_Par2'
                },
                {
                    title: 'Загально',
                    columnCode: 'Type3_Zagal'
                }]
            }],
            columns: [{
                columnCode: 'Org_Name',
                visible: true,
                format(cell, column, row, value, rowIndex) {
                    cell.setStyle('background:rgb(226,107,10)');
                    row.setStyle('text-align:center');
                    return '<b>' + value + '</b>';
                }
            },
            {
                columnCode: 'TypeName',
                visible: true,
                format(cell, column, row, value, rowIndex) {
                    cell.setStyle('background:rgb(192,80,77)');
                    return '<b>' + value + '</b>';
                }
            },
            {
                columnCode: 'TypeKolvo',
                visible: true,
                format(cell, column, row, value, rowIndex) {
                    cell.setStyle('background:rgb(192,80,77)');
                    return '<b>' + value + '</b>';
                }
            },
            {
                columnCode: 'Type1_Zagal',
                visible: true,
                format(cell, column, row, value, rowIndex) {
                    cell.setStyle('background:rgb(155,187,89)');
                    return '<b>' + value + '</b>';
                }
            },
            {
                columnCode: 'Type2_Zagal',
                visible: true,
                format(cell, column, row, value, rowIndex) {
                    cell.setStyle('background:rgb(155,187,89)');
                    return '<b>' + value + '</b>';
                }
            },
            {
                columnCode: 'Type3_Zagal',
                visible: true,
                format(cell, column, row, value, rowIndex) {
                    cell.setStyle('background:rgb(155,187,89)');
                    return '<b>' + value + '</b>';
                }
            },
            {
                columnCode: 'Id',
                visible: false
            },
            {
                columnCode: 'Org_Id',
                visible: false
            }
            ]
        },
        sub1: {},
        init:function() {
            this.sub1 = this.messageService.subscribe('GlobalFilterChanged', this.executeSql, this);
            let executeQuery = {
                queryCode: 'Table_ClaimsType',
                parameterValues: [{key: '@dateStart', value: new Date(2018, 1, 1)},{key: '@dateFinish', value: new Date()},{key: '@OrganizationsId', value:1}]
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        executeSql:function(message) {
            debugger
            function checkValue(val) {
                return val ? val.value : null;
            }
            function checkDateFrom(val) {
                return val ? val.dateFrom : null;
            }
            function checkDateTo(val) {
                return val ? val.dateTo : null;
            }
            // checkDateFrom(message.package.value.values[0].value)
            // checkDateTo(message.package.value.values[0].value)
            let executeQuery = {
                queryCode: 'Table_ClaimsType',
                parameterValues: [{key: '@dateStart', value: checkDateFrom(message.package.value.values[1].value) },{key: '@dateFinish', value: checkDateTo(message.package.value.values[1].value) },{key: '@OrganizationsId', value: checkValue(message.package.value.values[0].value)}]
            };
            // // менять длину сообщения для изменения ширины placeholder
            // let parent = document.querySelector('div.filter-widgets').childNodes[2];
            // let placeholder= document.querySelector("div.select-widget").childNodes[1];
            // if (message.package.value.values[0].value.viewValue.length > 24) {
            //     parent.style.width="25em";
            //     placeholder.style.width="25em";
            // } else {
            //     parent.style.width="180px";
            //     placeholder.style.width="180px";
            // }
            this.queryExecutor(executeQuery, this.load, this);
        },
        load:function(data) {
        },
        destroy: function() {
            this.sub1.unsubscribe();
        }
    };
}());
