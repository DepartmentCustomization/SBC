(function() {
    return {
        config: {
            query: {
                code: 'Polls_SelectRows',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            paging: {
                pageSize: 10
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [10, 25, 50, 100]
            },
            editing: {
                allowAdding: true,
                allowUpdating: true,
                useIcons: true,
                mode: 'form'
            },
            focusedRowEnabled: false,
            remoteOperations: false,
            allowColumnReordering: true,
            allowColumnResizing: true,
            wordWrapEnabled: true,
            rowAlternationEnabled: true,
            hoverStateEnabled: true,
            filterRow: { visible: true },
            keyExpr: '',
            showBorders: true,
            columns: [
                {
                    dataField: 'poll_name',
                    caption: 'Опитування'
                },
                {
                    dataField: 'icon',
                    caption: '',
                    width:80
                },
                {
                    dataField: 'start_date',
                    caption: 'Дата старту'
                },
                {
                    dataField: 'end_date',
                    caption: 'Дата завершення'
                },
                {
                    dataField: 'name',
                    caption: 'Напрямок'
                },
                {
                    dataField: 'col_Applicants',
                    caption: 'Людей для опитування'
                },
                {
                    dataField: 'col_IsPollsApplicants',
                    caption: 'Опитано'
                },
                {
                    dataField: 'col_IsNotApplicants',
                    caption: 'Відмовились'
                }
            ]
        },
        init: function() {
            this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this));
            this.sendQuery = true;
            this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.applyCallBack, this));
            this.config.onCellPrepared = this.onCellPrepared.bind(this);
        },
        getFiltersParams: function(message) {
            this.config.query.filterColumns = [];
            const period = message.package.value.values.find(f => f.name === 'period').value;
            const activity = message.package.value.values.find(f => f.name === 'Activity').value;
            const direction = message.package.value.values.find(f => f.name === 'Direction').value;
            this.activity = activity === '' ? null : activity.value;
            if(period !== null) {
                if(period.dateFrom !== '' && period.dateTo !== '') {
                    this.dateFrom = period.dateFrom;
                    this.dateTo = period.dateTo;
                    this.direction = this.extractOrgValues(direction);
                    if (this.direction.length > 0) {
                        let filter = {
                            key: 'PollDirId',
                            value: {
                                operation: 0,
                                not: false,
                                values: this.direction
                            }
                        };
                        this.config.query.filterColumns.push(filter);
                    }
                    if(this.sendQuery) {
                        this.sendQuery = false;
                        this.applyCallBack();
                    }
                }
            }
        },
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if(children.length > 0) {
                children.forEach(child =>{
                    element.appendChild(child);
                });
            } return element;
        },
        extractOrgValues: function(items) {
            if(items.length && items !== '') {
                const valuesList = [];
                items.forEach(item => valuesList.push(item.value));
                return valuesList;
            }
            return [];
        },
        onCellPrepared: function(options) {
            if(options.rowType === 'data') {
                if(options.column.dataField === 'icon') {
                    options.cellElement.classList.add('cell-icon');
                    const icon = '<span class="material-icons calendar"> event </span>';
                    options.cellElement.insertAdjacentHTML('afterbegin',icon);
                }
            }
        },
        applyCallBack() {
            this.hideFilterPanel();
            this.config.query.parameterValues = [
                {key: '@DateStart' , value: this.dateFrom },
                {key: '@DateEnd', value: this.dateTo },
                {key: '@is_active', value: this.activity }
            ];
            this.loadData(this.afterLoadDataHandler);
            this.setVisibility();
        },
        hideFilterPanel() {
            const msg = {
                name: 'SetFilterPanelState',
                package: {
                    value: false
                }
            };
            this.messageService.publish(msg);
        },
        setVisibility() {
            const con = document.getElementById('NativeDataGridWidget-0')
            con.addEventListener('click',(e)=> {
                if(e.target.classList.contains('dx-button-text')) {
                    const msg = {
                        name: 'setVisibility',
                        package: {
                            display: 'none',
                            container: con
                        }
                    };
                    this.messageService.publish(msg);
                }
            })
        },
        afterLoadDataHandler: function() {
            this.render();
        }
    };
}());
