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
                    #tabs_container{
                        position: relative;
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
                    .hint{
                        position: absolute;
                        top: 0;
                        right: 0;                        
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
        init: function() {
        },
        afterViewInit: function() {
            let container = document.getElementById('container');
            container.classList.add('container');
            const btn_table = this.createElement('button', { id: 'btn_table', className: 'btn', innerText: 'Таблиця заявок'});
            const btn_maps = this.createElement('button', { id: 'btn_maps', className: 'btn ', innerText: 'Карта заявок та відключень'});
            const btn_schedule = this.createElement('button', { id: 'btn_schedule', className: 'btn ', innerText: 'Графіки поточного стану'});
            const tab_table = this.createElement('div', { id: 'tab_table', className: 'button_table_intro'}, btn_table);
            const tab_maps = this.createElement('div', { id: 'tab_maps', className: 'button_table_intro'}, btn_maps);
            const tab_graphics = this.createElement('div', { id: 'tab_graphics', className: 'button_table_intro'}, btn_schedule);
            container.appendChild(tab_table);
            container.appendChild(tab_maps);
            container.appendChild(tab_graphics);
            btn_table.addEventListener('click', function() {
                this.sendMessage('tabsClick', 'btn_table');
            }.bind(this));
            btn_maps.addEventListener('click', function() {
                this.sendMessage('tabsClick', 'btn_maps');
            }.bind(this));
            btn_schedule.addEventListener('click', function() {
                this.sendMessage('tabsClick','btn_schedule');
            }.bind(this));
            this.createInfo();
        },
        createInfo: function() {
            const tabs_container = document.getElementById('tabs_container');
            const i_tabs_container = this.createElement('div', { id: 'i_tabs_container', className: 'hint material-icons', innerText: 'info'});
            tabs_container.appendChild(i_tabs_container);
            i_tabs_container.addEventListener('click', event => {
                this.showIntroJs();
            });
            tab_table.setAttribute('data-step', '1');
            tab_table.setAttribute('data-intro-group', 'group_tab');
            tab_table.setAttribute('data-intro', 'Кнопка для переходу на таблицю, яка відображає результати даного району');
            tab_maps.setAttribute('data-step', '2');
            tab_maps.setAttribute('data-intro-group', 'group_tab');
            tab_maps.setAttribute('data-intro', 'Кнопка для переходу на віджет, що відображає точки на карті, де є відключення( червоний колір) та заявки(синій колір)');
            tab_graphics.setAttribute('data-step', '3');
            tab_graphics.setAttribute('data-intro-group', 'group_tab');
            tab_graphics.setAttribute('data-intro', 'Кнопка для переходу на віджет, що відображає поточний стан заявок та детальними даними по району');
        },
        showIntroJs: function() {
            introJs().start('group_tab');
        },
        sendMessage: function(name, value) {
            this.messageService.publish({ name: name, value: value})
        }
    };
}());
