(function() {
    return {
        config: {
            query: {
                code: 'DB_ControS_s_table',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'registration_number',
                    caption: 'Номер питання',
                    sortOrder: 'asc',
                    width: 150
                }, {
                    dataField: 'registration_date',
                    caption: 'Дата надходження'
                }, {
                    dataField: 'questionType',
                    caption: 'Тип питання'
                }, {
                    dataField: 'applicant',
                    caption: 'Заявник'
                }, {
                    dataField: 'place_problem',
                    caption: 'Місце проблеми'
                }, {
                    dataField: 'control_date',
                    caption: 'Дата контролю'
                }, {
                    dataField: 'executor',
                    caption: 'Виконавець'
                }
            ],
            filterRow: {
                visible: true,
                applyFilter: 'auto'
            },
            export: {
                enabled: true,
                fileName: 'Організації'
            },
            searchPanel: {
                visible: false,
                highlightCaseSensitive: true
            },
            pager: {
                showPageSizeSelector:  true,
                allowedPageSizes: [10, 15, 30],
                showInfo: true
            },
            paging: {
                pageSize: 10
            },
            editing: {
                enabled: false
            },
            scrolling: {
                mode: 'standart',
                rowRenderingMode: null,
                columnRenderingMode: null,
                showScrollbar: null
            },
            masterDetail: {
                enabled: true
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
        init: function() {
            this.dataGridInstance.height = window.innerHeight - 300;
            document.getElementById('selectInfoTable').style.display = 'none';
            this.subscribers.push(this.messageService.subscribe('clickOnInfoTable', this.changeOnTable, this));
            this.config.masterDetail.template = this.createMasterDetail.bind(this);
            this.dataGridInstance.onCellClick.subscribe(e => {
                if(e.column) {
                    if(e.column.dataField === 'registration_number' && e.row !== undefined) {
                        window.open(`${location.origin}${localStorage.getItem('VirtualPath')}/sections/Assignments/edit/${e.key}`);
                    }
                }
            });
        },
        changeOnTable: function(message) {
            if (!message.columnName) {
                document.getElementById('selectInfoTable').style.display = 'none';
            } else {
                document.getElementById('selectInfoTable').style.display = 'block';
                this.config.query.parameterValues = [
                    { key: '@column', value: `count_${message.columnName}`},
                    { key: '@sector_id', value: message.organizationId},
                    { key: '@pageOffsetRows', value: 0 },
                    { key: '@pageLimitRows', value: 10 }
                ];
                this.loadData(this.afterLoadDataHandler);
            }
        },
        createMasterDetail: function(container, options) {
            const currentEmployeeData = options.data;
            const name = 'createMasterDetail';
            const fields = {
                applicantAdress: 'Адреса заявника',
                content: 'Зміст',
                balancer: 'Балансоутримувач'
            };
            this.messageService.publish({
                name, currentEmployeeData, fields, container
            });
        },
        afterLoadDataHandler: function() {
            this.render();
        }
    };
}());
