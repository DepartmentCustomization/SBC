(function() {
    return {
        config: {
            query: {
                code: 'ChangeOnDateReport',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'part_name',
                    caption: 'Наименование запчасти'
                }, {
                    dataField: 'articul',
                    caption: 'Артикул',
                    alignment: 'center'
                }, {
                    dataField: 'manufacturer',
                    caption: 'Производитель',
                    alignment: 'center'
                }, {
                    dataField: 'run_km_period',
                    caption: 'Эксплуатационный период (км)',
                    alignment: 'center'
                }, {
                    dataField: 'run_day_period',
                    caption: 'Эксплуатационный период (дни)',
                    alignment: 'center'
                }, {
                    dataField: 'cars_number',
                    caption: 'Госномер автомобиля',
                    alignment: 'center'
                }, {
                    dataField: 'part_price',
                    caption: 'Цена',
                    alignment: 'center'
                },
                {
                    dataField: 'qty',
                    caption: 'Количество',
                    alignment: 'center'
                }, {
                    dataField: 'sum_price',
                    caption: 'Стоимость',
                    alignment: 'center'
                }
            ],
            keyExpr: 'Id',
            scrolling: {
                mode: 'virtual'
            },
            filterRow: {
                visible: true,
                applyFilter: 'auto'
            },
            showBorders: false,
            showColumnLines: false,
            showRowLines: true,
            remoteOperations: null,
            allowColumnReordering: null,
            rowAlternationEnabled: null,
            columnAutoWidth: null,
            hoverStateEnabled: true,
            columnWidth: null,
            wordWrapEnabled: true,
            allowColumnResizing: true,
            showFilterRow: true,
            showHeaderFilter: false,
            showColumnChooser: false,
            showColumnFixing: true,
            groupingAutoExpandAll: null
        },
        init: function() {
            let height = 150;
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this);
            this.dataGridInstance.height = window.innerHeight - height;
        },
        showTopQuestionsTable: function() {
            document.getElementById('cars_report').style.display = 'block';
        },
        getOrganizationId: function(message) {
            this.car_id = message.car_id;
        },
        getFiltersParams: function(message) {
            let calendar = message.package.value.values.find(f => f.name === 'calendar').value;
            if (calendar !== null) {
                if (calendar !== '') {
                    this.config.query.parameterValues = [
                        { key: '@dateTo', value: calendar }
                    ];
                    this.loadData(this.afterLoadDataHandler);
                }
            }
        },
        extractOrgValues: function(val) {
            if (val !== '') {
                let valuesList = [];
                valuesList.push(val.value);
                return valuesList.length > 0 ? valuesList : [];
            }
            return [];
        },
        afterLoadDataHandler: function() {
            this.render();
        },
        destroy: function() {
            this.sub.unsubscribe();
        }
    };
}());
