(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        customConfig:
                `
                    <div id='container'></div>
                `
        ,
        column: null,
        navigator: null,
        targetId: null,
        emptyString: '',
        tabs: [
            {
                id: 'control_of_the_inspector_sector',
                url: 'control_of_the_inspector_sector',
                titleText: 'Контроль сектору інспектора'
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
                name: 'inWork',
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
                name: 'checked',
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
                name: 'onRefinement',
                id: 'headerItem__onRefinement',
                innerText: 'На доопрацювання',
                colorIndex: 5,
                backgroundColor: 'rgb(94, 202, 162)'
            },
            {
                name: 'planOrProgram',
                id: 'headerItem__planOrProgram',
                innerText: 'План\\Програма',
                colorIndex: 6,
                backgroundColor:  'rgb(73, 155, 199)'
            }
        ],
        init: function() {
            this.messageService.publish({ name: 'showPagePreloader' });
            const header1 = document.getElementById('header1');
            header1.parentElement.style.flexFlow = 'column nowrap';
            header1.firstElementChild.style.overflow = 'visible';
            header1.firstElementChild.firstElementChild.firstElementChild.style.overflow = 'visible';
            this.subscribers.push(this.messageService.subscribe('reloadMainTable', this.reloadMainTable, this));
            let executeQueryOrganizations = {
                queryCode: 'table3',
                limit: -1,
                parameterValues: [ { key: '@organization_id', value: 1 } ]
            };
            this.queryExecutor(executeQueryOrganizations, this.createInfoTable.bind(this, false, null), this);
            this.showPreloader = false;
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
        afterViewInit: function() {
            this.container = document.getElementById('container')
            const tabsWrapper = this.createElement('div', { id: 'tabsWrapper', className: 'tabsWrapper'});
            const filtersWrapper = this.createElement('div', { id: 'filtersWrapper', className: 'filtersWrapper'});
            const tableContainer = this.createElement('div', { id: 'tableContainer', className: 'tableContainer'});
            this.createElement('div', { id: 'tableWrapper', className: 'tableWrapper'}, tableContainer);
            this.container.appendChild(tabsWrapper);
            this.container.appendChild(filtersWrapper);
            this.createTabs(tabsWrapper);
            this.createFilters();
        },
        createTabs: function(tabsWrapper) {
            const tabsContainer = this.createElement('div',
                { id: 'tabsContainer', className: 'tabsContainer'}
            );
            tabsWrapper.appendChild(tabsContainer);
            this.tabs.forEach(tab => {
                let itemTitle = this.createElement('div', { className: 'tabAction tab_title', innerText: tab.titleText });
                const item = this.createElement('div',
                    { id: 'tabAction', url: 'performer_new_actions', className: 'tabAction tab tabTo tabHover' },
                    itemTitle
                );
                item.addEventListener('click', () => {
                });
                tabsContainer.appendChild(item);
            });
        },
        createFilters: function() {
            this.organizationName = this.createElement('div', {id: 'organizationName', innerText: this.emptyString});
            this.organizationChildCat = this.createElement('div',{id:'organizationChildCat', innerText: this.emptyString});
            const searchContainer__input = this.createElement('input',
                {
                    id: 'searchContainer__input',
                    type: 'search',
                    placeholder: 'Пошук доручення за номером',
                    className: 'searchContainer__input'
                }
            );
            const searchContainer = this.createElement('div',
                {
                    id: 'searchContainer',
                    className: 'searchContainer'
                },
                searchContainer__input
            );
            searchContainer__input.addEventListener('input', () => {
                if(searchContainer__input.value.length === 0) {
                    this.resultSearch('clearInput', 0);
                    this.setInfoTableVisibility(searchContainer__input);
                }
            });
            searchContainer__input.addEventListener('keypress', function(e) {
                let key = e.which || e.keyCode;
                if (key === 13) {
                    let orgContainer = document.getElementById('orgContainer');
                    orgContainer.style.display = 'none';
                    this.resultSearch('resultSearch', searchContainer__input.value);
                    this.resultSearch('clickOnInfoTable', 'none');
                    let headerItems = document.querySelectorAll('.headerItem');
                    headerItems = Array.from(headerItems);
                    headerItems.forEach(el => {
                        el.classList.add('check');
                    });
                }
            }.bind(this));
            let filtersWrapper = document.getElementById('filtersWrapper');
            filtersWrapper.appendChild(this.organizationName);
            filtersWrapper.appendChild(this.organizationChildCat);
            filtersWrapper.appendChild(searchContainer);
            this.setOrganizationName('defaultOrganizationName');
        },
        setOrganizationChildCat: function(value) {
            this.organizationChildCat.innerText = value;
        },
        clearOrganizationChildCat: function() {
            this.organizationChildCat.innerText = this.emptyString;
        },
        setOrganizationName: function(value) {
            this.organizationName.innerText = value;
        },
        clearOrganizationName: function() {
            this.organizationName.innerText = this.emptyString;
        },
        reloadMainTable: function(message) {
            document.getElementById('container').removeChild(document.getElementById('orgHeader'));
            document.getElementById('container').removeChild(document.getElementById('orgContainer'));
            this.column = message.column;
            this.navigator = message.navigator;
            let targetId = message.targetId;
            let executeQueryOrganizations = {
                queryCode: 'table3',
                limit: -1,
                parameterValues: [ { key: '@organization_id', value: 1 } ]
            };
            this.queryExecutor(executeQueryOrganizations, this.createInfoTable.bind(this, true, targetId), this);
            this.showPreloader = false;
        },
        createInfoTable: function(isReload, targetId, data) {
            this.createInspectorOrganizationsHeaders();
            this.createInspectorOrganizations(isReload, targetId, data);
            this.messageService.publish({ name: 'hidePagePreloader' });
        },
        createInspectorOrganizationsHeaders: function() {
            const headerItems = this.createElement('div',
                {
                    id: 'headerItems',
                    className: 'displayFlex'
                }
            );
            const headerTitle = this.createElement('div', { id: 'headerTitle', innerText: 'Підлеглі організації'});
            const orgHeader = this.createElement('div',
                {
                    id: 'orgHeader',
                    className: 'orgContainer displayFlex'
                },
                headerTitle, headerItems
            );
            this.container.appendChild(orgHeader);
            this.headerItems = [];
            this.headers.forEach(headerStatus => {
                const triangle = this.createElement('div', { className: `${headerStatus.name}_triangle` });
                const headerItem = this.createElement('div',
                    {
                        id: `${headerStatus.id}`,
                        name: `${headerStatus.name}`,
                        className: 'headerItem displayFlex',
                        innerText: `${headerStatus.innerText}`,
                        style: `background-color: ${headerStatus.backgroundColor}`,
                        colorIndex: `${headerStatus.colorIndex}`
                    },
                    triangle
                );
                headerItem.addEventListener('click', event => {
                    let target = event.currentTarget;
                    let navigator = 'Усі';
                    let column = target.innerText;
                    this.setInfoTableVisibility(target, column, navigator, undefined,'headers');
                });
                this.headerItems.push(headerItem);
                headerItems.appendChild(headerItem);
            });
        },
        createInspectorOrganizations: function(isReload, targetId, data) {
            if (isReload) {
                let target = document.getElementById(targetId);
                let thisName = document.getElementById('organizationName').innerText;
                this.setInfoTableVisibility(target, this.column, this.navigator, thisName ,'item');
            }
            this.orgContainer = this.createElement('div', { id: 'orgContainer', className: 'orgContainer'});
            this.container.appendChild(this.orgContainer);
            if (data.rows.length) {
                this.appendItemsToOrgContainer(data);
            } else {
                this.messageService.publish({ name: 'emptyPage' });
            }
            this.setStylesForElements();
        },
        setStylesForElements: function() {
            const counterHeaderElements = Array.from(document.querySelectorAll('.counter'));
            counterHeaderElements.forEach(el => {
                if(el.childNodes.length === 0) {
                    el.style.backgroundColor = 'transparent';
                }else{
                    el.classList.add('counterBorder');
                }
            });
            const referralColumnElements = Array.from(document.querySelectorAll('.referralColumn'));
            referralColumnElements.forEach(el => {
                if(el.childNodes.length === 0) {
                    let emptyBox = this.createElement('div', { className: 'emptyBox'});
                    el.appendChild(emptyBox);
                }
            });
        },
        appendItemsToOrgContainer: function(data) {
            /* data.rows.length */
            for (let index = 0; index < 5; index++) {
                const row = data.rows[index];
                const organizationId = row.values[0];
                const referralWrapper = this.createElement('div',{className: 'orgElementsReferral displayNone'});
                this.headers.forEach(() => referralWrapper.appendChild(this.createElement('div', { className: 'referralColumn'})));
                const orgElementsCounter = this.createElement('div', { className: 'orgElementsСounter displayFlex' });
                const orgElements = this.createElement('div',{className: 'orgElements displayFlex'},orgElementsCounter, referralWrapper);
                const orgTitle__icon = this.createElement('div',
                    {
                        className: 'orgTitle__icon material-icons',value: 0 , innerText: 'add_circle_outline'
                    }
                );
                orgTitle__icon.addEventListener('click', event => this.changeOrgTitleIconVisibility(event.currentTarget));
                const orgTitle__name = this.createElement('div',{className: 'orgTitle__name', innerText: row.values[1]});
                const orgTitle = this.createElement('div',{className: 'orgTitle displayFlex'},orgTitle__icon, orgTitle__name);
                const organization = this.createElement('div',
                    {
                        className: 'organization displayFlex', id: String(organizationId)
                    },
                    orgTitle, orgElements
                );
                this.orgContainer.appendChild(organization);
                this.appendItemsToOrgElementsReferralWrapper(row, referralWrapper, orgElementsCounter, organizationId);
            }
        },
        changeOrgTitleIconVisibility: function(target) {
            if(target.value === 0) {
                target.parentElement.nextElementSibling.firstElementChild.classList.remove('displayFlex');
                target.parentElement.nextElementSibling.firstElementChild.classList.add('displayNone');
                target.parentElement.nextElementSibling.lastElementChild.classList.remove('displayNone');
                target.parentElement.nextElementSibling.lastElementChild.classList.add('displayFlex');
                target.value = 1;
                target.innerText = 'remove_circle_outline';
            }else if(target.value === 1) {
                target.value = 0;
                target.innerText = 'add_circle_outline';
                target.parentElement.nextElementSibling.lastElementChild.classList.remove('displayFlex');
                target.parentElement.nextElementSibling.lastElementChild.classList.add('displayNone');
                target.parentElement.nextElementSibling.firstElementChild.classList.remove('displayNone');
                target.parentElement.nextElementSibling.firstElementChild.classList.add('displayFlex');
            }
        },
        appendItemsToOrgElementsReferralWrapper: function(row, orgElementsReferralWrapper, orgElementsCounter, organizationId) {
            const organizationName = row.values[1];
            for(let i = 2; i < row.values.length; i++) {
                if(row.values[i] !== 0) {
                    const referralHeader__value = this.createElement('div',
                        {
                            className: 'counter_value', innerText: row.values[i]
                        }
                    );
                    const referralHeader = this.createElement('div',
                        {
                            orgId: organizationId,
                            headerId: this.headers[i - 2].id,
                            headerName:  this.headers[i - 2].name,
                            orgName: organizationName,
                            className: 'counter counterHeader'
                        },
                        referralHeader__value
                    );
                    referralHeader.addEventListener('click', event => {
                        event.stopImmediatePropagation();
                        const target = event.currentTarget;
                        this.targetOrgId = target.orgId;
                        const columnHeader = document.getElementById(target.headerId);
                        this.setInfoTableVisibility(columnHeader, target.headerName, 'Усі', target.orgName, 'item');
                    });
                    orgElementsCounter.appendChild(referralHeader);
                } else {
                    orgElementsCounter.appendChild(this.createElement('div', { className: 'counter counterHeader'}));
                }
            }
            this.executeQueryCreateCounters(organizationId, orgElementsReferralWrapper, organizationName);
        },
        executeQueryCreateCounters: function(organizationId, orgElementsReferralWrapper, organizationName) {
            let executeQuery = {
                queryCode: 'table2',
                parameterValues: [
                    { key: '@organization_id', value: organizationId }
                ],
                limit: -1
            };
            this.queryExecutor(
                executeQuery,
                this.createOrganizationsSubElements.bind(this, orgElementsReferralWrapper, organizationId, organizationName),
                this
            );
            this.showPreloader = false;
        },
        createOrganizationsSubElements: function(orgElementsReferralWrapper, organizationId, organizationName, data) {
            data.rows.forEach(row => {
                for (let i = 2; i < row.values.length; i++) {
                    const value = row.values[i];
                    const title = row.values[1];
                    if(value !== 0) {
                        const referralNumber = this.createElement('div', { className: 'refItem__value', innerText: `(${value})`});
                        const referralTitle = this.createElement('div', { className: 'refItem__value', innerText: `${title} `});
                        const referralValue = this.createElement('div', { className: 'refItem__value' }, referralTitle, referralNumber);
                        const referralItem = this.createElement('div',
                            {
                                orgId: organizationId,
                                headerId: this.headers[i - 2].id,
                                headerName:  this.headers[i - 2].name,
                                navigator: row.values[1],
                                orgName: organizationName,
                                className: 'counter referralItem counterBorder'
                            },
                            referralValue
                        );
                        referralItem.addEventListener('click', event => {
                            event.stopImmediatePropagation();
                            const target = event.currentTarget;
                            this.targetOrgId = target.orgId;
                            const columnHeader = document.getElementById(target.headerId);
                            this.setInfoTableVisibility(columnHeader, target.headerName, target.navigator, target.orgName, 'item');
                        });
                        orgElementsReferralWrapper.childNodes[i - 2].appendChild(referralItem);
                    }
                }
            });
        },
        setVisibilityOrganizationContainer: function(status) {
            this.orgContainer.style.display = status;
        },
        setInfoTableVisibility: function(target, columnName, navigator, orgName, position) {
            if(target.classList.contains('check') || target.classList.contains('hover') || target.id === 'searchContainer__input') {
                this.headerItems.forEach((header, index) => {
                    header.firstElementChild.classList.remove('triangle');
                    header.firstElementChild.classList.add(`${header.name}_triangle`);
                    header.classList.remove('hover');
                    header.classList.remove('check');
                    header.style.backgroundColor = this.headers[index].backgroundColor;
                });
                this.setOrganizationName('defaultOrganizationName');
                this.clearOrganizationChildCat();
                this.setVisibilityOrganizationContainer('block');
                this.sendMesOnBtnClick('clickOnInfoTable', 'none', 'none');
                this.resultSearch('clearInput', 0);
                document.getElementById('searchContainer__input').value = '';
            } else {
                if(orgName === undefined) {
                    this.setOrganizationName('defaultOrganizationName');
                    this.clearOrganizationChildCat();
                }else{
                    this.setOrganizationName(orgName);
                    this.setOrganizationChildCat(navigator);
                }
                if (position === 'item') {
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
                    this.sendMesOnBtnClick('clickOnInfoTable', columnName, navigator, orgName, this.targetOrgId, target.id);
                }
            }
        },
        sendMesOnBtnClick: function(message, column, navigator, thisName, organizationId, targetId) {
            this.messageService.publish({
                name: message,
                column: column,
                navigation: navigator,
                orgId: organizationId,
                orgName: thisName,
                targetId: targetId
            });
        },
        resultSearch: function(message, value) {
            this.messageService.publish({name: message, value: value, orgId: this.organizationId});
        }
    };
}());
