(function () {
    return {
        init: function() {
            this.form.disableControl('appeal_id');
            this.form.disableControl('appeal_source_id');
            this.form.disableControl('appeal_type_id');
            this.form.disableControl('appeal_parameter');
            this.form.disableControl('appeal_created_at');
            this.form.disableControl('appeal_created_by');
            this.form.disableControl('claim_executor_name');
            if (this.state == 'create') {
                let getDataFromLink = window
                    .location
                    .search
                    .replace('?', '')
                    .split('&')
                    .reduce(
                        function(p, e) {
                            let a = e.split('=');
                            p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                            return p;
                        }, {}
                    );
                const queryForGetValue = {
                    queryCode: 'Appeals_Insert',
                    parameterValues: [
                        {
                            key: '@appeal_type_id',
                            value: Number(getDataFromLink['type'])
                        },
                        {
                            key: '@parameter',
                            value: decodeURIComponent(getDataFromLink['parameter'])
                        }
                    ]
                };
                this.queryExecutor.getValue(queryForGetValue).subscribe(data => {
                    this.navigateTo('sections/RegistrationAppeal/edit/'+data);
                });
            } else {
                this.onLoadApplicant();
                this.form.setGroupVisibility('Group_Claim', false);
                this.form.onControlValueChanged('Search_Street', this.onStreetChanged_Search);
                this.form.onControlValueChanged('applicant_Street', this.onStreetChanged_Applicant);
                this.form.onControlValueChanged('claim_StreetId', this.onStreetChanged_Claim);
                this.form.onControlValueChanged('applicant_id', this.onChanged_Applicant_Id.bind(this));
                this.form.onControlValueChanged('applicant_PIB', this.onChanged_Applicant_PIB.bind(this));
                this.form.onControlValueChanged('applicant_House', this.onChanged_Applicant_House.bind(this));
                this.form.onControlValueChanged('claim_HouseId', this.onChanged_claim_HouseId.bind(this));
                this.form.onControlValueChanged('claim_type_id', this.onChanged_claim_type_id.bind(this));
                document.getElementById('applicant_Btn_Save').disabled = true;
                document.getElementById('applicant_Btn_AddClaim').disabled = true;
                document.getElementById('claim_Btn_SaveClaim').disabled = true;
                document.getElementById('claim_Btn_SaveConsult').disabled = true;
                document.getElementById('Search_Btn').addEventListener('click', function() {
                    this.onLoadApplicant();
                }.bind(this));
                document.getElementById('applicant_Btn_AddClaim').addEventListener('click', function() {
                    this.GetEmployeeByClaimType();
                    this.form.setGroupVisibility('Group_Claim', true);
                    this.IsChangeApplicantForClaim = true;
                    this.form.setControlValue('claim_StreetId', { key: this.form.getControlValue('applicant_Street'), value: this.form.getControlValue('applicant_StreetName') });
                    this.form.setControlValue('claim_HouseId', { key: this.form.getControlValue('applicant_House'), value: this.form.getControlValue('applicant_HouseName') });
                    this.form.setControlValue('claim_Flat', this.form.getControlValue('applicant_Flat'));
                }.bind(this));
                document.getElementById('applicant_Btn_Save').addEventListener('click', function() {
                    this.onCreateApplicant();
                }.bind(this));
                document.getElementById('claim_Btn_SaveClaim').addEventListener('click', function() {
                    this.onCreateClaim(2, 1);
                }.bind(this));
                document.getElementById('claim_Btn_SaveConsult').addEventListener('click', function() {
                    this.onCreateClaim(4, 4);
                }.bind(this));
                this.details.onCellClick('Detail_RegCard_Applicant', this.Detail_Aplicant.bind(this));
                document.getElementById('applicant_Btn_Clear').addEventListener('click', function() {
                    this.form.setControlValue('applicant_id', null);
                    this.form.setControlValue('applicant_PIB', null);
                    this.form.setControlValue('applicant_Phone1', null);
                    this.form.setControlValue('applicant_Phone2', null);
                    this.form.setControlValue('applicant_Email', null);
                    this.form.setControlValue('applicant_Street', {});
                    this.form.setControlValue('applicant_House', {});
                    this.form.setControlValue('applicant_Flat', null);
                    this.form.setGroupVisibility('Group_Claim', false);
                }.bind(this));
            }
        },
        onChanged_Applicant_Id: function() {
            this.onChanged_Question_Aplicant_Btn_Add_Input();
        },
        onChanged_Applicant_PIB: function() {
            this.onChanged_Question_Aplicant_Btn_Add_Input();
        },
        onChanged_Applicant_House: function(value) {
            this.onHouseRecalc_Applicant(value);
            this.onChanged_Question_Aplicant_Btn_Add_Input();
        },
        onChanged_Question_Aplicant_Btn_Add_Input: function() {
            if(this.form.getControlValue('applicant_PIB') == '' || this.form.getControlValue('applicant_PIB') == null || this.form.getControlValue('applicant_House')  == '' ||   this.form.getControlValue('applicant_House') == null
                 ||  this.form.getControlValue('applicant_House') == undefined
            ) {
                if (this.form.getControlValue('applicant_id') != null || this.form.getControlValue('applicant_id') != '') {
                    document.getElementById('applicant_Btn_AddClaim').disabled = true;
                }
                document.getElementById('applicant_Btn_Save').disabled = true;
            } else {
                if (this.form.getControlValue('applicant_id') == null || this.form.getControlValue('applicant_id') == '') {
                    document.getElementById('applicant_Btn_AddClaim').disabled = true;
                } else {
                    document.getElementById('applicant_Btn_AddClaim').disabled = false;
                }
                document.getElementById('applicant_Btn_Save').disabled = false;
            }
        },
        Detail_Aplicant: function(column, row) {
            this.IsChangeApplicantForDetail = true;
            this.form.setControlValue('applicant_id', row.values[0]);
            this.form.setControlValue('applicant_PIB', row.values[1]);
            this.form.setControlValue('applicant_Phone1', row.values[4]);
            this.form.setControlValue('applicant_Phone2', row.values[5]);
            this.form.setControlValue('applicant_Email', row.values[6]);
            this.form.setControlValue('applicant_Street', { key: row.values[9], value: row.values[10] });
            this.form.setControlValue('applicant_House', { key: row.values[7], value: row.values[8] });
            this.form.setControlValue('applicant_Flat', row.values[11]);
            this.form.setControlValue('applicant_StreetName', row.values[12]);
            this.form.setControlValue('applicant_HouseName', row.values[13]);
        },
        onLoadApplicant: function() {
            const parameters = [
                {
                    key: '@Phone',
                    value: this.form.getControlValue('Search_Phone')
                },
                {
                    key: '@Email',
                    value: this.form.getControlValue('Search_Email')
                },
                {
                    key: '@HouseId',
                    value: this.form.getControlValue('Search_House')
                },
                {
                    key: '@Flat',
                    value: this.form.getControlValue('Search_Flat')
                }
            ];
            const filters = [];
            const sorting = [];
            this.details.loadData('Detail_RegCard_Applicant', parameters, filters, sorting);
        },
        IsChangeApplicantForDetail: false,
        IsChangeApplicantForClaim: false,
        onHouseRecalc_Applicant: function(houseId) {
            const queryForHouseNameValue = {
                queryCode: 'GetHouseNameById',
                parameterValues: [
                    {
                        key: '@HouseId',
                        value: houseId
                    }
                ]
            };
            this.queryExecutor.getValue(queryForHouseNameValue).subscribe(data => {
                this.form.setControlValue('applicant_HouseName', data);
            });
        },
        onStreetRecalc_Applicant: function(streetId) {
            const queryForStreetNameValue = {
                queryCode: 'GetStreetNameById',
                parameterValues: [
                    {
                        key: '@StreetId',
                        value: streetId
                    }
                ]
            };
            this.queryExecutor.getValue(queryForStreetNameValue).subscribe(data => {
                this.form.setControlValue('applicant_StreetName', data);
            });
        },
        onStreetChanged_Applicant: function(streetId) {
            this.onStreetRecalc_Applicant(streetId);
            if (!this.IsChangeApplicantForDetail) {
                this.form.setControlValue('applicant_House',  {});
            }
            let dependParams = [{ parameterCode: '@Street_id', parameterValue: streetId }];
            this.form.setControlParameterValues('applicant_House', dependParams);
            this.IsChangeApplicantForDetail = false;
        },
        onStreetChanged_Search: function(streetId) {
            this.form.setControlValue('Search_House',  {});
            let dependParams = [{ parameterCode: '@Street_id', parameterValue: streetId }];
            this.form.setControlParameterValues('Search_House', dependParams);
        },
        onStreetChanged_Claim: function(streetId) {
            if (!this.IsChangeApplicantForClaim) {
                this.form.setControlValue('claim_HouseId',  {});
            }
            let dependParams = [{ parameterCode: '@Street_id', parameterValue: streetId }];
            this.form.setControlParameterValues('claim_HouseId', dependParams);
            this.IsChangeApplicantForClaim = false;
        },
        onChanged_claim_type_id: function() {
            this.onChanged_Claim();
        },
        onChanged_claim_HouseId: function() {
            this.onChanged_Claim();
        },
        GetEmployeeByClaimType: function() {
            const queryForGetEmployeeValue = {
                queryCode: 'GetEmployeeByClaimType',
                parameterValues: [
                    {
                        key: '@claim_type_id',
                        value: this.form.getControlValue('claim_type_id')
                    },
                    {
                        key: '@house_id',
                        value: this.form.getControlValue('claim_HouseId')
                    }
                ]
            };
            this.queryExecutor.getValues(queryForGetEmployeeValue).subscribe(data => {
                if (data.rows.length > 0) {
                    this.form.setControlValue('claim_executor_id', data.rows[0].values[0]);
                    this.form.setControlValue('claim_executor_name', data.rows[0].values[1]);
                }
            });
        },
        onChanged_Claim: function() {
            this.GetEmployeeByClaimType();
            if(this.form.getControlValue('claim_HouseId') == '' || this.form.getControlValue('claim_HouseId') == null ||  this.form.getControlValue('applicant_House') == undefined
        || this.form.getControlValue('claim_type_id')  == '' ||   this.form.getControlValue('claim_type_id') == null ||  this.form.getControlValue('claim_type_id') == undefined
            ) {
                document.getElementById('claim_Btn_SaveClaim').disabled = true;
                document.getElementById('claim_Btn_SaveConsult').disabled = true;
            } else {
                document.getElementById('claim_Btn_SaveClaim').disabled = false;
                document.getElementById('claim_Btn_SaveConsult').disabled = false;
            }
        },
        onCreateApplicant: function() {
            const queryFoCreateClaim = {
                queryCode: 'CreateApplicant',
                parameterValues: [
                    {
                        key: '@applicant_id',
                        value: this.form.getControlValue('applicant_id')
                    },
                    {
                        key: '@Phone1',
                        value: this.form.getControlValue('applicant_Phone1')
                    },
                    {
                        key: '@Phone2',
                        value: this.form.getControlValue('applicant_Phone2')
                    },
                    {
                        key: '@House_id',
                        value: this.form.getControlValue('applicant_House')
                    },
                    {
                        key: '@PIB',
                        value: this.form.getControlValue('applicant_PIB')
                    },
                    {
                        key: '@EMail',
                        value: this.form.getControlValue('applicant_Email')
                    },
                    {
                        key: '@Flat',
                        value: this.form.getControlValue('applicant_Flat')
                    }
                ]
            };
            this.queryExecutor.getValue(queryFoCreateClaim).subscribe(data => {
                this.form.setControlValue('applicant_id', data);
                this.onLoadApplicant();
            });
        },
        onCreateClaim: function(claimCategories, claimState) {
            const queryFoCreateClaim = {
                queryCode: 'InsertClaim',
                parameterValues: [
                    {
                        key: '@appeal_Id',
                        value: this.form.getControlValue('appeal_id')
                    },
                    {
                        key: '@claim_type_id',
                        value: this.form.getControlValue('claim_type_id')
                    },
                    {
                        key: '@claim_category_id',
                        value: claimCategories
                    },
                    {
                        key: '@House_id',
                        value: this.form.getControlValue('claim_HouseId')
                    },
                    {
                        key: '@Flat',
                        value: this.form.getControlValue('claim_Flat')
                    },
                    {
                        key: '@comment',
                        value: this.form.getControlValue('claim_comment')
                    },
                    {
                        key: '@executor_id',
                        value: this.form.getControlValue('claim_executor_id')
                    },
                    {
                        key: '@state_id',
                        value: claimState
                    },
                    {
                        key: '@applicant_id',
                        value: this.form.getControlValue('applicant_id')
                    }
                ]
            };
            this.queryExecutor.getValue(queryFoCreateClaim).subscribe(() => {
                this.form.setControlValue('claim_type_id', {});
                this.form.setControlValue('claim_StreetId', {});
                this.form.setControlValue('claim_HouseId', {});
                this.form.setControlValue('claim_Flat', null);
                this.form.setControlValue('claim_comment', null);
            });
        }
    };
}());
