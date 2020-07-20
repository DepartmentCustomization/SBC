(function() {
    return {
        title: 'Надійшло звернень за період',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `
                    <div id='container1'>
                        <div id='date-block1'></div>
                    </div>
                    `
        ,
        init: function() {
            this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.setFiltersParams, this));
            //this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.RecalcData, this));
            /*let DateMinusWeek = new Date();
            DateMinusWeek.setDate(DateMinusWeek.getDate() - 0);
            this.start_date = DateMinusWeek;
            this.finish_date = new Date();
            let executeQuery = {
                queryCode: 'SAFS_graph_Returned',
                parameterValues: [
                    {key: "@date_from", value: this.start_date},
                    {key: "@date_to", value: this.finish_date}
                ],
                limit: -1
            };
            this.queryExecutor(executeQuery, this.load, this); */
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
            paragraphFrom.textContent = new Date(dateFrom).toISOString().slice(0,10);
            paragraphTo.textContent = new Date(dateTo).toISOString().slice(0,10);
            container.append(paragraphFrom);
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
            debugger;
            console.log(data)
        }
    };
}());
