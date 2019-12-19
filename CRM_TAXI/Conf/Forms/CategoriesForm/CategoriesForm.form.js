/* eslint-disable line-comment-position */
(function () {
    return {
        init: function () {
            document.getElementsByClassName('float_r')[0].children[1].style.display = 'none';
            if (this.state == "create") {
                //Кнопка "Сохранить" при открытии на create
                this.checkUserRole();
                document.getElementById('save_category').addEventListener("click", function () {
                    const queryForSaveCategory = {
                        queryCode: 'InsertCategories',
                        parameterValues: [
                            {
                                key: '@category_name',
                                value: this.form.getControlValue('category_name')
                            },
                            {
                                key: '@category_description',
                                value: this.form.getControlValue('category_description')
                            },
                            {
                                key: '@operational_period_km',
                                value: this.form.getControlValue('operational_period_km')
                            },
                            {
                                key: '@operational_period_day',
                                value: this.form.getControlValue('operational_period_day')
                            },
                            {
                                key: '@min_count_stock',
                                value: this.form.getControlValue('min_count_stock')
                            }
                        ]
                    };
                    this.queryExecutor.getValues(queryForSaveCategory).subscribe(data => {
                        if (data != undefined) {
                            this.form.markAsSaved();
                            this.openPopUpInfoDialog(data.rows[0].values[0]);
                            this.navigateTo('sections/Categories/edit/' + data.rows[0].values[1]);
                        } else {
                            this.openPopUpInfoDialog('Ошибка добавления данных');
                        }
                    });
                }.bind(this));
            } else if (this.state == "update") {
                this.checkUserRole();
                if (document.getElementById('category_name').disabled == true) {
                    document.getElementById("save_category").style.display = "none";
                    document.getElementById("clear_category").style.display = "none";
                }
                //Кнопка "Сохранить" при открытии на update
                document.getElementById('save_category').addEventListener("click", function () {
                    const queryForSaveCategory = {
                        queryCode: 'UpdateCategories',
                        parameterValues: [
                            {
                                key: '@category_name',
                                value: this.form.getControlValue('category_name')
                            },
                            {
                                key: '@category_description',
                                value: this.form.getControlValue('category_description')
                            },
                            {
                                key: '@operational_period_km',
                                value: this.form.getControlValue('operational_period_km')
                            },
                            {
                                key: '@operational_period_day',
                                value: this.form.getControlValue('operational_period_day')
                            },
                            {
                                key: '@min_count_stock',
                                value: this.form.getControlValue('min_count_stock')
                            },
                            {
                                key: '@Id',
                                value: this.id
                            }
                        ]
                    };
                    this.queryExecutor.getValues(queryForSaveCategory).subscribe(data => {
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
            this.form.onControlValueChanged('category_name', this.checkSaveAvailable);
            this.form.onControlValueChanged('operational_period_km', this.checkSaveAvailable);
            this.form.onControlValueChanged('operational_period_day', this.checkSaveAvailable);
            this.form.onControlValueChanged('min_count_stock', this.checkSaveAvailable);
            this.form.onControlValueChanged('category_name', this.checkClearAvailable);
            this.form.onControlValueChanged('operational_period_km', this.checkClearAvailable);
            this.form.onControlValueChanged('operational_period_day', this.checkClearAvailable);
            this.form.onControlValueChanged('min_count_stock', this.checkClearAvailable);
            //Кнопка "Очистить"
            document.getElementById('clear_category').addEventListener("click", function () {
                this.clearFields();
            }.bind(this));
        }, //END INIT    
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
                    this.navigateTo('sections/Categories/view/' + this.id)
                }
            });
        },
        // Очистить поля формы
        clearFields: function () {
            this.form.setControlValue('category_name', null)
            this.form.setControlValue('operational_period_km', null)
            this.form.setControlValue('operational_period_day', null)
            this.form.setControlValue('min_count_stock', null)
            this.form.setControlValue('category_description', null)
        },
        // Проверка на допустимость сохранения
        checkSaveAvailable: function () {
            if (this.form.getControlValue('category_name') != null &&
                this.form.getControlValue('operational_period_km') != null &&
                this.form.getControlValue('operational_period_day') != null &&
                this.form.getControlValue('min_count_stock') != null &&
                this.form.getControlValue('category_name') != "" &&
                this.form.getControlValue('operational_period_km') != "" &&
                this.form.getControlValue('operational_period_day') != "" &&
                this.form.getControlValue('min_count_stock') != ""
            ) {
                document.getElementById('save_category').disabled = false;
            } else {
                document.getElementById('save_category').disabled = true;
            }
        },
        // Проверка есть ли что очищать
        checkClearAvailable: function () {
            if (this.form.getControlValue('category_name') != null ||
                this.form.getControlValue('operational_period_km') != null ||
                this.form.getControlValue('operational_period_day') != null ||
                this.form.getControlValue('min_count_stock') != null
            ) {
                document.getElementById('clear_category').disabled = false;
            } else {
                document.getElementById('clear_category').disabled = true;
            }
        }
    };
}());
