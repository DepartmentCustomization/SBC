(function () {
  return {
    init: function() {
        
       var status = this.form.getControlValue("Status_id");
        if (status == null){
            this.form.disableControl("Status_id");
            this.form.setControlValue("Status_id", {key: 1, value: 'Нова'});
        };
        
        this.findResponseFromClaimModal();
        
        if (status == 1 || status == 2){
             this.form.disableControl("Status_id");
         };
          
        this.form.onControlValueChanged("Organization_id", this.onClaimsStatus_2);

    },
    findResponseFromClaimModal: function() {
        let claimId = this.form.getControlValue('claims_id');
                const checkClaim = {
    	      	    queryCode: 'SelectClaimResponse',
                    parameterValues:[
                             {
                              key: '@ClaimID',
                              value: claimId
                              }
                            ]
    	            	 };
    	            	 this.queryExecutor.getValues(checkClaim).subscribe(data=>{
    	            	     if(data.rows[0].values[0]===Number(2)) {
    	            	        this.form.setControlValue('Description', data.rows[0].values[1]);
    	            	     }
                     });
    },

    onClaimsStatus_2: function(org){ 
        var status = this.form.getControlValue("Status_id");
           if (org != 28 && status == 1)
                this.form.setControlValue("Status_id", {key: 2, value: 'Розподілена'})
    },

    validate:  function() {
           let place = document.getElementById('places_id').value;
            
            if(place == '')  {
               return "Місце не вибрано!"
            }else {
                return true;
            }
    },
    afterSave: function(response){
        this.chooseClaimLinkRoute();
    },
    chooseClaimLinkRoute: function() {
        const id = this.form.getControlValue('claims_id');
        const checkClaim = {
    	      	    queryCode: 'SelectClaimDisplay',
                    parameterValues:[
                             {
                              key: '@ClaimID',
                              value: id
                              }
                            ]
    	            	 };
    	            	 this.queryExecutor.getValue(checkClaim).subscribe(data=>{
    	            	     if(data) {
    	            	             if(data===Number(2)) {
    	            	                 this.navigateTo('/sections/AreaClaims/edit/'+id);
    	            	             } else {
                                        this.navigateTo('/sections/Claims/edit/'+id);
    	            	             }
    	            	     }
                     });
    }
 
}
;
}());
