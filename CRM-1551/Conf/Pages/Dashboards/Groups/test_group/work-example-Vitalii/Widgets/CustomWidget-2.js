(function () {
  return {
    title: 'Зараз на модерації',
    hint: '',
    formatTitle: function() {},
    customConfig:
                `<div id='container3'></div>
                <div id='date-block3'></div>
                `
    ,
    init: function() {
        this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.callBack, this));            
            this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.applyCallBack, this));            

        
    },
    afterViewInit() {
        
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
    callBack: function(message) {
       
    },
    load: function(data) {
    }
};
}());
