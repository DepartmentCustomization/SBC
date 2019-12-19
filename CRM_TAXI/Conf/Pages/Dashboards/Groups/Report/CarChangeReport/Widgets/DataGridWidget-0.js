(function () {
    return {
        config: {
            query: {
                code: 'SingleCarReport',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'number',
                    caption: 'Госномер',
                    alignment: 'center'
                }, {
                    dataField: 'name',
                    caption: 'Позывной',
                    alignment: 'center'
                }, {
                    dataField: 'mark',
                    caption: 'Марка ',
                    alignment: 'center'
                }, {
                    dataField: 'create_year',
                    caption: 'Год выпуска',
                    alignment: 'center'
                }, {
                    dataField: 'start_period_run',
                    caption: 'Пробег на начало отчетного периода',
                    alignment: 'center'
                }, {
                    dataField: 'end_period_run',
                    caption: 'Пробег на конец отчетного периода',
                    alignment: 'center'
                }, {
                    dataField: 'pediod_run',
                    caption: 'Пробег за отчетный период',
                    alignment: 'center'
                },
            ],
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
            this.car = +getUrlParams.car_id;
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
