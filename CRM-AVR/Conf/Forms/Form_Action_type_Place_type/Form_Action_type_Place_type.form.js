(function () {
  return {
    init: function(){
        let action = this.form.getControlValue('action_type');
        console.log(action);
        
        if (action == null){
            this.form.setControlVisibility('action_type', false)
        }else{
            this.form.disableControl('action_type');
            
        }
    }
};
}());
