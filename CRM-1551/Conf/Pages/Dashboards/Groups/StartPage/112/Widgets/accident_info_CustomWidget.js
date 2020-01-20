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
                            cursor: pointer;
                        }

                        .modalList{
                            position: absolute;
                            background-color: #fff;
                            width: calc(100% - 20px);
                            max-height: 200px;
                            overflow-y: scroll;
                            box-shadow: 0 0 2px 3px rgba(0,0,0,.1);
                            z-index: 10000;
                        }
                        .listItem{
                            font-weight:400;
                            text-transform: uppercase;
                            padding: 10px;
                            font-size: 14px;
                            color: #000;
                        }
                        .listItem:hover{
                            background-color: #eee;
                        }

                        .accident-type-wrapper{
                            padding: 1em 1em;
                            background-color: #eeeeee;
                            width: 100%;
                        }

                        .button{
                            cursor: pointer;
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
                            outline: none;
                            height: 50px;
                            border-radius: 4px;
                            margin-bottom: 1px;
                        }
                        .btnExternUnchecked{
                            background: transparent;
                            color: red;
                        }
                        .btnExternChecked{
                            background: red;
                            color: #fff;
                        }


                        .separator{
                            border-bottom: 1px solid #e0e0e0;
                        }
                        .rightSeparator{
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

                        .botPadding {
                            padding-bottom: 1.25em;
                        }
                        .topLeftRightPadding{
                            padding-left: 0.75em;
                            padding-top: 0.75em;
                            padding-right: 0.75em;
                        }

                        .externWrapper{
                            position: relative;
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
                            position: relative;
                            flex: auto;
                            min-width: 0;
                            width: 180px;
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
                            margin-bottom: 2px;
                        }
                        .selectInput{
                            width: 100%
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
                        .placeholderInt{
                            white-space: pre;
                            font-size: 10px;
                        }

                        .accidentDateTimerWrapper{
                            display: flex;
                        }
                        .accidentDateTimeInput{
                            border: none;
                        }
                        .accidentTimerWrapper{
                            display: flex;
                            flex-direction: row;
                            justify-content: center;
                            align-items: center;
                        }
                        .integerInputWrapper{
                            display: flex;
                            flex-direction: row;
                            justify-content: center;
                            align-items: center;
                        }
                        .integerInput{
                            margin: 0 10px;
                            text-align: right;
                        }
                        .checkBoxWrapper{
                            display: flex;
                            flex-direction: row;
                            width: 100%;
                        }
                        .medicalCheckBoxWrapper{
                            text-align: left;
                        }
                        .checkBox{
                            display: inline-block;
                            height: 20px;
                            line-height: 0;
                            margin-right: 8px;
                            order: 0;
                            position: relative;
                            vertical-align: middle;
                            white-space: nowrap;
                            width: 20px;
                            flex-shrink: 0;
                        }

                        #accidentTextContent{
                            width: 100%;
                            height: 100%;
                            border: none;
                        }
                </style>
                    <div id="containerInfo"></div>
                    `
        ,
        police: true,
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
                queryCode: 'ak_listCategories_urg112',
                parameterValues: [
                    { key: '@pageOffsetRows', value: 0},
                    { key: '@pageLimitRows', value: 10}
                ],
                filterColumns: [],
                limit: -1
            };
            const externListType = 'externListType';
            this.queryExecutor(queryExternList, this.getList.bind(this, externListType), this);
            this.showPagePreloader = false;
            const queryCategoryList = {
                queryCode: 'ak_listCategories112',
                parameterValues: [
                    { key: '@pageOffsetRows', value: 0},
                    { key: '@pageLimitRows', value: 50},
                    { key: '@police', value: this.police},
                    { key: '@medical', value: this.medical},
                    { key: '@fire', value: this.fire},
                    { key: '@gas', value: this.gas}
                ],
                filterColumns: [],
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
            const accidentDateTimerWrapper = this.createAccidentDateTimer();
            const medicalCheckBoxes = this.createMedicalCheckBoxes();
            const accidentTextContent = this.createAccidentTextContent();
            this.addContainerChild(
                this.header,
                buttonsWrapper,
                categoriesWrapper,
                accidentDateTimerWrapper,
                medicalCheckBoxes,
                accidentTextContent
            );
        },
        addContainerChild: function(...params) {
            params.forEach(item => this.container.appendChild(item));
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
                array: this.categoryList,
                id: 'categoryList',
                inputId: '_valueCat'
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
            const extern__arrow = this.createElement('span', { className: 'extern__arrow fa fa-angle-down'});
            const externItemsWrapper = this.createElement(
                'div',
                {className: 'externItemsWrapper'},
                extern__text,
                extern__arrow
            );
            const btnExtern = this.createElement(
                'button',
                {
                    className: 'btnExtern btnExternUnchecked',
                    id: 'btnExtern',
                    showModal: false,
                    changeText: false
                },
                externItemsWrapper
            );
            const externWrapper = this.createElement('div',
                {className: 'externWrapper topLeftRightPadding rightSeparator botPadding'},
                btnExtern
            );
            extern__arrow.addEventListener('click', e => {
                e.stopImmediatePropagation();
                this.showModalList(externWrapper, btnExtern.id, btnExtern, this.externList);
            });
            return externWrapper;
        },
        createSelect: function(element) {
            const input = this.createElement('input',
                {
                    type: 'text',
                    className: 'input',
                    id: 'categoryValue',
                    value: ' ',
                    valueId: undefined}
            );
            this._categoryId = input.valueId;
            const placeholder = this.createElement('span', { className: 'placeholder',innerText: element.placeholder});
            const selectInput = this.createElement('div',
                {
                    className: 'selectInput',
                    id: element.inputId
                },
                placeholder, input
            );
            const arrow = this.createElement('span', { className: 'selectArrow fa fa-angle-down'});
            const inputWrapper = this.createElement('div',
                {
                    className: 'inputWrapper borderBottom',
                    id: element.id,
                    showModal: false,
                    changeText: false
                },
                selectInput,
                arrow
            );
            const selectWrapper = this.createElement('div',
                {
                    className: 'selectWrapper topLeftRightPadding fix-neg-margin-right botPadding'
                },
                inputWrapper
            );
            arrow.addEventListener('click', e => {
                e.stopImmediatePropagation();
                this.showModalList(selectWrapper, selectInput.id, inputWrapper, this.categoryList);
            });
            return selectWrapper;
        },
        showModalList:  function(container, inputId, wrapper, listItems) {
            const status = wrapper.showModal;
            const changeText = wrapper.changeText;
            if(!status) {
                if(!changeText) {
                    document.getElementById(inputId);
                }
                wrapper.showModal = !status;
                const modalList = this.createElement('div',
                    {
                        className: 'modalList'
                    }
                )
                if(listItems.length) {
                    listItems.forEach(item => {
                        const id = item.id;
                        const innerText = item.value;
                        const className = 'listItem';
                        const listItem = this.createElement('div', {id, innerText, className});
                        listItem.addEventListener('click', e => {
                            const target = e.currentTarget;
                            const id = Number(target.id);
                            const value = target.innerText;
                            switch (inputId) {
                            case 'btnExtern':
                                this.changeExternBtn(inputId);
                                break;
                            default:
                                break;
                            }
                            this.changeButtons();
                            this.changeCategoryInput(value, id);
                            this.hideModal(wrapper);
                        });
                        modalList.appendChild(listItem);
                    });
                    container.appendChild(modalList);
                }
                this.activeModalContainer = container;
            } else {
                this.hideModal(wrapper);
            }
        },
        changeCategoryInput: function(value, id) {
            document.getElementById('categoryValue').value = value;
            this._categoryId = id;
            console.log('CatValue : ' + value + ', catID : ' + id);
        },
        changeExternBtn: function(inputId) {
            document.getElementById(inputId).classList.remove('btnExternUnchecked');
            document.getElementById(inputId).classList.add('btnExternChecked');
        },
        changeButtons: function() {
        },
        hideModal: function(wrapper) {
            this.activeModalContainer.removeChild(this.activeModalContainer.lastElementChild);
            this.activeModalContainer = undefined;
            wrapper.showModal = false;
        },
        getList: function(type, data) {
            const list = type === 'externListType' ? this.externList : this.categoryList;
            data.rows.forEach(row => {
                const indexId = 0;
                const indexValue = 1;
                const id = row.values[indexId];
                const value = row.values[indexValue];
                const listItem = { id, value };
                list.push(listItem);
            });
        },
        createAccidentDateTimer: function() {
            const accidentDateWrapper = this.createAccidentDateWrapper();
            const accidentTimerWrapper = this.createAccidentTimerWrapper();
            const accidentDateTimerWrapper = this.createElement('div',
                {className: 'accidentDateTimerWrapper separator'},
                accidentDateWrapper, accidentTimerWrapper
            );
            return accidentDateTimerWrapper;
        },
        createAccidentDateWrapper: function() {
            const accidentDateTimeInput = this.createElement(
                'input',
                {
                    type: 'datetime-local',
                    className: 'accidentDateTimeInput',
                    id: 'accidentDateTimeInput'
                }
            );
            const accidentDateCaption = this.createElement(
                'div',{ className: 'placeholder', innerText: 'Дата та час'}
            );
            const elementsWrapper = this.createElement(
                'div',{ className: 'elementsWrapper borderBottom'}, accidentDateCaption, accidentDateTimeInput
            );
            const accidentDateWrapper = this.createElement(
                'div',
                {
                    className: 'accidentDateWrapper topLeftRightPadding rightSeparator botPadding ',
                    id: 'accidentDateWrapper'
                },
                elementsWrapper
            );
            return accidentDateWrapper;
        },
        createAccidentTimerWrapper: function() {
            const days = this.createIntegerInput('дн');
            const hours = this.createIntegerInput('г');
            const minutes = this.createIntegerInput('хвилини назад');
            const accidentTimerWrapper = this.createElement(
                'div',{ className: 'accidentTimerWrapper', id: 'accidentTimerWrapper' },days, hours, minutes
            );
            return accidentTimerWrapper;
        },
        createIntegerInput: function(text) {
            const input = this.createElement('input',
                {
                    type: 'text',
                    className: 'input integerInput'
                }
            );
            const placeholder = this.createElement('span', { className: 'placeholder placeholderInt',innerText: text});
            const integerInput = this.createElement('div',
                {
                    className: 'integerInputWrapper'
                },
                input, placeholder
            );
            const wrapper = this.createElement(
                'div', {className: 'integerInput borderBottom'}, integerInput
            )
            return wrapper;
        },
        createMedicalCheckBoxes: function() {
            const checkBoxMe = this.createMedicalCheckBox('Визов 103 для себе', 'checkBoxMe');
            const checkBoxAnother = this.createMedicalCheckBox('Визов 103 для іншого', 'checkBoxAnother');
            const medicalCheckBoxWrapper = this.createElement(
                'div',
                { className: 'medicalCheckBoxWrapper checkBoxWrapper borderBottom topLeftRightPadding botPadding ' },
                checkBoxMe, checkBoxAnother
            );
            return medicalCheckBoxWrapper;
        },
        createMedicalCheckBox: function(text, id) {
            const label = this.createElement(
                'span',
                { className: 'medicalCheckBoxLabel', id: id, innerText: text}
            );
            const checkBox = this.createElement(
                'input',
                { className: 'medicalCheckBox checkBox', type: 'checkBox'}
            );
            const medicalCheckBoxWrapper = this.createElement(
                'div',
                { className: 'medicalCheckBoxWrapper checkBoxWrapper'},
                checkBox, label
            );
            return medicalCheckBoxWrapper;
        },
        createAccidentTextContent: function() {
            const accidentTextContent = this.createElement(
                'textarea',
                { id: 'accidentTextContent', placeholder: 'Опис ...'}
            );
            const accidentTextContentWrapper = this.createElement(
                'div',
                { className: 'accidentTextContentWrapper borderBottom topLeftRightPadding botPadding' },
                accidentTextContent
            );
            return accidentTextContentWrapper;
        }
    };
}());
