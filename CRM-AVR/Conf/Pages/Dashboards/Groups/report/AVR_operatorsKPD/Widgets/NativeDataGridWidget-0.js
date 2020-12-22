(function() {
    return {
        config: {
            query: {
                code: 'db_kpd_MainTable',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'date',
                    caption: 'Дата',
                    alignment:'center',
                    width:'200',
                    dateType: 'datetime',
                    format: 'dd.MM.yyyy'
                }, {
                    dataField: 'PIB_operator',
                    caption: 'ПІБ оператора',
                    alignment:'center',
                    width:'300'
                }, {
                    dataField: 'subdivision',
                    caption: 'Підрозділ',
                    alignment:'center',
                    width:'250'
                }, {
                    dataField: 'count_open_claims',
                    caption: 'Відкрито заявок',
                    alignment:'center'
                }, {
                    dataField: 'count_close_claims',
                    caption: 'Закрито заявок',
                    alignment:'center'
                }, {
                    dataField: 'count_all_claims',
                    caption: 'ВСЬОГО',
                    alignment:'center',
                    width:'200'
                }, {
                    dataField: 'count_open_orders',
                    caption: 'Відкрито виїздів',
                    alignment:'center'
                }, {
                    dataField: 'count_close_orders',
                    caption: 'Закрито виїздів',
                    alignment:'center'
                }, {
                    dataField: 'count_all_orders',
                    caption: 'ВСЬОГО',
                    alignment:'center',
                    width:'200'
                }
            ],
            keyExpr: 'Id',
            scrolling: {
                mode: 'virtual'
            },
            filterRow: {
                visible: true,
                applyFilter: 'auto'
            },
            showBorders: true,
            showColumnLines: true,
            showRowLines: true,
            remoteOperations: null,
            allowColumnReordering: null,
            rowAlternationEnabled: null,
            columnAutoWidth: null,
            hoverStateEnabled: true,
            columnWidth: 'auto',
            wordWrapEnabled: true,
            allowColumnResizing: true,
            showFilterRow: true,
            showHeaderFilter: true,
            showColumnChooser: false,
            showColumnFixing: true,
            groupingAutoExpandAll: null,
            export: {
                enabled: true,
                fileName: 'Відомість перекритих засувок'
            }
        },
        init: function() {
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this);
            this.dataGridInstance.height = window.innerHeight - 150;
        },
        showTopQuestionsTable: function() {
            document.getElementById('cars_report').style.display = 'block';
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
        toUTC(val) {
            let date = new Date(val);
            let year = date.getFullYear();
            let monthFrom = date.getMonth();
            let dayTo = date.getDate();
            let hh = date.getHours();
            let mm = date.getMinutes();
            let dateTo = new Date(year, monthFrom , dayTo, hh + 3, mm)
            return dateTo
        },
        getFiltersParams: function(message) {
            let period = message.package.value.values.find(f => f.name === 'period').value;
            if (period !== null) {
                if (period.dateFrom !== '' && period.dateTo !== '') {
                    this.dateFrom = this.toUTC(period.dateFrom);
                    this.dateTo = this.toUTC(period.dateTo);
                    this.config.query.parameterValues = [
                        { key: '@dateFrom', value: this.dateFrom },
                        { key: '@dateTo', value: this.dateTo }
                    ];
                    this.loadData(this.afterLoadDataHandler);
                }
            }
        },
        afterLoadDataHandler: function() {
            this.render();
        },
        destroy: function() {
            this.sub.unsubscribe();
        }
    };
}());
