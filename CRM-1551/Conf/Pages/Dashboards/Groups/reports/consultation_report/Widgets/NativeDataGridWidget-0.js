(function() {
    return {
        config: {
            query: {
                code: 'db_ConsultationStatistic',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            export: {
                fileName: 'звіт по консультаціях'
            },
            focusedRowEnabled: true,
            showRowLines: true,
            wordWrapEnabled: true,
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
                    allowedPageSizes: [5, 10, 50],
                    showInfo: true
                },
                paging: {
                    pageSize: 10
                },
                columns: [
                    {
                        dataField: 'Name',
                        caption: '',
                        alignment: 'left',
                        customizeText: function(data) {
                            return 'Разом: ' + data.value;
                        }
                    },
                    {
                        dataField: 'article_qty',
                        caption: 'Кількість по статтях',
                        alignment: 'center'
                    },
                    {
                        dataField: 'article_percent',
                        caption: '% по статтях',
                        alignment: 'center'
                    },
                    {
                        dataField: '',
                        alignment: 'center',
                        caption: 'Загальна тривалість',
                        columns: [
                            {
                                dataField: 'talk_all',
                                caption: 'Питання + Консультація',
                                alignment: 'center'
                            },
                            {
                                dataField: 'talk_consultations_only',
                                caption: 'Тільки консультація',
                                alignment: 'center'
                            }
                        ]
                    },
                    {
                        dataField: 'talk_consultation_average',
                        caption: 'Середній час на консультацію',
                        alignment: 'center'
                    }
                ]
            },
            columns: [
                {
                    dataField: 'Name',
                    caption: '',
                    alignment: 'left'
                },
                {
                    dataField: 'article_qty',
                    caption: 'Кількість по статтях',
                    alignment: 'center'
                },
                {
                    dataField: 'article_percent',
                    caption: '% по статтях',
                    alignment: 'center'
                },
                {
                    dataField: '',
                    caption: 'Загальна тривалість',
                    alignment: 'center',
                    columns: [
                        {
                            dataField: 'talk_all',
                            caption: 'Питання + Консультація',
                            alignment: 'center'
                        },
                        {
                            dataField: 'talk_consultations_only',
                            caption: 'Тільки консультація',
                            alignment: 'center'
                        }
                    ]
                },
                {
                    dataField: 'talk_consultation_average',
                    caption: 'Середній час на консультацію',
                    alignment: 'center'
                }
            ],
            keyExpr: 'Id',
            summary: {
                totalItems: [
                    {
                        column: 'Name',
                        summaryType: 'count',
                        customizeText: function() {
                            return 'Разом';
                        }
                    }
                ]
            }
        },
        firstLoad: true,
        init: function() {
            this.getDataFromLink('OrgId')
            this.applyChanges(true);
            this.config.onToolbarPreparing = this.createTableButton.bind(this);
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this);
            this.sub = this.messageService.subscribe('ApplyGlobalFilters', this.renderTable, this);
        },
        applyChanges: function(state) {
            this.getSum();
            const msg = {
                name: 'SetFilterPanelState',
                package: {
                    value: state
                }
            };
            this.messageService.publish(msg);
        },
        masterDetailInitialized: function(event, row) {
            row.dataSource = [];
            const masterDetailQuery = {
                queryCode: 'db_ConsultationStatistic_RowDetails',
                limit: -1,
                parameterValues: [
                    { key: '@dateFrom', value: this.dateFrom },
                    { key: '@dateTo', value: this.dateTo },
                    { key: '@knowledge_id', value: row.data.Id }
                ],
                filterColumns:[
                    {
                        key: 'UserId',
                        value: {
                            operation: 0,
                            not: false,
                            values: this.operator
                        }
                    }]
            };
            this.queryExecutor(masterDetailQuery, this.setMasterDetailDataSource.bind(this, row), this);
        },
        setMasterDetailDataSource: function(row, data) {
            const dataSource = [];
            data.rows.forEach(row => {
                const masterDetailColumns = {
                    'Name': row.values[1],
                    'article_qty': row.values[2],
                    'article_percent': row.values[3],
                    'talk_all': row.values[4],
                    'talk_consultations_only': row.values[5],
                    'talk_consultation_average': row.values[6]
                }
                dataSource.push(masterDetailColumns);
            })
            row.dataSource = dataSource;
        },
        createTableButton(e) {
            let toolbarItems = e.toolbarOptions.items;
            toolbarItems.push({
                widget: 'dxButton',
                location: 'after',
                options: {
                    icon: 'exportxlsx',
                    type: 'default',
                    text: 'Excel',
                    onClick: function() {
                        this.dataGridInstance.instance.exportToExcel();
                    }.bind(this)
                }
            })
        },
        getDataFromLink: function(par) {
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
            return getDataFromLink[par];
        },
        getSum: function() {
            const masterDetailQuery = {
                queryCode: 'db_ConsultationStatistic_Result',
                limit: -1,
                parameterValues: [
                    { key: '@dateFrom', value: this.dateFrom },
                    { key: '@dateTo', value: this.dateTo }
                ],
                filterColumns:[
                    {
                        key: 'UserId',
                        value: {
                            operation: 0,
                            not: false,
                            values: this.operator
                        }
                    }]
            };
            this.queryExecutor(masterDetailQuery, this.setColumnsSummary, this);
        },
        results: [],
        setColumnsSummary: function(data) {
            this.results = [];
            this.config.summary.totalItems = [];
            let obj_Sum = {
                column: 'Name',
                summaryType: 'count',
                customizeText: function() {
                    return 'Разом';
                }
            }
            this.config.summary.totalItems.push(obj_Sum);

            if (data.rows.length) {
                for (let i = 0; i < data.columns.length; i++) {
                    const dataField = data.columns[i].code;
                    const value = data.rows[0].values[i];
                    let obj = {
                        column: dataField,
                        name: dataField,
                        summaryType: 'custom'
                    }
                    this.results.push(value);
                    this.config.summary.totalItems.push(obj);
                }
                this.config.summary.calculateCustomSummary = this.calculateCustomSummary.bind(this);
            }
            this.hidePagePreloader();
            this.loadData(this.afterLoadDataHandler);
        },
        calculateCustomSummary: function(options) {
            switch (options.name) {
                case 'article_qty':
                    options.totalValue = this.results[1];
                    break;
                case 'article_percent':
                    options.totalValue = this.results[2];
                    break;
                case 'talk_all':
                    options.totalValue = this.results[3];
                    break;
                case 'talk_consultations_only':
                    options.totalValue = this.results[4];
                    break;
                case 'talk_consultation_average':
                    options.totalValue = this.results[5];
                    break;
                default:
                    break;
            }
        },
        getFiltersParams: function(message) {
            let period = message.package.value.values.find(f => f.name === 'period').value;
            let operator = message.package.value.values.find(f => f.name === 'operator').value;
            if (period !== null) {
                if (period.dateFrom !== '' && period.dateTo !== '') {
                    this.dateFrom = period.dateFrom;
                    this.dateTo = period.dateTo;
                    this.config.query.parameterValues = [
                        { key: '@dateFrom', value: this.dateFrom },
                        { key: '@dateTo', value: this.dateTo }
                    ];
                    this.operator = this.extractOrgValues(operator);
                    this.config.query.filterColumns = [];
                    if (this.operator.length > 0) {
                        const filter = {
                            key: 'UserId',
                            value: {
                                operation: 0,
                                not: false,
                                values: this.operator
                            }
                        };
                        this.config.query.filterColumns.push(filter);
                    }
                }
            }
        },
        extractOrgValues: function(items) {
            if(items.length && items !== '') {
                const valuesList = [];
                items.forEach(item => valuesList.push(item.value));
                return valuesList;
            }
            return [];
        },
        destroy: function() {
            this.sub.unsubscribe();
        },
        renderTable() {
            this.loadData(this.afterLoadDataHandler)
            this.applyChanges(false)
        },
        afterLoadDataHandler: function() {
            this.render();
        }
    }
}())
