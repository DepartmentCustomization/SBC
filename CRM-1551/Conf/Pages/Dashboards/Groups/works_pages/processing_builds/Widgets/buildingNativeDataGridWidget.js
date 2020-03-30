(function() {
    return {
        config: {
            query: {
                code: 'urbio_db_Builds',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    allowEditing: false,
                    dataField: 'operations',
                    caption: 'Операція'
                }, {
                    allowEditing: false,
                    dataField: 'Urbio_District',
                    caption: 'Район'
                }, {
                    allowEditing: false,
                    dataField: 'Urbio_build',
                    caption: 'Будинок'
                }, {
                    allowEditing: false,
                    dataField: '1551_District',
                    caption: 'Район в 1551'
                }, {
                    allowEditing: false,
                    dataField: '1551_Build',
                    caption: 'Будинок в 1551'
                }, {
                    allowEditing: true,
                    dataField: 'is_done',
                    caption: 'Стан'
                }, {
                    allowEditing: true,
                    dataField: 'comment',
                    caption: 'Коментар'
                }
            ],
            keyExpr: 'Id',
            selection: {
                mode: 'multiple'
            },
            editing: {
                mode: 'cell',
                allowUpdating: true,
                useIcons: true
            },
            export: {
                enabled: true,
                fileName: 'Excel'
            },
            showBorders: false,
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
            showHeaderFilter: false,
            showColumnChooser: false,
            showColumnFixing: true,
            groupingAutoExpandAll: null
        },
        firstLoad: true,
        init: function() {
            this.dataGridInstance.height = window.innerHeight - 100;
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this);
            this.sub1 = this.messageService.subscribe('ApplyGlobalFilters', this.applyChanges, this);
            this.config.onToolbarPreparing = this.createTableButton.bind(this);
            this.dataGridInstance.onCellClick.subscribe(e => {
                if(e.column) {
                    if(e.column.dataField === '1551_Build' && e.row !== undefined) {
                        window.open(location.origin +
                        localStorage.getItem('VirtualPath') +
                        '/sections/Buildings/edit/' + e.data.Analitics_Id);
                    }
                }
            });
        },
        getFiltersParams: function(message) {
            this.config.query.filterColumns = [];
            const processed = message.package.value.values.find(f => f.name === 'processed').value;
            const builds = message.package.value.values.find(f => f.name === 'builds').value;
            this.setFiltersColumns(processed.value, 'is_done_filter');
            this.setFiltersColumns(builds.value, 'name_fullName_filter');
            this.firstLoadCheck();
        },
        setFiltersColumns: function(value, key) {
            if(value !== undefined) {
                const filter = {
                    key: key,
                    value: {
                        operation: 0,
                        not: false,
                        values: [value]
                    }
                };
                this.config.query.filterColumns.push(filter);
            }
        },
        firstLoadCheck: function() {
            if(this.firstLoad) {
                this.firstLoad = false;
                this.loadData(this.afterLoadDataHandler);
            }
        },
        createTableButton: function(e) {
            const self = this;
            const buttonApplyProps = {
                text: 'Застосувати',
                queryCode: 'urbio_db_Button_apply_build',
                type: 'default',
                icon: 'check',
                location: 'after',
                class: 'defaultButton',
                method: function() {
                    self.applyRowsChanges(this.queryCode);
                }
            }
            const buttonSkipProps = {
                text: 'Пропустити',
                queryCode: 'urbio_db_Button_skip_build',
                type: 'default',
                icon: 'arrowdown',
                location: 'after',
                class: 'defaultButton',
                method: function() {
                    self.applyRowsChanges(this.queryCode);
                }
            }
            const buttonApply = this.createToolbarButton(buttonApplyProps);
            const buttonSkip = this.createToolbarButton(buttonSkipProps);
            e.toolbarOptions.items.push(buttonApply);
            e.toolbarOptions.items.push(buttonSkip);
        },
        createToolbarButton: function(button) {
            return {
                widget: 'dxButton',
                location: button.location,
                options: {
                    icon: button.icon,
                    type: button.type,
                    text: button.text,
                    elementAttr: {
                        class: button.class
                    },
                    onClick: function(e) {
                        e.event.stopImmediatePropagation();
                        button.method();
                    }.bind(this)
                }
            }
        },
        applyRowsChanges: function(code) {
            const rows = this.dataGridInstance.instance.getSelectedRowsData();
            if(rows.length) {
                this.showPagePreloader('Зачекайте, дані обробляються');
                this.promiseAll = [];
                rows.forEach(row => {
                    const promise = new Promise((resolve) => {
                        const executeApplyRowsChanges = this.createExecuteApplyRowsChanges(row, code);
                        this.queryExecutor(executeApplyRowsChanges, this.applyRequest.bind(this, resolve), this);
                        this.showPreloader = false;
                    });
                    this.promiseAll.push(promise);
                });
                this.afterApplyAllRequests();
            }
        },
        createExecuteApplyRowsChanges: function(row, code) {
            return {
                queryCode: code,
                limit: -1,
                parameterValues: [
                    { key: '@Analitics_Id', value: row.Analitics_Id },
                    { key: '@Urbio_Id', value: row.Urbio_Id },
                    { key: '@Operation', value: row.operations },
                    { key: '@comment', value: row.comment }
                ]
            };
        },
        applyRequest: function(resolve, data) {
            resolve(data);
        },
        afterApplyAllRequests: function() {
            Promise.all(this.promiseAll).then(() => {
                this.promiseAll = [];
                this.dataGridInstance.instance.deselectAll();
                this.loadData(this.afterLoadDataHandler);
                this.hidePagePreloader();
            });
        },
        applyChanges: function() {
            this.sendMessageFilterPanelState(false);
            this.loadData(this.afterLoadDataHandler);
        },
        sendMessageFilterPanelState: function(state) {
            const msg = {
                name: 'SetFilterPanelState',
                package: {
                    value: state
                }
            };
            this.messageService.publish(msg);
        },
        afterLoadDataHandler: function() {
            this.render();
        },
        destroy: function() {
            this.sub.unsubscribe();
            this.sub1.unsubscribe();
        }
    };
}());
