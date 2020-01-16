(function() {
    return {
        Detail_History: function(column, row) {
            const parameters = [
                { key: '@history_id', value: row.values[0]}
            ];
            this.details.loadData('Question_History', parameters);
            this.details.setVisibility('Question_History', true);
        },
        init:function() {
            this.details.setVisibility('Question_History', false);
            this.details.onCellClick('Detail_Que_Hisroty', this.Detail_History.bind(this));
            const onChangeStatus = {
                queryCode: 'Question_RightsFilter_HideAndDisableColumns',
                parameterValues: []
            };
            this.queryExecutor.getValues(onChangeStatus).subscribe(data => {
                if (data.rows.length > 0) {
                    for (let i = 0; i < data.rows.length; i++) {
                        if(data.rows[i].values[1] == 'disable') {
                            this.form.disableControl(data.rows[i].values[0]);
                        }
                        if(data.rows[i].values[1] == 'hide') {
                            this.form.setControlVisibility(data.rows[i].values[0], false);
                        }
                    }
                }
            });
            this.form.disableControl('registration_number');
            this.form.disableControl('registration_date');
            this.form.disableControl('app_registration_number');
            this.form.disableControl('full_name');
            this.form.disableControl('user_name');
            this.form.disableControl('question_state_id');
            this.form.disableControl('ass_result_id');
            this.form.disableControl('ass_resolution_id');
            this.form.disableControl('address_problem');
            this.form.disableControl('object_id');
            this.form.disableControl('districts_id');
            this.form.disableControl('question_type_id');
            this.form.disableControl('perfom_id');
            let flag_is_state = this.form.getControlValue('flag_is_state');
            if (flag_is_state == 1) {
                this.form.enableControl('object_id');
                this.form.enableControl('question_type_id');
                this.form.enableControl('perfom_id');
            }
            let statettt = document.getElementById('question_state_id');
            statettt.style.fontWeight = 'bold';
            let btn_goToApplicant = document.getElementById('full_nameIcon');
            btn_goToApplicant.style.fontSize = '25px';
            btn_goToApplicant.addEventListener('click', () => {
                let appl_id = this.form.getControlValue('appl_id');
                this.navigateTo('/sections/Applicants/edit/' + appl_id)
            } );
            let btn_goToAppeal = document.getElementById('app_registration_numberIcon');
            btn_goToAppeal.style.fontSize = '25px';
            btn_goToAppeal.addEventListener('click', () =>{
                let ques_id = this.form.getControlValue('appeal_id');
                this.navigateTo('/sections/Appeals/view/' + ques_id)
            });
            let answer = this.form.getControlValue('answer_type_id');
            if (answer == 1) {
                this.form.setControlVisibility('answer_post',false);
                this.form.setControlVisibility('answer_phone',false);
                this.form.setControlVisibility('answer_mail', false);
            }
            if (answer == 2) {
                this.form.setControlVisibility('answer_phone',true);
                this.form.setControlVisibility('answer_post', false);
                this.form.setControlVisibility('answer_mail', false);
            }
            if (answer == 3) {
                this.form.setControlVisibility('answer_mail',true);
                this.form.setControlVisibility('answer_phone',false);
                this.form.setControlVisibility('answer_post', false);
            }
            if (answer == 4 || answer == 5) {
                this.form.setControlVisibility('answer_post',true);
                this.form.setControlVisibility('answer_phone',false);
                this.form.setControlVisibility('answer_mail', false);
            }
            document.getElementById('add_Assignment').addEventListener('click', function() {
                const queryForInsert = {
                    queryCode: 'cx_test_Procedur_Insert',
                    parameterValues: [
                        {
                            key: '@question_id',
                            value: this.form.getControlValue('question_id')
                        },
                        {
                            key: '@question_type_id',
                            value: this.form.getControlValue('question_type_id')
                        },
                        {
                            key: '@object_id',
                            value: this.form.getControlValue('object_id')
                        },
                        {
                            key: '@organization_execut',
                            value: this.form.getControlValue('organization_id')
                        },
                        {
                            key: '@dictrict',
                            value: this.form.getControlValue('districts_id')
                        },
                        {
                            key: '@user_id',
                            value: this.user.userId
                        }
                    ]
                };
                this.queryExecutor.getValues(queryForInsert).subscribe(() => {
                })
            }.bind(this));
            document.getElementById('add_Complain').addEventListener('click', function() {
                const formAddComplain = {
                    title: 'Створити скаргу',
                    acceptBtnText: 'save',
                    cancelBtnText: 'cancel',
                    fieldGroups: [
                        {
                            code: 'compl',
                            expand: true,
                            position: 1,
                            fields:[
                                {
                                    code: 'complain_type_id',
                                    placeholder:'Тип скарги',
                                    hidden: false,
                                    required: true,
                                    position: 1,
                                    fullScreen: true,
                                    queryListCode: 'list_complain_type',
                                    listDisplayColumn: 'name',
                                    listKeyColumn: 'Id',
                                    type: 'select'
                                },
                                {
                                    code:'culpritname',
                                    placeholder:'Скаржник',
                                    hidden: false,
                                    required: true,
                                    position: 2,
                                    fullScreen: true,
                                    value: this.form.getControlValue('user_name'),
                                    type: 'text'
                                },
                                {
                                    code: 'guilty',
                                    placeholder:'Винуватець',
                                    hidden: false,
                                    required: true,
                                    position: 1,
                                    fullScreen: true,
                                    queryListCode: 'list_Question_Executors',
                                    listDisplayColumn: 'name',
                                    listKeyColumn: 'Id',
                                    type: 'select'
                                },
                                {
                                    code:'text',
                                    placeholder:'Коментар',
                                    hidden: false,
                                    required: false,
                                    position: 4,
                                    fullScreen: true,
                                    type: 'textarea'
                                }
                            ]
                        }
                    ]
                };
                const addComplain = (param) => {
                    if(param != false) {
                        const body = {
                            queryCode: 'cx_Complains_Insert',
                            parameterValues: param
                        }
                        this.queryExecutor.getValues(body).subscribe(() => {
                        });
                    }
                };
                this.openModalForm(formAddComplain, addComplain);
            }.bind(this));
            this.form.onControlValueChanged('question_type_id', this.onChanged_Question_TypeId);
            this.form.onControlValueChanged('answer_type_id', this.onChangedQuestion_AnswerType);
        },
        onChangedQuestion_AnswerType:function(value) {
            const allp_info = {
                queryCode: 'Answer_Applicant_info',
                parameterValues: [{key: '@id_con', value: this.form.getControlValue('appl_id')}]
            }
            this.queryExecutor.getValues(allp_info).subscribe(data => {
                this.form.setControlValue('answer_phone',data.rows[0].values[2] );
                this.form.setControlValue('answer_post', data.rows[0].values[3]);
                this.form.setControlValue('answer_mail', data.rows[0].values[1]);
            });
            if(value == 1 || value == null) {
                this.form.setControlValue('answer_phone', null);
                this.form.setControlValue('answer_mail', null);
                this.form.setControlValue('answer_post', null);
                this.form.setControlVisibility('answer_post',false);
                this.form.setControlVisibility('answer_phone',false);
                this.form.setControlVisibility('answer_mail', false);
            }
            if(value == 2) {
                this.form.setControlVisibility('answer_phone',true);
                this.form.setControlVisibility('answer_post', false);
                this.form.setControlVisibility('answer_mail', false);
            }
            if(value == 3) {
                this.form.setControlVisibility('answer_mail',true);
                this.form.setControlVisibility('answer_phone',false);
                this.form.setControlVisibility('answer_post', false);
            }
            if(value == 4 || value == 5) {
                this.form.setControlVisibility('answer_post',true);
                this.form.setControlVisibility('answer_phone',false);
                this.form.setControlVisibility('answer_mail', false);
            }
        },
        onChanged_Question_TypeId: function(value) {
            if (typeof value === 'string') {
                return
            }
            const objAndOrg = {
                queryCode: 'QuestionTypes_HideColumns',
                parameterValues: [{
                    key: '@question_type_id',
                    value: this.form.getControlValue('question_type_id')
                }]
            };
            this.queryExecutor.getValues(objAndOrg).subscribe(data => {
                if (data.rows.length > 0) {
                    if (data.rows[0].values[0]) {
                        this.form.setControlVisibility('organization_id', true);
                    } else {
                        this.form.setControlVisibility('organization_id', false);
                    }
                    if (data.rows[0].values[1]) {
                        this.form.setControlVisibility('object_id', true);
                    } else {
                        this.form.setControlVisibility('object_id', false);
                    }
                } else {
                    this.form.setControlVisibility('object_id', true);
                    this.form.setControlVisibility('organization_id', true);
                }
            });
        }
    };
}());
