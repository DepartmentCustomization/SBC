(function() {
    return {
        state_card: '',
        userss: [],
        chooseDetail_Claim_Faucet: function() {
            let claimStatus = this.form.getControlValue('Status_id');
            if (claimStatus === 5) {
                this.details.setVisibility('Detail_Claim_Faucet2', true);
                this.details.setVisibility('Detail_Claim_Faucet', false);
            } else {
                this.details.setVisibility('Detail_Claim_Faucet2', false);
                this.details.setVisibility('Detail_Claim_Faucet', true);
            }
        },
        checkForAreaClaims: function() {
            const isHaving = {
                queryCode: 'CheckForLinkClaims',
                parameterValues:[{
                    key: '@Id',
                    value: this.id
                }]
            };
            this.queryExecutor.getValue(isHaving).subscribe(data=>{
                if(data === Number(1)) {
                    this.details.setVisibility('Detail_AreaClaimLinks', true);
                } else {
                    this.details.setVisibility('Detail_AreaClaimLinks', false);
                }
            })
        },
        onTempPlaceTypeChange() {
            let cross = 19;
            let temp_place_type = this.form.getControlValue('temp_place_type');
            if(temp_place_type === cross) {
                this.form.setControlVisibility('place_district_id', true);
                this.form.setControlVisibility('place_street1_id', true);
                this.form.setControlVisibility('place_street2_id', true);
                this.form.setControlVisibility('cross_name', true);
                this.form.setControlVisibility('new_temp_placeAdd', true);
                this.form.setControlVisibility('new_temp_placeReturn', true);
                this.form.setControlVisibility('place_building', false);
            } else if(temp_place_type !== null && temp_place_type !== cross) {
                this.form.setControlVisibility('place_district_id', true);
                this.form.setControlVisibility('place_street1_id', true);
                this.form.setControlVisibility('place_building', true);
                this.form.setControlVisibility('place_building_name', true);
                this.form.setControlVisibility('new_temp_placeAdd', true);
                this.form.setControlVisibility('new_temp_placeReturn', true);
            }
        },
        onTempCrossStreetChange() {
            let district = this.form.getControlValue('place_district_id');
            let street1 = this.form.getControlValue('place_street1_id');
            let street2 = this.form.getControlValue('place_street2_id');
            if((district !== null && typeof (district) === 'number')
                &&
                (street1 !== null && typeof (street1) === 'number')
                &&
                (street2 !== null && typeof (street2) === 'number')) {
                const makeCrossName = {
                    queryCode: 'makeCrossName',
                    parameterValues: [
                        {
                            key: '@street1',
                            value: street1
                        },
                        {
                            key: '@street2',
                            value: street2
                        }
                    ]
                };
                this.queryExecutor.getValue(makeCrossName).subscribe(data => {
                    if(data) {
                        this.form.setControlValue('cross_name', data);
                        document.getElementById('new_temp_placeAdd').disabled = false;
                    }
                });
            } else {
                document.getElementById('new_temp_placeAdd').disabled = true;
            }
        },
        onTempBuildingChange() {
            let district = this.form.getControlValue('place_district_id');
            let street = this.form.getControlValue('place_street1_id');
            let building = this.form.getControlValue('place_building');
            if(district !== null &&
                street !== null &&
                building !== null) {
                const makeBuildingName = {
                    queryCode: 'makeBuildingName',
                    parameterValues: [
                        {
                            key: '@street',
                            value: street
                        },
                        {
                            key: '@building_name',
                            value: building
                        }
                    ]
                };
                this.queryExecutor.getValue(makeBuildingName).subscribe(data => {
                    if(data) {
                        this.form.setControlValue('place_building_name', data);
                        document.getElementById('new_temp_placeAdd').disabled = false;
                    }
                });
            } else {
                document.getElementById('new_temp_placeAdd').disabled = true;
            }
        },
        checkPlaceActivity() {
            let place_activity;
            let current_place = this.form.getControlValue('places_id');
            let waitCheck = 2;
            let deleted = 3;
            const getPlaceActivity = {
                queryCode: 'getPlaceActivity',
                parameterValues: [
                    {
                        key: '@Id',
                        value: current_place
                    }
                ]
            };
            this.queryExecutor.getValue(getPlaceActivity).subscribe(data => {
                if(data) {
                    place_activity = data;
                    switch (place_activity) {
                        case waitCheck:
                            document.getElementById('places_id').style.color = 'darkblue'
                            break;
                        case deleted:
                            document.getElementById('places_id').style.color = 'red'
                            break;
                        default:
                            document.getElementById('places_id').style.color = 'black'
                    }
                }
            });
        },
        init: function() {
            this.checkPlaceActivity();
            this.chooseDetail_Claim_Faucet();
            this.checkForAreaClaims();
            this.form.disableControl('Fact_finish_at');
            this.form.disableControl('EM_org_id');
            this.form.disableControl('cross_name');
            this.form.disableControl('place_building_name');
            this.form.setControlVisibility('temp_place_type', false);
            this.form.setControlVisibility('place_street1_id', false);
            this.form.setControlVisibility('place_street2_id', false);
            this.form.setControlVisibility('cross_name', false);
            this.form.setControlVisibility('place_district_id', false);
            this.form.setControlVisibility('place_building', false);
            this.form.setControlVisibility('place_building_name', false);
            this.form.setControlVisibility('new_temp_placeAdd', false);
            this.form.setControlVisibility('new_temp_placeReturn', false);
            let btn_AddJuridicalContact = document.getElementById('btn_AddJuridicalContact');
            let btn_newTempPlace = document.getElementById('new_temp_place');
            let new_temp_placeAdd = document.getElementById('new_temp_placeAdd');
            let new_temp_placeReturn = document.getElementById('new_temp_placeReturn');
            new_temp_placeAdd.disabled = true;
            let btn_copy_claim = document.getElementById('btn_copy_claim');
            this.form.onControlValueChanged('UR_organization_id', this.checkJuridicalOrgAvailable);
            this.form.onControlValueChanged('temp_place_type', this.onTempPlaceTypeChange);
            this.form.onControlValueChanged('place_street1_id', this.onTempCrossStreetChange);
            this.form.onControlValueChanged('place_street2_id', this.onTempCrossStreetChange);
            this.form.onControlValueChanged('place_district_id', this.onTempBuildingChange);
            this.form.onControlValueChanged('place_street1_id', this.onTempBuildingChange);
            this.form.onControlValueChanged('place_building', this.onTempBuildingChange);
            this.form.onControlValueChanged('places_id', this.checkPlaceActivity);
            this.state_card = this.state;
            if(this.state_card == 'create') {
                btn_copy_claim.style.display = 'none';
            } else {
                if(this.form.getControlValue('contact_type') !== undefined) {
                    btn_AddJuridicalContact.style.display = 'none';
                }
            }
            new_temp_placeAdd.addEventListener('click', function() {
                let addTempPlace;
                let cross = 19;
                let place_type = this.form.getControlValue('temp_place_type');
                if(place_type === cross) {
                    addTempPlace = {
                        queryCode: 'Temporal_PlacesInsert',
                        parameterValues:[
                            {
                                key: '@type',
                                value: place_type
                            },
                            {
                                key: '@district',
                                value: this.form.getControlValue('place_district_id')
                            },
                            {
                                key: '@street',
                                value: this.form.getControlValue('place_street1_id')
                            },
                            {
                                key: '@Name',
                                value: this.form.getControlValue('cross_name')
                            },
                            {
                                key: '@entity',
                                value: 'Заявка'
                            }
                        ]
                    };
                } else if (place_type !== cross) {
                    addTempPlace = {
                        queryCode: 'Temporal_PlacesInsert',
                        parameterValues:[
                            {
                                key: '@type',
                                value: place_type
                            },
                            {
                                key: '@district',
                                value: this.form.getControlValue('place_district_id')
                            },
                            {
                                key: '@street',
                                value: this.form.getControlValue('place_street1_id')
                            },
                            {
                                key: '@Name',
                                value: this.form.getControlValue('place_building_name')
                            },
                            {
                                key: '@entity',
                                value: 'Заявка'
                            }
                        ]
                    };
                }
                this.queryExecutor.getValues(addTempPlace).subscribe(data =>{
                    if(data) {
                        this.form.setControlValue('places_id',
                            {key: data.rows[0].values[0], value: data.rows[0].values[1]});
                        document.getElementById('new_temp_placeReturn').click();
                        const adminVDKorg = 10;
                        const notifyTempPlaceCreated = {
                            url: 'sections/Temporal_Places/edit/' + data.rows[0].values[0],
                            notificationTypeCode: 'NewTemporaryPlace',
                            text: data.rows[0].values[2],
                            notificationPriorityCode: 'Middle',
                            organisationIds: [adminVDKorg],
                            hasAudio: true
                        };
                        this.createOrganisationsNotification(notifyTempPlaceCreated);
                    }
                })
            }.bind(this));
            new_temp_placeReturn.addEventListener('click', function() {
                this.form.setControlVisibility('place_street1_id', false);
                this.form.setControlVisibility('place_street2_id', false);
                this.form.setControlVisibility('cross_name', false);
                this.form.setControlVisibility('new_temp_placeAdd', false);
                this.form.setControlVisibility('new_temp_placeReturn', false);
                this.form.setControlVisibility('temp_place_type', false);
                this.form.setControlVisibility('place_district_id', false);
                this.form.setControlVisibility('place_building', false);
                this.form.setControlVisibility('place_building_name', false);
                this.form.setControlValue('temp_place_type', null)
                this.form.setControlValue('cross_name', null)
                this.form.setControlValue('place_street1_id', null)
                this.form.setControlValue('place_street2_id', null)
                this.form.setControlValue('place_district_id', null)
                this.form.setControlValue('place_building', null)
                this.form.setControlValue('place_building_name', null)
                document.getElementById('new_temp_placeAdd').disabled = true;
                this.form.setControlVisibility('new_temp_place', true)
            }.bind(this));
            btn_newTempPlace.addEventListener('click', function() {
                this.form.setControlVisibility('temp_place_type', true);
                this.form.setControlVisibility('new_temp_place', false)
            }.bind(this));
            btn_copy_claim.addEventListener('click', function(event) {
                const param = {
                    queryCode: 'avr_Claim_Insert_copy',
                    parameterValues:[{key: '@Id', value: this.id}]
                }
                this.queryExecutor.getValue(param).subscribe(data =>{
                    this.navigateTo('/sections/Claims/edit/' + data);
                    this.openPopUpInfoDialog('Копія заявки успішно створена')
                })
            }.bind(this));
            let btn_close_claim = document.getElementById('btn_close_claim');
            btn_close_claim.addEventListener('click', function(event) {
                this.openPopUpConfirmDialog('Увага!\n\nПісля того як ви закриєте заявку її не можно буде редагувати.\n ' +
                'Ви впевнені що бажаєте закрити заявку?', this.answerClose);
            }.bind(this));
            this.time_close = this.form.getControlValue('Fact_finish_at');
            this.form.onControlValueChanged('Fact_finish_at', this.quesionClose);
            let create = this.form.getControlValue('Created_at');
            let status = this.form.getControlValue('Status_id');
            this.form.setControlValue('userID', this.user.userId);
            let organization = this.form.getControlValue('Organization_id');
            if(organization == 28) {
                this.form.setControlValue('Organization_id', {});
                const userOrg = {
                    queryCode: 'avr_onOrganization_toUser',
                    parameterValues:[]
                };
                this.queryExecutor.getValues(userOrg).subscribe(data =>{
                    if (data.rows[0] !== undefined) {
                        this.form.setControlValue('Organization_id', {key: data.rows[0].values[0], value: data.rows[0].values[1]})
                    }else{
                        this.form.setControlValue('Organization_id', {key: 28, value: 'невизначено'})
                    }
                });
            }
            const answer_claim_type = {
                queryCode: 'exec_proc_Claim_types',
                parameterValues:[{
                    key: '@type_id',
                    value: this.form.getControlValue('Types_id')
                }]
            };
            this.queryExecutor.getValue(answer_claim_type).subscribe(data=>{
                if(data) {
                    this.form.setControlValue('answer_claim_type', data);
                }
            });
            this.form.setControlVisibility('user_close',false);
            this.form.setControlVisibility('date_close',false);
            this.form.setControlVisibility('position_close',false);
            this.form.disableControl('Status_id');
            this.form.disableControl('User');
            this.form.disableControl('classes_id');
            this.form.disableControl('place_type_id');
            this.form.disableControl('district_id');
            this.form.disableControl('flat_number');
            this.form.disableControl('position_reg');
            this.form.disableControl('position_close');
            this.form.disableControl('Created_at');
            this.details.setVisibility('Detail_Claim_Likns_new_claim', false);
            if(this.form.getControlValue('date_check') != null) {
                this.form.disableControl('date_check');
            }
            let btn_Save_new_concat = document.getElementById('btn_Save_new_concat');
            let btn_Update_concat = document.getElementById('btn_Update_concat');
            let btn_Search = document.getElementById('btn_Search');
            let btn_Cleare = document.getElementById('btn_Cleare');
            btn_Save_new_concat.style.display = 'none';
            btn_Update_concat.style.display = 'none';
            btn_Cleare.style.display = 'none';
            btn_Update_concat.disabled = true;
            btn_Search.style.display = 'none';
            this.form.onControlValueChanged('FIZ_concact_id', this.onUpdateContact);
            //действие кнопки Cleare
            btn_Cleare.addEventListener('click', function(event) {
                this.form.setControlValue('FIZ_concact_id', null);
                this.form.setControlValue('FIZ_contact_fio', null);
                this.form.setControlValue('FIZ_number', null);
            }.bind(this));
            // повесить действие на кнопку Новий контакт для юридической организации
            document.getElementById('btn_AddJuridicalContact').addEventListener('click',this.addNewJuridicalContact.bind(this));
            //действие кнопки Сохранить новый физ контакт
            btn_Save_new_concat.addEventListener('click', function(event) {
                const addContact = {
                    queryCode: 'avr_Insert_new_FIZcontact_of_Claim',
                    parameterValues:[
                        {
                            key: '@FIZ_contact_fio',
                            value: this.form.getControlValue('FIZ_contact_fio')
                        },
                        {
                            key: '@FIZ_number',
                            value: this.form.getControlValue('FIZ_number')
                        }]
                };
                this.queryExecutor.getValues(addContact).subscribe(data =>{
                    this.form.setControlValue('FIZ_concact_id', data.rows[0].values[2]);
                })
            }.bind(this));
            //действие кнопки Обновить контакт физ.лицо
            btn_Update_concat.addEventListener('click', function(event) {
                const updContact = {
                    queryCode: 'avr_Update_FIZcontact_of_Claim',
                    parameterValues:[
                        {
                            key: '@FIZ_contact_fio',
                            value: this.form.getControlValue('FIZ_contact_fio')
                        },
                        {
                            key: '@FIZ_number',
                            value: this.form.getControlValue('FIZ_number')
                        },
                        {
                            key: '@Id',
                            value: this.form.getControlValue('FIZ_concact_id')
                        }]
                };
                this.queryExecutor.getValues(updContact).subscribe(data =>{
                    console.log(data);
                })
            }.bind(this));
            if (status == null) {
                this.form.disableControl('Status_id');
                this.form.setControlValue('Status_id', {key: 1, value: 'Нова'});
                this.form.setControlValue('Organization_id', {key: 28, value: 'невизначено'});
            }
            //GROUP Заявитель!!!
            let con_type = this.form.getControlValue('contact_type');
            if(status == null || con_type == null) {
                this.form.setControlVisibility('type_employee_2',false);
                this.form.setControlVisibility('btn_AddJuridicalContact', false);
                this.form.setControlVisibility('UR_organization_id',false);
                this.form.setControlVisibility('UR_contact_fio',false);
                this.form.setControlVisibility('UR_organization',false);
                this.form.setControlVisibility('UR_number',false);
                this.form.setControlVisibility('FIZ_contact_fio',false);
                this.form.setControlVisibility('FIZ_number',false);
                this.form.setControlVisibility('EM_org_id',false);
                this.form.setControlVisibility('EM_contact_fio',false);
                this.form.setControlVisibility('EM_number',false);
                this.form.setControlVisibility('x_pib_inspector',false);
                this.form.setControlVisibility('x_phone_inspector',false);
                this.form.setControlVisibility('Sked',false);
                this.form.setControlVisibility('TU',false);
                this.form.setControlVisibility('TU_Id',false);
                this.form.setControlVisibility('Letter',false);
                this.form.setControlVisibility('L_Contacts_Id',false);
                this.form.setControlVisibility('Gravamen',false);
                this.form.setControlVisibility('G_Left',false);
                this.form.setControlVisibility('G_PIB',false);
            }
            if(con_type != null) {
                this.form.disableControl('contact_type');
            }
            if (status == 1 || status == 2) {
                this.form.disableControl('Status_id');
            }
            if(status == 5) {
                this.form.disableControl('Status_id');
                this.form.disableControl('Fact_finish_at');
                this.form.setControlVisibility('user_close',true);
                this.form.setControlVisibility('date_close',true);
                this.form.setControlVisibility('position_close',true);
                this.form.disableControl('user_close');
                this.form.disableControl('date_close');
                this.form.disableControl('position_close');
                btn_close_claim.style.display = 'none';
                document.getElementById('Status_id').style.color = 'red';
                let btn_add = document.querySelectorAll('.add-btn');
                for(let i = 0; i < btn_add.length; i++) {
                    btn_add[i].style.display = 'none'
                }
                if(location.pathname.indexOf('edit') != -1) {
                    this.navigateTo(location.pathname.replace(localStorage.getItem('VirtualPath'), '').replace('edit', 'view'));
                }
            }
            let appel_type = this.form.getControlValue('contact_type');
            let em_type = this.form.getControlValue('type_employee_2');
            if(appel_type == 1) {
                this.form.disableControl('FIZ_contact_fio');
                this.form.disableControl('FIZ_number');
                this.form.setControlVisibility('FIZ_contact_fio',true);
                this.form.setControlVisibility('FIZ_number',true);
                this.form.setControlVisibility('type_employee_2',false);
                this.form.setControlVisibility('UR_number',false);
                this.form.setControlVisibility('UR_organization_id',false);
                this.form.setControlVisibility('UR_contact_fio',false);
                this.form.setControlVisibility('UR_organization',false);
                this.form.setControlVisibility('EM_org_id',false);
                this.form.setControlVisibility('EM_contact_fio',false);
                this.form.setControlVisibility('EM_number',false);
                this.form.setControlVisibility('x_pib_inspector',false);
                this.form.setControlVisibility('x_phone_inspector',false);
                this.form.setControlVisibility('Sked',false);
                this.form.setControlVisibility('TU',false);
                this.form.setControlVisibility('TU_Id',false);
                this.form.setControlVisibility('Letter',false);
                this.form.setControlVisibility('L_Contacts_Id',false);
                this.form.setControlVisibility('Gravamen',false);
                this.form.setControlVisibility('G_Left',false);
                this.form.setControlVisibility('G_PIB',false);
            }
            if(appel_type == 2) {
                this.form.disableControl('UR_number');
                this.form.disableControl('UR_organization_id');
                this.form.disableControl('UR_contact_fio');
                this.form.disableControl('UR_organization');
                this.form.setControlVisibility('UR_number',true);
                this.form.setControlVisibility('UR_organization_id',true);
                this.form.setControlVisibility('UR_organization',true);
                this.form.setControlVisibility('UR_contact_fio',true);
                this.form.setControlVisibility('type_employee_2',false);
                this.form.setControlVisibility('FIZ_contact_fio',false);
                this.form.setControlVisibility('FIZ_number',false);
                this.form.setControlVisibility('EM_org_id',false);
                this.form.setControlVisibility('EM_contact_fio',false);
                this.form.setControlVisibility('EM_number',false);
                this.form.setControlVisibility('x_pib_inspector',false);
                this.form.setControlVisibility('x_phone_inspector',false);
                this.form.setControlVisibility('Sked',false);
                this.form.setControlVisibility('TU',false);
                this.form.setControlVisibility('TU_Id',false);
                this.form.setControlVisibility('Letter',false);
                this.form.setControlVisibility('L_Contacts_Id',false);
                this.form.setControlVisibility('Gravamen',false);
                this.form.setControlVisibility('G_Left',false);
                this.form.setControlVisibility('G_PIB',false);
            }
            if(appel_type == 3) {
                this.form.disableControl('EM_org_id');
                this.form.disableControl('EM_contact_fio');
                this.form.disableControl('EM_number');
                this.form.disableControl('type_employee_2');
                this.form.disableControl('x_pib_inspector');
                this.form.disableControl('x_phone_inspector');
                this.form.setControlVisibility('EM_org_id',true);
                this.form.setControlVisibility('EM_contact_fio',true);
                this.form.setControlVisibility('EM_number',true);
                this.form.setControlVisibility('x_pib_inspector',true);
                this.form.setControlVisibility('x_phone_inspector',true);
                // this.form.setControlTitle('EM_contact_fio', 'ПІБ керівника групи');
                this.form.setControlVisibility('type_employee_2',true);
                this.form.setControlVisibility('UR_organization_id',false);
                this.form.setControlVisibility('UR_organization',false);
                this.form.setControlVisibility('UR_contact_fio',false);
                this.form.setControlVisibility('FIZ_contact_fio',false);
                this.form.setControlVisibility('UR_number',false);
                this.form.setControlVisibility('FIZ_number',false);
                this.form.setControlVisibility('Sked',false);
                this.form.setControlVisibility('TU',false);
                this.form.setControlVisibility('TU_Id',false);
                this.form.setControlVisibility('Letter',false);
                this.form.setControlVisibility('L_Contacts_Id',false);
                this.form.setControlVisibility('Gravamen',false);
                this.form.setControlVisibility('G_Left',false);
                this.form.setControlVisibility('G_PIB',false);
                if(em_type == 5 || em_type == 6) {
                    this.form.disableControl('Sked');
                    this.form.disableControl('TU');
                    this.form.disableControl('TU_Id');
                    this.form.disableControl('Letter');
                    this.form.disableControl('L_Contacts_Id');
                    this.form.disableControl('Gravamen');
                    this.form.disableControl('G_Left');
                    this.form.disableControl('G_PIB');
                    this.form.setControlVisibility('Sked',true);
                    this.form.setControlVisibility('TU',true);
                    this.form.setControlVisibility('TU_Id',true);
                    this.form.setControlVisibility('Letter',true);
                    this.form.setControlVisibility('L_Contacts_Id',true);
                    this.form.setControlVisibility('Gravamen',true);
                    this.form.setControlVisibility('G_Left',true);
                    this.form.setControlVisibility('G_PIB',true);
                }
            }
            this.form.onControlValueChanged('contact_type', this.onContact_type); //change type appeal
            let order = this.form.getControlValue('count_orders');
            if(order > 0 && status != 3 && status != 4 && status != 5 && status != 6) {
                if (status == 2 && order > 0) {
                    this.form.setControlValue('Status_id', {key: 3, value: 'У роботі'});
                }
            }
            this.form.onControlValueChanged('Organization_id', this.onClaimsStatus_2);
            //выводит в название карточки номер заявки и дату создания
            if (create !== null) {
                let options = {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                };
                this.form.setGroupTitle('Group_Claims', 'ЗАЯВКА №  ' + this.form.getControlValue('Claim_Number'));
            } else {
                const SelectUserOrg = {
                    queryCode: 'avr_onOrganization_toUser',
                    parameterValues:[]
                };
                this.queryExecutor.getValues(SelectUserOrg).subscribe(data =>{
                    if(data.rows[0].values[1] !== undefined) {
                        this.form.setControlValue('Organization_id', {key: data.rows[0].values[0], value: data.rows[0].values[1]})
                    }
                })
            }
            this.form.onControlValueChanged('places_id', this.onFlats);
            const queClaimLink = {
                title: 'Пов\'язані заявки',
                text: 'Створити нову чи додати (приєднати) існуючу? ',
                acceptBtnText: 'create',
                cancelBtnText: 'add'
            };
            const formClaimLink = (link) => {
                const id = this.form.getControlValue('claims_id');
                if (link === true) {
                    this.navigateTo('/sections/Claims/edit/' + id + '/simple/Detail_Claim_Likns_new_claim/Form_Link_New_Claims');
                }else {
                    this.navigateTo('/sections/Claims/edit/' + id + '/simple/Detail_Claim_Likns/Form_Claim_links');
                }
            };
            let btn = document.querySelector('#Detail_Claim_Likns .add-btn');
            btn.addEventListener('click', (e)=> {
                e.stopPropagation();
                this.openModalForm(queClaimLink, formClaimLink)
            });
            // modal for new contact
            const formNewContact = {
                title: 'Новий заявник',
                acceptBtnText: 'save',
                cancelBtnText: 'cancel',
                fieldGroups:[
                    {
                        code: 'ModalNewCont',
                        expand: true,
                        position: 1,
                        fields: [
                            {
                                code:'m_Contact_type_ID',
                                placeholder:'Тип контакту',
                                hidden: false,
                                required: true,
                                position: 1,
                                fullScreen: false,
                                queryListCode: 'list_Contact_type_for_Modal',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select'
                            },
                            {
                                code:'m_phone_number',
                                placeholder:'Номер телефону',
                                hidden: false,
                                required: false,
                                position: 2,
                                fullScreen: false,
                                type: 'text'
                            },
                            {
                                code:'org_name',
                                placeholder:'Назва організації',
                                hidden: false,
                                required: false,
                                position: 3,
                                fullScreen: true,
                                value: '',
                                type: 'text'
                            },
                            {
                                code:'m_Surname',
                                placeholder:'Призвіще',
                                hidden: false,
                                required: false,
                                position: 4,
                                fullScreen: true,
                                value: '',
                                type: 'text'
                            },
                            {
                                code:'m_First_name',
                                placeholder:'Ім`я',
                                hidden: false,
                                required: false,
                                position: 5,
                                fullScreen: true,
                                value: '',
                                type: 'text'
                            },
                            {
                                code:'m_Middle_name',
                                placeholder:'По батькові',
                                hidden: false,
                                required: false,
                                position: 6,
                                fullScreen: true,
                                value: '',
                                type: 'text'
                            }
                        ]
                    }
                ]
            };
            const addContactCallBack = (param) => {
                if (param === false) {
                    console.log('It`s a cancel');
                }else{
                    console.log('It`s a good');
                    const body = {
                        queryCode: 'avr_Insert_new_Contact_of_Modal',
                        parameterValues: param
                    }
                    this.queryExecutor.getValues(body).subscribe(data => {
                        this.form.setControlValue('UR_contact_fio', {key: data.rows[0].values[0], value: data.rows[0].values[1]});
                        this.form.setControlValue('UR_number', data.rows[0].values[2]);
                    });
                }
            }
            const formNewPlace = {
                title: 'Новє місце',
                acceptBtnText: 'save',
                cancelBtnText: 'cancel',
                fieldGroups:[
                    {
                        code: 'ModalNewPlace',
                        expand: true,
                        position: 1,
                        fields: [
                            {
                                code:'m_houses_id',
                                placeholder:'Вулиця',
                                hidden: false,
                                required: true,
                                position: 3,
                                fullScreen: true,
                                queryListCode: 'list_House_for_modal',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select'
                            },
                            {
                                code:'m_house_number',
                                placeholder:'№ будинку',
                                hidden: false,
                                required: true,
                                position: 4,
                                fullScreen: false,
                                value: '',
                                type: 'text'
                            },
                            {
                                code:'m_house_letr',
                                placeholder:'літера',
                                hidden: false,
                                required: false,
                                position: 5,
                                fullScreen: false,
                                value: '',
                                type: 'text'
                            },
                            {
                                code:'m_Place_type_ID',
                                placeholder:'Тип місця',
                                hidden: false,
                                required: true,
                                position: 1,
                                fullScreen: false,
                                queryListCode: 'list_Place_types_modal',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select'
                            },
                            {
                                code:'m_District',
                                placeholder:'Район',
                                hidden: false,
                                required: false,
                                position: 2,
                                fullScreen: false,
                                queryListCode: 'dir_DistrictsSelectRows',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select'
                            },
                            {
                                code:'longitude',
                                placeholder:'Довгота (30.ххх)',
                                hidden: false,
                                required: false,
                                position: 7,
                                fullScreen: false,
                                type: 'text'
                            },
                            {
                                code:'latitude',
                                placeholder:'Широта (50.ххх)',
                                hidden: false,
                                required: false,
                                position: 6,
                                fullScreen: false,
                                type: 'text'
                            }
                        ]
                    }
                ]
            }
            const questionForm = {
                title: 'Такий будинок вже є в базі!',
                singleButton: true
            };
            const callBackQues = (ok) =>{
                console.log(ok);
            };
            const addPlaceCallBack = (param) => {
                if (param === false) {
                    console.log('It`s a cancel');
                }else{
                    console.log('It`s a good');
                    const body = {
                        queryCode: 'avr_Insert_new_Place_of_Modal',
                        parameterValues: param
                    }
                    this.queryExecutor.getValues(body).subscribe(data => {
                        if (data.rows.length === 0) {
                            this.openModalForm(questionForm, callBackQues);
                        }else{
                            this.form.setControlValue('places_id', {key: data.rows[0].values[0], value: data.rows[0].values[1]});
                            this.form.setControlValue('place_type_id', {key: data.rows[0].values[2], value: data.rows[0].values[3]});
                            this.form.setControlValue('district_id', {key: data.rows[0].values[4], value: data.rows[0].values[5]});
                        }
                    })
                }
            }
            // ПЕРЕХРЕСТЯ
            const formNewCross = {
                title: 'Новє місце - тип "ПЕРЕХРЕСТЯ"',
                acceptBtnText: 'save',
                cancelBtnText: 'cancel',
                fieldGroups:[
                    {
                        code: 'ModalNewCross',
                        expand: true,
                        position: 1,
                        fields: [
                            {
                                code:'m_houses_id',
                                placeholder:'Перша вулиця',
                                hidden: false,
                                required: true,
                                position: 1,
                                fullScreen: true,
                                queryListCode: 'list_House_for_modal',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select'
                            },
                            {
                                code:'m_houses2_id',
                                placeholder:'Друга вулиця',
                                hidden: false,
                                required: true,
                                position: 2,
                                fullScreen: true,
                                queryListCode: 'list_House_for_modal',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select'
                            },
                            {
                                code:'longitude',
                                placeholder:'Довгота (30.ххх)',
                                hidden: false,
                                required: false,
                                position: 4,
                                fullScreen: false,
                                type: 'text'
                            },
                            {
                                code:'latitude',
                                placeholder:'Широта (50.ххх)',
                                hidden: false,
                                required: false,
                                position: 3,
                                fullScreen: false,
                                type: 'text'
                            },
                            {
                                code:'m_district',
                                placeholder:'Район',
                                hidden: false,
                                required: false,
                                position: 5,
                                fullScreen: true,
                                queryListCode: 'dir_DistrictsSelectRows',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select'
                            },
                            {
                                code:'m_Place_type_ID',
                                placeholder:'Тип місця',
                                hidden: true,
                                required: true,
                                position: 14,
                                fullScreen: false,
                                queryListCode: 'dir_Place_typesSelectRows',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select',
                                value: 19
                            }
                        ]
                    }
                ]
            };
            const addCrossCallBack = (param_cross) =>{
                if (param_cross === false) {
                    console.log('It`s a cancel');
                }else{
                    console.log('It`s a good');
                    const body = {
                        queryCode: 'avr_Insert_new_PlaceCross_of_Modal',
                        parameterValues: param_cross
                    }
                    this.queryExecutor.getValues(body).subscribe(data => {
                        this.form.setControlValue('places_id', {key: data.rows[0].values[0], value: data.rows[0].values[1]});
                        this.form.setControlValue('place_type_id', {key: data.rows[0].values[2], value: data.rows[0].values[3]});
                        this.form.setControlValue('district_id', {key: data.rows[0].values[5], value: data.rows[0].values[6]});
                    })
                }
            };
            // ДІЛЯНКА
            const formNewArea = {
                title: 'Новє місце - тип "ДІЛЯНКА"',
                acceptBtnText: 'save',
                cancelBtnText: 'cancel',
                fieldGroups:[
                    {
                        code: 'ModalNewArea',
                        expand: true,
                        position: 1,
                        fields: [
                            {
                                code:'m_houses_id',
                                placeholder:'Перший будинок',
                                hidden: false,
                                required: true,
                                position: 1,
                                fullScreen: true,
                                queryListCode: 'list_Houses_for_places',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select'
                            },
                            {
                                code:'m_houses2_id',
                                placeholder:'Другий будинок',
                                hidden: false,
                                required: true,
                                position: 2,
                                fullScreen: true,
                                queryListCode: 'list_Houses_for_places',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select'
                            },
                            {
                                code:'longitude',
                                placeholder:'Довгота (30.ххх)',
                                hidden: false,
                                required: false,
                                position: 4,
                                fullScreen: false,
                                type: 'text'
                            },
                            {
                                code:'latitude',
                                placeholder:'Широта (50.ххх)',
                                hidden: false,
                                required: false,
                                position: 3,
                                fullScreen: false,
                                type: 'text'
                            },
                            {
                                code:'m_district',
                                placeholder:'Район',
                                hidden: false,
                                required: false,
                                position: 5,
                                fullScreen: true,
                                queryListCode: 'dir_DistrictsSelectRows',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select'
                            },
                            {
                                code:'m_Place_type_ID',
                                placeholder:'Тип місця',
                                hidden: true,
                                required: true,
                                position: 14,
                                fullScreen: false,
                                queryListCode: 'dir_Place_typesSelectRows',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select',
                                value: 10
                            }
                        ]
                    }
                ]
            };
            const addAreaCallBack = (param_area) =>{
                if (param_area === false) {
                    console.log('It`s a cancel');
                }else{
                    console.log('It`s a good');
                    const body = {
                        queryCode: 'avr_Insert_new_PlaceArea_of_Modal',
                        parameterValues: param_area
                    }
                    this.queryExecutor.getValues(body).subscribe(data => {
                        this.form.setControlValue('places_id', {key: data.rows[0].values[0], value: data.rows[0].values[1]});
                        this.form.setControlValue('place_type_id', {key: data.rows[0].values[2], value: data.rows[0].values[3]});
                        this.form.setControlValue('district_id', {key: data.rows[0].values[5], value: data.rows[0].values[6]});
                    })
                }
            };
            // Колодязь 4
            const formNewWell = {
                title: 'Новє місце - тип КОЛОДЯЗЬ',
                acceptBtnText: 'save',
                cancelBtnText: 'cancel',
                fieldGroups:[
                    {
                        code: 'ModalNewWell',
                        expand: true,
                        position: 1,
                        fields: [
                            {
                                code:'m_street_id',
                                placeholder:'Вулиця',
                                hidden: false,
                                required: true,
                                position: 1,
                                fullScreen: true,
                                queryListCode: 'list_House_for_modal',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select'
                            },
                            {
                                code:'longitude',
                                placeholder:'Довгота (30.ххх)',
                                hidden: false,
                                required: false,
                                position: 4,
                                fullScreen: false,
                                type: 'text'
                            },
                            {
                                code:'latitude',
                                placeholder:'Широта (50.ххх)',
                                hidden: false,
                                required: false,
                                position: 3,
                                fullScreen: false,
                                type: 'text'
                            },
                            {
                                code:'m_district',
                                placeholder:'Район',
                                hidden: false,
                                required: false,
                                position: 5,
                                fullScreen: false,
                                queryListCode: 'dir_DistrictsSelectRows',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select'
                            },
                            {
                                code:'m_Place_type_ID',
                                placeholder:'Тип місця',
                                hidden: true,
                                required: true,
                                position: 15,
                                fullScreen: false,
                                value: 6,
                                type: 'number'
                            }
                        ]
                    }
                ]
            };
            const addWellCallBack = (param_well) => {
                if (param_well === false) {
                    console.log('It`s a cancel');
                }else{
                    console.log('It`s a good');
                    const body = {
                        queryCode: 'avr_Insert_new_PlaceWell_of_Modal',
                        parameterValues: param_well
                    }
                    this.queryExecutor.getValues(body).subscribe(data => {
                        this.form.setControlValue('places_id', {key: data.rows[0].values[0], value: data.rows[0].values[1]});
                        this.form.setControlValue('place_type_id', {key: data.rows[0].values[2], value: data.rows[0].values[3]});
                    })
                }
            };
            //***************  вопрос по выбору типа места
            const quPlaceToCreate = {
                title: 'Оберіть тип нового місця',
                acceptBtnText: 'create',
                cancelBtnText: 'cancel',
                fieldGroups:[
                    {
                        code: 'PlaceToCreate',
                        expand: true,
                        position: 1,
                        fields: [
                            {
                                code:'m_typePlace_id',
                                hidden: false,
                                required: false,
                                position: 1,
                                fullScreen: true,
                                radioItems: [
                                    { value: 2, viewValue: 'ПЕРЕХРЕСТЯ' },
                                    { value: 3, viewValue: 'ДІЛЯНКА' },
                                    { value: 1, viewValue: 'ІНШІ МІСЦЯ' },
                                    { value: 4, viewValue: 'КОЛОДЯЗЬ' }
                                ],
                                type: 'radio'
                            }
                        ]
                    }
                ]
            };
            const addCreatePlace = (param_type) =>{
                if(param_type[0].value == 1) {
                    console.log('Type place: ' + param_type[0].value)
                    this.openModalForm(formNewPlace, addPlaceCallBack);
                } else if(param_type[0].value == 2) {
                    console.log('Type place: ' + param_type[0].value)
                    this.openModalForm(formNewCross, addCrossCallBack);
                } else if(param_type[0].value == 3) {
                    console.log('Type place: ' + param_type[0].value)
                    this.openModalForm(formNewArea, addAreaCallBack);
                }else if(param_type[0].value == 4) {
                    console.log('Type place: ' + param_type[0].value)
                    this.openModalForm(formNewWell, addWellCallBack);
                }else{
                    console.log('Неіснуючий тип')
                }
            }
            let iconPl = document.getElementById('places_idIcon');
            iconPl.style.fontSize = '35px';
            // END modal for new Place
            this.form.onControlValueChanged('Types_id',this.onClass);
            this.onClass(this.form.getControlValue('Types_id'));
            const claim_ID = this.form.getControlValue('claims_id');
            const result = {
                queryCode: 'list_validate_Action_Zasyv',
                parameterValues: [{
                    key: '@claim_ID',
                    value: claim_ID
                }]
            };
            this.queryExecutor.getValue(result).subscribe(data => {
                this.form.setControlValue('is_Zasuv', data)
            });
            const delve = {
                queryCode: 'list_validate_Action_delve',
                parameterValues: [{
                    key: '@claim_ID',
                    value: claim_ID
                }]
            };
            this.queryExecutor.getValue(delve).subscribe(data => {
                this.form.setControlValue('is_Delve', data)
            });
            /*логика отключений домов*/
            const resultOff = {
                queryCode: 'list_valid_switchOff',
                parameterValues: [{key: '@claim_ID', value: claim_ID}]
            };
            this.queryExecutor.getValue(resultOff).subscribe(data => {
                this.form.setControlValue('is_closeZasuv', data);
            });
            this.form.onControlValueChanged('x_pib_inspector', this.onUR_EM_phone_number);
            this.form.onControlValueChanged('EM_contact_fio', this.onUR_EM_Org_phone);
            this.form.onControlValueChanged('executor_id', this.executor_phone_number);
            this.details.setVisibility('Detail_search', false);
            //дія кнопки пошуку
            btn_Search.addEventListener('click', function(event) {
                this.details.setVisibility('Detail_search', true);
                const param = [{}];
                let phone_search = this.form.getControlValue('FIZ_number');
                const param_search = [
                    {key: '@number', value: phone_search}
                ];
                this.details.loadData('Detail_search', param_search);
            }.bind(this));
            this.details.onCellClick('Detail_search', this.on_Detail_Search_Informations.bind(this));
            let btn_addSwitchOff = document.getElementById('btn_addSwitchOff');
            btn_addSwitchOff.addEventListener('click',this.addSwitchOff.bind(this));
            document.querySelector('#Group_Claim_SwitchOff .add-btn').style.display = 'none';
            this.details.onCellClick('Detail_OutsideMen_Claims', this.gotoOutsideMenSection.bind(this));
            const user_notif = {
                queryCode: 'notif_for_claims',
                parameterValues: []
            };
            this.queryExecutor.getValues(user_notif).subscribe(data => {
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                        if(data.rows[i].values[0] !== undefined) {
                            this.userss.push(data.rows[i].values[0]);
                        }
                    }
                }
            });
            //*********************end init()********************************
        },
        gotoOutsideMenSection:function(column, row, value, event, indexOfColumnId) {
            this.navigateTo('/sections/OutsideMen/edit/' + row.values[0] + '/Claims/' + row.values[7]);
        },
        //Выбор телефона исполнмтеля
        executor_phone_number:function(executor_id) {
            if(typeof (executor_id) === 'number') {
                let exec = [{parameterCode: '@executor_id' , parameterValue: executor_id }];
                this.form.setControlParameterValues('exec_phone', exec);
                const phone = {
                    queryCode: 'getExecutorPhone',
                    parameterValues:[{
                        key: '@executor_id',
                        value: executor_id
                    }]
                };
                this.queryExecutor.getValues(phone).subscribe(data=>{
                    let id_phone = {key: data.rows[0].values[0] , value: data.rows[0].values[1] };
                    this.form.setControlValue('exec_phone', id_phone);
                });
            }
        },
        answerClose: function(answer) {
            if(answer) {
                let getdate = new Date();
                this.form.setControlValue('Fact_finish_at', getdate);
                document.querySelector('.btn-save').click();
            } else {
                this.form.setControlValue('Fact_finish_at', null);
            }
        },
        // Модалка добавления контакта юридической организации
        addNewJuridicalContact: function(data) {
            let org = this.form.getControlValue('UR_organization_id');
            const сreateURContact_callback = (response) => {
                if (response) {
                    const queryAddURContact = {
                        queryCode: 'Add_JuridicalContact',
                        parameterValues: [
                            {
                                key: '@UR_Surname',
                                value: response[0].value
                            },
                            {
                                key: '@UR_FirstName',
                                value: response[1].value
                            },
                            {
                                key: '@UR_MiddleName',
                                value: response[2].value
                            },
                            {
                                key: '@NewPhone',
                                value: response[3].value
                            },
                            {
                                key: '@OrgID',
                                value: org
                            }
                        ]
                    };
                    this.queryExecutor.getValues(queryAddURContact).subscribe(data => {
                        if(data) {
                            // this.openPopUpInfoDialog('Контакт створено');
                            this.form.setControlValue('UR_contact_fio',{ key: data.rows[0].values[0], value: data.rows[0].values[1] });
                            this.form.setControlValue('UR_number',{ key: data.rows[0].values[2], value: data.rows[0].values[3] });
                        }
                    });
                }
            };
            const newURCont = {
                title: 'Дані нового контакта організації',
                acceptBtnText: 'save',
                cancelBtnText: 'cancel',
                fieldGroups:[
                    {
                        code: 'NewJuridicalContact',
                        expand: true,
                        position: 1,
                        fields: [
                            {
                                code:'Surname',
                                placeholder: 'Прізвище',
                                hidden: false,
                                required: true,
                                position: 1,
                                fullScreen: false,
                                type: 'text'
                            },
                            {
                                code:'FirstName',
                                placeholder: 'Ім`я',
                                required: false,
                                position: 2,
                                fullScreen: false,
                                type: 'text'
                            },
                            {
                                code:'MiddleName',
                                placeholder: 'По-батькові',
                                required: false,
                                position: 3,
                                fullScreen: false,
                                type: 'text'
                            },
                            {
                                code:'NewPhone',
                                placeholder: 'Номер телефону',
                                required: true,
                                position: 4,
                                fullScreen: false,
                                type: 'text',
                                icon: 'phone'
                            }
                        ]
                    }
                ]
            };
            this.form.setControlValue('UR_contact_fio', null);
            // показать
            this.openModalForm(newURCont, сreateURContact_callback.bind(this));
        },
        // Модалка добавления отключения
        addSwitchOff: function(data) {
            const queryPlaceOff = {
                title: 'Параметри відключення',
                acceptBtnText: 'save',
                cancelBtnText: 'cancel',
                fieldGroups:[
                    {
                        code: 'Places_SwitchOff',
                        expand: true,
                        position: 1,
                        fields: [
                            {
                                code:'switchOff_type',
                                placeholder: 'Оберить тип відключення',
                                hidden: false,
                                required: true,
                                position: 1,
                                fullScreen: true,
                                radioItems: [{ value: 1, viewValue: 'Аварійне' },{ value: 5, viewValue: 'Планове' }],
                                type: 'radio'
                            },{
                                code:'switchOff_data',
                                placeholder: 'Оберіть по якій засувці буде відключення',
                                hidden: false,
                                required: true,
                                position: 2,
                                fullScreen: true,
                                queryListCode: 'datetime_select_from_Off',
                                filterList: [{parameterCode: '@claim_id', parameterValue: this.id } ],
                                listDisplayColumn: 'Start_from',
                                listKeyColumn: 'Id',
                                type: 'select'
                            }
                        ]
                    }
                ]
            };
            // вызов модалки
            this.openModalForm(queryPlaceOff, this.formPlaceOff.bind(this));
        },
        formPlaceOff:function(off_id) {
            if(off_id) {
                let obdj = {
                    switchOff_type: off_id[0].value,
                    faucet_id: off_id[1].value
                }
                // имитируем на нажатие кнопки плюс скрытой формы
                this.details.create('Group_Claim_SwitchOff', obdj);
            }
        },
        quesionClose:function(time) {
            console.log(time)
        },
        onUpdateContact:function(fiz_id) {
            if(fiz_id) {
                btn_Update_concat.disabled = false;
            }else{
                btn_Update_concat.disabled = true;
            }
        },
        on_Detail_Search_Informations:function(column, row, value, event, indexOfColumnId) {
            this.form.setControlValue('FIZ_concact_id',row.values[0]);
            this.form.setControlValue('FIZ_contact_fio',row.values[1]);
            this.form.setControlValue('FIZ_number',row.values[2]);
            this.details.setVisibility('Detail_search', false);
        },
        onContact_type:function(type_contacts) {
            this.form.setControlVisibility('btn_AddJuridicalContact', false);
            this.form.setControlValue('type_employee_2', null);
            this.form.setControlValue('UR_organization_id', {key: null, value: null});
            this.form.setControlValue('EM_org_id', {key: null, value: null});
            this.form.setControlValue('UR_contact_fio', null);
            this.form.setControlValue('FIZ_contact_fio', null);
            this.form.setControlValue('EM_contact_fio', {key: null, value: null});
            this.form.setControlValue('UR_number', null);
            this.form.setControlValue('FIZ_number', null);
            this.form.setControlValue('EM_number', {});
            this.form.setControlValue('x_pib_inspector', null);
            this.form.setControlValue('x_phone_inspector', null);
            this.form.setControlValue('Sked', null);
            this.form.setControlValue('TU', null);
            this.form.setControlValue('TU_Id', {});
            this.form.setControlValue('Letter', null);
            this.form.setControlValue('L_Contacts_Id', {});
            this.form.setControlValue('Gravamen', null);
            this.form.setControlValue('G_Left', {});
            this.form.setControlValue('G_PIB', null);
            this.form.setControlVisibility('FIZ_contact_fio',false);
            this.form.setControlVisibility('FIZ_number',false);
            this.form.setControlVisibility('UR_number',false);
            this.form.setControlVisibility('UR_organization_id',false);
            this.form.setControlVisibility('UR_organization',false);
            this.form.setControlVisibility('UR_contact_fio',false);
            this.form.setControlVisibility('Sked',false);
            this.form.setControlVisibility('TU',false);
            this.form.setControlVisibility('TU_Id',false);
            this.form.setControlVisibility('Letter',false);
            this.form.setControlVisibility('L_Contacts_Id',false);
            this.form.setControlVisibility('Gravamen',false);
            this.form.setControlVisibility('G_Left',false);
            this.form.setControlVisibility('G_PIB',false);
            this.form.setControlVisibility('type_employee_2',false);
            this.form.setControlVisibility('EM_org_id',false);
            this.form.setControlVisibility('EM_contact_fio',false);
            this.form.setControlVisibility('EM_number',false);
            this.form.setControlVisibility('x_pib_inspector',false);
            this.form.setControlVisibility('x_phone_inspector',false);
            btn_Save_new_concat.style.display = 'none';
            btn_Update_concat.style.display = 'none';
            btn_Search.style.display = 'none';
            btn_Cleare.style.display = 'none';
            if(type_contacts == 1) {
                this.form.setControlVisibility('FIZ_contact_fio',true);
                this.form.setControlVisibility('FIZ_number',true);
                btn_Save_new_concat.style.display = 'block';
                btn_Update_concat.style.display = 'block';
                btn_Search.style.display = 'block';
                btn_Cleare.style.display = 'block';
            }
            if(type_contacts == 2) {
                let btn_AddJuridicalContact = document.getElementById('btn_AddJuridicalContact');
                btn_AddJuridicalContact.disabled = true;
                this.form.setControlVisibility('btn_AddJuridicalContact', true);
                this.form.setControlVisibility('UR_number',true);
                this.form.setControlVisibility('UR_organization_id',true);
                this.form.setControlVisibility('UR_organization',true);
                this.form.setControlVisibility('UR_contact_fio',true);
            }
            if(type_contacts == 3) {
                this.form.setControlVisibility('type_employee_2',true);
                // this.form.enableControl("EM_org_id");
                this.form.enableControl('EM_contact_fio');
                this.form.enableControl('EM_number');
                this.form.enableControl('type_employee_2');
                let is_radio = this.form.getControlValue('type_employee_2');
                this.form.onControlValueChanged('type_employee_2', this.onType_employee_2);
            }
        },
        checkJuridicalOrgAvailable: function() {
            let juridicalOrg = this.form.getControlValue('UR_organization_id');
            if(juridicalOrg != null && typeof (juridicalOrg) === 'number') {
                btn_AddJuridicalContact.disabled = false;
            } else {
                btn_AddJuridicalContact.disabled = true;
            }
        },
        onType_employee_2:function(onType_employee_2) {
            this.form.setControlValue('EM_org_id',{});
            this.form.setControlValue('EM_contact_fio',{});
            this.form.setControlValue('EM_number', {key: null, value: null});
            this.form.setControlValue('Sked', null);
            this.form.setControlValue('TU', null);
            this.form.setControlValue('TU_Id', null);
            this.form.setControlValue('Letter', null);
            this.form.setControlValue('L_Contacts_Id', null);
            this.form.setControlValue('Gravamen', null);
            this.form.setControlValue('G_Left', {});
            this.form.setControlValue('G_PIB', null);
            this.form.setControlVisibility('FIZ_contact_fio',false);
            this.form.setControlVisibility('FIZ_number',false);
            this.form.setControlVisibility('UR_number',false);
            this.form.setControlVisibility('UR_organization_id',false);
            this.form.setControlVisibility('UR_organization',false);
            this.form.setControlVisibility('UR_contact_fio',false);
            this.form.setControlVisibility('EM_org_id',false);
            this.form.setControlVisibility('EM_contact_fio',false);
            this.form.setControlVisibility('EM_number',false);
            this.form.setControlVisibility('x_pib_inspector',false);
            this.form.setControlVisibility('x_phone_inspector',false);
            this.form.setControlTitle('EM_contact_fio', 'ПІБ');
            this.form.setControlVisibility('Sked',false);
            this.form.setControlVisibility('TU',false);
            this.form.setControlVisibility('TU_Id',false);
            this.form.setControlVisibility('Letter',false);
            this.form.setControlVisibility('L_Contacts_Id',false);
            this.form.setControlVisibility('Gravamen',false);
            this.form.setControlVisibility('G_Left',false);
            this.form.setControlVisibility('G_PIB',false);
            this.form.setControlRequirement('EM_contact_fio', false);
            if(onType_employee_2 == 1) {
                this.form.setControlVisibility('EM_org_id',false);
                this.form.setControlVisibility('EM_contact_fio',true);
                this.form.setControlVisibility('EM_number',true);
                this.form.setControlVisibility('x_pib_inspector',false);
                this.form.setControlVisibility('x_phone_inspector',false);
                this.form.setControlRequirement('EM_contact_fio', false);
            }else if(onType_employee_2 == 5 || onType_employee_2 == 6) {
                this.form.setControlVisibility('EM_org_id',true);
                this.form.setControlVisibility('EM_contact_fio',true);
                this.form.setControlVisibility('EM_number',true);
                this.form.setControlVisibility('x_pib_inspector',false);
                this.form.setControlVisibility('x_phone_inspector',false);
                this.form.setControlVisibility('Sked',true);
                this.form.setControlVisibility('TU',true);
                this.form.setControlVisibility('TU_Id',true);
                this.form.setControlVisibility('Letter',true);
                this.form.setControlVisibility('L_Contacts_Id',true);
                this.form.setControlVisibility('Gravamen',true);
                this.form.setControlVisibility('G_Left',true);
                this.form.setControlVisibility('G_PIB',true);
                this.form.setControlRequirement('EM_contact_fio', false);
            }else{
                this.form.setControlRequirement('EM_contact_fio', false);
                this.form.setControlVisibility('EM_org_id',true);
                this.form.setControlVisibility('EM_contact_fio',true);
                this.form.setControlVisibility('EM_number',true);
                this.form.setControlVisibility('x_pib_inspector',true);
                this.form.setControlVisibility('x_phone_inspector',true);
                this.form.setControlTitle('EM_contact_fio', 'ПІБ керівника');
                if(onType_employee_2 == 15 || onType_employee_2 == 8) {
                    this.form.setControlRequirement('EM_contact_fio', true);
                }
            }
            let id_using = [{parameterCode: '@org_id' , parameterValue: onType_employee_2 }];
            this.form.setControlParameterValues('EM_org_id', id_using);
            let org = [{parameterCode: '@org_id' , parameterValue: onType_employee_2 }];
            // this.form.setControlParameterValues('EM_contact_fio', org);
            this.form.setControlParameterValues('x_pib_inspector', org);
        },
        onUR_EM_phone_number:function(cont_id) {
            if(typeof (cont_id) === 'number') {
                let cont = [{parameterCode: '@cont_fiz_id' , parameterValue: cont_id }];
                this.form.setControlParameterValues('EM_number', cont);
                this.form.setControlParameterValues('x_phone_inspector', cont);
            }
        },
        onUR_EM_Org_phone:function(cont_id) {
            if(typeof (cont_id) === 'number') {
                let cont = [{parameterCode: '@cont_fiz_id' , parameterValue: cont_id }];
                this.form.setControlParameterValues('EM_number', cont);
                const org_name = {
                    queryCode: 'avr_check_EM_contact_fio',
                    parameterValues:[{
                        key: '@job',
                        value: cont_id
                    }]
                };
                this.queryExecutor.getValues(org_name).subscribe(data=>{
                    let id_org = {key: data.rows[0].values[0] , value: data.rows[0].values[1] };
                    this.form.setControlValue('EM_org_id', id_org);
                });
            }
        },
        onClass: function(type_id) {
            const answer_claim_type = {
                queryCode: 'exec_proc_Claim_types',
                parameterValues:[{
                    key: '@type_id',
                    value: type_id
                }]
            };
            this.queryExecutor.getValues(answer_claim_type).subscribe(data=>{
                this.form.setControlValue('answer_claim_type', data.rows[0].values[0]);
                this.form.setControlValue('classes_id', data.rows[0].values[1]);
                this.form.setControlValue('disregard_type', data.rows[0].values[2]);
            });
        },
        onFlats: function(place_id) {
            if(place_id == null) {
                this.form.setControlValue('place_type_id', {key: null, value: null});
                this.form.setControlValue('district_id', {key: null, value: null});
                this.form.setControlValue('flat_number', null);
            }else{
                this.form.enableControl('flat_number');
                let type = [{parameterCode: '@type_place', parameterValue: place_id}];
                this.form.setControlParameterValues('place_type_id', type);
                const type_place = {
                    queryCode: 'avr_Type_District_wiht_place',
                    parameterValues: [
                        {
                            key: '@place_id',
                            value: place_id
                        }
                    ]
                };
                this.queryExecutor.getValues(type_place).subscribe(data => {
                    this.form.setControlValue('place_type_id', {key: data.rows[0].values[0], value: data.rows[0].values[1]});
                    this.form.setControlValue('district_id', {key: data.rows[0].values[2], value: data.rows[0].values[3]});
                });
            }
        },
        onClaimsStatus_2: function(org) {
            let status = this.form.getControlValue('Status_id');
            if(org == 28 && status == null) {
                this.form.setControlValue('Status_id', {key: 1, value: 'Нова'})
            }
            if (status == 1 && org != 28 && org != null) {
                this.form.setControlValue('Status_id', {key: 2, value: 'Розподілена'});
            }
        },
        validate: function() {
            const finishValue = this.form.getControlValue('Fact_finish_at');
            const st = this.form.getControlValue('Status_id');
            let err_type = this.form.getControlValue('answer_claim_type');
            let err_zasuv = this.form.getControlValue('is_Zasuv');
            let err_delve = this.form.getControlValue('is_Delve');
            let disregard_type = this.form.getControlValue('disregard_type');
            let contact_type = this.form.getControlValue('contact_type');
            if(st === 5) {
                return 'У ЗАКРИТУ ЗАЯВКУ вносити правки заборонено';
            } else if(finishValue !== null) {
                if (err_zasuv === 0 && disregard_type === 1) {
                    this.form.setControlValue('Fact_finish_at', null);
                    return 'Не збігається кількість робіт с запорною арматурою!'
                } else if(err_delve === 1) {
                    this.form.setControlValue('Fact_finish_at', null);
                    return 'В заявці присутня робота РОЗРИТТЯ, але немає роботи ЗАСИПКА!'
                } else if(err_type === 0) {
                    this.form.setControlValue('Fact_finish_at', null);
                    return 'Тип заявки не є останнім!'
                }
                let five_min = 300000;
                let finishDate = finishValue.getTime();
                let currentDate = new Date().getTime() - five_min;
                if (finishDate < currentDate) {
                    return 'Дата закриття некоректна!';
                }
            }
            if(contact_type === '2') {
                let ur_org = this.form.getControlValue('UR_organization_id');
                if(ur_org === null || ur_org === undefined) {
                    return 'Потрібно обрати юридичну організацію!';
                }
            }
            return true
        },
        afterSave: function(data) {
            const myForm = {
                title: 'Створена нова заявка',
                singleButton: true,
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
                                value: '№ ' + this.getRowValueByCode(data, 'Id'),
                                type: 'text'
                            },
                            {
                                code:'2',
                                placeholder:' ',
                                hidden:false,
                                required: false,
                                position: 2,
                                fullScreen: true,
                                value: 'Первинний тип заявки: ' + this.getRowValueByCode(data, 'First_Types_name'),
                                type: 'text'
                            }
                        ]
                    }
                ]
            };
            let urlText = 'sections/Claims/edit/' + data.rows[0].values[0]
            let textMess = 'Зареєстрована заявка № ' + data.rows[0].values[0] + ' з типом ' + data.rows[0].values[15];
            let priorityCode;
            let notifType;
            if (data.rows[0].values[67] == 1) {
                priorityCode = 'Low';
                notifType = 'TaskLow';
            }else if (data.rows[0].values[67] == 3) {
                priorityCode = 'Middle';
                notifType = 'TaskMiddle';
            }else if (data.rows[0].values[67] == 5) {
                priorityCode = 'High';
                notifType = 'TaskHigh';
            }
            const userId = this.user.userId;
            const notification = {
                url: urlText,
                notificationTypeCode: notifType,
                text: textMess,
                notificationPriorityCode: priorityCode,
                recipientIds: this.userss,
                hasAudio: true
            };
            let created_at = this.form.getControlValue('Created_at');
            if (created_at == null) {
                this.createUsersNotification(notification);
                this.openModalForm(myForm, this.formCallback.bind(this));
            }
            if (data.rows[0].values[3] == 5) {
                this.navigateTo(location.pathname.replace(localStorage.getItem('VirtualPath'), '').replace('edit', 'view'));
            }
            this.chooseDetail_Claim_Faucet();
        },
        formCallback: function(response) {
            this.navigateTo(location.pathname.replace(localStorage.getItem('VirtualPath'), ''));
        }
    }
    ;
}());
