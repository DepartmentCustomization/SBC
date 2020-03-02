(function() {
    return {
        init: function() {
            this.form.onControlValueChanged('teams_id', this.onTeams);
            if(this.form.getControlValue('teams_id') == null) {
                this.form.setControlVisibility('Plan_start_time',false);
                this.form.setControlVisibility('Plan_end_time',false);
            }
        },
        onTeams: function(teams_id) {
            console.log(`Id teams ${teams_id}`);
            const timeShift = {
                queryCode: 'avr_Select_TimeShift_Team',
                parameterValues:[{
                    key: '@teams_id',
                    value: teams_id
                }]
            };
            this.queryExecutor.getValues(timeShift).subscribe(data => {
                debugger;
                console.log(data)
                if(data.rows[0] == undefined) {
                    this.form.setControlValue('shifts_name', null)
                }else{
                    let year = new Date().getFullYear();
                    let month = new Date().getMonth();
                    let day = new Date().getDay();
                    //  let currentDate = [year, month,day];
                    if(month == 12) {
                        month = 0
                    }else{
                        month++
                    }
                    let shift = data.rows[0].values[0] + ': ' + year + '-' + month + '-' + day;
                    this.form.setControlValue('Plan_start_time', data.rows[0].values[1].slice(11,16));
                    this.form.setControlValue('Plan_end_time', data.rows[0].values[2].slice(11,16));
                    if(this.form.getControlValue('shifts_name') == null) {
                        this.form.setControlValue('shifts_name', shift);
                    }
                }
            });
        },
        afterSave: function(data) {
            console.log(data);
            //var shifts_name = this.form.getControlValue('shifts_name');
            const fieldForm = {
                title: 'Назначення',
                acceptBtnText: 'ok',
                cancelBtnText: 'cancel',
                fieldGroups: [
                    {
                        code: 'fields',
                        // name: 'Lalala',
                        expand: true,
                        position: 1,
                        fields:[
                            {
                                code:'shift_name',
                                placeholder:'Зміна',
                                hidden: false,
                                required: false,
                                position: 1,
                                fullScreen: true,
                                value: this.form.getControlValue('shifts_name'),
                                type: 'text'
                            },
                            {
                                code: 'Id',
                                fullScreen: false,
                                hidden: false,
                                listDisplayColumn: 'order_num',
                                listKeyColumn: 'Id',
                                lookupType: 'list',
                                placeholder: 'Наряд',
                                position: 2,
                                queryListCode: 'avr_Free_Orders_SelectRows',
                                required: true,
                                type: 'lookup',
                                filterList: [{parameterCode: '@Id', parameterValue: this.form.getControlValue('organizations_id2')} ]
                            },
                            {
                                code:'shift_id',
                                placeholder:'Id shifts',
                                listKeyColumn: 'Id',
                                hidden: true,
                                required: false,
                                position: 3,
                                fullScreen: true,
                                value: this.getRowValueByCode(data, 'Id'),
                                type: 'number'
                            }
                        ]
                    }
                ]
            };
            const fieldFormCallBack = (res) => {
                if (res === false) {
                    //this.navigateTo('sections');
                    console.log('Відмінено');
                }else {
                    const body = {
                        queryCode: 'avr_Free_Orders_Update',
                        parameterValues: res
                    };
                    this.queryExecutor.submitValues(body).subscribe();
                }
            };
            const myForm = {
                title: '',
                text: 'Назначити зміні виїзд?',
                acceptBtnText: 'yes',
                cancelBtnText: 'no'
            };
            const formCallBack = (responce) => {
                if (responce === true) {
                    //console.log('It`s all good')
                    this.openModalForm(fieldForm, fieldFormCallBack);
                }
            };
            this.openModalForm(myForm, formCallBack);
        // location.reload();
        // this.back();
        }
    };
}());
