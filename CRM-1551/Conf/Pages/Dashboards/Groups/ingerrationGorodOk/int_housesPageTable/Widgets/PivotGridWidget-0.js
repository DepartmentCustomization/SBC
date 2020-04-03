<<<<<<< HEAD
(function () {
=======
(function() {
>>>>>>> cb7b94c8b8fdf7f5cd84e29adf259e56051d3241
    return {
        config: {
            query: {
                code: 'int_housesPageTable',
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
                    width: 120,
                    alignment: 'center'
                },{
<<<<<<< HEAD
                caption: 'ГородОк',
                alignment: 'center',
                columns: [
                            {   caption: 'Було',
                                alignment: 'center',
                                columns:[
                                    {
                                        dataField: 'become_district_name',
                                        caption: 'Район',
                                        alignment: 'center',
                                        width: 140
                                    },{
                                    dataField: 'become',
                                    caption: 'Будинок',
                                    alignment: 'center'
                                    }]
                            },
                            {   caption: 'Стало',
                                alignment: 'center',
                                columns:[
                                    {
                                        dataField: 'it_was_district_name',
                                        caption: 'Район',
                                        width: 140,
                                        alignment: 'center'
                                    },{
                                    dataField: 'it_was',
                                    caption: 'Будинок',
                                    alignment: 'center'
                                    }]
                            }
                        ]  
                            },{
                caption: '1551',
                alignment: 'center',
                columns:[
                    {
                            dataField: 'district_id',
                            alignment: 'left',
                            caption: 'Район',
                            setCellValue: function(rowData, value) {
                                rowData.district_id = value;
                                rowData.id_1551 = null;
                            },
=======
                    caption: 'ГородОк',
                    alignment: 'center',
                    columns: [
                        { caption: 'Було',
                            alignment: 'center',
                            columns:[
                                {
                                    dataField: 'become_district_name',
                                    caption: 'Район',
                                    alignment: 'center',
                                    width: 140
                                },{
                                    dataField: 'become',
                                    caption: 'Будинок',
                                    alignment: 'center'
                                }]
                        },
                        { caption: 'Стало',
                            alignment: 'center',
                            columns:[
                                {
                                    dataField: 'it_was_district_name',
                                    caption: 'Район',
                                    width: 140,
                                    alignment: 'center'
                                },{
                                    dataField: 'it_was',
                                    caption: 'Будинок',
                                    alignment: 'center'
                                }]
                        }
                    ]
                },{
                    caption: '1551',
                    alignment: 'center',
                    columns:[
                        {
                            dataField: 'district_id',
                            alignment: 'left',
                            caption: 'Район',
                            setCellValue: function(rowData, value) {
                                rowData.district_id = value;
                                rowData.id_1551 = null;
                            },
>>>>>>> cb7b94c8b8fdf7f5cd84e29adf259e56051d3241
                            lookup: {
                                dataSource: {
                                    paginate: true,
                                    store: this.elements_dis
                                },
<<<<<<< HEAD
                                displayExpr: "name",
                                valueExpr: "Id"
=======
                                displayExpr: 'name',
                                valueExpr: 'Id'
>>>>>>> cb7b94c8b8fdf7f5cd84e29adf259e56051d3241
                            }
                        },{
                            dataField: 'id_1551',
                            alignment: 'left',
                            caption: 'Вулиці у системі 1551',
                            lookup: {
<<<<<<< HEAD
                                dataSource: function(options){
=======
                                dataSource: function(options) {
>>>>>>> cb7b94c8b8fdf7f5cd84e29adf259e56051d3241
                                    return{
                                        paginate: true,
                                        store: this.elements,
                                        filter: options.data ? ['district_id', '=', options.data.district_id] : null
                                    }
                                },
<<<<<<< HEAD
                                displayExpr: "name",
                                valueExpr: "Id"
=======
                                displayExpr: 'name',
                                valueExpr: 'Id'
>>>>>>> cb7b94c8b8fdf7f5cd84e29adf259e56051d3241
                            }
                        }
                    ]
                },{
                    dataField: 'is_done',
                    caption: 'Стан',
                    width: 100
                },{
                    dataField: 'comment',
                    caption: 'Коментар'
                }
<<<<<<< HEAD
            ], 
=======
            ],
>>>>>>> cb7b94c8b8fdf7f5cd84e29adf259e56051d3241
            searchPanel: {
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
                allowUpdating: true,
                useIcons: true
            },
            // editing: {
            //     mode: 'batch',
            //     allowUpdating: true,
            //     useIcons: true,
            //     text: [
            //         {
            //             editRow: "Editdfdsf",
            //             saveAllChanges: "Save changes 123",
            //             saveRowChanges: "Save",
            //         }
            //     ]
            // },
            onEditorPreparing: function(e) {
                if(e.parentType === "dataRow" && e.dataField === 'id_1551') {
                    e.editorOptions.disabled = (typeof e.row.data.district_id !== "number");
=======
                mode: 'batch',
                allowUpdating: true,
                useIcons: true,
                text: [
                    {
                        editRow: 'Editdfdsf',
                        saveAllChanges: 'Save changes 123',
                        saveRowChanges: 'Save'
                    }
                ]
            },
            onEditorPreparing: function(e) {
                if(e.parentType === 'dataRow' && e.dataField === 'id_1551') {
                    e.editorOptions.disabled = (typeof e.row.data.district_id !== 'number');
>>>>>>> cb7b94c8b8fdf7f5cd84e29adf259e56051d3241
                }
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
            groupingAutoExpandAll: null,
            toolbarPreparing: function(data) {
<<<<<<< HEAD
                let indexSaveButton = data.toolbarOptions.items.indexOf(data.toolbarOptions.items.find(function (item) {
                    return item.name == "saveButton";
                }));
                if (indexSaveButton != -1)
                    data.toolbarOptions.items.splice(indexSaveButton, 1);
                let indexRevertButton = data.toolbarOptions.items.indexOf(data.toolbarOptions.items.find(function (item) {
                    return item.name == "revertButton";
                }));
                if (indexRevertButton != -1)
                    data.toolbarOptions.items.splice(indexRevertButton, 1);
            },
        },
        myFunc: function(options) {
            return{
                paginate: true,
                store: this.elements,
                filter: options.data ? ['district_id', '=', options.data.district_id] : null
            }
        },
        elements: [],
        init: function() {
            this.dataGridInstance.height = window.innerHeight - 100;
            this.config.onContentReady = this.afterRenderTable.bind(this);
            this.loadData(this.afterLoadDataHandler);
            let executeQuery_dis = {
                    queryCode: 'int_list_district_1551',
                    parameterValues: [],
                    limit: -1
                };
            this.queryExecutor(executeQuery_dis, this.lookupFoo_dis, this);
            let executeQuery = {
                    queryCode: 'int_list_houses_1551',
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
                    queryCode: 'int_btnSaveChange_housesGorodok',
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
        lookupFoo_dis: function(data) {
            this.elements_dis = [];
            for(let i = 0; i < data.rows.length; i++){
                let el = data.rows[i];
                let obj = {
                    "Id": el.values[0],
                    "name": el.values[1],
                } 
                this.elements_dis.push(obj);
            }
            this.config.columns[2].columns[0].lookup.dataSource.store = this.elements_dis;
            this.loadData(this.afterLoadDataHandler);
        },
        lookupFoo: function(data) {
            this.elements = [];
            for(let i = 0; i < data.rows.length; i++){
                let el = data.rows[i];
                let obj = {
                    "Id": el.values[0],
                    "name": el.values[1],
                    "district_id": el.values[2]
                } 
                this.elements.push(obj);
            }
            this.config.columns[2].columns[1].lookup.dataSource.store = this.elements;
            this.config.columns[2].columns[1].lookup.dataSource = this.myFunc.bind(this);
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
        afterLoadDataHandler: function() {
            this.render();
        },
=======
                let indexSaveButton = data.toolbarOptions.items.indexOf(data.toolbarOptions.items.find(function(item) {
                    return item.name == 'saveButton';
                }));
                if (indexSaveButton != -1) {
                    data.toolbarOptions.items.splice(indexSaveButton, 1);
                }
                let indexRevertButton = data.toolbarOptions.items.indexOf(data.toolbarOptions.items.find(function(item) {
                    return item.name == 'revertButton';
                }));
                if (indexRevertButton != -1) {
                    data.toolbarOptions.items.splice(indexRevertButton, 1);
                }
            }
        },
        myFunc: function(options) {
            return{
                paginate: true,
                store: this.elements,
                filter: options.data ? ['district_id', '=', options.data.district_id] : null
            }
        },
        elements: [],
        init: function() {
            this.loadData(this.afterLoadDataHandler);
            let executeQuery_dis = {
                queryCode: 'int_list_district_1551',
                parameterValues: [],
                limit: -1
            };
            this.queryExecutor(executeQuery_dis, this.lookupFoo_dis, this);
            let executeQuery = {
                queryCode: 'int_list_houses_1551',
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
                    queryCode: 'int_btnSaveChange_housesGorodok',
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
        lookupFoo_dis: function(data) {
            this.elements_dis = [];
            for(let i = 0; i < data.rows.length; i++) {
                let el = data.rows[i];
                let obj = {
                    'Id': el.values[0],
                    'name': el.values[1]
                }
                this.elements_dis.push(obj);
            }
            this.config.columns[2].columns[0].lookup.dataSource.store = this.elements_dis;
            this.loadData(this.afterLoadDataHandler);
        },
        lookupFoo: function(data) {
            this.elements = [];
            for(let i = 0; i < data.rows.length; i++) {
                let el = data.rows[i];
                let obj = {
                    'Id': el.values[0],
                    'name': el.values[1],
                    'district_id': el.values[2]
                }
                this.elements.push(obj);
            }
            this.config.columns[2].columns[1].lookup.dataSource.store = this.elements;
            this.config.columns[2].columns[1].lookup.dataSource = this.myFunc.bind(this);
            this.loadData(this.afterLoadDataHandler);
        },
        afterLoadDataHandler: function() {
            this.render();
        },
>>>>>>> cb7b94c8b8fdf7f5cd84e29adf259e56051d3241
        subscribeToDataGridActions: function() {
        },
        onDataGridEditorPreparing: function() {
        },
        destroy: function() {
        }
    };
}());
