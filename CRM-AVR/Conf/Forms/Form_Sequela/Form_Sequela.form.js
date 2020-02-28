(function () {
  return {
    init: function(){
        let create = this.form.getControlValue('Created_at');
        if (create == null){
            let currentDate = new Date();
            this.form.setControlValue('Created_at', currentDate);
        };
        
        let claim = this.form.getControlValue('Claim_ID');
        console.log(claim);
        let param = [{parameterCode: '@Claim_id', parameterValue: claim }]
        this.form.setControlParameterValues('Actions_ID',param )
        
    }
    
    
};
}());
