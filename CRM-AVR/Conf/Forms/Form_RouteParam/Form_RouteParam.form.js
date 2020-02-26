(function () {
  return {
    init:function(){
        
        let setParam = [{ parameterCode: '@route_id', parameterValue: this.form.getControlValue("route_id") }];
        this.form.setControlParameterValues('AreaId', setParam);
    },
    
    validate: function(){
        
        let length = Number(this.form.getControlValue("length"));
        if(length < Number(1.1)) {
            this.openPopUpInfoDialog('Помилка! Довжина має бути більш ніж 1');
        } else {
            return true;
        }
    }
    
};
}());
