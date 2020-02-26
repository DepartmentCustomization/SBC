(function () {
  return {
    init(){
        this.form.disableControl('q');
    },
    afterSave(data){
        this.back();
    }
};
}());
