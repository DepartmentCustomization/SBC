(function () {
  return {
    init: function(){
        //this.form.onControlValueChanged('',);
        this.form.onControlValueChanged('SystemUser_Id',this.onConsole);
    },
    onConsole:function(us){
        console.log(us);
    }
};
}());
