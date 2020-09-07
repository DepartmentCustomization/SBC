(function() {
    return {
        title: '',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `
                    <div id='container1'>
                        <div id='date-block1' class='date-block'></div>
                        <div id='cell1-info' class='cell-block'></div>
                    </div>
                    `
        ,
        init: function() {
            this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.setFiltersParams, this));
            this.firstLoad = true;
            this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.resetParams, this));
        },
        setTitle() {
            const title = document.querySelector('#CustomWidget-0 #title')
            let text = '<span class="material-icons first">person</span> <span class="widget-title">Користувачі</span>'
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
        closeModal(e) {
            const con = e.target.closest('.modal')
            con.classList.remove('active')
        },
        openModal(e) {
            if(e.target.classList.contains('info-button')) {
                const main = document.querySelector('.root-main')
                const modal = this.createElement('div',{classList:'modal active',id:'modal'})
                const widget = e.target.closest('.cell-item')
                const infoList = Array.from(widget.querySelectorAll('.cell-info'))
                const titleText = widget.querySelector('.widget-title').textContent
                const title = this.createElement('h2',{textContent:titleText,classList:'modal-title'})
                const infoValue = infoList.map(elem=>{
                    return elem.textContent
                })
                const arr = [
                    'загальна кількість унікальних заявників з сайту'
                    ,'користувачі, що залишали хоча б 1 звернення'
                    , 'верифіковані користувачі']
                const iconsArr = ['<span class="material-icons first">person</span>',
                    '<span class="material-icons first">local_post_office</span>',
                    '<span class="material-icons first">done</span>']
                const infoArr = arr.map(item=>{
                    const index = arr.indexOf(item)
                    return `<p>${iconsArr[index]} ${item}: ${infoValue[index]}</p>`
                }).join('')
                const closeBtn = this.createElement('span',{textContent: 'x',id:'close-modal',classList:'close-modal'})
                closeBtn.addEventListener('click',this.closeModal.bind(this))
                modal.append(title,closeBtn)
                modal.insertAdjacentHTML('beforeend',infoArr)
                main.insertAdjacentElement('beforeend',modal)
            }
        },
        load: function(data) {
            this.setTitle()
            const list = document.querySelectorAll('#CustomWidget-0,#CustomWidget-1,#CustomWidget-2,#CustomWidget-3,#CustomWidget-4')
            list.forEach(e=>{
                e.addEventListener('click',this.openModal.bind(this))
                e.classList.add('cell-item')
            })
            const cellInfo = document.getElementById('cell1-info');
            cellInfo.innerHTML = '';
            const applicants = data.rows[0].values[7];
            const p = `<p class='cell-info active'><i class="fa fa-users first"></i> ${applicants}</p>`;
            const more1Appeals = `<span class="material-icons first">
            local_post_office</span> <span class='cell-info'>${data.rows[0].values[8]}</span>`;
            const verified = `<span class="material-icons first">
            done</span> <span class='cell-info'>${data.rows[0].values[9]}</span>`;
            const infoBtn = this.createElement('span',{classList:'info-button',id:'info-button'})
            infoBtn.insertAdjacentHTML('beforeend','<span class="material-icons info-button">info</span>')
            cellInfo.insertAdjacentHTML('beforeend',`${p} ${more1Appeals} ${verified}`);
            cellInfo.append(infoBtn)
        }
    };
}());
