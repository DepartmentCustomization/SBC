(function() {
    return {
        title: ' ',
        hint: ' ',
        formatTitle: function() {},
        customConfig:
                `<div id='modalContainer'></div>`
        ,
        init: function() {
            
        },
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            const zeroLength = 0;
            if(children.length > zeroLength) {
                children.forEach(child =>{
                    element.appendChild(child);
                });
            }
            return element;
        },
        afterViewInit: function() {
            const styleProperties = {
                color: 'red',
                padding: '10px',
                fontSize: '40px',
                border: '4px solid red',
                backgroundColor: 'black',
                boxShadow: '10px 10px black'
            }
            const modalContainer = document.getElementById('modalContainer');
            const title  = this.createElement('div', {innerText: 'Custom element on Dashboard'});
            const button  = this.createElement('app-custom-select', {
                style: styleProperties,
                label: 'angular custom button on DB'
            });
            modalContainer.append(title, button);
        },
    };
}());
