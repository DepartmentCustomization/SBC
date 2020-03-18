(function() {
    return {
        config: {
            query: {
            //queryCode: 'Query_Reestr',
                code: 'Query_Reestr',
                parameterValues: [{
                    key:'@date_from',
                    value: ''
                },
                {
                    key: '@date_to' ,
                    value: ''
                }],
                filterColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 100
            },
            columns: [
                {
                    caption: '№',
                    dataField: 'rnk_dense',
                    groupIndex: null,
                    dataType: null,
                    format: null
                },{
                    caption: 'Заявка №',
                    dataField: 'Claim_Number',
                    groupIndex: 1
                },{
                    caption: 'Адреса/Місце пошкодження',
                    dataField: 'places_name',
                    groupIndex: null
                },{
                    caption: 'Район',
                    dataField: 'districts_name',
                    groupIndex: null
                },{
                    caption: 'Виконацець',
                    dataField: 'organization_name',
                    groupIndex: null
                },{
                    caption: 'Дата створення',
                    dataField: 'Created_at',
                    groupIndex: null,
                    dataType: 'datetime',
                    format: 'dd.MM.yyyy HH:mm:ss'
                },{
                    caption: 'Дата закриття',
                    dataField: 'Fact_finish_at',
                    groupIndex: null,
                    dataType: 'datetime',
                    format: 'dd.MM.yyyy HH:mm:ss'
                },{
                    caption: 'Діаметр',
                    dataField: 'Size',
                    groupIndex: null
                },{
                    caption: 'Тип заявки',
                    dataField: 'Full_Name',
                    groupIndex: null
                },{
                    caption: 'Клас заявки',
                    dataField: 'classes_name',
                    groupIndex: null
                },{
                    caption: 'Перелік робіт',
                    dataField: 'action_name',
                    groupIndex: null
                },{
                    caption: 'Час виконання робіт',
                    dataField: 'Start_from',
                    groupIndex: null,
                    dataType: 'datetime',
                    format: 'dd.MM.yyyy HH:mm:ss'
                },{
                    caption: 'Техніка',
                    dataField: 'MechanismsName',
                    groupIndex: null
                },{
                    caption: 'Матеріали',
                    dataField: 'MaterialsName',
                    groupIndex: null
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
                fileName: 'Рееєстр заявок'
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
            keyExpr: 'Claim_Number',
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
            onRowClick: function(data) {
                //   if (e.column.caption == "Додати до проекту") {
                //       if (e.data.Base == "ЦРМ") {
                //                               this.self_param[0].insert_person(e.key.PersonId);
                //                                 }
                //       else
                //           {
                //               this.self_param[0].insert_person_outbase(e.key.Surname, e.key.First, e.key.Middle, e.key.Sex, e.key.BirthDate, e.key.ObjectId, e.key.MobValue, e.key.DomValue, e.key.MailValue);
                //           }
                //   }
                window.open(location.origin + localStorage.getItem('VirtualPath') + '/sections/Claims/edit/' + data.key, '_blank');
            }
        },
        subscriptions: [],
        start_date: '',
        finish_date: '',
        val_chance_filter_Status: [],
        val_chance_filter_Places: [],
        val_chance_filter_Streets: [],
        val_chance_filter_Districts: [],
        val_chance_filter_Claim_classes: [],
        val_chance_filter_Claim_types: [],
        val_chance_filter_Contacts: [],
        val_chance_filter_Description: [],
        val_chance_filter_Diameters: [],
        init: function() {
        // this.messageService.subscribe('GlobalFilterChanged', this.executeSql, this);
            this.loadData();
            this.config.groupingAutoExpandAll = true;
            let sub0 = this.messageService.subscribe('GlobalFilterChanged', this.GlobalFilterChanged_funk, this);
            this.subscriptions.push(sub0);
            /*
        var sub1 = this.messageService.subscribe('chance_filter_DateCreated', this.chance_filter_DateCreated, this);
        this.subscriptions.push(sub1);
        var sub2 = this.messageService.subscribe('chance_filter_Status', this.chance_filter_Status, this);
        this.subscriptions.push(sub2);
        var sub3 = this.messageService.subscribe('chance_filter_Places', this.chance_filter_Places, this);
        this.subscriptions.push(sub3);
        var sub4 = this.messageService.subscribe('chance_filter_Streets', this.chance_filter_Streets, this);
        this.subscriptions.push(sub4);
        var sub5 = this.messageService.subscribe('chance_filter_Districts', this.chance_filter_Districts, this);
        this.subscriptions.push(sub5);
        var sub6 = this.messageService.subscribe('chance_filter_Claim_classes', this.chance_filter_Claim_classes, this);
        this.subscriptions.push(sub6);
        var sub7 = this.messageService.subscribe('chance_filter_Claim_types', this.chance_filter_Claim_types, this);
        this.subscriptions.push(sub7);
        var sub8 = this.messageService.subscribe('chance_filter_Contacts', this.chance_filter_Contacts, this);
        this.subscriptions.push(sub8);
        var sub9 = this.messageService.subscribe('chance_filter_Description', this.chance_filter_Description, this);
        this.subscriptions.push(sub9);
        var sub10 = this.messageService.subscribe('chance_filter_Diameters', this.chance_filter_Diameters, this);
        this.subscriptions.push(sub10);
        */
            let sub11 = this.messageService.subscribe('LoadData', this.LoadData_funk, this);
            this.subscriptions.push(sub11);
            let sub12 = this.messageService.subscribe('ExportToExcel', this.exportToExcel, this);
            this.subscriptions.push(sub12);
        },
        GlobalFilterChanged_funk: function(message) {
            function checkDateFrom(val) {
                return val ? val.dateFrom : null;
            }
            function checkDateTo(val) {
                return val ? val.dateTo : null;
            }
            this.start_date = checkDateFrom(message.package.value.values[0].value);
            this.finish_date = checkDateTo(message.package.value.values[0].value);
            if (this.start_date == '' || this.finish_date == '') {
    	    document.getElementById('btn1').disabled = true;
    	    document.getElementById('btn1').classList.add('disabled_btn');
    	    document.getElementById('btn2').disabled = true;
    	    document.getElementById('btn2').classList.add('disabled_btn');
    	} else {
    	   document.getElementById('btn1').disabled = false;
    	   document.getElementById('btn1').classList.remove('disabled_btn');
    	   document.getElementById('btn2').disabled = true;
    	   document.getElementById('btn2').classList.add('disabled_btn');
    	}
            this.val_chance_filter_Status = this.checkValueMultiList(message.package.value.values[1].value);
            this.val_chance_filter_Places = this.checkValueMultiList(message.package.value.values[2].value);
            this.val_chance_filter_Streets = this.checkValueMultiList(message.package.value.values[3].value);
            this.val_chance_filter_Districts = this.checkValueMultiList(message.package.value.values[4].value);
            this.val_chance_filter_Claim_classes = this.checkValueMultiList(message.package.value.values[5].value);
            //  this.val_chance_filter_Claim_types = this.checkValueMultiList(message.package.value.values[6].value);
            this.val_chance_filter_Claim_types = message.package.value.values[6].value.viewValue;
            if (this.val_chance_filter_Claim_types == undefined) {
                this.val_chance_filter_Claim_types = ''
            }
            this.val_chance_filter_Contacts = this.checkValueMultiList(message.package.value.values[7].value);
            let val = '';
            if (message.package.value.values[8].value == '') {
                val = '%'
            } else {
                val = message.package.value.values[8].value;
            }
            let valuesList = [];
            valuesList.push(val);
            this.val_chance_filter_Description = valuesList;
            this.val_chance_filter_Diameters = this.checkValueMultiList(message.package.value.values[9].value);
        },
        chance_filter_DateCreated: function(message) {
        /*
       function checkDateFrom(val){
            return val ? val.dateFrom : null;
        };
        function checkDateTo(val){
            return val ? val.dateTo : null;
        };
        this.start_date = checkDateFrom(message.value);
        this.finish_date = checkDateTo(message.value);
         if (this.start_date == "" || this.finish_date == "") {
    	    document.getElementById('btn1').disabled = true;
    	    document.getElementById('btn1').classList.add("disabled_btn");
    	    document.getElementById('btn2').disabled = true;
    	    document.getElementById('btn2').classList.add("disabled_btn");
    	} else {
    	   document.getElementById('btn1').disabled = false;
    	   document.getElementById('btn1').classList.remove("disabled_btn");
    	   document.getElementById('btn2').disabled = true;
    	   document.getElementById('btn2').classList.add("disabled_btn");
    	}; */
        },
        checkValueMultiList: function(val) {
            let valuesList = [];
    	    if (val.length > 0) {
    	        for (let i = 0; i < val.length; i++) {
    	            valuesList.push(val[i].value);
    	        }
    	    }
    	    console.log('selected values:' + valuesList);
    	    return valuesList.length > 0 ? valuesList : [];
        },
        chance_filter_Status: function(message) {
        //this.val_chance_filter_Status = this.checkValueMultiList(message.value);
        },
        chance_filter_Places: function(message) {
        // this.val_chance_filter_Places = this.checkValueMultiList(message.value);
        },
        chance_filter_Streets: function(message) {
        // this.val_chance_filter_Streets = this.checkValueMultiList(message.value);
        },
        chance_filter_Districts: function(message) {
        // this.val_chance_filter_Districts = this.checkValueMultiList(message.value);
        },
        chance_filter_Claim_classes: function(message) {
        // this.val_chance_filter_Claim_classes = this.checkValueMultiList(message.value);
        },
        chance_filter_Claim_types: function(message) {
            //this.val_chance_filter_Claim_types = this.checkValueMultiList(message.value);
        },
        chance_filter_Contacts: function(message) {
        // this.val_chance_filter_Contacts = this.checkValueMultiList(message.value);
        },
        chance_filter_Description: function(message) {
        /*
        let val = "";
        if (message.value == "") {val = "%"} else {val = message.value;};
        let valuesList = [];
         valuesList.push(val);
        //  valuesList.length > 0 ? valuesList : [""];
         this.val_chance_filter_Description = valuesList;
         */
        },
        chance_filter_Diameters: function(message) {
            //this.val_chance_filter_Diameters = this.checkValueMultiList(message.value);
        },
        LoadData_funk: function(message) {
            this.config.query.code = 'Query_Reestr';
            this.config.query.parameterValues = [{
                key:'@date_from',
                value: this.start_date
            },
            {
                key: '@date_to' ,
                value: this.finish_date
            },
            {
                key: '@filter_Claim_types' ,
                value: this.val_chance_filter_Claim_types
            }];
            this.setFilterValues('Filter_Status_ID', this.val_chance_filter_Status, 0, true);
            this.setFilterValues('Filter_Place_ID', this.val_chance_filter_Places, 0);
            this.setFilterValues('Filter_Street_Id', this.val_chance_filter_Streets, 0);
            this.setFilterValues('Filter_Districts_Id', this.val_chance_filter_Districts, 0);
            this.setFilterValues('Filter_Claim_class_Id', this.val_chance_filter_Claim_classes, 0);
            // this.setFilterValues('Filter_Claim_type_ID', this.val_chance_filter_Claim_types, 0);
            this.setFilterValues('Filter_Contacts_ID', this.val_chance_filter_Contacts, 0);
            this.setFilterValues('Filter_Description', this.val_chance_filter_Description, 6);
            this.setFilterValues('Filter_Diameters_ID', this.val_chance_filter_Diameters, 0);
            // debugger
            this.loadData();
            document.getElementById('btn2').disabled = false;
    	   document.getElementById('btn2').classList.remove('disabled_btn');
        },
        setFilterValues: function(code, value, operation, clearState) {
            if (clearState) {
                this.config.query.filterColumns = [];
            }
            if (value.length > 0) {
                const filter = {
                    key: code,
                    value: {
                        operation: operation,
                        not: false,
                        values: value
                    }
                };
                this.config.query.filterColumns.push(filter);
            }
        },
        exportToExcel: function(message) {
        //debugger;
        },
        executeSql: function(message) {
            this.config.query.queryCode = 'Q1';
            this.config.query.parameterValues = [];
            this.config.query.filterColumns = [];
            this.loadData();
        },
        load: function() {
        },
        unsubscribeFromMessages() {
            for(let i = 0; i < this.subscriptions.length; i++) {
                this.subscriptions[i].unsubscribe();
            }
        },
        destroy() {
            this.unsubscribeFromMessages();
        }
    };
}());
