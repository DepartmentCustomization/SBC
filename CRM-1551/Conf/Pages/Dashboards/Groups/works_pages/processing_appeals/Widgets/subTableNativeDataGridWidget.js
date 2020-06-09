(function() {
    return {
        config: {
            query: {
                code: 'CoordinatorController_Doopr_Roz_Prostr_NemMozh',
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
                    fixed: true
                }, {
                    dataField: 'QuestionType',
                    caption: 'Тип питання',
                    fixed: true
                }, {
                    dataField: 'zayavnykName',
                    caption: 'Заявник',
                    fixed: true
                }, {
                    dataField: 'adress',
                    caption: 'Місце проблеми',
                    fixed: true
                }, {
                    dataField: 'OrganizationsName',
                    caption: 'Виконавець',
                    fixed: true
                }, {
                    dataField: 'control_date',
                    caption: 'Дата контролю',
                    dataType: 'datetime',
                    format: 'dd.MM.yyyy HH:mm',
                    fixed: true,
                    sortOrder: 'desc'
                }, {
                    dataField: 'rework_counter',
                    caption: 'Лічильник',
                    fixed: true
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
        init: function() {
            this.dataGridInstance.height = window.innerHeight - 305;
            this.tableContainer = document.getElementById('subTable');
            this.setVisibilityTableContainer('none');
            this.subscribers.push(this.messageService.subscribe('clickOnHeaderTable', this.changeOnTable, this));
            /* this.config.masterDetail.template = this.createMasterDetails.bind(this); */
            this.config.onContentReady = this.afterRenderTable.bind(this);
            this.dataGridInstance.onCellClick.subscribe(e => {
                if(e.column) {
                    if(e.column.dataField === 'registration_number' && e.row !== undefined) {
                        window.open(String(
                            location.origin +
                            localStorage.getItem('VirtualPath') +
                            '/sections/Assignments/edit/' +
                            e.key
                        ));
                    }
                }
            });
        },
        setVisibilityTableContainer: function(status) {
            this.tableContainer.style.display = status;
        },
        changeOnTable: function(message) {
            if(message.code) {
                this.setVisibilityTableContainer('block');
                this.config.query.parameterValues = [
                    { key: '@navigation', value: message.navigator},
                    { key: '@column', value: message.code}
                ];
                this.loadData(this.afterLoadDataHandler);
            }else{
                this.setVisibilityTableContainer('none');
            }
        },
        afterLoadDataHandler: function() {
            this.render();
        },
        /* createMasterDetails: function(container, data) {

        }, */
        afterRenderTable: function() {
            this.messageService.publish({ name: 'afterRenderTable', code: this.config.query.code });
        }
    };
}());
