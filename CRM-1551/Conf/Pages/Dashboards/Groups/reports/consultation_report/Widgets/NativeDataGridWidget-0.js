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
                    cellTemplate: this.discountCellTemplate,
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
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this);
            this.sub = this.messageService.subscribe('ApplyGlobalFilters',this.renderTable , this);
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
    };
}());
