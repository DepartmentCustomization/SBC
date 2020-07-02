(function() {
    return {
        config: {
            query: {
                code: 'h_JA_MainTable',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'Registration_Number',
                    caption: 'Номер'
                },
                {
                    dataField: 'Registration_date',
                    caption: 'Дата реєстації'
                },
                {
                    dataField: 'AssignmentState',
                    caption: 'Стан'
                },
                {
                    dataField: 'QuestionType',
                    caption: 'Тип питання'
                },
                {
                    dataField: 'Place_Problem',
                    caption: 'Місце проблеми'
                },
                {
                    dataField: 'Control_Date',
                    caption: 'Дата контролю'
                },
                {
                    dataField: 'Positions_Name',
                    caption: 'Виконавець'
                },
                {
                    dataField: 'Comment',
                    caption: 'Коментар'
                }
            ],
            masterDetail: {
                enabled: true
            },
            selection: {
                mode: 'multiple'
            },
            keyExpr: 'Id',
            allowColumnResizing: true,
            columnAutoWidth: false,
            hoverStateEnabled: true,
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [10, 20, 50]
            },
            paging: {
                pageSize: 10
            },
            showBorders: false,
            showColumnLines: false,
            showRowLines: true
        },
        init: function() {
            const phoneNumber = this.getUrlParams();
            this.executeExecutorApplicantsQuery(phoneNumber);
            this.config.masterDetail.template = this.createMasterDetail.bind(this);
            this.config.onToolbarPreparing = this.createDGButtons.bind(this);
            this.subscribers.push(this.messageService.subscribe('reloadMainTable', this.reloadMainTable, this));
        },
        getUrlParams: function() {
            const getUrlParams = window
                .location
                .search
                .replace('?', '')
                .split('&')
                .reduce(function(p, e) {
                    let a = e.split('=');
                    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                    return p;
                }, {}
                );
            const phoneNumber = getUrlParams.phoneNumber;
            return phoneNumber;
        },
        executeExecutorApplicantsQuery: function(phoneNumber) {
            this.config.query.parameterValues = [ {key: '@phone_nunber', value: phoneNumber} ];
            this.loadData(this.afterLoadDataHandler);
        },
        createDGButtons: function(e) {
            let toolbarItems = e.toolbarOptions.items;
            toolbarItems.push({
                widget: 'dxButton',
                options: {
                    icon: 'exportxlsx',
                    type: 'default',
                    text: 'Excel',
                    onClick: function(e) {
                        e.event.stopImmediatePropagation();
                        this.exportToExcel();
                    }.bind(this)
                },
                location: 'after'
            });
            toolbarItems.push({
                widget: 'dxButton',
                options: {
                    icon: 'close',
                    type: 'default',
                    text: 'Опрацьовано',
                    onClick: function(e) {
                        e.event.stopImmediatePropagation();
                        this.openModalCloserForm();
                    }.bind(this)
                },
                location: 'after'
            });
        },
        openModalCloserForm: function() {
            let rows = [];
            const selectedRows = this.dataGridInstance.instance.getSelectedRowsData();
            if(selectedRows.length > 0) {
                selectedRows.forEach(row => rows.push(row.Id));
                const value = rows.join(', ');
                this.messageService.publish({ name: 'openModalForm', id: value });
            }
        },
        createMasterDetail: function(container, options) {
            const currentEmployeeData = options.data;
            const name = 'createMasterDetail';
            const fields = {
                Applicant_Name: 'Заявник',
                ApplicantAdress: 'Адреса заявника',
                Content: 'Зміст'
            };
            this.messageService.publish({
                name, currentEmployeeData, fields, container
            });
        },
        reloadMainTable: function() {
            this.dataGridInstance.instance.deselectAll();
            this.loadData(this.afterLoadDataHandler);
        },
        afterLoadDataHandler: function() {
            this.render();
        }
    };
}());
