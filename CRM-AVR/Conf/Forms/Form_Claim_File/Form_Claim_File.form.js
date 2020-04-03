(function() {
    return {
        afterSave: function() {
            // let id_doc = this.form.getControlValue('Id');
            // if (id_doc == null){
            location.reload();
        }
    };
}());
