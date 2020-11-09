(function() {
    return {
        config: {
            query: {
                code: 'DamageCounting_data',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [],
            keyExpr: 'Id',
            scrolling: {
                mode: 'virtual'
            },
            filterRow: {
                visible: true,
                applyFilter: 'auto'
            },
            showBorders: false,
            showColumnLines: false,
            showRowLines: true,
            remoteOperations: null,
            allowColumnReordering: null,
            rowAlternationEnabled: null,
            columnAutoWidth: true,
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
        getIsSmall: function(message) {
            if (message.package.value === 0) {
                this.variant = 'full';
            } else {
                this.variant = 'short';
            }
            this.recalColumns();
        },
        getIsNullValues: function(message) {
            if (message.package.value === 0) {
                this.vision = 'short';
            } else {
                this.vision = 'full';
            };

            this.recalColumns();
        },
        init: function() {
            this.dataGridInstance.height = window.innerHeight - 150;
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this);
            this.sub = this.messageService.subscribe('ApplyGlobalFilters', this.recalColumns, this);
            this.sub2 = this.messageService.subscribe('CheckIsSmall', this.getIsSmall, this);
            this.sub2 = this.messageService.subscribe('CheckIsNullValues', this.getIsNullValues, this);
        },
        columnData: [],
        variant: 'short',
        vision: 'short',
        recalColumns: function() {
            this.applyChanges(false);
            if (this.orgVal.length > 0) {
                let executeQuery = {
                    queryCode: 'DamageCounting_capture',
                    parameterValues: [
                        { key: '@dateFrom', value: this.dateFrom },
                        { key: '@dateTo', value: this.dateTo },
                        { key: '@variant', value: this.variant },
                        { key: '@vision', value: this.vision },
                        { key: '@orgId', value: this.orgVal },
                        { key: '@accessId', value: this.access }
                    ]
                };
                this.queryExecutor(executeQuery, this.loadColumns, this);
            }
        },
        loadColumns: function(data) {
            this.columnData = [];
            this.tree = function(object) {
                let o = {}, columns = {};

                o[0] = { name:'All' };
                object.rows.forEach(function(a) {
                    if (a.values[4] === 1) {
                        o[a.values[0]] = {
                            caption: a.values[2]
                        };
                    } else {
                        o[a.values[0]] = {
                            caption: a.values[2],
                            dataField: a.values[3],
                            width: 150
                        };
                    }
                });

                object.rows.forEach(function(a) {
                    o[a.values[0]].parent = (o[a.values[1]] ? o[a.values[1]].caption : '');
                    o[a.values[1]].columns = (o[a.values[1]] ? o[a.values[1]].columns || [] : null);
                    o[a.values[1]].columns.push(o[a.values[0]]);
                    columns[a.values[0]] = true;
                });

                return Object.keys(o).filter(function(k) {
                    return !columns[k];
                }).map(function(k) {
                    return o[k];
                });
            }(data);

            const OrgCol = { caption: 'Підрозділ', dataField: 'short_name', width: 250 }
            const StatCol = { caption: 'Статус', dataField: 'status_name', width: 150 }
            if (this.tree[0].columns) {
                this.tree[0].columns[0].columns.unshift(StatCol);
                this.tree[0].columns[0].columns.unshift(OrgCol);
                this.columnData = this.tree[0].columns[0].columns;
                this.config.columns = this.columnData;
                this.config.query.parameterValues = [
                    { key: '@dateFrom', value: this.dateFrom },
                    { key: '@dateTo', value: this.dateTo },
                    { key: '@variant', value: this.variant },
                    { key: '@vision', value: this.vision },
                    { key: '@orgId', value: this.orgVal },
                    { key: '@accessId', value: this.access }
                ];
                this.loadData(this.afterLoadDataHandler);
            }
        },
        changeDateTimeValues: function(value) {
            let trueDate;
            if (value !== null) {
                let date = new Date(value);
                let dd = date.getDate();
                let MM = date.getMonth();
                let yyyy = date.getFullYear();
                let HH = date.getUTCHours()
                let mm = date.getMinutes();
                MM += 1;
                if ((dd.toString()).length === 1) {
                    dd = '0' + dd;
                }
                if ((MM.toString()).length === 1) {
                    MM = '0' + MM;
                }
                if ((HH.toString()).length === 1) {
                    HH = '0' + HH;
                }
                if ((mm.toString()).length === 1) {
                    mm = '0' + mm;
                }
                trueDate = dd + '.' + MM + '.' + yyyy;
            } else {
                trueDate = ' ';
            }
            return trueDate;
        },
        getFiltersParams: function(message) {
            let period = message.package.value.values.find(f => f.name === 'period').value;
            let orgVal = message.package.value.values.find(f => f.name === 'division').value;
            let access = message.package.value.values.find(f => f.name === 'access').value[0];
            if (period !== null) {
                if (period.dateFrom !== '' && period.dateTo !== '') {
                    this.dateFrom = period.dateFrom;
                    this.dateTo = period.dateTo;
                    this.orgVal = this.extractValues(orgVal);
                    this.access = access;
                }
            }
        },
        extractValues: function(items) {
            if (items.length && items !== '') {
                const valuesList = [];
                items.forEach(item => valuesList.push(item.value));
                return valuesList.join(', ');
            }
            return [];
        },
        afterLoadDataHandler: function() {
            this.render();
        },
        applyChanges: function(state) {
            const msg = {
                name: 'SetFilterPanelState',
                package: {
                    value: state
                }
            };
            this.messageService.publish(msg);
        },
        destroy: function() {
            this.sub.unsubscribe();
            this.sub1.unsubscribe();
            this.sub2.unsubscribe();
        }
    };
}());
