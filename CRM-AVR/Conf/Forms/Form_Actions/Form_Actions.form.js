(function () {
  return {
    init: function(){
        this.details.setVisibility('Detail_Mechanisms_Moves', false);
        this.form.disableControl("place_type_id");
        this.form.disableControl("coordinates");
        this.form.disableControl("Units_Id");
        this.form.disableControl("Plan_duration");
        // this.form.disableControl("ac_pl_types_id");
        
        let goal = this.form.getControlValue('Is_Goal');
        console.log('Головна робота: ' + goal);
        let claim_status = this.form.getControlValue('claim_stat_id');
        let order_status = this.form.getControlValue('order_stat_id');
        
        
        let claim_ID = this.form.getControlValue('Claim_ID');
         if(this.form.getControlValue('places_id') == null){
                const adress = {
                    queryCode: 'avr_choisePlace_wth_Claim',
                    parameterValues: [{key: '@claim_ID', value: claim_ID}]
                };
                this.queryExecutor.getValues(adress).subscribe(data =>{
                    this.form.setControlValue('places_id', {key: data.rows[0].values[0], value: data.rows[0].values[1]});
                })
         }
        
        let type = this.form.getControlValue('ac_pl_types_id');
        console.log('Тип робіт: ' + type + ' ' + this.form.getControlDisplayValue('ac_pl_types_id'));
        
        
        let btn_delete_action = document.getElementById('btn_delete_action');
        btn_delete_action.addEventListener('click', e => {
            this.openPopUpQuestionDialog('Ви підтверджуєте видалення цієї роботи та всіх пов`язаних матеріалів?', this.onDeleteAction);
        })
        
        // this.form.onControlValueChanged('ac_pl_types_id', this.onCall);
        // this.form.onControlValueChanged('place_type_id', this.onActionType);
        
        /*логика отключений домов*/  
        // логика отключена 21.05.2019
        //  let click_Off =  document.querySelector('#Group_Actions_SwitchOff .add-btn');
        //  click_Off.style.display = 'none';
        
        // const resultOff = {
        //                 queryCode: 'list_valid_switchOff',
        //                 parameterValues: [{key: '@claim_ID', value: claim_ID}]
        //             };
        //     this.queryExecutor.getValue(resultOff).subscribe(data => {
        //                   console.log('Робота по закритюю засув (0- нема, 1- є):  ' + data)
        // 				this.form.setControlValue('is_closeZasuv', data);
        //                 //  if(this.form.getControlValue('is_closeZasuv') > 0 && type == 59){
        //                  if(this.form.getControlValue('is_closeZasuv') > 0){
        //                     click_Off.style.display = 'block';
        //                  }
        //     });
            
             const countOff = {
                        queryCode: 'avr_countOff_if_action_On',
                        parameterValues: [{key: '@Claim_id', value: claim_ID}]
                    };
            this.queryExecutor.getValue(countOff).subscribe(data => {
                           console.log('Кількість відключених обьектів:  ' + data)
        				this.form.setControlValue('countOff', data);
            });
                    
        const queryPlaceOff = { 
            title: 'Параметри відключення',
            acceptBtnText: "ok",
            cancelBtnText: "cancel",
            fieldGroups:[{
                        code: 'Places_SwitchOff',
                        expand: true,
                        position: 1,
                        fields: [
                            {
                              code:'switchOff_type',
                              placeholder: 'Оберить тип відключення',
                              hidden: false,
                              required: false,
                              position: 1,
                              fullScreen: true,
                              radioItems: [{ value: 1, viewValue: 'Аварійне' },{ value: 5, viewValue: 'Планове' }],
                              type: 'radio'
                            },{
                              code:'switchOff_data',
                              placeholder: 'Дата та час з якого буде діяти відключення',
                              hidden: false,
                              required: false,
                              position: 2,
                              fullScreen: false,
                              value: this.form.getControlValue('Finish_at'),
                              type: 'date-time'
                            } 
                            ]
                    }]
        };
        
        const formPlaceOff = (off_id) =>{
            
            if(off_id == false){
                console.log('It is a  cancel!!!')
            }else{
                const body = {
                    queryCode: 'avr_addType_switchOff_modal_of_Action',
                    parameterValues:[{key: '@type_off', value: off_id[0].value},{key: '@claim_ID', value: claim_ID},{key: '@SwitchOff_start', value:  off_id[1].value}]
                };
            this.queryExecutor.submitValues(body).subscribe(data => {
                    console.log('It is OK: ' + data);
                });
            }
        };
        
        // click_Off.addEventListener('click', (e)=> {
        //     console.log('Yeees');
        //     this.openModalForm(queryPlaceOff, formPlaceOff);
        // });
        
    //******** Add new places ********
    
    // Колодязь 1
    const formNewWell = {
            title: 'Новє місце - тип КОЛОДЯЗЬ',
            acceptBtnText: "save",
            cancelBtnText: "cancel",
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
                              queryListCode: "list_House_for_modal",
                              listDisplayColumn: "Name",
                              listKeyColumn: "Id",
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
                              queryListCode: "dir_DistrictsSelectRows",
                              listDisplayColumn: "Name",
                              listKeyColumn: "Id",
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
            if (param_well === false){
                console.log('It`s a cancel');
            }else{
                console.log('It`s a good');
                const body = {
                    queryCode: 'avr_Insert_new_PlaceWell_of_Modal',
                    parameterValues: param_well
                }
                this.queryExecutor.getValues(body).subscribe(data => {
                        this.form.setControlValue('places_id', {key: data.rows[0].values[0], value: data.rows[0].values[1]});
                        this.form.setControlValue('place_type_id',  {key: data.rows[0].values[2], value: data.rows[0].values[3]});
                        this.form.setControlValue('coordinates',  data.rows[0].values[4]);
                })
            }
        }
    
    // Перехрестя 2
    const formNewCross = {
            title: 'Новє місце - тип "ПЕРЕХРЕСТЯ"',
            acceptBtnText: "save",
            cancelBtnText: "cancel",
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
                              queryListCode: "list_House_for_modal",
                              listDisplayColumn: "Name",
                              listKeyColumn: "Id",
                              type: 'select'
                            },
                            {
                              code:'m_houses2_id',
                              placeholder:'Друга вулиця',
                              hidden: false,
                              required: true,
                              position: 2,
                              fullScreen: true,
                              queryListCode: "list_House_for_modal",
                              listDisplayColumn: "Name",
                              listKeyColumn: "Id",
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
                              queryListCode: "dir_DistrictsSelectRows",
                              listDisplayColumn: "Name",
                              listKeyColumn: "Id",
                              type: 'select'
                            },
                            {
                              code:'m_Place_type_ID',
                              placeholder:'Тип місця',
                              hidden: true,
                              required: true,
                              position: 15,
                              fullScreen: false,
                              value: 19,
                              type: 'number'
                            }
                            
                        ]
                    }
                ]
        };
        const addCrossCallBack = (param_cross) =>{
            if (param_cross === false){
                console.log('It`s a cancel');
            }else{
                console.log('It`s a good');
                const body = {
                    queryCode: 'avr_Insert_new_PlaceCross_of_Modal',
                    parameterValues: param_cross
                }
                this.queryExecutor.getValues(body).subscribe(data => {
                        this.form.setControlValue('places_id', {key: data.rows[0].values[0], value: data.rows[0].values[1]});
                        this.form.setControlValue('place_type_id',  {key: data.rows[0].values[2], value: data.rows[0].values[3]});
                        this.form.setControlValue('coordinates',  data.rows[0].values[4]);
                })
            }
        };
        
    //Ділянка 3
    const formNewArea = {
            title: 'Новє місце - тип "ДІЛЯНКА"',
            acceptBtnText: "save",
            cancelBtnText: "cancel",
            fieldGroups:[
                    {
                        code: 'ModalNewArea',
                        expand: true,
                        position: 1,
                        fields: [
                            {
                              code:'m_houses_id',
                              placeholder:'Перша будівля',
                              hidden: false,
                              required: true,
                              position: 1,
                              fullScreen: true,
                              queryListCode: "list_Houses_for_places",
                              listDisplayColumn: "Name",
                              listKeyColumn: "Id",
                              type: 'select'
                            },
                            {
                              code:'m_houses2_id',
                              placeholder:'Друга будівля',
                              hidden: false,
                              required: true,
                              position: 2,
                              fullScreen: true,
                              queryListCode: "list_Houses_for_places",
                              listDisplayColumn: "Name",
                              listKeyColumn: "Id",
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
                              required: true,
                              position: 5,
                              fullScreen: true,
                              queryListCode: "dir_DistrictsSelectRows",
                              listDisplayColumn: "Name",
                              listKeyColumn: "Id",
                              type: 'select'
                            },
                            {
                              code:'m_Place_type_ID',
                              placeholder:'Тип місця',
                              hidden: true,
                              required: false,
                              position: 15,
                              fullScreen: false,
                              queryListCode: "dir_Place_typesSelectRows",
                              listDisplayColumn: "Name",
                              listKeyColumn: "Id",
                              type: 'select',
                              value: 10,
                              type: 'number'
                            }
                            
                        ]
                    }
                ]
        };
        const addAreaCallBack = (param_area) =>{
            if (param_area === false){
                console.log('It`s a cancel');
            }else{
                console.log('It`s a good');
                const body = {
                    queryCode: 'avr_Insert_new_PlaceArea_of_Modal',
                    parameterValues: param_area
                }
                this.queryExecutor.getValues(body).subscribe(data => {
                        this.form.setControlValue('places_id', {key: data.rows[0].values[0], value: data.rows[0].values[1]});
                        this.form.setControlValue('place_type_id',  {key: data.rows[0].values[2], value: data.rows[0].values[3]});
                        this.form.setControlValue('coordinates',  data.rows[0].values[4]);
                })
            }
        };
        
    
    
    // выбор типа добавляемого места
     const resOnChoiceOfPlace = {
            title: 'Оберить тип нового місця',
            acceptBtnText: "create",
            cancelBtnText: "cancel",
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
                              radioItems: [{ value: 2, viewValue: 'ПЕРЕХРЕСТЯ' },{ value: 3, viewValue: 'ДІЛЯНКА' },{ value: 1, viewValue: 'КОЛОДЯЗЬ' }],
                              type: 'radio'
                            } 
                        ]
                    }
                ]
        };
        
     //вопрос по выбору типа места
    const addCreatePlace = (param_type) =>{
        if(param_type[0].value == 1){
            console.log('Type place: ' + param_type[0].value)
            this.openModalForm(formNewWell, addWellCallBack);
        } else if(param_type[0].value == 2){
            console.log('Type place: ' + param_type[0].value)
            this.openModalForm(formNewCross, addCrossCallBack);
        } else if(param_type[0].value == 3){
            console.log('Type place: ' + param_type[0].value)
            this.openModalForm(formNewArea, addAreaCallBack);
        }else{
            console.log('Неіснуючий тип')
        }
    }
    
    
    //event click create new place
        let iconPl = document.getElementById('places_idIcon');
        iconPl.addEventListener("click", (e) =>  {
            e.stopPropagation();
        //   this.openModalForm(resOnChoiceOfPlace, addCreatePlace);
        })
        iconPl.style.fontSize = "35px";
    
    //******** END add new places ********
    
     this.form.onControlValueChanged('places_id', this.onTypePlace);
     this.form.onControlValueChanged('Value', this.onPlanDuration);
     this.form.onControlValueChanged('ac_pl_types_id', this.onUnits);
     
     
    const claimStat = {
        queryCode: 'avr_claim_status_is_5',
        parameterValues: [{key: '@claim_id', value: this.form.getControlValue('Claim_ID')}]
    };
    
    this.queryExecutor.getValue(claimStat).subscribe(data =>{
        if (data == 5 || order_status == 10){
            this.claimStat = data;
            let btn_add = document.querySelectorAll('.add-btn');
            for(let i = 0; i < btn_add.length; i++){
                btn_add[i].style.display = 'none'
            };
            this.form.removeControl('btn_delete_action');
            
            this.form.disableControl('places_id');
            this.form.disableControl('coordinates');
            this.form.disableControl('place_type_id');
            this.form.disableControl('ac_pl_types_id');
            this.form.disableControl('Units_Id');
            this.form.disableControl('Value');
            this.form.disableControl('Plan_duration');
            this.form.disableControl('Plan_start_date');
            this.form.disableControl('Start_from');
            this.form.disableControl('Finish_at');
            this.form.disableControl('Fact_duration');
            this.form.disableControl('Sort_index');
            this.form.disableControl('Diameters_ID');
            this.form.disableControl('Is_Goal');
        }
    });
        
