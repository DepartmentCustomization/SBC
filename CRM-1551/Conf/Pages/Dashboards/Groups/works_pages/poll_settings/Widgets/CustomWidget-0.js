(function() {
    return {
        title: 'Опитування',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `
                    <div class='interview-container'>
                        <div class='static' id='static'></div>
                    </div>
                    `
        ,
        init: function() {
            this.subscribers.push(this.messageService.subscribe('setVisibilityBlock', this.setVisibilityTableContainer, this));
            this.executeListPollDirection();
        },
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if(children.length > 0) {
                children.forEach(child =>{
                    element.appendChild(child);
                });
            } return element;
        },
        createStatic() {
            const conStatic = document.getElementById('static');
            const headerBlock = this.createElement('div', {className: 'header-block'});
            const interviewName = this.createElement('input',{className:'interview-name',placeholder:'Назва опитування',required:'true'});
            const buttonsBlock = this.createElement('div', {className: 'main-buttons-block'});
            const buttonBack = this.createElement('button', {className: 'main-button-back',textContent: 'Назад', id: 'main-button-back'});
            const buttonSave = this.createElement('button', {className: 'main-button-save',textContent:'Зберегти',id:'main-button-save'});
            const dateFrom = this.createData('date-from', 'Дата старту');
            const dateTo = this.createData('date-to', 'Дата завершення');
            const dataBlock = this.createElement('div', {className: 'data-block'});
            buttonsBlock.append(buttonBack,buttonSave);
            const interviewDirection = this.createSelect();
            headerBlock.append(interviewName,interviewDirection,buttonsBlock);
            dataBlock.append(dateFrom,dateTo);
            conStatic.append(headerBlock,dataBlock);
        },
        createSelect() {
            const select = this.createElement('select', {className: 'interview-direction'});
            const options = this.selectData.map(elem=>`<option class='interview-option' value=${elem.id}>${elem.name}</option>`).join('');
            select.insertAdjacentHTML('beforeend',options)
            return select
        },
        createData(id,textContent) {
            const dateBlock = this.createElement('div', {className: 'date-block'});
            const dateInput = this.createElement('input', { className: 'date-input' , type: 'date' , id: `${id}`})
            const dateLabel = this.createElement('label', {className: 'label-data', for: `${id}`, textContent:`${textContent}`});
            dateBlock.append(dateLabel,dateInput)
            return dateBlock
        },
        executeListPollDirection() {
            let executeQuery = {
                queryCode: 'List_PollDirection',
                limit: -1,
                parameterValues: [ {key:'@pageOffsetRows' , value:0},{key: '@pageLimitRows', value: 50} ],
                sortColumns: [
                    {
                        key: 'Id',
                        value: 0
                    }
                ]
            };
            this.queryExecutor(executeQuery,this.setSelectData,this);
            this.showPreloader = false;
        },
        setSelectData({rows}) {
            this.selectData = rows.map(({values})=>{
                const obj = {
                    id: values[0],
                    name: values[1]
                }
                return obj
            });
        },
        setVisibilityTableContainer(message) {
            const con = message.package.container
            con.style.display = message.package.display;
            this.createStatic()
        },
        load: function() {
        }
    };
}());
