(function() {
    return {
        init: function() {
            this.sub = this.messageService.subscribe('setVisibilityNone', this.setVisibilityTableContainer, this);
        },
        setVisibilityTableContainer(message) {
            const con = message.package.container
            con.style.display = message.package.display;
        },
        destroy: function() {
            this.sub.unsubscribe();
        }
    };
}());
