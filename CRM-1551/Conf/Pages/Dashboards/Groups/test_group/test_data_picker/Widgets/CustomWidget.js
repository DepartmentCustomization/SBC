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
            this.filterHelperModule = await import('modules/Filters/FilterHelper.js');
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
            const filterHelper = new this.filterHelperModule.filterHelper(message.package.value.values);
            this.filterParams = filterHelper.getFiltersParams();
        }
    };
}());
