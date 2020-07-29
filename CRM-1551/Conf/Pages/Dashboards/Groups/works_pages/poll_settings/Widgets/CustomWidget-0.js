(function() {
    return {
        title: 'Опитування',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `
                    <div class='interview-container'>
                        <div class='static' id='static'></div>
                    </div>
                    `
        ,
        init: function() {
        },
        afterViewInit() {
            this.createStatic()
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
        createStatic() {
            const conStatic = document.getElementById('static');
            const interviewName = this.createElement('input',{className:'interview-name',placeholder:'Назва опитування',required:'true'});
            const buttonsBlock = this.createElement('div', {className: 'main-buttons-block'});
            const buttonBack = this.createElement('button', {className: 'main-button-back',textContent: 'Назад', id: 'main-button-back'});
            const buttonSave = this.createElement('button', {className: 'main-button-save',textContent: 'Назад', id: 'main-button-save'});
            buttonsBlock.append(buttonBack,buttonSave);
            conStatic.append(interviewName,buttonsBlock);
        },
        load: function() {
        }
    };
}());
