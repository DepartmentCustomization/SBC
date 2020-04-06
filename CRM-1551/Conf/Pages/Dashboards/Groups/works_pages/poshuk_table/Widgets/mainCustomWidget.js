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
        init: function() {
            const msg = {
                name: 'SetFilterPanelState',
                package: {
                    value: true
                }
            };
            this.messageService.publish(msg);
            this.sub = this.messageService.subscribe('filters', this.showApplyFiltersValue, this);
            this.sub1 = this.messageService.subscribe('showModalWIndow', this.showModalWIndow, this);
            this.filterColumns = [];
            this.defaultCheckedItem = [];
        },
        showModalWIndow: function(message) {
            if (this.modalWindowWrapper.style.display === this.displayNone) {
                this.modalWindowWrapper.style.display = this.displayBlock;
                const button = message.button;
                switch (button) {
                case 'gear':
                    this.createButtons(this.gearSaveMethod.bind(this), this.hideModalWindow.bind(this));
                    this.appendModalWindow();
                    this.createFilterElements();
                    break;
                case 'saveFilters':
                    this.createButtons(this.saveNewFiltersGroup.bind(this), this.hideModalWindow.bind(this));
                    this.appendModalWindow();
                    this.createFiltersGroupName();
                    break;
                case 'showFilters':
                    this.createButtons(this.saveMyFilters.bind(this), this.hideModalWindow.bind(this));
                    this.appendModalWindow();
                    /*this.executeQuerySavedFilers();*/
                    this.showSavedFiltersGroup();
                    break;
                default:
                    break;
                }
            }
        },
        appendModalWindow() {
            this.container.appendChild(this.modalWindowWrapper);
        },
        afterViewInit: function() {
            this.container = document.getElementById('container');
            this.createModalWindow();
            this.createSelectedFiltersContainer();
        },
        createFiltersGroupName: function() {
            const newFilterNameInput = this.createElement('input', { id: 'newFilterNameInput', placeholder: 'Внеесіть назву'});
            this.modalWindow.appendChild(newFilterNameInput);
        },
        fillSelectedFiltersValues: function(name) {
            const package = [];
            this.selectedFilters.forEach(filter => {
                package.push({
                    value: filter.value,
                    type: filter.type,
                    placeholder: filter.placeholder,
                    viewValue: this.setFilterViewValues(filter),
                    name: filter.name,
                    timePosition: filter.timePosition
                })
            })
            return { name, package }
        },
        saveNewFiltersGroup: function() {
            const name = document.getElementById('newFilterNameInput').value;
            if (name !== '') {
                const filterJson = JSON.stringify(this.fillSelectedFiltersValues(name));
                this.executeSaveFilterGroup(name, filterJson);
                this.hideModalWindow();
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
            this.queryExecutor(executeQuery, this.hideModalWindow, this);
            this.showPreloader = false;
        },
        showFiltersGroup: function() {
        },
        createModalWindow() {
            this.modalWindow = this.createElement('div', { id:'modalWindow', className: 'modalWindow'});
            this.modalWindowWrapper = this.createElement('div', {
                id:'modalWindowWrapper',
                className: 'modalWindowWrapper'
            }, this.modalWindow);
            this.modalWindowWrapper.style.display = this.displayNone;
        },
        setFilterViewValues: function(filter) {
            const viewValue = this.getSelectFilterViewValuesObject(filter);
            return `${viewValue.title} : ${viewValue.value}`;
        },
        checkItems: function() {
            let elements = this.filterColumns;
            elements.forEach(e => {
                document.getElementById(e.displayValue).checked = true;
            });
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
        createButtons(saveMethod, exitMethod) {
            const modalBtnSave = this.createElement('button', {
                id:'modalBtnSave',
                className: 'btn',
                innerText: 'Зберегти'
            });
            const modalBtnExit = this.createElement('button', {
                id:'modalBtnExit',
                className: 'btn',
                innerText: 'Вийти'
            });
            const modalBtnWrapper = this.createElement('div',
                {
                    id:'modalBtnWrapper',
                    className: 'modalBtnWrapper'
                },
                modalBtnSave, modalBtnExit
            );
            modalBtnExit.addEventListener('click', () =>{
                exitMethod();
            });
            modalBtnSave.addEventListener('click', () => {
                saveMethod();
            });
            this.modalWindow.appendChild(modalBtnWrapper);
        },
        hideModalWindow() {
            this.clearContainer(this.modalWindow);
            this.modalWindowWrapper.style.display = this.displayNone;
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
        getSelectFilterViewValuesObject(filter) {
            const obj = {}
            switch(filter.operation) {
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
        setSelectedFiltersViewValues: function() {
            const filtersBox = [];
            this.selectedFilters.forEach(filter => {
                filtersBox.push(this.getSelectFilterViewValuesObject(filter));
            });
            return filtersBox
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
            switch(operation) {
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
            return dd + '-' + mm + '-' + yyyy;
        },
        clearContainer(container) {
            while(container.hasChildNodes()) {
                container.removeChild(container.lastElementChild);
            }
        },
        destroy: function() {
            this.sub.unsubscribe();
            this.sub1.unsubscribe();
        }
    };
}());