//********** END INIT  **************//
    },
    onDeleteAction:function(answer){
        if (answer){
            const trueDelete = {
                    queryCode: 'avr_delete_action_cascade',
                    parameterValues: [{ key: '@action_id',value: this.id}]};
                this.queryExecutor.getValue(trueDelete).subscribe(data =>{
                   this.back();
                });
        }
    },
    
    onPlanDuration:function(val){
        const queryPlan = {
            queryCode: 'avk_onCoutingPlanDuration',
            parameterValues: [{
                        key: '@Value',
                        value: val
                    },{
                        key: '@action_type',
                        value: this.form.getControlValue('ac_pl_types_id')
                    }
                ]};
    
        this.queryExecutor.getValue(queryPlan).subscribe(data =>{
            if (data == null){
                this.form.setControlValue('Plan_duration', '01:00');
            }else{
                let time = data.substring(0,5);
                this.form.setControlValue('Plan_duration', time);
            }
        });
    },
    
    onUnits: function(act_type){
        if (act_type) {
        if (typeof act_type === "string") {
             return
        }else{
                if(act_type == null){
                    this.form.setControlValue('Units_Id', {});
                    this.form.setControlValue('Value', null);
                    this.form.setControlValue('Plan_duration', null);
                }else{
                const unit = {
                    queryCode: 'avr_selectUnitsActionType',
                    parameterValues: [{
                                key: '@act_type',
                                value: act_type
                            }
                        ]};
                
                this.queryExecutor.getValues(unit).subscribe(data =>{
                    if (data.rows["length"] == 0){
                        this.form.setControlValue('Units_Id', {});
                        this.form.setControlValue('Value', 1);
                    }else{
                      this.form.setControlValue('Units_Id', {key: data.rows[0].values[0], value: data.rows[0].values[1]});
                      this.form.setControlValue('Value', 1);  
                    }
                    
                });
                }
            }
        }
    },
    // onActionType:function(type){
    //     if(type == null){
    //         this.form.disableControl('ac_pl_types_id');
    //         this.form.setControlValue('ac_pl_types_id',{});
    //     }else{
    //         this.form.enableControl('ac_pl_types_id');
    //         let parameters = [{parameterCode: '@place_type',parameterValue: type}];
    //         this.form.setControlParameterValues('ac_pl_types_id',parameters);
    //     }
        
    // },
    onTypePlace: function(place_id){
        
         if(place_id == null){
            this.form.setControlValue('place_type_id', {key: null, value: null});
            // this.form.setControlValue('district_id', {key: null, value: null});
            this.form.setControlValue('coordinates',  null);
        }else{
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
                    // this.form.setControlValue('district_id', {key: data.rows[0].values[2], value: data.rows[0].values[3]});
                    this.form.setControlValue('coordinates',  data.rows[0].values[4]);
            });
        }
        
    },
    
     validate: function() {
  
        const claim_status = this.form.getControlValue('claim_stat_id')
        const order_status = this.form.getControlValue('order_stat_id')
        
        if(this.claimStat == 5 || claim_status == 5){
            return 'ЗАЯВКА ЗАКРИТА! - вносити правки заборонено'
        }else if (order_status == 10){
            return 'У виконаному виїзді вносити правки заборонено'
        }else{
// 			return true

    		let type = this.form.getControlValue('ac_pl_types_id');
    		let datetimeOn = this.form.getControlValue('Finish_at');
    		let claim_ID = this.form.getControlValue('Claim_ID');
    		let countOff = this.form.getControlValue('countOff');

    		if(type == 245 && countOff > 0){
        		  const queryDateOff = { 
                    title: 'Підключити будинки до водопостачання?',
                    acceptBtnText: "ok",
                    cancelBtnText: "cancel"
        		  };
        		  
        		  const formDateOff = (dateOn) => {
        		    if(dateOn == false){
                        console.log('It is a  cancel!!!')
                    }else{
                        const body = {
                            queryCode: 'avr_SwitchON_allPlaces',
                            parameterValues:[{key: '@claim_ID', value: claim_ID},{key: '@SwitchOff_finish', value: datetimeOn }]
                            };
                        this.queryExecutor.submitValues(body).subscribe(data => {
                                console.log('It is OK: ' + data);
                            });
                    } 
        		  };
        		    
        		this.openModalForm(queryDateOff, formDateOff);
        		return true;
    		}
    		return true;
    	};
    },
    
    // afterSave(data){
        //  this.navigateTo(location.pathname.replace(localStorage.getItem('VirtualPath'), ""));
        //  this.navigateTo('sections/Actions/edit/'+ this.id);
    //     if(this.state != 'create'){
    //         this.back();
    //     }
         
    // }
};
}());
