<<<<<<< HEAD
(function () {
=======
(function() {
>>>>>>> cb7b94c8b8fdf7f5cd84e29adf259e56051d3241
    return {
        config: {
            query: {
                code: 'int_organizationPageTable',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns:[
                {
                    dataField: 'operation',
                    caption: 'Операція',
                    width: 100
                },{
<<<<<<< HEAD
                caption: 'ГородОк',
                alignment: 'center',
                columns: [
                            {
                            dataField: 'become',
                            caption: 'Було',
                            alignment: 'left',
                        },{
                            dataField: 'it_was',
                            caption: 'Стало',
                            alignment: 'left',
                        }
                ]  
=======
                    caption: 'ГородОк',
                    alignment: 'center',
                    columns: [
                        {
                            dataField: 'become',
                            caption: 'Було',
                            alignment: 'left'
                        },{
                            dataField: 'it_was',
                            caption: 'Стало',
                            alignment: 'left'
                        }
                    ]
>>>>>>> cb7b94c8b8fdf7f5cd84e29adf259e56051d3241
                },{
                    dataField: 'id_1551',
                    caption: 'Назва організації у системі 1551',
                    lookup: {
                        dataSource: {
                            paginate: true,
                            store: this.elements
                        },
<<<<<<< HEAD
                        displayExpr: "short_name",
                        valueExpr: "Id"
=======
                        displayExpr: 'short_name',
                        valueExpr: 'Id'
>>>>>>> cb7b94c8b8fdf7f5cd84e29adf259e56051d3241
                    }
                },{
                    dataField: 'is_done',
                    caption: 'Стан',
                    width: 80
                },{
                    dataField: 'comment',
                    caption: 'Коментар'
                }
<<<<<<< HEAD
            ],  searchPanel: {
=======
            ], searchPanel: {
>>>>>>> cb7b94c8b8fdf7f5cd84e29adf259e56051d3241
                visible: true,
                highlightCaseSensitive: false
            },
            pager: {
                showPageSizeSelector:  false,
                allowedPageSizes: [10, 15, 30],
                showInfo: true,
                pageSize: 10
            },
            export: {
                enabled: true,
                fileName: 'File_name'
            },
            editing: {
<<<<<<< HEAD
                mode: 'cell',
=======
                mode: 'batch',
>>>>>>> cb7b94c8b8fdf7f5cd84e29adf259e56051d3241
                allowUpdating: true,
                useIcons: true
            },
            filterRow: {
                visible: false,
<<<<<<< HEAD
                applyFilter: "auto"
            },
=======
                applyFilter: 'auto'
            },
            height: '550',
>>>>>>> cb7b94c8b8fdf7f5cd84e29adf259e56051d3241
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
            showFilterRow: false,
            showHeaderFilter: false,
            showColumnChooser: true,
            showColumnFixing: true,
            groupingAutoExpandAll: null
<<<<<<< HEAD
        },
        elements: [],
        init: function() {
            this.dataGridInstance.height = window.innerHeight - 100;
            this.config.onContentReady = this.afterRenderTable.bind(this);
            this.loadData(this.afterLoadDataHandler);
            let executeQuery = {
                    queryCode: 'int_list_organization_1551',
                    parameterValues: [],
                    limit: -1
                };
                this.queryExecutor(executeQuery, this.lookupFoo, this);
            this.dataGridInstance.onRowUpdating.subscribe( function(e) {
                let is_done = e.newData.is_done;
                let key = e.key;
                let id_1551 = e.oldData.id_1551;
                let id_1551_new = e.newData.id_1551;
                let comment = e.newData.comment;
                let cat_id = e.oldData.cat_id;
                let saveChange = {
                    queryCode: 'int_btnSaveChange_organizationGorodok',
                    limit: -1,
                    parameterValues: [
                        {
                            key: '@key',
                            value: key
                        },{
                            key: '@is_done',
                            value: is_done
                        },{
                            key: '@id_1551',
                            value: id_1551
                        },{
                            key: '@id_1551_new',
                            value: id_1551_new
                        },{
                            key: '@comment',
                            value: comment
                        },{
                            key: '@cat_id',
                            value: cat_id
                        }
                    ]
                };
                this.queryExecutor(saveChange);
            }.bind(this));
        },
        lookupFoo: function(data) {
            this.elements = [];
            for(let i = 0; i < data.rows.length; i++){
                let el = data.rows[i];
                let obj = {
                    "Id": el.values[0],
                    "short_name": el.values[1],
                } 
                this.elements.push(obj);
            }
            this.config.columns[2].lookup.dataSource.store = this.elements;
            this.loadData(this.afterLoadDataHandler);
        },
        afterRenderTable: function() {
            const btnExcel = document.querySelector('.dx-datagrid-export-button');
            const spanElement = this.createElement('span', { className: 'dx-button-text', innerText: 'Excel'});
            if(btnExcel.firstElementChild.childNodes.length === 1) {
                btnExcel.firstElementChild.appendChild(spanElement);
            }
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
=======
        },
        elements: [],
        init: function() {
            this.loadData(this.afterLoadDataHandler);
            let executeQuery = {
                queryCode: 'int_list_organization_1551',
                parameterValues: [],
                limit: -1
            };
            this.queryExecutor(executeQuery, this.lookupFoo, this);
            this.dataGridInstance.onRowUpdating.subscribe(function(e) {
                let is_done = e.newData.is_done;
                let key = e.key;
                let id_1551 = e.oldData.id_1551;
                let id_1551_new = e.newData.id_1551;
                let comment = e.newData.comment;
                let cat_id = e.oldData.cat_id;
                let saveChange = {
                    queryCode: 'int_btnSaveChange_organizationGorodok',
                    limit: -1,
                    parameterValues: [
                        {
                            key: '@key',
                            value: key
                        },{
                            key: '@is_done',
                            value: is_done
                        },{
                            key: '@id_1551',
                            value: id_1551
                        },{
                            key: '@id_1551_new',
                            value: id_1551_new
                        },{
                            key: '@comment',
                            value: comment
                        },{
                            key: '@cat_id',
                            value: cat_id
                        }
                    ]
                };
                this.queryExecutor(saveChange);
            }.bind(this));
        },
        lookupFoo: function(data) {
            this.elements = [];
            for(let i = 0; i < data.rows.length; i++) {
                let el = data.rows[i];
                let obj = {
                    'Id': el.values[0],
                    'short_name': el.values[1]
                }
                this.elements.push(obj);
            }
            this.config.columns[2].lookup.dataSource.store = this.elements;
            this.loadData(this.afterLoadDataHandler);
        },
>>>>>>> cb7b94c8b8fdf7f5cd84e29adf259e56051d3241
        afterLoadDataHandler: function() {
            this.render();
        },
        subscribeToDataGridActions: function() {
        },
        onDataGridEditorPreparing: function() {
        },
        destroy: function() {
        }
    };
}());
