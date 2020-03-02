(function() {
    return {
        init: function() {
        // document.querySelector('head').innerHTML += '<link href="https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.9.3/introjs.min.css"  rel="stylesheet" />';
        // this.addScript('https://cdnjs.cloudflare.com/ajax/libs/intro.js/2.9.3/intro.min.js');
            document.querySelector('head').innerHTML += '<link href="libs/introJs/introjs.min.css"  rel="stylesheet" />';
            this.addScript('libs/introJs/intro.min.js');
            setTimeout(this.afterViewInit.bind(this), 1000);
        },
        afterViewInit: function() {
            document.querySelector('.dx-datagrid').style.marginRight = '30px';
            let dxHeaderRow = document.querySelectorAll('.dx-header-row>td');
            let arr = Array.from(dxHeaderRow);
            arr.shift();
            arr.shift();
            console.log(arr);
            for(let i = 0; i < arr.length; i++) {
                let el = arr[i];
                el.setAttribute('data-step', (i + 2));
                el.setAttribute('data-intro-group', 'table_applications');
                if(i === 0) {
                    el.setAttribute('data-intro', 'Колонка виводить номери заявок');
                }else if(i === 1) {
                    el.setAttribute('data-intro', 'Колонка виводить назву організації в скороченому вигляді');
                }else if(i === 2) {
                    el.setAttribute('data-intro', 'Колонка виводить адресу за якою знаходиться проблемне місце');
                }else if(i === 3) {
                    el.setAttribute('data-intro', 'Колонка виводить кількість виїздів сьогодні по даній заявці');
                }
            }
            let table_applications = document.getElementById('table_applications');
            let i_table_applications = this.createElement('div', { id: 'i_table_applications', className: 'hint material-icons', innerText: 'info' });
            table_applications.appendChild(i_table_applications);
            document.getElementById('table_applications').setAttribute('data-step', '1');
            document.getElementById('table_applications').setAttribute('data-intro-group', 'table_applications');
            document.getElementById('table_applications').setAttribute('data-intro', 'Таблиця виводить даннi про вiдкритi заявки на сьогоднi');
            i_table_applications.addEventListener('click', event => {
            // debugger;
                introJs().start('table_applications');
            });
            introJs().setOptions({ skipLabel: 'Exit', tooltipPosition: 'right' });
            /* GOOGLE MAPS */
            let ggm = document.getElementById('maps_applications');
            let i_ggm = this.createElement('div', { id: 'i_ggm', className: 'hint material-icons', innerText: 'info' });
            ggm.appendChild(i_ggm);
            ggm.setAttribute('data-step', '1');
            ggm.setAttribute('data-intro-group', 'ggm');
            ggm.setAttribute('data-intro', 'На карті відображаються всi не закриті заявки на сьогоднішній день в місті Києві. Сині іконки - звичайні заявки. Червоні точки - заявки з відключенням');
            i_ggm.addEventListener('click', event => {
                introJs().start('ggm');
            });
            /*  */
            let graphics = document.getElementById('chart_schedule_current_status');
            let i_graphics = this.createElement('div', { id: 'i_graphics', className: 'hint material-icons', innerText: 'info' });
            graphics.appendChild(i_graphics);
            i_graphics.addEventListener('click', event => {
                introJs().start('graphics');
            });
            graphics.setAttribute('data-step', '1');
            graphics.setAttribute('data-intro-group', 'graphics');
            graphics.setAttribute('data-intro', 'Відображення поточної ситуації всіх заявок на сьогоднішній день організації в якій перебуває оператор');
            let graphic_chart = document.getElementById('graphic_chart');
            graphic_chart.setAttribute('data-step', '2');
            graphic_chart.setAttribute('data-intro-group', 'graphics');
            graphic_chart.setAttribute('data-intro', 'Графік-пиріг відображає процентне співвідношення заявок певної організації до загальної кількості заявок');
            let allGraphics = document.getElementById('allGraphics');
            allGraphics.setAttribute('data-step', '3');
            allGraphics.setAttribute('data-intro-group', 'graphics');
            allGraphics.setAttribute('data-intro', 'Дані графіки відображаються при кліці на будь-яку організацію з графіка-пирога і вказують її детальний стан');
            let gr1 = document.getElementById('gr1');
            gr1.setAttribute('data-step', '4');
            gr1.setAttribute('data-intro-group', 'graphics');
            gr1.setAttribute('data-intro', 'Графік показує поточний стан загальної кількості заявок обраної організації');
            let gr2 = document.getElementById('gr2');
            gr2.setAttribute('data-step', '5');
            gr2.setAttribute('data-intro-group', 'graphics');
            gr2.setAttribute('data-intro', 'Графік показує поточний стан загальної кількості відключених будинків обраної організації');
            let gr3 = document.getElementById('gr3');
            gr3.setAttribute('data-step', '6');
            gr3.setAttribute('data-intro-group', 'graphics');
            gr3.setAttribute('data-intro', 'Графік показує поточний стан загальної кількості відключених квартир обраної організації');
        },
        addScript: function(src) {
            let script = document.createElement('script');
            script.src = src;
            script.async = false;
            document.head.appendChild(script);
            script.onload = function(src) {
                if(this.index == 1) {
                    this.loadData();
                }else{
                    this.index = this.index + 1;
                }
            }.bind(this);
        },
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if(children.length > 0) {
                children.forEach(child =>{
                    element.appendChild(child);
                });
            } return element;
        }
    };
}());
