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
        filterCatalog: [
            {
                type: 'district',
                code: 'h_DistrictSRows_filter',
                data: []
            },
            {
                type: 'category',
                code: 'h_QuestionDirectionSRows_filter',
                data: []
            },
            {
                type: 'priority',
                code: 'h_EmergensySRows_filter',
                data: []
            }
        ],
        savedFiltersData:  [
            {
                type: 'district',
                code: 'h_FilterSRowsDistrict',
                data: []
            },
            {
                type: 'priority',
                code: 'h_FilterSRowsEmergensy',
                data: []
            }
        ],
        stateFilterOptions: [
            {
                type: 'district',
                items: [
                    {
                        id: 'modalFiltersHeader__district',
                        code: 'h_DistrictSRows_filter',
                        innerText: 'Район',
                        className: 'districts',
                        type: 'district',
                        data: [],
                        newSelectId: 'districtNewItemSelect'
                    },
                    {
                        id: 'modalFiltersHeader__category',
                        code: 'h_QuestionDirectionSRows_filter',
                        innerText: 'Напрямок робіт',
                        className: 'categorys',
                        type: 'category',
                        data: [],
                        newSelectId: 'categoryNewItemSelect'
                    }
                ]
            },
            {
                type: 'priority',
                items: [
                    {
                        id: 'modalFiltersHeader__priority',
                        code: 'h_EmergensySRows_filter',
                        innerText: 'Пріоритет',
                        type: 'priority',
                        data: [],
                        newSelectId: 'priorityNewItemSelect'
                    }
                ]
            }
        ],
        new: 'new',
        reload: 'reload',
        districtType: 'district',
        categoryType: 'category',
        priorityType: 'priority',
        init: function() {
            this.subscribers.push(this.messageService.subscribe('reloadMainTable', this.reloadMainTable, this));
            this.messageService.publish({ name: 'showPagePreloader' });
            this.executeDataQueries();
        },
        executeDataQueries: function() {
            this.executeSetFilterDataQuery();
            this.executeSavedFiltersDataQuery(this.new);
        },
        executeSavedFiltersDataQuery: function(status) {
            this.promiseSavedAll = [];
            this.savedFiltersData.forEach(filter => {
                const queryPromise = new Promise((resolve) => {
                    let executeQuery = {
                        queryCode: filter.code,
                        limit: -1,
                        parameterValues: []
                    };
                    this.queryExecutor(executeQuery, this.setSavedFilterData.bind(this, filter.data, resolve, filter.type), this);
                    this.showPreloader = false;
                });
                this.promiseSavedAll.push(queryPromise);
            });
            Promise.all(this.promiseSavedAll).then(() => {
                this.promiseSavedAll = [];
                if (status === this.new) {
                    this.createTables();
                } else if (status === this.reload) {
                    this.reloadMainTable();
                }
            });
        },
        executeSetFilterDataQuery: function() {
            this.promiseAll = [];
            this.filterCatalog.forEach(filter => {
                const queryPromise = new Promise((resolve) => {
                    let executeQuery = {
                        queryCode: filter.code,
                        limit: -1,
                        parameterValues: []
                    };
                    this.queryExecutor(executeQuery, this.setFilterData.bind(this, filter.data, resolve), this);
                    this.showPreloader = false;
                });
                this.promiseAll.push(queryPromise);
            });
            Promise.all(this.promiseAll).then(() => {
                this.promiseAll = [];
            });
        },
        setSavedFilterData: function(arr, resolve, type, data) {
            if (type === this.districtType) {
                const filterId = data.columns.findIndex(el => el.code.toLowerCase() === 'id');
                const filterName = data.columns.findIndex(el => el.code.toLowerCase() === 'filter_name');
                const districtId = data.columns.findIndex(el => el.code.toLowerCase() === 'district_id');
                const districtName = data.columns.findIndex(el => el.code.toLowerCase() === 'district_name');
                const categoryId = data.columns.findIndex(el => el.code.toLowerCase() === 'questiondirection_id');
                const categoryName = data.columns.findIndex(el => el.code.toLowerCase() === 'questiondirection_name');
                data.rows.forEach(row => {
                    const obj = {
                        id: row.values[filterId],
                        filterName: row.values[filterName],
                        districtId: row.values[districtId],
                        districtName: row.values[districtName],
                        categoryId: row.values[categoryId],
                        categoryName: row.values[categoryName]
                    }
                    arr.push(obj);
                });
            } else if (type === this.priorityType) {
                const indexId = data.columns.findIndex(el => el.code.toLowerCase() === 'id');
                const emergencyId = data.columns.findIndex(el => el.code.toLowerCase() === 'emergensy_id');
                const emergencyName = data.columns.findIndex(el => el.code.toLowerCase() === 'emergensy_name');
                data.rows.forEach(row => {
                    const obj = {
                        id: row.values[indexId],
                        emergencyId: row.values[emergencyId],
                        filterName: row.values[emergencyName]
                    }
                    arr.push(obj);
                });
            }
            resolve(data);
        },
        setFilterData: function(arr, resolve, data) {
            const indexId = data.columns.findIndex(el => el.code.toLowerCase() === 'id');
            const indexDistrictName = data.columns.findIndex(el => el.code.toLowerCase() === 'name');
            data.rows.forEach(row => {
                const obj = {
                    id: row.values[indexId],
                    filterName: row.values[indexDistrictName]
                }
                arr.push(obj);
            });
            resolve(data);
        },
        afterViewInit: function() {
            this.container = document.getElementById('container');
        },
        createTables: function() {
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
            this.filtersInfo = this.createFiltersInfo();
            const buttonWrapper = this.createFilterButtonWrapper();
            const searchInput = this.createSearchInput();
            this.filtersWrapper = this.createElement('div',
                { id: 'filtersWrapper', className: 'filtersWrapper'},
                this.filtersInfo, buttonWrapper, searchInput
            );
            return this.filtersWrapper;
        },
        createFiltersInfo: function() {
            const districtData = this.savedFiltersData.find(d => d.type === this.districtType).data;
            const priorityData = this.savedFiltersData.find(d => d.type === this.priorityType).data;
            const districtSavedFilterContainer = this.createSavedFilterContainer(districtData, this.districtType);
            const prioritySavedFilterContainer = this.createSavedFilterContainer(priorityData, this.priorityType);
            const filtersInfo = this.createElement('div',
                {id: 'filtersInfo'},
                districtSavedFilterContainer, prioritySavedFilterContainer
            );
            return filtersInfo;
        },
        createSavedFilterContainer: function(data, type) {
            const filterContainer = this.createElement('div', {id: `filterContainer__${type}`, className: 'filterContainer'});
            for (let i = 0; i < data.length; i++) {
                const filter = data[i];
                const button = this.createElement('div',
                    {
                        className: 'filter_closer  filter_closer_hide',
                        containerId: `filterContainer__${type}`

                    }
                );
                const icon = this.createElement('div',{className: ' filterIcon material-icons', innerText: 'filter_list'});
                const title = this.createElement('div', {className: 'filterTitle', innerText: filter.filterName});
                const wrapper = this.createElement('div',
                    {
                        className: 'filter_district filter',
                        type: type
                    },
                    icon, title, button
                );
                for (const key in filter) {
                    wrapper[key] = filter[key];
                }
                this.setSavedFilterWrapperEvents(wrapper, button);
                filterContainer.appendChild(wrapper);
            }
            return filterContainer;
        },
        setSavedFilterWrapperEvents: function(wrapper, button) {
            wrapper.addEventListener('mouseover', event => {
                let target = event.currentTarget;
                target.childNodes[2].classList.add('material-icons');
                target.childNodes[2].classList.remove('filter_closer_hide');
                target.childNodes[2].classList.add('filter_closer_show');
                target.childNodes[2].innerText = 'close';
            });
            wrapper.addEventListener('mouseout', event => {
                let target = event.currentTarget;
                target.childNodes[2].classList.remove('material-icons');
                target.childNodes[2].classList.remove('filter_closer_show');
                target.childNodes[2].classList.add('filter_closer_hide');
                target.childNodes[2].innerText = '';
            });
            button.addEventListener('click', event => {
                this.messageService.publish({ name: 'showPagePreloader' });
                /* this.sendMesOnBtnClick('clickOnСoordinator_table', 'none', 'none'); */
                let target = event.currentTarget;
                this.reloadFilterAfterDelete(target);
            });
        },
        executeDeleteSavedFilter: function(button) {
            let executeQueryDeleteFilter = {
                queryCode: 'h_FilterDelete',
                limit: -1,
                parameterValues: [
                    { key: '@Id', value: Number(button.parentElement.id)}
                ]
            };
            this.queryExecutor(executeQueryDeleteFilter, this.reloadFilterAfterDelete.bind(this, button), this);
            this.showPreloader = false;
        },
        reloadFilterAfterDelete: function(button) {
            this.removeSavedFilter(button);
            this.clearAllData();
            this.executeSavedFiltersDataQuery(this.reload);
        },
        removeSavedFilter: function(button) {
            const container = document.getElementById(button.containerId);
            container.removeChild(document.getElementById(button.parentElement.id));
        },
        clearAllData: function() {
            this.savedFiltersData.forEach(filter => filter.data = []);
            this.stateFilterOptions.forEach(type => {
                type.items.forEach(filter => filter.data = []);
            });
        },
        updateSavedFiltersTable: function() {},
        createFilterButtonWrapper: function() {
            const district = this.createFilterEditItem('Район', this.districtType);
            const priority = this.createFilterEditItem('Пріоритет', this.priorityType);
            const filterButtonWrapper = this.createElement('div',
                { id: 'filtersCaptionBox' },
                district, priority
            );
            return filterButtonWrapper;
        },
        createFilterEditItem: function(title, type) {
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
                    this.createModalForm(type);
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
        createModalForm: function(type) {
            if(this.modalWindowContainer.parentElement === null) {
                this.filtersWrapper.appendChild(this.modalWindowContainer);
            }
            this.modalWindowContainer.classList.add('modalWindowShowClass');
            const modalHeader = this.createModalHeader();
            const modalFilters = this.createModalFilters(type);
            const modalWindow = this.createElement('div', { id: 'modalWindow', style: 'display: block'}, modalHeader, modalFilters);
            this.modalWindowContainer.appendChild(modalWindow);
        },
        createModalHeader: function() {
            const buttonClose = this.createElement('button', {
                id: 'modalHeader__button_close',
                className: 'modalBtn',
                innerText: 'Закрити'
            });
            buttonClose.addEventListener('click', () => {
                this.modalWindowContainer.classList.remove('modalWindowShowClass');
                this.removeContainerChildren(this.modalWindowContainer);
                /* this.reloadMainTable(); */
            });
            const caption = this.createElement('div',{ id: 'modalHeader__caption', innerText: 'Налаштування фiльтрiв' });
            const buttonWrapper = this.createElement('div', { id: 'modalHeader__buttonWrapper' }, buttonClose);
            const modalHeader = this.createElement('div', { id: 'modalHeader' }, caption, buttonWrapper);
            return modalHeader;
        },
        createModalFilters: function(type) {
            const modalFiltersHeader = this.createModalFiltersHeaders(type);
            const modalFiltersContainer = this.createModalFiltersContainer(type);
            const modalFilters = this.createElement('div',
                {
                    id: 'modalFilters'
                },
                modalFiltersHeader, modalFiltersContainer
            );
            return modalFilters;
        },
        createModalFiltersHeaders: function(type) {
            const modalFiltersHeader = this.createElement('div',{ id: 'modalFiltersHeader'});
            const stateFilters = this.stateFilterOptions.find(m => m.type === type).items;
            stateFilters.forEach(item => {
                const header = this.createElement('div', {
                    className: 'modalFiltersHeader',
                    id: item.id,
                    innerText: item.innerText
                });
                modalFiltersHeader.appendChild(header);
            })
            return modalFiltersHeader;
        },
        createModalFiltersContainer: function(type) {
            const filtersData = this.savedFiltersData.find(m => m.type === type).data;
            const stateFilters = this.stateFilterOptions.find(m => m.type === type).items;
            const modalFiltersContainer = this.createElement('div', { id: 'modalFiltersContainer'});
            this.createModalFiltersContainerItems(filtersData, modalFiltersContainer, type);
            return modalFiltersContainer;
        },
        createModalFiltersContainerItems: function(items, modalFiltersContainer, type) {
            if(type === this.districtType) {
                items.forEach(el => {
                    let districtId = el.districtId;
                    let categoryId = el.categoryId;
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
                    modalFiltersContainer.appendChild(modalFiltersContainerItem);
                    this.districtNameCategories = this.filterCatalog.find(d => d.type === this.districtType).data;
                    this.questionTypeCategories = this.filterCatalog.find(d => d.type === this.categoryType).data;
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
            }else if(type === this.priorityType) {
                items.forEach(function(el) {
                    let priorityId = el.organizationId;
                    let priorityItemSelect = this.createElement('select', {
                        className: 'priorityItemSelect selectItem js-example-basic-single'
                    });
                    let priorityItem = this.createElement('div', {
                        className: 'priorityItem'
                    }, priorityItemSelect);
                    const modalFiltersContainerItem__priority = this.createElement('div', {
                        className: 'modalFiltersContainer__priority'
                    }, priorityItem);
                    const modalFiltersContainerItem = this.createElement('div', {
                        className: 'modalFiltersContainerItem'
                    }, modalFiltersContainerItem__priority);
                    modalFiltersContainer.appendChild(modalFiltersContainerItem);
                    this.priorityCategories = this.filterCatalog.find(d => d.type === type).data;
                    this.createFilterPriority(priorityId, priorityItemSelect, this.priorityCategories);
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
                    className: 'modalFiltersContainer__priority'
                }, priorityNewItem);
                const modalFiltersContainerItemNew = this.createElement('div', {
                    className: 'modalFiltersContainerItem'
                }, modalFiltersContainerItemNew__priority);
                modalFiltersContainer.appendChild(modalFiltersContainerItemNew);
                this.createNewFilterPriority(priorityNewItemSelect, location, this.priorityCategories);
            }
        },
        createFilterDistrict: function(districtId, districtItemSelect, data) {
            data.forEach(el => {
                let districtItemSelect__option = this.createElement('option', {
                    innerText: el.filterName,
                    value: el.id,
                    className: 'districtItemSelect__option'
                });
                if(districtId === el.id) {
                    districtItemSelect__option.selected = true;
                }
                districtItemSelect.appendChild(districtItemSelect__option);
            });
        },
        createFilterCategories: function(categoryId, categoryItemSelect, data) {
            data.forEach(el => {
                let categoryItemSelect__option = this.createElement('option', {
                    innerText: el.filterName,
                    value: el.id,
                    className: 'districtItemSelect__option'
                });
                if(categoryId === el.id) {
                    categoryItemSelect__option.selected = true;
                }
                categoryItemSelect.appendChild(categoryItemSelect__option);
            });
        },
        createFilterPriority: function(priorityId, priorityItemSelect, data) {
            data.forEach(el => {
                let priorityItemSelect__option = this.createElement('option', {
                    innerText: el.filterName,
                    value: el.id, className:
                    'districtItemSelect__option'
                });
                if(priorityId === el.id) {
                    priorityItemSelect__option.selected = true;
                }
                priorityItemSelect.appendChild(priorityItemSelect__option);
            });
        },
        createNewFilterPriority: function(priorityNewItemSelect, location, data) {
            let districtItemSelect__optionEmpty = this.createElement('option', {
                className: 'districtItemSelect__option'
            });
            priorityNewItemSelect.appendChild(districtItemSelect__optionEmpty);
            data.forEach(function(el) {
                let districtItemSelect__option = this.createElement('option', {
                    innerText: el.filterName,
                    value: el.id,
                    className: 'districtItemSelect__option'
                });
                priorityNewItemSelect.appendChild(districtItemSelect__option);
            }.bind(this));
            this.createOptions();
            this.isLoadDistrict = true;
            this.closePreload(location);
            this.districtId = 0;
            $('#priorityNewItemSelect').on('select2:select', function(e) {
                let districtId = Number(e.params.data.id);
                this.isDistrictFull = true;
                let positionFilter = 'district';
                this.addNewItem(location, positionFilter, districtId);
            }.bind(this));
        },
        createNewFilterDistrict: function(districtNewItemSelect, location, data) {
            let districtItemSelect__optionEmpty = this.createElement('option', {
                className: 'districtItemSelect__option'
            });
            districtNewItemSelect.appendChild(districtItemSelect__optionEmpty)
            data.forEach(function(el) {
                let districtItemSelect__option = this.createElement('option', {
                    innerText: el.filterName,
                    value: el.id,
                    className: 'districtItemSelect__option'
                });
                districtNewItemSelect.appendChild(districtItemSelect__option);
            }.bind(this));
            this.createOptions();
            this.isLoadDistrict = true;
            this.closePreload(location);
            this.districtId = 0;
            $('#districtNewItemSelect').on('select2:select', function(e) {
                debugger;
                let districtId = Number(e.params.data.id);
                this.isDistrictFull = true;
                let positionFilter = 'district';
                this.addNewItem(location, positionFilter, districtId);
            }.bind(this));
        },
        createNewFilterCategories: function(categoryNewItemSelect, location, data) {
            let categoryItemSelect__optionEmpty = this.createElement('option', {
                className: 'districtItemSelect__option'
            });
            categoryNewItemSelect.appendChild(categoryItemSelect__optionEmpty)
            data.forEach(function(el) {
                let categoryItemSelect__option = this.createElement('option', {
                    innerText: el.filterName,
                    value: el.id,
                    className: 'districtItemSelect__option'
                });
                categoryNewItemSelect.appendChild(categoryItemSelect__option);
            }.bind(this));
            this.createOptions();
            this.isLoadCategorie = true;
            this.closePreload(location);
            this.categoryId = 0;
            $('#categoryNewItemSelect').on('select2:select', function(e) {
                let categoryId = Number(e.params.data.id);
                this.isCategorieFull = true;
                let positionFilter = 'category';
                this.addNewItem(location, positionFilter, categoryId);
            }.bind(this));
        },
        /*// this.createNewSelectFiltersItem(items, modalFiltersContainer, type);
        setSavedFiltersIntoContainer: function(itemsData, modalFiltersContainer) {
            const type = itemsData.type;
            for (let i = 0; i < itemsData.data.length; i++) {
                const item = itemsData.data[i];
                const itemSelect = this.createElement('select', {
                    id: item.newSelectId,
                    className: ` selectItem js-example-basic-single js-example-placeholder-${type}`
                });
                let itemSelectWrapper = this.createElement('div', {
                    className: 'itemSelectWrapper'
                }, itemSelect);
                const container = this.createElement('div',{
                    className: `modalFiltersContainer__${type}`
                }, itemSelectWrapper);
                const modalFiltersContainerItem = this.createElement('div', { className: 'modalFiltersContainerItem'}, container);
                modalFiltersContainer.appendChild(modalFiltersContainerItem);
            }
        },
        createNewSelectFiltersItem: function(items, modalFiltersContainer, type) {
            const modalFiltersContainerItem = this.createElement('div', { className: 'modalFiltersContainerItem'});
            modalFiltersContainer.appendChild(modalFiltersContainerItem);
            items.forEach(item => {
                const itemSelectWrapper = this.setNewFiltersIntoContainer(item);
                const container = this.createElement('div',{ className: `modalFiltersContainer__${item.type}`}, itemSelectWrapper);
                modalFiltersContainerItem.appendChild(container);
            });
        },
        setNewFiltersIntoContainer: function(item) {
            const itemSelect = this.createElement('select',
                {
                    id: item.newSelectId,
                    className: ` selectItem js-example-basic-single js-example-placeholder-${item.type}`
                }
            );
            let itemSelectWrapper = this.createElement('div', {className: 'itemSelectWrapper'}, itemSelect);
            const data = this.filterCatalog.find(f => f.type === item.type).data;
            this.createNewFilterSelect(itemSelect, item.type, data);
            return itemSelectWrapper;
        },
        createNewFilterSelect: function(itemSelect, type, data) {
            let emptyOption = this.createElement('option', {
                className: 'districtItemSelect__option'
            });
            itemSelect.appendChild(emptyOption);
            data.forEach(row => {
                const option = this.createElement('option', {
                    innerText: row.filterName,
                    value: row.id,
                    className: 'districtItemSelect__option'
                });
                itemSelect.appendChild(option);
            });
            this.createOptions();
            $('#priorityNewItemSelect').on('select2:select', function(e) {
                this.priorityId = Number(e.params.data.id);
                this.addNewItem(type);
            });
            $('#districtNewItemSelect').on('select2:select', function(e) {
                this.isDistrictFull = true;
                this.districtId = Number(e.params.data.id);
                this.addNewItem(type);
            }.bind(this));
            $('#categoryNewItemSelect').on('select2:select', function(e) {
                this.isDistrictFull = true;
                this.categoryId = Number(e.params.data.id);
                this.addNewItem(type);
            }.bind(this));
        }, */
        addNewItem: function(type) {
            console.log('AddNewItem :' + type);
            if(type === this.districtType) {
                if(this.isCategoryFull && this.isDistrictFull) {
                    this.isCategoryFull = false;
                    this.isDistrictFull = false;
                    const parameters = [
                        { key: '@district_id', value:  this.districtId },
                        { key: '@questiondirection_id', value: this.categoryId }
                    ];
                    this.executeAddNewFilterQuery(type, parameters);
                }
            }else if(type === this.priorityType) {
                this.isCategoryFull = false;
                this.isDistrictFull = false;
                const parameters = [{ key: '@emergensy_id', value:  this.priorityId }];
                this.executeAddNewFilterQuery(type, parameters);
            }
        },
        executeAddNewFilterQuery: function(type, parameters) {
            let executeQueryInsertItem = {
                queryCode: 'h_FilterInsert',
                limit: -1,
                parameterValues: parameters
            };
            this.queryExecutor(executeQueryInsertItem, this.reloadFilters.bind(this, type), this);
            this.showPreloader = false;
        },
        closePreload: function(type) {
            if(type === this.districtType) {
                if (this.isLoadDistrict && this.isLoadCategory) {
                    this.messageService.publish({ name: 'hidePagePreloader'});
                }
            }else if(type === this.priorityType) {
                this.messageService.publish({ name: 'hidePagePreloader'});
            }
        },
        createFilterSelect: function(id, select, data) {
            data.forEach(el => {
                const option = this.createElement('option', {
                    innerText: el.name,
                    value: el.id,
                    className: 'districtItemSelect__option'
                });
                if (id === el.id) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
        },
        createTableWrapper: function() {
            this.tableContainer = this.createElement('div', { id: 'tableContainer', className: 'tableContainer'});
            const tableWrapper = this.createElement('div',
                { id: 'tableWrapper', className: 'tableWrapper'},
                this.tableContainer
            );
            this.executeMainTableQuery();
            return tableWrapper;
        },
        reloadMainTable: function(message) {
            this.removeContainerChildren(this.tableContainer);
            this.executeMainTableQuery(false, null);
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
            const headerItemsWrapper = this.createHeaderItemsWrapper(data.rows[4]);
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
                    className: 'subHeaderColumn'
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
        },
        createOptions: function() {
            $(document).ready(function() {
                $('.js-example-basic-single').select2();
                $('.js-example-placeholder-district').select2({
                    placeholder: 'Обрати район',
                    allowClear: true
                });
                $('.js-example-placeholder-category').select2({
                    placeholder: 'Обрати напрямок робiт',
                    allowClear: true
                });
                $('.js-example-placeholder-priority').select2({
                    placeholder: 'Обрати пріорітет',
                    allowClear: true
                });
            });
        }
    };
}());
