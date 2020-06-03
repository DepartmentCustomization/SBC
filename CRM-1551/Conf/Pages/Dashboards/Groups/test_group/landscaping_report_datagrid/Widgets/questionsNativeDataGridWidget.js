(function() {
    return {
        config: {
            query: {
                code: 'kp_blag_Report1',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'territories_name',
                    caption: 'Сектор',
                    width: 250
                },
                {
                    dataField: 'count_all',
                    caption: 'Надійшло',
                    alignment: 'center'
                },
                {
                    caption: 'По статусах',
                    alignment: 'center',
                    columns: [
                        {
                            dataField: 'count_registered',
                            caption: 'Зареєстровано',
                            alignment: 'center'
                        },
                        {
                            dataField: 'count_in_work',
                            caption: 'В роботі',
                            alignment: 'center'
                        },
                        {
                            dataField: 'count_on_inspection',
                            caption: 'На перевірці',
                            alignment: 'center'
                        },
                        {
                            dataField: 'count_closed_performed',
                            caption: 'Закрито/Виконано ',
                            alignment: 'center'
                        },
                        {
                            dataField: 'count_closed_clear',
                            caption: 'Закрито/Роз\'яснено',
                            alignment: 'center'
                        },
                        {
                            dataField: 'count_for_completion',
                            caption: 'На доопрацювання',
                            alignment: 'center'
                        }
                    ]
                },
                {
                    dataField: 'count_built',
                    caption: 'Прострочено',
                    width: 150,
                    alignment: 'center'
                },
                {
                    dataField: 'count_not_processed_in_time',
                    caption: 'Не вчасно опрацьовано',
                    alignment: 'center'
                },
                {
                    caption: 'Показники',
                    alignment: 'center',
                    columns: [
                        {
                            dataField: 'speed_of_employment',
                            caption: 'Бистрота прийняття в роботу',
                            alignment: 'center'
                        },
                        {
                            dataField: 'timely_processed',
                            caption: '% вчасно опрацьованих',
                            alignment: 'center',
                            customizeText: function(data) {
                                if(data.value) {
                                    return `${data.value}%`;
                                }
                                return ''
                            }
                        },
                        {
                            dataField: 'implementation',
                            caption: '% виконання',
                            alignment: 'center',
                            customizeText: function(data) {
                                if(data.value) {
                                    return `${data.value}%`;
                                }
                                return ''
                            }
                        },
                        {
                            dataField: 'reliability',
                            caption: '% достовірності',
                            alignment: 'center',
                            customizeText: function(data) {
                                if(data.value) {
                                    return `${data.value}%`;
                                }
                                return ''
                            }
                        }
                    ]
                }
            ],
            export: {
                enabled: true,
                fileName: 'Благоустрій питання'
            },
            focusedRowEnabled: true,
            showRowLines: true,
            wordWrapEnabled: true,
            keyExpr: 'Id',
            showBorders: false,
            showColumnLines: true,
            remoteOperations: null,
            allowColumnReordering: null,
            rowAlternationEnabled: null,
            columnAutoWidth: null,
            hoverStateEnabled: true,
            columnWidth: null,
            allowColumnResizing: true,
            showFilterRow: true,
            showHeaderFilter: false,
            showColumnChooser: false,
            showColumnFixing: true,
            groupingAutoExpandAll: null,
            masterDetail: {
                enabled: true,
                template: 'masterDetailInstance',
                showBorders: true,
                columnAutoWidth: false,
                wordWrapEnabled: true,
                pager: {
                    showPageSizeSelector: true,
                    allowedPageSizes: [5, 10 , 50],
                    showInfo: true
                },
                paging: {
                    pageSize: 10
                },
                columns: [
                    {
                        dataField: 'exec_name',
                        caption: '',
                        width: 250
                    },
                    {
                        dataField: 'count_all',
                        caption: 'Надійшло',
                        alignment: 'center'
                    },
                    {
                        caption: 'По статусах',
                        alignment: 'center',
                        columns: [
                            {
                                dataField: 'count_registered',
                                caption: 'Зареєстровано',
                                alignment: 'center'
                            },
                            {
                                dataField: 'count_in_work',
                                caption: 'В роботі',
                                alignment: 'center'
                            },
                            {
                                dataField: 'count_on_inspection',
                                caption: 'На перевірці',
                                alignment: 'center'
                            },
                            {
                                dataField: 'count_closed_performed',
                                caption: 'Закрито/Виконано ',
                                alignment: 'center'
                            },
                            {
                                dataField: 'count_closed_clear',
                                caption: 'Закрито/Роз\'яснено',
                                alignment: 'center'
                            },
                            {
                                dataField: 'count_for_completion',
                                caption: 'На доопрацювання',
                                alignment: 'center'
                            }
                        ]
                    },
                    {
                        dataField: 'count_built',
                        caption: 'Прострочено',
                        width: 150,
                        alignment: 'center'
                    },
                    {
                        dataField: 'count_not_processed_in_time',
                        caption: 'Не вчасно опрацьовано',
                        alignment: 'center'
                    },
                    {
                        caption: 'Показники',
                        alignment: 'center',
                        columns: [
                            {
                                dataField: 'speed_of_employment',
                                caption: 'Бистрота прийняття в роботу',
                                alignment: 'center'
                            },
                            {
                                dataField: 'timely_processed',
                                caption: '% вчасно опрацьованих',
                                alignment: 'center',
                                customizeText: function(data) {
                                    if(data.value) {
                                        return `${data.value}%`;
                                    }
                                    return ''
                                }
                            },
                            {
                                dataField: 'implementation',
                                caption: '% виконання',
                                alignment: 'center',
                                customizeText: function(data) {
                                    if(data.value) {
                                        return `${data.value}%`;
                                    }
                                    return ''
                                }
                            },
                            {
                                dataField: 'reliability',
                                caption: '% достовірності',
                                alignment: 'center',
                                customizeText: function(data) {
                                    if(data.value) {
                                        return `${data.value}%`;
                                    }
                                    return ''
                                }
                            }
                        ]
                    }
                ]
            }
        },
        firstLoad: true,
        init: function() {
            this.dataGridInstance.height = window.innerHeight - 80;
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this);
            this.sub = this.messageService.subscribe('ApplyGlobalFilters', this.applyChanges, this);
            /* this.dataGridInstance.onCellClick.subscribe(e => {
                if(e.column) {
                    if(e.column.dataField === 'territories_name' && e.row !== undefined) {
                        this.messageService.publish({
                            name: 'showSubTable',
                            sectorId: e.data.Id,
                            sectorName: e.data.territories_name,
                            dateTo: this.dateTo,
                            dateFrom: this.dateFrom
                        });
                    }
                }
            }); */
        },
        masterDetailInitialized: function(row) {
            this.config.masterDetail.dataSource = [];
            const masterDetailQuery = {
                queryCode: 'kp_blag_Report2',
                limit: -1,
                parameterValues: [
                    {key: '@sector_id', value: row.data.Id},
                    {key: '@date_to', value: this.dateTo},
                    {key: '@date_from', value: this.dateFrom}
                    /* {key: '@date_from' , value: this.dateFrom },
                    {key: '@date_to' , value: this.dateTo },
                    {key: '@districts' , value: this.districts } */
                ]
            };
            this.queryExecutor(masterDetailQuery, this.setMasterDetailDataSource, this);
        },
        setMasterDetailDataSource: function(data) {
            let dataSource = [];
            data.rows.forEach(row => {
                const item = {
                    'exec_name': row.values[1],
                    'count_all': row.values[2],
                    'timely_processed': row.values[12]
                }
                dataSource.push(item);
            })
            this.config.masterDetail.dataSource = dataSource;
        },
        masterDetailOnRowClick: function() {},
        destroy: function() {
            this.sub.unsubscribe();
        },
        applyChanges: function() {
            const msg = {
                name: 'SetFilterPanelState',
                package: {
                    value: false
                }
            };
            this.messageService.publish(msg);
            this.loadData(this.afterLoadDataHandler);
        },
        getFiltersParams: function(message) {
            const period = message.package.value.values.find(f => f.name === 'period').value;
            const districts = message.package.value.values.find(f => f.name === 'district').value;
            if(period !== null) {
                if(period.dateFrom !== '' && period.dateTo !== '') {
                    this.dateFrom = period.dateFrom;
                    this.dateTo = period.dateTo;
                    this.districts = this.extractOrgValues(districts);
                    this.config.query.parameterValues = [
                        {key: '@date_from' , value: this.dateFrom },
                        {key: '@date_to' , value: this.dateTo },
                        {key: '@districts' , value: this.districts }
                    ];
                    if (this.firstLoad) {
                        this.loadData(this.afterLoadDataHandler);
                        this.firstLoad = false;
                    }
                }
            }
        },
        extractOrgValues: function(items) {
            if(items.length && items !== '') {
                const valuesList = [];
                items.forEach(item => valuesList.push(item.value));
                return valuesList.join(', ');
            }
            return [];
        },
        afterLoadDataHandler: function() {
            this.render();
        }
    };
}());