(function() {
    return {
        title: 'Надійшло звернень за період',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `
                    <div id='container1'>
                        <div id='date-block1' class='date-block'></div>
                        <div id='cell1-info'></div>
                    </div>
                    `
        ,
        init: function() {
            this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.setFiltersParams, this));
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
        setFiltersParams: function(message) {
            const filter = message.package.value.values.find(f => f.name === 'DateAndTime').value;
            this.createDiv(filter);
        },
        createDiv({dateFrom,dateTo}) {
            this.dateFrom = dateFrom
            this.dateTo = dateTo;
            const container = document.getElementById('date-block1');
            if(container.hasChildNodes()) {
                container.innerHTML = '';
            }
            const paragraphFrom = this.createElement('span',{ className:'date',id:'pFromCon1',name:'date'});
            const paragraphTo = this.createElement('span',{ className:'date',id:'pToCon1',name:'date'});
            paragraphFrom.textContent = this.changeDateTimeValues(dateFrom);
            paragraphTo.textContent = this.changeDateTimeValues(dateTo);
            container.insertAdjacentHTML('beforeend','<span> з </span>');
            container.append(paragraphFrom);
            container.insertAdjacentHTML('beforeend','<span> по </span>');
            container.append(paragraphTo);
            if(this.firstLoad) {
                this.firstLoad = false;
                this.resetParams()
            }
        },
        changeDateTimeValues: function(value) {
            let date = new Date(value);
            let dd = date.getDate().toString();
            let mm = (date.getMonth() + 1).toString();
            let yyyy = date.getFullYear().toString();
            dd = dd.length === 1 ? '0' + dd : dd;
            mm = mm.length === 1 ? '0' + mm : mm;
            return `${dd}.${mm}.${yyyy}`;
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
            const list = document.querySelectorAll('#CustomWidget-0,#CustomWidget-1,#CustomWidget-2,#CustomWidget-3,#CustomWidget-4')
            list.forEach(e=>e.classList.add('cell-item'))
            const cellInfo = document.getElementById('cell1-info');
            cellInfo.innerHTML = '';
            const p = `<p class='cell-info'>${data.rows[0].values[1]}</p>`;
            cellInfo.insertAdjacentHTML('beforeend',p)
        }
    };
}());
