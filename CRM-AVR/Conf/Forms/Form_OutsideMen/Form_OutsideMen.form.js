(function () {
  return {
    init: function(){
        this.form.disableControl('contact_number');
        this.form.onControlValueChanged('company_id', this.sampleFiz);
        
    },
    
    sampleFiz: function(org_id){
        // let org =  [{ parameterCode: '@org_id', parameterValue: org_id }];
        // this.form.setControlParameterValues('fiz_id', org);
        
        const org_id_n = {
                     queryCode: 'phone_number_outsideMan',
                     parameterValues:[{key: '@org_id',value: org_id}]
                 };
        this.queryExecutor.getValues(org_id_n).subscribe(data =>{
            // debugger;
            // this.form.setControlValue('contact_number', null);
            this.form.setControlValue('contact_number', data.rows[0].values[0]);
        });
        
    },

    validate: function() {
        const order_status = this.form.getControlValue('order_stat_id')
         if (order_status == 10){
            return 'У виконаному виїзді вносити правки заборонено'
        }else{
			return true
		}
    }
};
}());
