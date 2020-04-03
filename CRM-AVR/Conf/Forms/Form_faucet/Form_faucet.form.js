(function() {
    return {
        init:function() {
            this.form.disableControl('action_name');
            // this.form.disableControl('Start_from');
            const check_off = {
                queryCode: 'check_if_exists_switch',
                parameterValues: [{key: '@Id', value: this.id}]
            };
            this.queryExecutor.getValue(check_off).subscribe(data =>{
                if (data == 1) {
                    this.form.disableControl('Start_from');
                    this.form.disableControl('places_id');
                }
            })
            this.form.onControlValueChanged('Finish_at', this.chechTime);
            this.form.onControlValueChanged('Start_from', this.clearFinishAt);
            //проверяем если заявка закрыта (5)
            const claimStat = {
                queryCode: 'avr_Faucet_claim_status_is_5',
                parameterValues: [{key: '@Id', value: this.id}]
            };
            this.queryExecutor.getValue(claimStat).subscribe(data =>{
                if (data == 5) {
                    this.form.disableControl('Start_from');
                    this.form.disableControl('action_name');
                    this.form.disableControl('places_id');
                    this.form.disableControl('Finish_at');
                    this.form.disableControl('size_id');
                    this.claimStat = data;
                }
            })
        },
        clearFinishAt:function(time) {
            let finish_from = this.form.getControlValue('Finish_at');
            if(time != null) {
                const queryTime = {
                    queryCode: 'avr_check_time_faucer',
                    parameterValues:[
                        {key: '@claim_id',value: this.form.getControlValue('claims_id')},
                        {key: '@time',value: time},
                        {key: '@flag',value: 1}
                    ]
                };
                this.queryExecutor.getValues(queryTime).subscribe(data =>{
                    if (data.rows[0].values[0] == 0) {
                        this.openPopUpInfoDialog('Дата початку роботи неможе буду меньшою за дату створення заявки!');
                        this.form.setControlValue('Start_from', null);
                    }
                });
            }
            if(finish_from != null) {
                if (time > finish_from) {
                    this.openPopUpInfoDialog('Дата закриття неможе буди меньшою за дату відкриття!');
                    this.form.setControlValue('Start_from', null);
                }
            }
        },
        chechTime:function(time) {
            if (time != null) {
                let start_from = this.form.getControlValue('Start_from');
                if (time < start_from) {
                    this.openPopUpInfoDialog('Дата відкриття неможе буди меньшою за дату закриття!');
                    this.form.setControlValue('Finish_at', null);
                }
                // const queryTime = {
                //              queryCode: 'avr_check_time_faucer',
                //              parameterValues:[
                //                  {key: '@faucet_id',value: this.id},
                //                  {key: '@time',value: time},
                //                  {key: '@flag',value: 2}
                //                  ]
                //          };
                //          this.queryExecutor.getValues(queryTime).subscribe(data =>{
                //              if (data.rows[0].values[0] == 0){
                //                  this.openPopUpInfoDialog('Дата відкриття неможе буди меньшою за дату закриття!');
                //                  this.form.setControlValue('Finish_at', null);
                //              }
                //          });
            }
        },
        validate() {
            if(this.claimStat == 5) {
                return 'У закриту заявку вносити правки заборонено'
            }
            return true
        }
    };
}());
