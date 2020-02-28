(function () {
  return {
    
    init: function() {
        console.log(state)
       // this.form.removeControl('temp_id');
        this.form.disableControl('Fact_finish_at');
        
        if(this.form.getControlValue('User') == null){
            this.form.setControlValue('User', this.user.login)
        }
        
       var status = this.form.getControlValue("Status_id");
        
        if ( status == null){
            this.form.disableControl("Status_id");
            this.form.setControlValue("Status_id", {key: 1, value: 'Нова'});
        };
        
         var org = this.form.getControlValue("Organization_id");
           if (org != 28 && status == null){
                this.form.setControlValue("Status_id", {key: 2, value: 'Розподілена'})
           };
        
        if (status == 1 || status == 2){
             this.form.disableControl("Status_id");
         };
          
         this.form.onControlValueChanged("Organization_id", this.onClaimsStatus_2);

    },
    
    onClaimsStatus_2: function(org){ 
        var status = this.form.getControlValue("Status_id");
           if (org != 28 && status == 1)
                this.form.setControlValue("Status_id", {key: 2, value: 'Розподілена'})
    },

    // validate:  function() {
           
    //       let place = document.getElementById('places_id').value;
            
    //         if(place == '')  {
    //           return "Місце не вибрано!"
    //         }else {
    //             return true;
    //         }
    // },
    afterSave: function(data){
        console.log('Server response : ', data);
            
    	const myForm = {
    			title: 'Создана нова заявка',
    			acceptBtnText: 'ok',
    			cancelBtnText: 'no',
    			fieldGroups:[
    				{
    					position: 1,
                        expand: true,
    					fields: [
    						{
    						    code:'1',
    						    placeholder:' ',
    						    hidden:false,
    						    required: false,
    						    position: 1,
    						    fullScreen: true,
    							value: '№ ' + this.getRowValueByCode(data, "Id"),
    							type: 'text'
    					    }
    					    ,
    						{
    						    code:'2',
    						    placeholder:' ',
    						    hidden:false,
    						    required: false,
    						    position: 2,
    						    fullScreen: true,
    							value: 'Первинний тип заявки: ' + this.getRowValueByCode(data, "First_Types_name"),
    							type: 'text'
    						}
    					]
    				}
    			]
    		};
    
    	const formCallback = (responce) => {
    		if (typeof responce == 'object') {
    		//	console.log('It`s all good');
    			const id = this.getRowValueByCode(data, "Id");
    			this.navigateTo('sections/Claims/edit/' + id);
    		}
    	};
    
         this.openModalForm(myForm, formCallback);
    }
}
;
}());
