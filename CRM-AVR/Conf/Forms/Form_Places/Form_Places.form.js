(function() {
    return {
        init: function() {
            let typeHouse = this.form.getControlValue('place_types_id')
            if (typeHouse === 19) {
                this.form.disableControl('place_types_id');
                this.form.setGroupVisibility('Group_Places_houses', false);
                this.form.setGroupVisibility('Group_Places_Cross', true);
                this.form.setGroupVisibility('Group_Places_Area', false);
                this.details.setVisibility('Detail_Flats_in_Places', false);
                this.details.setVisibility('Detail_Count_Flats', false);
                this.form.setControlVisibility('place_types_id_ch', false);
                this.form.disableControl('change');
                this.form.disableControl('add_new_house');
                let cross = this.form.getControlValue('cross_name')
                if (cross !== null) {
                    this.form.setControlVisibility('cross_str_id1', false)
                    this.form.setControlVisibility('cross_str_id2', false)
                    this.form.disableControl('cross_name');
                }
            } else if (typeHouse === 6) {
                this.form.disableControl('place_types_id');
                this.form.setGroupVisibility('Group_Places_houses', false);
                this.form.setGroupVisibility('Group_Places_Cross', true);
                this.form.setGroupTitle('Group_Places_Cross', 'Колодязь')
                this.form.setGroupVisibility('Group_Places_Area', false);
                this.details.setVisibility('Detail_Flats_in_Places', false);
                this.details.setVisibility('Detail_Count_Flats', false);
                this.form.setControlVisibility('place_types_id_ch', false);
                this.form.disableControl('change');
                this.form.disableControl('add_new_house');
                let cross = this.form.getControlValue('cross_name')
                if (cross !== null) {
                    this.form.setControlVisibility('cross_str_id1', false)
                    this.form.setControlVisibility('cross_str_id2', false)
                    this.form.disableControl('cross_name');
                }
            } else if (typeHouse === 10) {
                this.form.disableControl('place_types_id');
                this.form.setGroupVisibility('Group_Places_houses', false);
                this.form.setGroupVisibility('Group_Places_Cross', false);
                this.form.setGroupVisibility('Group_Places_Area', true);
                this.form.setGroupVisibility('Group_Places_coord', false);
                this.details.setVisibility('Detail_Flats_in_Places', false);
                this.details.setVisibility('Detail_Count_Flats', false);
                this.form.setControlVisibility('place_types_id_ch', false);
                this.form.disableControl('change');
                this.form.disableControl('add_new_house');
                let area = this.form.getControlValue('area_name')
                if (area !== null) {
                    this.form.setControlVisibility('from_house', false)
                    this.form.setControlVisibility('to_house', false)
                    this.form.disableControl('area_name');
                }
            } else if (typeHouse === 11) {
                this.form.disableControl('streets_id');
                this.form.disableControl('place_types_id');
                this.form.setGroupVisibility('Group_Places_houses', true);
                this.form.setGroupVisibility('Group_Places_Cross', false);
                this.form.setGroupVisibility('Group_Places_Area', false);
                this.details.setVisibility('Detail_Flats_in_Places', true);
                this.details.setVisibility('Detail_Count_Flats', true);
                this.form.setControlVisibility('place_types_id_ch', false)
                this.form.enableControl('add_new_house');
                this.form.enableControl('change');
            } else if (typeHouse === 16 ||
                typeHouse === 17 ||
                typeHouse === 15 ||
                typeHouse === 28 ||
                typeHouse === 12 ||
                typeHouse === 14 ||
                typeHouse === 18 ||
                typeHouse === 20) {
                this.form.disableControl('streets_id');
                this.form.disableControl('place_types_id');
                this.form.setGroupVisibility('Group_Places_houses', true);
                this.form.setGroupVisibility('Group_Places_Cross', false);
                this.form.setGroupVisibility('Group_Places_Area', false);
                this.details.setVisibility('Detail_Flats_in_Places', false);
                this.details.setVisibility('Detail_Count_Flats', false);
                this.form.setControlVisibility('place_types_id_ch', false)
                this.form.enableControl('add_new_house');
                this.form.enableControl('change');
            } else if (typeHouse !== null) {
                this.form.disableControl('place_types_id');
                this.form.setGroupVisibility('Group_Places_houses', true);
                this.form.setGroupTitle('Group_Places_houses', 'Інші місця')
                this.form.setGroupVisibility('Group_Places_Cross', false);
                this.form.setGroupVisibility('Group_Places_Area', false);
                this.details.setVisibility('Detail_Flats_in_Places', false);
                this.details.setVisibility('Detail_Count_Flats', false);
                this.form.setControlVisibility('place_types_id_ch', false)
                this.form.enableControl('add_new_house');
                this.form.disableControl('change');
            } else {
                this.form.setGroupVisibility('Group_Places_houses', false);
                this.form.setGroupVisibility('Group_Places_Cross', false);
                this.form.setGroupVisibility('Group_Places_Area', false);
                this.form.setGroupVisibility('Group_Places_coord', false);
                this.form.setControlVisibility('place_types_id_ch', false);
                this.form.disableControl('add_new_house');
                this.form.disableControl('change');
            }
            this.form.onControlValueChanged('change', this.onChangeType);
            this.form.onControlValueChanged('add_new_house', this.onAddNewHouse);
            this.form.onControlValueChanged('place_types_id', this.onCross);
            this.form.onControlValueChanged('streets_id', this.onDistr)
        },
        onDistr: function(str_id) {
            if (typeof (str_id) === 'number') {
                const param = {
                    queryCode: 'list_info_for_House',
                    parameterValues: [
                        {
                            key: '@str_id',
                            value: str_id
                        }
                    ]
                };
                this.queryExecutor.getValues(param).subscribe(data => {
                    this.form.setControlValue('distincts_id', { key: data.rows[0].values[0], value: data.rows[0].values[1] });
                    this.form.setControlValue('Latitude', data.rows[0].values[2]);
                    this.form.setControlValue('Longitude', data.rows[0].values[3]);
                });
            }
        },
        onChangeType: function(ch) {
            if (ch === true) {
                this.form.setControlVisibility('place_types_id_ch', true);
            } else {
                this.form.setControlValue('place_types_id_ch', { key: null, value: null })
                this.form.setControlVisibility('place_types_id_ch', false);
            }
        },
        onAddNewHouse: function(add_house) {
            const formNewHouse = {
                title: 'Новий будинок',
                acceptBtnText: 'save',
                cancelBtnText: 'cancel',
                fieldGroups: [
                    {
                        code: 'ModalNewPlace',
                        expand: true,
                        position: 1,
                        fields: [
                            {
                                code: 'm_houses_id',
                                placeholder: 'Вулиця',
                                hidden: false,
                                required: true,
                                position: 1,
                                fullScreen: true,
                                queryListCode: 'list_House_for_modal',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select'
                            },
                            {
                                code: 'm_house_number',
                                placeholder: '№ будинку',
                                hidden: false,
                                required: true,
                                position: 2,
                                fullScreen: false,
                                value: '',
                                type: 'text'
                            },
                            {
                                code: 'm_house_letr',
                                placeholder: 'літера',
                                hidden: false,
                                required: false,
                                position: 3,
                                fullScreen: false,
                                value: '',
                                type: 'text'
                            },
                            {
                                code: 'm_District',
                                placeholder: 'Район',
                                hidden: false,
                                required: false,
                                position: 3,
                                fullScreen: false,
                                queryListCode: 'dir_DistrictsSelectRows',
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                type: 'select'
                            }
                        ]
                    }
                ]
            };
            const questionForm = {
                title: 'Такий будинок вже є в базі!',
                acceptBtnText: 'ok'
            };
            const callBackQues = (ok) => {
                console.log(ok);
            };
            const callBack = (rest) => {
                if (rest === false) {
                    this.form.setControlValue('add_new_house', false);
                } else {
                    const body = {
                        queryCode: 'avr_Insert_new_House_of_Modal',
                        parameterValues: rest
                    }
                    this.queryExecutor.getValues(body).subscribe(data => {
                        if (data.rows.length === 0) {
                            this.openModalForm(questionForm, callBackQues);
                        }
                    });
                    this.form.setControlValue('add_new_house', false);
                }
            };
            if (add_house === true) {
                this.openModalForm(formNewHouse, callBack)
            }
        },
        logger: function(data) {
            if (data === null) {
                this.details.setTitle('Detail_Count_Flats', 'Кількість квартир: 0');
            } else {
                this.details.setTitle('Detail_Count_Flats', 'Кількість квартир: ' + data)
            }
        },
        onCross: function(type_id) {
            if (type_id === 19) {
                this.form.setGroupVisibility('Group_Places_houses', false);
                this.form.setGroupVisibility('Group_Places_Cross', true);
                this.form.setGroupVisibility('Group_Places_Area', false);
                this.form.setGroupVisibility('Group_Places_coord', true);
                this.details.setVisibility('Detail_Flats_in_Places', false);
                this.details.setVisibility('Detail_Count_Flats', false);
                this.form.disableControl('add_new_house');
                this.form.disableControl('change');
                this.form.setControlVisibility('cross_name', false);
            } else if (type_id === 6) {
                this.form.setGroupVisibility('Group_Places_houses', false);
                this.form.setGroupVisibility('Group_Places_Cross', true);
                this.form.setGroupTitle('Group_Places_Cross', 'Колодязь')
                this.form.setGroupVisibility('Group_Places_Area', false);
                this.form.setGroupVisibility('Group_Places_coord', true);
                this.details.setVisibility('Detail_Flats_in_Places', false);
                this.details.setVisibility('Detail_Count_Flats', false);
                this.form.disableControl('add_new_house');
                this.form.disableControl('change');
                this.form.setControlVisibility('cross_name', false);
                this.form.setControlVisibility('cross_str_id2', false);
                this.form.setControlTitle('cross_str_id1', 'Вулиця');
            } else if (type_id === 10) {
                this.form.setGroupVisibility('Group_Places_houses', false);
                this.form.setGroupVisibility('Group_Places_Cross', false);
                this.form.setGroupVisibility('Group_Places_coord', true);
                this.form.setGroupVisibility('Group_Places_Area', true);
                this.details.setVisibility('Detail_Flats_in_Places', false);
                this.details.setVisibility('Detail_Count_Flats', false);
                this.form.disableControl('add_new_house');
                this.form.disableControl('change');
            } else if (type_id === 11) {
                this.form.setGroupVisibility('Group_Places_houses', true);
                this.form.setGroupVisibility('Group_Places_Cross', false);
                this.form.setGroupVisibility('Group_Places_coord', true);
                this.form.setGroupVisibility('Group_Places_Area', false);
                this.details.setVisibility('Detail_Flats_in_Places', true);
                this.details.setVisibility('Detail_Count_Flats', true);
                this.form.enableControl('add_new_house');
                this.form.disableControl('change');
            } else if (type_id !== null) {
                this.form.setGroupVisibility('Group_Places_houses', true);
                this.form.setGroupVisibility('Group_Places_coord', true);
                this.form.setGroupTitle('Group_Places_houses', 'Інші місця')
                this.form.setGroupVisibility('Group_Places_Cross', false);
                this.form.setGroupVisibility('Group_Places_Area', false);
                this.details.setVisibility('Detail_Flats_in_Places', false);
                this.details.setVisibility('Detail_Count_Flats', false);
                this.form.enableControl('add_new_house');
                this.form.disableControl('change');
            } else if (type_id === null) {
                this.form.setGroupVisibility('Group_Places_houses', false);
                this.form.setGroupVisibility('Group_Places_Cross', false);
                this.form.setGroupVisibility('Group_Places_Area', false);
                this.details.setVisibility('Detail_Flats_in_Places', false);
                this.details.setVisibility('Detail_Count_Flats', false);
                this.form.disableControl('add_new_house');
                this.form.disableControl('change');
            }
        }
    };
}());
