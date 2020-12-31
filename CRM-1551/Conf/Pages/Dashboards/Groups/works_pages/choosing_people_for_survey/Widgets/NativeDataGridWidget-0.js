(function() {
    return {
        config: {
            query: {
                code: 'Polls_MainTable',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'full_name',
                    caption: 'ПІБ',
                    alignment:'left',
                    width:300
                },
                {
                    dataField: 'phone_number_main',
                    caption: 'Головний телефон',
                    alignment:'center'
                },
                {
                    dataField: 'phone_number_add',
                    caption: 'Додатковий телефон',
                    alignment:'center'
                },
                {
                    dataField: 'adress',
                    caption: 'Адреса',
                    alignment:'center'
                },
                {
                    dataField: 'age',
                    caption: 'Вік',
                    alignment:'center'
                },
                {
                    dataField: 'count_appeals',
                    caption: 'Кількість звернень',
                    alignment:'center'
                },
                {
                    dataField: 'par',
                    caption: 'Пільга',
                    alignment:'center'
                }
            ],
            export: {
                enabled: false,
                fileName: 'Excel'
            },
            pager: {
                showPageSizeSelector:  true,
                allowedPageSizes: [10, 15, 30],
                showInfo: true
            },
            paging: {
                pageSize: 10
            },
            scrolling: {
                mode: 'standart',
                rowRenderingMode: null,
                columnRenderingMode: null,
                showScrollbar: null
            },
            sorting: {
                mode: 'multiple'
            },
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
            showFilterRow: true,
            showHeaderFilter: false,
            showColumnChooser: false,
            showColumnFixing: true
        },
        init: function() {
            this.config.onToolbarPreparing = this.createTableButton.bind(this);
            this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.setFiltersValue, this));
            this.loadData(this.afterLoadDataHandler);
        },
        setFiltersValue() {
            /* const filters = message.package.value;
             const filterJSON = this.getFiltersValue(filters)*/
        },
        getFiltersValue() {
            /*const dataFilters = filters.filter(elem=>elem.type === 'Date');
            const otherFilters = filters.filter(elem=>elem.type !== 'Date');*/
        },
        createTableButton: function(e) {
            let toolbarItems = e.toolbarOptions.items;
            toolbarItems.push({
                widget: 'dxButton',
                options: {
                    icon: 'add',
                    type: 'default',
                    text: 'Додати',
                    elementAttr: {
                        id: 'button_add'
                    },
                    onClick: function(e) {
                        e.event.stopImmediatePropagation();
                        let status = 'noCompetence';
                        this.findAllSelectRows(status);
                    }.bind(this)
                },
                location: 'after'
            });
        },
        afterLoadDataHandler: function() {
            this.render();
        }
    };
}());
