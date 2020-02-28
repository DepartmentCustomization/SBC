(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        customConfig:
                `
                <style>
                    #container{
                        display: flex;
                        justify-content: space-around;                    
                    }
                    .btn{
                        text-align: center;
                        font-size: 17px;
                        font-weight: 600;
                        cursor: pointer;
                        line-height: 14px;
                        padding: 0 10px;
                        height: 32px;                        
                    }
                </style>
                
                <div id='container'></div>
                `
        ,
        init: function() {
            let executeQuery = {
                queryCode: 'get_organization_id',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQuery, this.getOrgId, this);
        },
        getOrgId: function(data) {
            this.org_id = data.rows[0].values[0];
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
        afterViewInit: function() {
            const date = new Date();
            const yyyy = date.getFullYear();
            const mm = date.getMonth() + 1;
            const month = yyyy + '-' + mm + '-01%2000:00:00';
            let container = document.getElementById('container');
            const btn_schedule = this.createElement('button', { id: 'btn_schedule', className: 'btn', url: 'TablingPerson', location: 'dashboard', innerText: 'Табель поточного місяця'});
            const btn_createAppeal = this.createElement('button', { id: 'btn_maps', className: 'btn', url: 'Claims/add', location: 'sections', innerText: 'Створити Заявку'});
            const btn_clearFilter = this.createElement('button', { id: 'btn_schedule', className: 'btn', innerText: 'Зняти маркер'});
            const tab_schedule = this.createElement('div', { id: 'tab_table'}, btn_schedule);
            const tab_appeal = this.createElement('div', { id: 'tab_maps'}, btn_createAppeal);
            const tab_clear = this.createElement('div', { id: 'tab_graphics'}, btn_clearFilter);
            container.appendChild(tab_schedule);
            container.appendChild(tab_appeal);
            container.appendChild(tab_clear);
            btn_schedule.addEventListener('click', event => {
                let target = event.currentTarget;
                const params = 'orgId=' + this.org_id + '&month=' + month;
                window.open(location.origin + localStorage.getItem('VirtualPath') + '/' + target.location + '/page/' + target.url + '?' + params);
            });
            btn_createAppeal.addEventListener('click', event => {
                let target = event.currentTarget;
                window.open(location.origin + localStorage.getItem('VirtualPath') + '/' + target.location + '/' + target.url);
            });
            btn_clearFilter.addEventListener('click', event => {
                this.messageService.publish({ name: 'clearSelectedRows'});
            });
        },
        sendMessage: function(name, value) {
            this.messageService.publish({ name: name, value: value})
        }
    };
}());
