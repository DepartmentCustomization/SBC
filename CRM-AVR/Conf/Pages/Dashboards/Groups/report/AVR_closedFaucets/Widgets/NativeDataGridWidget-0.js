(function() {
    return {
        config: {
            query: {
                code: 'AVR_SelectClosedFaucets',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'Claim_Number',
                    caption: '№ Заявки'
                }, {
                    dataField: 'orgName',
                    caption: 'Відповідальний підрозділ'
                }, {
                    dataField: 'claim_place',
                    caption: 'Адреса заявки'
                }, {
                    dataField: 'claim_type',
                    caption: 'Тип заявки'
                }, {
                    dataField: 'faucet_diameter',
                    caption: 'Діаметр засувок'
                }, {
                    dataField: 'faucet_closed_place',
                    caption: 'Адреса перекритих засувок'
                }, {
                    dataField: 'faucet_switchOff_place',
                    caption: 'Об`єкти без води'
                }, {
                    dataField: 'faucet_closedStart',
                    caption: 'Дата закриття засувки'
                    // dataType: 'datetime'
                }, {
                    dataField: 'faucet_closedFinish',
                    caption: 'Дата відкриття засувки'
                    // dataType: 'datetime'
                }, {
                    dataField: 'claim_status',
                    caption: 'Статус'
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
        getFiltersParams: function(message) {
            let period = message.package.value.values.find(f => f.name === 'period').value;
            if (period !== null) {
                if (period.dateFrom !== '' && period.dateTo !== '') {
                    this.dateFrom = period.dateFrom;
                    this.dateTo = period.dateTo;
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
