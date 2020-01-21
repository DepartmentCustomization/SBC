(function() {
    return {
        title: ' ',
        hint: '',
        customConfig:
                    `
                    <style>
                        .textInputWrapper{
                            
                        }
                        .propertiesWrapper {
                            display: flex;
                            flex-direction: row;
                            justify-content: center;
                        }
                        .callerCheckBoxWrapper{
                            justify-content: center;
                            align-items: center;
                        }
                        .textWrapper{
                            width: 100%;
                        }
                        .callerNameWrapper{
                            display: flex;
                        }

                        .callerStatusButtonsWrapper{
                            padding: 1em 1em;
                            background-color: #eeeeee;
                            width: 100%;
                            display: flex;
                            flex-direction: row;
                            justify-content: center;
                        }
                        .callerStatusBtnUnchecked{
                            border: 1px solid #c4c4c4;
                            color: #3e50b4 !important;
                        }
                        .callerStatusBtnChecked{
                            background-color: #3e50b4;
                            border-color: #3e50b4;
                            color: white !important;
                        }
                        .callerStatusBtn{
                            text-align: center;
                            display: inline-block;
                            font-weight: bold;
                            width: auto;
                            height: 100%;
                            margin-left: 2px;
                            margin-right: 2px;
                            border-radius: 3px;
                            font-size: 0.875em;
                            text-transform: uppercase;
                            user-select: none;
                            display: inline-block;
                            line-height: 36px;
                            padding: 0 16px;
                            cursor: pointer;
                            outline: none;
                        }
                        .addressHeader{
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                        }
                        .addressCaption{
                            font-size: 14px;
                            text-transform: uppercase;
                            color: #000;
                            font-weight: 700;
                        }

                        .marker{
                            font-size: 150%;
                            width: 24px;
                            height: 24px;
                            text-align: center;
                            color: #000;
                        }
                        .addressBtn{
                            cursor: pointer;
                        }


                    </style>
                    <div id="containerCaller"></div>
                    `
        ,
        stringEmpty: '',
        fullName: [],
        btnDeafAndDumbValue: 0,
        btnInadequateValue: 0,
        btnBlindValue: 0,
        btnDeafValue: 0,
        btnDumbValue: 0,
        init: function() {
            this.messageService.subscribe('captionAccidentCaller', this.createCaption, this);
            this.messageService.subscribe('headerAccidentCaller', this.setHeader, this);
        },
        createCaption: function(message) {
            this.container.appendChild(message.caption)
        },
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if(children.length) {
                children.forEach(child =>{
                    element.appendChild(child);
                });
            } return element;
        },
        afterViewInit: function() {
            const container = document.getElementById('containerCaller');
            this.container = container;
            this.createHeader();
            const propertiesWrapper = this.createPropertiesWrapper();
            const callerNameWrapper = this.createCallerNameWrapper();
            const callerStatusButtonsWrapper = this.createCallerStatusButtonsWrapper();
            const addressWrapper = this.createAddressWrapper();
            this.addContainerChild(
                this.header,
                propertiesWrapper,
                callerNameWrapper,
                addressWrapper,
                callerStatusButtonsWrapper
            );
        },
        createHeader: function() {
            const header = {
                text: 'Заявник',
                iconClass: 'fa fa-user',
                widget: 'AccidentCaller'
            }
            const name = 'createHeader';
            this.messageService.publish({ name, header });
        },
        setHeader: function(message) {
            this.header = message.header;
        },
        addContainerChild: function(...params) {
            params.forEach(item => this.container.appendChild(item));
        },
        createPropertiesWrapper: function() {
            const anonymousCheckBox = this.createAnonymousCheckBox('Анонiм', 'anonymousCheckBox');
            const callerPhoneNumber = this.createTextInput('Телефон', 'text', true);
            const callerBirthday = this.createTextInput('Дата народження', 'date', false);
            const propertiesWrapper = this.createElement(
                'div',
                { className: 'propertiesWrapper bgcLightGrey'},
                anonymousCheckBox, callerPhoneNumber, callerBirthday
            );
            return propertiesWrapper;
        },
        createAnonymousCheckBox: function(text, id) {
            const label = this.createElement(
                'span',
                { className: 'callerCheckBoxLabel', id: id, innerText: text}
            );
            const checkBox = this.createElement(
                'input',
                { className: 'callerCheckBox checkBox', type: 'checkBox', checked: true}
            );
            this.anonymousCheckBox = checkBox;
            checkBox.addEventListener('change', e => {
                const checkBox = e.currentTarget;
                if(!checkBox.checked) {
                    checkBox.checked = false;
                } else {
                    checkBox.checked = true;
                    this.setAnonymousProp();
                }
            });
            const callerCheckBoxWrapper = this.createElement(
                'div',
                {className: 'checkBoxWrapper callerCheckBoxWrapper topLeftRightPadding botPadding rightSeparator wrapBorderBot'},
                checkBox, label
            );
            return callerCheckBoxWrapper;
        },
        createTextInput: function(text, type, borderRight, position) {
            const input = this.createElement('input',
                {
                    type: type,
                    className: 'input textInput',
                    innerText: this.stringEmpty
                }
            );
            if(position) {
                this.getTextInputPosition(position, input);
                input.addEventListener('change', e => {
                    e.stopImmediatePropagation();
                    this.anonymousCheckBox.checked = false;
                });
            }
            const placeholder = this.createElement('span', { className: 'placeholder placeholderInt',innerText: text});
            const textInputWrapper = this.createElement(
                'div',
                {
                    className: 'textInputWrapper borderBottom'
                },
                placeholder, input
            );
            const wrapper = this.createElement(
                'div', {className: 'textWrapper topLeftRightPadding botPadding wrapBorderBot'}, textInputWrapper
            );
            if(borderRight) {
                wrapper.classList.add('rightSeparator');
            }
            return wrapper;
        },
        getTextInputPosition: function(position, input) {
            switch (position) {
            case 'Name':
                this.callerName = input;
                this.callerNameValue = input.innerText;
                this.fullName.push(input);
                break;
            case 'SecondName':
                this.callerSecondName = input;
                this.callerSecondNameValue = input.innerText;
                this.fullName.push(input);
                break;
            case 'FatherName':
                this.callerFatherName = input;
                this.callerFatherNameValue = input.innerText;
                this.fullName.push(input);
                break;
            default:
                break;
            }
        },
        createCallerNameWrapper: function() {
            const callerSecondName = this.createTextInput('Прізвище', 'text', true, 'Name');
            const callerName = this.createTextInput('Iм\'я', 'text', true, 'SecondName');
            const callerFatherName = this.createTextInput('По батькові', 'text', false, 'FatherName');
            const callerNameWrapper = this.createElement(
                'div',
                { className: 'callerNameWrapper wrapBorderBot bgcLightGrey'},
                callerSecondName, callerName, callerFatherName
            );
            return callerNameWrapper;
        },
        createCallerStatusButtonsWrapper: function() {
            const btnDeafAndDumb = this.createStatusBtn('btnDeafAndDumb', 'Глухонімий');
            const btnDeaf = this.createStatusBtn('btnDeaf', 'Глухий');
            const btnDumb = this.createStatusBtn('btnDumb', 'Німий');
            const btnBlind = this.createStatusBtn('btnBlind', 'Cлiпий');
            const btnInadequate = this.createStatusBtn('btnInadequate', 'Неадекватний');
            const callerStatusButtonsWrapper = this.createElement(
                'div',
                { className: 'callerStatusButtonsWrapper wrapBorderBot bgcLightGrey'},
                btnDeafAndDumb, btnDeaf, btnDumb, btnBlind, btnInadequate
            );
            return callerStatusButtonsWrapper;
        },
        createStatusBtn: function(id, text) {
            const btn = this.createElement(
                'button',
                { className: 'btn callerStatusBtn callerStatusBtnUnchecked', id: id, innerText: text, value: 0 }
            );
            btn.addEventListener('click', e => {
                const btn = e.currentTarget;
                const value = Number(btn.value);
                this.changeButtonStatus(btn, value);
            });
            return btn;
        },
        changeButtonStatus: function(btn, value) {
            const zero = 0;
            switch (btn.id) {
            case 'btnDeafAndDumb':
                this.setBtnDeafAndDumbStatus(value, zero);
                break;
            case 'btnDeaf':
                this.setBtnDeafStatus(value, zero);
                break;
            case 'btnDumb':
                this.setBtnDumbStatus(value, zero);
                break;
            case 'btnBlind':
                this.setBtnBlindStatus(btn, value, zero);
                break;
            case 'btnInadequate':
                this.setBtnInadequateStatus(btn, value, zero);
                break;
            default:
                break;
            }
        },
        setBtnDeafAndDumbStatus: function(value, zero) {
            if(value === zero) {
                this.btnDeafValue = 1;
                this.setActiveStatusBtn('btnDeaf');
                this.btnDumbValue = 1;
                this.setActiveStatusBtn('btnDumb');
                this.btnDeafAndDumbValue = 1;
                this.setActiveStatusBtn('btnDeafAndDumb');
            } else {
                this.btnDeafValue = 0;
                this.setPassiveStatusBtn('btnDeaf');
                this.btnDumbValue = 0;
                this.setPassiveStatusBtn('btnDumb');
                this.btnDeafAndDumbValue = 0;
                this.setPassiveStatusBtn('btnDeafAndDumb');
            }
        },
        setBtnDeafStatus: function(value, zero) {
            if(value === zero) {
                this.btnDeafValue = 1;
                this.setActiveStatusBtn('btnDeaf');
                this.btnDeafAndDumbValue = 1;
                this.setActiveStatusBtn('btnDeafAndDumb');
            } else {
                this.btnDeafValue = 0;
                this.setPassiveStatusBtn('btnDeaf');
                this.btnDeafAndDumbValue = 0;
                this.setPassiveStatusBtn('btnDeafAndDumb');
            }
        },
        setBtnDumbStatus: function(value, zero) {
            if(value === zero) {
                this.btnDumbValue = 1;
                this.setActiveStatusBtn('btnDumb');
                this.btnDeafAndDumbValue = 1;
                this.setActiveStatusBtn('btnDeafAndDumb');
            } else {
                this.btnDumbValue = 0;
                this.setPassiveStatusBtn('btnDumb');
                this.btnDeafAndDumbValue = 0;
                this.setPassiveStatusBtn('btnDeafAndDumb');
            }
        },
        setBtnBlindStatus: function(btn, value, zero) {
            if(value === zero) {
                this.btnBlindValue = 1;
                this.setActiveStatusBtn(btn.id);
            } else {
                this.btnBlindValue = 0;
                this.setPassiveStatusBtn(btn.id);
            }
        },
        setBtnInadequateStatus: function(btn, value, zero) {
            if(value === zero) {
                this.btnInadequateValue = 1;
                this.setActiveStatusBtn(btn.id);
            } else {
                this.btnInadequateValue = 0;
                this.setPassiveStatusBtn(btn.id);
            }
        },
        setActiveStatusBtn: function(id) {
            document.getElementById(id).value = 1;
            document.getElementById(id).classList.remove('callerStatusBtnUnchecked');
            document.getElementById(id).classList.add('callerStatusBtnChecked');
        },
        setPassiveStatusBtn: function(id) {
            document.getElementById(id).value = 0;
            document.getElementById(id).classList.add('callerStatusBtnUnchecked');
            document.getElementById(id).classList.remove('callerStatusBtnChecked');
        },
        createAddressWrapper: function() {
            const addressHeader = this.createAddressHeader();
            const addressContentWrapper = this.createAddressContentWrapper(
                'callerAddressContent'
            );
            const addressWrapper = this.createElement(
                'div',
                { className: 'addressWrapper wrapBorderBot topLeftRightPadding botPadding bgcLightGrey'},
                addressHeader, addressContentWrapper
            );
            return addressWrapper;
        },
        createAddressHeader: function() {
            const addressCaption = this.createElement(
                'span',
                {className: 'addressCaption', innerText: 'Адреса заявника *'}
            );
            const addressEditorWrapper = this.createAddressEditorWrapper(
                'btnCallerAddressClear',
                'btnCallerAddressEdit'
            );
            const addressHeader = this.createElement(
                'div',
                { className: 'addressHeader'},
                addressCaption, addressEditorWrapper
            );
            return addressHeader;
        },
        createAddressEditorWrapper: function(idClear, idEdit) {
            const btnAddressEdit = this.createElement(
                'span',
                { id: idEdit, className: 'material-icons editBtn addressBtn', innerText: 'edit'}
            );
            const btnAddressClear = this.createElement(
                'span',
                { id: idClear, className: 'material-icons clearBtn addressBtn', innerText: 'clear'}
            );
            const addressEditorWrapper = this.createElement(
                'div',
                { className: 'addressEditorWrapper'},
                btnAddressClear, btnAddressEdit
            );
            return addressEditorWrapper;
        },
        createAddressContentWrapper: function(id) {
            const marker = this.createElement(
                'span',
                { className: 'fa fa-map-marker marker'}
            );
            const content = this.createElement(
                'span',
                {innerText: ' ', className: 'addressContent'}
            );
            this.addressContent = content.innerText;
            const addressContentWrapper = this.createElement(
                'div',
                {id: id, className: 'addressContentWrapper'},
                marker, content
            );
            addressContentWrapper.style.display = 'none';
            this.addressContentWrapper = addressContentWrapper;
            return addressContentWrapper;
        },
        showAddressContent: function() {
            this.addressContentWrapper.style.display = 'block';
        },
        hideAddressContent: function() {
            this.addressContentWrapper.style.display = 'none';
        },
        setAnonymousProp: function() {
            this.callerName.value = this.stringEmpty;
            this.callerNameValue = this.stringEmpty;
            this.callerSecondName.value = this.stringEmpty;
            this.callerSecondNameValue = this.stringEmpty
            this.callerFatherName.value = this.stringEmpty;
            this.callerFatherNameValue = this.stringEmpty;
        }
    };
}());
