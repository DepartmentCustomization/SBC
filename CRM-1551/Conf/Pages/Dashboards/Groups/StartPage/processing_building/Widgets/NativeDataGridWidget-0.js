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
            this.loadData(this.afterLoadDataHandler);
        },
        getFiltersParams: function() {
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
                        this.applyChangesWithRows();
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
        }
    };
}());
