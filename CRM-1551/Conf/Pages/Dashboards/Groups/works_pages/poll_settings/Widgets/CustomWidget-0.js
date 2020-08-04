(function() {
    return {
        title: 'Опитування',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `
                    <div class='interview-container'>
                        <div class='static' id='static'></div>
                        <div class='dynamic' id='dynamic'></div>
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
            conStatic.innerHTML = '';
            const headerBlock = this.createHeaderBlock();
            const dateFrom = this.createData('date-from', 'Дата старту');
            const dateTo = this.createData('date-to', 'Дата завершення');
            const dataBlock = this.createElement('div', {className: 'data-block'});
            const activityButton = this.createActivityButton();
            dataBlock.append(dateFrom,dateTo,activityButton);
            const staticInfo = this.createStaticInfo();
            conStatic.append(headerBlock,dataBlock,staticInfo);
        },
        createDynamic() {
            const conDynamic = document.getElementById('dynamic');
            conDynamic.innerHTML = '';
            const dynamicHeader = this.createElement('div',{className: 'dynamic-header'});
            const addNewForm = this.createAddNewForm();
            const formList = this.createFormList();
            const interviewForm = this.createInterviewForm();
            dynamicHeader.append(formList,addNewForm);
            conDynamic.append(dynamicHeader,interviewForm);
        },
        createHeaderBlock() {
            const headerBlock = this.createElement('div', {className: 'header-block'});
            const interviewName = this.createElement('input',{className:'interview-name',placeholder:'Назва опитування',required:'true'});
            const buttonsBlock = this.createElement('div', {className: 'main-buttons-block'});
            const buttonBack = this.createElement('button', {className: 'main-button-back',textContent: 'Назад', id: 'main-button-back'});
            const buttonSave = this.createElement('button', {className: 'main-button-save',textContent:'Зберегти',id:'main-button-save'});
            buttonBack.addEventListener('click',this.sendBlockQuery)
            buttonSave.addEventListener('click',this.sendBlockQuery)
            const interviewDirection = this.createSelect();
            headerBlock.append(interviewName,interviewDirection,buttonsBlock);
            buttonsBlock.append(buttonBack,buttonSave);
            return headerBlock
        },
        createInterviewForm() {
            const con = this.createElement('div',{className:'interview-form-con'});
            const inputs = this.createDynamicInputs();
            const select = this.createAnswerType();
            const quiz = this.createQuiz();
            const addVariant = this.createAddVariantBtn();
            con.append(inputs,select,quiz,addVariant)
            return con
        },
        createQuiz() {
            const con = this.createElement('div',{className:'quiz-con'});
            const input = this.createElement('input',{className:'quiz-variant',placeholder:'Варіант1'})
            input.addEventListener('keypress',function(e) {
                if(e.keyCode === 13) {
                    const newInput = input.cloneNode();
                    input.after(newInput)
                }
            })
            con.append(input)
            return con
        },
        createAddVariantBtn() {
            const con = this.createElement('div',{className:'add-variant-con'});
            const addVariant = this.createElement('button',{classList:'add-variant',textContent:'Додати варіант'})
            addVariant.addEventListener('click',()=>{
                const quizCon = document.querySelector('.quiz-con')
                quizCon.append(this.createQuiz())
            })
            addVariant.addEventListener('keypress',(e)=>{
                if(e.keyCode === 13) {
                    const quizCon = document.querySelector('.quiz-con')
                    quizCon.append(this.createQuiz())
                }
            })
            con.append(addVariant);
            return con
        },
        createAnswerType() {
            const con = this.createElement('div',{className:'answer-type-con'});
            const select = this.createElement('select',{className:'answer-type'});
            const options = this.createElement('option',{className: 'answer-type-value',textContent:'Тип відповіді'});
            select.append(options)
            con.append(select)
            return con
        },
        createDynamicInputs() {
            const con = this.createElement('div',{className:'dynamic-inputs-con'})
            const inputUkr = this.createElement('input',{className:'dynamic-input ukr', placeholder:'Внесіть назву питання'})
            const inputRus = this.createElement('input',{className:'dynamic-input rus',placeholder:'Внесите название вопроса (русский)'})
            con.append(inputUkr,inputRus);
            return con;
        },
        createFormList() {
            const arr = [1,2,3];
            const newArr = arr.map(e=>`<li class='form-list-item'>${e}</li>`).join('');
            const ul = this.createElement('ul',{classList: 'form-list'});
            ul.insertAdjacentHTML('beforeend',`${newArr}`);
            return ul
        },
        createAddNewForm() {
            const className = 'add-new-form material-icons'
            const button = this.createElement('button',{className:`${className}`,textContent:'add'});
            return button
        },
        sendBlockQuery() {
            const mainCon = document.getElementById('first_widget')
            const tab = document.getElementById('second_widget')
            mainCon.style.display = 'block';
            tab.style.display = 'none';
        },
        createActivityButton() {
            const con = this.createElement('div',{className:'activity-block'});
            const span = this.createElement('span',{className:'material-icons red activity',textContent:'pause_circle_filled'})
            const span2 = this.createElement('span',{className:'material-icons green activity',textContent:'play_circle_filled'})
            con.append(span);
            con.addEventListener('click',(e)=>{
                if(e.target.classList.contains('red')) {
                    con.innerHTML = '';
                    con.append(span2);
                }else{
                    con.innerHTML = '';
                    con.append(span);
                }
            })
            return con
        },
        createStaticInfo() {
            const con = this.createElement('div',{className:'static-info-block'});
            const chosenPeople = this.createChosenPeople();
            const addPeople = this.createAddPeople();
            const limit = this.createLimitPeople();
            con.append(chosenPeople,addPeople,limit);
            return con
        },
        createChosenPeople() {
            const chosenPeople = this.createElement('div',{className:'chosen-people-block'});
            const peopleValue = this.createElement('p',{className: 'people-value',textContent:'2500'});
            const chosenPeopleLabel = this.createElement('p',{className:'people-label',textContent:'Вибрано людей для опитування'});
            chosenPeople.append(peopleValue,chosenPeopleLabel);
            return chosenPeople
        },
        createAddPeople() {
            const con = this.createElement('div',{className:'add-people-block'});
            const addPeopleLabel = this.createElement('p',{className:'add-people-label',textContent:'Додати людей для опитування'});
            const className = 'add-people-button material-icons'
            const button = this.createElement('button',{className:`${className}`,textContent:'add'});
            con.append(button,addPeopleLabel);
            return con
        },
        createLimitPeople() {
            const con = this.createElement('div',{className:'limit-people-block'});
            const limitValue = this.createElement('input',{className:'limit-value',placeholder:'100',type: 'number'});
            const limitLabel = this.createElement('p',{className:'limit-label',textContent:'Ліміт людей для опитування'});
            con.append(limitValue,limitLabel);
            return con
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
            this.createDynamic()
        },
        load: function() {
        }
    };
}());
