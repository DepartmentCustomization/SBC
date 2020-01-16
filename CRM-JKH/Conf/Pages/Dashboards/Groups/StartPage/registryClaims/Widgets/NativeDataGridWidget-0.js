(function () {
  return {
    config: {
        query: {
            code: 'Claims_State_Select_Table',
            parameterValues: [],
            filterColumns: [],
            sortColumns: [],
            skipNotVisibleColumns: true,
            chunkSize: 1000
        },
        columns: [
        ],
        export: {
            enabled: false,
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
            visible: false,
            highlightCaseSensitive: true
        },
        editing: {
            mode: 'row',
            allowUpdating: false,
            allowDeleting: false,
            allowAdding: false,
            useIcons: false
        },
        filterRow: {
            visible: true,
            applyFilter: 'auto'
        },
        keyExpr: 'Id',
        showBorders: true,
        showColumnLines: true,
        showRowLines: true,
        allowColumnResizing: true,
        hoverStateEnabled: true,
        columnsAutoWidth: true,
        showHeaderFilter: true,
        showColumnChooser: false,
        showColumnFixing: true,
        sortingMode: 'multiple',
        wordWrapEnabled:true,
        showFilterRow: true,
    },
    init: function() {
        let that = this;
        this.dataGridInstance.onCellClick.subscribe(e => {
            if(e.column.dataField == 'ClaimId' && e.row != undefined){
                that.navigateTo('sections/Claim/edit/'+e.key)
            }
        });
       let executeQuery = {
            queryCode:'Claims_State_Select_Table',
            parameterValues :  [
                    {
                        key:'@StatusId',
                        value: null
                    },
                ],
            limit: -1
        }
        this.config.query.parameterValues =  [
            {
                key:'@StatusId',
                value: null
            }
        ]
        this.queryExecutor(executeQuery, this.load, this);
    },
    callback_updateRows: function() {
        location.reload();
    },
    load: function(data) {
        let that = this;
        let tableParams;
        document.getElementById('btn_sendAllClaimToWork').addEventListener('click', function () {
            let executeQuery = {
                queryCode: 'Claims_State_Update_Table',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQuery, this.callback_updateRows, this);
        }.bind(that))
        let items = [...document.getElementsByClassName('item')];
        items.forEach(function (item, i, arr) {
            item.addEventListener('click', function () {
                arr.forEach(function(item) {
                   item.style.opacity = 0.5;
                   item.style.transform = 'scale(1)';
                })
                item.style.opacity = 1
                item.style.transform = 'scale(1.25)';
                item.style.transition = '0.5s ease';
                if (i === 1) {
                    document.getElementById('btn_block_hiden').style.display = '';
                } else {
                    document.getElementById('btn_block_hiden').style.display = 'none';
                }
                if (i === 0) {
                    tableParams = null;
                } else {
                    tableParams = i;
                }
                that.exportQuery.parameterValues[0].value = tableParams;
                that.loadData(this.afterLoadDataHandler);
            }.bind(that))
        })
        for(let i=1; i<data.columns.length; i++){
            this.config.columns[i] = {
                dataField : data.columns[i].code,
                caption: data.columns[i].name,
            }
        }
        this.config.columns[1].width = 100;
        this.config.columns[3].width = 350;
        this.config.columns[5].width = 90;
        this.config.columns[6].width = 90;
        this.config.columns[9].width = 450;
        this.loadData(this.afterLoadDataHandler)
    },
    createElement: function(tag, props, ...children) {
        const element = document.createElement(tag);
        Object.keys(props).forEach( key => element[key] = props[key] );
        if(children.length > 0){
            children.forEach( child =>{
                element.appendChild(child);
            });
        } return element;
    },
    afterLoadDataHandler(){
        this.render();
    }
};
}());
