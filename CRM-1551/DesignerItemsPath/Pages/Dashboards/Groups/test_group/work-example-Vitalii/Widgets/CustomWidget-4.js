(function () {
  return {
    title: 'Повернуто заявників за період',
    hint: '',
    formatTitle: function() {},
    customConfig:
                `<div id='container5'>
                <div id='date-block5' class='date-block'></div>
                <div id='cell5-info'></div>
                </div>
                
                `
    ,
    init: function() {
        this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.callBack, this));            

        
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
    createDiv({dateFrom,dateTo}){
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        const container = document.getElementById('date-block5');
        if(container.hasChildNodes()){
            container.innerHTML='';
        }
        const paragraphFrom = this.createElement('span',{ className:'date',id:'pFromCon1',name:'date'});
        const paragraphTo = this.createElement('span',{ className:'date',id:'pToCon1',name:'date'});
        paragraphFrom.textContent = new Date(dateFrom).toISOString().slice(0,10);
        paragraphTo.textContent = new Date(dateTo).toISOString().slice(0,10);
        container.insertAdjacentHTML('beforeend',`<span> з </span>`);
        container.append(paragraphFrom);
        container.insertAdjacentHTML('beforeend',`<span> по </span>`);
        container.append(paragraphTo);
            this.resetParams();

    },
    resetParams: function() {
        let executeQuery = {
            queryCode: 'SAFS_MainTable',
            parameterValues: [
                {key: '@date_from', value: this.dateFrom},
                {key: '@date_to', value: this.dateTo}
            ],
            limit: -1
        };
        this.queryExecutor(executeQuery, this.load, this);
    },
    load: function(data) {
        const cellInfo = document.getElementById('cell5-info');
        cellInfo.innerHTML='';
        const p= `<p class='cell-info'>${data.rows[0].values[6]}</p>`;
       cellInfo.insertAdjacentHTML('beforeend',p)
    }
};
}());
