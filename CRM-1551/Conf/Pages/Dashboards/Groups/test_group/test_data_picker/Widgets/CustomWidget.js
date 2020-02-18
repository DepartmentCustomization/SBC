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
            this.filterHelperModule = await import('../modules/JavaScript/Filters/FilterHelper.js');
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
            const filterHelper = new this.filterHelperModule.FilterHelper.setFiltersParams(filters);
            this.filterParams = filterHelper.getFiltersParams();
        }
    };
}());
