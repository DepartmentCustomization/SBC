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
            let container = document.getElementById('container');
            const btn_table = this.createElement('button', { id: 'btn_table', className: 'btn', innerText: 'Таблиця заявок'});
            const btn_maps = this.createElement('button', { id: 'btn_maps', className: 'btn', innerText: 'Карта заявок та відключень'});
            const btn_schedule = this.createElement('button', { id: 'btn_schedule', className: 'btn', innerText: 'Графіки поточного стану'});
            const btn_newAppeal = this.createElement('button', { id: 'btn_newAppeal', location: 'sections', className: 'btn', innerText: 'Створити заявку', url: 'Claims/add'});
            const tab_table = this.createElement('div', { id: 'tab_table'}, btn_table);
            const tab_maps = this.createElement('div', { id: 'tab_maps'}, btn_maps);
            const tab_graphics = this.createElement('div', { id: 'tab_graphics'}, btn_schedule);
            container.appendChild(tab_table);
            container.appendChild(tab_maps);
            container.appendChild(tab_graphics);
            container.appendChild(btn_newAppeal);
            btn_table.addEventListener('click', e => {
                this.sendMessage('tabsClick', 'btn_table');
            });
            btn_maps.addEventListener('click', e => {
                this.sendMessage('tabsClick', 'btn_maps');
            });
            btn_schedule.addEventListener('click', e => {
                this.sendMessage('tabsClick','btn_schedule');
            });
            btn_newAppeal.addEventListener('click', e => {
                let target = e.currentTarget;
                // this.goToSection(target.url);
                window.open(location.origin + localStorage.getItem('VirtualPath') + '/' + target.location + '/' + target.url);
            });
        },
        sendMessage: function(name, value) {
            this.messageService.publish({ name: name, value: value})
        }
    };
}());
