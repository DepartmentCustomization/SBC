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
            keyExpr: 'Id',
            export: {
                enabled: true,
                fileName: 'Зияви'
            },
            allowColumnResizing: true,
            columnAutoWidth: true,
            hoverStateEnabled: true,
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [10, 20, 50]
            },
            paging: {
                pageSize: 10
            },
            sorting: {
                mode: 'multiple'
            },
            showBorders: false,
            showColumnLines: false,
            showRowLines: true
        },
        init: function() {
            const phoneNumber = this.getUrlParams();
            this.executeExecutorApplicantsQuery(phoneNumber);
            this.config.onToolbarPreparing = this.createDGButtons.bind(this);
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
            let rowsMessage = [];
            const selectedRows = this.dataGridInstance.instance.getSelectedRowsData();
            if(selectedRows.length > 0) {
                selectedRows.forEach(row => {
                    let obj = {
                        id: row.Id,
                        organization_id: row.Organizations_Id
                    }
                    rowsMessage.push(obj);
                });
                this.messageService.publish({ name: 'openModalForm', value: rowsMessage });
            }
        },
        afterLoadDataHandler: function() {
            this.render();
        }
        /*
            h_JA_ResultsSRows
            h_JA_ResolutionsSRows
            h_JA_Button
        */
    };
}());
