(function () {
    return {
        config: {
            query: {
                code: 'Import_RunCar_SelectRows',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'cars_name',
                    caption: 'Позывной',
                },
                {
                    dataField: 'run_km',
                    caption: 'Пробег',
                },
                {
                    dataField: 'import_month_qty',
                    caption: 'Было заливок в этом месяце',
                },
                {
                    dataField: 'run_km_more',
                    caption: 'Сопоставление пробега',
                }
            ],
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [50, 100, 500],
                showInfo: true,
            },
            paging: {
                pageSize: 50
            },
            keyExpr: 'Id'
        },
        init: function () {
            this.dataGridInstance.height = window.innerHeight - 200;
            this.sub2 = this.messageService.subscribe('showTable', this.showTable, this);
        },
        showTable: function () {
            this.loadData(this.afterLoadDataHandler);
        },
        afterLoadDataHandler: function () {
            this.render();
        },
        destroy: function () {
            this.sub2.unsubscribe();
        }
    };
}());