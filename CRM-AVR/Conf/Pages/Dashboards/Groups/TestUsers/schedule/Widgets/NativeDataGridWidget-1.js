(function () {
  return {
    config: {
        query: {
            code: 'avr_timeSheet_Select',
            parameterValues: [],
            filterColumns: [],
            sortColumns: [],
            skipNotVisibleColumns: true,
            chunkSize: 1000
        },
        columns: [
            {
                dataField: 'weekdays',
                caption: "",
                width: 40
            }, {
                dataField: 'day',
                caption: "День",
                width: 50
            }, {
                dataField: 'Plan_start_time',
                caption: "Початок",
                dataType: 'datetime',
                format: 'shortTime',
            }, {
                dataField: 'Time_count',
                caption: "Кiлькiсть годин",
                dataType: 'number'
            }, {
                dataField: 'Value',
                caption: "Примітка",
                lookup: {
                    dataSource: {
                        paginate: true,
                        store: this.statuses,
                    },
                    valueExpr: "ID",
                    displayExpr: "Name"
                }
            }
        ],
        keyExpr: 'Id',
        loadPanel: {
            enabled: false
        },
        editing: {
            allowUpdating: true,
            mode: "row",
            useIcons: true
        },        
        scrolling: {
            mode: "virtual"
        },
        sorting: {
            mode: 'None'    
        },
        height: 540,
        showBorders: true,
        showColumnLines: true,
        showRowLines: true
    },
    init: function() {
        this.timeStart = [];
        this.timeDuration = [];
        this.statuses = [];
        this.changedRows = [];
        this.days = [];
        this.sub1 =  this.messageService.subscribe( 'getSetDate', this.sendMonthDayCounter, this);
        this.sub2 =  this.messageService.subscribe( 'messageForCreateNewTable', this.сreateNewTimesheet, this);
        this.sub3 =  this.messageService.subscribe( 'messageForUpdateThisTable', this.updateThisTable, this);
        this.config.onCellPrepared = this.onCellPrepared.bind(this);
        var objEmptyFull = {  "ID":  0, "Name": ' ', }
        this.timeStart.push(objEmptyFull);
        this.timeDuration.push(objEmptyFull);
        for( let i = 1; i < 25; i ++){
            if(i<10) { i='0'+i }
            let obj = {
                "ID": Number(i),
                "Name":  Number(i),
            }     
            this.timeDuration.push(obj);
        }
        let executeQueryStatuses = {
            queryCode: 'avr_Schedule_dir_SelectRows',
            limit: -1,
            parameterValues: [
                { key: '@pageOffsetRows', value: 0},
                { key: '@pageLimitRows', value: 10}
            ]
        };
        this.queryExecutor(executeQueryStatuses, setStatuses, this);
        this.statuses = [ { "ID": null, "Name": ' ' } ];
        function setStatuses(data){
            data.rows.forEach( row => {
                let status = {
                    "ID": row.values[0],
                    "Name":  row.values[1]
                }
                this.statuses.push(status);
            });
        }
        this.config.columns[4].lookup.dataSource.store = this.statuses;
        this.dataGridInstance.onRowUpdating.subscribe(e => {
            let plan_start_time = e.newData.Plan_start_time;
            let id  = e.key;
            let status = e.newData.Value === undefined ? e.oldData.Value : e.newData.Value;
            let time_count = e.newData.Time_count === undefined ? e.oldData.Time_count : e.newData.Time_count;
            if( plan_start_time === undefined ){
                plan_start_time = e.oldData.Plan_start_time;
            }
            if( this.changedRows.length > 0) {
                for ( let  i = 0; i <  this.changedRows.length; i ++){
                    let item =  this.changedRows[i];
                    if( item.id === id){
                        this.changedRows.splice(i,1);
                        break
                    }
                }
            }
            const time = plan_start_time === null ? plan_start_time : this.changeDateTimeValues(plan_start_time);
            let obj = { id, time, time_count, status }
            this.changedRows.push(obj);
        });
    },
	changeDateTimeValues: function(value) {
        let date = new Date(value);
        let DD = date.getDate().toString();
        let MM = (date.getMonth() + 1).toString();
        let YYYY = date.getFullYear().toString();
        let hh = date.getHours().toString();
        let mm = date.getMinutes().toString();
        DD = DD.length === 1 ? '0' + DD : DD;
        MM = MM.length === 1 ? '0' + MM : MM;
        hh = hh.length === 1 ? '0' + hh : hh;
        mm = mm.length === 1 ? '0' + mm : mm;
        return YYYY + '-' + MM + '-' + DD + 'T' + hh + ':' + mm + ':00';
    },
    onCellPrepared: function(options) {
        if(options.rowType === 'data') {
            if(options.data.weekdays === 'Нд.' || options.data.weekdays === 'Сб.') {
                options.cellElement.style.backgroundColor = 'rgba(255, 110, 64, 0.72)';
                options.cellElement.style.color = '#FFF';
            }
            if(options.column.dataField === 'Plan_start_time') {
                const startTime = options.data.Plan_start_time;
                if(startTime !== null) {
                    const dateValue = startTime + '+0000';
                    const date = new Date(Date.parse(dateValue));
                }
            }
        }
    },
    updateThisTable: function() {
        this.counter = 0;
        this.changedRows.forEach( row => {
            let executeQuery = {
                queryCode: 'avr_timeSheet_Update',
                parameterValues: [
                    {key: '@timeSheet_Id', value: row.id},
                    {key: '@plan_start_time', value: row.time},
                    {key: '@time_count', value: row.time_count},
                    {key: '@value', value: row.status}
                ],
                limit: -1
            };     
            this.counter++;
            this.queryExecutor(executeQuery, this.afterUpdate, this);
        });
    },
    afterUpdate: function() {
        if( this.counter === this.changedRows.length) {
            this.changedRows = [];
            this.messageService.publish( { name: 'reloadTimeCounter'});
        }
        this.loadData(this.afterLoadDataHandler);
    },
    sendMonthDayCounter: function(message) {
        this.changedRows = [];
        this.employeeId = message.employeeId;
        this.dayStart = message.dayStart;
        this.dayCounter = message.dayCounter;
        this.month = message.monthNumber;
        this.year = message.yearNumber;
        this.config.query.parameterValues = [
            {  key: '@month', value:  this.month },
            {  key: '@year', value:  this.year },        
            {  key: '@job_id', value: this.employeeId }
        ];
        this.loadData(this.afterLoadDataHandler);
    },
    сreateNewTimesheet: function() {
        let executeCreateNewTable = {
            queryCode: 'avr_createNewTimesheet',
            limit: -1,
            parameterValues: [ 
                {  key: '@start_date', value:  this.dayStart },
                {  key: '@countDate', value:  this.dayCounter },
                {  key: '@job_id', value: this.employeeId }
            ]
        };
        this.queryExecutor(executeCreateNewTable, this.сreateNewTimesheet1, this);
    },
    сreateNewTimesheet1: function() {
        this.loadData(this.afterLoadDataHandler);
    },
    renderTable: function() {
        var data = this.dayCounter;
        for ( let i = 0; i < data; i++ ){
            let obj = {
                "OrderNumber":  data,
            }
            this.days.push(obj);     
        }
        this.loadData(this.afterLoadDataHandler);
    },
    afterLoadDataHandler: function(data) {
        this.messageService.publish( { name: 'reloadTimeCounter'});
        if(data.length) {
            this.messageService.publish({ name: 'disabledCreateBtn', value: true });
        } else {
            this.messageService.publish({ name: 'disabledCreateBtn', value: false });
        }
        this.render();
    },
    destroy: function() {
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
        this.sub3.unsubscribe();
    },
};
}());
