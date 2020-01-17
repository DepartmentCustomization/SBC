(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `
                    <div id="containerPatient"></div>
                    `
        ,
        init: function() {
            this.messageService.subscribe('headerAccidentPatient', this.setHeader, this);
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
        }
    };
}());
