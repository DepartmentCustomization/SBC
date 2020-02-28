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
                // dataField: 'Claim_Number',
                // caption: '№ заявки',
                // width: 80,
                // fixed: true,
                // // sortOrder: 'asc',
                // allowSorting: true,
                dataField: 'Claim_Number',
                caption: '№ заявки',
                dataType: null,
                format: null,
                width: 70,
                alignment: null,
                groupIndex: null,
                // sortOrder: 'asc',
                allowSorting: true,
                subColumns: []
            },{
                dataField: 'org_name',
                caption: 'Відповідальний підрозділ',
                width: 90,
            },{
                dataField: 'Created_at',
                caption: 'Дата реєстрації',
                dataType: 'datetime',
                format: 'dd/MM/yyyy HH:mm',
                width: 90,
                sortOrder: 'desc',
            },{
                dataField: 'Adress',
                caption: 'Адреса',
                width: 311,
            },{
                dataField: 'District',
                caption: 'Адмін. район',
                width: 220,
            },{
                dataField: 'ClaimType',
                caption: 'Тип заявки',
                width: 220,
            },{
                dataField: 'Size',
                caption: 'Діаметр',
                width: 70,
            },{
                dataField: 'Comment',
                caption: 'Результати останнього виїзду',
                width: 311,
            },{
                dataField: 'orders',
                caption: 'Виїзд сьогоднi',
                width: 70,
            },{
                dataField: 'switch_places_name',
                caption: 'Перелік відключень',
                width: 311,
            },{
                dataField: 'description_sequela',
                caption: 'Ускладнення в роботі',
                width: 311,
            }
        ],
        scrolling: {
            columnRenderingMode: "virtual"
        },        
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
            enabled: true,
            fileName: 'File_name'
        },
        editing: {
            enabled: false,
        },
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        headerFilter: {
            visible: true
        },
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        keyExpr: 'Id',
        showBorders: true,
        showColumnLines: true,
        showRowLines: true,

        remoteOperations: null,
        allowColumnReordering: null,
        rowAlternationEnabled: null,
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
        this.dataGridInstance.height = window.innerHeight - 150;
        this.sub = this.messageService.subscribe('tabsClick', this.showTable) ;
        this.loadData(this.afterLoadDataHandler);
        
        this.dataGridInstance.onCellClick.subscribe(e => {
            if(e.column.dataField == "Claim_Number" && e.row != undefined){
                if(e.data.DisplayID === 1) {
                    window.open(location.origin + localStorage.getItem('VirtualPath') + "/sections/Claims/edit/"+e.row.data.Id+"");            
                } else if (e.data.DisplayID === 2) {
                    window.open(location.origin + localStorage.getItem('VirtualPath') + "/sections/AreaClaims/edit/"+e.row.data.Id+"");
                }
            }
            if(e.column) {
                if(e.row != undefined){
                   e.row.cells.forEach( cell => { cell.cellElement.style.backgroundColor = 'yellow'  });
                }
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
    destroy: function(){
        this.sub.unsubscribe();
    },
}
;
}());
