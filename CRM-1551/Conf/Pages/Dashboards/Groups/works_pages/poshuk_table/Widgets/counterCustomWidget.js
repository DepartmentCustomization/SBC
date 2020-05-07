(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        customConfig:
                `
                <div id='counterContainer'></div>
                `,
        init: function() {
            document.getElementById('counter').style.display = 'none';
            this.isSelected = false;
            /*
            Version 2.2
            this.subscribers.push(this.messageService.subscribe('dataLength', this.setDataLength, this));
            this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.findAllCheckedFilter, this));
            this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.setFiltersValue, this));
            */
            this.sub = this.messageService.subscribe('dataLength', this.setDataLength, this);
            this.sub1 = this.messageService.subscribe('ApplyGlobalFilters', this.findAllCheckedFilter, this);
            this.sub2 = this.messageService.subscribe('GlobalFilterChanged', this.setFiltersValue, this);
        },
        destroy: function() {
            this.sub.unsubscribe();
            this.sub1.unsubscribe();
            this.sub2.unsubscribe();
        },
        setFiltersValue: function(message) {
            let elem = message.package.value.values;
            this.filtersLength = elem.length;
            this.filtersWithOutValues = 0;
            elem.forEach(elem => {
                if(elem.active === false) {
                    this.filtersWithOutValues += 1;
                }
            });
            this.isSelected = this.filtersWithOutValues === this.filtersLength ? false : true;
        },
        findAllCheckedFilter: function() {
            document.getElementById('counter').style.display = this.isSelected === true ? 'block' : 'none';
        },
        setDataLength: function(message) {
            let dataLength = message.value;
            document.getElementById('counterWrap').innerText = `Вcього: ${dataLength}`;
        },
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if (children.length > 0) {
                children.forEach(child => {
                    element.appendChild(child);
                });
            }
            return element;
        },
        afterViewInit: function name() {
            const container = document.getElementById('counterContainer');
            const counterWrap = this.createElement('div', { id: 'counterWrap' });
            container.appendChild(counterWrap);
        }
    };
}());
