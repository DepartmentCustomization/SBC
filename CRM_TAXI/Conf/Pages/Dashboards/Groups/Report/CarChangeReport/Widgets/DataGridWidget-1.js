(function () {
    return {
        config: {
            query: {
                code: 'SingleCarReport2',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'part_name',
                    caption: 'Наименование запчасти',
                }, {
                    dataField: 'articul',
                    caption: 'Артикул',
                    alignment: 'center'
                }, {
                    dataField: 'manufacturer',
                    caption: 'Производитель',
                    alignment: 'center'
                }, {
                    dataField: 'provider',
                    caption: 'Поставщик',
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
                    dataField: 'qty',
                    caption: 'Количество',
                    alignment: 'center'
                }, {
                    dataField: 'part_price',
                    caption: 'Стоимость',
                    alignment: 'center'
                }
            ],
            summary: {
                totalItems: [
                    {
                        column: "part_price",
                        summaryType: "sum",
                        customizeText: function (data) {
                            return "Итого: " + data.value;
                        }
                    }
                ]
            },
            keyExpr: 'Id',
            showBorders: false,
            showColumnLines: true,
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
            groupingAutoExpandAll: null,
        },
        init: function () {
            this.dataGridInstance.height = window.innerHeight / 2 - 150;
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this);
            let getUrlParams = window
                .location
                .search
                .replace('?', '')
                .split('&')
                .reduce(function (p, e) {
                    let a = e.split('=');
                    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                    return p;
                }, {}
                );
            this.car = + getUrlParams.car_id;
            this.dateTo = new Date(getUrlParams.dateTo);
            this.dateFrom = new Date(getUrlParams.dateFrom);
        },
        getFiltersParams: function (message) {
            let filterCar = message.package.value.values.find(f => f.name === 'car').value;
            if (filterCar !== null && filterCar !== "") {
                this.config.query.parameterValues = [
                    { key: '@dateFrom', value: this.dateFrom },
                    { key: '@dateTo', value: this.dateTo },
                    { key: '@carId', value: filterCar.value },
                ];
                this.loadData(this.afterLoadDataHandler);
            } else {
                this.config.query.parameterValues = [
                    { key: '@dateFrom', value: this.dateFrom },
                    { key: '@dateTo', value: this.dateTo },
                    { key: '@carId', value: this.car },
                ];
                this.loadData(this.afterLoadDataHandler);
            }
        },
        afterLoadDataHandler: function () {
            this.render();
        },
        destroy: function () {
            this.sub.unsubscribe();
        },
    };
}());
