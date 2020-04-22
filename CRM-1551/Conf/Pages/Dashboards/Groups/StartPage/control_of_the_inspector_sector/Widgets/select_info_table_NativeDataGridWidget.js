(function() {
    return {
        config: {
            query: {
                code: 'Poshuk',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'registration_number',
                    caption: 'Номер питання',
                    sortOrder: 'asc',
                    width: 150
                }, {
                    dataField: 'navigation',
                    caption: 'Джерело надходження'
                }, {
                    dataField: 'QuestionType',
                    caption: 'Тип питання'
                }, {
                    dataField: 'zayavnyk',
                    caption: 'Заявник'
                }, {
                    dataField: 'adress',
                    caption: 'Місце проблеми'
                }, {
                    dataField: 'control_date',
                    caption: 'Дата контролю'
                }
            ],
            filterRow: {
                visible: true,
                applyFilter: 'auto'
            },
            export: {
                enabled: false,
                fileName: 'Пошук__'
            },
            searchPanel: {
                visible: false,
                highlightCaseSensitive: true
            },
            pager: {
                showPageSizeSelector:  true,
                allowedPageSizes: [10, 15, 30],
                showInfo: true
            },
            paging: {
                pageSize: 10
            },
            editing: {
                enabled: false
            },
            scrolling: {
                mode: 'standart',
                rowRenderingMode: null,
                columnRenderingMode: null,
                showScrollbar: null
            },
            masterDetail: {
                enabled: true
            },
            keyExpr: 'Id',
            focusedRowEnabled: true,
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
        sub: [],
        sub1: [],
        init: function() {
            this.dataGridInstance.height = window.innerHeight - 300;
            document.getElementById('selectInfoTable').style.display = 'none';
            this.subscribers.push(this.messageService.subscribe('clickOnInfoTable', this.changeOnTable, this));
            this.config.masterDetail.template = this.createMasterDetail.bind(this);
        },
        changeOnTable: function() {
            /* document.getElementById('table5__NeVKompetentcii').style.display = 'block';
                this.config.query.queryCode = 'NeVKompetentsii';
                this.config.query.parameterValues = [{ key: '@organization_id', value: message.orgId},
                    { key: '@organizationName', value: message.orgName},
                    { key: '@navigation', value: message.navigation}];
                let executeQuery = {
                    queryCode: 'Lookup_NeVKompetencii_PidOrganization',
                    parameterValues: [ {key: '@organization_id', value: this.OrganizationId} ],
                    limit: -1
                };
                this.queryExecutor(executeQuery, this.lookupFoo, this);
            } */
        },
        createMasterDetail: function(container, options) {
            let currentEmployeeData = options.data;
            if(currentEmployeeData.balans_name === null || currentEmployeeData.balans_name === undefined) {
                currentEmployeeData.balans_name = '';
            }
            if(currentEmployeeData.question_content === null || currentEmployeeData.question_content === undefined) {
                currentEmployeeData.question_content = '';
            }
            if(currentEmployeeData.adressZ === null || currentEmployeeData.adressZ === undefined) {
                currentEmployeeData.adressZ = '';
            }
            let elementAdress__content = this.createElement('div',
                {
                    className: 'elementAdress__content content',
                    innerText: String(String(currentEmployeeData.adressZ))
                }
            );
            let elementAdress__caption = this.createElement('div',
                {
                    className: 'elementAdress__caption caption',
                    innerText: 'Адреса заявника'
                }
            );
            let elementAdress = this.createElement('div',
                {
                    className: 'elementAdress element'
                },
                elementAdress__caption, elementAdress__content
            );
            let elementСontent__content = this.createElement('div',
                {
                    className: 'elementСontent__content content',
                    innerText: String(String(currentEmployeeData.question_content))
                }
            );
            let elementСontent__caption = this.createElement('div',
                {
                    className: 'elementСontent__caption caption',
                    innerText: 'Зміст'
                }
            );
            let elementСontent = this.createElement('div',
                {
                    className: 'elementСontent element'
                },
                elementСontent__caption, elementСontent__content
            );
            let elementBalance__content = this.createElement('div',
                {
                    className: 'elementBalance__content content',
                    innerText: String(String(currentEmployeeData.balans_name))
                }
            );
            let elementBalance__caption = this.createElement('div',
                {
                    className: 'elementBalance__caption caption',
                    innerText: 'Балансоутримувач'
                }
            );
            let elementBalance = this.createElement('div',
                {
                    className: 'elementСontent element'
                },
                elementBalance__caption, elementBalance__content
            );
            let elementsWrapper = this.createElement('div',
                {
                    className: 'elementsWrapper'
                },
                elementAdress, elementСontent, elementBalance
            );
            container.appendChild(elementsWrapper);
            let elementsAll = document.querySelectorAll('.element');
            elementsAll = Array.from(elementsAll);
            elementsAll.forEach(el => {
                el.style.display = 'flex';
                el.style.margin = '15px 10px';
            })
            let elementsCaptionAll = document.querySelectorAll('.caption');
            elementsCaptionAll = Array.from(elementsCaptionAll);
            elementsCaptionAll.forEach(el => {
                el.style.minWidth = '200px';
            })
        }
    };
}());
