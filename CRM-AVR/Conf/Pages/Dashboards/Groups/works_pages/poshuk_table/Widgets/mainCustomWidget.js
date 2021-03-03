(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `
                    <div id='container' ></div>
                    `
        ,
        displayNone: 'none',
        displayBlock: 'block',
        init: async function() {
            this.FiltersPackageHelper = await import('/modules/Helpers/Filters/FiltersPackageHelper.js');
            this.executeQueryShowUserFilterGroups();
            this.setGlobalFilterPanelVisibility(true);
            this.subscribers.push(this.messageService.subscribe('filters', this.showApplyFiltersValue, this));
            this.subscribers.push(this.messageService.subscribe('showModalWindow', this.showModalWindow, this));
            this.filterColumns = [];
            this.defaultCheckedItem = [];
        },
        executeQueryShowUserFilterGroups: function() {
            let executeQuery = {
                queryCode: 'SearchTableFilters_SRows',
                limit: -1,
                parameterValues: [
                    { key: '@pageOffsetRows', value: 0 },
                    { key: '@pageLimitRows', value: 10 }
                ]
            };
            this.queryExecutor(executeQuery, this.setUserFilterGroups, this);
            this.showPreloader = false;
        },
        setUserFilterGroups: function(groups) {
            this.userFilterGroups = [];
            groups.rows.forEach(group => {
                const indexOfId = 0;
                const indexOfName = 1;
                const indexOfFilters = 2;
                this.userFilterGroups.push({
                    id: group.values[indexOfId],
                    name: group.values[indexOfName],
                    filters: JSON.parse(group.values[indexOfFilters])
                });
            });
            this.hidePagePreloader();
        },
        clearUserFilterGroups: function() {
            this.userFilterGroups = [];
        },
        afterViewInit: function() {
            this.container = document.getElementById('container');
            this.createModalWindow();
            this.createSelectedFiltersContainer();
        },
        createModalWindow() {
            this.modalWindow = this.createElement('div', { id:'modalWindow', className: 'modalWindow'});
            this.modalWindowWrapper = this.createElement('div', {
                id:'modalWindowWrapper',
                className: 'modalWindowWrapper'
            }, this.modalWindow);
            this.modalWindowWrapper.style.display = this.displayNone;
        },
        createSelectedFiltersContainer() {
            this.selectedFiltersContainer = this.createElement('div',
                {
                    id:'selectedFiltersContainer',
                    className: 'selectedFiltersContainer'
                }
            );
            this.container.appendChild(this.selectedFiltersContainer);
        },
        showModalWindow: function(message) {
            if (this.modalWindowWrapper.style.display === this.displayNone) {
                this.modalWindowWrapper.style.display = this.displayBlock;
                const button = message.button;
                switch (button) {
                    case 'gear': {
                        const createSAveBtn = true;
                        this.createButtons(createSAveBtn, this.gearSaveMethod.bind(this));
                        this.appendModalWindow();
                        this.createFilterElements();
                        break;
                    }
                    case 'saveFilters': {
                        const createSAveBtn = true;
                        this.createButtons(createSAveBtn, this.saveNewFiltersGroup.bind(this));
                        this.appendModalWindow();
                        this.createFiltersGroupNameInput();
                        break;
                    }
                    case 'showFilters': {
                        const createSAveBtn = false;
                        this.createButtons(createSAveBtn);
                        this.appendModalWindow();
                        this.showUserFilterGroups();
                        break;
                    }
                    default:
                        break;
                }
            }
        },
        createButtons(createSAveBtn, saveMethod) {
            const modalBtnWrapper = this.createElement('div',
                {
                    id:'modalBtnWrapper',
                    className: 'modalBtnWrapper'
                }
            );
            if (createSAveBtn) {
                const modalBtnSave = this.createElement('button', {
                    id:'modalBtnSave',
                    className: 'btn',
                    innerText: 'Зберегти'
                });
                modalBtnSave.addEventListener('click', () => {
                    saveMethod();
                });
                modalBtnWrapper.appendChild(modalBtnSave);
            }
            const modalBtnExit = this.createElement('button', {
                id:'modalBtnExit',
                className: 'btn',
                innerText: 'Вийти'
            });
            modalBtnExit.addEventListener('click', () =>{
                this.hideModalWindow();
            });
            modalBtnWrapper.appendChild(modalBtnExit);
            this.modalWindow.appendChild(modalBtnWrapper);
        },
        appendModalWindow() {
            this.container.appendChild(this.modalWindowWrapper);
        },
        createFiltersGroupNameInput: function() {
            const newFilterNameInput = this.createElement('input', { id: 'newFilterNameInput', placeholder: 'Внесіть назву'});
            this.modalWindow.appendChild(newFilterNameInput);
        },
        saveNewFiltersGroup: function() {
            const name = document.getElementById('newFilterNameInput').value;
            if (name !== '') {
                this.showMyPagePreloader();
                const filterJson = JSON.stringify(this.getFiltersGroupPackage());
                this.hideModalWindow();
                this.executeSaveFilterGroup(name, filterJson);
            }
        },
        executeSaveFilterGroup: function(name, filterJson) {
            let executeQuery = {
                queryCode: 'SearchTableFilters_IRow',
                limit: -1,
                parameterValues: [
                    { key: '@filter_name', value: name },
                    { key: '@filters', value: filterJson }
                ]
            };
            this.queryExecutor(executeQuery, this.afterAddFilterGroup, this);
            this.showPreloader = false;
        },
        afterAddFilterGroup: function() {
            this.executeQueryShowUserFilterGroups();
        },
        getFiltersGroupPackage: function() {
            const filterPackage = [];
            this.selectedFilters.forEach(filter => {
                filterPackage.push({
                    value: filter.value,
                    type: filter.type,
                    placeholder: filter.placeholder,
                    viewValue: this.getSelectFilterViewValuesObject(filter).value,
                    displayValue: this.setFilterViewValues(filter),
                    name: filter.name,
                    timePosition: filter.timePosition
                });
            });
            return filterPackage;
        },
        showUserFilterGroups: function() {
            const userFiltersGroupContainer = this.createUserFilterGroupsContainer();
            this.modalWindow.appendChild(userFiltersGroupContainer);
        },
        createUserFilterGroupsContainer: function() {
            const userFilterGroupsWrapper = this.createElement('div',
                {
                    className: 'userFilterGroupsWrapper'
                }
            );
            this.userFilterGroups.forEach(userFilterGroup => {
                const groupFiltersList = this.createGroupFiltersList(userFilterGroup.filters, userFilterGroup.id);
                const groupName = this.createElement('input',
                    {value: userFilterGroup.name, className: 'userFilterGroupName', disabled: true, groupId: userFilterGroup.id}
                );
                groupName.addEventListener('keypress', event => {
                    const key = event.which || event.keyCode;
                    const target = event.currentTarget;
                    const groupId = target.groupId;
                    const name = target.value;
                    if (key === 13) {
                        target.disabled = !target.disabled;
                        groupEditBtn.edit = !groupEditBtn.edit;
                        this.showMyPagePreloader();
                        this.executeQueryChangeName(groupId, name);
                    }
                });
                const displayBtn = this.createElement('div',
                    {className: 'displayBtn groupBtn fa fa-arrow-down', groupId: userFilterGroup.id, status: 'none'}
                );
                displayBtn.addEventListener('click', event => {
                    const target = event.currentTarget;
                    target.status = target.status === 'none' ? 'block' : 'none';
                    target.classList.remove(target.classList[3]);
                    target.classList.add(this.changeDisplayBtnIcon(target.status));
                    document.getElementById(`userFiltersListWrapper${target.groupId}`).style.display = target.status;
                });
                const groupSetFiltersBtn = this.createElement('div',
                    {
                        className: 'groupEditBtn groupBtn fa fa-arrow-right', groupId: userFilterGroup.id
                    }
                );
                groupSetFiltersBtn.addEventListener('click', event => {
                    const target = event.currentTarget;
                    const groupId = target.groupId;
                    this.showMyPagePreloader();
                    this.restoreFilters(groupId);
                });
                const groupEditBtn = this.createElement('div', {className: 'groupEditBtn groupBtn fa fa-edit', edit: false});
                groupEditBtn.addEventListener('click', event => {
                    const target = event.currentTarget;
                    target.edit = !target.edit;
                    groupName.disabled = !groupName.disabled;
                });
                const groupDeleteBtn = this.createElement('div',
                    {className: 'groupDeleteBtn groupBtn fa fa-trash', groupId: userFilterGroup.id}
                );
                groupDeleteBtn.addEventListener('click', event => {
                    const target = event.currentTarget;
                    const result = confirm(`Бажаєте видалити фільтр ${groupName.value}?`);
                    if (result) {
                        const groupId = target.groupId;
                        userFilterGroupsWrapper.removeChild(document.getElementById(`groupId${groupId}`));
                        this.showMyPagePreloader();
                        this.executeQueryDeleteFilterGroup(groupId);
                    }
                });
                const groupHeader = this.createElement('div',
                    {className: 'groupHeader'},
                    displayBtn, groupName, groupSetFiltersBtn, groupEditBtn, groupDeleteBtn
                );
                const group = this.createElement('div',
                    {id: `groupId${userFilterGroup.id}`, className: 'userFilterGroup'},
                    groupHeader, groupFiltersList
                );
                userFilterGroupsWrapper.appendChild(group);
            });
            return userFilterGroupsWrapper;
        },
        changeDisplayBtnIcon: function(status) {
            return status === 'none' ? 'fa-arrow-down' : 'fa-arrow-up';
        },
        createGroupFiltersList: function(filtersList, id) {
            const userFiltersListWrapper = this.createElement('div',
                {
                    id: `userFiltersListWrapper${id}`,
                    className: 'userFiltersListWrapper',
                    style: 'display: none'
                }
            );
            filtersList.forEach(listItem => {
                const filter = this.createElement('div',
                    {
                        className: 'userFilter',
                        innerText: listItem.displayValue,
                        value: listItem.value,
                        type: listItem.type,
                        placeholder: listItem.placeholder,
                        name: listItem.name,
                        timePosition: listItem.timePosition
                    }
                );
                userFiltersListWrapper.appendChild(filter);
            });
            return userFiltersListWrapper;
        },
        executeQueryChangeName: function(id, name) {
            let executeQuery = {
                queryCode: 'SearchTableFilters_UName',
                limit: -1,
                parameterValues: [
                    { key: '@Id', value: id },
                    { key: '@filter_name', value: name }
                ]
            };
            this.queryExecutor(executeQuery, this.executeQueryShowUserFilterGroups, this);
            this.showPreloader = false;
        },
        executeQueryDeleteFilterGroup: function(id) {
            let executeQuery = {
                queryCode: 'SearchTableFilters_DRow',
                limit: -1,
                parameterValues: [
                    { key: '@Id', value: id }
                ]
            };
            this.queryExecutor(executeQuery, this.executeQueryShowUserFilterGroups, this);
            this.showPreloader = false;
        },
        restoreFilters: function(id) {
            this.setGlobalFilterPanelVisibility(true);
            const filters = this.userFilterGroups.find(f => f.id === id).filters;
            const FiltersPackageHelper = new this.FiltersPackageHelper.FiltersPackageHelper();
            const filtersPackage = FiltersPackageHelper.getFiltersPackage(filters);
            this.clearAllFilter();
            this.applyFilters(filtersPackage);
            this.hideModalWindow();
            this.hidePagePreloader();
        },
        setGlobalFilterPanelVisibility: function(state) {
            const msg = {
                name: 'SetFilterPanelState',
                package: {
                    value: state
                }
            };
            this.messageService.publish(msg);
        },
        setFilterViewValues: function(filter) {
            const viewValue = this.getSelectFilterViewValuesObject(filter);
            return `${viewValue.title} : ${viewValue.value}`;
        },
        createFilterElements: function() {
            const group1__title = this.createElement('div', {
                className: 'group1__title groupTitle material-icons',
                innerText: 'view_stream Заявки'
            });
            const group2__title = this.createElement('div', {
                className: 'group1__title groupTitle material-icons',
                innerText: 'view_stream Місце'
            });
            const group3__title = this.createElement('div', {
                className: 'group1__title groupTitle material-icons',
                innerText: 'view_stream Заявник'
            });
            const group4__title = this.createElement('div', {
                className: 'group1__title groupTitle material-icons',
                innerText: 'view_stream Скарги'
            });
            const group5__title = this.createElement('div', {
                className: 'group1__title groupTitle material-icons',
                innerText: 'view_stream'
            });
            const group1__element1_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 150,
                value: 'Plan_start_date',
                id: 'Plan_start_date'
            });
            const group1__element1_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Планова дата початку'
            });
            const group1__element1 = this.createElement('div', {
                className: 'group__element'
            }, group1__element1_checkBox, group1__element1_title);
            const group1__element5_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 150,
                value: 'Plan_finish_at',
                id: 'Plan_finish_at'
            });
            const group1__element5_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Планова дата завершення'
            });
            const group1__element5 = this.createElement('div', {
                className: 'group__element'
            }, group1__element5_checkBox, group1__element5_title);
            const group1__element2_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 250,
                value: 'Claim_class_name',
                id: 'Claim_class_name'
            });
            const group1__element2_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Клас заявки'
            });
            const group1__element2 = this.createElement('div', {
                className: 'group__element'
            }, group1__element2_checkBox, group1__element2_title);
            const group1__element3_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 120,
                value: 'Diameter_size',
                id: 'Diameter_size'
            });
            const group1__element3_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Діаметр'
            });
            /*
            const group1__element3 = this.createElement('div', {
                className: 'group__element'
            }, group1__element3_checkBox, group1__element3_title);
            const group1__element4_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 190,
                value: 'Main_District_Name',
                id: 'Main_District_Name'
            });
            const group1__element4_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Район головного місця'
            });
            const group1__element4 = this.createElement('div', {
                className: 'group__element'
            }, group1__element4_checkBox, group1__element4_title);
            const group1__element6_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 190,
                value: 'Main_Place_Type_Name',
                id: 'Main_Place_Type_Name'
            });
            const group1__element6_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Тип головного місця'
            });
            const group1__element6 = this.createElement('div', {
                className: 'group__element'
            }, group1__element6_checkBox, group1__element6_title);
            const group1__element7_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 190,
                value: 'Flats_Name',
                id: 'Flats_Name'
            });
            const group1__element7_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Номер квартири'
            });
            const group1__element7 = this.createElement('div', {
                className: 'group__element'
            }, group1__element7_checkBox, group1__element7_title);
            */
            const group1__element8_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 600,
                value: 'claim_Description',
                id: 'claim_Description'
            });
            const group1__element8_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Опис'
            });
            const group1__element8 = this.createElement('div', {
                className: 'group__element'
            }, group1__element8_checkBox, group1__element8_title);
            const group1__element9_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 100,
                value: 'claim_Priority',
                id: 'claim_Priority'
            });
            const group1__element9_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Пріоритет заявки'
            });
            const group1__element9 = this.createElement('div', {
                className: 'group__element'
            }, group1__element9_checkBox, group1__element9_title);
            const group1__element10_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 200,
                value: 'claim_is_not_balans',
                id: 'claim_is_not_balans'
            });
            const group1__element10_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Позабалансова'
            });
            const group1__element10 = this.createElement('div', {
                className: 'group__element'
            }, group1__element10_checkBox, group1__element10_title);
            const group1__element11_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 300,
                value: 'main_action_type',
                id: 'main_action_type'
            });
            const group1__element11_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Головний тип роботи'
            });
            const group1__element11 = this.createElement('div', {
                className: 'group__element'
            }, group1__element11_checkBox, group1__element11_title);
            const group1__element12_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 800,
                value: 'User_Closed_By',
                id: 'User_Closed_By'
            });
            const group1__element12_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Закрив'
            });
            const group1__element12 = this.createElement('div', {
                className: 'group__element'
            }, group1__element12_checkBox, group1__element12_title);
            const group1__element13_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 300,
                value: 'Executor_Name',
                id: 'Executor_Name'
            });
            const group1__element13_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Виконавець'
            });
            const group1__element13 = this.createElement('div', {
                className: 'group__element'
            }, group1__element13_checkBox, group1__element13_title);
            const group1__element14_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 200,
                value: 'Contact_insp_phone',
                id: 'Contact_insp_phone'
            });
            const group1__element14_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Телефон виконавця'
            });
            const group1__element14 = this.createElement('div', {
                className: 'group__element'
            }, group1__element14_checkBox, group1__element14_title);

            const group1__element15_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: ''
            });
            const group1__element15 = this.createElement('div', {
                className: 'group__element'
            }, group1__element15_title);

            const group1__element16_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: ''
            });
            const group1__element16 = this.createElement('div', {
                className: 'group__element'
            }, group1__element16_title);

            const group1__element17_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 200,
                value: 'Result_Row',
                id: 'Result_Row'
            });
            const group1__element17_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Додати підсумковий рядок'
            });
            const group1__element17 = this.createElement('div', {
                className: 'group__element'
            }, group1__element17_checkBox, group1__element17_title);

            const group1__container = this.createElement('div', {
                className: 'groupContainer'
            }, group1__title, group1__element1, group1__element5, group1__element2, group1__element8, group1__element9, group1__element10, group1__element11, group1__element12, group1__element13, group1__element14, group1__element15, group1__element16, group1__element17);
            
            const group2__element2_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 250,
                value: 'Main_District_Name',
                id: 'Main_District_Name'
            });
            const group2__element2_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Район головного місця'
            });
            const group2__element2 = this.createElement('div', {
                className: 'group__element'
            }, group2__element2_checkBox, group2__element2_title);
            const group2__element4_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 250,
                value: 'Main_Place_Type_Name',
                id: 'Main_Place_Type_Name'
            });
            const group2__element4_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Тип головного місця'
            });
            const group2__element4 = this.createElement('div', {
                className: 'group__element'
            }, group2__element4_checkBox, group2__element4_title);
            const group2__element6_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 200,
                value: 'Flats_Name',
                id: 'Flats_Name'
            });
            const group2__element6_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Номер квартири'
            });
            const group2__element6 = this.createElement('div', {
                className: 'group__element'
            }, group2__element6_checkBox, group2__element6_title);
            const group2__container = this.createElement('div', {
                className: 'groupContainer'
            },
            group1__title, group2__element2, group2__element4, group2__element6);
            
            const group3__element1_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 200,
                value: 'Contact_Type_Name',
                id: 'Contact_Type_Name'
            });
            const group3__element1_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Тип заявника'
            });
            const group3__element1 = this.createElement('div', {
                className: 'group__element'
            }, group3__element1_checkBox, group3__element1_title);
            const group3__element2_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 200,
                value: 'Contact_Name',
                id: 'Contact_Name'
            });
            const group3__element2_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'ПІБ заявника'
            });
            const group3__element2 = this.createElement('div', {
                className: 'group__element'
            }, group3__element2_checkBox, group3__element2_title);
            const group3__element3_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 150,
                value: 'Sked',
                id: 'Sked'
            });
            const group3__element3_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Згідно графіку'
            });
            const group3__element3 = this.createElement('div', {
                className: 'group__element'
            }, group3__element3_checkBox, group3__element3_title);
            const group3__element4_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 150,
                value: 'TU',
                id: 'TU'
            });
            const group3__element4_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'По ТУ'
            });
            const group3__element4 = this.createElement('div', {
                className: 'group__element'
            }, group3__element4_checkBox, group3__element4_title);
            const group3__element6_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 150,
                value: 'TU_Id',
                id: 'TU_Id'
            });
            const group3__element6_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Замовник'
            });
            const group3__element6 = this.createElement('div', {
                className: 'group__element'
            }, group3__element6_checkBox, group3__element6_title);
            const group3__element7_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 200,
                value: 'Letter',
                id: 'Letter'
            });
            const group3__element7_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'За листом'
            });
            const group3__element7 = this.createElement('div', {
                className: 'group__element'
            }, group3__element7_checkBox, group3__element7_title);
            const group3__element8_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 300,
                value: 'L_Contacts_Id',
                id: 'L_Contacts_Id'
            });
            const group3__element8_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Юридична/фізична особа'
            });
            const group3__element8 = this.createElement('div', {
                className: 'group__element'
            }, group3__element8_checkBox, group3__element8_title);
            const group3__element9_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 300,
                value: 'Contact_Org',
                id: 'Contact_Org'
            });
            const group3__element9_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Організація заявника'
            });
            const group3__element9 = this.createElement('div', {
                className: 'group__element'
            }, group3__element9_checkBox, group3__element9_title);
            const group3__element10_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 300,
                value: 'Contact_Department',
                id: 'Contact_Department'
            });
            const group3__element10_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Департамент заявника'
            });
            const group3__element10 = this.createElement('div', {
                className: 'group__element'
            }, group3__element10_checkBox, group3__element10_title);
            const group3__element11_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 300,
                value: 'Contact_Sub_Department',
                id: 'Contact_Sub_Department'
            });
            const group3__element11_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Підрозділ заявника'
            });
            const group3__element11 = this.createElement('div', {
                className: 'group__element'
            }, group3__element11_checkBox, group3__element11_title);
            const group3__element12_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 250,
                value: 'contact_phone',
                id: 'contact_phone'
            });
            const group3__element12_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Телефон заявника'
            });
            const group3__element12 = this.createElement('div', {
                className: 'group__element'
            }, group3__element12_checkBox, group3__element12_title);
            const group3__container = this.createElement('div', {
                className: 'groupContainer'
            }, group1__title, group3__element1, group3__element2, group3__element9, group3__element10, group3__element11, group3__element12, group3__element3, group3__element4, group3__element6, group3__element7, group3__element8);
            
            const group4__element1_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 250,
                value: 'Gravamen',
                id: 'Gravamen'
            });
            const group4__element1_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Скарга'
            });
            const group4__element1 = this.createElement('div', {
                className: 'group__element'
            }, group4__element1_checkBox, group4__element1_title);
            const group4__element2_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 250,
                value: 'G_Left',
                id: 'G_Left'
            });
            const group4__element2_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'Признак'
            });
            const group4__element2 = this.createElement('div', {
                className: 'group__element'
            }, group4__element2_checkBox, group4__element2_title);
            const group4__element3_checkBox = this.createElement('input', {
                type: 'checkbox',
                className: 'group__element_checkBox',
                columnWidth: 250,
                value: 'G_PIB',
                id: 'G_PIB'
            });
            const group4__element3_title = this.createElement('div', {
                className: 'group__element_title',
                innerText: 'ПІБ скаржника'
            });
            const group4__element3 = this.createElement('div', {
                className: 'group__element'
            }, group4__element3_checkBox, group4__element3_title);

            const group4__container = this.createElement('div', {
                className: 'groupContainer'
            }, group1__title, group4__element1, group4__element2, group4__element3);
            
            const group1 = this.createElement('div', {
                id:'group1',
                className: 'group1'
            }, group1__title, group1__container);
            const group2 = this.createElement('div', {
                id:'group2',
                className: 'group2'
            }, group2__title, group2__container);
            const group3 = this.createElement('div', {
                id:'group3',
                className: 'group3'
            }, group3__title, group3__container);
            const group4 = this.createElement('div', {
                id:'group4',
                className: 'group4'
            }, group4__title, group4__container);

            const groupsContainer = this.createElement('div', {
                id:'groupsContainer',
                className: 'groupsContainer'
            }, group1, group2, group3, group4);
            this.modalWindow.appendChild(groupsContainer);
            this.defaultCheckedItem.forEach(e => document.getElementById(e.displayValue).checked = true);
            this.checkItems();
        },
        checkItems: function() {
            let elements = this.filterColumns;
            elements.forEach(e => {
                document.getElementById(e.displayValue).checked = true;
            });
        },
        gearSaveMethod() {
            this.defaultCheckedItem = [];
            this.filterColumns = [];
            const checkedElements = Array.from(document.querySelectorAll('.group__element'));
            checkedElements.forEach(el => {
                if(el.firstElementChild.checked) {
                    const width = Number(el.firstElementChild.columnWidth);
                    const displayValue = el.firstElementChild.value;
                    const caption = el.lastElementChild.innerText;
                    const obj = { displayValue, caption, width }
                    this.filterColumns.push(obj);
                }
            });
            this.messageService.publish({
                name: 'findFilterColumns',
                value: this.filterColumns
            });
            this.hideModalWindow(this);
        },
        showApplyFiltersValue: function(message) {
            this.selectedFilters = message.filters;
            this.clearContainer(this.selectedFiltersContainer);
            const filtersBox = this.setSelectedFiltersViewValues();
            this.createFilterBox(filtersBox);
        },
        setSelectedFiltersViewValues: function() {
            const filtersBox = [];
            this.selectedFilters.forEach(filter => {
                filtersBox.push(this.getSelectFilterViewValuesObject(filter));
            });
            return filtersBox
        },
        getSelectFilterViewValuesObject(filter) {
            const obj = {}
            switch (filter.operation) {
                case true:
                case '=':
                    obj.title = filter.placeholder;
                    obj.value = 'Наявнiсть'
                    break;
                case 'like':
                    obj.title = filter.placeholder;
                    obj.value = filter.value
                    break;
                case '===':
                case '==':
                case 'in':
                case '+""+':
                    obj.title = filter.placeholder;
                    obj.value = filter.viewValue
                    break
                default:
                    obj.title = this.operation(filter.operation, filter.placeholder);
                    obj.value = this.changeDateValue(filter.value);
                    break;
            }
            return obj;
        },
        createFilterBox: function(filtersBox) {
            for(let i = 0; i < filtersBox.length; i++) {
                let el = filtersBox[i];
                let filterBox__value = this.createElement('div', {
                    className: 'filterBox__value tooltip',
                    title: el.value,
                    innerText: el.value
                });
                let filterBox__title = this.createElement('div', {
                    className: 'filterBox__title',
                    innerText: el.title + ' : '
                });
                let filterBox = this.createElement('div', {
                    className: 'filterBox'
                }, filterBox__title, filterBox__value);
                this.selectedFiltersContainer.appendChild(filterBox);
            }
        },
        operation: function(operation, title) {
            let result = title;
            switch (operation) {
                case '>=':
                    result = title + ' з'
                    break;
                case '<=':
                    result = title + ' по'
                    break;
                default:
                    break;
            }
            return result;
        },
        changeDateValue: function(date) {
            let dd = date.getDate().toString();
            let mm = (date.getMonth() + 1).toString();
            let yyyy = date.getFullYear().toString();
            dd = dd.length === 1 ? '0' + dd : dd;
            mm = mm.length === 1 ? '0' + mm : mm;
            return `${dd}-${mm}-${yyyy}`;
        },
        hideModalWindow() {
            this.clearContainer(this.modalWindow);
            this.modalWindowWrapper.style.display = this.displayNone;
        },
        clearContainer(container) {
            while(container.hasChildNodes()) {
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
        showMyPagePreloader: function() {
            this.showPagePreloader('Зачекайте, застосовуються зміни');
        }
    };
}());
