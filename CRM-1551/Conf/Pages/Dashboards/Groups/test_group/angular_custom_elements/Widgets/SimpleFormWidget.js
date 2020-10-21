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
                            "name": "Название 1",
                            "type": "text",
                        },
                        {
                            "code": "ReceiptSources",
                            "name": "Джерело збереження",
                            "type": "select",
                            "position": 21,
                        },
                        {
                            "code": "ReceiptSources",
                            "name": "Джерело створення",
                            "type": "select",
                            "position": 2,
                        }
                    ]
                },
                {
                    "name": "Вторая группа",
                    "position": 1,
                    "fields": [
                        {
                            "name": "new label 2",
                            "type": "text",
                            "width": "50%"
                        },
                        {
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
                          "code": "Applicant_PIB",
                          "name": "Прізвище, Ім'я та По батькові*",
                          "type": "text",
                          "position": 1,
                          "width": "100%"
                        },
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
                        },
                        {
                          "code": "Applicant_Entrance",
                          "name": "П*",
                          "type": "number",
                          "position": 7,
                          "width": "10%"
                        },
                        {
                          "Maxlength": 15,
                          "code": "Applicant_Flat",
                          "name": "Кв",
                          "type": "text",
                          "position": 8,
                          "width": "15%"
                        },
                        {
                          "code": "Applicant_District",
                          "name": "Район",
                          "type": "text",
                          "position": 9
                        },
                        {
                          "code": "ExecutorInRoleForObject",
                          "name": "Балансоутримувач",
                          "type": "text",
                          "position": 10
                        },
                        {
                          "code": "Applicant_Privilege",
                          "name": "Пільги",
                          "type": "select",
                          "position": 10,
                          "width": "100%",
                          "Querycode": "List_ApplicantPrivilege_SelectRows",
                          "KeyColumncode": "Id",
                          "DisplayColumncode": "name",
                          "QueryParameters": []
                        },
                        {
                          "code": "Applicant_SocialStates",
                          "name": "Соціальний стан",
                          "type": "select",
                          "position": 10,
                          "Querycode": "List_SocialStates_SelectRows",
                          "KeyColumncode": "Id",
                          "DisplayColumncode": "name",
                          "QueryParameters": []
                        },
                        {
                          "code": "Applicant_CategoryType",
                          "name": "Категорія заявника",
                          "type": "select",
                          "position": 11,
                          "IsHidden": true,
                          "Querycode": "List_CategoryType_SelectRows",
                          "KeyColumncode": "Id",
                          "DisplayColumncode": "name",
                          "QueryParameters": []
                        },
                        {
                          "code": "Applicant_Type",
                          "name": "Тип заявника",
                          "type": "select",
                          "position": 11,
                          "Querycode": "dir_ApplicantTypes_SelectRows",
                          "KeyColumncode": "Id",
                          "DisplayColumncode": "name",
                          "QueryParameters": []
                        },
                        {
                          "code": "Applicant_Email",
                          "name": "E-mail",
                          "type": "text",
                          "position": 15
                        },
                        {
                          "Maxlength": 50,
                          "code": "Applicant_Comment",
                          "name": "Нотатки",
                          "type": "text",
                          "position": 16
                        },
                        {
                          "code": "Applicant_Btn_Clear",
                          "name": "Очистити",
                          "type": "button",
                          "position": 997,
                          "width": "25%",
                          "Icon": "cached",
                          "IconHint": "Очистити інформацію по Заявнику"
                        },
                        {
                          "code": "Applicant_Btn_Add",
                          "name": "Зберегти",
                          "type": "button",
                          "position": 998,
                          "width": "25%",
                          "Icon": ""
                        },
                        {
                          "code": "Question_Aplicant_Btn_Add",
                          "name": "Додати питання",
                          "type": "button",
                          "position": 999,
                          "Icon": "note_add"
                        },
                        {
                          "code": "Adress_for_answer",
                          "name": "Adress  (скрите поле)",
                          "type": "text",
                          "position": 1445,
                          "IsHidden": true
                        },
                        {
                          "code": "Applicant_Phone_Hide",
                          "name": "Applicant_Phone_Hide",
                          "type": "text",
                          "position": 2000,
                          "IsHidden": true
                        }
                    ]
                }
            ]
        },
        init: function() {
            debugger;
        }
    };
}());
