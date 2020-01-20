(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
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
                    </style>
                    <div id="containerCaller"></div>
                    `
        ,
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
            if(children.length > 0) {
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
            const callerName = this.createCallerName();
            this.addContainerChild(
                this.header,
                propertiesWrapper,
                callerName
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
                { className: 'propertiesWrapper borderBottom'},
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
            const callerCheckBoxWrapper = this.createElement(
                'div',
                { className: 'checkBoxWrapper callerCheckBoxWrapper topLeftRightPadding botPadding rightSeparator'},
                checkBox, label
            );
            return callerCheckBoxWrapper;
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
                'div', {className: 'textWrapper topLeftRightPadding botPadding'}, textInputWrapper
            );
            if(separator) { wrapper.classList.add('rightSeparator'); }
            return wrapper;
        },
        createCallerName: function() {
            const callerSecondName = this.createTextInput('Прізвище', 'text', true);
            const callerName = this.createTextInput('Iм\'я', 'text', true);
            const callerFatherName = this.createTextInput('По батькові', 'text', false);
            const callerNameWrapper = this.createElement(
                'div',
                { className: 'callerNameWrapper borderBottom'},
                callerSecondName, callerName, callerFatherName
            );
            return callerNameWrapper;
        }
    };
}());
