(function() {
    return {
        title: 'Заявників без адреси',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `<div id='container4'>
                    <div id='date-block4' class='date-block'></div>
                    <div id='cell4-info' class='cell-block'></div>
                    </div>
                
                    `
        ,
        init: function() {
            this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.callBack, this));
            this.firstLoad = true;
            this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.resetParams, this));
        },
        setTitle() {
            const title = document.querySelector('#CustomWidget-3 #title')
            let text = '<span class="material-icons fourth">devices</span> <span class="widget-title">Платформа</span>'
            title.innerHTML = text
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
            this.dateFrom = dateFrom;
            this.dateTo = dateTo;
            const container = document.getElementById('date-block4');
            if(container.hasChildNodes()) {
                container.innerHTML = '';
            }
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
                    {key: '@date_from', value: this.toUTC(this.dateFrom)},
                    {key: '@date_to', value: this.dateTo}
                ],
                limit: -1
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        toUTC(val) {
            let date = new Date(val);
            let year = date.getFullYear();
            let monthFrom = date.getMonth();
            let dayTo = date.getDate();
            let hh = date.getHours();
            let mm = date.getMinutes();
            let dateTo = new Date(year, monthFrom , dayTo, hh + 3, mm)
            return dateTo
        },
        load: function(data) {
            this.setTitle()
            const cellInfo = document.getElementById('cell4-info');
            cellInfo.innerHTML = '';
            const windowsVal = data.rows[0].values[10];
            const windowsP = `<p class='cell-info active'><span class="material-icons fourth"> laptop</span> ${windowsVal}</p>`;
            const androidVal = data.rows[0].values[11];
            const androidText = `<span><span class="material-icons fourth">android</span> ${androidVal}</span>`
            const appleVal = data.rows[0].values[12];
            const appleText = `<span><span class="material-icons fourth">ios</span> ${appleVal}</span>`
            cellInfo.insertAdjacentHTML('beforeend',`${windowsP} ${androidText} ${appleText}`)
            const infoBtn = this.createElement('span',{classList:'info-button',id:'info-button'})
            infoBtn.insertAdjacentHTML('beforeend','<span class="material-icons info-button">info</span>')
            cellInfo.append(infoBtn)
        }
    };
}());
