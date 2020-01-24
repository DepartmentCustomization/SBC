(function() {
    return {
        title: ' ',
        hint: '',
        customConfig:
                    `
                    <style>
                    #saveButtonWrapper{
                        position: fixed;
                        right: 20px;
                        bottom: 20px;
                    }
                    #saveButton{
                        height: 40px;
                        width: 40px;
                        background-color: #ff4081;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                    }
                    .fa-save{
                        font-size: 25px;
                        color: #fff!important;
                    }
                    </style>
                    <div id="containerSave"></div>
                    `
        ,
        counter: 0,
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if(children.length) {
                children.forEach(child =>{
                    element.appendChild(child);
                });
            }
            return element;
        },
        init: function() {
            this.messageService.subscribe('saveValues', this.setSaveData, this);
        },
        afterViewInit: function() {
            const container = document.getElementById('containerSave');
            this.container = container;
            const saveButtonWrapper = this.createSaveButtonWrapper();
            container.appendChild(saveButtonWrapper);
        },
        createSaveButtonWrapper: function() {
            const saveButtonIcon = this.createElement('i', { className: 'fa fa-5x fa-save'});
            const saveButton = this.createElement(
                'div',{ id: 'saveButton' }, saveButtonIcon
            );
            saveButton.addEventListener('click', e => {
                e.stopImmediatePropagation();
                this.messageService.publish({name: 'saveAppeal'});
            });
            const saveButtonWrapper = this.createElement(
                'div', { id: 'saveButtonWrapper' }, saveButton
            );
            return saveButtonWrapper;
        },
        setSaveData: function(message) {
            if(message.accidentInfo) {
                this.accidentInfo = message.accidentInfo;
                this.counter++;
            }
            if(message.callerInfo) {
                this.callerInfo = message.callerInfo;
                this.counter++;
            }
            if(message.patientInfo) {
                this.patientInfo = message.patientInfo;
                this.counter++;
            }
            if(this.counter === 3) {
                this.counter = 0;
            }
        }
    };
}());
