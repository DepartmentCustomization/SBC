(function() {
    return {
        addBtn: document.getElementById('AddFromTempPlace'),
        delBtn: document.getElementById('DeleteWrongPlace'),
        findBtn: document.getElementById('UseChoosenPlace'),
        formConfig: {
            title: 'Видалення тимчасового місця',
            singleButton: true,
            acceptBtnText: 'ok',
            fieldGroups: [
                {
                    code: 'place_del_form',
                    name: 'Повідомте про своє рішення:',
                    expand: true,
                    position: 1,
                    fields: [
                        {
                            code: 'del_text',
                            placeholder: '',
                            hidden: false,
                            required: true,
                            position: 1,
                            fullScreen: false,
                            type: 'text',
                            width: '100%'
                        }
                    ]
                }
            ]
        },
        checkPlaceProcessVal() {
            const formConfig = {
                title: 'Дане місце вже було опрацьовано',
                singleButton: true,
                acceptBtnText: 'ok'
            };
            const queryForAddPlace = {
                queryCode: 'Temporal_PlaceCheckProcessing',
                parameterValues: [
                    {
                        key: '@Id',
                        value: this.id
                    }
                ]
            };
            this.queryExecutor.getValue(queryForAddPlace).subscribe(data => {
                let wait = 2;
                if (data !== wait) {
                    this.openModalForm(formConfig, this.infoCallback.bind(this))
                }
            });
        },
        infoCallback(data) {
            if(data) {
                this.navigateTo('/dashboard/page/start_avr_page');
            }
        },
        init: function() {
            this.checkPlaceProcessVal();
            const cross = 19;
            let place_type = this.form.getControlValue('place_type_id');
            if (place_type === cross) {
                this.form.setControlVisibility('place_street2_id', true);
                this.form.setControlVisibility('Number', false);
                this.form.setControlVisibility('Letter', false);
                this.form.disableControl('place_type_id');
            } else {
                let crossParam = [{ parameterCode: '@notCross', parameterValue: true }];
                this.form.setControlParameterValues('place_type_id', crossParam);
                this.form.setControlVisibility('place_street2_id', false);
            }
            this.addBtn.disabled = true;
            this.findBtn.disabled = true;
            this.form.disableControl('place_name');
            this.checkRegisterAvailable();
            this.form.onControlValueChanged('place_type_id', this.checkRegisterAvailable);
            this.form.onControlValueChanged('place_district_id', this.checkRegisterAvailable);
            this.form.onControlValueChanged('place_street1_id', this.checkRegisterAvailable);
            this.form.onControlValueChanged('place_street2_id', this.checkRegisterAvailable);
            this.form.onControlValueChanged('Number', this.checkRegisterAvailable);
            this.form.onControlValueChanged('Lattitude', this.checkRegisterAvailable);
            this.form.onControlValueChanged('Longitude', this.checkRegisterAvailable);
            this.form.onControlValueChanged('place_find', this.checkUseFindPlace);
            this.findBtn.addEventListener('click', function() {
                let place_id = {
                    code: 'place_id',
                    fullScreen: false,
                    hidden: true,
                    placeholder: 'place_id',
                    position: 2,
                    required: false,
                    value: this.id,
                    type: 'number',
                    width: '100%'
                };
                let find_place = {
                    code: 'find_place_id',
                    fullScreen: false,
                    hidden: true,
                    placeholder: 'find_place_id',
                    position: 3,
                    required: false,
                    value: this.form.getControlValue('place_find'),
                    type: 'number',
                    width: '100%'
                }
                this.formConfig.fieldGroups[0].fields.push(place_id);
                this.formConfig.fieldGroups[0].fields.push(find_place);
                this.openModalForm(this.formConfig, this.deleteCloseConfirm.bind(this));
            }.bind(this));
            this.delBtn.addEventListener('click', function() {
                this.openPopUpQuestionDialog('Ви впевнені що бажаєте видалити це тимчасове місце?', this.deleteCallBack);
            }.bind(this));
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
                        },
                        {
                            key: '@Name',
                            value: this.form.getControlValue('place_name')
                        }
                    ]
                };
                this.queryExecutor.getValues(queryForAddPlace).subscribe(data => {
                    if (data.rows[0].values[0] === 'OK') {
                        this.form.markAsSaved();
                        this.navigateTo('/sections/Temporal_Places');
                    }
                });
            }.bind(this));
            this.details.onCellClick('Detail_Entities', this.detailEntityClick.bind(this))
        },
        afterSave(data) {
            if (data) {
                let type = this.form.getControlValue('place_type_id');
                let cross = 19;
                let makeName;
                if (type === cross) {
                    makeName = {
                        queryCode: 'makeCrossName',
                        parameterValues: [
                            {
                                key: '@street1',
                                value: this.form.getControlValue('place_street1_id')
                            },
                            {
                                key: '@street2',
                                value: this.form.getControlValue('place_street2_id')
                            }
                        ]
                    };
                } else if (type !== cross) {
                    makeName = {
                        queryCode: 'makeBuildingName',
                        parameterValues: [
                            {
                                key: '@street',
                                value: this.form.getControlValue('place_street1_id')
                            }
                        ]
                    };
                }
                this.queryExecutor.getValue(makeName).subscribe(data => {
                    if (data) {
                        this.form.setControlValue('place_name', data);
                    }
                });
            }
        },
        detailEntityClick(column, row) {
            let rowEntity = row.values[0];
            let entityId = row.values[2];
            if(rowEntity === 'Заявка') {
                rowEntity = 'Claims';
            } else if(rowEntity === 'Маршрут') {
                rowEntity = 'Routes';
            }
            this.navigateTo('/sections/' + rowEntity + '/edit/' + entityId);
        },
        deleteCallBack(response) {
            if (response === true) {
                let place_id = {
                    code: 'place_id',
                    fullScreen: false,
                    hidden: true,
                    placeholder: 'place_id',
                    position: 2,
                    required: false,
                    value: this.id,
                    type: 'number',
                    width: '100%'
                };
                this.formConfig.fieldGroups[0].fields.push(place_id);
                this.openModalForm(this.formConfig, this.deleteCloseConfirm.bind(this));
            }
        },
        deleteCloseConfirm(response) {
            let del_text = response[0].value;
            let del_id;
            let find_place_val;
            if (response[2] === undefined) {
                del_id = response[1].value;
                find_place_val = null;
            } else {
                del_id = response[1].value;
                find_place_val = response[2].value;
            }
            if (del_text !== null && del_id !== null) {
                const deleteTempPlace = {
                    queryCode: 'Temporal_PlaceTerminate',
                    parameterValues: [
                        {
                            key: '@Id',
                            value: del_id
                        },
                        {
                            key: '@del_text',
                            value: del_text
                        },
                        {
                            key: '@place_find_id',
                            value: find_place_val
                        }
                    ]
                };
                this.queryExecutor.getValues(deleteTempPlace).subscribe(data => {
                    if (data.rows[0].values[0] === 'OK') {
                        this.form.markAsSaved();
                        this.navigateTo('/sections/Temporal_Places');
                    }
                });
            }
        },
        checkUseFindPlace() {
            let placeVal = this.form.getControlValue('place_find');
            if (placeVal !== null) {
                this.findVal = placeVal;
                this.findBtn.disabled = false;
            } else {
                this.findBtn.disabled = true;
            }
        },
        checkRegisterAvailable() {
            const crossId = 19;
            let type = this.form.getControlValue('place_type_id');
            let district = this.form.getControlValue('place_district_id');
            let street1 = this.form.getControlValue('place_street1_id');
            let street2 = this.form.getControlValue('place_street2_id');
            let lattitude = this.form.getControlValue('Lattitude');
            let longitude = this.form.getControlValue('Longitude');
            let number = this.form.getControlValue('Number');
            if (type === crossId) {
                if (type !== null &&
                    district !== null &&
                    street1 !== null &&
                    street2 !== null &&
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
