(function() {
    return {
        // queryCode: 'report_Select_of_current_Claims',
        // limit: 100,
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
                <span style="">Вибірка поточних заявок</span>
            </div>`
            ;
        },
        table: {
            header:[{
                title: 'Виконавець',
                columnCode: 'organization_name'
            },{
                title: 'Дата і час створення',
                columnCode: 'Created_at'
            },{
                title: 'Номер заявки',
                columnCode: 'Claim_Number'
            },{
                title: 'Адреса',
                columnCode: 'places_name'
            },{
                title: 'Район',
                columnCode: 'districts_name'
            },{
                title: 'Номер виїзду',
                columnCode: 'order_number'
            },{
                title: 'Дата виїзду',
                columnCode: 'Pushed_at'
            },{
                title: 'Бригада',
                columnCode: 'shifts_name'
            },{
                title: 'Клас заявки',
                columnCode: 'classes_name'
            },{
                title: 'Тип заявки',
                columnCode: 'Full_Name'
            },{
                title: 'Діаметр',
                columnCode: 'Size'
            },{
                title: 'Опис',
                columnCode: 'Description'
            },{
                title: 'Роботи',
                columnCode: 'action_name'
            }
            ],
            columns: [{
                columnCode: 'Claim_class_ID',
                visible: false
            }]
        },
        init: function() {
            this.messageService.subscribe('GlobalFilterChanged', this.executeSql, this);
        },
        executeSql: function(message) {
            debugger
            console.log(message);
            function checkDateFrom(val) {
                return val ? val.dateFrom : null;
            }
            function checkDateTo(val) {
                return val ? val.dateTo : null;
            }
            function checkClasses(val) {
                let valuesList = [];
    	    if (val.length > 0) {
    	        for (let i = 0; i < val.length; i++) {
    	            valuesList.push(val[i].value);
    	        }
    	    }
    	    console.log('selected values:' + valuesList);
    	    return valuesList.length > 0 ? valuesList : [''];
            }
            let executeQuery = {
                queryCode: 'report_Select_of_current_Claims',
                parameterValues: [
                    {
                        key:'@date_from',
                        value: checkDateFrom(message.package.value.values[0].value)
                    },
                    {
                        key: '@date_to' ,
                        value: checkDateTo(message.package.value.values[0].value)
                    }
                ],
                filterColumns: [{
                    key: 'Claim_class_ID',
                    value: {
                        operation: 6,
                        not: false,
                        values: checkClasses(message.package.value.values[1].value)
                    }
                }
                ]
            }
            this.queryExecutor(executeQuery, this.load, this)
        },
        load: function() {
        }
    };
}());
