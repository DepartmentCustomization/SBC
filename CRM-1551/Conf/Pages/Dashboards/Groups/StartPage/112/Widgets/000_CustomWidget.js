(function() {
    return {
        title: ' ',
        hint: '',
        customConfig:
                    `
                    <style>
                    </style>
                    <div id=""></div>
                    `
        ,
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
        },
        afterViewInit: function() {
        }
    };
}());