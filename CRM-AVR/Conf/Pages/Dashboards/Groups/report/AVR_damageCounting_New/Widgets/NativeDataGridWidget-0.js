(function() {
    return {
        config: {
            query: {
                code: 'DamageCounting_capture',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
            ],
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
            columnAutoWidth: null,
            hoverStateEnabled: true,
            columnWidth: null,
            wordWrapEnabled: true,
            allowColumnResizing: true,
            showFilterRow: true,
            showHeaderFilter: true,
            showColumnChooser: false,
            showColumnFixing: true,
            groupingAutoExpandAll: null
        },
        init: function() {
            this.dataGridInstance.height = window.innerHeight - 150;
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this);
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
            this.config.query.filterColumns = [];
            if (period !== null && orgVal.length > 0) {
                if (period.dateFrom !== '' && period.dateTo !== '') {
                    this.dateFrom = period.dateFrom;
                    this.dateTo = period.dateTo;
                    this.config.query.parameterValues = [
                        { key: '@dateFrom', value: this.dateFrom },
                        { key: '@dateTo', value: this.dateTo }
                    ];
                    this.orgVal = this.extractValues(orgVal);
                    this.config.query.filterColumns = [];
                    const filter = {
                        key: 'OrgId',
                        value: {
                            operation: 0,
                            not: false,
                            values: this.orgVal
                        }
                    };
                    this.config.query.filterColumns.push(filter);
                    this.loadData(this.afterLoadDataHandler);
                }
            }
        },
        extractValues: function(items) {
            if(items.length && items !== '') {
                const valuesList = [];
                items.forEach(item => valuesList.push(item.value));
                return valuesList;
            }
            return [];
        },
        afterLoadDataHandler: function() {
            this.render();
        },
        destroy: function() {
            this.sub.unsubscribe();
        }
    };
}());
