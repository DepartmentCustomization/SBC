(function() {
    return {
        init: function() {
            this.setVisibilityTableContainer('none')
        },
        setVisibilityTableContainer(status) {
            this.tableContainer.style.display = status;
            this.messageService.publish({ name: 'setVisibility',value: status })
        }
    };
}());
