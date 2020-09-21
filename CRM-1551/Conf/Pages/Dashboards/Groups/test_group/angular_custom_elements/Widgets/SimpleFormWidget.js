(function () {
    return {
        config: {
            "Code": "SystemUser",
            "Name": "Пользователь",
            "Position": 1,
            "Fields": [
                {
                    "Pattern": "",
                    "Code": "FirstName",
                    "Name": "FirstName",
                    "FieldType": "text",
                    "Position": 2,
                    "Width": "50%"
                },
                {
                    "Pattern": "",
                    "Code": "LastName",
                    "Name": "LastName",
                    "FieldType": "text",
                    "Position": 3,
                    "Width": "50%"
                },
                {
                    "Pattern": "",
                    "Code": "Patronymic",
                    "Name": "Patronymic",
                    "FieldType": "text",
                    "Position": 4,
                    "Width": "50%"
                },
                {
                    "Pattern": "",
                    "Code": "UseEDS",
                    "Name": "UseEDS",
                    "FieldType": "checkBox",
                    "Position": 5,
                    "Width": "50%"
                },
                {
                    "Pattern": "",
                    "Code": "Active",
                    "Name": "Active",
                    "FieldType": "checkBox",
                    "Position": 6,
                    "Width": "50%"
                },
                {
                    "Pattern": "",
                    "Code": "PhoneNumber",
                    "Name": "PhoneNumber",
                    "FieldType": "text",
                    "Position": 7,
                    "Width": "50%"
                },
                {
                    "Pattern": "",
                    "Code": "DashboardPageCode",
                    "Name": "DashboardPageCode",
                    "FieldType": "text",
                    "Position": 8,
                    "Width": "50%"
                },
                {
                    "Pattern": "",
                    "Code": "SystemUser",
                    "Name": "SystemUser",
                    "FieldType": "systemUser",
                    "Position": 100,
                    "Width": "100%",
                    "MappingFields": {
                        "firstName": "FirstName",
                        "lastName": "LastName",
                        "patronymic": "Patronymic",
                        "useEDS": "UseEDS",
                        "inn": "",
                        "avatar": "",
                        "active": "Active",
                        "phoneNumber": "PhoneNumber",
                        "dashboardPageCode": "DashboardPageCode"
                    }
                }
            ]
        }
    };
}());

/* {
        "width": "auto",
        "margin": "0 5px",
        "flexWrap": "wrap",
        "flexDirection": "row",
        "order": 1,
        "flexGrow": 1,
        "alignSelf": "auto",
        "border": "none",
        "children": [
          {
            "code": "1SimpleFormWidget",
            "type": "SimpleFormWidgetComponent",
            "name": "123"
          }
        ],
        "id": "Container-1",
        "height": "auto",
        "minHeight": "30px",
        "minWidth": "100px",
        "backgroundColor": "white"
      } */