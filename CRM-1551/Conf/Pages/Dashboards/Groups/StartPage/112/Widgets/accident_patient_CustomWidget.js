(function() {
    return {
        title: ' ',
        hint: '',
        customConfig:
                    `
                    <style>
                    .patientSexWrapper{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 220px;
                    }
                    .patientCheckBoxWrapper {
                        justify-content: center;
                    }
                    </style>
                    <div id="containerPatient"></div>
                    `
        ,
        init: function() {
            const widget = document.getElementById('accident_patient');
            this.widget = widget;
            const status = 'none';
            const name = 'showHideWidget';
            const message = { name, widget, status};
            this.messageService.publish(message);
            this.messageService.subscribe('headerAccidentPatient', this.setHeader, this);
            this.messageService.subscribe('changeHeaderCaption', this.changeHeaderCaption, this);
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
            const container = document.getElementById('containerPatient');
            this.container = container;
            this.createHeader();
            const propertiesWrapper = this.createPropertiesWrapper();
            const patientNameWrapper = this.createPatientNameWrapper();
            const addressWrapper = this.createAddressWrapper();
            this.addContainerChild(
                this.header,
                propertiesWrapper,
                patientNameWrapper,
                addressWrapper
            );
        },
        createHeader: function() {
            const header = {
                text: 'Пацієнт',
                iconClass: 'fa fa-user',
                widget: 'AccidentPatient'
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
            const patientSexWrapper = this.createPatientSexWrapper();
            const patientAge = this.createTextInput('Вiк', 'text', true);
            const patientBirthday = this.createTextInput('Дата народження', 'date', true);
            const patientPhoneNumber = this.createTextInput('Телефон', 'text', false);
            const propertiesWrapper = this.createElement(
                'div',
                { className: 'propertiesWrapper bgcLightGrey'},
                patientSexWrapper, patientBirthday, patientAge, patientPhoneNumber
            );
            return propertiesWrapper;
        },
        createTextInput: function(text, type, separator) {
            const input = this.createElement('input',
                {
                    type: type,
                    className: 'input textInput'
                }
            );
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
            if(separator) {
                wrapper.classList.add('rightSeparator');
            }
            return wrapper;
        },
        createPatientSexWrapper: function() {
            const checkBoxMale = this.createPatientCheckBox('Ч', 'checkBoxMale');
            const checkBoxFemale = this.createPatientCheckBox('Ж', 'checkBoxFemale');
            const patientSexWrapper = this.createElement(
                'div',
                { className: 'patientSexWrapper rightSeparator wrapBorderBot bgcLightGrey'},
                checkBoxMale, checkBoxFemale
            );
            return patientSexWrapper;
        },
        createPatientCheckBox: function(text, id) {
            const label = this.createElement(
                'span',
                { className: 'patientCheckBoxLabel', id: id, innerText: text}
            );
            const checkBox = this.createElement(
                'input',
                { className: 'patientCheckBox checkBox', type: 'checkBox'}
            );
            const patientCheckBoxWrapper = this.createElement(
                'div',
                { className: 'patientCheckBoxWrapper checkBoxWrapper bgcLightGrey'},
                checkBox, label
            );
            return patientCheckBoxWrapper;
        },
        createPatientNameWrapper: function() {
            const callerSecondName = this.createTextInput('Прізвище', 'text', true);
            const callerName = this.createTextInput('Iм\'я', 'text', true);
            const callerFatherName = this.createTextInput('По батькові', 'text', false);
            const callerNameWrapper = this.createElement(
                'div',
                { className: 'callerNameWrapper wrapBorderBot bgcLightGrey'},
                callerSecondName, callerName, callerFatherName
            );
            return callerNameWrapper;
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
                'btnPatientAddressClear',
                'btnPatientAddressEdit'
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
        changeHeaderCaption: function(message) {
            const caption = message.caption;
            this.header.lastElementChild.innerText = caption;
        }
    };
}());
