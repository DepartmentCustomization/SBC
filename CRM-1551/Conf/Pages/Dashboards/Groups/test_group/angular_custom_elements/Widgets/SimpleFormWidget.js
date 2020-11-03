(function () {
	return {
		config: {
			code: "SystemUser",
			name: "Пользователь",
			position: 1,
			fieldGroups: [
                {
                    code: "Group_Aplicant",
                    name: "Маленькая группа",
                    position: 1,
                    expand: true,
                    fields: [
                        {
                            "code": "TextInput1Btn",
                            "name": "Очистити",
                            "type": "button",
                            "position": 1,
                            "width": "50%",
                            "icon": "book",
                            "placeholder": "Кнопка 2"
                        },
                        {
                            "code": "ChangeDisableControl",
                            "name": "Очистити",
                            "type": "button",
                            "position": 2,
                            "width": "50%",
                            "icon": "book",
                            "placeholder": "ChangeDisableControl"
                        },
                        {
                            "code": "TextInput2Btn",
                            "name": "Очистити",
                            "type": "button",
                            "position": 3,
                            "width": "50%",
                            "icon": "build",
                            "placeholder": "Btn TextInput2Btn"
                        },
                        {
                            "code": "TextInput3Btn",
                            "name": "Очистити",
                            "type": "button",
                            "position": 4,
                            "width": "50%",
                            "icon": "donut_large",
                            "placeholder": "Btn TextInput3Btn"
                        },
                        {
                            "code": "GetControlValues",
                            "name": "My Name is GetControlValues",
                            "type": "button",
                            "position": 5,
                            "width": "50%",
                            "icon": "search",
                            "placeholder": "GetControlValues"
                        },
                        {
                            "code": "Applicant_name",
                            "name": "Название 1",
                            "type": "text",
                            "position": 6,
                        },
                        {
                            "code": "ReceiptSources",
                            "name": "Джерело збереження",
                            "type": "select",
                            "width": "50%",
                            "position": 7,
                            "placeholder": 'Джерело збереження placeholder'
                        },
                        {
                            "code": "ReceiptCreated",
                            "name": "Джерело створення",
                            "type": "select",
                            "width": "50%",
                            "position": 8,
                            "placeholder": 'Джерело створення placeholder'
                        },
                        {
                            code: "checkbox",
                            fullScreen: true,
                            hidden: false,
                            placeholder: 'Основний?',
                            position: 9,
                            required: false,
                            value: false,
                            type: 'checkbox',
                            width: '50%'
                        }
                    ]
                },
                {
                    name: "Вторая группа",
                    position: 2,
                    expand: false,
                    code: "Group_Second",
                    fields: [
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
                    code: "ThirdGroup",
                    name: "Самая большая группа",
                    position: 3,
                    expand: false,
                    fields: [
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
