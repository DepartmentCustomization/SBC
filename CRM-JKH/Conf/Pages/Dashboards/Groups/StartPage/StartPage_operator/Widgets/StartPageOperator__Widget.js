(function () {
    return {
        customConfig:
                `               
                    <div id='container'></div>  
                `
        ,
        init: function() {
            let executeQuery = {
                queryCode: 'GetAppealTypes',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQuery, this.load, this);
            this.showPreloader = false;
        },
        load: function() {
            const CONTAINER = document.getElementById('container');
            let title = this.createElement('div', { className: 'header-label', innerText: ' '});
            let groupViewAppeals__icon = this.createElement('div', { className: 'icon letterIcon material-icons',  innerText: 'view_list' });
            let groupViewAppeals__description = this.createElement('div', { className: 'description', innerText: 'Перегляд Звернень'});
            groupViewAppeals__icon.style.color = '#ff7961';
            let groupViewAppeals__borderBottom = this.createElement('div', { className: 'border-bottom' });
            let groupViewAppeals__borderRight = this.createElement('div', { className: 'border-right'});
            let groupViewAppeals = this.createElement('div', { className: 'group', tabindex: '0' }, groupViewAppeals__icon, groupViewAppeals__description, groupViewAppeals__borderBottom, groupViewAppeals__borderRight );
            groupViewAppeals.addEventListener('click', () => {
                window.open(location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/registryClaims');
            });
            let groupRegByPhone__icon = this.createElement('div', { className: 'icon letterIcon material-icons',  innerText: 'contact_phone' });
            let groupRegByPhone__description = this.createElement('div', { className: 'description', innerText: 'Реєстрація Звернення'});
            groupRegByPhone__icon.style.color = '#f44336';
            let groupRegByPhone__borderBottom = this.createElement('div', { className: 'border-bottom' });
            let groupRegByPhone__borderRight = this.createElement('div', { className: 'border-right'});
            let groupRegByPhone = this.createElement('div', { className: 'group', tabindex: '0' }, groupRegByPhone__icon, groupRegByPhone__description, groupRegByPhone__borderBottom, groupRegByPhone__borderRight );
            groupRegByPhone.addEventListener('click', () => {
                this.showModalWindow();
            });
            let groupsWrapper = this.createElement('div', { className: 'group-btns' }, groupRegByPhone, groupViewAppeals);
            CONTAINER.appendChild(title);
            CONTAINER.appendChild(groupsWrapper);
        },
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach( key => element[key] = props[key] );
            if(children.length > 0){
                children.forEach( child =>{
                    element.appendChild(child);
                });
            } return element;
        },
        typeAppeal: 1,
        showModalWindow: function() {
            this.typeAppeal = 1;
            let CONTAINER = document.getElementById('container');
            const modalBtnClose =  this.createElement('button', { id:'modalBtnClose', className: 'btn', innerText: 'Закрити'});
            const modalBtnTrue =  this.createElement('button', { id:'modalBtnTrue', className: 'btn', innerText: 'Підтвердити'});
            const modalBtnWrapper =  this.createElement('div', { id:'modalBtnWrapper' }, modalBtnTrue, modalBtnClose);
            const modalNumber =  this.createElement('input', { id:'modalNumber', type:'text', placeholder:'Введіть номер телефону в форматі 0xxxxxxxxx',  value: ''});
            const radioBtn = document.createElement('div');
            radioBtn.innerHTML = `<input style="cursor: pointer; width: 20px; height: 20px;" id="radioBtn1" checked="true" type="radio" name="type" value="1"> Телефон<br>
                            <input style="cursor: pointer; width: 20px; height: 20px;" id="radioBtn2" type="radio" name="type" value="2"> E-Mail<br>
                            <input style="cursor: pointer; width: 20px; height: 20px;" id="radioBtn3" type="radio" name="type" value="3"> Особистий прийом<br>`;
            const modalRadioWrapper =  this.createElement('div', { id:'modalRadioWrapper' },  radioBtn);
            radioBtn.style.fontSize = '2em';
            const modalWindow = this.createElement('div', { id:'modalWindow', className: 'modalWindow'}, modalNumber, modalRadioWrapper, modalBtnWrapper);
            const modalWindowWrapper = this.createElement('div', { id:'modalWindowWrapper', className: 'modalWindowWrapper'}, modalWindow);
            CONTAINER.appendChild(modalWindowWrapper);
            const radioBtn1 = document.getElementById('radioBtn1');
            radioBtn1.addEventListener( 'click', () => {
                this.typeAppeal = 1;
                modalNumber.value = '';
                modalNumber.disabled = false;
                modalNumber.placeholder = 'Введіть номер телефону в форматі 0xxxxxxxxx';
            });
            const radioBtn2 = document.getElementById('radioBtn2');
            radioBtn2.addEventListener( 'click', () => {
                this.typeAppeal = 2;
                modalNumber.value = '';
                modalNumber.disabled = false;
                modalNumber.placeholder = 'Введіть E-Mail';
            });
            const radioBtn3 = document.getElementById('radioBtn3');
            radioBtn3.addEventListener( 'click', () => {
                this.typeAppeal = 3;
                modalNumber.value = '';
                modalNumber.disabled = true;
                modalNumber.placeholder = ''
            });
            modalBtnTrue.addEventListener( 'click', () => {
                let number = modalNumber.value
                let r1 = JSON.stringify(number);
                let r2 = encodeURIComponent(r1);
                window.open(location.origin + localStorage.getItem('VirtualPath') + '/sections/RegistrationAppeal/add?parameter='+r2+'&type='+this.typeAppeal+'');
                const container = document.getElementById('container');
                CONTAINER.removeChild(container.lastElementChild);
            });
            modalBtnClose.addEventListener( 'click', () => {
                const container = document.getElementById('container');
                CONTAINER.removeChild(container.lastElementChild);
            });
        },
    };
}());
