(function() {
    return {
        init: function() {
            if (this.state == 'create') {
                console.log('Create!!!')
                let org = this.form.getControlValue('org_id');
                // let adressParams = this.form.getControlParameterValues('org_id1');
                // adressParams.push(org);
                // console.log('Params: ', adressParams);
                // this.form.setControlValue('org_id',{ key: 5508, value: 'Name' })
            }
        }
    };
}());
