(function() {
    return {
        config: {
            query: {
                code: 'report_Select_of_current_Claims',
                parameterValues: [{key: '@date_from', value: ''},
                    {key: '@date_to', value: ''}],
                filterColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 100
            },
            columns: [
                {
                    caption: 'Виконавець',
                    dataField: 'organization_name',
                    groupIndex: 2
                },{
                    caption: 'Номер заявки',
                    dataField: 'Claim_Number',
                    groupIndex: 1
                },{
                    caption: 'Адреса',
                    dataField: 'places_name',
                    groupIndex: 3
                },{
                    caption: 'Номер виїзду',
                    dataField: 'order_number',
                    groupIndex: 4
                },{
                    caption: 'Роботи',
                    dataField: 'action_name'
                },{
                    caption: 'Бригада',
                    dataField: 'shifts_name'
                },{
                    caption: 'Дата виїзду',
                    dataField: 'Pushed_at'
                }
            ],
            // summary: [
            //     {
            //         column:'Column code',
            //         summaryType: null,
            //         valueFormat: null,
            //         alignByColumn: null,
            //         displayFormat: null,
            //         showInColumn: null,
            //         precision: null,
            //         customizeText: function(data) {}
            //     }
            // ],
            // groupSummary: [
            //     {
            //         column:'Column code',
            //         summaryType: null,
            //         valueFormat: null,
            //         alignByColumn: null,
            //         displayFormat: null,
            //         showInColumn: null,
            //         precision: null,
            //         showInGroupFooter: true
            //     }
            // ],
            export: {
                enabled: true,
                fileName: 'File_name'
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [10, 15, 30],
                showInfo: true,
                pageSize: 15
            },
            scrolling: {
                mode: 'virtual'/*,
            rowRenderingMode: "virtual",
            columnRenderingMode = "virtual",
            showScrollbar = null*/
            },
            searchPanel: {
                visible: true,
                highlightCaseSensitive: true
            },
            editing: {
                mode: 'row',
                allowUpdating: false,
                allowDeleting: false,
                allowAdding: false,
                useIcons: false
            },
            height: '800',
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
            showHeaderFilter: true,
            showColumnChooser: true,
            showColumnFixing: true,
            sortingMode: 'multiple',
            groupingAutoExpandAll: null,
            onRowUpdating: function(data) {},
            onRowExpanding: function(data) {},
            onRowInserting: function(data) {},
            onRowRemoving: function(data) {},
            onCellClick: function(data) {},
            onRowClick: function(data) {}
        },
        sub1: {},
        init: function() {
            this.sub1 = this.messageService.subscribe('GlobalFilterChanged', this.executeSql, this);
        },
        executeSql: function(message) {
        // debugger
        //console.log(message);
            function checkDateFrom(val) {
                return val ? val.dateFrom : null;
            }
            function checkDateTo(val) {
                return val ? val.dateTo : null;
            }
            function checkClasses(val) {
                let valuesList = [];
    	    if (val.length > 0) {
    	        for (let i = 0; i < val.length; i++) {
    	            valuesList.push(val[i].value);
    	        }
    	    }
    	    console.log('selected values:' + valuesList);
    	    return valuesList.length > 0 ? valuesList : [''];
            }
            function checkStatus(val) {
                let valuesList = [];
    	    if (val.length > 0) {
    	        for (let i = 0; i < val.length; i++) {
    	            valuesList.push(val[i].value);
    	        }
    	    }
    	    console.log('selected values:' + valuesList);
    	    return valuesList.length > 0 ? valuesList : [''];
            }
            this.config.query.queryCode = 'report_Select_of_current_Claims';
            this.config.query.parameterValues = [
                {
                    key:'@date_from',
                    value: checkDateFrom(message.package.value.values[0].value)
                },
                {
                    key: '@date_to' ,
                    value: checkDateTo(message.package.value.values[0].value)
                }
            ];
            this.config.query.filterColumns = [{
                key: 'Claim_class_ID',
                value: {
                    // operation: 6,
                    // not: false,
                    values: checkClasses(message.package.value.values[1].value)
                }
            },
            {
                key: 'Status_ID',
                value:{
                    values: checkStatus(message.package.value.values[2].value)
                }
            }
            ];
            // debugger
            //  this.component.dataGridInstance.getDataSource().items()
            this.loadData();
        },
        load: function() {
        },
        destroy: function() {
            this.sub1.unsubscribe();
        }
    };
}());
