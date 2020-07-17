(function () {
  return {
    title: 'Надійшло за',
    hint: '',
    formatTitle: function() {},
    customConfig:
                `<div id='container2'></div>
                <div id='date-block2'></div>
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
        const filter = message.package.value.values.find(f => f.name === 'DateAndTime').value;
        this.createDiv(filter);
    },
    createDiv({dateTo}){
        const container = document.getElementById('date-block2');
        if(container.hasChildNodes()){
            container.innerHTML='';
        }
            const paragraphTo = this.createElement("span",{ className:'date',id:'pFromCon1',name:'date'});
            let yesterday = new Date(dateTo).toISOString().slice(0,10);
            paragraphTo.textContent= new Date(dateTo).toISOString().slice(0,8)+(yesterday.slice(8)-1);
            container.append(paragraphTo);
            
    },
    load: function(data) {
    }
};
}());
