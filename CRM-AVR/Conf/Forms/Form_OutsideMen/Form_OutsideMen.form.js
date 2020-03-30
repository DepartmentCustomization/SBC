(function() {
    return {
        closeNum: 10,
        init: function() {
            this.form.disableControl('contact_number');
            this.form.onControlValueChanged('company_id', this.sampleFiz);
        },
        sampleFiz: function(org_id) {
            let orgParam = [{ parameterCode: '@OrgID', parameterValue: org_id }];
            this.form.setControlParameterValues('fiz_id', orgParam);
            const org_id_n = {
                queryCode: 'phone_number_outsideMan',
                parameterValues:[{key: '@org_id',value: org_id}]
            };
            this.queryExecutor.getValues(org_id_n).subscribe(data =>{
                this.form.setControlValue('contact_number', data.rows[0].values[0]);
            });
        },
        validate: function() {
            const order_status = this.form.getControlValue('order_stat_id')
            if (order_status === this.closeNum) {
                return 'У виконаному виїзді вносити правки заборонено'
            }
            return true
        }
    };
}());
