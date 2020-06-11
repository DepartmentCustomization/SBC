(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `
                        <div id = 'container'></div>
                    `
        ,
        isLoadDistrict: false,
        isLoadCategory: false,
        isDistrictFull: false,
        isCategoryFull: false,
        tabs: [
            {
                code: 'processing_appeals',
                titleText: 'ОБРОБКА ДОРУЧЕНЬ',
                hover: true
            }
        ],
        headers: [
            {
                name: 'arrived',
                id: 'headerItem__arrived',
                innerText: 'Надійшло',
                index: 0,
                backgroundColor: 'rgb(74, 193, 197)'
            },
            {
                name: 'in_work',
                id: 'headerItem__inWork',
                innerText: 'В роботі',
                index: 1,
                backgroundColor: 'rgb(132, 199, 96)'
            },
            {
                name: 'attention',
                id: 'headerItem__attention',
                innerText: 'Увага',
                index: 2,
                backgroundColor: 'rgb(211, 214, 13)'
            },
            {
                name: 'overdue',
                id: 'headerItem__overdue',
                innerText: 'Прострочені',
                index: 3,
                backgroundColor: 'rgb(240, 114, 93)'
            },
            {
                name: 'for_revision',
                id: 'headerItem__onRefinement',
                innerText: 'На доопрацювання',
                index: 4,
                backgroundColor: 'rgb(23, 202, 162)'
            },
            {
                name: 'future',
                id: 'headerItem__future',
                innerText: 'Майбутні',
                index: 5,
                backgroundColor: 'rgb(173, 118, 205)'
            },
            {
                name: 'without_executor',
                id: 'headerItem__withoutExecutor',
                innerText: 'Без виконавця',
                index: 6,
                backgroundColor:  'rgb(200, 97, 74)'
            }
        ],
        init: function() {
            this.subscribers.push(this.messageService.subscribe('reloadMainTable', this.reloadMainTable, this));
            this.messageService.publish({ name: 'showPagePreloader' });
            this.executeQueries();
        },
        executeQueries: function() {
            const status = 'new';
            const location = undefined;
            this.executeFilterName(status, location);
            this.executeFilterNamePriority(status, location);
            this.executeFilterDistrict();
            this.executeFilterQuestionTypes();
            /* this.executeFilterPriority(); */
        },
        executeFilterName: function(status, location) {
            const executeQueryFiltersDist = {
                queryCode: 'cc_FilterName',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQueryFiltersDist, this.setDistrictData.bind(this, status, location), this);
            this.showPreloader = false;
        },
        executeFilterNamePriority: function(status, location) {
            const executeQueryFiltersPriority = {
                queryCode: 'cc_FilterNameDepartment',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQueryFiltersPriority, this.setPriorityData.bind(this, status, location), this);
            this.showPreloader = false;
        },
        executeFilterDistrict: function() {
            /*
            let executeQueryDistinct = {
                queryCode: 'cc_FilterDistrict',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQueryDistinct, this.setDistrictCategories, this);
            this.showPreloader = false;
            */
        },
        executeFilterQuestionTypes: function() {
            /*
            let executeQueryCategories = {
                queryCode: 'cc_FilterQuestionTypes',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQueryCategories, this.setQuestionTypesCategories, this); 
            this.showPreloader = false;
            */
        },
        /* executeFilterPriority: function() {
            let executeQueryPriority = {
                queryCode: 'cc_FilterPriority',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQueryPriority, this.setPriorityCategories, this);
            this.showPreloader = false;
        },
        */
        afterViewInit: function() {
            this.container = document.getElementById('container');
            const tabsWrapper = this.createTabs();
            const filtersWrapper = this.createFiltersWrapper();
            const tableWrapper = this.createTableWrapper();
            const modalWindowContainer = this.createModalWindowContainer();
            this.container.appendChild(tabsWrapper);
            this.container.appendChild(filtersWrapper);
            this.container.appendChild(tableWrapper);
            this.container.appendChild(modalWindowContainer);

        },
        createTabs: function() {
            const tabsContainer = this.createElement('div',
                { id: 'tabsContainer', className: 'tabsContainer'}
            );
            const tabsWrapper = this.createElement('div', { id: 'tabsWrapper', className: 'tabsWrapper'}, tabsContainer);
            this.tabs.forEach(tab => {
                let itemTitle = this.createElement('div', { className: 'tab_title', innerText: tab.titleText });
                const item = this.createElement('div',
                    { id: tab.code, url: tab.code, className: 'tab' },
                    itemTitle
                );
                if (tab.hover) {
                    item.classList.add('tabHover');
                } else {
                    item.addEventListener('click', event => {
                        const target = event.currentTarget;
                        this.goToDashboard(target.url, { queryParams: { id: this.organizationId } });
                    });
                }
                tabsContainer.appendChild(item);
            });
            return tabsWrapper;
        },
        createFiltersWrapper: function() {
            const filtersInfo = this.createFiltersInfo();
            const buttonWrapper = this.createFilterButtonWrapper();
            const searchInput = this.createSearchInput();
            const filtersWrapper = this.createElement('div',
                { id: 'filtersWrapper', className: 'filtersWrapper'},
                filtersInfo, buttonWrapper, searchInput
            );
            return filtersWrapper;
        },
        createFiltersInfo: function() {
            this.filtersContainerPriority = this.createElement('div', {
                id: 'filtersContainerPriority',
                className: 'filtersContainer'
            });
            this.filtersContainerDistrict = this.createElement('div', {
                id: 'filtersContainerDistrict',
                className: 'filtersContainer'
            });
            const filtersInfo = this.createElement('div',
                { id: 'filtersInfo', className: 'filtersInfo'},
                this.filtersContainerPriority, this.filtersContainerDistrict
            );
            return filtersInfo;
        },
        createFilterButtonWrapper: function() {
            const district = this.createFilterEditItem('Район', 'district', this.districtData);
            const priority = this.createFilterEditItem('Пріоритет', 'priority', this.priorityData);
            const filterButtonWrapper = this.createElement('div',
                { id: 'filtersCaptionBox' },
                district, priority
            );
            return filterButtonWrapper;
        },
        createFilterEditItem: function(title, location, data) {
            const filterEdit__title = this.createElement('div', {
                className: 'filterEdi__title',
                innerText: title
            });
            const filterEdit__icon = this.createElement('div', {
                className: 'material-icons filterEdit__icon',
                innerText: 'add_circle_outline'
            });
            const filterAddWrap = this.createElement('div',
                {
                    className: 'filterWrap displayFlex'
                }, filterEdit__icon, filterEdit__title
            );
            filterAddWrap.addEventListener('click', () => {
                if(!this.modalWindowContainer.classList.contains('modalWindowShowClass')) {
                    this.createModalForm(this.modalWindowContainer, location, data);
                }
            });
            return filterAddWrap;
        },
        createSearchInput: function() {
            const searchContainer__input = this.createElement('input',
                {
                    id: 'searchContainer__input',
                    type: 'search',
                    placeholder: 'Пошук доручення за номером'
                });
            const searchContainer = this.createElement('div', 
                {
                    id: 'searchContainer'
                },
                searchContainer__input
            );
            searchContainer__input.addEventListener('input', () => {
                if(searchContainer__input.value.length === 0) {
                    this.hideSearchTable();
                }
            });
            searchContainer__input.addEventListener('keypress', e => {
                let key = e.which || e.keyCode;
                if (key === 13) {
                    if(searchContainer__input.value.length) {
                        this.setVisibilityOrganizationContainer('none');
                        this.resultSearch('resultSearch', searchContainer__input.value);
                    }
                }
            });
            return searchContainer;
        },
        hideSearchTable() {
            this.messageService.publish({name: 'hideSearchTable'});
        },
        resultSearch: function(name, appealNum) {
            this.messageService.publish({name, appealNum});
        },
        createModalWindowContainer: function() {
            this.modalWindowContainer = this.createElement('div', { id: 'modalWindowContainer' });
            return this.modalWindowContainer;
        },
        createModalForm: function(modalWindowContainer, location, data) {
            if(modalWindowContainer.parentElement === null) {
                let filtersWrapper = document.getElementById('filtersWrapper');
                filtersWrapper.appendChild(modalWindowContainer);
            }
            this.removeContainerChildren(modalWindowContainer);
            modalWindowContainer.classList.add('modalWindowShowClass');
            let modalFiltersHeader = {};
            if (location === 'district') {
                const modalFiltersHeader__category = this.createElement('div', {
                    className: 'filHeadCategorie headerSelectFilter',
                    id: 'modalFiltersHeader__category',
                    innerText: 'НАПРЯМОК РОБIТ'
                });
                const modalFiltersHeader__district = this.createElement('div', {
                    className: 'filHeadDistrict headerSelectFilter',
                    id: 'modalFiltersHeader__district',
                    innerText: 'РАЙОН'
                });
                modalFiltersHeader = this.createElement('div',
                    { id: 'modalFiltersHeader'},
                    modalFiltersHeader__district, modalFiltersHeader__category
                );
            } else if(location === 'priority') {
                const modalFiltersHeader__depart = this.createElement('div', {
                    className: 'filHeadDepart headerSelectFilter',
                    id: 'modalFiltersHeader__priority',
                    innerText: 'Пріоритет'
                });
                modalFiltersHeader = this.createElement('div', { id: 'modalFiltersHeader'}, modalFiltersHeader__depart);
            }
            const modalFiltersContainer = this.createElement('div', { id: 'modalFiltersContainer'});
            const modalFilters = this.createElement('div', {
                id: 'modalFilters'
            }, modalFiltersHeader, modalFiltersContainer);
            const modalHeader__button_close = this.createElement('button', {
                id: 'modalHeader__button_close',
                className: 'modalBtn',
                innerText: 'Закрити'
            });
            const modalHeader__buttonWrapper = this.createElement('div', {
                id: 'modalHeader__buttonWrapper'
            }, modalHeader__button_close);
            const modalHeader__caption = this.createElement('div', {
                id: 'modalHeader__caption',
                innerText: 'Налаштування фiльтрiв'
            });
            const modalHeader = this.createElement('div', {
                id: 'modalHeader'
            }, modalHeader__caption, modalHeader__buttonWrapper);
            const modalWindow = this.createElement('div', { id: 'modalWindow', style: 'display: block'}, modalHeader, modalFilters);
/*             modalWindow.style.display = 'block'; */
            modalWindowContainer.appendChild(modalWindow);
            this.createModalFiltersContainerItems(data, modalFiltersContainer, location);
            modalHeader__button_close.addEventListener('click', () => {
                modalWindowContainer.classList.remove('modalWindowShowClass');
                this.removeContainerChildren(modalWindowContainer);
                this.reloadMainTable();
            });
        },
        createModalFiltersContainerItems: function(data, modalFiltersContainer, location) {
            if(location === 'district') {
                data.forEach(el => {
                    let districtId = el.districtId;
                    let categoryId = el.questDirectId;
                    let categoryItemSelect = this.createElement('select', {
                        className: 'categoryItemSelect selectItem js-example-basic-single'
                    });
                    let categoryItem = this.createElement('div', { className: 'districtItem'}, categoryItemSelect);
                    let districtItemSelect = this.createElement('select', {
                        className: 'districtItemSelect selectItem  js-example-basic-single'
                    });
                    let districtItem = this.createElement('div', { className: 'districtItem'}, districtItemSelect);
                    const modalFiltersContainerItem__category = this.createElement('div', {
                        className: 'modalFiltersContainer__category'
                    }, categoryItem);
                    const modalFiltersContainerItem__district = this.createElement('div', {
                        className: 'modalFiltersContainer__district'
                    }, districtItem);
                    const modalFiltersContainerItem = this.createElement('div', {
                        className: 'modalFiltersContainerItem'
                    }, modalFiltersContainerItem__district, modalFiltersContainerItem__category);
                    this.isLoadDistrict = false;
                    this.isLoadCategory = false;
                    this.messageService.publish({ name: 'showPagePreloader'});
                    modalFiltersContainer.appendChild(modalFiltersContainerItem);
                    this.createFilterDistrict(districtId, districtItemSelect, this.districtNameCategories);
                    this.createFilterCategories(categoryId, categoryItemSelect, this.questionTypeCategories);
                });
                let categoryNewItemSelect = this.createElement('select', {
                    id: 'categoryNewItemSelect',
                    className: 'categoryItemSelect selectItem js-example-basic-single js-example-placeholder-category'
                });
                let categoryNewItem = this.createElement('div', { className: 'districtItem'}, categoryNewItemSelect);
                let districtNewItemSelect = this.createElement('select', {
                    id: 'districtNewItemSelect',
                    className: 'districtItemSelect selectItem  js-example-basic-single js-example-placeholder-district'
                });
                let districtNewItem = this.createElement('div', { className: 'districtItem'}, districtNewItemSelect);
                const modalFiltersContainerItemNew__category = this.createElement('div', {
                    className: 'modalFiltersContainer__category'
                }, categoryNewItem);
                const modalFiltersContainerItemNew__district = this.createElement('div', {
                    className: 'modalFiltersContainer__district'
                }, districtNewItem);
                const modalFiltersContainerItemNew = this.createElement('div', {
                    className: 'modalFiltersContainerItem'
                }, modalFiltersContainerItemNew__district, modalFiltersContainerItemNew__category);
                modalFiltersContainer.appendChild(modalFiltersContainerItemNew);
                this.createNewFilterDistrict(districtNewItemSelect, location, this.districtNameCategories);
                this.createNewFilterCategories(categoryNewItemSelect, location, this.questionTypeCategories);
            }else if(location === 'priority') {
                data.forEach(el => {
                    let priorityId = el.organizationId;
                    let priorityItemSelect = this.createElement('select', {
                        className: 'priorityItemSelect selectItem js-example-basic-single'
                    });
                    let priorityItem = this.createElement('div', {
                        className: 'priorityItem'
                    }, priorityItemSelect);
                    const modalFiltersContainerItem__priority = this.createElement('div', {
                        className: 'modalFiltersContainer__depart'
                    }, priorityItem);
                    const modalFiltersContainerItem = this.createElement('div', {
                        className: 'modalFiltersContainerItem'
                    }, modalFiltersContainerItem__priority);
                    this.messageService.publish({ name: 'showPagePreloader'});
                    modalFiltersContainer.appendChild(modalFiltersContainerItem);
                    this.createFilterDepartment(priorityId, priorityItemSelect, this.priorityCategories);
                    this.showPreloader = false;
                });
                let priorityNewItemSelect = this.createElement('select', {
                    id: 'priorityNewItemSelect',
                    className:
                        'priorityItemSelect ' +
                        'selectItem ' +
                        'js-example-basic-single ' +
                        'js-example-placeholder-priority'
                });
                let priorityNewItem = this.createElement('div', {
                    className: 'priorityItem'
                }, priorityNewItemSelect);
                const modalFiltersContainerItemNew__priority = this.createElement('div', {
                    className: 'modalFiltersContainer__depart'
                }, priorityNewItem);
                const modalFiltersContainerItemNew = this.createElement('div', {
                    className: 'modalFiltersContainerItem'
                }, modalFiltersContainerItemNew__priority);
                modalFiltersContainer.appendChild(modalFiltersContainerItemNew);
                /* this.createNewFilterDepartment(priorityNewItemSelect, location, this.priorityCategories); */
            }
        },
        createFilterDistrictElements: function(data) {
            let filtersContainerDistrict = document.getElementById('filtersContainerDistrict');
            this.removeContainerChildren(filtersContainerDistrict);
            for (let i = 0; i < data.length; i++) {
                let row = data[i];
                let filter_closer = this.createElement('div', {
                    className: 'filter_closer filter_closer_district filter_closer_hide'});
                let filter__icon = this.createElement('div', {
                    className: ' filterIcon material-icons', innerText: 'filter_list'});
                let filter__title = this.createElement('div', {
                    className: 'filterTitle', innerText: String(String(row.filterName))});
                let filterWrapper = this.createElement('div', {
                    id: String(String(row.id)),
                    district_id: String(String(row.districtId)),
                    question_id: String(String(row.questDirectId)),
                    className: 'filter_district filter'
                }, filter__icon, filter__title, filter_closer);
                filtersContainerDistrict.appendChild(filterWrapper);
            }
            this.setFiltersEvents();
        },
        setFiltersEvents: function() {
            const filters = Array.from(document.querySelectorAll('.filter_district'));
            filters.forEach(item => {
                item.addEventListener('mouseover', event => {
                    let target = event.currentTarget;
                    target.childNodes[2].classList.add('material-icons');
                    target.childNodes[2].classList.remove('filter_closer_hide');
                    target.childNodes[2].classList.add('filter_closer_show');
                    target.childNodes[2].innerText = 'close';
                });
            });
            filters.forEach(item => {
                item.addEventListener('mouseout', event => {
                    let target = event.currentTarget;
                    target.childNodes[2].classList.remove('material-icons');
                    target.childNodes[2].classList.remove('filter_closer_show');
                    target.childNodes[2].classList.add('filter_closer_hide');
                    target.childNodes[2].innerText = '';
                });
            });
            const filter_closer_district = Array.from(document.querySelectorAll('.filter_closer_district'));
            filter_closer_district.forEach(filter => {
                filter.addEventListener('click', event => {
                    this.sendMesOnBtnClick('none', 'none');
                    let target = event.currentTarget;
                    let executeQueryDeleteFilter = {
                        queryCode: 'cc_FilterDelete',
                        limit: -1,
                        parameterValues: [
                            { key: '@id', value: Number(target.parentElement.id)}
                        ]
                    };
                    let element = target.parentElement;
                    let location = 'district';
                    this.queryExecutor(executeQueryDeleteFilter, this.reloadFilterAfterDelete(element, location), this);
                    this.showPreloader = false;
                });
            });
        },
        reloadFilterAfterDelete:  function(element, location) {
            const status = 'delete';
            element.parentElement.removeChild(document.getElementById(element.id));
            if(location === 'district') {
                this.executeFilterName(status, location);
            }else if(location === 'priority') {
                this.executeFilterNamePriority(status, location);
            }
        },
        createTableWrapper: function() {
            this.tableContainer = this.createElement('div', { id: 'tableContainer', className: 'tableContainer'});
            const tableWrapper = this.createElement('div',
                { id: 'tableWrapper', className: 'tableWrapper'},
                this.tableContainer
            );
            this.executeMainTableQuery(false, null);
            return tableWrapper;
        },
        setDistrictData: function(status, location, data) {
            this.districtData = [];
            let indexId = data.columns.findIndex(el => el.code.toLowerCase() === 'id');
            let indexFilterName = data.columns.findIndex(el => el.code.toLowerCase() === 'filter_name');
            let indexDistrictId = data.columns.findIndex(el => el.code.toLowerCase() === 'district_id');
            let indexQuestionDirectionId = data
                .columns.findIndex(el => el.code.toLowerCase() === 'questiondirection_id');
            let indexDistrictName = data.columns.findIndex(el => el.code.toLowerCase() === 'district_name');
            let indexQuestionDirectionName = data
                .columns.findIndex(el => el.code.toLowerCase() === 'questiondirection_name');
            data.rows.forEach(row => {
                let obj = {
                    id: row.values[indexId],
                    filterName: row.values[indexFilterName],
                    districtId: row.values[indexDistrictId],
                    questDirectId: row.values[indexQuestionDirectionId],
                    districtName: row.values[indexDistrictName],
                    questDirectName: row.values[indexQuestionDirectionName]
                }
                this.districtData.push(obj);
            });
            /* this.myOneFunction(status, location, this.districtData); */
        },
        setPriorityData: function(status, location, data) {
            this.priorityData = [];
            let indexId = data.columns.findIndex(el => el.code.toLowerCase() === 'id');
            let indexOrganizationId = data.columns.findIndex(el => el.code.toLowerCase() === 'organization_id');
            let indexPriorityName = data.columns.findIndex(el => el.code.toLowerCase() === 'name');
            data.rows.forEach(row => {
                let obj = {
                    id: row.values[indexId],
                    organizationId: row.values[indexOrganizationId],
                    departmentName: row.values[indexPriorityName]
                }
                this.priorityData.push(obj);
            });
            /* this.myOneFunction(status, location, this.priorityData); */
        },
        myOneFunction: function(status, location, data) {
            if(status === 'new') {
                this.createFilterPriorityElements(data);
            }else if(status === 'reload') {
                this.createFilterPriorityElements(data);
                this.createModalForm(this.modalWindowContainer, location, data);
            }else if(status === 'delete') {
                this.reloadMainTable();
            }
        },
        reloadMainTable: function(message) {
            debugger;
            this.removeContainerChildren(this.tableContainer);
            /* const reloadTable = message ? true : false; */
            if (message) {
                this.column = message.column;
                this.navigation = message.navigation;
                this.targetId = message.targetId;
            }
            this.executeMainTableQuery();
        },
        executeMainTableQuery: function() {
            this.removeContainerChildren(this.tableContainer);
            let executeQueryTable = {
                queryCode: 'h_DB_ProApp_MainTable',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQueryTable, this.createInfoTable, this);
            this.showPreloader = false;
        },
        createInfoTable: function(data) {
            const headerItemsWrapper = this.createHeaderItemsWrapper(data.rows[3]);
            this.tableContainer.appendChild(headerItemsWrapper);
            const subHeaderItemsWrapper = this.createSubHeaderItemsWrapper(data);
            this.tableContainer.appendChild(subHeaderItemsWrapper);
            this.messageService.publish({ name: 'hidePagePreloader' });
        },
        createHeaderItemsWrapper: function(data) {
            const index = 2;
            const headerItemsWrapper = this.createElement('div',
                {
                    id: 'headerItems',
                    className: 'displayFlex'
                }
            );
            this.headerItems = [];
            this.headers.forEach(header => {
                const triangle = this.createElement('div', { className: `${header.name}_triangle` });
                const headerItem = this.createElement('div',
                    {
                        id: `${header.id}`,
                        code: `${header.name}`,
                        className: 'headerItem displayFlex',
                        innerText: `${header.innerText} (${data.values[header.index + index]})`,
                        style: `background-color: ${header.backgroundColor}`,
                        colorIndex: `${header.index}`
                    },
                    triangle
                );
                headerItem.addEventListener('click', event => {
                    let target = event.currentTarget;
                    let navigator = 'Усі';
                    let code = target.code;
                    this.setInfoTableVisibility(target, code, navigator);
                });
                this.headerItems.push(headerItem);
                headerItemsWrapper.appendChild(headerItem);
            });
            return headerItemsWrapper;
        },
        createSubHeaderItemsWrapper: function(data) {
            this.subHeaderWrapper = this.createElement('div',
                {
                    id: 'subHeaderWrapper',
                    className: 'displayFlex'
                }
            );
            this.createSubHeaderItemsColumns(this.subHeaderWrapper, data);
            return this.subHeaderWrapper;
        },
        createSubHeaderItemsColumns: function(subHeaderWrapper, data) {
            this.headers.forEach((header, index) => {
                const column = this.createElement('div', {
                    className: 'subHeaderColumn counterHeader'
                });
                for (let i = 0; i < data.rows.length - 1; i++) {
                    const count = data.rows[i].values[index + 2];
                    if (count) {
                        const textIndex = 1;
                        const text = data.rows[i].values[textIndex];
                        const columnItem = this.createElement('div', {
                            innerText: `${text} (${count})`,
                            navigator: text,
                            className: 'columnCategory',
                            code: header.name
                        });
                        columnItem.addEventListener('click', event => {
                            const target = event.currentTarget;
                            const navigator = target.navigator;
                            const code = target.code;
                            const columnHeader = document.getElementById(this.headers.find(h => h.name === code).id);
                            this.setInfoTableVisibility(columnHeader, code, navigator);
                        });
                        column.appendChild(columnItem);
                    }
                }
                subHeaderWrapper.appendChild(column);
            })
        },
        setInfoTableVisibility: function(target, code, navigator) {
            if (target.classList.contains('check') || target.classList.contains('hover')) {
                this.headerItems.forEach((header, index) => {
                    header.firstElementChild.classList.remove('triangle');
                    header.firstElementChild.classList.add(`${header.code}_triangle`);
                    header.classList.remove('hover');
                    header.classList.remove('check');
                    header.style.backgroundColor = this.headers[index].backgroundColor;
                });
                this.setVisibilityOrganizationContainer('flex');
                this.sendMesOnBtnClick(undefined, undefined);
                this.messageService.publish({name: 'clickOnHeaderTable'});
            } else {
                target.classList.add('hover');
                this.setVisibilityOrganizationContainer('none');
                this.headerItems.forEach(header => {
                    if(target.id !== header.id) {
                        header.style.backgroundColor = '#d3d3d3';
                        header.classList.add('check');
                        header.firstElementChild.classList.remove(header.firstElementChild.classList[0]);
                        header.firstElementChild.classList.add('triangle');
                    }
                    this.headerItems[6].firstElementChild.classList.remove('triangle');
                });
                this.sendMesOnBtnClick(code, navigator);
            }
        },
        setVisibilityOrganizationContainer: function(status) {
            this.subHeaderWrapper.style.display = status;
        },
        sendMesOnBtnClick: function(code, navigator) {
            console.table(code, navigator);
            this.hideSearchTable();
            this.messageService.publish({
                name: 'clickOnHeaderTable',
                code: code,
                navigator: navigator
            });
        },
        removeContainerChildren: function(container) {
            while (container.hasChildNodes()) {
                container.removeChild(container.lastElementChild);
            }
        },
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if(children.length > 0) {
                children.forEach(child =>{
                    element.appendChild(child);
                });
            } return element;
        }
    };
}());
