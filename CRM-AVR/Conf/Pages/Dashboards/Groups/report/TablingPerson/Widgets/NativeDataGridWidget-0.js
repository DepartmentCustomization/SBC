(function () {
  return {
    config: {
        query: {
            code: 'TabelPerson_SelectRows',
            parameterValues: [],
            filterColumns: [],
            sortColumns: [],
            skipNotVisibleColumns: true,
            chunkSize: 1000
        },
        columns: [
            {
                dataField: 'ContactName',
                caption: 'ПІБ',
                dataType: null,
                format: null,
                width: 200,
                alignment: null,
                groupIndex: null,
                fixed: true,
                sortOrder: 'asc',
                allowSorting: true
            }, {
                dataField: 'JobName',
                caption: 'Посада',
                dataType: null,
                format: null,
                width: 250,
                alignment: null,
                groupIndex: null,
                fixed: true,
                allowSorting: true
            }, {
                dataField: 'MonthWorkTime',
                caption: 'Годин за місяць',
                dataType: null,
                format: null,
                width: 70,
                alignment: null,
                groupIndex: null,
                fixed: true,
                allowSorting: true
            }, {
                caption: 'Month',
                columns: []
            }
        ],
        searchPanel: {
            visible: false,
            highlightCaseSensitive: false
        },
        paging: {
            pageSize: 10
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20],
            showInfo: true
        },
        export: {
            enabled: false,
            fileName: 'File_name'
        },
        editing: {
            enabled: false,
        },
        filterRow: {
            visible: false,
            applyFilter: "auto"
        },
        keyExpr: 'ContactId',
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
        showHeaderFilter: true,
        showColumnChooser: true,
        showColumnFixing: true,
        groupingAutoExpandAll: null,
        selectionMode: 'multiple',
    },
    sub: {},
    temp_columns: null,
    init: function() {
        let getUrlParams = window
                            .location
                                .search
                                    .replace('?', '')
                                        .split('&')
                                            .reduce(function(p, e) {
                                                      var a = e.split('=');
                                                      p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                                                      return p;
                                                    }, {}
                                                );
        this.month = getUrlParams.month;
        this.org_id = +getUrlParams.orgId;
        
        
        let date = new Date(this.month);
        let month = date.getMonth()+1;
        let year = date.getYear();
        let monthLength = daysInMonth(month, year);
        this.config.columns[3].columns = [];
        
        this.config.columns[3].caption = getMonth(month);

        for (var i = 1; i <= monthLength; i++) {
            this.config.columns[3].columns.push({dataField: i.toString(), caption: i.toString(), width: 50, dataType: 'String'});
        };
        
        this.config.query.code = 'TabelPerson_SelectRows';
        this.config.query.parameterValues = [
            {key: "@DateStart", value: this.month},
            {key: "@DateEnd", value: this.month},
            {key: "@orgId", value: this.org_id }
        ];
        this.loadData(this.afterLoadDataHandler);
        
        function daysInMonth (month, year) {
            return new Date(year, month, 0).getDate();
        }
        function getMonth(val) {
           if(val==1){return 'Січень'}
           else if(val==2) {return 'Лютий'}
           else if(val==3) {return 'Березень'}
           else if(val==4) {return 'Квітень'}
           else if(val==5) {return 'Травень'}
           else if(val==6) {return 'Червень'}
           else if(val==7) {return 'Липень'}
           else if(val==8) {return 'Серпень'}
           else if(val==9) {return 'Вересень'}
           else if(val==10) {return 'Жовтень'}
           else if(val==11) {return 'Листопад'}
           else if(val==12) {return 'Грудень'}
           
        };
        
        this.config.onContentReady = this.afterRenderTable.bind(this);
    },
    afterRenderTable: function() {
        const rows = this.dataGridInstance.instance.getVisibleRows();
        
        for( i=0; i < rows.length; i++) {
            let row = rows[i];
            let key = row.key;
            
            let executeQuery = {
                queryCode: 'TablePerson_SelectRows2',
                parameterValues: [ 
                    {key: "@DateStart", value: this.month},
                    {key: "@ContactId", value: key}
                ],
                limit: -1
            };
            this.queryExecutor(executeQuery, this.getTimer.bind(this, row), this);
        }
    },
    getTimer: function(row, personData){
        let indexWordDay = personData.columns.findIndex(el => el.code.toLowerCase() === 'workday' );
        let indexNote = personData.columns.findIndex(el => el.code.toLowerCase() === 'note' );
        let indexContId = personData.columns.findIndex(el => el.code.toLowerCase() === 'contid' );
        for( i=0; i<personData.rows.length; i++) {
            let data = personData.rows[i];
            if(row.key === data.values[indexContId]) {
                if( data.values[indexNote] !== '' && data.values[indexNote] !== null ) {
                    row.data[i+1] =  data.values[indexNote];
                }
            }
        }    
        
    },
    afterViewInit: function() {
        
    },
    afterLoadDataHandler: function(data) {
        this.render();
    },
    destroy: function() {
    }
};
}());
