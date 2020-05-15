(function() {
    return {
        addBtn: document.getElementById('AddFromTempPlace'),
        init: function() {
            let place_type = this.form.getControlValue('place_type_id');
            if (place_type === 19) {
                this.form.setControlVisibility('place_street2_id', true);
                this.form.disableControl('place_type_id');
            } else {
                this.form.setControlVisibility('place_street2_id', false);
            }
            this.addBtn.disabled = true;
            this.form.disableControl('place_name');
            this.checkRegisterAvailable();
            this.form.onControlValueChanged('place_type_id', this.checkRegisterAvailable);
            this.form.onControlValueChanged('place_district_id', this.checkRegisterAvailable);
            this.form.onControlValueChanged('place_street1_id', this.checkRegisterAvailable);
            this.form.onControlValueChanged('place_street2_id', this.checkRegisterAvailable);
            this.form.onControlValueChanged('Number', this.checkRegisterAvailable);
            this.form.onControlValueChanged('Lattitude', this.checkRegisterAvailable);
            this.form.onControlValueChanged('Longitude', this.checkRegisterAvailable);
            this.addBtn.addEventListener('click', function() {
                const queryForAddPlace = {
                    queryCode: 'Temporal_PlaceRegister',
                    parameterValues: [
                        {
                            key: '@Id',
                            value: this.id
                        },
                        {
                            key: '@type',
                            value: this.form.getControlValue('place_type_id')
                        },
                        {
                            key: '@district',
                            value: this.form.getControlValue('place_district_id')
                        },
                        {
                            key: '@street1',
                            value: this.form.getControlValue('place_street1_id')
                        },
                        {
                            key: '@street2',
                            value: this.form.getControlValue('place_street2_id')
                        },
                        {
                            key: '@Number',
                            value: this.form.getControlValue('Number')
                        },
                        {
                            key: '@Letter',
                            value: this.form.getControlValue('Letter')
                        },
                        {
                            key: '@Lattitude',
                            value: this.form.getControlValue('Lattitude')
                        },
                        {
                            key: '@Longitude',
                            value: this.form.getControlValue('Longitude')
                        }
                    ]
                };
                this.queryExecutor.getValues(queryForAddPlace).subscribe(data => {
                    if (data) {
                        this.openPopUpInfoDialog('OK');
                    }
                });
            }.bind(this));
        },
        checkRegisterAvailable() {
            const crossId = 19;
            let type = this.form.getControlValue('place_type_id');
            let district = this.form.getControlValue('place_district_id');
            let street1 = this.form.getControlValue('place_street1_id');
            let street2 = this.form.getControlValue('place_street2_id');
            let number = this.form.getControlValue('Number');
            let lattitude = this.form.getControlValue('Lattitude');
            let longitude = this.form.getControlValue('Longitude');
            if (type === crossId) {
                if (type !== null &&
                    district !== null &&
                    street1 !== null &&
                    street2 !== null &&
                    (number !== null && number !== '') &&
                    (lattitude !== null && lattitude !== '' && lattitude.includes('.')) &&
                    (longitude !== null && longitude !== '' && longitude.includes('.'))) {
                    this.addBtn.disabled = false;
                } else {
                    this.addBtn.disabled = true;
                }
            } else if (type !== crossId) {
                if (type !== null &&
                    district !== null &&
                    street1 !== null &&
                    (number !== null && number !== '') &&
                    (lattitude !== null && lattitude !== '' && lattitude.includes('.')) &&
                    (longitude !== null && longitude !== '' && longitude.includes('.'))) {
                    this.addBtn.disabled = false;
                } else {
                    this.addBtn.disabled = true;
                }
            }
        }
    };
}());
