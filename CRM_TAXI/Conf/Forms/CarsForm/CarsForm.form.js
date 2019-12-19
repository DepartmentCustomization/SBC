/* eslint-disable line-comment-position */
(function () {
    return {
        init: function () {
            document.getElementsByClassName('float_r')[0].children[1].style.display = 'none';
            if (this.state == "create") {
                this.form.setControlVisibility('cars_run', false);
                //При открытии на create
                this.checkUserRole();
                document.getElementById('save_car').addEventListener("click", function () {
                    const queryForSaveCar = {
                        queryCode: 'InsertCars',
                        parameterValues: [
                            {
                                key: '@cars_name',
                                value: this.form.getControlValue('cars_name')
                            },
                            {
                                key: '@cars_number',
                                value: this.form.getControlValue('cars_number')
                            },
                            {
                                key: '@cars_mark',
                                value: this.form.getControlValue('cars_mark')
                            },
                            {
                                key: '@cars_year',
                                value: this.form.getControlValue('cars_year')
                            },
                            {
                                key: '@user_id',
                                value: this.user
                            }
                        ]
                    };
                    this.queryExecutor.getValues(queryForSaveCar).subscribe(data => {
                        if (data != undefined) {
                            this.form.markAsSaved();
                            this.openPopUpInfoDialog(data.rows[0].values[0]);
                        } else {
                            this.openPopUpInfoDialog('Ошибка добавления данных');
                        }
                    });
                }.bind(this));
            } else if (this.state == "update") {
                //Кнопка "Сохранить" при открытии на update
                this.form.disableControl('cars_run');
                this.checkUserRole();
                if (document.getElementById('cars_name').disabled == true) {
                    document.getElementById("save_car").style.display = "none";
                    document.getElementById("clear_car").style.display = "none";
                }
                document.getElementById('save_car').addEventListener("click", function () {
                    const queryForUpdateCar = {
                        queryCode: 'UpdateCars',
                        parameterValues: [
                            {
                                key: '@cars_name',
                                value: this.form.getControlValue('cars_name')
                            },
                            {
                                key: '@cars_number',
                                value: this.form.getControlValue('cars_number')
                            },
                            {
                                key: '@cars_mark',
                                value: this.form.getControlValue('cars_mark')
                            },
                            {
                                key: '@cars_year',
                                value: this.form.getControlValue('cars_year')
                            },
                            {
                                key: '@user_id',
                                value: this.user
                            },
                            {
                                key: '@Id',
                                value: this.id
                            }
                        ]
                    };
                    this.queryExecutor.getValues(queryForUpdateCar).subscribe(data => {
                        if (data != undefined) {
                            this.form.markAsSaved();
                            this.openPopUpInfoDialog(data.rows[0].values[0]);
                        } else {
                            this.openPopUpInfoDialog('Ошибка изменения данных');
                        }
                    });
                }.bind(this));
            }
            this.checkSaveAvailable();
            this.checkClearAvailable();
            // При изменении полей проверить, можно ли сохранять/очищать
            this.form.onControlValueChanged('cars_name', this.checkSaveAvailable);
            this.form.onControlValueChanged('cars_number', this.checkSaveAvailable);
            this.form.onControlValueChanged('cars_mark', this.checkSaveAvailable);
            this.form.onControlValueChanged('cars_year', this.checkSaveAvailable);
            this.form.onControlValueChanged('cars_name', this.checkClearAvailable);
            this.form.onControlValueChanged('cars_number', this.checkClearAvailable);
            this.form.onControlValueChanged('cars_mark', this.checkClearAvailable);
            this.form.onControlValueChanged('cars_year', this.checkClearAvailable);
            //Кнопка "Отменить"
            document.getElementById('clear_car').addEventListener("click", function () {
                this.clearFields();
            }.bind(this));
            //END INIT    
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
                    this.navigateTo('sections/Cars/view/' + this.id)
                }
            });
        },
        // Очистить поля формы
        clearFields: function () {
            this.form.setControlValue('cars_name', null)
            this.form.setControlValue('cars_number', null)
            this.form.setControlValue('cars_mark', null)
            this.form.setControlValue('cars_year', null)
        },
        // Проверка на допустимость сохранения
        checkSaveAvailable: function () {
            if (this.form.getControlValue('cars_name') != null &&
                this.form.getControlValue('cars_number') != null &&
                this.form.getControlValue('cars_mark') != null &&
                this.form.getControlValue('cars_year') != null &&
                this.form.getControlValue('cars_name') != "" &&
                this.form.getControlValue('cars_number') != "" &&
                this.form.getControlValue('cars_mark') != "" &&
                this.form.getControlValue('cars_year') != ""
            ) {
                document.getElementById('save_car').disabled = false;
            } else {
                document.getElementById('save_car').disabled = true;
            }
        },
        // Проверка есть ли что очищать
        checkClearAvailable: function () {
            if (this.form.getControlValue('cars_name') != null ||
                this.form.getControlValue('cars_number') != null ||
                this.form.getControlValue('cars_mark') != null ||
                this.form.getControlValue('cars_year') != null
            ) {
                document.getElementById('clear_car').disabled = false;
            } else {
                document.getElementById('clear_car').disabled = true;
            }
        }
    };
}());
