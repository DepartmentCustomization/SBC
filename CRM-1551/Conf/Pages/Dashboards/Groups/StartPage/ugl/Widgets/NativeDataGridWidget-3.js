(function () {
    return {
        config: {
            query: {
                code: 'DepartmentUGL_Doopr_Roz_Vykon_Prostr_NemMozh',
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
                    fixed: true,
                }, {
                    dataField: 'QuestionType',
                    caption: 'Тип питання',
                    fixed: true,
                }, {
                    dataField: 'zayavnykName',
                    caption: 'Заявник',
                    fixed: true,
                }, {
                    dataField: 'adress',
                    caption: 'Місце проблеми',
                    fixed: true,
                }, {
                    dataField: 'OrganizationsName',
                    caption: 'Виконавець',
                    fixed: true,
                }, {
                    dataField: 'control_date',
                    caption: 'Дата контролю',
                    fixed: true,
                    sortOrder: 'desc',
                    dataType: 'datetime',
                    format: 'dd.MM.yyyy HH:mm'
                }
            ],
            searchPanel: {
                visible: false,
                highlightCaseSensitive: true
            },
            masterDetail: {
                enabled: true,
            },
            filterRow: {
                visible: true,
                applyFilter: 'auto'
            },
            export: {
                enabled: false,
                fileName: 'Excel'
            },
            pager: {
                showPageSizeSelector:  true,
                allowedPageSizes: [10, 50, 100, 500],
                showInfo: true,
            },
            paging: {
                pageSize: 500
            },
            scrolling: {
                mode: 'standart',
                rowRenderingMode: null,
                columnRenderingMode: null,
                showScrollbar: null
            },
            selection: {
                mode: 'multiple'
            },
            sorting: {
                mode: 'multiple'
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
            groupingAutoExpandAll: null,
        },
        init: function() {
            this.dataGridInstance.height = window.innerHeight - 305;
            this.showPreloader = false;
            document.getElementById('table8_prosctoch').style.display = 'none';
            this.sub = this.messageService.subscribe('clickOnСoordinator_table', this.changeOnTable, this);
            this.config.masterDetail.template = this.craeteMasterDetail.bind(this);
            this.dataGridInstance.onCellClick.subscribe(e => {
                if(e.column) {
                    if(e.column.dataField === 'registration_number' && e.row !== undefined){
                        window.open(location.origin + localStorage.getItem('VirtualPath') + '/sections/Assignments/edit/'+e.key+'');
                    }
                }
            });
        },
        changeOnTable: function(message){
            if( message.column != 'Прострочені' ){
                document.getElementById('table8_prosctoch').style.display = 'none';
            }else{
                this.navigation = message.value;
                this.column = message.column;
                this.targetId = message.targetId;
                document.getElementById('table8_prosctoch').style.display = 'block';
                this.config.query.parameterValues = [
                    { key: '@navigation', value: message.value},
                    { key: '@column', value: message.column}
                ];
                this.loadData(this.afterLoadDataHandler);
            }
        },
        afterLoadDataHandler: function() {
            this.render();
            this.createCustomStyle();
        },
        createCustomStyle: function(){
            let elements = document.querySelectorAll('.dx-datagrid-export-button');
            elements = Array.from(elements);
            elements.forEach( function(element){
                let spanElement = this.createElement('span', { className: 'dx-button-text', innerText: 'Excel'});
                element.firstElementChild.appendChild(spanElement);
            }.bind(this));
        },
        craeteMasterDetail: function(container, options) {
            let currentEmployeeData = options.data;
            if(currentEmployeeData.short_answer == null){
                currentEmployeeData.short_answer = '';
            }
            if(currentEmployeeData.adressZ == null){
                currentEmployeeData.adressZ = '';
            }
            if(currentEmployeeData.question_content == null){
                currentEmployeeData.question_content = '';
            }
            let elementAdress__content = this.createElement('div', { className: 'elementAdress__content content', innerText: ''+currentEmployeeData.adressZ+''});
            let elementAdress__caption = this.createElement('div', { className: 'elementAdress__caption caption', innerText: 'Адреса заявника'});
            let elementAdress = this.createElement('div', { className: 'elementAdress element'}, elementAdress__caption, elementAdress__content);
            let elementСontent__content = this.createElement('div', { className: 'elementСontent__content content', innerText: ''+currentEmployeeData.question_content+''});
            let elementСontent__caption = this.createElement('div', { className: 'elementСontent__caption caption', innerText: 'Зміст'});
            let elementСontent = this.createElement('div', { className: 'elementСontent element'}, elementСontent__caption, elementСontent__content);
            let elementComment__content = this.createElement('div', { className: 'elementComment__content content', innerText: ''+currentEmployeeData.short_answer+''});
            let elementComment__caption = this.createElement('div', { className: 'elementComment__caption caption', innerText: 'Коментар виконавця'});
            let elementComment = this.createElement('div', { className: 'elementСontent element'}, elementComment__caption, elementComment__content);
            let elementsWrapper = this.createElement('div', { className: 'elementsWrapper'}, elementAdress, elementСontent, elementComment);
            container.appendChild(elementsWrapper);
            let elementsAll = document.querySelectorAll('.element');
            elementsAll = Array.from(elementsAll);
            elementsAll.forEach( el => {
                el.style.display = 'flex';
                el.style.margin = '15px 10px';
            })
            let elementsCaptionAll = document.querySelectorAll('.caption');
            elementsCaptionAll = Array.from(elementsCaptionAll);
            elementsCaptionAll.forEach( el => {
                el.style.minWidth = '200px';
            })
        },
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach( key => element[key] = props[key] );
            if(children.length > 0){
                children.forEach( child =>{
                    element.appendChild(child);
                });
            } return element;
        },
        destroy: function() {
            this.sub.unsubscribe();
        }
    };
}());
