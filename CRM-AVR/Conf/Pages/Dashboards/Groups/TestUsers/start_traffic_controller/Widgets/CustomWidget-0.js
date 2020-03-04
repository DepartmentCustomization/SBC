(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        customConfig:
                `
                <style>
                .menuCategory{
                    border-top: 1px solid #eff2f5;
                    padding: 6px 0px;
                    text-decoration: none;
                    color: #000;
                    display: block;
                    border: none;
                    background: none;
                    width: 100%;
                    text-align: left;
                    cursor: pointer;
                    outline: none; 
                }
                #muneContainer{
                    max-width: 155px;
                }
                .menuCategoryContainer{
                    display: none;
                }
                .menuCategoryItem, .arrow{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    width: 100%;
                    height: 40px;
                    justify-content: space-between;
                }
                .menuCategoryItem_title{
                    text-align: center;
                    text-transform: uppercase;
                    font-size: 14px;
                    font-weight: 600;                    
                }
                .menuItem, .menuForm{
                    margin: 5px 3px;
                    border-bottom: 1px solid black;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    padding: 5px 5px;
                    font-size: 14px;
                    background-color: #c8c8c8;
                }   
                .childrensContainer {
                    display: none;
                    margin: 5px 5px;
                }
                .childrensContainerWrapper{
                    display: flex;
                    flex-direction: column;
                    display: flex;
                    flex-direction: column;
                    align-items: center;                    
                }
                .menuFormInput{
                    width: 90%;
                    height: 30px;
                    margin: 3px 0;
                }
                .menuFormButton{
                    line-height: 20px;
                    font-size: 14px;
                    font-weight: 600;
                    width: 90%;
                }   
                </style>
                <div id="menuContainer"></div>
                `
        ,
        organizations: [],
        organizationId: [],
        init: function() {
            let UserInfo = {
                queryCode: 'avr_mainPage_USER',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(UserInfo, this.onUserInfo, this);
            let executeQuery = {
                queryCode: 'avr_start_page',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQuery, this.createLeftMenuCategory, this);
            /*
                Возвращает информацию об пользователе
                колонка  DB с признаком system возвращает в колонку parent
                admin_vdk - Администраторы "Водоканала"
                vdp - Водопостачання
                kan - Канализация
                energy - Енергетика
            */
        },
        onUserInfo: function(data) {
            for (let i = 0; i < data.rows.length; i++) {
                if(data.rows[i].values[3] === 'system') {
                    let orgName = data.rows[i].values[2];
                    this.organizations.push(orgName);
                }
                if(data.rows[i].values[3] === 'analitics') {
                    this.organizationId = data.rows[i].values[0];
                }
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
        createLeftMenuCategory: function(data) {
            const Id = data.columns.findIndex(el => el.code.toLowerCase() === 'id');
            const ParentId = data.columns.findIndex(el => el.code.toLowerCase() === 'parentid');
            const Name = data.columns.findIndex(el => el.code.toLowerCase() === 'name');
            const Type = data.columns.findIndex(el => el.code.toLowerCase() === 'type');
            const List = data.columns.findIndex(el => el.code.toLowerCase() === 'list');
            const Icon = data.columns.findIndex(el => el.code.toLowerCase() === 'icon');
            const IconColor = data.columns.findIndex(el => el.code.toLowerCase() === 'iconcolor');
            const urlLink = data.columns.findIndex(el => el.code.toLowerCase() === 'url');
            const placeTo = data.columns.findIndex(el => el.code.toLowerCase() === 'place');
            const isVisible = data.columns.findIndex(el => el.code.toLowerCase() === 'visibility');
            const inputId = data.columns.findIndex(el => el.code.toLowerCase() === 'input_id');
            const key = data.columns.findIndex(el => el.code.toLowerCase() === 'key');
            const menuContainer = document.getElementById('menuContainer');
            for (let i = 0; i < data.rows.length; i++) {
                if(data.rows[i].values[ParentId] === null && data.rows[i].values[isVisible] !== true) {
                    const childrensContainer = this.createElement('div', {className: 'childrensContainer'});
                    const menuCategoryItem_icon = this.createElement('div',
                        {
                            className: 'menuCategoryItem_icon material-icons',
                            innerText: String(String(data.rows[i].values[Icon]))
                        }
                    );
                    menuCategoryItem_icon.style.color = String(String(data.rows[i].values[IconColor]));
                    const menuCategoryItem_title = this.createElement('div',
                        {
                            className: 'menuCategoryItem_title',
                            innerText: String(String(data.rows[i].values[Name]))
                        }
                    );
                    const menuCategoryItem_arrow = this.createElement('div',
                        {
                            className: 'menuCategoryItem_arrow fa fa-caret-down'
                        }
                    );
                    const menuCategoryItem = this.createElement('div',
                        {
                            className: 'menuCategoryItem',
                            value: true
                        },
                        menuCategoryItem_icon, menuCategoryItem_title, menuCategoryItem_arrow
                    );
                    const menuCategory = this.createElement('div',
                        {
                            className: 'menuCategory',
                            id: String('menuCategory_' + data.rows[i].values[Id])
                        },
                        menuCategoryItem, childrensContainer
                    );
                    menuContainer.appendChild(menuCategory);
                }
            }
            let elements = document.querySelectorAll('.menuCategoryItem');
            elements.forEach(elem => {
                this.showList(elem);
            });
            this.createMenuElements(data, Id, ParentId, Name, Type, List, Icon, IconColor, urlLink, placeTo,isVisible, inputId, key);
        },
        createMenuElements: function(data, Id, ParentId, Name, Type, List, Icon, IconColor, urlLink, placeTo,isVisible, inputId, key) {
            for (let i = 0; i < data.rows.length; i++) {
                if(
                    data.rows[i].values[Type] === 'INPUT' &&
                    data.rows[i].values[List] === false &&
                    data.rows[i].values[isVisible] !== true
                ) {
                    let element = document.getElementById(String('menuCategory_' + data.rows[i].values[ParentId]));
                    const parentElement = element === null ?
                        document.getElementById(String('menuItemWrapper_' + data.rows[i].values[ParentId])) : element;
                    let menuItem_title = this.createElement('div',
                        {
                            className: 'menuItem_title',
                            innerText: String(String(data.rows[i].values[Name]))
                        }
                    );
                    let menuItem = this.createElement('div',
                        {
                            className: 'menuItem',
                            place: String(String(data.rows[i].values[placeTo])), link: String(String(data.rows[i].values[urlLink])),
                            id: String('menuItem_' + data.rows[i].values[Id])
                        },
                        menuItem_title
                    );
                    if(parentElement !== null) {
                        parentElement.lastChild.appendChild(menuItem);
                    }
                    menuItem.addEventListener('click', event => {
                        let target = event.currentTarget;
                        let place = target.place;
                        let url = target.link;
                        if(target.innerText === 'Мій підрозділ') {
                            url = String('Organizations_WO/edit/' + this.organizationId);
                        }
                        this.linkTo(place, url);
                    });
                }else if(
                    data.rows[i].values[Type] === 'INPUT' &&
                    data.rows[i].values[List] === true &&
                    data.rows[i].values[isVisible] !== true
                ) {
                    let element = document.getElementById(String('menuCategory_' + data.rows[i].values[ParentId]));
                    let parentElement = element;
                    if(element === null) {
                        parentElement = document.getElementById(String('menuItemWrapper_' + data.rows[i].values[ParentId]));
                    }
                    let childrensContainer = this.createElement('div', {className: 'childrensContainer'});
                    let menuItem_arrow = this.createElement('div', {className: 'menuItem_arrow fa fa-caret-down'});
                    let menuItem_title = this.createElement('div',
                        {
                            className: 'menuItem_title',
                            innerText: String(String(data.rows[i].values[Name]))
                        }
                    );
                    let menuItem = this.createElement('div', {className: 'menuItem itemList', value: true}, menuItem_title, menuItem_arrow);
                    let menuItemWrapper = this.createElement('div',
                        {
                            className: 'menuItemWrapper',
                            id: String('menuItemWrapper_' + data.rows[i].values[Id])
                        },
                        menuItem, childrensContainer
                    );
                    if(parentElement !== null) {
                        parentElement.lastChild.appendChild(menuItemWrapper);
                    }
                }else if(data.rows[i].values[Type] === 'FORM' && data.rows[i].values[isVisible] !== true) {
                    let element = document.getElementById(String('menuCategory_' + data.rows[i].values[ParentId]));
                    let parentElement = element;
                    if(element === null) {
                        parentElement = document.getElementById(String('menuItemWrapper_' + data.rows[i].values[ParentId]));
                    }
                    let childrensContainerWrapper = this.createElement('div', {className: 'childrensContainerWrapper'});
                    let childrensContainer = this.createElement('div', {className: 'childrensContainer'}, childrensContainerWrapper);
                    let menuForm_arrow = this.createElement('div', {className: 'menuForm_arrow fa fa-caret-down'});
                    let menuForm_title = this.createElement('div',
                        {
                            className: 'menuForm_title',
                            innerText: String(String(data.rows[i].values[Name]))
                        }
                    );
                    let menuForm = this.createElement('div', {className: 'menuForm', value: true}, menuForm_title, menuForm_arrow);
                    let menuFormWrapper = this.createElement('div',
                        {
                            className: 'menuFormWrapper',
                            id: String('menuFormWrapper_' + data.rows[i].values[Id])
                        },
                        menuForm, childrensContainer
                    );
                    if(parentElement !== null) {
                        parentElement.lastChild.appendChild(menuFormWrapper);
                    }
                    let elemId = data.rows[i].values[Id];
                    this.createMenuFormElements(
                        data,
                        childrensContainerWrapper,
                        elemId,
                        inputId,
                        key,
                        Type,
                        ParentId,
                        isVisible,
                        Name,
                        urlLink
                    );
                }
            }
            let elements = document.querySelectorAll('.itemList');
            elements.forEach(elem => {
                this.showList(elem);
            });
        },
        createMenuFormElements: function(data, parentElement, parId, inputId, key, Type, ParentId, isVisible, Name, urlLink) {
            for (let i = 0; i < data.rows.length; i++) {
                if(
                    data.rows[i].values[Type] === 'FORM_INPUT' &&
                    parId === data.rows[i].values[ParentId] &&
                    data.rows[i].values[isVisible] !== true
                ) {
                    let menuFormInput = this.createElement('input',
                        {
                            className: 'menuFormInput',
                            key: String(String(data.rows[i].values[key])),
                            placeholder: String(String(data.rows[i].values[Name])),
                            id: String(String(data.rows[i].values[inputId]))
                        }
                    );
                    parentElement.appendChild(menuFormInput);
                }
                if(
                    data.rows[i].values[Type] === 'BTN' &&
                    parId === data.rows[i].values[ParentId]
                ) {
                    let menuFormButton = this.createElement('button',
                        {
                            className: 'menuFormButton',
                            url: String(String(data.rows[i].values[urlLink])),
                            innerText: String(String(data.rows[i].values[Name])),
                            id: String(String(data.rows[i].values[inputId]))
                        }
                    );
                    parentElement.appendChild(menuFormButton);
                }
                this.searchClick();
            }
            let elements = document.querySelectorAll('.menuForm');
            elements.forEach(elem => {
                this.showList(elem);
            });
        },
        linkTo: function(place, url) {
            if(place === 'sections') {
                this.goToSection(url)
            }else if(place === 'dashboard') {
                this.goToDashboard(url);
            }
        },
        showList: function(elem) {
            elem.addEventListener('click', () => {
                event.stopImmediatePropagation();
                let target = event.currentTarget;
                if(target.value === true) {
                    target.value = false;
                    target.parentElement.lastElementChild.style.display = 'block';
                    target.lastElementChild.style.color = 'red';
                }else{
                    target.value = true;
                    target.parentElement.lastElementChild.style.display = 'none';
                    target.lastElementChild.style.color = 'black';
                }
            });
        },
        searchClick: function() {
            let buttons = document.querySelectorAll('.menuFormButton');
            buttons.forEach(function(el) {
                el.addEventListener('click', function(event) {
                    event.stopImmediatePropagation();
                    let target = event.currentTarget;
                    let obj = {
                        'sortColumns': [{
                            'key': 'Created_at',
                            'value': 1
                        }],
                        'filterColumns': []
                    };
                    let children = target.parentElement.childNodes;
                    for (let i = 0; i < children.length - 1; i++) {
                        let el = children[i];
                        if(el.value !== '') {
                            let column = {
                                'key': el.key,
                                'value': {
                                    'operation': 6,
                                    'values': [el.value]
                                }
                            }
                            obj.filterColumns.push(column)
                        }
                    }
                    let str = JSON.stringify(obj);
                    let base64Str = str.encodeBase64();
                    if(obj.filterColumns.length > 0) {
                        window.location = String(location.origin + localStorage.getItem('VirtualPath') + '/sections/' + el.url + base64Str);
                    }
                });
            });
        }
    };
}());
