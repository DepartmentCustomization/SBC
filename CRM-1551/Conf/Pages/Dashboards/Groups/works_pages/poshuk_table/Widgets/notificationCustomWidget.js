(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `
                    <div id='notificationContainer' ></div>
                    `
        ,
        init: function() {
            this.isSelected = false;
            /*
            Version 2.2
            this.subscribers.push(this.messageService.subscribe('GlobalFilterChanged', this.setFiltersValue, this));
            this.subscribers.push(this.messageService.subscribe('ApplyGlobalFilters', this.findAllCheckedFilter, this));
            this.subscribers.push(this.messageService.subscribe('findFilterColumns', this.reloadTable, this));
            */
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.setFiltersValue, this);
            this.sub1 = this.messageService.subscribe('ApplyGlobalFilters', this.findAllCheckedFilter, this);
            this.sub2 = this.messageService.subscribe('findFilterColumns', this.reloadTable, this);
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
            document.getElementById('notification').style.display = this.isSelected === true ? 'none' : 'block';
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
            const container = document.getElementById('notificationContainer');
            const captionWarning = this.createElement('div',{ className: 'captionWarning', innerText: 'Оберiть фiльтри!' });
            container.appendChild(captionWarning);
        }
    };
}());
