(function() {
    return {
        title: ' ',
        hint: '',
        customConfig:
                    `
                    <style>
                        #searchAddressFields{
                            margin-top: 10px;
                        }
                        #searchAddTextContent{
                            margin: 10px 0 7px;
                            width: 100%;
                            height: 100%;
                            border: none;
                            outline: none;
                            padding: 5px;
                            border: 1px solid rgb(169, 169, 169);
                        }
                        #fullAddressValue{
                            height: 40px;
                            background-color: #fff;
                            box-shadow: 0 0 2px 3px rgba(0,0,0,.1);
                            padding: 5px;
                        }
                        .searchButtonsWrapper{
                            margin: 10px 0;
                            display: flex;
                            justify-content: space-around;
                        }
                        .searchBtnCancel{
                            border: 1px solid #c4c4c4;
                            color: #3e50b4 !important;
                            box-shadow: 0 0 2px 3px rgba(0,0,0,.1);
                        }
                        .searchBtnAccept{
                            background-color: #3e50b4;
                            border-color: #3e50b4;
                            color: white !important;
                            
                        }
                    </style>
                    <div id="searchAddressFields"></div>
                    `
        ,
        houseEntrance: null,
        houseEntranceCode: null,
        houseFloorsCounter: null,
        flatFloor: null,
        flatApartmentOffice: null,
        flatExit: null,
        fullAddressValue: null,
        init: function() {
            this.searchAddressContainer = document.getElementById('searchAddressContainer');
            this.messageService.subscribe('showSearchAddressContainer', this.showSearchAddressContainer, this);
            this.messageService.subscribe('hideSearchAddressContainer', this.hideSearchAddressContainer, this);
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
            const container = document.getElementById('searchAddressFields');
            this.container = container;
            const housePropertiesWrapper = this.createHousePropertiesWrapper();
            const flatPropertiesWrapper = this.createFlatPropertiesWrapper();
            const searchAddInfoWrapper = this.createSearchAddInfoWrapper();
            const fullAddressWrapper = this.createFullAddressWrapper();
            const searchButtonsWrapper = this.createSearchButtonsWrapper();
            this.addContainerChild(
                housePropertiesWrapper,
                flatPropertiesWrapper,
                searchAddInfoWrapper,
                fullAddressWrapper,
                searchButtonsWrapper
            );
        },
        addContainerChild: function(...params) {
            params.forEach(item => this.container.appendChild(item));
        },
        createHousePropertiesWrapper: function() {
            const houseEntrance = this.createTextInput('Під\'їзд', 'text', true);
            const houseEntranceCode = this.createTextInput('Код під\'їзду', 'text', true);
            const houseFloorsCounter = this.createTextInput('Кількість поверхів', 'text', false);
            const propertiesWrapper = this.createElement(
                'div',
                { className: 'propertiesWrapper bgcLightGrey'},
                houseEntrance, houseEntranceCode, houseFloorsCounter
            );
            return propertiesWrapper;
        },
        createFlatPropertiesWrapper: function() {
            const flatFloor = this.createTextInput('Поверх', 'text', true);
            const flatApartmentOffice = this.createTextInput('Квартира/Офіс', 'text', true);
            const flatExit = this.createTextInput('Вхід', 'text', false);
            const propertiesWrapper = this.createElement(
                'div',
                { className: 'propertiesWrapper bgcLightGrey'},
                flatFloor, flatApartmentOffice, flatExit
            );
            return propertiesWrapper;
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
                'div', {className: 'textWrapper topLeftRightPadding botPadding'}, textInputWrapper
            );
            if(borderRight) {
                wrapper.classList.add('rightSeparator');
            }
            return wrapper;
        },
        createSearchAddInfoWrapper: function() {
            const accidentTextContent = this.createElement(
                'textarea',
                { id: 'searchAddTextContent', placeholder: 'Додаткова інформація'}
            );
            const accidentTextContentWrapper = this.createElement(
                'div',
                { className: 'accidentTextContentWrapper' },
                accidentTextContent
            );
            return accidentTextContentWrapper;
        },
        createFullAddressWrapper: function() {
            const params = {
                text: 'Адреса',
                iconClass: 'fa fa-map'
            }
            const fullAddressHeader = this.createHeader(params);
            const fullAddressValue = this.createElement(
                'div',
                { id: 'fullAddressValue', innerText: ' ' }
            );
            this.fullAddressValue = fullAddressValue;
            const fullAddressWrapper = this.createElement(
                'div',
                { className: 'fullAddressWrapper'},
                fullAddressHeader, fullAddressValue
            );
            return fullAddressWrapper;
        },
        createHeader: function(params) {
            const text = params.text;
            const iconClass = params.iconClass;
            const icon = this.createElement('span', { className: iconClass});
            const iconWrapper = this.createElement('span', { className: 'iconWrapper'}, icon);
            const headerText = this.createElement('span', { innerText: text});
            const header = this.createElement('div', { className: 'header'}, iconWrapper, headerText);
            return header;
        },
        createSearchButtonsWrapper: function() {
            const btnSearchAccept = this.createStatusBtn('btnSearchAccept', 'Прийняти', 'searchBtnAccept');
            const btnSearchCancel = this.createStatusBtn('btnSearchCancel', 'Скасувати', 'searchBtnCancel');
            const searchButtonsWrapper = this.createElement(
                'div',
                { className: 'searchButtonsWrapper'},
                btnSearchAccept, btnSearchCancel
            );
            return searchButtonsWrapper;
        },
        createStatusBtn: function(id, text, className) {
            const btn = this.createElement(
                'button',
                { className: 'btn callerStatusBtn ', id: id, innerText: text, value: 0 }
            );
            btn.classList.add(className);
            return btn;
        },
        showSearchAddressContainer: function() {
            this.searchAddressContainer.style.display = 'block';
        },
        hideSearchAddressContainer: function() {
            this.searchAddressContainer.style.display = 'none';
        }
    };
}());