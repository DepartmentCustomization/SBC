(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        customConfig:
                `
                    <div id='modalContainer'></div>
                `
        ,
        init: async function() {
            const foopath = '../modules/dist/Filters/FilterHelper.js';
            this.filterHelperModule = await import(foopath);
            const msg = {
                name: 'SetFilterPanelState',
                package: {
                    value: true
                }
            };
            this.messageService.publish(msg);
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParam, this);
        },
        getFiltersParam: function(message) {
            const filters = message.package.value.values;
            const filterHelper = new this.filterHelperModule.FilterHelper(filters);
            this.filterParams = filterHelper.getFiltersParams();
        }
    };
}());
