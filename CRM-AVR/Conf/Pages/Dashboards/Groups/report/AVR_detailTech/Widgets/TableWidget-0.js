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
                
                .reportName {
                    display: block;
                    float:left;
                    color: #555; 
                    letter-spacing: .2px;
                    height: 35px;
                    margin: 20px 10px 10px;
                    font-weight: 400; 
                    font-size:1em;
                    
                }
                .reportName span[id] {
                    font-weight: 700;
                }
            
            </style>
            
            <div style="display:flex; justify-content:center; align-items:center; color: #555; text-shadow: 1px 1px 2px #9E9E9E; height: 35px; font-weight: 700; font-size:1.2em; padding:2px;">
                <span style="">Довідка по техниці (детальна)</span>
            </div>
            
            <p class="reportName">Тип техніки:
                <span id="type"> </span>
                <span>, модель: </span>
                <span id="model"> </span>
                <span>, держ.номер: </span>
                <span id="modelId"> </span>
            </p>
            
        `;
        },
        table: {
            header: [{
                title: '№/№',
                columnCode: 'num'
            },
            {
                title: 'Належить до підрозділу',
                columnCode: 'organizations_name'
            },
            {
                title: 'Дата',
                columnCode: 'action_date'
            },
            {
                title: 'Наряд',
                columnCode: 'orders_id'
            },
            {
                title: 'Робота',
                columnCode: 'type_ac_name'
            },
            {
                title: 'Водії',
                columnCode: 'contact_name'
            },
            {
                title: 'Їхав З',
                columnCode: 'places_name'
            },
            {
                title: 'Приїхав до',
                columnCode: 'places2_name'
            },
            {
                title: 'Відстань',
                columnCode: 'Distanse'
            },
            {
                title: 'Фактично працювала',
                columnCode: 'Fact_duration'
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
                columnCode: 'Id',
                visible: false
            },
            {
                columnCode: 'mechanisms_type_name',
                visible: false
            },
            {
                columnCode: 'mechanisms_name',
                visible: false
            },
            {
                columnCode: 'Number',
                visible: false
            },
            {
                columnCode: 'orders_id',
                visible: true,
                onCellClick(cell, column, row, value, rowIndex, tableMethods) {
                    tableMethods.goToSection('Orders/edit/' + row.values[7]);
                },
                format(cell, column, row, value, rowIndex) {
                    cell.setStyle('cursor:pointer; text-decoration: underline; color:#1565c0;');
                    return '<b title="перейти до наряду">' + value + '</b>';
                }
            }
            ]
        },
        sub1: {},
        mech: 0,
        init:function() {
            debugger
            let getDataFromLink = window
                .location
                .search
                .replace('?', '')
                .split('&')
                .reduce(
                    function(p, e) {
                        let a = e.split('=');
                        p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                        return p;
                    }, {}
                );
            this.mech = getDataFromLink['itemId'];
            this.sub1 = this.messageService.subscribe('GlobalFilterChanged', this.executeSql2, this);
            let executeQuery = {
                queryCode: 'General_Tech_Reference_detail',
                parameterValues: [{key: '@start_date', value: new Date(2018, 1, 1)},{key: '@end_date', value: new Date() },{key: '@mech', value: getDataFromLink['itemId'] }]
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        executeSql2:function(message) {
            debugger;
            // function checkFilterValue(val) {
            //     return val ? val.value : null;
            // }
            function checkDateFrom(val) {
                return val ? val.dateFrom : null;
            }
            function checkDateTo(val) {
                return val ? val.dateTo : null;
            }
            let executeQuery = {
                queryCode: 'General_Tech_Reference_detail',
                parameterValues: [{key: '@start_date', value: checkDateFrom(message.package.value.values[0].value) },{key: '@end_date', value: checkDateTo(message.package.value.values[0].value)}, {key: '@mech', value: this.mech } ]
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        load:function(data) {
            debugger;
            if (data && data.rows.length > 0) {
                document.getElementById('type').innerText = data.rows[0].values[2];
                document.getElementById('model').innerText = data.rows[0].values[3];
                document.getElementById('modelId').innerText = data.rows[0].values[4];
            }
        },
        destroy: function() {
            this.sub1.unsubscribe();
        }
    };
}());
