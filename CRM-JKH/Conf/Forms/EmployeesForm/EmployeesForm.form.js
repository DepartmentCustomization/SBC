(function () {
  return {
        init: function () {
            this.form.disableControl('orgName', true)
            this.form.onControlValueChanged('User', this.findUserJobAndUUID);
        },
        findUserJobAndUUID: function (value) {
            if (value) {
                // console.log(this.form.getControlValue('User'))
                    const getInfo = {
                        queryCode: 'Find_JobAndUUID',
                        parameterValues: [
                            {
                                key: '@UserId',
                                value: value
                            }]
                    };
                    this.queryExecutor.getValues(getInfo).subscribe(data => {
                        if (data) {
                        this.form.setControlValue('position', data.rows[0].values[0]);
                        this.form.setControlValue('PIB', data.rows[0].values[2]);
                        }
                    });
            }
        },
    };
}());
