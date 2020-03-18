(function() {
    return {
        formatTitle: function() {
            const date = new Date();
            return '<h3 style="text-align: center; color: blue; padding: 10px 0; "> Поточний стан заявок, сформований ' + date.toLocaleString() + '</h3>'
        },
        config: {
            query: {
                code: 'reports_current_status_claims',
                parameterValues: [{key: '@date_from', value: ''},
                    {key: '@date_to', value: ''}],
                filterColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 100
            },
            columns: [
                {
                    caption: 'Назва організації',
                    dataField: 'org_name'
                },{
                    caption: 'Дата створення',
                    dataField: 'Created_at'
                },{
                    caption: '№ заявки',
                    dataField: 'Claim_Number'
                },{
                    caption: 'Місце',
                    dataField: 'place_name'
                },{
                    caption: 'Район',
                    dataField: 'district'
                },{
                    caption: 'Тип заявки',
                    dataField: 'Full_Name'
                },{
                    caption: 'Діаметр',
                    dataField: 'Size'
                },{
                    caption: 'Виїзди',
                    dataField: 'orders'
                },{
                    caption: 'Опис',
                    dataField: 'Description'
                },{
                    caption: 'Роботи',
                    dataField: 'actions'
                }
                // ,{
                //     caption: 'Claim_class_ID',
                //     dataField: 'Claim_class_ID',
                // },{
                //     caption: 'Status_ID',
                //     dataField: 'Status_ID'
                // }
            ],
            export: {
                enabled: true,
                fileName: 'Reports'
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [10, 15, 30],
                showInfo: true,
                pageSize: 15
            },
            scrolling: {
                mode: 'virtual'
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
            // keyExpr: 'Id',
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
            this.sub1 = this.messageService.subscribe('GlobalFilterChanged', this.querySQL, this);
        },
        querySQL: function(message) {
            debugger
            console.log(message);
            function claimsTypeStatus(val) {
                let valList = [];
                if(val.length > 0) {
                    for(let i = 0; i < val.length; i++) {
                        valList.push(val[i].value)
                    }
                }
                console.log('Selected value : ' + valList);
                return valList.length > 0 ? valList : [''];
            }
            this.config.query.queryCode = 'reports_current_status_claims';
            this.config.query.parameterValues = [
                {
                    key:'@date_from',
                    value: message.package.value.values[0].value.dateFrom
                },
                {
                    key: '@date_to' ,
                    value: message.package.value.values[0].value.dateTo
                }
            ];
            this.config.query.filterColumns = [
                {
                    key: 'Claim_class_ID',
                    value: {values: claimsTypeStatus(message.package.value.values[1].value)}
                },
                {
                    key: 'Status_ID',
                    value:{values:  claimsTypeStatus(message.package.value.values[2].value)}
                }
            ];
            this.loadData();
        },
        load:function(data) {
            console.log(data);
        },
        destroy: function() {
            this.sub1.unsubscribe();
        }
    };
}());
