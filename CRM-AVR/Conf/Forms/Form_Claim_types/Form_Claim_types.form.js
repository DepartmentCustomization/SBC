(function () {
  return {
    init: function(){
        this.form.disableControl('full_name');
        let access = this.form.getControlValue('access_id');
      
        if (access === null){
            this.form.disableControl('claim_types_id_first');
            this.form.disableControl('classes_id');
            this.form.disableControl('claim_types_name');
            this.form.disableControl('Sort_index');
            this.form.disableControl('Priority');
            this.form.disableControl('Is_diameter_required');
        };
        
        if(this.state !== 'create') {
            console.log(access);
            let typeParam = [{ parameterCode: '@access_id', parameterValue: access }];
            this.form.setControlParameterValues('claim_types_id_first', typeParam);
        }
        this.form.onControlValueChanged('access_id', this.onType);
        // this.form.onControlValueChanged('claim_types_id_first', this.onParentType);
        // this.form.onControlValueChanged('Is_delete', this.onDelete);
        
        this.form.onControlValueChanged('claim_types_name', this.fullName)
    },
    
    // onDelete: function(data){
    //     console.log(data);
    // },
    
    fullName: function(name){
        let parent_name = this.form.getControlDisplayValue('claim_types_id_first');
        
        if(parent_name == null){
            this.form.setControlValue('full_name',  name);
        }else{
          this.form.setControlValue('full_name', parent_name +'/'+name);
        };
        
    },
    
    onType: function(acc_id){
        console.log('Код доступу ' + acc_id);
        this.form.setControlValue('claim_types_id_first', {});
        this.form.setControlValue('classes_id', {});
        this.form.setControlValue('claim_types_name', null);
        this.form.setControlValue('full_name', null);
        this.form.setControlValue('Priority', null);
        this.form.setControlValue('Sort_index', null);
        this.form.setControlValue('Is_diameter_required', null);
        
     // debugger
        let acces = [{ parameterCode: '@access_id', parameterValue: acc_id }];
        this.form.setControlParameterValues('claim_types_id_first', acces )
       
     
            this.form.enableControl('claim_types_id_first');
            this.form.enableControl('classes_id');
            this.form.enableControl('claim_types_name');
            this.form.enableControl('Sort_index');
            this.form.enableControl('Priority');
            this.form.enableControl('Is_diameter_required');
    }
    // onParentType: function(parent){
    //     console.log('Id parent: ' + parent);
      
    // }
    
    // validate: function(){
        
    //      const queryForGetValue = {
    //                 queryCode: 'avr_test_delete_claim_type',
    //                 parameterValues: [
    //                     {
    //                         key: '@Id',
    //                         value: this.id
    //                     }
    //                 ]
    //             };
    //              this.queryExecutor.getValues(queryForGetValue).subscribe(data => {
    //              console.log(data);
    //                  return true;
    //              });
    // }
};
}());
