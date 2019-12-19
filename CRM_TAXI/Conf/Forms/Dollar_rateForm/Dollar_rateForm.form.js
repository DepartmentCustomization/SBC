/* eslint-disable line-comment-position */
(function () {
    return {
        init: function () {
            document.getElementsByClassName('float_r')[0].children[1].style.display = 'none';
            if (this.state == "create") {
                //Кнопка "Сохранить" при открытии на create
                this.checkUserRole();
                document.getElementById('save_dollar_rate').addEventListener("click", function () {
                    const queryForSaveDollar_rate = {
                        queryCode: 'InsertDollar_rate',
                        parameterValues: [
                            {
                                key: '@dollar_date',
                                value: this.form.getControlValue('dollar_date')
                            },
                            {
                                key: '@dollar_rate',
                                value: this.form.getControlValue('dollar_rate')
                            },
                            {
                                key: '@user_id',
                                value: this.user
                            }
                        ]
                    };
                    this.queryExecutor.getValues(queryForSaveDollar_rate).subscribe(data => {
                        if (data != undefined) {
                            this.form.markAsSaved();
                            this.openPopUpInfoDialog(data.rows[0].values[0]);
                            this.navigateTo('sections/Dollar_rate/edit/' + data.rows[0].values[1]);
                        } else {
                            this.openPopUpInfoDialog('Ошибка добавления данных');
                        }
                    });
                }.bind(this));
            } else if (this.state == "update") {
                //Кнопка "Сохранить" при открытии на update
                this.checkUserRole();
                if (document.getElementById('dollar_rate').disabled == true) {
                    document.getElementById("save_dollar_rate").style.display = "none";
                    document.getElementById("clear_dollar_rate").style.display = "none";
                }
                document.getElementById('save_dollar_rate').addEventListener("click", function () {
                    const queryForUpdateDollar_rate = {
                        queryCode: 'UpdateDollar_rate',
                        parameterValues: [
                            {
                                key: '@dollar_date',
                                value: this.form.getControlValue('dollar_date')
                            },
                            {
                                key: '@dollar_rate',
                                value: this.form.getControlValue('dollar_rate')
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
                    this.queryExecutor.getValues(queryForUpdateDollar_rate).subscribe(data => {
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
            this.form.onControlValueChanged('dollar_date', this.checkSaveAvailable);
            this.form.onControlValueChanged('dollar_rate', this.checkSaveAvailable);
            this.form.onControlValueChanged('dollar_date', this.checkClearAvailable);
            this.form.onControlValueChanged('dollar_rate', this.checkClearAvailable);
            //Кнопка "Отменить"
            document.getElementById('clear_dollar_rate').addEventListener("click", function () {
                this.clearFields();
            }.bind(this));
        },  //END INIT
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
                    this.navigateTo('sections/Dollar_rate/view/' + this.id)
                }
            });
        },
        // Очистить поля формы
        clearFields: function () {
            this.form.setControlValue('dollar_date', null)
            this.form.setControlValue('dollar_rate', null)
        },
        // Проверка на допустимость сохранения
        checkSaveAvailable: function () {
            if (this.form.getControlValue('dollar_date') != null &&
                this.form.getControlValue('dollar_rate') != null &&
                this.form.getControlValue('dollar_date') != "" &&
                this.form.getControlValue('dollar_rate') != ""
            ) {
                document.getElementById('save_dollar_rate').disabled = false;
            } else {
                document.getElementById('save_dollar_rate').disabled = true;
            }
        },
        // Проверка есть ли что очищать
        checkClearAvailable: function () {
            if (this.form.getControlValue('dollar_date') != null ||
                this.form.getControlValue('dollar_rate') != null
            ) {
                document.getElementById('clear_dollar_rate').disabled = false;
            } else {
                document.getElementById('clear_dollar_rate').disabled = true;
            }
        }
    };
}());
