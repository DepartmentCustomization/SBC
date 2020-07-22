(function() {
    return {
        title: 'Надійшло за',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `<div id='container2'>
                    <div id='date-block2' class='date-block'></div>
                    <div id='cell2-info'></div>
                    </div>
                    
                    `
        ,
        init: function() {
            this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.callBack, this));
            this.firstLoad = true;
            this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.resetParams, this));
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
        createDiv({dateFrom,dateTo}) {
            const date = new Date();
            this.dateFrom = dateFrom;
            this.dateTo = dateTo;
            const container = document.getElementById('date-block2');
            if(container.hasChildNodes()) {
                container.innerHTML = '';
            }
            const paragraphTo = this.createElement('span',{ className:'date',id:'pFromCon1',name:'date'});
            paragraphTo.textContent = this.changeDateTimeValues(date);
            container.append(paragraphTo);
            if(this.firstLoad) {
                this.firstLoad = false;
                this.resetParams()
            }
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
        changeDateTimeValues: function(value) {
            let date = new Date(value);
            let dd = (date.getDate() - 1).toString();
            let mm = (date.getMonth() + 1).toString();
            let yyyy = date.getFullYear().toString();
            dd = dd.length === 1 ? '0' + dd : dd;
            mm = mm.length === 1 ? '0' + mm : mm;
            return `${dd}.${mm}.${yyyy}`;
        },
        load: function(data) {
            const cellInfo = document.getElementById('cell2-info');
            cellInfo.innerHTML = '';
            let exam = '';
            if(data.rows[0].values[2] > 0) {
                exam = '<i class="fa fa-arrow-up"></i>';
            }else{
                exam = '<i class="fa fa-arrow-down"></i>'
            }
            const p = `<p class='cell-info'>${data.rows[0].values[2]}</p>`;
            const pDelta = `<p class='cell-info num'>${exam} ${data.rows[0].values[3]}</p>`;
            cellInfo.insertAdjacentHTML('beforeend',`${p} ${pDelta}`)
        }
    };
}());
