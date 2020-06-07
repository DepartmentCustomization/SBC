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
                colorIndex: 0,
                backgroundColor: 'rgb(74, 193, 197)'
            },
            {
                name: 'in_work',
                id: 'headerItem__inWork',
                innerText: 'В роботі',
                colorIndex: 1,
                backgroundColor: 'rgb(132, 199, 96)'
            },
            {
                name: 'overdue',
                id: 'headerItem__overdue',
                innerText: 'Прострочено',
                colorIndex: 2,
                backgroundColor: 'rgb(240, 114, 93)'
            },
            {
                name: 'clarified',
                id: 'headerItem__checked',
                innerText: 'Роз\'яснено',
                colorIndex: 3,
                backgroundColor: 'rgb(248, 195, 47)'
            },
            {
                name: 'done',
                id: 'headerItem__done',
                innerText: 'Виконано',
                colorIndex: 4,
                backgroundColor: 'rgb(86 162 78)'
            },
            {
                name: 'for_revision',
                id: 'headerItem__onRefinement',
                innerText: 'На доопрацювання',
                colorIndex: 5,
                backgroundColor: 'rgb(94, 202, 162)'
            },
            {
                name: 'plan_program',
                id: 'headerItem__planOrProgram',
                innerText: 'План\\Програма',
                colorIndex: 6,
                backgroundColor:  'rgb(73, 155, 199)'
            }
        ],
        init: function() {
            this.subscribers.push(this.messageService.subscribe('reloadMainTable', this.reloadMainTable, this));
            this.executeQueries();
        },
        afterViewInit: function() {
            /*
            this.createSearchInput(filtersWrapper); */
            this.container = document.getElementById('container');
            const tabsWrapper = this.createTabs();
            const filtersWrapper = this.createFiltersWrapper();
            const tableWrapper = this.createTableWrapper();
            this.container.appendChild(tabsWrapper);
            this.container.appendChild(filtersWrapper);
            this.container.appendChild(tableWrapper);

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
            const modalWindowContainer = this.createModalWindowContainer();
            const buttonWrapper = this.createFilterButtonWrapper();
            const filtersWrapper = this.createElement('div',
                { id: 'filtersWrapper', className: 'filtersWrapper'},
                filtersInfo, buttonWrapper, modalWindowContainer
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
            const filterEditDistrict__title = this.createElement('div', {
                className: 'filterEditDistrict__title',
                innerText: 'Район'
            });
            const filterEditDistrict__icon = this.createElement('div', {
                className: 'material-icons filterEditDistrict__icon',
                innerText: 'add_circle_outline'
            });
            const filterDistrictAddWrap = this.createElement('div', {
                className: 'filterDistrictAddWrap filterWrap'
            }, filterEditDistrict__icon, filterEditDistrict__title);
            const filterEdiPriority__title = this.createElement('div', {
                className: 'filterEditDistrict__title',
                innerText: 'Пріоритет'
            });
            const filterEditPriority__icon = this.createElement('div', {
                className: 'material-icons filterEditDistrict__icon',
                innerText: 'add_circle_outline'
            });
            const filterEditPriorityAddWrap = this.createElement('div', {
                className: 'filterEditPriorityAddWrap filterWrap'
            }, filterEditPriority__icon, filterEdiPriority__title);
            filterDistrictAddWrap.addEventListener('click', () => {
                if(!this.modalWindowContainer.classList.contains('modalWindowShowClass')) {
                    let location = 'district';
                    this.createModalForm(this.modalWindowContainer, location, this.districtData);
                }
            });
            filterEditPriorityAddWrap.addEventListener('click', () => {
                if(!this.modalWindowContainer.classList.contains('modalWindowShowClass')) {
                    let location = 'priority';
                    this.createModalForm(this.modalWindowContainer, location, this.priorityData);
                }
            });
            const filterButtonWrapper = this.createElement('div',
                { id: 'filtersCaptionBox' },
                filterDistrictAddWrap, filterEditPriorityAddWrap
            );
            return filterButtonWrapper;
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
                    id: 'modalFiltersHeader__categorie',
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
            const modalWindow = this.createElement('div', { id: 'modalWindow'}, modalHeader, modalFilters);
            modalWindow.style.display = 'block';
            modalWindowContainer.appendChild(modalWindow);
            this.createModalFiltersContainerItems(data, modalFiltersContainer, location);
            modalHeader__button_close.addEventListener('click', () => {
                modalWindowContainer.classList.remove('modalWindowShowClass');
                this.removeContainerChildren(modalWindowContainer);
                this.reloadMainTable();
            });
        },
        removeContainerChildren: function(container) {
            while (container.hasChildNodes()) {
                container.removeChild(container.lastElementChild);
            }
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
                        className: 'modalFiltersContainer__categorie'
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
                let categorieNewItemSelect = this.createElement('select', {
                    id: 'categorieNewItemSelect',
                    className: 'categorieItemSelect selectItem js-example-basic-single js-example-placeholder-categorie'
                });
                let categorieNewItem = this.createElement('div', { className: 'districtItem'}, categorieNewItemSelect);
                let districtNewItemSelect = this.createElement('select', {
                    id: 'districtNewItemSelect',
                    className: 'districtItemSelect selectItem  js-example-basic-single js-example-placeholder-district'
                });
                let districtNewItem = this.createElement('div', { className: 'districtItem'}, districtNewItemSelect);
                const modalFiltersContainerItemNew__categorie = this.createElement('div', {
                    className: 'modalFiltersContainer__categorie'
                }, categorieNewItem);
                const modalFiltersContainerItemNew__district = this.createElement('div', {
                    className: 'modalFiltersContainer__district'
                }, districtNewItem);
                const modalFiltersContainerItemNew = this.createElement('div', {
                    className: 'modalFiltersContainerItem'
                }, modalFiltersContainerItemNew__district, modalFiltersContainerItemNew__categorie);
                modalFiltersContainer.appendChild(modalFiltersContainerItemNew);
                this.createNewFilterDistrict(districtNewItemSelect, location, this.districtNameCategories);
                this.createNewFilterCategories(categorieNewItemSelect, location, this.questionTypeCategories);
            }else if(location === 'priority') {
                data.forEach(function(el) {
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
                }.bind(this));
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
                this.createNewFilterDepartament(priorityNewItemSelect, location, this.priorityCategories)
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
            this.changeFilterItemDistrict();
        },
        changeFilterItemDistrict: function() {
            let filters = document.querySelectorAll('.filter_district');
            filters = Array.from(filters);
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
            let filter_closer_district = document.querySelectorAll('.filter_closer_district');
            filter_closer_district = Array.from(filter_closer_district);
            filter_closer_district.forEach(function(el) {
                el.addEventListener('click', function(event) {
                    this.sendMesOnBtnClick('clickOnСoordinator_table', 'none', 'none');
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
                }.bind(this));
            }.bind(this));
        },
        reloadFilterAfterDelete:  function(element, location) {
            let status = 'delete';
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
            return tableWrapper;
        },
        executeQueries: function() {
            const status = 'new';
            const location = undefined;
            this.executeFilterName(status, location);
            this.executeFilterNamePriority(status, location);
            this.executeFilterDistrict();
            this.executeFilterQuestionTypes();
            this.executeFilterPriority();
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
            let executeQueryDistinct = {
                queryCode: 'cc_FilterDistrict',
                limit: -1,
                parameterValues: []
            };
            /* this.queryExecutor(executeQueryDistinct, this.setDistrictCategories, this); */
            this.showPreloader = false;
        },
        executeFilterQuestionTypes: function() {
            let executeQueryCategories = {
                queryCode: 'cc_FilterQuestionTypes',
                limit: -1,
                parameterValues: []
            };
            /* this.queryExecutor(executeQueryCategories, this.setQuestionTypesCategories, this); */
            this.showPreloader = false;
        },
        executeFilterPriority: function() {
            let executeQueryPriority = {
                queryCode: 'cc_FilterPriority',
                limit: -1,
                parameterValues: []
            };
            /* this.queryExecutor(executeQueryPriority, this.setPriorityCategories, this); */
            this.showPreloader = false;
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
                let modalWindowContainer = document.getElementById('modalWindowContainer');
                this.createModalForm(modalWindowContainer, location, data);
            }else if(status === 'delete') {
                this.reloadMainTable();
            }
        },
        reloadMainTable: function(message) {
            this.messageService.publish({ name: 'showPagePreloader'});
            let tableContainer = document.getElementById('tableContainer');
            this.removeContainerChildren(tableContainer);
            let reloadTable = false;
            if(message) {
                this.column = message.column;
                this.navigation = message.navigation;
                this.targetId = message.targetId;
                reloadTable = true;
            }
            /* let executeQueryTable = {
                queryCode: 'CoordinatorController_table',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQueryTable, this.createTable.bind(this, reloadTable), this); 
            this.showPreloader = false;
            */
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
