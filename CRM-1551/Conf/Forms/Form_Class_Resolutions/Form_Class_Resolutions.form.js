(function() {
    return {
        init: function() {
            this.form.disableControl('Id');
            this.form.disableControl('create_date');
            this.form.disableControl('user_name');
            this.form.disableControl('edit_date');
            this.form.disableControl('user_edit_name');
        }
    };
}());
