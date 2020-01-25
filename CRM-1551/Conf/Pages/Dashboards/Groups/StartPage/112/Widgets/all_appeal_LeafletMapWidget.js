(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        init: function() {
            this.allAppealLeafLetMap = document.getElementById('allAppealLeafLetMap');
            this.messageService.subscribe('showAllAppealLeafLetMap', this.showAllAppealLeafLetMap, this);
            this.messageService.subscribe('hideAllAppealLeafLetMap', this.hideAllAppealLeafLetMap, this);
        },
        showAllAppealLeafLetMap: function() {
            this.allAppealLeafLetMap.style.display = 'block';
        },
        hideAllAppealLeafLetMap: function() {
            this.allAppealLeafLetMap.style.display = 'none';
        }
    };
}());
