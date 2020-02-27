(function () {
  return {
    init: function(){
        let not_new = this.form.getControlValue('organizations_name');
        if(not_new != null){
            this.form.disableControl('Contact_type_ID')
        }
       
        let adress = this.form.getControlValue('adress_id')
            if(adress == ''){
                this.form.setControlValue('adress_id', { key: null, value: null })
            }
        
    }
};
}());
