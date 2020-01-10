/* eslint-disable line-comment-position */
(function () {
    return {
        forUser: [],
        init: function () {
            document.getElementsByClassName('float_r')[0].children[1].style.display = 'none';
            document.getElementById('save_part_change').disabled = true;
            this.form.onControlValueChanged('car', this.getAutoForQuery);
            this.form.onControlValueChanged('car', this.checkPartChooseAvailable);
            this.form.disableControl('part');
            // При изменении проверять, достаточно ли заполнены поля
            this.form.onControlValueChanged('car', this.checkSaveChangeAvailable);
            this.form.onControlValueChanged('part', this.checkSaveChangeAvailable);
            this.form.onControlValueChanged('invoice_consumption', this.checkSaveChangeAvailable);
            //Кнопка "Сохранить" - выполнение установки (замены) запчасти на авто
            document.getElementById('save_part_change').addEventListener("click", function () {
                const queryForMakePartChange = {
                    queryCode: 'MakePartChange',
                    parameterValues: [
                        {
                            key: '@part_id',
                            value: this.form.getControlValue('part_id')
                        },
                        {
                            key: '@prev_part_id',
                            value: this.form.getControlValue('part')
                        },
                        {
                            key: '@invoice_consumption',
                            value: this.form.getControlValue('invoice_consumption')
                        },
                        {
                            key: '@cars_id',
                            value: this.form.getControlValue('car')
                        },
                        {
                            key: '@user_id',
                            value: this.user
                        }
                    ]
                };
                this.queryExecutor.getValues(queryForMakePartChange).subscribe(data => {
                    if (data != undefined) {
                        this.form.markAsSaved();
                        this.openPopUpInfoDialog(data.rows[0].values[0]);
                        if (data.rows[0].values[1] != null) {
                            let notifyText = data.rows[0].values[1];
                            this.sendBadChangeNotify(notifyText);
                        }
                    } else {
                        this.openPopUpInfoDialog('Ошибка изменения данных');
                    }
                });
            }.bind(this));
        },
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
        getAutoForQuery: function () {
            if (this.form.getControlValue('car')) {
                let partParams = [
                    { parameterCode: '@car', parameterValue: this.form.getControlValue('car') },
                    { parameterCode: '@category', parameterValue: this.form.getControlValue('category_id') }
                ];
                this.form.setControlParameterValues('part', partParams);
            }
        },
        checkPartChooseAvailable: function () {
            if (this.form.getControlValue('car') != null && this.form.getControlValue('car') != "") {
                this.form.enableControl('part');
            } else {
                if (!this.form.disableControl('part')) {
                    this.form.disableControl('part');
                }
            }
        },
        checkSaveChangeAvailable: function () {
            if (
                this.form.getControlValue('car') != null && this.form.getControlValue('car') != ""
                && this.form.getControlValue('invoice_consumption') != null
                && this.form.getControlValue('invoice_consumption') != ""
            ) {
                document.getElementById('save_part_change').disabled = false;
            } else {
                document.getElementById('save_part_change').disabled = true;
            }
        }
    };
}());
