(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        customConfig:
                `
                
                
                <div id='buttonsContainer'></div>
                `
        ,
        init: function() {
            this.sub = this.messageService.subscribe('sendEmployeeName', this.addBtnCreatetable, this);
            this.sub1 = this.messageService.subscribe('sendOrganizationId', this.getOrganizationId, this);
            this.sub2 = this.messageService.subscribe('getSetDate', this.getMonth, this);
            this.sub3 = this.messageService.subscribe('disabledCreateBtn', this.disabledCreateBtn, this);
            let executeMainOrgQuery = {
                queryCode: 'avr_mainPage_USER',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeMainOrgQuery, this.getMainOrganization, this);
        },
        getOrganizationId: function(message) {
            this.org_id = message.org_id;
        },
        getMonth: function(message) {
            this.month = message.dayStart;
        },
        getMainOrganization: function(data) {
            const buttonsContainer = document.getElementById('buttonsContainer');
            const btnWrapper = this.createElement('div', { id: 'btnWrapper', className: 'btnWrapper'});
            buttonsContainer.appendChild(btnWrapper);
            const btnPrint = this.createElement('button', { id: 'btnPrint', className: 'button', innerText: 'Перехiд' });
            btnWrapper.appendChild(btnPrint);
            btnPrint.addEventListener('click', event => {
                event.stopImmediatePropagation();
                this.goToDashboard('TablingPerson', {queryParams: {orgId: this.org_id, month: this.month}});
            });
            if(data.rows[0].values[1] === 'Інженер' || data.rows[0].values[2] === 'admin_vdk') {
                const btnSave = this.createElement('button', { id: 'btnSave', className: 'button', innerText: 'Зберегти' });
                btnWrapper.appendChild(btnSave);
                btnSave.addEventListener('click', event => {
                    event.stopImmediatePropagation();
                    let target = event.currentTarget;
                    this.messageService.publish({ name: 'messageForUpdateThisTable' });
                });
            }
        },
        addBtnCreatetable: function() {
            const btnCreate = this.createElement('button', { id: 'btnCreate', className: 'button', innerText: 'Створити' });
            if(document.getElementById('btnWrapper').childNodes.length === 2) {
                document.getElementById('btnWrapper').appendChild(btnCreate);
            }
            btnCreate.addEventListener('click', event => {
                event.stopImmediatePropagation();
                let target = event.currentTarget;
                target.disabled = true;
                this.messageService.publish({ name: 'messageForCreateNewTable' });
            });
        },
        disabledCreateBtn: function(message) {
            const disable = message.value;
            if(document.getElementById('btnCreate')) {
                document.getElementById('btnCreate').disabled = disable;
            }
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
        destroy: function() {
            this.sub.unsubscribe();
            this.sub1.unsubscribe();
            this.sub2.unsubscribe();
            this.sub3.unsubscribe();
        }
    };
}());
