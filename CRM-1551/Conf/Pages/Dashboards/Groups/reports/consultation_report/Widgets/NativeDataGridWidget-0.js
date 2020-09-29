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
                    allowedPageSizes: [5, 10 , 50],
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
                    dataField: 'article_percent',
                    caption: '% по статтях',
                    dataType: 'number',
                    format: 'percent',
                    allowGrouping: false,
                    alignment: 'center',
                    cssClass: 'bullet'
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
            summary: {
                totalItems: [
                    {
                        column: 'article_qty',
                        summaryType: 'sum',
                        alignment: 'center',
                        customizeText: function(data) {
                            return 'Разом: ' + data.value;
                        }
                    }, {
                        column: 'article_percent',
                        summaryType: 'avg',
                        format: 'percent',
                        customizeText: function(data) {
                            return 'Середнє: ' + data.value.toFixed(2);
                        }
                    }, {
                        column: 'talk_all',
                        summaryType: 'sum',
                        alignment: 'center',
                        customizeText: function(data) {
                            return 'Разом: ' + data.value;
                        }
                    }, {
                        column: 'talk_consultations_only',
                        summaryType: 'sum',
                        alignment: 'center',
                        customizeText: function(data) {
                            return 'Разом: ' + data.value;
                        }
                    }, {
                        column: 'talk_consultation_average',
                        summaryType: 'avg',
                        format: 'percent',
                        customizeText: function(data) {
                            return 'Середнє: ' + data.value.toFixed(2);
                        }
                    }
                ]},
            keyExpr: 'Id'
        },
        summary: [],
        firstLoad: true,
        init: function() {
            this.applyChanges(true);
            this.config.onToolbarPreparing = this.createTableButton.bind(this);
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this);
            this.sub = this.messageService.subscribe('ApplyGlobalFilters',this.renderTable , this);
            this.config.onCellPrepared = this.onCellPrepared.bind(this);
            this.config.columns[3].cellTemplate = this.myMethod.bind(this);
        }, myMethod: function(container, options) {
            $('<div/>').dxBullet({
                onIncidentOccurred: null,
                size: {
                    width: 150,
                    height: 35
                },
                margin: {
                    top: 5,
                    bottom: 0,
                    left: 5
                },
                showTarget: false,
                showZeroLevel: true,
                value: options.value * 100,
                startScaleValue: 0,
                endScaleValue: 100,
                tooltip: {
                    enabled: true,
                    font: {
                        size: 18
                    },
                    paddingTopBottom: 2,
                    customizeTooltip: function() {
                        return { text: options.text };
                    },
                    zIndex: 5
                }
            }).appendTo(container);

        },
        afterRenderTable: function() {
            this.summary = [];
            const collections = document.querySelectorAll('.dx-row');
            collections.forEach(collection => {
                const summary = Array.prototype.slice.call(collection.cells, 0);
                summary.forEach(cell => {
                    const sum = cell.innerText.slice(0, 5);
                    if(sum === 'Разом' || sum === 'Серед') {
                        this.summary.push(cell.innerText);
                    }
                });
            });
        },
        applyChanges: function(state) {
            const msg = {
                name: 'SetFilterPanelState',
                package: {
                    value: state
                }
            };
            this.messageService.publish(msg);
        },
        onCellPrepared: function() {
            /*if(options.rowType === 'data') {
                if(options.cellElement.classList.contains('bullet')) {

                }
            }*/
        },
        masterDetailInitialized: function(event, row) {
            row.dataSource = [];
            const masterDetailQuery = {
                queryCode: 'db_ConsultationStatistic_RowDetails',
                limit: -1,
                parameterValues: [
                    {key: '@dateFrom' , value: this.dateFrom },
                    {key: '@dateTo' , value: this.dateTo },
                    {key: '@UserId' , value: this.operators },
                    {key: '@knowledge_id', value:row.data.Id}
                ]
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
        discountCellTemplate(container, options) {
            $('<div/>').dxBullet({
                onIncidentOccurred: null,
                size: {
                    width: 150,
                    height: 35
                },
                margin: {
                    top: 5,
                    bottom: 0,
                    left: 5
                },
                showTarget: false,
                showZeroLevel: true,
                value: options.value * 100,
                startScaleValue: 0,
                endScaleValue: 100,
                tooltip: {
                    enabled: true,
                    font: {
                        size: 18
                    },
                    paddingTopBottom: 2,
                    customizeTooltip: function() {
                        return { text: options.text };
                    },
                    zIndex: 5
                }
            }).appendTo(container);
        },
        getFiltersParams: function(message) {
            const period = message.package.value.values.find(f => f.name === 'period').value;
            const operator = message.package.value.values.find(f => f.name === 'operator').value;
            if(period !== null) {
                if(period.dateFrom !== '' && period.dateTo !== '') {
                    this.dateFrom = period.dateFrom;
                    this.dateTo = period.dateTo;
                    this.operators = this.extractOrgValues(operator);
                    this.config.query.parameterValues = [
                        {key: '@dateFrom' , value: this.dateFrom },
                        {key: '@dateTo' , value: this.dateTo },
                        {key: '@UserId' , value: this.operators }
                    ];
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
