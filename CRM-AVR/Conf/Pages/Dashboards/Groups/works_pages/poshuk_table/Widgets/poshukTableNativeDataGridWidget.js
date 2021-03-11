(function() {
    return {
        config: {
            query: {
                code: 'ak_QueryCodeSearch',
                parameterValues: [{ key: '@param1', value: '1=1'}],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'claim_number',
                    caption: 'Номер заявки'
                },{
                    dataField: 'claim_created_at',
                    caption: 'Дата створення',
                    dataType: 'datetime',
                    format: 'dd.MM.yyy HH.mm',
                    width: 250
                }, {
                    dataField: 'claim_finish_at',
                    caption: 'Дата закриття',
                    dateType: 'datetime',
                    format: 'dd.MM.yyy HH.mm',
                    width: 250
                },{
                    dataField: 'User_Created_By',
                    caption: 'Створив'
                },{
                    dataField: 'claim_type_name',
                    caption: 'Тип заявки',
                    width: 1200
                }, {
                    dataField: 'Main_Place_Name',
                    caption: 'Головне місце',
                    width: 700
                }, {
                    dataField: 'Response_Org_Name',
                    caption: 'Відповідальний підрозділ',
                    width: 350
                }
            ],
            masterDetail: {
                enabled: true,
                template: 'masterDetailWithTabsInstance',
                tabs: [
                    {
                        title: "Виїзди",
                        template: "Orders",
                        showBorders: true,
                        columnAutoWidth: true,
                        wordWrapEnabled: true,
                        pager: {
                            showPageSizeSelector: true,
                            allowedPageSizes: [5, 10, 50],
                            showInfo: true
                        },
                        paging: {
                            pageSize: 5
                        },
                        headerFilter: {
                            visible: true
                        },
                        filterRow: {
                            visible: true,
                            applyFilter: "auto"
                        },
                        query: {
                            queryCode: 'ak_orders_by_claim',
                            limit: -1,
                            parameterValues: [
                                {
                                    key: '@claim_id',
                                    value: null
                                }
                            ]
                        },
                        columns: [
                            {
                                dataField: 'Order_Number',
                                caption: '№'
                            },
                            {
                                dataField: 'Created_at',
                                caption: 'Дата створення',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm'
                            }, 
                            {
                                dataField: 'Start_at',
                                caption: 'Дата початку',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm'
                            },
                            {
                                dataField: 'Action_Min_Start_from',
                                caption: 'Дата початку робіт',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm'
                            }, 
                            {
                                dataField: 'Action_Max_Finish_at',
                                caption: 'Дата закінчення робіт',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm'
                            },
                            {
                                dataField: 'Finished_at',
                                caption: 'Дата закінчення',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm'
                            }, 
                            {
                                dataField: 'Closed_at',
                                caption: 'Дата закриття',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm'
                            }, 
                            {
                                dataField: 'Plan_duration',
                                caption: 'Планова тривалість',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm'
                            }, 
                            {
                                dataField: 'User_Created_By',
                                caption: 'Створив'
                            }, 
                            {
                                dataField: 'User_Closed_By',
                                caption: 'Закрив'
                            },
                            {
                                dataField: 'Job_Contact_Name',
                                caption: 'Бригадир'
                            },
                            {
                                dataField: 'Comment_result',
                                caption: 'Коментар'
                            }, 
                            {
                                dataField: 'Status_Name',
                                caption: 'Статус'
                            }
                        ]

                    },
                    {
                        title: "Бригади у виїздах",
                        template: "Orders_People",
                        showBorders: true,
                        columnAutoWidth: true,
                        wordWrapEnabled: true,
                        width: 1500,
                        pager: {
                            showPageSizeSelector: true,
                            allowedPageSizes: [5, 10, 50],
                            showInfo: true
                        },
                        paging: {
                            pageSize: 5
                        },
                        headerFilter: {
                            visible: true
                        },
                        filterRow: {
                            visible: true,
                            applyFilter: "auto"
                        },
                        query: {
                            queryCode: 'ak_people_in_order_by_claim',
                            limit: -1,
                            parameterValues: [
                                {
                                    key: '@claim_id',
                                    value: null
                                }
                            ]
                        },
                        columns: [
                            {
                                dataField: 'Order_Number',
                                caption: '№ виїзда'
                            },
                            {
                                dataField: 'contacts_name',
                                caption: 'ПІБ'
                            }, 
                            {
                                dataField: 'Number',
                                caption: 'Телефон'
                            }, 
                            {
                                dataField: 'jobs_name',
                                caption: 'Посада'
                            }, 
                            {
                                dataField: 'org_name',
                                caption: 'Підрозділ'
                            },
                            {
                                dataField: 'Is_main',
                                caption: 'Бригадир',
                                widht: 100
                            },
                            {
                                dataField: 'Is_driver',
                                caption: 'Водій',
                                widht: 100
                            }
                        ]

                    },
                    {
                        title: "Техніка у виїздах",
                        template: "Orders_Mechanisms",
                        showBorders: true,
                        columnAutoWidth: true,
                        wordWrapEnabled: true,
                        width: 1000,
                        pager: {
                            showPageSizeSelector: true,
                            allowedPageSizes: [5, 10, 50],
                            showInfo: true
                        },
                        paging: {
                            pageSize: 5
                        },
                        headerFilter: {
                            visible: true
                        },
                        filterRow: {
                            visible: true,
                            applyFilter: "auto"
                        },
                        query: {
                            queryCode: 'ak_mechanisms_by_claim',
                            limit: -1,
                            parameterValues: [
                                {
                                    key: '@claim_id',
                                    value: null
                                }
                            ]
                        },
                        columns: [
                            {
                                dataField: 'Order_Number',
                                caption: '№ виїзда'
                            },
                            {
                                dataField: 'mechanisms_type_name',
                                caption: 'Тип техніки'
                            }, 
                            {
                                dataField: 'mechanisms_name',
                                caption: 'Техніка'
                            }, 
                            {
                                dataField: 'state_number',
                                caption: 'Держ. номер'
                            },
                            {
                                dataField: 'Departure_at',
                                caption: 'Дата виїзду',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm'
                            }
                        ]

                    },
                    {
                        title: "Запірна арматура",
                        template: "Action_arm",
                        showBorders: true,
                        columnAutoWidth: true,
                        wordWrapEnabled: true,
                        width: 1300,
                        pager: {
                            showPageSizeSelector: true,
                            allowedPageSizes: [5, 10, 50],
                            showInfo: true
                        },
                        paging: {
                            pageSize: 5
                        },
                        headerFilter: {
                            visible: true
                        },
                        filterRow: {
                            visible: true,
                            applyFilter: "auto"
                        },
                        query: {
                            queryCode: 'ak_actions_arm_by_claim',
                            limit: -1,
                            parameterValues: [
                                {
                                    key: '@claim_id',
                                    value: null
                                }
                            ]
                        },
                        columns: [
                            {
                                dataField: 'Action_type_Name',
                                caption: 'Тип роботи'
                            }, 
                            {
                                dataField: 'Start_from',
                                caption: 'Дата відкриття',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm',
                                width: 200
                            }, 
                            {
                                dataField: 'Finish_at',
                                caption: 'Дата закриття',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm',
                                width: 200
                            }, 
                            {
                                dataField: 'Diameter_size',
                                caption: 'Діаметр'
                            }, 
                            {
                                dataField: 'Place_Name',
                                caption: 'Місце'
                            }, 
                            {
                                dataField: 'has_SwitchOff',
                                caption: 'Є відключення'
                            }
                        ]

                    },
                    {
                        title: "Відключення",
                        template: "Switch_Off",
                        showBorders: true,
                        columnAutoWidth: true,
                        wordWrapEnabled: true,
                        width: 1000,
                        pager: {
                            showPageSizeSelector: true,
                            allowedPageSizes: [5, 10, 50],
                            showInfo: true
                        },
                        paging: {
                            pageSize: 5
                        },
                        headerFilter: {
                            visible: true
                        },
                        filterRow: {
                            visible: true,
                            applyFilter: "auto"
                        },
                        query: {
                            queryCode: 'ak_switch_off_by_claim',
                            limit: -1,
                            parameterValues: [
                                {
                                    key: '@claim_id',
                                    value: null
                                }
                            ]
                        },
                        columns: [
                            {
                                dataField: 'SwitchOff_start',
                                caption: 'Відкл. з',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm',
                                width: 200
                            }, 
                            {
                                dataField: 'SwitchOff_finish',
                                caption: 'Відкл. по',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm',
                                width: 200
                            }, 
                            {
                                dataField: 'SwitchOff_type_Name',
                                caption: 'Тип відключення'
                            }, 
                            {
                                dataField: 'Place_Name',
                                caption: 'Місце'
                            }
                        ]

                    },
                    {
                        title: "Відключення боржників",
                        template: "Disabling_Debtors",
                        showBorders: true,
                        columnAutoWidth: true,
                        wordWrapEnabled: true,
                        width: 2500,
                        pager: {
                            showPageSizeSelector: true,
                            allowedPageSizes: [5, 10, 50],
                            showInfo: true
                        },
                        paging: {
                            pageSize: 5
                        },
                        headerFilter: {
                            visible: true
                        },
                        filterRow: {
                            visible: true,
                            applyFilter: "auto"
                        },
                        query: {
                            queryCode: 'ak_disabling_debtors_by_claim',
                            limit: -1,
                            parameterValues: [
                                {
                                    key: '@claim_id',
                                    value: null
                                }
                            ]
                        },
                        columns: [
                            {
                                dataField: 'EmployeeWS_ID',
                                caption: 'Інспектор',
                                width: 300
                            }, 
                            {
                                dataField: 'Contact_debt',
                                caption: 'Боржник',
                                width: 300
                            }, 
                            {
                                dataField: 'Place_debt_Id',
                                caption: 'Адреса відключення'
                            }, 
                            {
                                dataField: 'Flats_debt_Id',
                                caption: 'Квартира',
                                width: 300
                            }, 
                            {
                                dataField: 'Place_disadle_Id',
                                caption: 'Адреса встановлення пломби'
                            }, 
                            {
                                dataField: 'Is_fixed',
                                caption: 'Недоліки усунено',
                                width: 200
                            }, 
                            {
                                dataField: 'Description',
                                caption: 'Опис'
                            }, 
                            {
                                dataField: 'Number_seal',
                                caption: 'Номер пломби',
                                width: 200
                            }, 
                            {
                                dataField: 'Amount_due',
                                caption: 'Сума сплати борга',
                                width: 200
                            }, 
                            {
                                dataField: 'Payment_departure',
                                caption: 'Сума сплати виїзду',
                                width: 200
                            }, 
                            {
                                dataField: 'Is_fixed',
                                caption: 'Недоліки усунено',
                                width: 200
                            }
                        ]

                    },
                    {
                        title: "Виклик спецслужб",
                        template: "OutsideMen",
                        showBorders: true,
                        columnAutoWidth: false,
                        wordWrapEnabled: true,
                        width: 2500,
                        pager: {
                            showPageSizeSelector: true,
                            allowedPageSizes: [5, 10, 50],
                            showInfo: true
                        },
                        paging: {
                            pageSize: 5
                        },
                        headerFilter: {
                            visible: true
                        },
                        filterRow: {
                            visible: true,
                            applyFilter: "auto"
                        },
                        query: {
                            queryCode: 'ak_outside_men_by_claim',
                            limit: -1,
                            parameterValues: [
                                {
                                    key: '@claim_id',
                                    value: null
                                }
                            ]
                        },
                        columns: [
                            {
                                dataField: 'company_name',
                                caption: 'Компанія',
                                width: 300
                            }, 
                            {
                                dataField: 'fiz_name',
                                caption: 'Співробітник компанії'
                            }, 
                            {
                                dataField: 'Phone',
                                caption: 'Телефон'
                            }, 
                            {
                                dataField: 'Call_from',
                                caption: 'Дата повідомлення',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm',
                                width: 200
                            }, 
                            {
                                dataField: 'Plan_date',
                                caption: 'Планова дата прибуття',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm',
                                width: 300
                            }, 
                            {
                                dataField: 'Finish_at',
                                caption: 'Дата відповіді',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm',
                                width: 200
                            }, 
                            {
                                dataField: 'Comment',
                                caption: 'Коментар'
                            }, 
                            {
                                dataField: 'has_docs',
                                caption: 'Вкладені документи',
                                width: 200
                            }
                        ]

                    },
                    {
                        title: "Роботи",
                        template: "Action_Materials",
                        showBorders: true,
                        columnAutoWidth: false,
                        wordWrapEnabled: true,
                        width: 2700,
                        pager: {
                            showPageSizeSelector: true,
                            allowedPageSizes: [5, 10, 50],
                            showInfo: true
                        },
                        paging: {
                            pageSize: 5
                        },
                        headerFilter: {
                            visible: true
                        },
                        filterRow: {
                            visible: true,
                            applyFilter: "auto"
                        },
                        query: {
                            queryCode: 'ak_actions_by_claim',
                            limit: -1,
                            parameterValues: [
                                {
                                    key: '@claim_id',
                                    value: null
                                }
                            ]
                        },
                        columns: [
                            {
                                dataField: 'action_types_name',
                                caption: 'Тип роботи'
                            }, 
                            {
                                dataField: 'places_name',
                                caption: 'Місце',
                                width: 400
                            }, 
                            {
                                dataField: 'place_type_name', 
                                caption: 'Тип місця'
                            }, 
                            {
                                dataField: 'Plan_start_date',
                                caption: 'Планова дата початку',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm',
                                width: 250
                            }, 
                            {
                                dataField: 'Start_from',
                                caption: 'Дата початку',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm',
                                width: 200
                            },
                            {
                                dataField: 'Finish_at',
                                caption: 'Дата закінчення',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm',
                                width: 200
                            },
                            {
                                dataField: 'Fact_duration',
                                caption: 'Фактична тривалість',
                                dataType: 'datetime',
                                format: 'HH:mm',
                                width: 200
                            }, 
                            {
                                dataField: 'Is_Goal',
                                caption: 'Головна робота',
                                width: 200
                            }, 
                            {
                                dataField: 'UnitsShortName',
                                caption: 'Вимір',
                                width: 100
                            }, 
                            {
                                dataField: 'Value',
                                caption: 'Кількість',
                                width: 100
                            }
                        ]

                    },
                    {
                        title: "Матеріали у роботах",
                        template: "Action_Materials",
                        showBorders: true,
                        columnAutoWidth: false,
                        wordWrapEnabled: true,
                        width: 1700,
                        pager: {
                            showPageSizeSelector: true,
                            allowedPageSizes: [5, 10, 50],
                            showInfo: true
                        },
                        paging: {
                            pageSize: 5
                        },
                        headerFilter: {
                            visible: true
                        },
                        filterRow: {
                            visible: true,
                            applyFilter: "auto"
                        },
                        query: {
                            queryCode: 'ak_action_materials_by_claim',
                            limit: -1,
                            parameterValues: [
                                {
                                    key: '@claim_id',
                                    value: null
                                }
                            ]
                        },
                        columns: [
                            {
                                dataField: 'Action_type_Name',
                                caption: 'Тип роботи',
                                width: 300
                            }, 
                            {
                                dataField: 'material_name',
                                caption: 'Матеріал',
                                width: 300
                            }, 
                            {
                                dataField: 'Volume',
                                caption: 'Кількість',
                                width: 300
                            }, 
                            {
                                dataField: 'ShortName',
                                caption: 'Вимір',
                                width: 300
                            }, 
                            {
                                dataField: 'In_out',
                                caption: 'Використано/видобуто',
                                width: 400
                            }
                        ]

                    },
                    {
                        title: "Ускладнення по роботі",
                        template: "Action_Sequela",
                        showBorders: true,
                        columnAutoWidth: true,
                        wordWrapEnabled: true,
                        width: 1700,
                        pager: {
                            showPageSizeSelector: true,
                            allowedPageSizes: [5, 10, 50],
                            showInfo: true
                        },
                        paging: {
                            pageSize: 5
                        },
                        headerFilter: {
                            visible: true
                        },
                        filterRow: {
                            visible: true,
                            applyFilter: "auto"
                        },
                        query: {
                            queryCode: 'ak_action_sequela_by_claim',
                            limit: -1,
                            parameterValues: [
                                {
                                    key: '@claim_id',
                                    value: null
                                }
                            ]
                        },
                        columns: [
                            {
                                dataField: 'action_type_name',
                                caption: 'Назва роботи',
                                width: 300
                            }, 
                            {
                                dataField: 'Description',
                                caption: 'Опис ускладнення'
                            }, 
                            {
                                dataField: 'Created_at',
                                caption: 'Дата початку',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm',
                                width: 200
                            }, 
                            {
                                dataField: 'Fact_finish_at',
                                caption: 'Дата закінчення',
                                dataType: 'datetime',
                                format: 'dd.MM.yyyy HH.mm',
                                width: 200
                            }
                        ]

                    }
                ]
            },
            focusedRowEnabled: true,
            allowColumnResizing: true,
            columnResizingMode: 'widget',
            columnMinWidth: 50,
            columnAutoWidth: true,
            showBorders: true,
            hoverStateEnabled: true,
            groupingAutoExpandAll: null,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: true
            },
            headerFilter: {
                visible: true
            },
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [50, 100, 500]
            },
            paging: {
                pageSize: 50
            },
            
             summary: {
            //     totalItems: [{
            //         column: "claim_number",
            //         summaryType: "count"
            //     }]
            },           
            
            export: {
                enabled: true,
                fileName: 'Звіт_по_заявкам'
            },
            sorting: {
                mode: 'multiple'
            },
            //showBorders: false,
            //showColumnLines: false,
            showRowLines: true,
            keyExpr: 'Id'
        },
        filtersValuesMacros: [],
        textFilterMacros: '',
        filterValueTypes: {
            Input: 'Input',
            Select: 'Select',
            MultiSelect: 'MultiSelect',
            Date: 'Date',
            Time: 'Time',
            DateTime: 'DateTime',
            CheckBox: 'CheckBox'
        },
        firstLoad: true,
        init: function () {
            this.dataGridInstance.height = window.innerHeight - 220;
            this.table = document.getElementById('poshuk_table_main');
            this.table.style.display = 'none';
            for (let i = 0; i < document.getElementsByClassName("calendar-wrapper").length; i++)
                document.getElementsByClassName("calendar-wrapper")[i].getElementsByTagName("input")[0].readOnly = "readonly";

            document.getElementsByClassName("material-icons filter-star")[0].style.color = "black";
            document.getElementsByClassName("material-icons filter-star")[1].style.color = "black";

            this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.setFiltersValue, this));
            this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.findAllCheckedFilter, this));
            this.subscribers.push(this.messageService.subscribe('findFilterColumns', this.reloadTable, this));
            this.config.onToolbarPreparing = this.createTableButton.bind(this);
            this.dataGridInstance.onCellClick.subscribe(function(e) {
                if(e.column) {
                    if (e.column.dataField === 'claim_number dis' && e.row !== undefined) {
                        e.row.dataSource = new Array(this.config.masterDetail.tabs.length);

                        window.open(String(
                            location.origin +
                            localStorage.getItem('VirtualPath') +
                            '/sections/Claim/edit/' +
                            e.data.Id
                        ));
                    }
                }
            }.bind(this));
            this.config.onContentReady = this.afterRenderTable.bind(this);
        },

        masterDetailInitialized: function (event, row, tabItem) {
            
            if (!row.dataSource)
                row.dataSource = new Array(this.config.masterDetail.tabs.length);

            tabItem.query.parameterValues.value = row.data.Id;
            let masterDetailQuery = tabItem.query;
            masterDetailQuery.parameterValues[0].value = row.data.Id;
            
            this.queryExecutor(masterDetailQuery, this.setMasterDetailDataSource.bind(this, tabItem, row), this);
        },
        
        setMasterDetailDataSource: function (tabItem, row, data) {
            let dataSource = [];

            data.rows.forEach(row => {
                let item = [];

                for (let i = 0; i < data.columns.length; i++)
                    item[""+data.columns[i].name + ""] = row.values[i];

                dataSource.push(item);
                });
                debugger;
            
            //if (tabItem.template != 'TestTab')
                //row.dataSource[0]= dataSource;
            //else 
            row.dataSource[this.config.masterDetail.tabs.indexOf(tabItem)]= dataSource;
            
        },
        
        masterDetailOnRowClick: function(row, tabItem) {
            console.log(tabItem);
            console.log(row);
         },

        createTableButton: function (e) {
            const modalWindowMessageName = 'showModalWindow';
            const self = this;
            const buttonSaveFilters = {
                text: 'Зберегти',
                type: 'default',
                icon: 'save',
                location: 'before',
                method: function() {
                    self.messageService.publish({ name: modalWindowMessageName, button: 'saveFilters'});
                }
            }
            const buttonSetFilters = {
                text: 'Список',
                type: 'default',
                icon: 'detailslayout',
                location: 'before',
                method: function() {
                    self.messageService.publish({ name: modalWindowMessageName, button: 'showFilters'});
                }
            }
            /*const buttonApplyProps = {
                text: 'Excel',
                type: 'default',
                icon: 'exportxlsx',
                location: 'after',
                method: function() {
                    self.exportToExcel();
                }
            }*/
            const buttonSkipProps = {
                text: 'Налаштування полів',
                type: 'default',
                icon: 'preferences',
                location: 'after',
                class: 'defaultButton',
                method: function() {
                    self.messageService.publish({ name: modalWindowMessageName, button: 'gear'});
                }
            }
            //const buttonApply = this.createToolbarButton(buttonApplyProps);
            const buttonSkip = this.createToolbarButton(buttonSkipProps);
            const buttonSave = this.createToolbarButton(buttonSaveFilters);
            const buttonSet = this.createToolbarButton(buttonSetFilters);
            //e.toolbarOptions.items.push(buttonApply);
            e.toolbarOptions.items.push(buttonSkip);
            e.toolbarOptions.items.push(buttonSave);
            e.toolbarOptions.items.push(buttonSet);
        },
        createToolbarButton: function(button) {
            return {
                widget: 'dxButton',
                location: button.location,
                options: {
                    icon: button.icon,
                    type: button.type,
                    text: button.text,
                    elementAttr: {
                        class: button.class
                    },
                    onClick: function(e) {
                        e.event.stopImmediatePropagation();
                        button.method();
                    }.bind(this)
                }
            }
        },
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if(children.length > 0) {
                children.forEach(child =>{
                    element.appendChild(child);
                });
            } return element;
        },
        setFiltersValue:function(message) {
            this.dateValues = {
                created_at_from: null,
                created_at_to: null,
                closed_date_from: null,
                closed_date_to: null,
                transfer_date_from: null,
                transfer_date_to: null,
                state_changed_date_from: null,
                state_changed_date_to: null,
                state_changed_date_done_from: null,
                state_changed_date_done_to: null,
                execution_term_from: null,
                execution_term_to: null,
                control_date_from: null,
                control_date_to: null
            }

            this.applicantPhoneNumber = null;
            this.filtersValuesMacros = [];
            let filters = message.package.value.values;
            this.filtersLength = filters.length;
            this.filtersWithOutValues = 0;
            filters.forEach(filter => {
                if (filter.active === true || (filter.type === 'MultiSelect' && filter.value.length > 0)) {
                    const type = filter.type;
                    const value = filter.value;
                    const name = filter.name;
                    const placeholder = filter.placeholder;
                    switch (type) {
                        case this.filterValueTypes.Input:
                            if(name === 'zayavnyk_phone_number') {
                                this.applicantPhoneNumber = value;
                            }
                            this.createObjMacros(name, 'like', value, placeholder, value.viewValue, name, filter.type);
                            break;
                        case this.filterValueTypes.CheckBox:
                            this.createObjMacros(name, '=', value, filter.placeholder, undefined, name, filter.type);
                            break;
                        case this.filterValueTypes.DateTime:
                        case this.filterValueTypes.Date:
                            if(value.dateFrom !== '') {
                                const property = name + '_from';
                                this.setFilterDateValues(property, value.dateFrom);
                                this.setMacrosProps(name, '>=', value.dateFrom, placeholder, value.viewValue, filter.type, 'dateFrom');
                            }
                            if(value.dateTo !== '') {
                                const property = name + '_to';
                                this.setFilterDateValues(property, value.dateTo);
                                this.setMacrosProps(name, '<=', value.dateTo, placeholder, value.viewValue, filter.type, 'dateTo');
                            }
                            break;
                        case this.filterValueTypes.MultiSelect:
                            if(name === 'zayavnyk_age') {
                                const age = [];
                                let ageSendViewValue = '';
                                value.forEach(filter => {
                                    let values = filter.viewValue.split('-');
                                    let ageValue = '(zayavnyk_age>=' + values[0] + ' and zayavnyk_age<=' + values[1] + ')';
                                    age.push(ageValue);
                                    ageSendViewValue = ageSendViewValue + ', ' + filter.viewValue;
                                });
                                ageSendViewValue = ageSendViewValue.slice(2, [ageSendViewValue.length]);
                                const ageSendValue = '(' + age.join(' or ') + ')';
                                this.createObjMacros(name, '===', ageSendValue, placeholder, ageSendViewValue, name, filter.type);
                            }else{
                                let sumValue = '';
                                let sumViewValue = '';
                                if(value.length > 0) {
                                    value.forEach(filter => {
                                        sumValue = sumValue + ', ' +
                                        (typeof filter.value === 'string' ? `'${filter.value}'` : filter.value);
                                        sumViewValue = sumViewValue + ', ' + filter.viewValue;
                                    });
                                }
                                let numberSendValue = sumValue.slice(2, [sumValue.length]);
                                let numberSendViewValue = sumViewValue.slice(2, [sumViewValue.length]);
                                this.createObjMacros(name, 'in', numberSendValue, placeholder, numberSendViewValue, name, filter.type);
                            }
                            break;
                        default:
                            break;
                    }
                }
                debugger;
                if (filter.active === false) {
                    this.filtersWithOutValues += 1;
                }

                if ((filter.name === 'subject_include' || filter.name === 'subject_exclude') && filter.active !== false){
                    this.filtersWithOutValues += 1;
                }
            });
            this.filtersWithOutValues === this.filtersLength ? this.isSelected = false : this.isSelected = true;
        },
        setFilterDateValues: function(property, value) {
            this.dateValues[property] = value;
        },
        setMacrosProps: function(name, type, value, placeholder, viewValue, filterType, timePosition) {
            this.createObjMacros(
                'cast(' + name + ' as datetime)',
                type,
                value,
                placeholder,
                viewValue,
                name,
                filterType,
                timePosition
            );
        },
        createObjMacros: function(code, operation, value, placeholder, viewValue, name, type, timePosition) {
            this.filtersValuesMacros.push({code, operation, value, placeholder, viewValue, name, type, timePosition});
        },
        findAllCheckedFilter: function() {
            this.isSelected === true ? this.table.style.display = 'block' : this.table.style.display = 'none';
            if((this.filtersValuesMacros.length > 0 || this.applicantPhoneNumber !== null) && this.isSelected === true) {
                this.textFilterMacros = [];
                this.textFilterSubjectsMacros = [];
                this.filtersValuesMacros.forEach(el => this.createFilterMacros(el.code, el.operation, el.value));
                //this.textFilterSubjectsMacros.push(this.textFilterMacros.find(x => x.code === 'subject_include' ));
                //this.textFilterSubjectsMacros.push(this.textFilterMacros.find(x => x.code === 'subject_exclude' ));

                //this.textFilterMacros.slice(this.textFilterMacros.indexOf(this.textFilterMacros.find(x => x.code === 'subject_include' )),1);
                //this.textFilterMacros.slice(this.textFilterMacros.indexOf(this.textFilterMacros.find(x => x.code === 'subject_exclude' )),1);
                
                debugger;
                let macrosSubjectsValue = this.textFilterSubjectsMacros.join(' ').slice(0, -4);
                this.macrosSubjectsValue = macrosSubjectsValue === '' ? '1=1' : macrosSubjectsValue;
                let macrosValue = this.textFilterMacros.join(' ').slice(0, -4);
                this.macrosValue = macrosValue === '' ? '1=1' : macrosValue;
                this.sendMsgForSetFilterPanelState(false);
                this.config.query.parameterValues = [
                    { key: '@param1', value: this.macrosValue },
                    { key: '@registration_date_from', value: this.dateValues.created_at_from },
                    { key: '@registration_date_to', value: this.dateValues.created_at_to },
                    { key: '@closed_date_from', value: this.dateValues.closed_date_from },
                    { key: '@closed_date_to', value: this.dateValues.closed_date_to },
                    { key: '@transfer_date_from', value: this.dateValues.transfer_date_from },
                    { key: '@transfer_date_to', value: this.dateValues.transfer_date_to },
                    { key: '@state_changed_date_from', value: this.dateValues.state_changed_date_from },
                    { key: '@state_changed_date_to', value: this.dateValues.state_changed_date_to },
                    { key: '@state_changed_date_done_from', value: this.dateValues.state_changed_date_done_from },
                    { key: '@state_changed_date_done_to', value: this.dateValues.state_changed_date_done_to },
                    { key: '@execution_term_from', value: this.dateValues.execution_term_from },
                    { key: '@execution_term_to', value: this.dateValues.execution_term_to },
                    { key: '@control_date_from', value: this.dateValues.control_date_from },
                    { key: '@control_date_to', value: this.dateValues.control_date_to },
                    { key: '@zayavnyk_phone_number', value: this.applicantPhoneNumber },
                    { key: '@param2', value: this.macrosSubjectsValue }
                ];
                this.loadData(this.afterLoadDataHandler);
                this.messageService.publish({
                    name: 'filters',
                    filters: this.filtersValuesMacros
                });
            } else {
                this.messageService.publish({
                    name: 'filters',
                    filters: this.filtersValuesMacros
                });
            }
        },
        createFilterMacros: function(code, operation, value) {
            if(code !== 'zayavnyk_phone_number') {
                if(operation !== '>=' && operation !== '<=') {
                    let textMacros = '';
                    if(operation === 'like') {
                        textMacros = String(code) + ' ' + operation + ' \'%' + value + '%\' and';
                    }else if(operation === '===') {
                        textMacros = String(value) + ' and';
                    }else if(operation === '==') {
                        textMacros = String(code) + ' ' + '=' + ' ' + value + ' and';
                    }else if(operation === '+""+') {
                        textMacros = String(code) + ' in  (N\'' + value + '\' and';
                    }else if(operation === 'in') {
                        textMacros = String(code) + ' in (' + value + ') and';
                    }else if(operation === '=') {
                        textMacros = String(code) + ' ' + operation + ' N\'' + value + '\' and';
                    }
                    if (code !== 'subject_include' && code !== 'subject_exclude')
                        this.textFilterMacros.push(textMacros);
                    else 
                        this.textFilterSubjectsMacros.push(textMacros);
                }
            }
        },
        setFilterColumns: function(code, operation, value) {
            const filter = {
                key: code,
                value: {
                    operation: operation,
                    not: false,
                    values: value
                }
            };
            this.config.query.filterColumns.push(filter);
        },
        reloadTable: function(message) {
            debugger;
            this.setConfigColumns();
            message.value.forEach(function(el) {
                let column;
                switch (el.displayValue) {
                    case 'Plan_start_date':
                    case 'Plan_finish_at':
                    case 'Created_at':
                    case 'state_changed_date_done':
                        column = {
                            dataField: el.displayValue,
                            caption: el.caption,
                            width: 200,
                            dateType: 'datetime',
                            format: 'dd.MM.yyy HH.mm'
                        }
                        break;
                    case 'appeals_files_check':
                        column = {
                            dataField: el.displayValue,
                            caption: el.caption,
                            width: el.width,
                            customizeText: function(cellInfo) {
                                return this.setAppealsFilesCheckValue(cellInfo.value);
                            }.bind(this)
                        }
                        break;
                    case 'Result_Row':
                        column = {
                            totalItems: [{
                            column: "claim_number",
                            summaryType: "count"
                            }]
                        }
                        break;
                    default:
                        column = {
                            dataField: el.displayValue,
                            caption: el.caption,
                            width: el.width
                        }
                        break;
                }

                if (el.displayValue == 'Result_Row')
                    this.config.summary = column;
                else
                    this.config.columns.push(column);
            }.bind(this));
            this.loadData(this.afterLoadDataHandler);
        },
        setConfigColumns: function() {
            if (this.config.summary)
                if (this.config.summary.totalItems)
                    this.config.summary.totalItems = [];

            if (this.dataGridInstance.summary)
                if (this.dataGridInstance.summary.totalItems)
                    this.dataGridInstance.summary.totalItems = [];

            this.config.columns = [];
            this.config.columns = [

                {
                    dataField: 'claim_number',
                    caption: 'Номер заявки'
                },{
                    dataField: 'claim_created_at',
                    caption: 'Дата створення',
                    dataType: 'datetime',
                    format: 'dd.MM.yyy HH.mm',
                    width: 250
                }, {
                    dataField: 'claim_finish_at',
                    caption: 'Дата закриття',
                    dateType: 'datetime',
                    format: 'dd.MM.yyy HH.mm',
                    width: 250
                },{
                    dataField: 'User_Created_By',
                    caption: 'Створив'
                },{
                    dataField: 'claim_type_name',
                    caption: 'Тип заявки',
                    width: 1200
                }, {
                    dataField: 'Main_Place_Name',
                    caption: 'Головне місце',
                    width: 700
                }, {
                    dataField: 'Response_Org_Name',
                    caption: 'Відповідальний підрозділ',
                    width: 350
                }

                /*{
                    dataField: 'question_registration_number',
                    caption: 'Номер питання',
                    width: 120
                }, {
                    dataField: 'question_question_type',
                    caption: 'Тип питання'
                }, {
                    dataField: 'zayavnyk_full_name',
                    caption: 'ПІБ Заявника',
                    width: 250
                }, {
                    dataField: 'zayavnyk_building_number',
                    caption: 'Будинок',
                    width: 250
                }, {
                    dataField: 'zayavnyk_flat',
                    caption: 'Квартира',
                    width: 60
                }, {
                    dataField: 'question_object',
                    caption: 'Об\'єкт',
                    width: 250
                }, {
                    dataField: 'assigm_executor_organization',
                    caption: 'Виконавець',
                    width: 100 ,
                    dateType: undefined
                }, {
                    dataField: 'registration_date',
                    caption: 'Поступило',
                    width: 130,
                    dateType: 'datetime',
                    format: 'dd.MM.yyy HH.mm'
                }*/
            ]
        },
        afterLoadDataHandler: function(data) {
            this.render();
            this.messageService.publish({ name: 'dataLength', value: data.length });

            let elements = document.querySelectorAll('.dx-datagrid-export-button');
            elements = Array.from(elements);
            elements.forEach(element => {
                let spanElement = this.createElement('span', { className: 'dx-button-text', innerText: 'Excel' });
                element.firstElementChild.appendChild(spanElement);
            });
        },
        afterRenderTable: function () {
            /*let elements = document.querySelectorAll('.dx-datagrid-export-button');
            elements = Array.from(elements);
            elements.forEach(element => {
                let spanElement = this.createElement('span', { className: 'dx-button-text', innerText: 'Excel'});
                element.firstElementChild.appendChild(spanElement);
            });*/
        },
        sendMsgForSetFilterPanelState: function(state) {
            const msg = {
                name: 'SetFilterPanelState',
                package: {
                    value: state
                }
            };
            this.messageService.publish(msg);
        },
        exportToExcel: function() {
            let exportQuery = {
                queryCode: this.config.query.code,
                limit: -1,
                parameterValues: [
                    { key: '@param1', value: this.macrosValue },
                    { key: '@registration_date_from', value: this.dateValues.registration_date_from },
                    { key: '@registration_date_to', value: this.dateValues.registration_date_to },
                    { key: '@closed_date_from', value: this.dateValues.closed_date_from },
                    { key: '@closed_date_to', value: this.dateValues.closed_date_to },
                    { key: '@transfer_date_from', value: this.dateValues.transfer_date_from },
                    { key: '@transfer_date_to', value: this.dateValues.transfer_date_to },
                    { key: '@state_changed_date_from', value: this.dateValues.state_changed_date_from },
                    { key: '@state_changed_date_to', value: this.dateValues.state_changed_date_to },
                    { key: '@state_changed_date_done_from', value: this.dateValues.state_changed_date_done_from },
                    { key: '@state_changed_date_done_to', value: this.dateValues.state_changed_date_done_to },
                    { key: '@execution_term_from', value: this.dateValues.execution_term_from },
                    { key: '@execution_term_to', value: this.dateValues.execution_term_to },
                    { key: '@control_date_from', value: this.dateValues.control_date_from },
                    { key: '@control_date_to', value: this.dateValues.control_date_to },
                    { key: '@zayavnyk_phone_number', value: this.applicantPhoneNumber },
                    { key: '@pageOffsetRows', value: 0},
                    { key: '@pageLimitRows', value: 10}
                ]
            };
            this.queryExecutor(exportQuery, this.myCreateExcel, this);
        },
        myCreateExcel: function(data) {
            if(data.rows.length > 0) {
                this.showPagePreloader('Зачекайте, формується документ');
                const workbook = this.createExcel();
                const worksheet = workbook.addWorksheet('Заявки', {
                    pageSetup:{
                        orientation: 'landscape',
                        fitToPage: false,
                        fitToWidth: true
                    }
                });
                this.excelFields = [];
                this.setExcelFields(data);
                this.setHeader(worksheet);
                this.setWorksheetStyle(worksheet);
                this.setExcelColumns(worksheet);
                this.setRowValues(data, worksheet);
                this.helperFunctions.excel.save(workbook, 'Заявки', this.hidePagePreloader);
            }
        },
        setHeader: function(worksheet) {
            let cellInfoCaption = worksheet.getCell('A1');
            cellInfoCaption.value = 'Інформація';
            let cellInfo = worksheet.getCell('A2');
            cellInfo.value = 'про звернення громадян, що надійшли до Контактного центру  міста Києва. Термін виконання …';
            let cellPeriod = worksheet.getCell('A3');
            cellPeriod.value = 'Період вводу з (включно) : дата з ' +
                this.changeDateTimeValues(this.dateValues.registration_date_from, true) +
                ' дата по ' +
                this.changeDateTimeValues(this.dateValues.registration_date_to, true) +
                ' (Розширений пошук).';
            let cellNumber = worksheet.getCell('A4');
            cellNumber.value = 'Реєстраційний № РДА …';
            worksheet.mergeCells('A1:F1');
            worksheet.mergeCells('A2:F2');
            worksheet.mergeCells('A3:F3');
        },
        setExcelFields: function(data) {
            this.config.columns.forEach(column => {
                let columnDataField = column.dataField;
                let columnCaption = column.caption;
                for (let i = 0; i < data.columns.length; i++) {
                    const dataColumnDataFiled = data.columns[i].code;
                    if(
                        columnDataField === dataColumnDataFiled
                    ) {
                        let obj = {
                            name: columnDataField,
                            index: i,
                            caption: columnCaption
                        }
                        this.excelFields.push(obj);
                    }
                }
            });
        },
        setExcelColumns: function(worksheet) {
            let captions = [];
            let columnsHeader = [];
            let otherColumns = [];
            let columnNumber = {
                key: 'number',
                width: 5
            }
            columnsHeader.push(columnNumber);
            let rowNumber = '№ з/п';
            captions.push(rowNumber);
            this.excelFields.forEach(field => {
                if(field.name === 'question_registration_number') {
                    let obj = {
                        key: 'registration_number',
                        width: 10,
                        height: 20
                    };
                    columnsHeader.push(obj);
                    captions.push('Номер, дата, час');
                }else if(field.name === 'zayavnyk_full_name') {
                    let obj = {
                        key: 'name',
                        width: 15
                    };
                    columnsHeader.push(obj);
                    captions.push('Заявник');
                }else if(field.name === 'question_question_type') {
                    let obj1 = {
                        key: 'question_type',
                        width: 10
                    };
                    columnsHeader.push(obj1);
                    captions.push('Тип питання');
                    let obj2 = {
                        key: 'assigm_question_content',
                        width: 62
                    };
                    columnsHeader.push(obj2);
                    captions.push('Суть питання');
                }else if(field.name === 'assigm_executor_organization') {
                    let obj = {
                        key: 'organization',
                        width: 11
                    };
                    columnsHeader.push(obj);
                    captions.push('Виконавець');
                }else if(field.name === 'question_object') {
                    let obj = {
                        key: 'object',
                        width: 16
                    };
                    columnsHeader.push(obj);
                    captions.push('Місце проблеми (Об\'єкт)');
                }else if(
                    field.name === 'registration_date' ||
                    field.name === 'zayavnyk_building_number' ||
                    field.name === 'zayavnyk_flat' ||
                    field.name === 'assigm_question_content'
                ) {
                    let obj = {
                        key: field.name,
                        width: 13
                    };
                    otherColumns.push(obj);
                }else{
                    let obj = {
                        key: field.name,
                        width: 13
                    };
                    columnsHeader.push(obj);
                    captions.push(field.caption);
                }
            });
            worksheet.getRow(5).values = captions;
            worksheet.columns = columnsHeader;
        },
        setWorksheetStyle: function(worksheet) {
            worksheet.getRow(1).font = { name: 'Times New Roman', family: 4, size: 10, underline: false, bold: true , italic: false};
            worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getRow(2).font = { name: 'Times New Roman', family: 4, size: 10, underline: false, bold: true , italic: false};
            worksheet.getRow(2).alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getRow(3).font = { name: 'Times New Roman', family: 4, size: 10, underline: false, bold: true , italic: false};
            worksheet.getRow(3).alignment = { vertical: 'middle', horizontal: 'left' };
            worksheet.getRow(4).font = { name: 'Times New Roman', family: 4, size: 10, underline: false, bold: true , italic: false};
            worksheet.getRow(5).alignment = { vertical: 'middle', horizontal: 'left' };
            worksheet.pageSetup.margins = {
                left: 0.4, right: 0.3,
                top: 0.4, bottom: 0.4,
                header: 0.0, footer: 0.0
            };
            worksheet.getRow(2).border = {
                bottom: {style:'thin'}
            };
            worksheet.getRow(5).font = { name: 'Times New Roman', family: 4, size: 10, underline: false, bold: true , italic: false};
            worksheet.getRow(5).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        },
        setRowValues: function(data, worksheet) {
            let indexRegistrationDate = data.columns.findIndex(el => el.code.toLowerCase() === 'registration_date');
            let indexZayavnykFlat = data.columns.findIndex(el => el.code.toLowerCase() === 'zayavnyk_flat');
            let indexZayavnykFullName = data.columns.findIndex(el => el.code.toLowerCase() === 'zayavnyk_full_name');
            let indexZayavnykBuildingNumber = data.columns.findIndex(el => el.code.toLowerCase() === 'zayavnyk_building_number');
            let indexAssigmQuestionContent = data.columns.findIndex(el => el.code.toLowerCase() === 'assigm_question_content');
            let indexExecutionTerm = data.columns.findIndex(el => el.code.toLowerCase() === 'execution_term');
            let indexRegistrationNumber = data.columns.findIndex(el => el.code.toLowerCase() === 'question_registration_number');
            let indexQuestionType = data.columns.findIndex(el => el.code.toLowerCase() === 'question_question_type');
            let indexExecutorOrganization = data.columns.findIndex(el => el.code.toLowerCase() === 'assigm_executor_organization');
            let indexQuestionObject = data.columns.findIndex(el => el.code.toLowerCase() === 'question_object');
            let rows = [];
            for(let j = 0; j < data.rows.length; j++) {
                const row = data.rows[j];
                const rowItem = { number: j + 1 };
                const executionTerm = this.changeDateTimeValues(row.values[indexExecutionTerm], false);
                const regDate = this.changeDateTimeValues(row.values[indexRegistrationDate], false);
                rowItem.registration_number = row.values[indexRegistrationNumber] + ' ' + regDate;
                rowItem.name = row.values[indexZayavnykFullName] + ' ' +
                        row.values[indexZayavnykBuildingNumber] + ', кв. ' +
                        row.values[indexZayavnykFlat];
                rowItem.question_type = 'Тип питання: ' + row.values[indexQuestionType];
                rowItem.assigm_question_content = 'Зміст: ' + row.values[indexAssigmQuestionContent];
                rowItem.organization = row.values[indexExecutorOrganization] + '. Дату контролю: ' + executionTerm;
                rowItem.object = row.values[indexQuestionObject];
                for(let i = 0; i < this.excelFields.length; i++) {
                    const field = this.excelFields[i];
                    const prop = this.excelFields[i].name;
                    switch (prop) {
                        case 'appeals_user':
                        case 'appeals_receipt_source':
                        case 'appeals_district':
                        case 'zayavnyk_phone_number':
                        case 'zayavnyk_entrance':
                        case 'zayavnyk_applicant_privilage':
                        case 'zayavnyk_social_state':
                        case 'zayavnyk_sex':
                        case 'zayavnyk_applicant_type':
                        case 'zayavnyk_age':
                        case 'zayavnyk_email':
                        case 'question_ObjectTypes':
                        case 'question_organization':
                        case 'question_question_state':
                        case 'question_list_state':
                        case 'assigm_main_executor':
                        case 'assigm_accountable':
                        case 'assigm_assignment_state':
                        case 'assigm_assignment_result':
                        case 'assigm_assignment_resolution':
                        case 'assigm_user_reviewed':
                        case 'assigm_user_checked':
                        case 'appeals_enter_number':
                        case 'control_comment':
                        case 'rework_counter':
                        case 'plan_program':
                        case 'ConsDocumentContent':
                            rowItem[prop] = row.values[field.index];
                            break
                        case 'transfer_date':
                        case 'state_changed_date':
                        case 'state_changed_date_done':
                        case 'execution_term':
                        case 'control_date':
                            rowItem[prop] = this.changeDateTimeValues(row.values[field.index], false);
                            break
                        case 'appeals_files_check':
                            rowItem[prop] = this.setAppealsFilesCheckValue(row.values[field.index]);
                            break
                        default:
                            break
                    }
                }
                rows.push(rowItem);
            }
            rows.forEach(row => {
                worksheet.addRow(row);
            });
            this.setRowCellStyle(worksheet, rows);
        },
        setRowCellStyle: function(worksheet, rows) {
            for(let i = 0; i < rows.length + 1; i++) {
                let number = i + 5;
                let row = worksheet.getRow(number);
                row.height = 100;
                worksheet.getRow(number).border = {
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'}
                };
                worksheet.getRow(number).alignment = {
                    vertical: 'middle',
                    horizontal: 'center',
                    wrapText: true
                };
                worksheet.getRow(number).font = {
                    name: 'Times New Roman',
                    family: 4, size: 10,
                    underline: false,
                    bold: false ,
                    italic: false
                };
            }
        },
        setAppealsFilesCheckValue: function(value) {
            return value === 'false' ? 'Відсутній' : 'Наявний';
        },
        changeDateTimeValues: function(value, caption) {
            if(value === null) {
                return ' '
            }
            let date = undefined;
            if(caption) {
                date = new Date(value);
            } else {
                const dateValue = value + '+0000';
                date = new Date(Date.parse(dateValue));
            }
            let dd = date.getDate().toString();
            let mm = (date.getMonth() + 1).toString();
            let yyyy = date.getFullYear().toString();
            let HH = date.getHours().toString();
            let MM = date.getMinutes().toString();
            dd = dd.length === 1 ? '0' + dd : dd;
            mm = mm.length === 1 ? '0' + mm : mm;
            HH = HH.length === 1 ? '0' + HH : HH;
            MM = MM.length === 1 ? '0' + MM : MM;
            return `${dd}.${mm}.${yyyy} ${HH}:${MM}`;
        }
    };
}());
