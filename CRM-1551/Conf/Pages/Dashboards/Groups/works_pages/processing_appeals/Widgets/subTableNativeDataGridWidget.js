(function() {
    return {
        config: {
            query: {
                code: 'h_DB_ProApp_SubTable',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'registration_number',
                    caption: 'Номер питання'
                }, {
                    dataField: 'registration_date',
                    caption: 'Дата реєстрації',
                    sortOrder: 'asc'
                }, {
                    dataField: 'QuestionType',
                    caption: 'Тип питання'
                }, {
                    dataField: 'place_problem',
                    caption: 'Місце проблеми'
                }, {
                    dataField: 'control_date',
                    caption: 'Дата контролю'
                }, {
                    dataField: 'vykonavets',
                    caption: 'Виконавець'
                }, {
                    dataField: 'comment',
                    caption: 'Коментар'
                }
            ],
            masterDetail: {
                enabled: true
            },
            filterRow: {
                visible: true,
                applyFilter: 'auto'
            },
            export: {
                enabled: true,
                fileName: 'Excel'
            },
            pager: {
                showPageSizeSelector:  true,
                allowedPageSizes: [10, 50, 100, 500],
                showInfo: true
            },
            paging: {
                pageSize: 500
            },
            scrolling: {
                mode: 'standart',
                rowRenderingMode: null,
                columnRenderingMode: null,
                showScrollbar: null
            },
            searchPanel: {
                visible: false,
                highlightCaseSensitive: true
            },
            sorting: {
                mode: 'multiple'
            },
            keyExpr: 'Id',
            focusedRowEnabled: true,
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
            groupingAutoExpandAll: null
        },
        arrivedColumn: 'arrived',
        init: function() {
            this.dataGridInstance.height = window.innerHeight - 305;
            this.tableContainer = document.getElementById('subTable');
            this.setVisibilityTableContainer('none');
            this.subscribers.push(this.messageService.subscribe('clickOnHeaderTable', this.changeOnTable, this));
            this.subscribers.push(this.messageService.subscribe('resultSearch', this.hideTable, this));
            this.config.masterDetail.template = this.createMasterDetail.bind(this);
            this.config.onContentReady = this.afterRenderTable.bind(this);
            this.dataGridInstance.onCellClick.subscribe(e => {
                if(e.column.dataField === 'registration_number' && e.row !== undefined) {
                    window.open(`
                        ${location.origin}
                        ${localStorage.getItem('VirtualPath')}
                        /sections/Assignments/edit/
                        ${e.key}
                    `)
                }
            });
        },
        createMasterDetail: function(container, options) {
            const data = options.data;
            const fields = {
                zayavnyk: 'Заявник',
                ZayavnykAdress: 'Адреса заявника',
                content: 'Зміст'
            };
            const elementsWrapper = this.createElement('div', {className: 'elementsWrapper'});
            container.appendChild(elementsWrapper);
            for (const field in fields) {
                for (const property in data) {
                    if(property === field) {
                        if(data[property] === null || data[property] === undefined) {
                            data[property] = '';
                        }
                        const content = this.createElement('div',
                            {
                                className: 'content',innerText: data[property]
                            }
                        );
                        const caption = this.createElement('div',
                            {
                                className: 'caption',innerText: fields[field], style: 'min-width: 200px'
                            }
                        );
                        const masterDetailItem = this.createElement('div',
                            {
                                className: 'element', style: 'display: flex; margin: 15px 10px'
                            },
                            caption, content
                        );
                        elementsWrapper.appendChild(masterDetailItem);
                    }
                }
            }
        },
        setVisibilityTableContainer: function(status) {
            this.tableContainer.style.display = status;
        },
        changeOnTable: function(message) {
            if (message.code && message.navigator) {
                if (message.code === this.arrivedColumn) {
                    this.config.onToolbarPreparing = this.createTableButton.bind(this);
                }
                this.setVisibilityTableContainer('block');
                this.config.query.parameterValues = [
                    { key: '@navigation', value: message.navigator},
                    { key: '@column', value: message.code}
                ];
                this.loadData(this.afterLoadDataHandler);
            } else {
                this.hideTable();
            }

        },
        createTableButton: function(e) {
            let toolbarItems = e.toolbarOptions.items;
            toolbarItems.push({
                widget: 'dxButton',
                options: {
                    icon: 'upload',
                    type: 'default',
                    text: 'Передано',
                    onClick: function() {
                        this.findAllSelectedRows();
                    }.bind(this)
                },
                location: 'after'
            });
        },
        removeTableButton: function(e) {
            let toolbarItems = e.toolbarOptions.items;
            debugger;
        },
        findAllSelectedRows: function() {
            const selectedRows = this.dataGridInstance.instance.getSelectedRowsData();
            console.log(selectedRows);
            if (selectedRows.length) {
                this.promiseAll = [];
                this.messageService.publish({name: 'showPagePreloader'});
                selectedRows.forEach(row => {
                    const queryPromise = new Promise((resolve) => {
                        let executeQuery = {
                            queryCode: 'h_ButtonTransferred',
                            parameterValues: [
                                {key: '@Id', value: row.Id},
                                {key: '@comment', value: row.comment}
                            ],
                            limit: -1
                        };
                        this.queryExecutor(executeQuery, this.changeRowDataCallBack.bind(this, resolve), this);
                    });
                    this.promiseAll.push(queryPromise);
                });
                Promise.all(this.promiseAll).then(() => {
                    this.promiseAll = [];
                    this.dataGridInstance.instance.deselectAll();
                    this.loadData(this.afterLoadDataHandler);
                    this.config.onToolbarPreparing = this.removeTableButton.bind(this);
                    this.messageService.publish({
                        name: 'reloadMainTable'
                    });
                });
            }
        },
        hideTable: function() {
            this.setVisibilityTableContainer('none');
        },
        changeRowDataCallBack: function(resolve, data) {
            resolve(data);
        },
        afterLoadDataHandler: function() {
            this.render();
        },
        afterRenderTable: function() {
            this.messageService.publish({ name: 'afterRenderTable', code: this.config.query.code });
        }
    };
}());
