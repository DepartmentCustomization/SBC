/* eslint-disable line-comment-position */
(function () {
    return {
        init: function () {
            document.getElementsByClassName('float_r')[0].children[1].style.display = 'none';
            document.getElementById('clear_arrival').disabled = true;
            document.getElementById('add_arrival').disabled = true;
            let categoryIdParam = [{ parameterCode: '@categoryId', parameterValue: this.id }];
            this.form.setControlParameterValues('articul', categoryIdParam);
            this.form.onControlValueChanged('articul', this.getPartName);
            this.form.onControlValueChanged('articul', this.checkArticulPresents);
            //При изменении проверить, есть ли что очищать
            this.form.onControlValueChanged('articul', this.checkClearAvailable);
            this.form.onControlValueChanged('provider', this.checkClearAvailable);
            this.form.onControlValueChanged('part_quantity', this.checkClearAvailable);
            this.form.onControlValueChanged('part_price', this.checkClearAvailable);
            this.form.onControlValueChanged('invoice_number', this.checkClearAvailable);
            //При изменении проверить, можно ли выполнять приход
            this.form.onControlValueChanged('articul', this.checkSaveArrivalAvailable);
            this.form.onControlValueChanged('provider', this.checkSaveArrivalAvailable);
            this.form.onControlValueChanged('part_quantity', this.checkSaveArrivalAvailable);
            this.form.onControlValueChanged('part_price', this.checkSaveArrivalAvailable);
            this.form.onControlValueChanged('invoice_number', this.checkSaveArrivalAvailable);
            //Поправить общую стоимость при изменении цены или кол-ва
            this.form.onControlValueChanged('part_quantity', this.clearArrivalSum);
            this.form.onControlValueChanged('part_price', this.clearArrivalSum);
            // Дизейбл группы полей категории
            this.form.disableControl('category_name');
            this.form.disableControl('operational_period_km');
            this.form.disableControl('operational_period_day');
            this.form.disableControl('available');
            this.form.disableControl('category_description');
            // Дизейбл некоторых из прихода
            this.form.disableControl('part_name');
            this.form.disableControl('manufacturer');
            this.form.disableControl('sum_price');
            // При изменении цены и количества можно проверить-посчитать ли общую стоимость
            this.form.onControlValueChanged('part_price', this.calculateArrivalSum);
            this.form.onControlValueChanged('part_quantity', this.calculateArrivalSum);
            //Кнопка "Очистить"
            document.getElementById('clear_arrival').addEventListener("click", function () {
                this.clearArrivalValues();
            }.bind(this));
            //Кнопка "Добавить артикул"
            document.getElementById('new_article').addEventListener("click", function () {
                const CreateArticul_callback = (response) => {
                    if (response) {
                        const newPart = {
                            queryCode: 'InsertParts',
                            parameterValues: [
                                {
                                    key: '@articul',
                                    value: response[0].value
                                },
                                {
                                    key: '@part_name',
                                    value: response[1].value
                                },
                                {
                                    key: '@manufacturer',
                                    value: response[2].value
                                },
                                {
                                    key: '@category_id',
                                    value: this.id
                                },
                                {
                                    key: '@user_id',
                                    value: this.user
                                }
                            ]
                        };
                        this.queryExecutor.getValues(newPart).subscribe(data => {
                            this.openPopUpInfoDialog(data.rows[0].values[0]);
                            this.form.setControlValue('articul',
                                { key: data.rows[0].values[1], value: data.rows[0].values[2] }
                            )
                        });
                    }
                };
                const formFields = {
                    title: 'Создание запчасти',
                    acceptBtnText: 'save',
                    cancelBtnText: 'exit',
                    fieldGroups: [
                        {
                            code: 'InfoGroup',
                            name: 'Данные',
                            expand: true,
                            position: 1,
                            fields: [
                                {
                                    code: "articul",
                                    fullScreen: true,
                                    hidden: false,
                                    placeholder: "Актикул",
                                    position: 1,
                                    required: true,
                                    type: "text"
                                },
                                {
                                    code: "part_name",
                                    fullScreen: true,
                                    hidden: false,
                                    placeholder: "Название",
                                    position: 2,
                                    required: true,
                                    type: "text"
                                },
                                {
                                    code: "manufacturer",
                                    fullScreen: true,
                                    hidden: false,
                                    placeholder: "Производитель",
                                    position: 3,
                                    required: true,
                                    type: "text"
                                }
                            ]
                        }
                    ]
                };
                this.openModalForm(formFields, CreateArticul_callback.bind(this));
            }.bind(this));
            //Кнопка "Добавить приход"
            document.getElementById('add_arrival').addEventListener("click", function () {
                const queryForAddPartsArrival = {
                    queryCode: 'InsertPartsArrival',
                    parameterValues: [
                        {
                            key: '@articul',
                            value: this.form.getControlValue('articul')
                        },
                        {
                            key: '@provider',
                            value: this.form.getControlValue('provider')
                        },
                        {
                            key: '@invoice_number',
                            value: this.form.getControlValue('invoice_number')
                        },
                        {
                            key: '@part_quantity',
                            value: this.form.getControlValue('part_quantity')
                        },
                        {
                            key: '@part_price',
                            value: this.form.getControlValue('part_price')
                        },
                        {
                            key: '@Id',
                            value: this.id
                        }
                    ]
                };
                this.queryExecutor.getValues(queryForAddPartsArrival).subscribe(data => {
                    if (data != undefined) {
                        this.form.markAsSaved();
                        this.openPopUpInfoDialog(data.rows[0].values[0]);
                        this.clearArrivalValues();
                    } else {
                        this.openPopUpInfoDialog('Ошибка изменения данных');
                    }
                });
            }.bind(this));
        }, // END INIT
        //Получить инфу запчасти из артикула
        getPartName: function () {
            if (this.form.getControlValue('articul') != null &&
                this.form.getControlValue('articul') != "") {
                const queryForGetPartInfo = {
                    queryCode: 'getPartInfoByArticul',
                    parameterValues: [
                        {
                            key: '@partId',
                            value: this.form.getControlValue('articul')
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
        // Подсчет общей стоимости прихода
        calculateArrivalSum: function () {
            if (
                this.form.getControlValue('part_quantity') != null
                && this.form.getControlValue('part_quantity') != ""
                && this.form.getControlValue('part_price') != null
                && this.form.getControlValue('part_price') != ""
            ) {
                let qty = this.form.getControlValue('part_quantity');
                let price = this.form.getControlValue('part_price');
                let sumPrice = qty * price;
                this.form.setControlValue('sum_price', sumPrice);
            }
        },
        // При удалении значения из артикула очищать подставленные поля название и производитель
        checkArticulPresents: function () {
            if (this.form.getControlValue('articul') == null || this.form.getControlValue('articul') == "") {
                this.form.setControlValue('part_name', null);
                this.form.setControlValue('manufacturer', null);
                document.getElementById('new_article').disabled = false;
            } else {
                document.getElementById('new_article').disabled = true;
            }
        },
        //Проверка, есть ли что очищать
        checkClearAvailable: function () {
            if (
                (this.form.getControlValue('articul') != null && this.form.getControlValue('articul') != "")
                ||
                (this.form.getControlValue('provider') != null && this.form.getControlValue('provider') != "")
                ||
                (this.form.getControlValue('part_quantity') != null && this.form.getControlValue('part_quantity') != "")
                ||
                (this.form.getControlValue('part_price') != null && this.form.getControlValue('part_price') != "")
                ||
                (this.form.getControlValue('invoice_number') != null && this.form.getControlValue('invoice_number') != "")
            ) {
                document.getElementById('clear_arrival').disabled = false;
            } else {
                document.getElementById('clear_arrival').disabled = true;
            }
        },
        //Проверить, достаточно ли заполнены поля для выполнения прихода
        checkSaveArrivalAvailable: function () {
            if (
                (this.form.getControlValue('articul') != null && this.form.getControlValue('articul') != "")
                &&
                (this.form.getControlValue('provider') != null && this.form.getControlValue('provider') != "")
                &&
                (this.form.getControlValue('part_quantity') != null && this.form.getControlValue('part_quantity') != "")
                &&
                (this.form.getControlValue('part_price') != null && this.form.getControlValue('part_price') != "")
                &&
                (this.form.getControlValue('invoice_number') != null && this.form.getControlValue('invoice_number') != "")
            ) {
                document.getElementById('add_arrival').disabled = false;
            } else {
                document.getElementById('add_arrival').disabled = true;
            }
        },
        //Очистить данные полей прихода
        clearArrivalValues: function () {
            this.form.setControlValue('articul', { key: null, value: null });
            this.form.setControlValue('provider', { key: null, value: null });
            this.form.setControlValue('part_quantity', null);
            this.form.setControlValue('part_price', null);
            this.form.setControlValue('invoice_number', null);
        },
        //Очистить общую стоимость
        clearArrivalSum: function () {
            this.form.setControlValue('sum_price', null);
        }
    };
}());
