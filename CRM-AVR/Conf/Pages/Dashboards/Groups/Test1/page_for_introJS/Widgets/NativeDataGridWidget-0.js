(function () {
  return {
    config: {
        query: {
            code: 'avr_mainPage_TSD',
            parameterValues: [],
            filterColumns: [],
            sortColumns: [],
            skipNotVisibleColumns: true,
            chunkSize: 1000
        },
        columns: [
            {
                dataField: 'Claim_Number',
                caption: '№ заявки',
                dataType: null,
                format: null,
                width: 100,
                alignment: null,
                groupIndex: null,
                fixed: true,
                sortOrder: 'asc',
                allowSorting: true,
                subColumns: []
            },{
                dataField: 'org_name',
                caption: 'Організація',
            },{
                dataField: 'Name',
                caption: 'Адреса',
            },{
                dataField: 'orders',
                caption: 'Виїзд сьогоднi',
                width: 70,
            }
        ],
        searchPanel: {
            visible: false,
            highlightCaseSensitive: false
        },
        pager: {
            showPageSizeSelector:  false,
            allowedPageSizes: [20, 25, 30],
            showInfo: true,
            pageSize: 20
        },
        export: {
            enabled: false,
            fileName: 'File_name'
        },
        editing: {
            enabled: false,
        },
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        height: '600',
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
        groupingAutoExpandAll: null,
    },
    sub: {},
    init: function() {
        
        // document.getElementById('table_application').style.display = 'none';
        this.sub = this.messageService.subscribe('tabsClick', this.showTable) ;

        this.loadData(this.afterLoadDataHandler);
        
        
        this.dataGridInstance.onCellClick.subscribe(e => {
            if(e.column.dataField == "Claim_Number" && e.row != undefined){
                this.goToSection('Claims/edit/'+e.row.data.Id+'');
            }
        });
    },

    showTable: function(message){
        if(message.value != 'btn_table'){
             document.getElementById('table_applications').style.display = 'none';
        }else{
             document.getElementById('table_applications').style.display = 'block';
        } 
    },         
    afterLoadDataHandler: function(data) {
        this.render();
    },
}
;
}());
