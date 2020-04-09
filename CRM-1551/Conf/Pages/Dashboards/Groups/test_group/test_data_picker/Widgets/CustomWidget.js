 (function() {
    return {
        title: ' ',
        hint: ' ',
        formatTitle: function() {},
        customConfig:
                `
                    <div id='modalContainer'></div>
                `
        ,
        init: async function() {
            this.filterHelperModule = await import('/modules/Filters/FilterHelper.js');
            this.queryHelper = await import('/modules/Filters/QueryHelper.js');
            const msg = {
                name: 'SetFilterPanelState',
                package: {
                    value: true
                }
            };
            this.messageService.publish(msg);
            this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParam, this));
        },
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            const zeroLength = 0;
            if(children.length > zeroLength) {
                children.forEach(child =>{
                    element.appendChild(child);
                });
            }
            return element;
        },
        afterViewInit: function() {
            const modalContainer = document.getElementById('modalContainer');
            const btn = this.createElement('button', {
                innerText: 'CLick on me to go to section!'
            });
            modalContainer.appendChild(btn);
            btn.addEventListener('click', () => {
                this.goToDashboard('StartPage_operator');
            })
        },
        getFiltersParam: function(message) {
            const filters = message.package.value.values;
            const filterHelper = new this.filterHelperModule.FilterHelper();
            const activeFilters = filterHelper.getActiveFilters(filters);
            const queryHelper = new this.queryHelper.QueryHelper();
            this.queryParameters = queryHelper.getQueryParameters(filters, activeFilters);
        },
        destroy: function() {
            this.sub.unsubscribe();
        }
    };
}());
