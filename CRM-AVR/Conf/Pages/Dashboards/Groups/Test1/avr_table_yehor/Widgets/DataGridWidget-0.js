(function () {
  return {
    config: {
        query: {
            code: 'avr_table_yehor',
            parameterValues: [
                { key: '@ParentId',  value: 17}
            ],
            filterColumns: [],
            sortColumns: [],
            skipNotVisibleColumns: true,
            chunkSize: 1000
        },
        columns: [
           {
                dataField: 'Name',
                caption: 'Name',
                dataType: null,
                format: null,
                width: null,
                alignment: null,
                groupIndex: null,
                fixed: true,
                // sortOrder: 'asc',
                allowSorting: true,
                subColumns: []
            }, {
                dataField: 'ParentId',
                caption: 'ParentId',
                dataType: null,
                format: null,
                width: null,
                alignment: null,
                groupIndex: null,
                fixed: true,
                // sortOrder: 'asc',
                allowSorting: true,
                subColumns: []
            }, {
                dataField: 'Type',
                caption: 'Type',
                dataType: null,
                format: null,
                width: null,
                alignment: null,
                groupIndex: null,
                fixed: true,
                // sortOrder: 'asc',
                allowSorting: true,
                subColumns: []
            }
        ],
        // summary: [
        //     {
        //         column:'Column code',
        //         summaryType: null,
        //         valueFormat: null,
        //         alignByColumn: null,
        //         displayFormat: null,
        //         showInColumn: null,
        //         precision: null,
        //         customizeText: function(data) {}
        //     }
        // ],
        // groupSummary: [
        //     {
        //         column:'Column code',
        //         summaryType: null,
        //         valueFormat: null,
        //         alignByColumn: null,
        //         displayFormat: null,
        //         showInColumn: null,
        //         precision: null,
        //         showInGroupFooter: true
        //     }
        // ],
        export: {
            enabled: true,
            fileName: 'File_name'
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [10, 15, 30],
            showInfo: true,
            pageSize: 15
        },
        scrolling: {
            mode: null,
            rowRenderingMode: null,
            columnRenderingMode: null,
            showScrollbar: null
        },
        searchPanel: {
            visible: true,
            highlightCaseSensitive: true
        },
        editing: {
            mode: 'row',
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true,
            useIcons: true
        },
        height: '500',
        keyExpr: 'Id',
        showBorders: true,
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
        showHeaderFilter: true,
        showColumnChooser: true,
        showColumnFixing: true,
        sortingMode: 'multiple',
        selectionMode: 'multiple',
        groupingAutoExpandAll: null,
        masterDetail: null,
        onRowUpdating: function(data) {},
        onRowExpanding: function(data) {},
        onRowInserting: function(data) {},
        onRowRemoving: function(data) {},
        onCellClick: function(data) {},
        onRowClick: function(data) {},
        selectionChanged: function(data) {}
    },
    sub: [],
    init: function() {
        this.sub = this.messageService.subscribe('message', this.takeMessage, this)
        this.loadData();
    },
    takeMessage: function(message){
        this.config.query.queryCode = 'avr_table_yehor';
        this.config.query.parameterValues = [{ key: '@ParentId',  value: 17} ];
        this.loadData();
            
            
    },
};
}());
