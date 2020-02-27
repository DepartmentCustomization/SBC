(function () {
  return {
    init: function(){
        this.form.disableControl('contacts_id');
        
    },
    afterSave(data){
        this.back();
    }
    
};
}());
