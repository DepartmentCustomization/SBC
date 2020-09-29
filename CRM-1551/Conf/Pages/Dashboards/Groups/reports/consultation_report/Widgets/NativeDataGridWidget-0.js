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
                        caption: ''
                    },
                    {
                        dataField: 'article_qty',
                        caption: 'Кількість по статтях'
                    },
                    {
                        dataField: 'article_percent',
                        caption: '% по статтях'
                    },
                    {
                        dataField: 'article_percent',
                        caption: '% по статтях'
                    },
                    {
                        dataField: '',
                        caption: 'Загальна тривалість',
                        columns: [
                            {
                                dataField: 'talk_all',
                                caption: 'Питання + Консультація'
                            },
                            {
                                dataField: 'talk_consultations_only',
                                caption: 'Тільки консультація'
                            }
                        ]
                    },
                    {
                        dataField: 'talk_consultation_average',
                        caption: 'Середній час на консультацію'
                    }
                ]
            },
            columns: [
                {
                    dataField: 'Name',
                    caption: ''
                },
                {
                    dataField: 'article_qty',
                    caption: 'Кількість по статтях'
                },
                {
                    dataField: 'article_percent',
                    caption: '% по статтях'
                },
                {
                    dataField: 'article_percent',
                    caption: '% по статтях',
                    dataType: 'number',
                    format: 'percent',
                    alignment: 'right',
                    allowGrouping: false,
                    cellTemplate: function(container, options) {
                        this.dxBullet({
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
                    customizeText: function(cellInfo) {
                        let bulletOptions = {
                            value: cellInfo.value
                        };
                        return cellInfo.value + bulletOptions;
                    },
                    cssClass: 'bullet'
                },
                {
                    dataField: '',
                    caption: 'Загальна тривалість',
                    columns: [
                        {
                            dataField: 'talk_all',
                            caption: 'Питання + Консультація'
                        },
                        {
                            dataField: 'talk_consultations_only',
                            caption: 'Тільки консультація'
                        }
                    ]
                },
                {
                    dataField: 'talk_consultation_average',
                    caption: 'Середній час на консультацію'
                }
            ],
            keyExpr: 'Id'
        },
        firstLoad: true,
        init: function() {
            this.applyChanges(true);
            this.config.onToolbarPreparing = this.createTableButton.bind(this);
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this);
            this.sub = this.messageService.subscribe('ApplyGlobalFilters',this.renderTable , this);
            this.config.onCellPrepared = this.onCellPrepared.bind(this);
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
            /*if(options.column.dataField === 'article_percent') {
                 console.log(options.cellElement)
                if(options.cellElement.classlist.contains('bullet')) {
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
