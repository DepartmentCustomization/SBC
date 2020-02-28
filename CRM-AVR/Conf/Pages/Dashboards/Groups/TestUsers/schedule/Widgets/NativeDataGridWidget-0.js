(function () {
  return {
    config: {
        query: {
            code: 'employee_table',
            parameterValues: [  ],
            filterColumns: [],
            sortColumns: [],
            skipNotVisibleColumns: true,
            chunkSize: 1000
        },
        columns: [
            {
                dataField: 'Name',
                caption: "Ім'я співробітника",
            }, {
                dataField: 'Job_name',
                caption: "Посада",
            }
            
        ],
        loadPanel: {
            enabled: true
        },
        scrolling: {
            mode: "virtual"
        },
        height: 590,
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
        showColumnFixing: true,
        groupingAutoExpandAll: null,         
        
    },
    init: function() {
        this.messageService.subscribe( 'sendOrganizationId', this.setOrgId, this);
        this.dataGridInstance.onCellClick.subscribe(e => {
            if(e.column.dataField === "Name" && e.row !== undefined){
                this.messageService.publish({
                    name: 'sendEmployeeName',
                    employee_id: e.data.Id,
                    employee_name: e.data.Name
                });
            }
        });
    },
    setOrgId: function(message){
        this.organization_id = message.org_id;
        this.config.query.parameterValues = [
            {key: '@organization_id', value: this.organization_id}
        ];
        this.loadData(this.afterLoadDataHandler);
    },
    afterLoadDataHandler: function(data) {
        this.render();
    },
};
}());
