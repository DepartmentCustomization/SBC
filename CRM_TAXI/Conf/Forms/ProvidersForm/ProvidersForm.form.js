/* eslint-disable line-comment-position */
(function () {
    return {
        init: function () {
            document.getElementsByClassName('float_r')[0].children[1].style.display = 'none';
            if (this.state == "create") {
                //Кнопка "Сохранить" при открытии на create
                this.checkUserRole();
                document.getElementById('save_provider').addEventListener("click", function () {
                    const queryForSaveProvider = {
                        queryCode: 'InsertProviders',
                        parameterValues: [
                            {
                                key: '@provider',
                                value: this.form.getControlValue('provider')
                            },
                            {
                                key: '@provider_conditions',
                                value: this.form.getControlValue('provider_conditions')
                            },
                            {
                                key: '@user_id',
                                value: this.user
                            }
                        ]
                    };
                    this.queryExecutor.getValues(queryForSaveProvider).subscribe(data => {
                        if (data != undefined) {
                            this.form.markAsSaved();
                            this.openPopUpInfoDialog(data.rows[0].values[0]);
                            this.navigateTo('sections/Providers/edit/' + data.rows[0].values[1]);
                        } else {
                            this.openPopUpInfoDialog('Ошибка добавления данных');
                        }
                    });
                }.bind(this));
            } else if (this.state == "update") {
                //Кнопка "Сохранить" при открытии на update
                this.checkUserRole();
                if (document.getElementById('provider').disabled == true) {
                    document.getElementById("save_provider").style.display = "none";
                    document.getElementById("clear_provider").style.display = "none";
                }
                document.getElementById('save_provider').addEventListener("click", function () {
                    const queryForUpdateProvider = {
                        queryCode: 'UpdateProviders',
                        parameterValues: [
                            {
                                key: '@provider',
                                value: this.form.getControlValue('provider')
                            },
                            {
                                key: '@provider_conditions',
                                value: this.form.getControlValue('provider_conditions')
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
                    this.queryExecutor.getValues(queryForUpdateProvider).subscribe(data => {
                        if (data != undefined) {
                            this.openPopUpInfoDialog(data.rows[0].values[0]);
                            this.form.markAsSaved();
                        } else {
                            this.openPopUpInfoDialog('Ошибка изменения данных');
                        }
                    });
                }.bind(this));
            }
            this.checkSaveAvailable();
            this.checkClearAvailable();
            // При изменении полей проверить, можно ли сохранять/очищать
            this.form.onControlValueChanged('provider', this.checkSaveAvailable);
            this.form.onControlValueChanged('provider_conditions', this.checkSaveAvailable);
            this.form.onControlValueChanged('provider', this.checkClearAvailable);
            this.form.onControlValueChanged('provider_conditions', this.checkClearAvailable);
            //Кнопка "Очистить"
            document.getElementById('clear_provider').addEventListener("click", function () {
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
                    this.navigateTo('sections/Providers/view/' + this.id)
                }
            });
        },
        // Очистить поля формы
        clearFields: function () {
            this.form.setControlValue('provider', null)
            this.form.setControlValue('provider_conditions', null)
        },
        // Проверка на допустимость сохранения
        checkSaveAvailable: function () {
            if (this.form.getControlValue('provider') != null &&
                this.form.getControlValue('provider') != "") {
                document.getElementById('save_provider').disabled = false;
            } else {
                document.getElementById('save_provider').disabled = true;
            }
        },
        // Проверка есть ли что очищать
        checkClearAvailable: function () {
            if (this.form.getControlValue('provider') != null ||
                this.form.getControlValue('provider_conditions') != null
            ) {
                document.getElementById('clear_provider').disabled = false;
            } else {
                document.getElementById('clear_provider').disabled = true;
            }
        }
    };
}());
