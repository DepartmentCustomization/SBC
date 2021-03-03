(function() {
    return {
        config: {
            query: {
                code: 'test',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'Id',
                    caption: 'Id',
                    width: 250
                },
                {
                    dataField: 'Name',
                    caption: 'Name',
                    alignment: 'center'
                }
                
            ],
            masterDetail: {
                enabled: true,
                template: 'masterDetailInstance',
                showBorders: false,
                columnAutoWidth: false,
                columns: [
                    {
                        dataField: 'Id',
                        caption: ''
                    },
                    {
                        dataField: 'Name',
                        caption: 'Надійшло'
                    }
                ]
            },
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
            groupingAutoExpandAll: null
        },
        firstLoad: true,
        init: function() {
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this);
            this.sub1 = this.messageService.subscribe('ApplyGlobalFilters', this.applyChanges, this);
        },
        masterDetailInitialized: function(event, row) {
            row.dataSource = [];
            const masterDetailQuery = {
                queryCode: 'test',
                limit: -1,
                parameterValues: [
                    {
                        'key': '@sector_id',
                        'value': row.data.Id
                    }
                ]
            };
            this.queryExecutor(masterDetailQuery, this.setMasterDetailDataSource.bind(this, row), this);
        },
        setMasterDetailDataSource: function(row, data) {
            let dataSource = [];
            data.rows.forEach(row => {
                const item = {
                    'Id': row.values[0],
                    'Name': row.values[1]
                }
                dataSource.push(item);
            });
            row.dataSource = dataSource;
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
        },
        destroy: function() {
            this.sub.unsubscribe();
            this.sub1.unsubscribe();
        }
    };
}());
