(function() {
    return {
        init: function() {
            this.form.setControlVisibility('Login2',false);
            if(this.state != 'create') {
                this.form.setControlVisibility('Login', false);
                this.form.setControlVisibility('Login2', true);
                this.form.disableControl('Login2');
            }
            console.log(this.state);
            let login = this.form.getControlValue('Login');
            let btn_Add_authority = document.getElementById('btn_Add_authority');
            if (login == null) {
                btn_Add_authority.disabled = true;
            }
            this.form.disableControl('contact_id');
            this.form.disableControl('Job_name');
            this.form.onControlValueChanged('organizations_id', this.onJobs);
            this.form.onControlValueChanged('Login', this.enabButton);
            this.form.onControlValueChanged('contact_id', this.enabLogin);
            if (login != null) {
                this.form.disableControl('Login');
            // this.form.onControlValueChanged('Login', this.onConsoleLogin);
            }
            btn_Add_authority.addEventListener('click', function(event) {
                this.form.getControlValue('Login')
                const addAuthor = {
                    acceptBtnText: 'add',
                    cancelBtnText: 'cancel',
                    fieldGroups: [
                        {
                            code: 'TestGroup',
                            expand: true,
                            position: 1,
                            fields: [
                                {
                                    code: 'Type_name',
                                    fullScreen: true,
                                    hidden: false,
                                    placeholder: 'Наданні повноваження',
                                    position: 1,
                                    required: true,
                                    type: 'lookup',
                                    lookupType: 'tree',
                                    queryListCode: 'lookup_tree_Org_System_struct',
                                    listKeyColumn: 'Id',
                                    listDisplayColumn: 'Name',
                                    listParentIdColumn: 'ParentId'
                                }
                            ]
                        }
                    ]
                };
                const callBack_add = (res) => {
                    if (res != null) {
                        const queryBody = {
                            queryCode:'sys_Insert_UserInOrganisation',
                            parameterValues:[
                                {key: '@SystemUser_Id', value: this.form.getControlValue('SystemUser_Id') },
                                {key: res[0].key, value: res[0].value},
                                {key: '@Job_name', value: this.form.getControlValue('Job_name')}
                            ]
                        };
                        this.queryExecutor.getValues(queryBody).subscribe(data =>{
                            const param = [{ key: '@user', value: this.form.getControlValue('SystemUser_Id') }];
                            this.details.loadData('Detail_Granting_authority', param)
                        })
                    }
                };
                this.openModalForm(addAuthor, callBack_add);
            }.bind(this))
        },
        onJobs: function(org_id) {
            this.form.setControlValue('contact_id', {});
            this.form.setControlValue('Login', {});
            this.form.setControlValue('Job_name', null);
            this.form.setControlValue('SystemUser_Id', null);
            console.log(org_id);
            this.form.enableControl('contact_id');
            let org = [{ parameterCode: '@org_id', parameterValue: org_id }];
            this.form.setControlParameterValues('contact_id', org);
        },
        enabLogin:function(pib) {
            this.form.enableControl('Login');
        },
        enabButton: function(r) {
            if (this.state == 'create') {
                return
            }
            if(r == null || r.length < 4) {
                btn_Add_authority.disabled = true;
            }else{
                btn_Add_authority.disabled = false;
            }
            // this.form.setControlValue('SystemUser_Id', r);
        },
        afterSave(data) {
            if (data.rows[0].values[3] != null) {
                btn_Add_authority.disabled = false;
                this.form.setControlValue('SystemUser_Id', data.rows[0].values[7]);
            }
        }
    };
}());
