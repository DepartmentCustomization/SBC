(function() {
    return {
        init: function() {
            let btn_DeleteRepsonse = document.getElementById('btn_DeleteRepsonse');
            if(this.state !== 'create') {
                let response = this.form.getControlValue('Description');
                let dontTouch = 'Зауважень немає';
                if(response === dontTouch) {
                    this.form.disableControl('Description');
                    this.form.disableControl('typeAccessID');
                    this.form.disableControl('claimTypeID');
                    btn_DeleteRepsonse.disabled = true;
                }
                let access = this.form.getControlValue('typeAccessID');
                let typeParam = [{ parameterCode: '@access_id', parameterValue: access }];
                this.form.setControlParameterValues('claimTypeID', typeParam);
            } else {
                this.form.setControlVisibility('btn_DeleteRepsonse', false);
            }
            this.form.onControlValueChanged('typeAccessID', this.onType);
            btn_DeleteRepsonse.addEventListener('click', function(event) {
                this.openPopUpConfirmDialog('Впевнені що бажаєте видалити ?', this.deleteType.bind(this));
            }.bind(this));
        }, // End Init
        afterSave: function() {
            this.form.setControlVisibility('btn_DeleteRepsonse', true);
        },
        deleteType: function(data) {
            if(data) {
                if(this.id) {
                    const deletator = {
                        queryCode: 'DeleteResponseRow',
                        parameterValues: [
                            {
                                key: '@Id',
                                value: this.id
                            }
                        ],
                        limit: -1
                    }
                    this.queryExecutor.getValues(deletator).subscribe(data => {
                        if(data) {
                            this.navigateTo('/sections/Responses/');
                        }
                    });
                }else {
                    let id = window.location.pathname.split('/').pop();
                    const deletator = {
                        queryCode: 'DeleteResponseRow',
                        parameterValues: [
                            {
                                key: '@Id',
                                value: id
                            }
                        ],
                        limit: -1
                    }
                    this.queryExecutor.getValues(deletator).subscribe(data => {
                        if(data) {
                            this.navigateTo('/sections/Responses/');
                        }
                    });
                }
            }
        },
        onType: function(acc_id) {
            if(acc_id) {
                let access = [{ parameterCode: '@access_id', parameterValue: acc_id }];
                this.form.setControlParameterValues('claimTypeID', access);
            }
        }
    };
}());
