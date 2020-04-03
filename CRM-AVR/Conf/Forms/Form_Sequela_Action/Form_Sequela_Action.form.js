(function() {
    return {
        init: function() {
            let create = this.form.getControlValue('Created_at');
            if (create == null) {
                let currentDate = new Date();
                this.form.setControlValue('Created_at', currentDate);
            }
        }
    };
}());
