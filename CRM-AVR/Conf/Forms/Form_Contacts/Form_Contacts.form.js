(function() {
    return {
        init: function() {
            let type_contact = this.form.getControlValue('contact_types_id');
            if(type_contact == 1 || type_contact == 2) {
                this.details.setVisibility('Group_Jobs', false);
            }
            if(type_contact == null) {
                this.form.setControlValue('contact_types_id', {key: 1 , value: 'Абонент фізична особа'});
            }
            this.form.onControlValueChanged('houses_id', this.onAddresChanged);
        },
        onAddresChanged: function(ad_Id) {
            let dependParams = [{ parameterCode: '@house_id', parameterValue: ad_Id }];
            this.form.setControlParameterValues('flats_id', dependParams);
        }
    };
}());
