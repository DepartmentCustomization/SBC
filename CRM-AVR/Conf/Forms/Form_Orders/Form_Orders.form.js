(function() {
    return {
        chooseDetail_Order_Action_Mechasnism: function() {
            let claimStatus = this.form.getControlValue('claim_stat_id');
            let orderStatus = this.form.getControlValue('status_id');
            if (claimStatus === 5 || orderStatus === 10) {
                this.details.setVisibility('Detail_Order_Action_Mechasnisms2', true);
                this.details.setVisibility('Detail_Order_Action_Mechasnisms', false);
            } else {
                this.details.setVisibility('Detail_Order_Action_Mechasnisms2', false);
                this.details.setVisibility('Detail_Order_Action_Mechasnisms', true);
            }
        },
        chooseDetail_Order_Faucet: function() {
            let claimStatus = this.form.getControlValue('claim_stat_id');
            if (claimStatus === 5) {
                this.details.setVisibility('Detail_Order_Faucet2', true);
                this.details.setVisibility('Detail_Order_Faucet', false);
            } else {
                this.details.setVisibility('Detail_Order_Faucet2', false);
                this.details.setVisibility('Detail_Order_Faucet', true);
            }
        },
        init: function() {
            this.chooseDetail_Order_Action_Mechasnism();
            this.chooseDetail_Order_Faucet();
            this.form.disableControl('Created_at');
            this.form.disableControl('user_name');
            this.form.disableControl('position');
            this.form.disableControl('Closed_at');
            this.form.disableControl('user_edit');
            this.form.disableControl('position_close');
            let close = this.form.getControlValue('Closed_at');
            if (close === null) {
                this.form.setControlVisibility('Closed_at');
                this.form.setControlVisibility('user_edit');
                this.form.setControlVisibility('position_close');
            }
            let btn_addOrderWorker = document.getElementById('btn_addOrderWorker');
            let btn_close_order = document.getElementById('btn_close_order');
            btn_close_order.disabled = 'true';
            btn_addOrderWorker.addEventListener('click', function(event) {
                this.addNoTabelOrderWorker();
            }.bind(this));
            btn_close_order.addEventListener('click', function(event) {
                let getdate = new Date();
                this.form.setControlValue('Closed_at', getdate);
                document.querySelector('.btn-save').click();
                // this.back();
                //  const param = {
                //          queryCode: 'btn_close_Order',
                //          parameterValues:[
                //              {key: '@Id',value: this.id},
                //              {key: '@claims_id',value: this.form.getControlValue('claims_id')},
                //              {key: '@Pushed_at',value: this.form.getControlValue('Pushed_at')},
                //              {key: '@Start_at',value: this.form.getControlValue('Start_at')},
                //              {key: '@Plan_duration',value: this.form.getControlValue('Plan_duration')},
                //              {key: '@Finished_at',value: this.form.getControlValue('Finished_at')},
                //              {key: '@Comment_result',value: this.form.getControlValue('Comment_result')},
                //              {key: '@Finish_at_actions',value: this.form.getControlValue('Finish_at_actions')}
                //              ]
                //      };
                //      this.queryExecutor.getValues(param).subscribe(data =>{
                //      });
                this.chooseDetail_Order_Action_Mechasnism();
            }.bind(this));
            //прячем деталь "Відключення для перегляду" для логики добавления отключения - возможно потом удалю эту деталь
            this.details.setVisibility('Group_Order_SwitchOff_view', false);
            this.details.setVisibility('Detail_Action_Orders', false);
            // СКРИТА деталь -  Прив'язати створені в заявці роботи до виїзду
            this.details.setVisibility('ActionClaims_Detail', false);
            this.clear_members_brigade();
            let bnt_add_members_brigade = document.getElementById('bnt_add_members_brigade');
            bnt_add_members_brigade.addEventListener('click', function(event) {
                this.add_members_brigade();
            }.bind(this));
            let bnt_cleare_members_brigady = document.getElementById('bnt_cleare_members_brigady');
            bnt_cleare_members_brigady.addEventListener('click', function(event) {
                this.clear_members_brigade();
            }.bind(this));
            let bnt_save_members_brigade = document.getElementById('bnt_save_members_brigade');
            bnt_save_members_brigade.addEventListener('click', function(event) {
                const addData = []
                addData.push([{key: '@job_id',value: this.form.getControlValue('member_1')},
                    {key: '@is_main',value: this.form.getControlValue('in_brigadir_1')},
                    {key: '@is_driver', value: this.form.getControlValue('in_driver_1')}]);
                addData.push([{key: '@job_id',value: this.form.getControlValue('member_2')},
                    {key: '@is_main',value: this.form.getControlValue('in_brigadir_2')},
                    {key: '@is_driver', value: this.form.getControlValue('in_driver_2')}]);
                addData.push([{key: '@job_id',value: this.form.getControlValue('member_3')},
                    {key: '@is_main',value: this.form.getControlValue('in_brigadir_3')},
                    {key: '@is_driver', value: this.form.getControlValue('in_driver_3')}]);
                addData.push([{key: '@job_id',value: this.form.getControlValue('member_4')},
                    {key: '@is_main',value: this.form.getControlValue('in_brigadir_4')},
                    {key: '@is_driver', value: this.form.getControlValue('in_driver_4')}]);
                addData.push([{key: '@job_id',value: this.form.getControlValue('member_5')},
                    {key: '@is_main',value: this.form.getControlValue('in_brigadir_5')},
                    {key: '@is_driver', value: this.form.getControlValue('in_driver_5')}]);
                for (let i = 0; i < addData.length; i++) {
                    const addMembers = {
                        queryCode: 'avk_add_jobs_Order_Insert',
                        parameterValues:[
                            {key: '@order_id',value: this.id},
                            {key: '@job_id',value: addData[i][0].value},
                            {key: '@is_main',value: addData[i][1].value},
                            {key: '@is_driver', value: addData[i][2].value}
                        ]
                    };
                    this.queryExecutor.getValues(addMembers).subscribe(data =>{
                        const parameters = [{ key: '@Id', value: data.rows[0].values[0] }];
                        this.details.loadData('Group_People_Shift', parameters/*, filters, sorting*/);
                    });
                }
                this.clear_members_brigade();
            }.bind(this));
            // bnt_add_members_brigade.disabled = false;
            if (isNaN(this.id)) {
                bnt_add_members_brigade.disabled = true;
                btn_addOrderWorker.disabled = true;
            } else {
                this.getOrderNumByClaim();
            }
            this.form.onControlValueChanged('calc', this.calc);
            // this.form.onControlValueChanged('Pushed_at', this.savePushedDate);
            this.form.onControlValueChanged('org_1', this.selectJobs1);
            this.form.onControlValueChanged('org_2', this.selectJobs2);
            this.form.onControlValueChanged('org_3', this.selectJobs3);
            this.form.onControlValueChanged('org_4', this.selectJobs4);
            this.form.onControlValueChanged('org_5', this.selectJobs5);
            this.form.disableControl('status_id');
            this.form.disableControl('claims_number');
            this.form.disableControl('organizations_name');
            this.form.disableControl('claim_classes_name');
            this.form.disableControl('claim_status_name');
            this.form.disableControl('places_name');
            this.form.disableControl('add_action');
            this.form.setGroupVisibility('Group_add_latches', false);
            let status = this.form.getControlValue('status_id');
            if (status == null) {
            //this.form.disableControl("Status_id");
                this.form.setControlValue('status_id', {key: 7, value: 'Новий'});
            }else if(status != null) {
                this.form.enableControl('add_action');
            }
            const finishValue = this.form.getControlValue('Closed_at');
            console.log(finishValue);
            if(finishValue !== null || status == 10) {
                this.form.setControlValue('status_id', {key: 10, value: 'Виконано'});
                this.form.disableControl('status_id');
                this.form.disableControl('Closed_at');
                this.form.disableControl('shifts_Id');
                this.form.disableControl('Pushed_at');
                this.form.disableControl('Plan_duration');
                this.form.disableControl('Finished_at');
                this.form.disableControl('Start_at');
                this.form.disableControl('add_action');
                this.form.disableControl('Comment_result');
                this.form.disableControl('Finish_at_actions');
                // скрыть все кнопки если выезд закрыт
                let btn_add = document.querySelectorAll('.add-btn');
                for(let i = 0; i < btn_add.length; i++) {
                    btn_add[i].style.display = 'none';
                }
                this.form.setControlVisibility('btn_close_order', false);
                this.form.setControlVisibility('bnt_add_members_brigade', false);
                this.form.setControlVisibility('btn_addActions', false);
                this.form.setControlVisibility('btn_addAction', false);
                this.form.setControlVisibility('btn_addSwitchOff', false);
                this.form.setControlVisibility('btn_addOrderWorker', false);
            }
            this.form.onControlValueChanged('add_action', this.addLatches);
            this.form.onControlValueChanged('count', this.isCounter);
            // дія кнопок по роботі
            let btn_addActions = document.getElementById('btn_addActions');
            btn_addActions.addEventListener('click', e =>{
                this.details.create('ActionClaimsALL_Detail');
            });
            let btn_addAction = document.getElementById('btn_addAction');
            btn_addAction.addEventListener('click', e =>{
                this.details.create('Detail_Action_Orders');
            });
            /*логика отключений домов*/
            let btn_addSwitchOff = document.getElementById('btn_addSwitchOff');
            btn_addSwitchOff.addEventListener('click',this.addSwitchOff.bind(this)); // e =>{
            let claim_ID = this.form.getControlValue('claims_id');
            const resultOff = {
                queryCode: 'list_valid_switchOff',
                parameterValues: [{key: '@claim_ID', value: claim_ID}]
            };
            this.queryExecutor.getValue(resultOff).subscribe(data => {
                console.log('Робота по закритюю засув (0- нема, 1- є):  ' + data)
        				this.form.setControlValue('is_closeZasuv', data);
            });
            // *******
            let check1 = document.getElementById('in_brigadir_1');
            let check2 = document.getElementById('in_brigadir_2');
            let check3 = document.getElementById('in_brigadir_3');
            let check4 = document.getElementById('in_brigadir_4');
            let check5 = document.getElementById('in_brigadir_5');
            let arr = [check1, check2, check3, check4, check5];
            // console.log(arr);
            arr.forEach(el => {
                el.addEventListener('click', event => {
                    let target = event.currentTarget;
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    if(this.form.getControlValue(target.id)) {
                        this.form.setControlValue(target.id, null);
                    }else{
                        arr.forEach(item => {
                            this.form.setControlValue(item.id, null);
                        });
                        this.form.setControlValue(target.id, true);
                    }
                });
            });
            this.form.onControlValueChanged('finish_at', this.chechTime);
            //если заявка закрыта блокируем все
            if(this.form.getControlValue('claim_stat_id') == 5) {
                document.getElementById('bnt_add_members_brigade').disabled = true
                document.getElementById('bnt_cleare_members_brigady').disabled = true
                document.getElementById('bnt_save_members_brigade').disabled = true
                document.getElementById('btn_addActions').disabled = true
                document.getElementById('btn_addAction').disabled = true
                document.getElementById('btn_addSwitchOff').disabled = true
                this.form.disableControl('status_id');
                this.form.disableControl('Closed_at');
                this.form.disableControl('shifts_Id');
                this.form.disableControl('Pushed_at');
                this.form.disableControl('Plan_duration');
                this.form.disableControl('Finished_at');
                this.form.disableControl('Start_at');
                this.form.disableControl('add_action');
                this.form.disableControl('Comment_result');
                this.form.removeControl('bnt_add_members_brigade');
                this.form.removeControl('btn_addActions');
                this.form.removeControl('btn_addAction');
                this.form.removeControl('btn_addSwitchOff');
                this.form.removeControl('add_action');
                this.form.removeControl('btn_addOrderWorker');
                // скрыть все кнопки если выезд\заявка закрытa
                let btn_add = document.querySelectorAll('.add-btn');
                for(let i = 0; i < btn_add.length; i++) {
                    btn_add[i].style.display = 'none'
                }
            }
            this.details.onCellClick('ActionClaimsALL_Detail', this.sortActions.bind(this));
            document.querySelector('#Group_Order_SwitchOff .add-btn').style.display = 'none';
            this.onChangeCloseOrder()
            this.form.onControlValueChanged('Pushed_at', this.onChangeCloseOrder.bind(this));
            this.form.onControlValueChanged('Start_at', this.onChangeCloseOrder.bind(this));
            this.form.onControlValueChanged('Finished_at', this.onChangeCloseOrder.bind(this));
            this.form.onControlValueChanged('Finish_at_actions', this.onChangeCloseOrder.bind(this));
            // END INIT
        },
        getOrderNumByClaim:function() {
            const order = {
                queryCode: 'find_OrderNumByClaim',
                parameterValues:[
                    {key: '@OrderID',value: this.id}
                ]
            };
            this.queryExecutor.getValue(order).subscribe(data =>{
                if(data) {
                    this.form.setGroupTitle('Group_info', 'Виїзд №  ' + data);
                }
            });
        },
        onChangeCloseOrder:function() {
            if (this.form.getControlValue('Pushed_at') == null || this.form.getControlValue('Start_at') == null ||
          this.form.getControlValue('Finished_at') == null || this.form.getControlValue('Finish_at_actions') == null) {
                document.getElementById('btn_close_order').disabled = true;
            } else {
                document.getElementById('btn_close_order').disabled = false;
            }
        },
        addSwitchOff: function(data) {
            const queryPlaceOff = {
                title: 'Параметри відключення',
                // singleButton: true,
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
                                filterList: [{parameterCode: '@claim_id', parameterValue: this.form.getControlValue('claims_id') } ],
                                listDisplayColumn: 'Start_from',
                                //   listKeyColumn: "Start_from",
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
                    faucet_id: off_id[1].value,
                    flag: 1
                }
                // имитируем на нажатие кнопки плюс скрытой формы
                this.details.create('Group_Order_SwitchOff', obdj);
                obdj = {};
            }
        // const param = [{ key: '@Id', value: this.form.getControlValue('claims_id')}];
        // this.details.loadData('Group_Order_SwitchOff_view', param);
        },
        ActionClaimsALL: [],
        config_ActionClaimsALL: [],
        sortActions:function(column, row, value, event, indexOfColumnId) {
            const queryOrder = {
                queryCode: 'avr_Sort_Actions_from_Modal',
                parameterValues: [{ key: '@order_id', value: this.id}]
            };
            this.queryExecutor.getValues(queryOrder).subscribe(function(data) {
                if(data.rows.length > 0) {
                    this.ActionClaimsALL = [];
                    const fieldsForm = {
                        title: 'Сортировка работ',
                        acceptBtnText: 'save',
                        cancelBtnText: 'cancel',
                        fieldGroups: []
                    };
                    for(let i = 0; i < data.rows.length; i++) {
                        let field_group = {
                            code: 'Action' + i,
                            name: 'Робота ' + (i + 1),
                            expand: true,
                            position: i,
                            fields:[]
                        }
                        fieldsForm.fieldGroups.push(field_group);
                        let num_group = fieldsForm.fieldGroups.length - 1;
                        let field_1 = {
                            code: 'Name' + i,
                            fullScreen: false,
                            hidden: false,
                            placeholder: 'Назва роботи',
                            position: 1,
                            required: false,
                            value: data.rows[i].values[1],
                            type: 'text',
                            width: '75%'
                        }
                        fieldsForm.fieldGroups[num_group].fields.push(field_1)
                        let field_2 = {
                            code: 'Sort' + i,
                            fullScreen: false,
                            hidden: false,
                            placeholder: 'Порядок',
                            position: 2,
                            required: false,
                            value: data.rows[i].values[2],
                            type: 'number',
                            width: '25%'
                        }
                        fieldsForm.fieldGroups[num_group].fields.push(field_2)
                        let field_3 = {
                            code: 'Id' + i,
                            fullScreen: false,
                            hidden: true,
                            placeholder: 'Id',
                            position: 3,
                            required: false,
                            value: data.rows[i].values[0],
                            type: 'number'
                        }
                        fieldsForm.fieldGroups[num_group].fields.push(field_3)
                        this.ActionClaimsALL.push({colName_id: 'Id' + i, colName_value: 'Sort' + i});
                    } //for
                    this.openModalForm(fieldsForm, this.modalCallbackClose.bind(this), this.modalCallbackClose2.bind(this));
                } //if
            }.bind(this));
        },
        modalCallbackClose: function(data) {
            console.log(data);
            if (this.ActionClaimsALL.length > 0) {
                for(let j = 0; j < this.ActionClaimsALL.length; j++) {
                    console.log('id: ' + this.config_ActionClaimsALL.getControlValue(this.ActionClaimsALL[j].colName_id) + ' | value: ' + this.config_ActionClaimsALL.getControlValue(this.ActionClaimsALL[j].colName_value));
                    const queryParam = {
    			queryCode: 'avr_Update_Action_Sort_Modal',
    			parameterValues:[{key: '@Id', value:  this.config_ActionClaimsALL.getControlValue(this.ActionClaimsALL[j].colName_id) },
    			                 {key: '@Sort_value', value:this.config_ActionClaimsALL.getControlValue(this.ActionClaimsALL[j].colName_value) }
    			]
                    };
                    this.queryExecutor.getValues(queryParam).subscribe(data => {
                    });
                }
            }
            const parameters = [ { key: '@Id', value: this.id }];
            this.details.loadData('ActionClaimsALL_Detail', parameters)
        },
        modalCallbackClose2: function(data) {
            if (this.ActionClaimsALL.length > 0) {
                for(let j = 0; j < this.ActionClaimsALL.length; j++) {
                    data.disableControl('Name' + j);
                }
            }
            this.config_ActionClaimsALL = data;
        },
        config_AddWorker: [],
        addNoTabelOrderWorker: function(column, row, value, event, indexOfColumnId) {
            const modalVals = {
                title: 'Додати співробітників на виїзд',
                // singleButton: true,
                acceptBtnText: 'save',
                cancelBtnText: 'cancel',
                fieldGroups:[
                    {
                        code: 'addOrderWorker',
                        expand: true,
                        position: 1,
                        fields: [
                            {
                                code: 'AddBtn',
                                fullScreen: false,
                                hidden: false,
                                placeholder: 'Нові поля',
                                position: 0,
                                required: false,
                                type: 'button',
                                width: '55%',
                                icon: 'add'
                            },
                            {
                                code: 'worker1',
                                fullScreen: true,
                                hidden: false,
                                listDisplayColumn: 'pib',
                                listKeyColumn: 'Id',
                                lookupType: 'list',
                                placeholder: 'Оберіть співробітника',
                                position: 1,
                                queryListCode: 'List_ContactsJobs',
                                required: true,
                                type: 'lookup',
                                width: '70%'
                            },{
                                code: 'IsMain1',
                                fullScreen: false,
                                hidden: false,
                                placeholder: 'Бригадир',
                                position: 2,
                                required: false,
                                type: 'checkbox',
                                width: '17%'
                            },{
                                code: 'IsDriver1',
                                fullScreen: false,
                                hidden: false,
                                placeholder: 'Водій',
                                position: 3,
                                required: false,
                                type: 'checkbox',
                                width: '13%'
                            }
                        ]
                    }
                ]
            };
            this.openModalForm(modalVals, this.onAddOrderWorker.bind(this), this.modalOpenAddWorker.bind(this));
        },
        onAddOrderWorker: function(data) {
            if(data) {
                console.log(data);
                for(let i = 0; i < data.length; i += 3) {
                    if(
                        data[i] !== undefined
              && data[i + 1] !== undefined
              && data[i + 2] !== undefined) {
                        const workersParam = {
                            queryCode: 'avk_add_jobs_Order_Insert',
                            parameterValues:[
                                {key: '@order_id',value: this.id},
                                {key: '@job_id',value: data[i].value},
                                {key: '@is_main',value: data[i + 1].value},
                                {key: '@is_driver', value: data[i + 2].value}
                            ]
                        };
                        this.queryExecutor.submitValues(workersParam).subscribe(data => {});
                    } //end if
                } // end for
                // Загрузить новые данные в деталь
                const parameters = [ { key: '@Id', value: this.id }];
                this.details.loadData('Group_People_Shift', parameters);
            }
        },
        modalOpenAddWorker: function(form) {
            this.config_AddWorker = form;
            if(document.getElementById('AddBtn')) {
                document.getElementById('AddBtn').addEventListener('click', ()=> {
                    this.addOrderWorkerField(form);
                })
            }
        },
        addOrderWorkerField: function(form) {
            let lastPosition = (form.config.fieldGroups[0].fields.length);
            let lastNum = Number((form.config.fieldGroups[0].fields[lastPosition - 1].code).replace('IsDriver',''));
            let worker = {
                code: 'worker' + Number(lastNum + 1),
                fullScreen: true,
                hidden: false,
                listDisplayColumn: 'pib',
                listKeyColumn: 'Id',
                lookupType: 'list',
                placeholder: 'Оберіть співробітника',
                position: lastPosition + 1,
                queryListCode: 'List_ContactsJobs',
                required: true,
                type: 'lookup',
                width: '70%'
            };
            let IsMain = {
                code: 'IsMain' + Number(lastNum + 1),
                fullScreen: false,
                hidden: false,
                placeholder: 'Бригадир',
                position: lastPosition + 2,
                required: false,
                type: 'checkbox',
                width: '17%'
            };
            let IsDriver = {
                code: 'IsDriver' + Number(lastNum + 1),
                fullScreen: false,
                hidden: false,
                placeholder: 'Водій',
                position: lastPosition + 3,
                required: false,
                type: 'checkbox',
                width: '13%'
            };
            form.addControl('addOrderWorker', worker);
            form.addControl('addOrderWorker', IsMain);
            form.addControl('addOrderWorker', IsDriver);
        },
        chechTime:function(time) {
            if (time != null) {
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
                        this.form.setControlValue('finish_at', null);
                    }
                });
            }
        },
        savePushedDate:function(pushed) {
            console.log('Date: ' + pushed);
            console.log('Order id = ' + this.id);
            const pushDAte = {
                queryCode: 'avr_savePushedSDate_Orders',
                parameterValues:[
                    {key: '@order_id',value: this.id},
                    {key: '@pushed',value: pushed}
                ]
            };
            this.queryExecutor.getValues(pushDAte).subscribe(data =>{
            });
        },
        selectJobs1:function(org_id) {
            this.form.setControlValue('member_1', {});
            this.form.setControlValue('in_brigadir_1', null);
            this.form.setControlValue('in_driver_1', null);
            let dependParams = [{ parameterCode: '@org_id', parameterValue: org_id },{ parameterCode: '@date', parameterValue: this.form.getControlValue('Pushed_at')} ];
            this.form.setControlParameterValues('member_1', dependParams);
        },
        selectJobs2:function(org_id) {
            this.form.setControlValue('member_2', {});
            this.form.setControlValue('in_brigadir_2', null);
            this.form.setControlValue('in_driver_2', null);
            let dependParams2 = [{ parameterCode: '@org_id', parameterValue: org_id },{ parameterCode: '@date', parameterValue: this.form.getControlValue('Pushed_at')} ];
            this.form.setControlParameterValues('member_2', dependParams2);
        },
        selectJobs3:function(org_id) {
            this.form.setControlValue('member_3', {});
            this.form.setControlValue('in_brigadir_3', null);
            this.form.setControlValue('in_driver_3', null);
            let dependParams3 = [{ parameterCode: '@org_id', parameterValue: org_id },{ parameterCode: '@date', parameterValue: this.form.getControlValue('Pushed_at')} ];
            this.form.setControlParameterValues('member_3', dependParams3);
        },
        selectJobs4:function(org_id) {
            this.form.setControlValue('member_4', {});
            this.form.setControlValue('in_brigadir_4', null);
            this.form.setControlValue('in_driver_4', null);
            let dependParams4 = [{ parameterCode: '@org_id', parameterValue: org_id },{ parameterCode: '@date', parameterValue: this.form.getControlValue('Pushed_at')} ];
            this.form.setControlParameterValues('member_4', dependParams4);
        },
        selectJobs5:function(org_id) {
            this.form.setControlValue('member_5', {});
            this.form.setControlValue('in_brigadir_5', null);
            this.form.setControlValue('in_driver_5', null);
            let dependParams5 = [{ parameterCode: '@org_id', parameterValue: org_id },{ parameterCode: '@date', parameterValue: this.form.getControlValue('Pushed_at')} ];
            this.form.setControlParameterValues('member_5', dependParams5);
        },
        clear_members_brigade: function() {
            this.form.enableControl('Pushed_at');
            btn_addOrderWorker.disabled = false;
            this.form.setControlVisibility('org_1',false);
            this.form.setControlVisibility('member_1',false);
            this.form.setControlVisibility('in_brigadir_1',false);
            this.form.setControlVisibility('in_driver_1',false);
            this.form.setControlVisibility('org_2',false);
            this.form.setControlVisibility('member_2',false);
            this.form.setControlVisibility('in_brigadir_2',false);
            this.form.setControlVisibility('in_driver_2',false);
            this.form.setControlVisibility('org_3',false);
            this.form.setControlVisibility('member_3',false);
            this.form.setControlVisibility('in_brigadir_3',false);
            this.form.setControlVisibility('in_driver_3',false);
            this.form.setControlVisibility('org_4',false);
            this.form.setControlVisibility('member_4',false);
            this.form.setControlVisibility('in_brigadir_4',false);
            this.form.setControlVisibility('in_driver_4',false);
            this.form.setControlVisibility('org_5',false);
            this.form.setControlVisibility('member_5',false);
            this.form.setControlVisibility('in_brigadir_5',false);
            this.form.setControlVisibility('in_driver_5',false);
            this.form.setControlVisibility('bnt_save_members_brigade',false);
            this.form.setControlVisibility('bnt_cleare_members_brigady',false);
            bnt_add_members_brigade.disabled = false;
            for(let i = 1; i <= 5; i++) {
                this.form.setControlValue('member_' + i, {});
                this.form.setControlValue('in_brigadir_' + i, null);
                this.form.setControlValue('in_driver_' + i, null);
            }
        },
        add_members_brigade: function() {
            this.form.disableControl('Pushed_at');
            btn_addOrderWorker.disabled = true;
            let org_id = this.form.getControlValue('org_id');
            console.log('Organization id = ' + org_id);
            let org_name = this.form.getControlValue('organizations_name');
            for(let i = 1; i <= 5; i++) {
                this.form.setControlValue('org_' + i, {key: org_id, value:org_name });
            }
            this.form.setControlVisibility('org_1',true);
            this.form.setControlVisibility('member_1',true);
            this.form.setControlVisibility('in_brigadir_1',true);
            this.form.setControlVisibility('in_driver_1',true);
            this.form.setControlVisibility('org_2',true);
            this.form.setControlVisibility('member_2',true);
            this.form.setControlVisibility('in_brigadir_2',true);
            this.form.setControlVisibility('in_driver_2',true);
            this.form.setControlVisibility('org_3',true);
            this.form.setControlVisibility('member_3',true);
            this.form.setControlVisibility('in_brigadir_3',true);
            this.form.setControlVisibility('in_driver_3',true);
            this.form.setControlVisibility('org_4',true);
            this.form.setControlVisibility('member_4',true);
            this.form.setControlVisibility('in_brigadir_4',true);
            this.form.setControlVisibility('in_driver_4',true);
            this.form.setControlVisibility('org_5',true);
            this.form.setControlVisibility('member_5',true);
            this.form.setControlVisibility('in_brigadir_5',true);
            this.form.setControlVisibility('in_driver_5',true);
            this.form.setControlVisibility('bnt_save_members_brigade',true);
            this.form.setControlVisibility('bnt_cleare_members_brigady',true);
            bnt_add_members_brigade.disabled = true;
        },
        calc: function(calck) {
            if(calck > 0) {
                this.form.setControlValue('add_action',false);
                this.form.setControlValue('finish_at', null);
                for(let i = 1; i <= 10; i++) {
                    if (this.form.getControlValue('diameter' + i) != null) {
                        console.log('Remove to field: ' + i)
                        this.form.setControlRequirement('diameter' + i, false);
                        this.form.removeControl('diameter' + i);
                    }
                }
                this.form.setControlValue('count', 0);
            }
        },
        addLatches: function(inCheck) {
            console.log(inCheck);
            if (inCheck == false) {
                this.form.setGroupVisibility('Group_add_latches', false);
                this.form.setControlRequirement('action_type_id', false);
                this.form.setControlRequirement('finish_at', false);
                this.form.setControlValue('count', null);
                this.form.setControlValue('action_type_id', { key: null, value: null });
            }else{
                this.form.setGroupVisibility('Group_add_latches', true);
                this.form.setControlRequirement('action_type_id', true);
                this.form.setControlRequirement('finish_at', true);
            }
        },
        isCounter: function(scorer) {
            for(let i = 1; i <= 10; i++) {
                if (typeof this.form.getControlValue('diameter' + i) === 'object') {
                    console.log('Remove to field: ' + i)
                    this.form.setControlRequirement('diameter' + i, false);
                    this.form.removeControl('diameter' + i);
                }
            }
            if(scorer > 10) {
                scorer = 10; this.form.setControlValue('count', 10)
            }
            if(scorer < 0) {
                this.form.setControlValue('count', 0)
            }
            for(let i = 1; i <= scorer; i++) {
                let field_diameter = {
                    placeholder: 'Діаметр ' + i,
                    code: 'diameter' + i,
                    hidden: false,
                    fullScreen: true,
                    // type: 'number',
                    position: i + 1,
                    required: true,
                    queryListCode: 'dir_DiametersSelectRows',
                    listDisplayColumn: 'Size',
                    listKeyColumn: 'Id',
                    type: 'select'
                }
                this.form.addControl('Group_add_latches', field_diameter);
            }
        },
        validate: function() {
            const finishValue = this.form.getControlValue('Closed_at');
            const st = this.form.getControlValue('status_id');
            const claim_status = this.form.getControlValue('claim_stat_id')
            if(claim_status == null) {
                return true
            }
            if(claim_status == 5) {
                return 'ЗАЯВКА ЗАКРИТА! - вносити правки заборонено'
            }
            if(st == 10) {
                return 'У виконаному виїзді вносити правки заборонено'
            }
            if(finishValue !== null) {
                let five_min = 300000;
    			 let finishDate = finishValue.getTime();
    			 let currentDate = new Date().getTime() - five_min;
    			if (finishDate < (currentDate)) {
    				 return 'Дата закриття некоректна!';
    			}
    			    return true
            }
    			return true
        },
        afterSave: function(data) {
        // debugger;
            this.navigateTo(location.pathname.replace(localStorage.getItem('VirtualPath'), ''));
            let calc = 0;
            calc++;
            this.form.setControlValue('calc', calc);
            const param = [{key: '@Order_Id', value: this.id}];
            this.details.loadData('Detail_Order_Faucet', param);
            if (data.rows[0].values[10] != null) {
                // this.navigateTo(location.pathname.replace(localStorage.getItem('VirtualPath'), "").replace('edit', 'view'));
                this.navigateTo('/sections/Orders/edit/' + this.id + '/Claims/' + this.form.getControlValue('claims_id'));
            }
            this.chooseDetail_Order_Action_Mechasnism();
            this.chooseDetail_Order_Faucet();
        }
    }
    ;
}());
