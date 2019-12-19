(function () {
    return {
        config: {
            query: {
                code: 'PartsFailedReport',
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
                    dataField: 'manufacturer',
                    caption: 'Производитель',
                }, {
                    dataField: 'provider',
                    caption: 'Поставщик',
                }, {
                    dataField: 'fact_run',
                    caption: 'Фактический пробег запчасти (км)',
                    alignment: 'center'
                }, {
                    dataField: 'cars_name',
                    caption: 'Позывной',
                    alignment: 'center'
                }
            ],
            keyExpr: 'Id',
            scrolling: {
                mode: 'virtual'
            },
            filterRow: {
                visible: true,
                applyFilter: "auto"
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
            groupingAutoExpandAll: null,
        },
        init: function () {
            this.dataGridInstance.height = window.innerHeight - 150;
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this);
        },
        showTopQuestionsTable: function () {
            document.getElementById('part_qty_report').style.display = 'block';
        },
        getFiltersParams: function () {
            this.loadData(this.afterLoadDataHandler);
        },
        extractOrgValues: function (val) {
            if (val !== '') {
                let valuesList = [];
                valuesList.push(val.value);
                return valuesList.length > 0 ? valuesList : [];
            } else {
                return [];
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
