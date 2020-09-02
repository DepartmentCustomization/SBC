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
                const staticInfo = this.createStaticInfo(obj);
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
            const questionsCon = this.createElement('div',{className: 'questions-container'});
            conDynamic.innerHTML = '';
            const dynamicHeader = this.createElement('div',{className: 'dynamic-header'});
            const addNewForm = this.createAddNewForm();
            this.itemIndex = 1;
            const formList = this.createFormList();
            formList.addEventListener('click',this.slideEffect.bind(this))
            const formListItem = this.createFormListItem()
            formList.append(formListItem)
            addNewForm.addEventListener('click',()=>{
                const item = this.createFormListItem();
                item.classList.remove('active')
                const props = {
                    dataId: item.textContent,
                    display:'none'
                }
                const newForm = this.createInterviewForm(props)
                newForm.classList.remove('active')
                formList.append(item)
                questionsCon.append(newForm)
            })
            const interviewForm = this.createInterviewForm();
            dynamicHeader.append(formList,addNewForm);
            questionsCon.append(interviewForm);
            conDynamic.append(dynamicHeader,questionsCon);
        },
        slideEffect({target}) {
            const formItem = document.querySelectorAll('.interview-form-con')
            const formListItem = document.querySelectorAll('.form-list-item')
            if(target.classList.contains('form-list-item')) {
                formListItem.forEach(item=>{
                    item.classList.remove('active')
                })
                formItem.forEach(elem=>{
                    elem.classList.remove('active')
                    if (elem.dataId === target.textContent) {
                        elem.classList.add('active')
                        target.classList.add('active')
                    }
                })

            } else if (target.classList.contains('arrow')) {
                const activeFormListItem = document.querySelector('.form-list-item.active')
                if (target.textContent.includes('forward')) {
                    activeFormListItem.nextSibling.classList.add('active')
                    formItem.forEach(elem=>{
                        elem.classList.remove('active')
                        if (elem.dataId === activeFormListItem.nextSibling.textContent) {
                            elem.classList.add('active')
                        }
                    })
                    activeFormListItem.classList.remove('active')
                } else if(target.textContent.includes('back')) {
                    activeFormListItem.previousSibling.classList.add('active')
                    formItem.forEach(elem=>{
                        elem.classList.remove('active')
                        if (elem.dataId === activeFormListItem.previousSibling.textContent) {
                            elem.classList.add('active')
                        }
                    })
                    activeFormListItem.classList.remove('active')
                }
            }
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
        createInterviewForm(props = null) {
            const con = this.createElement('div',{
                className:'interview-form-con active',
                dataId:props ? props.dataId : '1'
            });
            const inputs = this.createDynamicInputs();
            const select = this.createAnswerType();
            const createTestForm = this.createElement('div',{className:'test-form-con'})
            const quiz = this.createQuiz();
            const addVariant = this.createAddVariantBtn(con);
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
        deleteForm() {
            const formItems = document.querySelectorAll('.interview-form-con')
            const activeFormItem = document.querySelector('.interview-form-con.active')
            const activeFormListItem = document.querySelector('.form-list-item.active')
            activeFormListItem.previousSibling.classList.add('active');
            formItems.forEach(elem=>{
                if (elem.dataId === activeFormListItem.previousSibling.textContent) {
                    elem.classList.add('active')
                }
            })
            activeFormItem.remove()
            activeFormListItem.remove()
        },
        createInterviewFormFooter() {
            const con = this.createElement('div',{className:'interview-form-footer'});
            const arrowLeft = this.createElement('span',{className:'arrow material-icons', textContent:'arrow_back'})
            const arrowRight = this.createElement('span',{className:'arrow material-icons', textContent:'arrow_forward'})
            const btnsCon = this.createElement('div',{className:'interview-form-btn-con'});
            const saveBtn = this.createElement('button',{className:'save-form interview-form-btn', textContent:'Зберегти'})
            const cancelBtn = this.createElement('button',{className:'delete-form interview-form-btn', textContent:'Видалити'})
            cancelBtn.addEventListener('click',this.deleteForm.bind(this))
            btnsCon.append(cancelBtn,saveBtn)
            con.append(arrowLeft,btnsCon,arrowRight)
            con.addEventListener('click',this.slideEffect.bind(this))
            return con
        },
        createAddVariantBtn(testBlock) {
            const con = this.createElement('div',{className:'add-variant-con'});
            const addVariant = this.createElement('button',{classList:'add-variant',textContent:'Додати варіант'})
            const span = this.createElement('span',{className:'add-variant-span', textContent:'або'})
            const addYourVariant = this.createElement('button',{classList:'add-your-variant',textContent:'Додати варіант "інше"'})
            addYourVariant.addEventListener('click',()=>this.addYourVariantFunc(testBlock))
            addVariant.addEventListener('click',()=>{
                const mainCon = testBlock.querySelector('.test-form-con')
                const inputList = testBlock.querySelectorAll('.quiz-variant')
                let flag = true;
                inputList.forEach(e=>{
                    if(e.value === '') {
                        flag = false
                    }
                })
                if(flag) {
                    const warn = testBlock.querySelector('.warning');
                    if(warn) {
                        warn.remove()
                    }
                    mainCon.append(this.createQuiz())
                }else {
                    const warn = testBlock.querySelector('.warning');
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
        addYourVariantFunc(testBlock) {
            const mainCon = testBlock.querySelector('.test-form-con')
            const otherVariant = testBlock.querySelector('.other-variant-con')
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
            const ul = this.createElement('ul',{classList: 'form-list'});
            return ul
        },
        createFormListItem() {
            const index = this.itemIndex++
            const li = this.createElement('li',{
                classList: 'form-list-item active',textContent:index,dataFormNum:index,draggable:true});
            return li
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
                    {key: '@id', value: rowId},
                    {key: '@col_Applicants', value: obj.applicants }
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
                    {key: '@is_active', value: obj.status},
                    {key: '@col_Applicants', value: obj.applicants }
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
            const newArray = inputs.map((elem)=>{
                const {name,value} = elem
                let obj = {
                    name, value
                }
                if(elem.classList.contains('interview-direction')) {
                    const childArr = Array.from(elem.childNodes)
                    const selected = childArr.filter((child) => child.selected)
                    const selectedVal = selected.map(item=>Number(item.value))
                    const value = selectedVal.join(',')
                    obj = {
                        name,value
                    }
                }
                return obj
            })
            newArray.push(active)
            return newArray
        },
        openWarningModal() {
            const modal = this.createElement('div',{className:'warning-modal',id:'warning-modal'});
            const props = {className:'modal-title',textContent:'Внесені зміни не будуть збережені'}
            const h2 = this.createElement('h2',props);
            const subProps = {className:'modal-subtitle',textContent:'Вийти і втратити внесені дані?'};
            const p = this.createElement('p',subProps);
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
            modal.append(h2,p,buttonAccept,buttonCancel)
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
            con.append(activity ? span2 : span);
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
        createStaticInfo(obj = null) {
            const con = this.createElement('div',{className:'static-info-block'});
            const chosenPeople = this.createChosenPeople(obj ? obj.applicants : '');
            const addPeople = this.createAddPeople();
            const limit = this.createLimitPeople();
            con.append(chosenPeople,addPeople,limit);
            return con
        },
        createChosenPeople(val = null) {
            const chosenPeople = this.createElement('div',{className:'chosen-people-block'});
            const peopleValue = this.createElement('input',{
                className: 'people-value req-input',disabled:true,value:val ? val : 0,name:'applicants'});
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
        createLimitPeople(val = null) {
            const con = this.createElement('div',{className:'limit-people-block'});
            const limitValue = this.createElement('input',{
                className:'limit-value',
                placeholder:val ? '' : '100',
                value: val ? val : '',
                type: 'number'
            });
            const limitLabel = this.createElement('p',{className:'limit-label',textContent:'Ліміт людей для опитування'});
            con.append(limitValue,limitLabel);
            return con
        },
        createSelect(prop) {
            const select = this.createElement('select', {
                className: 'interview-direction req-input js-example-basic-multiple',name:'intDirection',multiple:true});
            const options = this.selectData.map(elem=>{
                return `<option ${elem.id === 3 ? 'selected' : ''} class='interview-option' value=${elem.id}>${elem.name}</option>`
            });
            const index = options.findIndex(elem=>elem.includes(prop))
            const item = options.splice(index,1)
            options.unshift(item)
            select.insertAdjacentHTML('beforeend',options.join(''))
            this.useSelectPlug()
            return select
        },
        useSelectPlug() {
            $(document).ready(function() {
                $('.js-example-basic-multiple').select2();
            });
            this.messageService.publish({ name: 'hidePagePreloader' });
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
