(function() {
    return {
        config: {
            query: {
                code: 'avr_mainPage',
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
                    width: 70,
                    alignment: null,
                    groupIndex: null,
                    // sortOrder: 'asc',
                    allowSorting: true,
                    subColumns: []
                }, {
                    dataField: 'Name',
                    caption: 'Адреса',
                    width: 311
                }, {
                    dataField: 'Created_at',
                    caption: 'Дата вiдкриття',
                    dataType: 'datetime',
                    format: 'dd.MM.yyyy HH:mm',
                    sortOrder: 'desc',
                    width: 90
                }, {
                    dataField: 'Full_Name',
                    caption: 'Тип',
                    width: 311
                }, {
                    dataField: 'orders',
                    caption: 'Виїзд сьогоднi',
                    width: 43
                }, {
                    dataField: 'Priority',
                    caption: 'Прiоритет',
                    width: 311
                },{
                    dataField: 'Comment',
                    caption: 'Результати останнього виїзду',
                    width: 311
                },{
                    dataField: 'switch_places_name',
                    caption: 'Перелік відключень',
                    width: 311
                },{
                    dataField: 'description_sequela',
                    caption: 'Ускладнення в роботі',
                    width: 311
                },{
                    dataField: 'val_works',
                    caption: 'Роботи',
                    width: 311
                },{
                    dataField: 'val_materials',
                    caption: 'Матеріали',
                    width: 311
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
                enabled: true,
                fileName: 'File_name'
            },
            editing: {
                enabled: false
            },
            filterRow: {
                visible: true,
                applyFilter: 'auto'
            },
            headerFilter: {
                visible: false
            },
            filterRow: {
                visible: true,
                applyFilter: 'auto'
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
            groupingAutoExpandAll: null
        },
        init: function() {
            this.selectedRows = [];
            this.dataGridInstance.height = window.innerHeight - 150;
            this.loadData(this.afterLoadDataHandler);
            this.sub = this.messageService.subscribe('clearSelectedRows', this.clearSelectedRows, this);
            this.dataGridInstance.onCellClick.subscribe(e => {
                if(e.column.dataField == 'Claim_Number' && e.row != undefined) {
                    if(e.data.DisplayID === 1) {
                        window.open(String(location.origin + localStorage.getItem('VirtualPath') + '/sections/Claims/edit/' + e.row.data.Id));
                    } else if (e.data.DisplayID === 2) {
                        window.open(String(location.origin + localStorage.getItem('VirtualPath') + '/sections/AreaClaims/edit/' + e.row.data.Id));
                    }
                }
                if(e.column) {
                    if(e.row != undefined) {
                        e.row.cells.forEach(cell => {
                            cell.cellElement.style.backgroundColor = 'yellow'
                        });
                    }
                }
            });
        },
        clearSelectedRows: function() {
            this.dataGridInstance.instance.refresh();
        },
        afterLoadDataHandler: function(data) {
            this.render();
        }
    }
    ;
}());
