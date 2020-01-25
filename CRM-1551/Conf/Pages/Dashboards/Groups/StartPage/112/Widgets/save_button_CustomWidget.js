(function() {
    return {
        title: ' ',
        hint: '',
        customConfig:
                    `
                    <style>
                    #saveButtonWrapper{
                        position: fixed;
                        right: 20px;
                        bottom: 20px;
                    }
                    #saveButton{
                        height: 40px;
                        width: 40px;
                        background-color: #ff4081;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                    }
                    .fa-save{
                        font-size: 25px;
                        color: #fff!important;
                    }
                    </style>
                    <div id="containerSave"></div>
                    `
        ,
        counter: 0,
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if(children.length) {
                children.forEach(child =>{
                    element.appendChild(child);
                });
            }
            return element;
        },
        init: function() {
            this.messageService.subscribe('saveValues', this.setSaveData, this);
        },
        afterViewInit: function() {
            const container = document.getElementById('containerSave');
            this.container = container;
            const saveButtonWrapper = this.createSaveButtonWrapper();
            container.appendChild(saveButtonWrapper);
        },
        createSaveButtonWrapper: function() {
            const saveButtonIcon = this.createElement('i', { className: 'fa fa-5x fa-save'});
            const saveButton = this.createElement(
                'div',{ id: 'saveButton' }, saveButtonIcon
            );
            saveButton.addEventListener('click', e => {
                e.stopImmediatePropagation();
                this.messageService.publish({name: 'saveAppeal'});
            });
            const saveButtonWrapper = this.createElement(
                'div', { id: 'saveButtonWrapper' }, saveButton
            );
            return saveButtonWrapper;
        },
        setSaveData: function(message) {
            if(message.accidentInfo) {
                this.event = message.accidentInfo;
                this.counter++;
            }
            if(message.callerInfo) {
                this.applicant = message.callerInfo;
                this.counter++;
            }
            if(message.patientInfo) {
                this.patient = message.patientInfo;
                this.counter++;
            }
            if(this.counter === 3) {
                debugger;
                this.counter = 0;
            }
        },
        setQueryParameters: function() {
            const parameters = [
                {
                  "key": "@user_id",
                  "value": "user_id",
                },
                {
                  "key": "@applicant_last_name",
                  "value": "applicant_last_name"
                },
                {
                  "key": "@applicant_first_name",
                  "value": "applicant_first_name"
                },
                {
                  "key": "@applicant_middle_name",
                  "value": "applicant_middle_name"
                },
                {
                  "key": "@applicant_person_phone",
                  "value": "applicant_person_phone"
                },
                {
                  "key": "@applicant_sex",
                  "value": "applicant_sex"
                },
                {
                  "key": "@applicant_birth_date",
                  "value": "applicant_birth_date"
                },
                {
                  "key": "@applicant_building_id",
                  "value": "applicant_building_id"
                },
                {
                  "key": "@applicant_entrance",
                  "value": "applicant_entrance"
                },
                {
                  "key": "@applicant_entercode",
                  "value": "applicant_entercode"
                },
                {
                  "key": "@applicant_storeysnumber",
                  "value": "applicant_storeysnumber"
                },
                {
                  "key": "@applicant_floor",
                  "value": "applicant_floor"
                },
                {
                  "key": "@applicant_flat",
                  "value": "applicant_flat"
                },
                {
                  "key": "@applicant_exit",
                  "value": "applicant_exit"
                },
                {
                  "key": "@applicant_moreinformation",
                  "value": "applicant_moreinformation"
                },
                {
                  "key": "@applicant_longitude",
                  "value": "applicant_longitude"
                }, 
                {
                  "key": "@applicant_latitude",
                  "value": "applicant_latitude"
                },
                {
                  "key": "@pacient_last_name",
                  "value": "pacient_last_name"
                },
                {
                  "key": "@pacient_first_name",
                  "value": "pacient_first_name"
                },
                {
                  "key": "@pacient_middle_name",
                  "value": "pacient_middle_name"
                },
                {
                  "key": "@pacient_person_phone",
                  "value": "pacient_person_phone"
                },
                {
                  "key": "@pacient_sex",
                  "value": "pacient_sex"
                },
                {
                  "key": "@pacient_birth_date",
                  "value": "pacient_birth_date"
                },
                {
                  "key": "@pacient_building_id",
                  "value": "pacient_building_id"
                },
                {
                  "key": "@pacient_entrance",
                  "value": "pacient_entrance"
                },
                {
                  "key": "@pacient_entercode",
                  "value": "pacient_entercode"
                },
                {
                  "key": "@pacient_storeysnumber",
                  "value": "pacient_storeysnumber"
                },
                {
                  "key": "@pacient_floor",
                  "value": "pacient_floor"
                },
                {
                  "key": "@pacient_flat",
                  "value": "pacient_flat"
                },
                {
                  "key": "@pacient_exit",
                  "value": "pacient_exit"
                },
                {
                  "key": "@pacient_moreinformation",
                  "value": "pacient_moreinformation"
                },
                {
                  "key": "@pacient_longitude",
                  "value": "pacient_longitude"
                }, 
                {
                  "key": "@pacient_latitude",
                  "value": "pacient_latitude"
                },
                {
                  "key": "@event_receipt_date",
                  "value": "event_receipt_date"
                },
                {
                  "key": "@event_work_line_id",
                  "value": "event_work_line_id"
                },
                {
                  "key": "@event_work_line_value",
                  "value": "event_work_line_value"
                },
                {
                  "key": "@event_category_id",
                  "value": "event_category_id"
                }, 
                {
                  "key": "@event_event_date",
                  "value": "event_event_date"
                }, 
                {
                  "key": "@event_applicant_type_id",
                  "value": "event_applicant_type_id"
                },
                {
                  "key": "@event_building_id",
                  "value": "event_building_id"
                },
                {
                  "key": "@event_entrance",
                  "value": "event_entrance"
                },
                {
                  "key": "@event_entercode",
                  "value": "event_entercode"
                }, 
                {
                  "key": "@event_storeysnumber",
                  "value": "event_storeysnumber",
                  "ParameterType": "Integer"
                }, 
                {
                  "key": "@event_floor",
                  "value": "event_floor"
                }, 
                {
                  "key": "@event_flat_office",
                  "value": "event_flat_office"
                },
                {
                  "key": "@event_exit",
                  "value": "event_exit"
                },
                {
                  "key": "@event_moreinformation",
                  "value": "event_moreinformation"
                },
                {
                  "key": "@event_longitude",
                  "value": "event_longitude"
                }, 
                {
                  "key": "@event_latitude",
                  "value": "event_latitude"
                },
                {
                  "key": "@event_content",
                  "value": "event_content"
                }, 
                {
                  "key": "@event_sipcallid",
                  "value": "event_sipcallid"
                },
                {
                  "key": "@service_ids",
                  "value": "service_ids"
                }, 
                {
                  "key": "@applicant_classes_ids",
                  "value": "applicant_classes_ids"
                },
                {
                  "key": "@pacient_classes_ids",
                  "value": "pacient_classes_ids"
                }
            ]
            return parameters;
        }
    };
}());
