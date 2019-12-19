/* eslint-disable line-comment-position */
(function () {
    return {
        init: function () {
            document.getElementsByClassName('float_r')[0].children[1].style.display = 'none';
            if (this.state == "create") {
                //Кнопка "Сохранить" при открытии на create
                this.checkUserRole();
                document.getElementById('save_part').addEventListener("click", function () {
                    const queryForSavePart = {
                        queryCode: 'InsertParts',
                        parameterValues: [
                            {
                                key: '@part_name',
                                value: this.form.getControlValue('part_name')
                            },
                            {
                                key: '@articul',
                                value: this.form.getControlValue('articul')
                            },
                            {
                                key: '@manufacturer',
                                value: this.form.getControlValue('manufacturer')
                            },
                            {
                                key: '@category_id',
                                value: this.form.getControlValue('category')
                            },
                            {
                                key: '@user_id',
                                value: this.user
                            }
                        ]
                    };
                    this.queryExecutor.getValues(queryForSavePart).subscribe(data => {
                        if (data != undefined) {
                            this.form.markAsSaved();
                            this.openPopUpInfoDialog(data.rows[0].values[0]);
                            this.navigateTo('sections/Parts/edit/' + data.rows[0].values[1]);
                        } else {
                            this.openPopUpInfoDialog('Ошибка добавления данных');
                        }
                    });
                }.bind(this));
            } else if (this.state == "update") {
                //Кнопка "Сохранить" при открытии на update
                this.checkUserRole();
                if (document.getElementById('part_name').disabled == true) {
                    document.getElementById("save_part").style.display = "none";
                    document.getElementById("clear_part").style.display = "none";
                }
                document.getElementById('save_part').addEventListener("click", function () {
                    const queryForUpdatePart = {
                        queryCode: 'UpdateParts',
                        parameterValues: [
                            {
                                key: '@part_name',
                                value: this.form.getControlValue('part_name')
                            },
                            {
                                key: '@articul',
                                value: this.form.getControlValue('articul')
                            },
                            {
                                key: '@manufacturer',
                                value: this.form.getControlValue('manufacturer')
                            },
                            {
                                key: '@category_id',
                                value: this.form.getControlValue('category')
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
                    this.queryExecutor.getValues(queryForUpdatePart).subscribe(data => {
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
            this.form.onControlValueChanged('part_name', this.checkSaveAvailable);
            this.form.onControlValueChanged('articul', this.checkSaveAvailable);
            this.form.onControlValueChanged('manufacturer', this.checkSaveAvailable);
            this.form.onControlValueChanged('category', this.checkSaveAvailable);
            this.form.onControlValueChanged('part_name', this.checkClearAvailable);
            this.form.onControlValueChanged('articul', this.checkClearAvailable);
            this.form.onControlValueChanged('manufacturer', this.checkClearAvailable);
            this.form.onControlValueChanged('category', this.checkClearAvailable);
            //Кнопка "Отменить"
            document.getElementById('clear_part').addEventListener("click", function () {
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
                    this.navigateTo('sections/Parts/view/' + this.id)
                }
            });
        },
        // Очистить поля формы
        clearFields: function () {
            this.form.setControlValue('part_name', null)
            this.form.setControlValue('articul', null)
            this.form.setControlValue('manufacturer', null)
            this.form.setControlValue('category', null)
        },
        // Проверка на допустимость сохранения
        checkSaveAvailable: function () {
            if (this.form.getControlValue('part_name') != null &&
                this.form.getControlValue('articul') != null &&
                this.form.getControlValue('manufacturer') != null &&
                this.form.getControlValue('category') != null &&
                this.form.getControlValue('part_name') != "" &&
                this.form.getControlValue('articul') != "" &&
                this.form.getControlValue('manufacturer') != "" &&
                this.form.getControlValue('category') != ""
            ) {
                document.getElementById('save_part').disabled = false;
            } else {
                document.getElementById('save_part').disabled = true;
            }
        },
        // Проверка есть ли что очищать
        checkClearAvailable: function () {
            if (this.form.getControlValue('part_name') != null ||
                this.form.getControlValue('articul') != null ||
                this.form.getControlValue('manufacturer') != null ||
                this.form.getControlValue('category') != null
            ) {
                document.getElementById('clear_part').disabled = false;
            } else {
                document.getElementById('clear_part').disabled = true;
            }
        }
    };
}());
