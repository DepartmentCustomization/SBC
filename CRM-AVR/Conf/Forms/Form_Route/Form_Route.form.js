(function() {
    return {
        addAreaParamFields: function(form) {
            let paramMaxNum = (form.config.fieldGroups[1].fields.length);
            let diameter = {
                code:'diameter_' + Number(paramMaxNum),
                placeholder: 'Діаметр (см)',
                hidden: false,
                required: false,
                position: paramMaxNum + 1,
                fullScreen: false,
                queryListCode: 'dir_DiametersSelectRows',
                listDisplayColumn: 'Size',
                listKeyColumn: 'Id',
                type: 'select',
                width: '50%'
            };
            let length = {
                code: 'length_' + Number(paramMaxNum),
                fullScreen: false,
                hidden: false,
                placeholder: 'Довжина (м)',
                position: paramMaxNum + 2,
                required: false,
                type: 'number',
                width: '50%'
            };
            form.addControl('areaParams', diameter);
            form.addControl('areaParams', length);
        },
        onTempBuildingChange() {
            let area = this.form.getControlValue('temp_place_area');
            let district = this.form.getControlValue('place_district_id');
            let street = this.form.getControlValue('place_street1_id');
            let building = this.form.getControlValue('place_building');
            if((area !== null && typeof (area) === 'number') &&
                (district !== null && typeof (district) === 'number') &&
                (street !== null && typeof (street) === 'number') &&
                (building !== null && building.trim())) {
                const makeBuildingName = {
                    queryCode: 'makeBuildingName',
                    parameterValues: [
                        {
                            key: '@street',
                            value: street
                        },
                        {
                            key: '@building_name',
                            value: building
                        }
                    ]
                };
                this.queryExecutor.getValue(makeBuildingName).subscribe(data => {
                    if(data) {
                        this.form.setControlValue('place_building_name', data);
                        document.getElementById('new_temp_placeAdd').disabled = false;
                    }
                });
            } else {
                document.getElementById('new_temp_placeAdd').disabled = true;
            }
        },
        init:function() {
            this.form.setGroupVisibility('Group_Route_TempPlace', false);
            this.form.setControlValue('GUIDPack', this.GenerateUUID());
            this.details.onCellClick('Detail_Area', this.sortAreas.bind(this));
            let btn_addTempPlace = document.getElementById('btn_Add_AreaTempPlace');
            let new_temp_placeAdd = document.getElementById('new_temp_placeAdd');
            let new_temp_placeReturn = document.getElementById('new_temp_placeReturn');
            let btn_add_area = document.getElementById('btn_Add_Area');
            let btn_AddAreaHouses = document.getElementById('btn_AddAreaHouses');
            let btn_Add_AreaPlace = document.getElementById('btn_Add_AreaPlace');
            btn_add_area.disabled = false;
            new_temp_placeAdd.disabled = true;
            this.form.setGroupVisibility('Group_Route_Area', false);
            this.form.setControlVisibility('btn_AddAreaHouses', false);
            document.querySelector('#Detail_RoutePlaces .add-btn').style.display = 'none';
            if(this.state === 'create') {
                btn_add_area.disabled = true;
                btn_Add_AreaPlace.disabled = true;
                const userOrg = {
                    queryCode: 'avr_onOrganization_toUser',
                    parameterValues:[]
                };
                this.queryExecutor.getValues(userOrg).subscribe(data =>{
                    if (data.rows[0] !== undefined) {
                        this.form.setControlValue('OrgId', {key: data.rows[0].values[0], value: data.rows[0].values[1]})
                    }
                });
            } else {
                this.form.disableControl('OrgId');
            }
            btn_add_area.addEventListener('click', ()=>{
                this.form.setGroupVisibility('Group_Route_Area', true);
            });
            this.form.disableControl('OrgId');
            this.form.disableControl('Author_userID');
            this.form.disableControl('ChangeBy_userID');
            this.form.disableControl('GroupLenght');
            this.form.disableControl('BoreCountAll');
            this.form.disableControl('place_building_name');
            this.form.onControlValueChanged('Type_area', this.chooseTypeArea);
            this.form.onControlValueChanged('temp_place_area', this.onTempBuildingChange);
            this.form.onControlValueChanged('place_district_id', this.onTempBuildingChange);
            this.form.onControlValueChanged('place_street1_id', this.onTempBuildingChange);
            this.form.onControlValueChanged('place_building', this.onTempBuildingChange);
            new_temp_placeAdd.addEventListener('click', function() {
                let place_type = this.form.getControlValue('temp_place_type');
                const addTempPlace = {
                    queryCode: 'Temporal_PlacesInsert',
                    parameterValues:[
                        {
                            key: '@area',
                            value: this.form.getControlValue('temp_place_area')
                        },
                        {
                            key: '@type',
                            value: place_type
                        },
                        {
                            key: '@district',
                            value: this.form.getControlValue('place_district_id')
                        },
                        {
                            key: '@street',
                            value: this.form.getControlValue('place_street1_id')
                        },
                        {
                            key: '@Name',
                            value: this.form.getControlValue('place_building_name')
                        },
                        {
                            key: '@entity',
                            value: 'Маршрут'
                        }
                    ]
                };
                this.queryExecutor.getValues(addTempPlace).subscribe(data =>{
                    if(data) {
                        document.getElementById('new_temp_placeReturn').click();
                        const adminVDKorg = 10;
                        const notifyTempPlaceCreated = {
                            url: 'sections/Temporal_Places/edit/' + data.rows[0].values[0],
                            notificationTypeCode: 'NewTemporaryPlace',
                            text: data.rows[0].values[2],
                            notificationPriorityCode: 'Middle',
                            organisationIds: [adminVDKorg],
                            hasAudio: true
                        };
                        this.createOrganisationsNotification(notifyTempPlaceCreated);
                        document.getElementById('new_temp_placeReturn').click();
                        const parameter = [
                            { key: '@route_id', value: this.id }
                        ];
                        this.details.loadData('Detail_RoutePlaces', parameter);
                    }
                })
            }.bind(this));
            new_temp_placeReturn.addEventListener('click', function() {
                this.form.setControlValue('temp_place_type', null)
                this.form.setControlValue('place_street1_id', null)
                this.form.setControlValue('place_district_id', null)
                this.form.setControlValue('place_building', null)
                this.form.setControlValue('place_building_name', null)
                this.form.setControlValue('temp_place_area', null)
                new_temp_placeAdd.disabled = true;
                this.form.setControlVisibility('btn_Add_AreaTempPlace', true)
                this.form.setGroupVisibility('Group_Route_TempPlace', false);
            }.bind(this));
            btn_addTempPlace.addEventListener('click', function() {
                let route_id = this.form.getControlValue('route_id');
                this.form.setControlVisibility('btn_Add_AreaTempPlace', false)
                let routeParam = [{ parameterCode: '@route_id', parameterValue: route_id }];
                this.form.setControlParameterValues('temp_place_area', routeParam);
                let crossParam = [{ parameterCode: '@notCross', parameterValue: true }];
                this.form.setControlParameterValues('temp_place_type', crossParam);
                this.form.setGroupVisibility('Group_Route_TempPlace', true);
            }.bind(this));
            document.getElementById('btn_AddAreaHouses').addEventListener('click', function() {
                this.form.setControlValue('GUIDPack', this.GenerateUUID());
                let areaType = this.form.getControlValue('Type_area');
                // Тип участка - дома
                if(areaType === '1') {
                    const formFields = {
                        title: 'Створення дворової ділянки',
                        acceptBtnText: 'ok',
                        cancelBtnText: 'exit',
                        fieldGroups: [
                            {
                                code: 'areaData',
                                name: 'Загальні дані',
                                expand: true,
                                position: 1,
                                fields: [
                                    {
                                        code: 'BoreQty',
                                        fullScreen: false,
                                        hidden: false,
                                        placeholder: 'Кількість люків',
                                        position: 2,
                                        required: false,
                                        type: 'number',
                                        width: '50%'
                                    }
                                ]
                            },
                            {
                                code: 'areaParams',
                                name: 'Параметри',
                                expand: true,
                                position: 1,
                                fields: [
                                    {
                                        code:'btn_AddRowParam',
                                        placeholder: 'Додати',
                                        hidden: false,
                                        required: true,
                                        position: 1,
                                        fullScreen: false,
                                        type: 'button',
                                        width: '51%'
                                    },
                                    {
                                        code:'diameter_1',
                                        placeholder: 'Діаметр (мм)',
                                        hidden: false,
                                        required: true,
                                        position: 2,
                                        fullScreen: false,
                                        queryListCode: 'dir_DiametersSelectRows',
                                        listDisplayColumn: 'Size',
                                        listKeyColumn: 'Id',
                                        type: 'select',
                                        width: '50%'
                                    },
                                    {
                                        code: 'length_1',
                                        fullScreen: false,
                                        hidden: false,
                                        placeholder: 'Довжина (м)',
                                        position: 3,
                                        required: true,
                                        type: 'number',
                                        width: '50%'
                                    }
                                ]
                            }
                        ]
                    };
                    this.openModalForm(formFields, this.onPlacesAreaSave.bind(this), this.afterModalFormOpen.bind(this));
                }
                // Тип участка - улица
                if(areaType === '2') {
                    const formFields = {
                        title: 'Створення вуличної ділянки',
                        acceptBtnText: 'ok',
                        cancelBtnText: 'exit',
                        fieldGroups: [
                            {
                                code: 'areaData',
                                name: 'Загальні дані',
                                expand: true,
                                position: 1,
                                fields: [
                                    {
                                        code:'areaStreet',
                                        placeholder: 'Вулиця',
                                        hidden: false,
                                        required: true,
                                        position: 2,
                                        fullScreen: true,
                                        queryListCode: 'List_Streets',
                                        listDisplayColumn: 'streetName',
                                        listKeyColumn: 'Id',
                                        type: 'select',
                                        width: '75%'
                                    },
                                    {
                                        code: 'BoreQty',
                                        fullScreen: false,
                                        hidden: false,
                                        placeholder: 'Кількість люків',
                                        position: 3,
                                        required: false,
                                        type: 'number',
                                        width: '25%'
                                    }
                                ]
                            },
                            {
                                code: 'areaParams',
                                name: 'Параметри',
                                expand: true,
                                position: 1,
                                fields: [
                                    {
                                        code:'btn_AddRowParam',
                                        placeholder: 'Додати',
                                        hidden: false,
                                        required: true,
                                        position: 1,
                                        fullScreen: false,
                                        type: 'button',
                                        width: '51%'
                                    },
                                    {
                                        code:'diameter_1',
                                        placeholder: 'Діаметр (мм)',
                                        hidden: false,
                                        required: true,
                                        position: 2,
                                        fullScreen: false,
                                        queryListCode: 'dir_DiametersSelectRows',
                                        listDisplayColumn: 'Size',
                                        listKeyColumn: 'Id',
                                        type: 'select'
                                    },
                                    {
                                        code: 'length_1',
                                        fullScreen: false,
                                        hidden: false,
                                        placeholder: 'Довжина (м)',
                                        position: 3,
                                        required: true,
                                        type: 'number'
                                    }
                                ]
                            }
                        ]
                    };
                    this.openModalForm(formFields, this.onStreetAreaSave.bind(this), this.afterModalFormOpen.bind(this));
                }
            }.bind(this));
            // модалка добавления дома к участку  >>
            btn_Add_AreaPlace.addEventListener('click', function(event) {
                const formChangedArea = {
                    title: 'Внести дані',
                    acceptBtnText:'create',
                    cancelBtnText: 'cancel',
                    fieldGroups: [{
                        code: 'areas',
                        name: 'Інформація',
                        expand: true,
                        position: 1,
                        fields: [
                            {
                                code:'area',
                                placeholder: 'Ділянка',
                                hidden: false,
                                required: true,
                                position: 1,
                                fullScreen: true,
                                queryListCode: 'List_RouteHouseAreas',
                                filterList: [{parameterCode: '@route_id', parameterValue: this.id } ],
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select'
                            },
                            {
                                code:'place',
                                placeholder: 'Будинок',
                                hidden: false,
                                required: true,
                                position: 2,
                                fullScreen: true,
                                queryListCode: 'List_Places',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select'
                            }
                        ]
                    }]
                }
                this.openModalForm(formChangedArea, this.addAreaPlace.bind(this), this.afterModalFormOpen.bind(this));
            }.bind(this));
        }, // END INIT
        afterSave: function(data) {
            if(data) {
                let urlText = 'sections/Routes/edit/' + data.rows[0].values[0];
                this.navigateTo(urlText);
            }
        },
        afterModalFormOpen: function(form) {
            form.formConfig = this;
            this.formModalConfig = form;
            if(document.getElementById('btn_AddRowParam')) {
                document.getElementById('btn_AddRowParam').addEventListener('click', ()=> {
                    this.addAreaParamFields(form);
                })
            }
        },
        getInputAreaParam: function() {
            this.parameters_value = [];
            let fieldsLen = this.formModalConfig.config.fieldGroups[1].fields.length;
            let arr = this.formModalConfig.config.fieldGroups[1].fields;
            arr.forEach(function(item, i, arr) {
                if (item.code.length >= 'diameter'.length) {
                    if (item.code.substr(0, 'diameter'.length) === 'diameter') {
                        let Diam_Val = this.formModalConfig.getControlValue(item.code);
                        let Len_Val = this.formModalConfig.getControlValue(item.code.replace('diameter', 'length'));
                        if(Diam_Val && Len_Val) {
                            if(Len_Val > 1) {
                                let obj = {
                                    diameters: Diam_Val,
                                    lengths: Number(Len_Val)
                                }
                                this.parameters_value.push(obj);
                            }
                        }
                    }
                }
            }.bind(this));
            this.form.setControlValue('AreaParam', JSON.stringify(this.parameters_value));
            return JSON.stringify(this.parameters_value);
        },
        GenerateUUID: function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        AreasALL: [],
        config_AreasALL: [],
        sortAreas:function(column, row, value, event, indexOfColumnId) {
            const queryAreas = {
                queryCode: 'Sort_Areas_from_Modal',
                parameterValues: [{ key: '@route_id', value: this.id}]
            };
            this.queryExecutor.getValues(queryAreas).subscribe(function(data) {
                if(data.rows.length > 0) {
                    this.AreasALL = [];
                    const fieldsForm = {
                        title: 'Сортування ділянок',
                        acceptBtnText: 'save',
                        cancelBtnText: 'cancel',
                        fieldGroups: []
                    };
                    for(let i = 0; i < data.rows.length; i++) {
                        let field_group = {
                            code: 'Area' + i,
                            name: 'Ділянка ' + (i + 1),
                            expand: true,
                            position: i,
                            fields:[]
                        }
                        fieldsForm.fieldGroups.push(field_group);
                        let num_group = fieldsForm.fieldGroups.length - 1;
                        let field_1 = {
                            code: 'AreaLength' + i,
                            fullScreen: false,
                            hidden: false,
                            placeholder: 'Довжина',
                            position: 1,
                            required: false,
                            value: data.rows[i].values[1],
                            type: 'text',
                            width: '70%'
                        }
                        fieldsForm.fieldGroups[num_group].fields.push(field_1)
                        let field_2 = {
                            code: 'Sort' + i,
                            fullScreen: false,
                            hidden: false,
                            placeholder: '№',
                            position: 2,
                            required: false,
                            value: data.rows[i].values[2],
                            type: 'number',
                            width: '30%'
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
                        this.AreasALL.push({Id: 'Id' + i, value: 'Sort' + i});
                    } //for
                    this.openModalForm(fieldsForm, this.modalCallbackClose.bind(this), this.modalAreaPlace_Open.bind(this));
                } //if
            }.bind(this));
        },
        modalCallbackClose: function(data) {
            if(data) {
                if (data.length > 0) {
                    for(let j = 0; j < data.length; j += 3) {
                        const queryParam = {
                            queryCode: 'Update_Area_Sort_Modal',
                            parameterValues:[{key: '@Id', value: data[j + 2].value},
                                {key: '@sort', value: data[j + 1].value }
                            ]
                        };
                        this.queryExecutor.getValues(queryParam).subscribe(data => {
                        });
                    }
                }
                const parameters = [ { key: '@route_id', value: this.id }];
                this.details.loadData('Detail_Area', parameters);
            }
        },
        modalAreaPlace_Open: function(data) {
            let areasLen = this.AreasALL.length;
            if (areasLen > 0) {
                for(let j = 0; j < areasLen; j++) {
                    data.disableControl('AreaLength' + j);
                }
            }
            this.config_AreasALL = data;
        },
        addAreaPlace: function(response) {
            if (response) {
                let place = this.formModalConfig.getControlValue('place');
                let area = this.formModalConfig.getControlValue('area');
                const areaQuery = {
                    queryCode: 'InsertAreaPlace',
                    parameterValues:[
                        {
                            key: '@AreaID',
                            value: area
                        },
                        {
                            key: '@PlaceID',
                            value: place
                        },
                        {
                            key: '@UserId',
                            value: this.userId
                        }
                    ]
                };
                this.queryExecutor.getValue(areaQuery).subscribe(data=>{
                    if(data) {
                        const parameters = [ { key: '@route_id', value: this.id }];
                        this.details.loadData('Detail_RoutePlaces', parameters);
                    }
                });
            }
        },
        onPlacesAreaSave: function(response) {
            if (response) {
                if (Number(this.formModalConfig.getControlValue('length_1')) > 1) {
                    let paramData = this.getInputAreaParam();
                    this.form.setControlValue('BoreCount', this.formModalConfig.getControlValue('BoreQty'));
                    let obj = {
                        GUIDPack: this.form.getControlValue('GUIDPack'),
                        AreaParam: this.form.getControlValue('AreaParam'),
                        BoreCount: this.form.getControlValue('BoreCount')
                    }
                    this.details.create('Detail_RoutePlaces', obj);
                } else {
                    this.openPopUpInfoDialog('Помилка. Некоректні параметри!');
                }
            }
        },
        onStreetAreaSave: function(response) {
            if (response) {
                if (Number(this.formModalConfig.getControlValue('length_1')) > 1) {
                    let paramData = this.getInputAreaParam();
                    let street = this.formModalConfig.getControlValue('areaStreet');
                    let boreQty = this.formModalConfig.getControlValue('BoreQty')
                    // Insert данных по участку типа улица
                    const areaQuery = {
                        queryCode: 'avr_Route_CreateStreetArea',
                        parameterValues:[
                            {
                                key: '@RouteID',
                                value: this.id
                            },
                            {
                                key: '@BoreCount',
                                value: boreQty
                            },
                            {
                                key: '@StreetID',
                                value: street
                            },
                            {
                                key: '@AreaParam',
                                value: paramData
                            }
                        ]
                    };
                    this.queryExecutor.getValue(areaQuery).subscribe(data=>{
                        window.location.reload();
                    });
                } else {
                    this.openPopUpInfoDialog('Помилка. Некоректні параметри!');
                }
            }
        },
        chooseTypeArea:function(type_id) {
            if(type_id) {
                this.form.setControlVisibility('btn_AddAreaHouses', true);
            }
        }
    };
}());
