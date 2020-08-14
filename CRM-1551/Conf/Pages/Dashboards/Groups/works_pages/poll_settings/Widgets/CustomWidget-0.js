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
        createStatic(obj = null,fixRow = null) {
            const conStatic = document.getElementById('static');
            conStatic.innerHTML = '';
            const date = new Date().toISOString();
            const convertDate = date.slice(0,16);
            if(obj) {
                const headerBlock = this.createHeaderBlock(obj,fixRow);
                const valueFrom = new Date(obj.dateFrom).toISOString();
                const valueTo = new Date(obj.dateTo).toISOString();
                const dateFrom = this.createData('dateFrom', 'Дата старту',convertDate,valueFrom.slice(0,16),true);
                const dateTo = this.createData('dateTo', 'Дата завершення',convertDate,valueTo.slice(0,16),false);
                const dataBlock = this.createElement('div', {className: 'data-block'});
                const activityButton = this.createActivityButton(obj.activity);
                dataBlock.append(dateFrom,dateTo,activityButton);
                const staticInfo = this.createStaticInfo();
                conStatic.append(headerBlock,dataBlock,staticInfo);
            }else{
                const headerBlock = this.createHeaderBlock();
                const dateFrom = this.createData('dateFrom', 'Дата старту',convertDate,convertDate,true);
                const dateTo = this.createData('dateTo', 'Дата завершення',convertDate,convertDate,false);
                const dataBlock = this.createElement('div', {className: 'data-block'});
                const activityButton = this.createActivityButton();
                dataBlock.append(dateFrom,dateTo,activityButton);
                const staticInfo = this.createStaticInfo();
                conStatic.append(headerBlock,dataBlock,staticInfo);
            }
            const dateValue = document.getElementById('dateFrom');
            dateValue.addEventListener('change',(e)=>{
                const dateTo = document.getElementById('dateTo');
                dateTo.min = e.target.value
                dateTo.value = e.target.value
            })
            this.checkInputParams()
        },
        checkInputParams() {
            const list = document.querySelectorAll('.req-input')
            list.forEach(e=>e.addEventListener('change',this.handleChangeInputs.bind(this)))
        },
        handleChangeInputs() {
            const btn = document.getElementById('main-button-save')
            const listInputs = Array.from(document.querySelectorAll('.req-input'))
            const emptyString = listInputs.find(elem=>elem.value === '')
            if(emptyString) {
                btn.classList.remove('active')
            }else{
                btn.classList.add('active')
            }
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
        createHeaderBlock(obj = null,fixRow = null) {
            const headerBlockProps = {
                className: 'header-block',
                dataRowIndex:obj ? obj.rowId : '',
                id:'header-block'}
            const headerBlock = this.createElement('div', headerBlockProps);
            const inputProps = {className:'interview-name req-input',
                name:'interviewName',
                placeholder:obj ? '' : 'Назва опитування',
                required:'true',
                maxLength: '200',
                value: obj ? obj.name : ''
            }
            const interviewName = this.createElement('input',inputProps);
            const buttonsBlock = this.createElement('div', {className: 'main-buttons-block'});
            const buttonBack = this.createElement('button', {className: 'main-button-back',textContent: 'Назад', id: 'main-button-back'});
            const buttonSaveProps = {
                className: obj ? 'main-button-save active' : 'main-button-save',
                textContent:'Зберегти',
                dataFix: fixRow ? fixRow : false,
                id:'main-button-save'
            }
            const buttonSave = this.createElement('button', buttonSaveProps);
            const wrapper = this.createElement('div', {className: 'modal-wrapper',id:'modal-wrapper'});
            const modal = this.openWarningModal();
            buttonBack.addEventListener('click',this.sendBlockQuery.bind(this))
            buttonSave.addEventListener('click',this.sendBlockQuery.bind(this))
            const interviewDirection = this.createSelect(obj ? obj.direction : '');
            headerBlock.append(interviewName,interviewDirection,buttonsBlock,modal,wrapper);
            buttonsBlock.append(buttonBack,buttonSave);
            return headerBlock
        },
        createInterviewForm() {
            const con = this.createElement('div',{className:'interview-form-con'});
            const inputs = this.createDynamicInputs();
            const select = this.createAnswerType();
            const createTestForm = this.createElement('div',{className:'test-form-con'})
            const quiz = this.createQuiz();
            const addVariant = this.createAddVariantBtn();
            createTestForm.append(quiz);
            const footer = this.createInterviewFormFooter();
            con.append(inputs,select,createTestForm,addVariant,footer)
            return con
        },
        createQuiz() {
            const con = this.createElement('div',{className:'quiz-con'});
            const inputUkr = this.createElement('input',{className:'quiz-variant-ukr quiz-variant',placeholder:'Варіант',required: true})
            const inputRus = this.createElement('input',{className:'quiz-variant-rus quiz-variant',placeholder:'Вариант', required: true})
            const span = this.deleteVariant()
            con.append(inputUkr,span,inputRus)
            return con
        },
        deleteVariant() {
            const span = this.createElement('span',{className:'material-icons delete-variant',textContent:'delete'});
            span.addEventListener('click',(e)=>{
                const warn = document.querySelector('.warning');
                if(warn) {
                    warn.remove()
                }
                e.target.closest('div').remove();
            });
            return span
        },
        createInterviewFormFooter() {
            const con = this.createElement('div',{className:'interview-form-footer'});
            const arrowLeft = this.createElement('span',{className:'arrow material-icons', textContent:'arrow_back'})
            const arrowRight = this.createElement('span',{className:'arrow material-icons', textContent:'arrow_forward'})
            const btnsCon = this.createElement('div',{className:'interview-form-btn-con'});
            const saveBtn = this.createElement('button',{className:'save-form interview-form-btn', textContent:'Зберегти'})
            const cancelBtn = this.createElement('button',{className:'delete-form interview-form-btn', textContent:'Видалити'})
            btnsCon.append(cancelBtn,saveBtn)
            con.append(arrowLeft,btnsCon,arrowRight)
            return con
        },
        createAddVariantBtn() {
            const con = this.createElement('div',{className:'add-variant-con'});
            const addVariant = this.createElement('button',{classList:'add-variant',textContent:'Додати варіант'})
            const span = this.createElement('span',{className:'add-variant-span', textContent:'або'})
            const addYourVariant = this.createElement('button',{classList:'add-your-variant',textContent:'Додати варіант "інше"'})
            addYourVariant.addEventListener('click',this.addYourVariantFunc.bind(this))
            addVariant.addEventListener('click',()=>{
                const mainCon = document.querySelector('.test-form-con')
                const inputList = document.querySelectorAll('.quiz-variant')
                let flag = true;
                inputList.forEach(e=>{
                    if(e.value === '') {
                        flag = false
                    }
                })
                if(flag) {
                    const warn = document.querySelector('.warning');
                    if(warn) {
                        warn.remove()
                    }
                    mainCon.append(this.createQuiz())
                }else {
                    const warn = document.querySelector('.warning');
                    if(warn) {
                        warn.remove()
                    }
                    const warning = '<p class="warning">Всі поля повинні бути заповнені</p>';
                    mainCon.insertAdjacentHTML('beforeend',warning)
                }
            })
            con.append(addVariant,span,addYourVariant);
            return con
        },
        addYourVariantFunc() {
            const mainCon = document.querySelector('.test-form-con')
            const otherVariant = document.querySelector('.other-variant-con')
            if(otherVariant) {
                otherVariant.remove()
            }
            const con = this.createElement('div',{className:'other-variant-con'});
            const div = this.createElement('div',{className:'other-variant',textContent: 'Інше'});
            const deleteDiv = this.deleteVariant();
            con.append(div,deleteDiv)
            mainCon.after(con)
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
        sendBlockQuery(e) {
            const mainCon = document.getElementById('first_widget')
            const tab = document.getElementById('second_widget')
            const modal = document.getElementById('warning-modal');
            const wrapper = document.getElementById('modal-wrapper');
            if(e.target.classList.contains('main-button-back')) {
                modal.classList.add('active')
                wrapper.classList.add('active')
            }else if(e.target.classList.contains('main-button-save')) {
                const values = this.getInputValues();
                const findStr = values.find(({value})=>{
                    return value === '';
                })
                if(findStr) {
                    e.target.classList.remove('active')
                    const saveWarn = document.querySelector('.save-warn')
                    saveWarn ? saveWarn.remove() : null;
                    const warnP = '<p class="red save-warn">Всі поля повинні бути заповнені</p>'
                    e.target.insertAdjacentHTML('afterend',warnP)
                }else{
                    const saveWarn = document.querySelector('.save-warn')
                    saveWarn ? saveWarn.remove() : null;
                    e.target.dataFix ? this.sendUpdateRowQuery(values) : this.sendStaticFormQuery(values)
                    mainCon.style.display = 'block';
                    tab.style.display = 'none';
                }
            }
        },
        sendUpdateRowQuery(arr) {
            let obj = {}
            const rowId = document.getElementById('header-block').dataRowIndex;
            arr.forEach(elem=>{
                return obj[elem.name] = elem.value
            })
            const dateFrom = new Date(obj.dateFrom)
            const dateTo = new Date(obj.dateTo)
            const insertRowQuery = {
                queryCode: 'Polls_UpdateRow',
                limit: -1,
                parameterValues: [
                    {key: '@poll_name', value: obj.interviewName},
                    {key: '@direction_id', value: obj.intDirection},
                    {key: '@start_date', value: dateFrom},
                    {key: '@end_date', value: dateTo},
                    {key: '@is_active', value: obj.status},
                    {key: '@id', value: rowId}
                ]
            };
            this.queryExecutor(insertRowQuery,this.updateGrid,this);
        },
        sendStaticFormQuery(arr) {
            let obj = {}
            arr.forEach(elem=>{
                return obj[elem.name] = elem.value
            })
            const dateFrom = new Date(obj.dateFrom)
            const dateTo = new Date(obj.dateTo)
            const insertRowQuery = {
                queryCode: 'Polls_InsertRow',
                limit: -1,
                parameterValues: [
                    {key: '@poll_name', value: obj.interviewName},
                    {key: '@direction_id', value: obj.intDirection},
                    {key: '@start_date', value: dateFrom},
                    {key: '@end_date', value: dateTo},
                    {key: '@is_active', value: obj.status}
                ]
            };
            this.queryExecutor(insertRowQuery,this.updateGrid,this);
        },
        updateGrid() {
            const msg = {
                name: 'updateDataGrid'
            }
            this.messageService.publish(msg);
        },
        getInputValues() {
            const inputs = Array.from(document.querySelectorAll('.req-input'));
            const active = {
                name:'status',
                value:document.querySelector('.activity').status
            };
            const newArray = inputs.map(({name,value})=>{
                const obj = {
                    name, value
                }
                return obj
            })
            newArray.push(active)
            return newArray
        },
        openWarningModal() {
            const modal = this.createElement('div',{className:'warning-modal',id:'warning-modal'});
            const props = {className:'modal-title',textContent:'Ви дійсно хочете вийти з процесу створення опитування?'}
            const h2 = this.createElement('h2',props);
            const tab = document.getElementById('second_widget')
            const mainCon = document.getElementById('first_widget')
            const buttonAccept = this.createElement('button',{className:'modal-accept modal-btn',textContent:'Так'});
            const buttonCancel = this.createElement('button',{className:'modal-cancel modal-btn',textContent:'Ні'});
            modal.addEventListener('click',(e)=>{
                if(e.target.classList.contains('modal-accept')) {
                    const wrapper = document.getElementById('modal-wrapper');
                    e.target.closest('.warning-modal').classList.remove('active');
                    wrapper.classList.remove('active')
                    mainCon.style.display = 'block';
                    tab.style.display = 'none';
                }else if(e.target.classList.contains('modal-cancel')) {
                    const wrapper = document.getElementById('modal-wrapper');
                    e.target.closest('.warning-modal').classList.remove('active');
                    wrapper.classList.remove('active')

                }
            })
            modal.append(h2,buttonAccept,buttonCancel)
            return modal
        },
        createActivityButton(activity = null) {
            const con = this.createElement('div',{className:'activity-block'});
            const spanProps = {
                className:'material-icons red activity',
                textContent:'pause_circle_filled',
                status:'false'
            }
            const span2Props = {
                className:'material-icons green activity',
                textContent:'play_circle_filled',
                status:'true'
            }
            const span = this.createElement('span',spanProps)
            const span2 = this.createElement('span',span2Props)
            con.append(activity ? span : span2);
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
        createSelect(prop) {
            const select = this.createElement('select', {className: 'interview-direction req-input',name:'intDirection'});
            const options = this.selectData.map(elem=>`<option class='interview-option' value=${elem.id}>${elem.name}</option>`);
            const index = options.findIndex(elem=>elem.includes(prop))
            const item = options.splice(index,1)
            options.unshift(item)
            select.insertAdjacentHTML('beforeend',options.join(''))
            return select
        },
        createData(id,textContent,minDate,valueDate = null,req = false) {
            const dateBlock = this.createElement('div', {className: 'date-block'});
            let required = req;
            let props = {
                className:'date-input req-input',
                required,
                type:'datetime-local',
                id:`${id}`,
                min:`${minDate}`,
                value:valueDate ? valueDate : minDate,
                name: `${id}`
            }
            const dateInput = this.createElement('input',props)
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
            const props = message.package.options;
            const fixRow = message.package.fixRow;
            if(props) {
                this.createStatic(props,fixRow)
            }else{
                this.createStatic()
            }
            this.createDynamic()
        }
    };
}());
