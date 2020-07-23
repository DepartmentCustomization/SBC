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
            editing: {},
            showBorders: true,
            columns: [
                {
                    dataField: 'poll_name',
                    caption: 'Опитування'
                },
                {
                    dataField: 'is_active',
                    caption: ''
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
            ],
            keyExpr: ''
        },
        init: function() {
            this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this));
            this.sendQuery = true;
            this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.applyCallBack, this));
        },
        getFiltersParams: function(message) {
            const period = message.package.value.values.find(f => f.name === 'period').value;
            if(period !== null) {
                if(period.dateFrom !== '' && period.dateTo !== '') {
                    this.dateFrom = period.dateFrom;
                    this.dateTo = period.dateTo;
                    if(this.sendQuery) {
                        this.sendQuery = false;
                        this.applyCallBack();
                    }
                }
            }
        },
        applyCallBack() {
            const msg = {
                name: 'Polls_SelectRows',
                package: {
                    value: false
                }
            };
            this.messageService.publish(msg);
            this.config.query.parameterValues = [
                {key: '@DateStart' , value: this.dateFrom },
                {key: '@DateEnd', value: this.dateTo }
            ];
            this.loadData(this.afterLoadDataHandler);
        },
        afterLoadDataHandler: function() {

            this.render();
        }
    };
}());
