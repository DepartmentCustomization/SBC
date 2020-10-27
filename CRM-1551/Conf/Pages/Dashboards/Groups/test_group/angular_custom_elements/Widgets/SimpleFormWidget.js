(function () {
	return {
		config: {
			"code": "SystemUser",
			"name": "Пользователь",
			"position": 1,
			"fieldGroups": [
                {
                    "code": "Group_Aplicant",
                    "name": "Маленькая группа",
                    "position": 2,
                    "fields": [
                        {
                            "code": "TextInput1Btn",
                            "name": "Очистити",
                            "type": "button",
                            "position": 1,
                            "width": "25%",
                            "icon": "address",
                            "placeholder": "TextInput1"
                        },
                        {
                            "code": "ChangeDisableControl",
                            "name": "Очистити",
                            "type": "button",
                            "position": 123,
                            "width": "25%",
                            "icon": "book",
                            "placeholder": "ChangeDisableControl"
                        },
                        {
                            "code": "TextInput2Btn",
                            "name": "Очистити",
                            "type": "button",
                            "position": 5,
                            "width": "50%",
                            "icon": "adjust",
                            "placeholder": "SelectInput1"
                        },
                        {
                            "code": "TextInput3Btn",
                            "name": "Очистити",
                            "type": "button",
                            "position": 2,
                            "width": "25%",
                            "icon": "amilia",
                            "placeholder": "SelectInput2"
                        },
                        {
                            "code": "GetControlValues",
                            "name": "GetControlValues",
                            "type": "button",
                            "position": 1,
                            "width": "25%",
                            "icon": "amilia",
                            "placeholder": "GetControlValues"
                        },
                        {
                            "code": "Applicant_name",
                            "name": "Название 1",
                            "type": "text",
                            "position": 100,
                        },
                        {
                            "code": "ReceiptSources",
                            "name": "Джерело збереження",
                            "type": "select",
                            "position": 21,
                            placeholder: 'Джерело збереження placeholder '
                        },
                        {
                            "code": "ReceiptCreated",
                            "name": "Джерело створення",
                            "type": "select",
                            "position": 12,
                        },
                        {
                            code: "checkbox",
                            fullScreen: true,
                            hidden: false,
                            placeholder: 'Основний?',
                            position: 3,
                            required: false,
                            value: false,
                            type: 'checkbox',
                            width: '50%'
                        }
                    ]
                },
                {
                    "name": "Вторая группа",
                    "position": 1,
                    "fields": [
                        {
                            "code": "Question_name",
                            "name": "new label 2",
                            "type": "text",
                            "width": "50%"
                        },
                        {
                            "code": "Question_text",
                            "name": "like dashboard",
                            "type": "text",
                            "width": "30%"
                        }
                    ]
                },
                {
                    "code": "ThirdGroup",
                    "name": "Самая большая группа",
                    "position": 10,
                    "fields": [
                        {
                          "code": "CardPhone",
                          "name": "Номер телефону",
                          "type": "text",
                          "position": 2,
                          "width": "100%"
                        },
                        {
                          "code": "Applicant_Building",
                          "name": "Будинок*",
                          "type": "select",
                          "position": 6,
                          "width": "75%",
                          "Querycode": "list_houses_number2",
                          "KeyColumncode": "Id",
                          "DisplayColumncode": "number",
                          "QueryParameters": []
                        },
                        {
                          "Maxlength": 10,
                          "code": "Applicant_HouseBlock",
                          "name": "Корпус",
                          "type": "text",
                          "position": 6,
                          "IsHidden": true,
                          "width": "33%"
                        }
                    ]
                }
            ]
        },
        afterViewInit: function() {
            const btn1 = document.getElementById('TextInput1Btn');
            const btn3 = document.getElementById('TextInput3Btn');
            const btn2 = document.getElementById('TextInput2Btn');
            btn1.addEventListener('click', function() {
                const value = this.getControlValue('Applicant_name');
                console.log(value);
            }.bind(this));
            btn3.addEventListener('click', function() {
                const value = this.getControlValue('ReceiptSources');
                console.log(value);
            }.bind(this));
            btn2.addEventListener('click', function() {
                const value = this.getControlValue('ReceiptCreated');
                console.log(value);
            }.bind(this));
            const btnGetControlValues = document.getElementById('GetControlValues');
            btnGetControlValues.addEventListener('click', function() {
                const value = this.getControlValues();
                this.disableControl('ReceiptSources');
                console.log(value);
                console.log('Test disableControl');
            }.bind(this));

            const btnChangeDisableControl = document.getElementById('ChangeDisableControl');
            btnChangeDisableControl.addEventListener('click', function() {
                // const value = this.getControlValue('ReceiptCreated');
                this.changeDisableControl('ReceiptCreated');
            }.bind(this));
        }
    };
}());
