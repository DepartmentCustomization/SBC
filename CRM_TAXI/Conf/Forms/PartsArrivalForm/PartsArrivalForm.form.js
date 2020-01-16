(function () {
    return {
        init: function () {
            document.getElementsByClassName('float_r')[0].children[1].style.display = 'none';
            if (this.state == 'update') {
                this.checkUserRole();
                if (document.getElementById('part_name').disabled == true) {
                    document.getElementById('save_part_arrival').style.display = 'none';
                    document.getElementById('clear_part_arrival').style.display = 'none';
                }
                document.getElementById('save_part_arrival').addEventListener('click', function () {
                    const queryForUpdatePartArrival = {
                        queryCode: 'UpdatePartsArrival',
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
                                key: '@user_id',
                                value: this.user
                            },
                            {
                                key: '@Id',
                                value: this.id
                            }
                        ]
                    };
                    this.queryExecutor.getValues(queryForUpdatePartArrival).subscribe(data => {
                        if (data != undefined) {
                            this.form.markAsSaved();
                            this.openPopUpInfoDialog(data.rows[0].values[0]);
                        } else {
                            this.openPopUpInfoDialog('Ошибка изменения данных');
                        }
                    });
                }.bind(this));
            }
            this.form.onControlValueChanged('articul', this.getPartName);
            this.form.onControlValueChanged('articul', this.checkArticulPresents);
            this.form.onControlValueChanged('articul', this.checkClearAvailable);
            this.form.onControlValueChanged('provider', this.checkClearAvailable);
            this.form.onControlValueChanged('part_quantity', this.checkClearAvailable);
            this.form.onControlValueChanged('part_price', this.checkClearAvailable);
            this.form.onControlValueChanged('articul', this.checkSaveArrivalAvailable);
            this.form.onControlValueChanged('provider', this.checkSaveArrivalAvailable);
            this.form.onControlValueChanged('part_quantity', this.checkSaveArrivalAvailable);
            this.form.onControlValueChanged('part_price', this.checkSaveArrivalAvailable);
            this.form.onControlValueChanged('part_quantity', this.clearArrivalSum);
            this.form.onControlValueChanged('part_price', this.clearArrivalSum);
            this.form.disableControl('create_date');
            this.form.disableControl('invoice_number');
            this.form.disableControl('sum_price');
            this.form.disableControl('part_name');
            this.form.disableControl('manufacturer');
            this.form.onControlValueChanged('part_price', this.calculateArrivalSum);
            this.form.onControlValueChanged('part_quantity', this.calculateArrivalSum);
            document.getElementById('clear_part_arrival').addEventListener('click', function () {
                this.clearArrivalValues();
            }.bind(this));
        },
        getPartName: function () {
            if (this.form.getControlValue('articul') != null &&
                this.form.getControlValue('articul') != '') {
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
                    this.navigateTo('sections/PartsArrival/view/' + this.id)
                }
            });
        },
        checkArticulPresents: function () {
            if (this.form.getControlValue('articul') == null || this.form.getControlValue('articul') == '') {
                this.form.setControlValue('part_name', null);
                this.form.setControlValue('manufacturer', null);
            }
        },
        calculateArrivalSum: function () {
            if (
                this.form.getControlValue('part_quantity') != null
                && this.form.getControlValue('part_quantity') != ''
                && this.form.getControlValue('part_price') != null
                && this.form.getControlValue('part_price') != ''
            ) {
                let qty = this.form.getControlValue('part_quantity');
                let price = this.form.getControlValue('part_price');
                let sumPrice = qty * price;
                this.form.setControlValue('sum_price', sumPrice);
            }
        },
        checkClearAvailable: function () {
            if (
                (this.form.getControlValue('articul') != null && this.form.getControlValue('articul') != '')
                ||
                (this.form.getControlValue('provider') != null && this.form.getControlValue('provider') != '')
                ||
                (this.form.getControlValue('part_quantity') != null && this.form.getControlValue('part_quantity') != '')
                ||
                (this.form.getControlValue('part_price') != null && this.form.getControlValue('part_price') != '')
            ) {
                document.getElementById('clear_part_arrival').disabled = false;
            } else {
                document.getElementById('clear_part_arrival').disabled = true;
            }
        },
        checkSaveArrivalAvailable: function () {
            if (
                (this.form.getControlValue('articul') != null && this.form.getControlValue('articul') != '')
                &&
                (this.form.getControlValue('provider') != null && this.form.getControlValue('provider') != '')
                &&
                (this.form.getControlValue('part_quantity') != null && this.form.getControlValue('part_quantity') != '')
                &&
                (this.form.getControlValue('part_price') != null && this.form.getControlValue('part_price') != '')
                &&
                (this.form.getControlValue('invoice_number') != null && this.form.getControlValue('invoice_number') != '')
            ) {
                document.getElementById('save_part_arrival').disabled = false;
            } else {
                document.getElementById('save_part_arrival').disabled = true;
            }
        },
        clearArrivalValues: function () {
            this.form.setControlValue('articul', { key: null, value: null });
            this.form.setControlValue('provider', { key: null, value: null });
            this.form.setControlValue('part_quantity', null);
            this.form.setControlValue('part_price', null);
        },
        clearArrivalSum: function () {
            this.form.setControlValue('sum_price', null);
        }
    };
}());
