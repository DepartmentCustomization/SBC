(function() {
    return {
        config: {
            query: {
                code: 'kp_blag_Report2',
                parameterValues: [
                ],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'exec_name',
                    caption: '',
                    width: 250
                },
                {
                    dataField: 'count_all',
                    caption: 'Надійшло',
                    alignment: 'center'
                },
                {
                    caption: 'По статусах',
                    alignment: 'center',
                    columns: [
                        {
                            dataField: 'count_registered',
                            caption: 'Зареєстровано',
                            alignment: 'center'
                        },
                        {
                            dataField: 'count_in_work',
                            caption: 'В роботі',
                            alignment: 'center'
                        },
                        {
                            dataField: 'count_on_inspection',
                            caption: 'На перевірці',
                            alignment: 'center'
                        },
                        {
                            dataField: 'count_closed_performed',
                            caption: 'Закрито/Виконано ',
                            alignment: 'center'
                        },
                        {
                            dataField: 'count_closed_clear',
                            caption: 'Закрито/Роз\'яснено',
                            alignment: 'center'
                        },
                        {
                            dataField: 'count_for_completion',
                            caption: 'На доопрацювання',
                            alignment: 'center'
                        }
                    ]
                },
                {
                    dataField: 'count_built',
                    caption: 'Прострочено',
                    width: 150,
                    alignment: 'center'
                },
                {
                    dataField: 'count_not_processed_in_time',
                    caption: 'Не вчасно опрацьовано',
                    alignment: 'center'
                },
                {
                    caption: 'Показники',
                    alignment: 'center',
                    columns: [
                        {
                            dataField: 'speed_of_employment',
                            caption: 'Бистрота прийняття в роботу',
                            alignment: 'center'
                        },
                        {
                            dataField: 'timely_processed',
                            caption: '% вчасно опрацьованих',
                            alignment: 'center',
                            customizeText: function(data) {
                                if(data.value) {
                                    return `${data.value}%`;
                                }
                                return ''
                            }
                        },
                        {
                            dataField: 'implementation',
                            caption: '% виконання',
                            alignment: 'center',
                            customizeText: function(data) {
                                if(data.value) {
                                    return `${data.value}%`;
                                }
                                return ''
                            }
                        },
                        {
                            dataField: 'reliability',
                            caption: '% достовірності',
                            alignment: 'center',
                            customizeText: function(data) {
                                if(data.value) {
                                    return `${data.value}%`;
                                }
                                return ''
                            }
                        }
                    ]
                }
            ],
            export: {
                enabled: true,
                fileName: 'Благоустрій доручення'
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [15, 30 , 50],
                showInfo: true
            },
            paging: {
                pageSize: 15
            },
            keyExpr: 'Id',
            showBorders: false,
            showColumnLines: false,
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
            groupingAutoExpandAll: null
        },
        containerId: 'assignments',
        init: function() {
            this.dataGridInstance.height = window.innerHeight - 80;
            this.setContainerVisibility('none');
            this.sub = this.messageService.subscribe('showSubTable', this.showSubTable, this);
        },
        addTableButton: function(e) {
            let toolbarItems = e.toolbarOptions.items;
            toolbarItems.push({
                widget: 'dxButton',
                location: 'after',
                options: {
                    icon: 'hidepanel',
                    type: 'default',
                    text: 'Закрити таблицю',
                    onClick: function() {
                        this.sendMessageVisibility('none');
                    }.bind(this)
                }
            });
        },
        showSubTable: function(message) {
            this.setContainerVisibility('block');
            const cssText = document.getElementById(this.containerId).parentElement.parentElement.parentElement.style.cssText;
            document.getElementById(this.containerId)
                .parentElement.parentElement.parentElement.style.cssText = cssText + ' height: auto!important;';
            document.getElementById(this.containerId).scrollIntoView();
            this.config.columns[0].caption = message.sectorName;
            this.config.query.parameterValues = [
                {key: '@sector_id', value: message.sectorId},
                {key: '@date_to', value: message.dateTo},
                {key: '@date_from', value: message.dateFrom}
            ]
            this.loadData(this.afterLoadDataHandler);
        },
        setContainerVisibility: function(state) {
            document.getElementById(this.containerId).style.display = state;
        },
        afterLoadDataHandler: function() {
            this.render();
        },
        destroy: function() {
            this.sub.unsubscribe();
        }
    };
}());
