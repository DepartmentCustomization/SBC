(function () {
  return {
    init: function() {
         this.form.setGroupVisibility("Group_Claims_Temp", false);
         this.form.setControlVisibility('Fact_finish_at', false);
         this.form.setControlVisibility('Is_Template', false);
        
        console.log(this.state);
        this.form.disableControl("Status_id");
       console.log(this.user)
        this.form.disableControl("User");
        this.form.disableControl("classes_id");
        this.form.disableControl("place_type_id");
        this.form.disableControl("district_id");
        this.form.disableControl("flat_number");
        this.details.setVisibility('Detail_Claim_Likns_new_claim', false);
                console.log('№ квартири: ' + this.form.getControlValue('flat_number'))
                console.log('Тип місця: ' + this.form.getControlValue('place_type_id'))
        // if (this.form.getControlValue('places_id') != null){
        //     this.form.disableControl("places_id");
        //     this.form.disableControl("flat_number");
        // }
        
        let status5 = this.form.getControlValue('Status_id');
        if(status5 == 5){
            this.form.disableControl("Status_id");
            
            let btn_add = document.querySelectorAll('.btn-add');
            for(let i = 0; i < btn_add.length; i++){
                btn_add[i].style.display = 'none'
            }
        }
        
       //выводит в название карточки номер заявки и дату создания
        let create = this.form.getControlValue("Created_at");
        if (create !== null){
            let options = {
                  day: 'numeric', 
                  month: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                };
            let create2 = create.toLocaleString('ru', options);
            console.log('Дата створення: ' + create2);
            this.form.setGroupTitle("Group_Claims", "ЗАЯВКА №  "+this.form.getControlValue("Claim_Number") + ' від '+ create2);
        };
        //END - выводит в название карточки номер заявки и дату создания
        
        //Houses -- flats
            this.form.onControlValueChanged('places_id', this.onFlats);
        
        //end Houses -- flats
        
        
        //Initiator_Claim
            this.form.disableControl('contact_type_name');
            this.form.disableControl('Number');
            this.form.disableControl('Job_name');
            let cont = this.form.getControlValue('contact_id');
            console.log('Инициатор:' + cont);
            console.log('Тип контакту: ' + this.form.getControlValue('contact_type_name'));
            this.form.onControlValueChanged('contact_id', this.onPhoneType)
        //end Initiator_Claim
        

       var status = this.form.getControlValue("Status_id");
        if ( status == null){
            this.form.disableControl("Status_id");
            this.form.setControlValue("Status_id", {key: 1, value: 'Нова'});
        };
        
        console.log('Кількість виїздів: ' + this.form.getControlValue('count_orders'))
        
        var status = this.form.getControlValue("Status_id");
        if (status == 1 || status == 2){
             this.form.disableControl("Status_id");
         };
         if (status == 1 || status == 2 || status == 5 || status == 6){
             this.form.disableControl("is_noBalans");
         };
          if (status == 11){
             this.form.setControlValue('is_noBalans', true);
             this.form.disableControl("Status_id");
         };
         
        //is_noBalans cheked
            this.form.onControlValueChanged('is_noBalans', this.onBalans)
        //end is_noBalsns cheked
          
         this.form.onControlValueChanged("Organization_id", this.onClaimsStatus_2);
        
        var status2 = this.form.getControlValue("Status_id");
        var order = this.form.getControlValue("count_orders");
            if (status2 == 2 && order > 0){
                this.form.setControlValue("Status_id", {key: 3, value: 'У роботі'});
                this.form.enableControl("is_noBalans");
            }
     
        const myForm = {
                title: "Пов'язані заявки",
                text: "Створити нову чи додати (приєднати) існуючу? ",
                acceptBtnText: 'create',
                cancelBtnText: 'add'
        };
    
        const formCallback = (response) => {
                    if (response === true) {
                        console.log('New claim')
                        const id = this.form.getControlValue('claims_id');
                        this.navigateTo('/sections/Claims/edit/'+id+'/simple/Detail_Claim_Likns_new_claim/Form_Link_New_Claims');
                    }else {
                        console.log('Add claim')
                    }
        };
            
        // var btn= document.querySelector('#Detail_Claim_Likns .btn-add');
        //     btn.addEventListener('click', ()=> {
        //         this.openModalForm(myForm, formCallback) 
        //     });
            
            
    // modal for new contact
        const formNewContact = {
            title: 'Новий заявник',
            acceptBtnText: "save",
            cancelBtnText: "cancel",
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
                            //   queryListCode: "dir_Contact_typesSelectRows",
                              queryListCode: "list_Contact_type_for_Modal",
                              listDisplayColumn: "Name",
                              listKeyColumn: "Id",
                              type: 'select'  
                            },
                            {
                              code:'m_phone_number',
                              placeholder:'Номер телефону',
                              hidden: false,
                              required: false,
                              position: 2,
                              fullScreen: false,
                             // value: this.form.getControlValue('phone_number'),
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
            if (param === false){
                // debugger;
                console.log('It`s a cancel');
            }else{
                //  debugger;
                console.log('It`s a good');
                const body = {
                    queryCode: 'avr_Insert_new_Contact_of_Modal',
                    parameterValues: param
                }
                this.queryExecutor.getValues(body).subscribe(data => {
                    //  debugger;
                    console.log(data);
                    this.form.setControlValue('contact_id', {key: data.rows[0].values[0], value: data.rows[0].values[1]});
                    this.form.setControlValue('Number',  data.rows[0].values[2]);
                });
            }
        }
        
        var icon = document.getElementById('contact_idIcon');
        icon.addEventListener("click", (e) =>  {
            e.stopPropagation();
            this.openModalForm(formNewContact, addContactCallBack);
        });
        icon.style.fontSize = "35px";
    // END modal for new contact 
    
    
    // modal for new Place
        const formNewPlace = {
            title: 'Новє місце',
            acceptBtnText: "save",
            cancelBtnText: "cancel",
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
                              position: 1,
                              fullScreen: true,
                              queryListCode: "list_House_for_modal",
                              listDisplayColumn: "Name",
                              listKeyColumn: "Id",
                              type: 'select'
                             // lookupType: 'list'
                            },
                            {
                              code:'m_house_number',
                              placeholder:'№ будинку',
                              hidden: false,
                              required: true,
                              position: 2,
                              fullScreen: false,
                              value: '',
                              type: 'text'  
                            },
                            {
                              code:'m_house_letr',
                              placeholder:'літера',
                              hidden: false,
                              required: false,
                              position: 3,
                              fullScreen: false,
                              value: '',
                              type: 'text'  
                            },
                            {
                              code:'m_Place_type_ID',
                              placeholder:'Тип місця',
                              hidden: false,
                              required: true,
                              position: 4,
                              fullScreen: false,
                              queryListCode: "dir_Place_typesSelectRows",
                              listDisplayColumn: "Name",
                              listKeyColumn: "Id",
                              type: 'select'   
                            },
                            {
                              code:'m_District',
                              placeholder:'Район',
                              hidden: false,
                              required: false,
                              position: 3,
                              fullScreen: false,
                              queryListCode: "dir_DistrictsSelectRows",
                              listDisplayColumn: "Name",
                              listKeyColumn: "Id",
                              type: 'select' 
                            }
                            
                        ]
                    }
                ]
        }
        
        const questionForm={
          title: 'Такий будинок вже є в базі!',
          singleButton: true
        };
        const callBackQues= (ok) =>{
            console.log(ok);
        };
        
        const addPlaceCallBack = (param) => {
            if (param === false){
                console.log('It`s a cancel');
            }else{
                console.log('It`s a good');
                const body = {
                    queryCode: 'avr_Insert_new_Place_of_Modal',
                    parameterValues: param
                }
                this.queryExecutor.getValues(body).subscribe(data => {
                     
                     if (data.rows.length === 0){
                         this.openModalForm(questionForm, callBackQues);
                     }else{
                        this.form.setControlValue('places_id', {key: data.rows[0].values[0], value: data.rows[0].values[1]});
                        this.form.setControlValue('place_type_id',  {key: data.rows[0].values[2], value: data.rows[0].values[3]});
                        this.form.setControlValue('district_id',  {key: data.rows[0].values[4], value: data.rows[0].values[5]});
                     }
                })
            }
        }
        


        const quPlaceToCreate = {
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
                              radioItems: [{ value: 2, viewValue: 'ПЕРЕХРЕСТЯ' },{ value: 3, viewValue: 'ДІЛЯНКА' },{ value: 1, viewValue: 'ІНЩІ МІСЦЯ' }],
                              type: 'radio'
                            } 
                        ]
                    }
                ]
        };
        
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
                              code:'m_Place_type_ID',
                              placeholder:'Тип місця',
                              hidden: true,
                              required: true,
                              position: 4,
                              fullScreen: false,
                              queryListCode: "dir_Place_typesSelectRows",
                              listDisplayColumn: "Name",
                              listKeyColumn: "Id",
                              type: 'select',
                              value: 19
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
                })
            }
        };
        
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
                              placeholder:'Перший будинок',
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
                              placeholder:'Другий будинок',
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
                              code:'m_Place_type_ID',
                              placeholder:'Тип місця',
                              hidden: true,
                              required: true,
                              position: 4,
                              fullScreen: false,
                              queryListCode: "dir_Place_typesSelectRows",
                              listDisplayColumn: "Name",
                              listKeyColumn: "Id",
                              type: 'select',
                              value: 10
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
                })
            }
        };
        
    //вопрос по выбору типа места
        const addCreatePlace = (param_type) =>{
            if(param_type[0].value == 1){
                console.log('Type place: ' + param_type[0].value)
                this.openModalForm(formNewPlace, addPlaceCallBack);
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
        var iconPl = document.getElementById('places_idIcon');
        iconPl.addEventListener("click", (e) =>  {
            e.stopPropagation();
           // this.openModalForm(formNewPlace, addPlaceCallBack);
        //   this.openModalForm(quPlaceToCreate, addCreatePlace);
        })
        iconPl.style.fontSize = "35px";
            
    // END modal for new Place
    
    this.form.onControlValueChanged('Types_id',this.onClass);
    
        const claim_ID = this.form.getControlValue('claims_id');
        const result = {
                        queryCode: 'list_validate_Action_Zasyv',
                        parameterValues: [{
                                key: '@claim_ID',
                                value: claim_ID
                            }]
                    };
                  this.queryExecutor.getValue(result).subscribe(data => {
                            console.log('Різниця в кількості запорної арматури (0- нема, 1- є):  ' + data)
        			// 		this.logger(data)
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
                            console.log('На роботи по розриттю чи є робота по засипу (0- все ок, 1- помилка):  ' + data)
        			// 		this.logger(data)
        					this.form.setControlValue('is_Delve', data)
                    });
    
//end init()     
    },

    onPhoneType: function(contact_id){
        
        if (contact_id == null){
            this.form.setControlValue('Number', null);
            this.form.setControlValue('contact_type_name',null);
        }else{
          const phoneType = {
                queryCode: 'avr_Phone_and_Type_Contact',
                parameterValues: [
                {
                    key: '@contact_id',
                    value: contact_id
                }
            ]
            };
            this.queryExecutor.getValues(phoneType).subscribe(data => {
                    this.form.setControlValue('Number', data.rows[0].values[0]);
                    this.form.setControlValue('contact_type_name', data.rows[0].values[1]);
            });
        }
    },
    
    onClass: function(types_id){
        console.log(types_id)
        const classes = {
                queryCode: 'avr_select_class_with_type',
                parameterValues: [
                {
                    key: '@types_id',
                    value: types_id
                }
            ]
        };
        this.queryExecutor.getValue(classes).subscribe(data => {
                    //  debugger;
                     console.log(data)
                    this.form.setControlValue('classes_id', data );
        });
    },

    onFlats: function(place_id){
        
        if(place_id == null){
            this.form.setControlValue('place_type_id', {key: null, value: null});
            this.form.setControlValue('district_id', {key: null, value: null});
            this.form.setControlValue('flat_number',  {key: null, value: null} );
        }else{
            this.form.enableControl("flat_number");
            console.log('Place Id: ' + place_id);
                let number =[{parameterCode: '@place_id', parameterValue: place_id}];
                this.form.setControlParameterValues('flat_number', number);
                let type = [{parameterCode: '@type_place', parameterValue: place_id}];
                this.form.setControlParameterValues('place_type_id',  type );
            
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
    
    onBalans: function(check){
         if (check === true){
             console.log('Забалансова организація');
             this.form.setControlValue("Status_id", {key: 11, value: 'Забалансова организація'});
         } else{
             console.log('У роботі');
              this.form.setControlValue("Status_id", {key: 3, value: 'У роботі'});
         }
    },
    
    onClaimsStatus_2: function(org){ 
        var status = this.form.getControlValue("Status_id");
           if (org != 28 && status == 1)
                this.form.setControlValue("Status_id", {key: 2, value: 'Розподілена'})
    },
 
   validate: function() {
          const finishValue  = this.form.getControlValue('Fact_finish_at');
          const st = this.form.getControlValue('Status_id');   
            if(st == 5){
              return 'У ЗАКРИТУ ЗАЯВКУ вносити правки заборонено'
            }
            
        if(st !=5 && finishValue !== null){
    
                let err_zasuv = this.form.getControlValue('is_Zasuv');
                let err_delve = this.form.getControlValue('is_Delve');
                    
                        if (err_zasuv == 1){// 1- error , 0 - good
							 return 'Не збігається кількість робіт с запорною арматурою'
						 }else if(err_delve == 1){
						     return 'Відсутня робота по запису'
						 }else{
						    let five_min = 300000;
			            	let finishDate = finishValue.getTime();
							let currentDate = new Date().getTime() - five_min;
							
							if (finishDate < (currentDate)) {
								 return  "Дата закриття некоректна!";
							}else{
							    return true
							}
						}
        }else{
			return true
		}
},
    afterSave: function(data){
            console.log('Server response : ', data);
        debugger;
            
		const myForm = {
			title: 'Создана нова заявка',
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
							value: '№ ' + this.getRowValueByCode(data, "Id"),
							type: 'text'
					    }
					    ,
						{
						    code:'2',
						    placeholder:' ',
						    hidden:false,
						    required: false,
						    position: 2,
						    fullScreen: true,
							value: 'Первинний тип заявки: ' + this.getRowValueByCode(data, "First_Types_name"),
							type: 'text'
						},{
						    code:'3',
						    placeholder:' ',
						    hidden:true,
						    required: false,
						    position: 1,
						    fullScreen: true,
							value: this.getRowValueByCode(data, "Id"),
							type: 'number'
					    }
					]
				}
			]
		};

        var created_at = this.form.getControlValue('Created_at');
        	if (created_at == null) {
                this.openModalForm(myForm, this.formCallback.bind(this));
        	};
    },
    formCallback: function(response) {
        debugger;
        // let id = this.getRowValueByCode(data, 'Id')
            //  this.navigateTo(location.pathname.replace(localStorage.getItem('VirtualPath'), ""));
             this.navigateTo('/sections/Claims/edit/' + response[2].value)
    	}
    
}
;
}());
