(function() {
    return {
        config: {
            query: {
                code: 'urbio_db_Builds',
                parameterValues: [
                    { key: '@pageOffsetRows', value: 0 },
                    { key: '@pageLimitRows', value: 10 }
                ],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'operations',
                    caption: 'Операція'
                }, {
                    dataField: 'Urbio_District',
                    caption: 'Район'
                }, {
                    dataField: '1551_District',
                    caption: 'Район в 1551'
                }, {
                    dataField: '1551_Build',
                    caption: 'Будинок в 1551'
                }, {
                    dataField: 'is_done',
                    caption: 'Стан'
                }, {
                    dataField: 'comment',
                    caption: 'Коментар'
                }
            ],
            keyExpr: 'Id',
            selection: {
                mode: 'multiple'
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
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this);
            this.sub1 = this.messageService.subscribe('ApplyGlobalFilters', this.applyGlobalFilters, this);
            this.config.onToolbarPreparing = this.createTableButton.bind(this);
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
            if (value !== null) {
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
            let toolbarItems = e.toolbarOptions.items;
            toolbarItems.push({
                widget: 'dxButton',
                location: 'after',
                options: {
                    icon: 'check',
                    type: 'default',
                    text: 'Застосувати',
                    elementAttr: {
                        class: 'defaultButton'
                    },
                    onClick: function(e) {
                        e.event.stopImmediatePropagation();
                        const queryCode = 'urbio_db_Button_apply_build';
                        this.applyRowsChanges(queryCode);
                    }.bind(this)
                }
            });
            toolbarItems.push({
                widget: 'dxButton',
                location: 'after',
                options: {
                    icon: 'arrowdown',
                    type: 'default',
                    text: 'Пропустити',
                    elementAttr: {
                        class: 'defaultButton'
                    },
                    onClick: function(e) {
                        e.event.stopImmediatePropagation();
                        const queryCode = 'urbio_db_Button_skip_build';
                        this.applyRowsChanges(queryCode);
                    }.bind(this)
                }
            });
            toolbarItems.push({
                widget: 'dxButton',
                location: 'after',
                options: {
                    icon: 'exportxlsx',
                    type: 'default',
                    text: 'Excel',
                    elementAttr: {
                        class: 'defaultButton'
                    },
                    onClick: function(e) {
                        e.event.stopImmediatePropagation();
                    }.bind(this)
                }
            });
        },
        applyRowsChanges: function(code) {
            const rows = this.dataGridInstance.instance.getSelectedRowsData();
            if(rows.length) {
                this.showPagePreloader('Зачекайте, дані обробляються');
                rows.forEach(row => {
                    let executeApplyRowsChanges = {
                        queryCode: code,
                        limit: -1,
                        parameterValues: [
                            { key: '@Analitics_Id', value: row.Analitics_Id },
                            { key: '@Urbio_Id', value: row.Urbio_Id },
                            { key: '@Operation', value: row.operations },
                            { key: '@comment', value: row.comment }
                        ]
                    };
                    this.queryExecutor(executeApplyRowsChanges);
                    this.showPreloader = false;
                });
            }
        },
        applyGlobalFilters: function() {
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
