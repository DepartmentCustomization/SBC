(function () {
  return {
    init: function(){
       this.form.onControlValueChanged('materials_id', this.myCallBack);
        this.form.disableControl('Units_Id');
        this.form.disableControl('size_id');
        if(this.form.getControlValue('size_id') == null){
            this.form.setControlVisibility('size_id', false);
        };
        
         const claimStat = {
            queryCode: 'avr_Order_claim_status_is_5',
            parameterValues: [{key: '@order_id', value: this.form.getControlValue('orders_Id')}]
        };
        
        this.queryExecutor.getValue(claimStat).subscribe(data =>{
            if (data == 5){
                this.form.disableControl('materials_id');
                this.form.disableControl('size_id');
                this.form.disableControl('Volume');
                this.form.disableControl('Units_Id');
                this.form.disableControl('In_out');
                this.claimStat = data;
            }
        })
        
    },
    
    myCallBack: function(value){
        if (value) {
            if (typeof value === "string") {
                 return
            }else{
                const queryBody = {
                    queryCode: 'dir_MaterialsGetValue',
                    parameterValues: [{key: '@MaterialId', value: value} ],
                    limit: 1
                };
        
                this.queryExecutor.getValues(queryBody).subscribe(data => {
                    
                    this.myCallBackData(data);
                });
                
            }
        };
    },
    
    myCallBackData: function(data){
           
        this.form.setControlValue('size_id',{});
        this.form.setControlValue('Units_Id',{});
        this.form.setControlValue('In_out',null);
        this.form.setControlValue('Volume',null);
        
        let val =  { key: data.rows[0].values[0], value: data.rows[0].values[1]};
        let val2 =   data.rows[0].values[2];
        this.form.setControlValue('Units_Id', val);
        
        if (val2){
          this.form.enableControl('size_id');
           this.form.setControlVisibility('size_id', true);
        }else{
           this.form.disableControl('size_id')
          this.form.setControlVisibility('size_id', false);
        }
    },
    
    afterSave(data){
       this.back();
    }
    
}
;
}());
