(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `
                    <style>
                        .header{
                            padding: 0.5em 0.5em 0.5em 1em;
                            margin: 0;
                            color: white;
                            font-size: 100%;
                            font-weight: normal;
                            text-transform: uppercase;
                            line-height: 1.5em;
                            border: 1px solid #2d9cdb;
                            background: #2d9cdb;
                            display: flex;
                            align-items: center;
                        }
                        .iconWrapper{
                            background: #fff;
                            height: 28px;
                            width: 28px;
                            display: flex;
                            justify-content: center;
                            flex-direction: column;
                            border-radius: 50%;
                            margin-right: 0.5em;
                            text-align: center;
                        }
                        .fa{
                            font-size: 100%;
                            color: #2d9cdb;
                        }

                        .accident-type-wrapper{
                            padding: 1em 1em;
                            background-color: #eeeeee;
                            width: 100%;
                        }

                        .button{
                            text-align: center;
                            border: 1px solid #c4c4c4;
                            display: inline-block;
                            color: #3e50b4 !important;
                            font-weight: bold;
                            width: 23%;
                            height: 100%;
                            margin-left: 2px;
                            margin-right: 2px;
                            border-radius: 3px;
                            font-size: 1em;
                            text-transform: uppercase;
                        }

                        .btnExtern{
                            border: solid 1px;
                            border-radius: 0;
                            position: relative;
                            width: 100%;
                            line-height: 36px;
                            padding-left: calc(1em + 8px);
                            padding-right: calc(1em + 8px);
                            color: red;
                            outline: none;
                            background: transparent;
                            height: 50px;
                            border-radius: 4px;
                        }

                        .separator{
                            border-bottom: 1px solid #e0e0e0;
                        }
                        .right-separator{
                            border-right: 1px solid #e0e0e0;
                        }
                        .v-line-separator:after {
                            content: '';
                            display: inline-block;
                            height: 100%;
                            width: 1px;
                            background: #e0e0e0;
                            position: absolute;
                            top: 0;
                            right: 0;
                        }
                        .fix-neg-margin-right {
                            padding-right: 1em;
                        }

                        .mat-form-field-wrapper {
                            padding-bottom: 1.25em;
                        }
                        .form-element-item{
                            padding-left: 0.75em;
                            padding-top: 0.75em;
                            padding-right: 0.75em;
                        }

                        .categoriesWrapper{
                            display: flex;
                            flex-wrap: nowrap;
                            margin-left: -0.25em;
                            margin-right: -0.25em;
                            width: 100%
                        }

                        .extern__arrow{
                            color: inherit;
                            margin-left: 6px;
                            top: 16px;
                        }

                        .selectWrapper{
                            padding-top: 0!important;
                            display: flex;
                            justify-content: center;
                            flex-direction: row;
                            position: relative;
                            flex: auto;
                            min-width: 0;
                            width: 120px;
                        }

                        .borderBottom{
                            border-bottom:  1px solid #000;
                        }
                        cursorPointer{
                            cursor: pointer;
                        }
                        .inputWrapper{
                            display: flex;
                            justify-content: center;
                            flex-direction: row;
                        }
                        .selectInput{
                            
                        }
                        .selectArrow{
                            display: flex;
                            align-items: center;
                        }
                        .input{
                            font: inherit;
                            background: 0 0;
                            color: currentColor;
                            border: none;
                            outline: 0;
                            padding: 0;
                            margin: 0;
                            width: 100%;
                            max-width: 100%;
                            vertical-align: bottom;
                            text-align: inherit;
                            font-size: 22px;
                            margin-top: 10px;
                        }
                        .placeholder{
                        }
                    </style>
                    <div id="containerInfo"></div>
                    `
        ,
        police: false,
        medical: false,
        fire: false,
        gas: false,
        externList: [],
        categoryList: [],
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if(children.length > 0) {
                children.forEach(child =>{
                    element.appendChild(child);
                });
            }
            return element;
        },
        init: function() {
            const queryExternList = {
                queryCode: 'int_list_district_1551',
                parameterValues: [],
                limit: -1
            };
            const externListType = 'externListType';
            this.queryExecutor(queryExternList, this.getList.bind(this, externListType), this);
            this.showPagePreloader = false;
            const queryCategoryList = {
                queryCode: 'int_list_district_1551',
                parameterValues: [],
                limit: -1
            };
            const categoryListType = 'categoryListType';
            this.queryExecutor(queryCategoryList, this.getList.bind(this, categoryListType), this);
            this.showPagePreloader = false;
            this.messageService.subscribe('headerAccidentInfo', this.setHeader, this);
        },
        afterViewInit: function() {
            const container = document.getElementById('containerInfo');
            this.container = container;
            this.createHeader();
            const buttonsWrapper = this.createButtons();
            const categoriesWrapper = this.createCategories();
            this.addContainerChild(container, buttonsWrapper, categoriesWrapper);
        },
        addContainerChild: function(container, buttonsWrapper, categoriesWrapper) {
            container.appendChild(this.header);
            container.appendChild(buttonsWrapper);
            container.appendChild(categoriesWrapper);
        },
        createHeader: function() {
            const header = {
                text: 'Подія',
                iconClass: 'fa fa-bell',
                widget: 'AccidentInfo'
            }
            const name = 'createHeader';
            this.messageService.publish({ name, header });
        },
        setHeader: function(message) {
            this.header = message.header;
        },
        createButtons: function() {
            const btnFire = this.createElement('div', {className: 'button btnFire', innerText: '101' });
            const btnPolice = this.createElement('div', {className: 'button btnPolice', innerText: '102' });
            const btnMedical = this.createElement('div', {className: 'button btnMedical', innerText: '103' });
            const btnGas = this.createElement('div', {className: 'button btnGas', innerText: '104' });
            const buttonsWrapper = this.createElement(
                'div',
                {className: 'separator accident-type-wrapper'},
                btnFire,
                btnPolice,
                btnMedical,
                btnGas
            );
            return buttonsWrapper;
        },
        createCategories: function() {
            const btnExtern = this.createBtnExtern();
            const category = {
                placeholder: 'Категория *',
                borderRight: false,
                array: this.categoryList
            }
            const allCategories = this.createSelect(category);
            const categoriesWrapper = this.createElement('div',
                {className: 'categoriesWrapper separator'},
                btnExtern, allCategories
            );
            return categoriesWrapper;
        },
        createBtnExtern: function() {
            const extern__text = this.createElement('span', { className: 'extern__text', innerText: 'Екстренно'});
            const extern__arrow = this.createElement('span', { className: 'extern__arrow fa fa-angle-down'})
            const externItemsWrapper = this.createElement(
                'div',
                {className: 'externItemsWrapper'},
                extern__text,
                extern__arrow
            );
            const btnExtern = this.createElement('button', {className: 'btnExtern'}, externItemsWrapper);
            const externWrapper = this.createElement('div',
                {className: 'externWrapper form-element-item right-separator mat-form-field-wrapper'},
                btnExtern
            );
            return externWrapper;
        },
        createSelect: function(element) {
            const input = this.createElement('input', {className: 'input'});
            const placeholder = this.createElement('span', { className: 'placeholder',innerText: element.placeholder});
            const selectInput = this.createElement('div', {className: 'selectInput'}, placeholder, input);
            const arrow = this.createElement('span', { className: 'selectArrow fa fa-angle-down'});
            const inputWrapper = this.createElement('div',
                {className: 'inputWrapper borderBottom'},
                selectInput,
                arrow
            );
            const selectWrapper = this.createElement('div',
                {className: 'selectWrapper form-element-item fix-neg-margin-right mat-form-field-wrapper'},
                inputWrapper
            );
            return selectWrapper;
        },
        getList: function(type, data) {
            const list = type === 'externListType' ? this.externList : this.categoryList;
            this.externList = [];
            data.rows.forEach(row => {
                const indexId = 0;
                const indexValue = 1;
                const id = row.values[indexId];
                const value = row.values[indexValue];
                const listItem = { id, value };
                list.push(listItem);
            });
        }
    };
}());
