/* eslint-disable line-comment-position */
(function () {
    return {
        openCar: undefined,
        init: function () {
            document.getElementsByClassName('float_r')[0].children[1].style.display = 'none';
            this.openCar = this.form.getControlValue('cars_id');
            let url = window.location.href;
            if (this.form.getControlValue('invoice_consumption') == null) {
                this.navigateTo('sections/PartsChange');
            }
            if (url.includes('view') == true) {
                this.form.setControlVisibility('update_part_change', false);
            }
            if (this.state == "update") {
                this.checkUserRole();
                let changeParam = [
                    { parameterCode: '@car', parameterValue: this.form.getControlValue('cars_id') },
                    { parameterCode: '@changeId', parameterValue: this.id }];
                this.form.setControlParameterValues('old_part_id', changeParam);
                this.form.disableControl('invoice_consumption');
                this.form.disableControl('change_date');
                this.form.disableControl('part_price');
                this.form.disableControl('part_name');
                this.form.disableControl('manufacturer');
                if (document.getElementById('new_part_id').disabled == true) {
                    document.getElementById("update_part_change").style.display = "none";
                }
                document.getElementById('update_part_change').addEventListener("click", function () {
                    const queryForUpdatePartsChange = {
                        queryCode: 'Remake_PartChange',
                        parameterValues: [
                            {
                                key: '@part_id',
                                value: this.form.getControlValue('new_part_id')
                            },
                            {
                                key: '@prev_part_id',
                                value: this.form.getControlValue('old_part_id')
                            },
                            {
                                key: '@cars_id',
                                value: this.form.getControlValue('cars_id')
                            },
                            {
                                key: '@changeId',
                                value: this.id
                            },
                            {
                                key: '@user_id',
                                value: this.user
                            }
                        ]
                    };
                    this.queryExecutor.getValues(queryForUpdatePartsChange).subscribe(data => {
                        if (data != undefined) {
                            this.form.markAsSaved();
                            this.openPopUpInfoDialog(data.rows[0].values[0]);
                            this.navigateTo('sections/PartsChange/edit/' + data.rows[0].values[1]);
                            if (data.rows[0].values[2] !== undefined) {
                                let notifyText = data.rows[0].values[2];
                                this.sendBadChangeNotify(notifyText);
                            }
                        } else {
                            this.openPopUpInfoDialog('Ошибка изменения данных');
                        }
                    });
                }.bind(this));
            }
            this.checkSaveAvailable();
            // При изменении полей проверить, можно ли сохранять
            this.form.onControlValueChanged('cars_id', this.checkSaveAvailable);
            this.form.onControlValueChanged('cars_id', this.checkCarAvailable);
            this.form.onControlValueChanged('new_part_id', this.checkSaveAvailable);
            this.form.onControlValueChanged('new_part_id', this.checkArticulPresents);
            this.form.onControlValueChanged('new_part_id', this.getPartName);
        },
        //Отправить нотификацию при замене если период эксплуатации не пройден 
        sendBadChangeNotify: function (title) {
            this.createOrganisationsNotification({
                text: title,
                url: "notifications/unread",
                notificationTypeCode: "WEB",
                notificationPriorityCode: "Middle",
                organisationIds: [4],
                hasAudio: true
            });
        },
        // Проверка роли пользователя
        checkUserRole: function () {
            const queryForCheckUserRole = {
                queryCode: 'CheckUserRole',
                parameterValues: [
                    {
                        key: '@userId',
                        value: this.user
                    }
                ]
            };
            this.queryExecutor.getValues(queryForCheckUserRole).subscribe(data => {
                if (data.rows[0].values[0] != 'Администраторы') {
                    this.navigateTo('sections/PartsChange/view/' + this.id)
                }
            });
        },
        checkCarAvailable: function () {
            let car = this.form.getControlValue('cars_id');
            if (this.openCar != car) {
                this.form.setControlValue('old_part_id', { key: null, value: null });
            }
            if (this.form.getControlValue('cars_id') != null &&
                this.form.getControlValue('cars_id') != "") {
                let changeParam = [
                    { parameterCode: '@car', parameterValue: car },
                    { parameterCode: '@changeId', parameterValue: this.id }];
                this.form.setControlParameterValues('old_part_id', changeParam);
            } else {
                this.form.setControlValue('old_part_id', { key: null, value: null });
                this.form.setControlParameterValues('old_part_id', null);
            }
        },
        // Проверка на допустимость сохранения
        checkSaveAvailable: function () {
            if (this.form.getControlValue('cars_id') != null &&
                this.form.getControlValue('new_part_id') != null &&
                this.form.getControlValue('cars_id') != "" &&
                this.form.getControlValue('new_part_id') != ""
            ) {
                document.getElementById('update_part_change').disabled = false;
            } else {
                document.getElementById('update_part_change').disabled = true;
            }
        },
        checkArticulPresents: function () {
            if (this.form.getControlValue('new_part_id') == null || this.form.getControlValue('new_part_id') == "") {
                this.form.setControlValue('part_name', null);
                this.form.setControlValue('manufacturer', null);
                this.form.setControlValue('part_price', null);
            } else {
                this.getPartPrice();
            }
        },
        getPartName: function () {
            if (this.form.getControlValue('new_part_id') != null &&
                this.form.getControlValue('new_part_id') != "") {
                const queryForGetPartInfo = {
                    queryCode: 'getPartInfoByArticul',
                    parameterValues: [
                        {
                            key: '@partId',
                            value: this.form.getControlValue('new_part_id')
                        }
                    ]
                };
                this.queryExecutor.getValues(queryForGetPartInfo).subscribe(data => {
                    if (data != undefined) {
                        this.form.setControlValue('part_name', data.rows[0].values[0]);
                        this.form.setControlValue('manufacturer', data.rows[0].values[1]);
                    }
                });
            }
        },
        getPartPrice: function () {
            if (this.form.getControlValue('new_part_id') != null) {
                const queryForCheckUserRole = {
                    queryCode: 'SelectPartPrice',
                    parameterValues: [
                        {
                            key: '@Id',
                            value: this.form.getControlValue('new_part_id')
                        }
                    ]
                };
                this.queryExecutor.getValues(queryForCheckUserRole).subscribe(data => {
                    if (data != undefined) {
                        this.form.setControlValue('part_price', data.rows[0].values[0]);
                    }
                });
            }
        }
    };
}());
