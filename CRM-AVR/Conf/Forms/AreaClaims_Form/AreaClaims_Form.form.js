(function() {
    return {
        init: function() {
            let btn_SetWalker = document.getElementById('btn_SetWalker');
            let btn_CloseAreaClaim = document.getElementById('btn_CloseAreaClaim');
            this.form.disableControl('Created_at');
            this.form.disableControl('User');
            this.form.disableControl('date_close');
            this.form.disableControl('user_close');
            this.form.disableControl('Status_id');
            this.form.disableControl('Claim_class_ID');
            this.form.disableControl('Claim_type_ID');
            //  this.form.disableControl('ResponseID');
            this.form.disableControl('WalkerName');
            if(this.form.getControlValue('ResponseID') === null) {
                this.form.setControlVisibility('ResponseID', false);
            }
            if(this.form.getControlValue('Status_id') !== 5) {
                this.form.setControlVisibility('date_close', false);
                this.form.setControlVisibility('user_close', false);
            }
            if(this.form.getControlValue('Status_id') !== 3) {
                btn_CloseAreaClaim.disabled = true;
            }
            if(this.form.getControlValue('Status_id') == 5) {
                btn_SetWalker.disabled = true;
                document.getElementById('Status_id').style.color = 'red';
                let btn_add = document.querySelectorAll('.add-btn');
                for(let i = 0; i < btn_add.length; i++) {
                    btn_add[i].style.display = 'none'
                }
                if(location.pathname.indexOf('edit') != -1) {
                    this.navigateTo(location.pathname.replace(localStorage.getItem('VirtualPath'), '').replace('edit', 'view'));
                }
            }
            if(this.state === 'create') {
                btn_SetWalker.disabled = true;
                btn_CloseAreaClaim.disabled = true;
                this.getUserMainOrg();
                this.setAreaClaimOrg();
            } else {
                this.form.setGroupTitle('AreaClaimInfo', 'ЗАЯВКА №  ' + this.form.getControlValue('Claim_Number'));
                this.form.disableControl('RouteID');
            }
            btn_SetWalker.addEventListener('click', function(event) {
                const formChangedArea = {
                    title: 'Призначити обхідника',
                    acceptBtnText:'ok',
                    cancelBtnText: 'cancel',
                    fieldGroups: [{
                        code: 'chooseWalker',
                        name: 'Обрати:',
                        expand: true,
                        position: 1,
                        fields: [
                            {
                                code:'walker',
                                placeholder: 'Обхідник',
                                hidden: false,
                                required: true,
                                position: 1,
                                fullScreen: true,
                                queryListCode: 'SelectWalker_ByCreatorOrg',
                                filterList: [],
                                listDisplayColumn: 'pib',
                                listKeyColumn: 'Id',
                                type: 'lookup',
                                lookupType: 'list'
                            }
                        ]
                    }]
                }
                this.openModalForm(formChangedArea, this.chooseWalker.bind(this), this.modalAreaClaim.bind(this));
            }.bind(this));
            btn_CloseAreaClaim.addEventListener('click', function(event) {
                const formChangedArea = {
                    title: 'Результат обхідної заявки',
                    acceptBtnText:'ok',
                    cancelBtnText: 'cancel',
                    fieldGroups: [{
                        code: 'chooseResponse',
                        name: 'Обрати:',
                        expand: true,
                        position: 1,
                        fields: [
                            {
                                code:'result',
                                placeholder: 'Результат',
                                hidden: false,
                                required: true,
                                position: 1,
                                fullScreen: true,
                                queryListCode: 'List_RepsonseByAccess',
                                //   filterList: [{parameterCode: '@route_id', parameterValue: this.id } ],
                                listDisplayColumn: 'Description',
                                listKeyColumn: 'Id',
                                type: 'select'
                            }
                        ]
                    }]
                }
                this.openModalForm(formChangedArea, this.makeCloseRepsonse.bind(this), this.modalAreaClaim.bind(this));
            }.bind(this));
            this.checkLinkClaims();
        }, // END INIT
        afterSave: function() {
            window.location.reload();
        },
        checkLinkClaims: function() {
            const claim = {
                queryCode: 'CheckChildClaims',
                parameterValues:[
                    {
                        key: '@Id',
                        value: this.id
                    }
                ]
            };
            this.queryExecutor.getValue(claim).subscribe(data =>{
                if(data) {
                    this.form.setControlValue('havingLink', Boolean(data));
                }
            });
        },
        config_ModalForm: [],
        modalAreaClaim: function(data) {
            this.config_ModalForm = data;
        },
        chooseWalker: function(response) {
            if(response) {
                let walkerJobId = this.config_ModalForm.getControlValue('walker');
                const walker = {
                    queryCode: 'SetAreaClaimWalker',
                    parameterValues:[
                        {
                            key: '@ClaimID',
                            value: this.id
                        },
                        {
                            key: '@WalkerJobID',
                            value: walkerJobId
                        }
                    ]
                };
                this.queryExecutor.getValue(walker).subscribe(data =>{
                    console.log('WALKER');
                    if(data === 'SUCCESS') {
                        window.location.reload();
                    } else if(data === 'ERROR') {
                        this.openPopUpInfoDialog('ПОМИЛКА! Обхідника не призначено');
                    }
                });
            }
        },
        makeCloseRepsonse: function(response) {
            if (response) {
                const claimResponse = this.form.getControlValue('ResponseID');
                let responseId = this.config_ModalForm.getControlValue('result');
                let havingLink = this.form.getControlValue('havingLink');
                if(responseId === Number(1) || responseId === Number(20)) {
                    this.openPopUpConfirmDialog('Після закритя в заявці неможливо буде внести зміни! Ви впевнені що бажаєте закрити заявку?', this.closeAnswer);
                } else if (responseId !== Number(1) && responseId !== Number(20)) {
                    if(claimResponse === null) {
                        // console.log('2: response=undefined');
                        this.closeAnswer(true);
                    }
                    if (claimResponse !== null) {
                        if(havingLink === true) {
                            // console.log('3: havingLink = true');
                            this.openPopUpConfirmDialog('Після закритя в заявці неможливо буде внести зміни! Ви впевнені що бажаєте закрити заявку?', this.closeAnswer);
                        } else if (havingLink === false) {
                            // console.log('3: havingLink = false');
                            this.openPopUpConfirmDialog('Додайте заявку для усуненя недоліків, через деталь "Пов`язані заявки"');
                            this.closeAnswer(false);
                        }
                    }
                }
            }
        },
        closeAnswer: function(answer) {
            if(answer) {
                let claim = this.id;
                let responseId = this.config_ModalForm.getControlValue('result');
                const closeQuery = {
    	      	    queryCode: 'CloseAreaClaim',
                    parameterValues:[
                        {
                            key: '@ClaimID',
                            value: claim
                        },
                        {
                            key: '@ResponseID',
                            value: responseId
                        },
                        {
                            key: '@UserID',
                            value: this.user.userId
                        }
                    ]
    	            	 };
    	            	 this.queryExecutor.getValue(closeQuery).subscribe(data=>{
    	            	     if(data) {
    	            	             if(data === 'OK') {
    	            	                 window.location.reload();
    	            	             } else if(data === 'NOT_OK') {
                            document.querySelector('#Detail_AreaClaim_Likns .add-btn').click();
    	            	                }
    	            	             }
    	            	     });
            }
        },
        setAreaClaimOrg: function() {
            this.form.setControlValue('Response_organization_ID', {})
            const userOrg = {
                queryCode: 'avr_onOrganization_toUser',
                parameterValues:[]
            };
            this.queryExecutor.getValues(userOrg).subscribe(data =>{
                if (data.rows[0] !== undefined) {
                    this.form.setControlValue('Response_organization_ID', {key: data.rows[0].values[0], value: data.rows[0].values[1]})
                } else {
                    this.form.setControlValue('Response_organization_ID', {key: 28, value: 'невизначено'})
                }
            });
        },
        getUserMainOrg: function() {
            const userParam = {
    		    queryCode: 'find_UserWCMainOrg',
                parameterValues:[{
                    key: '@user',
                    value: this.user.userId
                }]
    		 };
    		 this.queryExecutor.getValue(userParam).subscribe(data=>{
              	switch(data) {
                case 'Водопостачання':
                    this.form.setControlValue('Claim_class_ID',{key: 21, value: '(В) ОБСТЕЖЕННЯ'});
                    this.form.setControlValue('Claim_type_ID',{key: 7100, value: 'ОБСТЕЖЕННЯ/зовнішній огляд /обхід трас/водопровідної мережі'});
                    break;
                case 'Водовідведення':
                    this.form.setControlValue('Claim_class_ID',{key: 15, value: '(К) ОБСТЕЖЕННЯ'});
                    this.form.setControlValue('Claim_type_ID',{key: 2178, value: 'ОБСТЕЖЕННЯ/Зовнішній огляд/Обхід траси/Каналізаційної мережі'});
                    break;
                default:
                    this.form.setControlValue('Claim_class_ID',{key: 21, value: '(В) ОБСТЕЖЕННЯ'});
                    this.form.setControlValue('Claim_type_ID',{key: 7001, value: 'ОБСТЕЖЕННЯ/зовнішній огляд /обхід трас'});
                }
    		 });
        }
    };
}());
