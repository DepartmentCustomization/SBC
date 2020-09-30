(function() {
    return {
        config: {
            query: {
                code: 'testQuery1',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            paging: {
                pageSize: 10
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [10, 25, 50, 100]
            },
            export: {
                fileName: 'operator statistics',
                enabled: true
            },
            focusedRowEnabled: true,
            remoteOperations: false,
            allowColumnReordering: true,
            allowColumnResizing: true,
            wordWrapEnabled: true,
            rowAlternationEnabled: true,
            hoverStateEnabled: true,
            keyExpr: 'Col1',
            columns: [
                {
                    dataField: 'Col1',
                    caption: 'Caption'
                },
                {
                    dataField: 'Col2',
                    caption: 'Caption'
                },
                {
                    dataField: 'Col3',
                    caption: 'Caption'
                },
                {
                    dataField: 'Col4',
                    caption: 'Caption'
                },
                {
                    dataField: 'Col5',
                    caption: 'Caption'
                },
                {
                    dataField: 'Col6',
                    caption: 'Caption'
                },
                {
                    dataField: 'Col7',
                    caption: 'Caption'
                },
                {
                    dataField: 'Col8',
                    caption: 'Caption'
                },
                {
                    dataField: 'Col9',
                    caption: 'Caption'
                },
                {
                    dataField: 'Col10',
                    caption: 'Caption'
                }
            ]
        },
        init: function() {
            this.loadData(this.afterLoadDataHandler)
        },
        afterLoadDataHandler: function() {
            this.render();
        }
    };
}());
