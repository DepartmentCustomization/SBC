(function() {
    return {
        init: function() {
            this.form.disableControl('appeal_id');
            this.form.disableControl('appeal_source_id');
            this.form.disableControl('appeal_type_id');
            this.form.disableControl('appeal_parameter');
            this.form.disableControl('appeal_created_at');
            this.form.disableControl('appeal_created_by');
            this.form.disableControl('applicant_PIB');
            this.form.disableControl('applicant_Phone1');
            this.form.disableControl('applicant_Phone2');
            this.form.disableControl('applicant_Email');
            this.form.disableControl('applicant_Adress');
            this.form.disableControl('claim_type');
            this.form.disableControl('claim_adress');
            this.form.disableControl('claim_comment');
            this.form.disableControl('claim_control_date');
            let dependParams = [{ parameterCode: '@ClaimId', parameterValue: this.id }];
            this.form.setControlParameterValues('claim_executor_Id', dependParams);
        }
    };
}());
