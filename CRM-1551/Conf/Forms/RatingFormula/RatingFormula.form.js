(function() {
    return {
        init: function() {
            this.form.disableControl('RatingFormulaContent');
            this.form.disableControl('k1_name');
            this.form.disableControl('k2_name');
            this.form.disableControl('k3_name');
            this.form.disableControl('k4_name');
            this.form.disableControl('k5_name');
            this.form.disableControl('k6_name');
            this.form.disableControl('k7_name');

            this.form.setControlValue('k1_name', '% вчасно закритих');
            this.form.setControlValue('k2_name', '% виконання');
            this.form.setControlValue('k3_name', '% достовірності');
            this.form.setControlValue('k4_name', 'індекс швидкості виконання');
            this.form.setControlValue('k5_name', 'індекс швидкості роз`яснення');
            this.form.setControlValue('k6_name', 'індекс фактичного виконання');
            this.form.setControlValue('k7_name', 'задоволеність виконанням');

            this.form.onControlValueChanged('formula_id', this.onChanged_formula_id.bind(this));
            this.form.onControlValueChanged('Date_Start', this.onChanged_Date_Start.bind(this));
            this.form.onControlValueChanged('RatingId', this.onChanged_RatingId.bind(this));

            this.GetFormulaNameById(this.form.getControlValue('formula_id'));

        },
        onChanged_RatingId: function(value) {
            if (typeof value === 'string') {
                this.form.setControlValue('RatingId', null);
                return
            }


            if (value) {
                const queryForAttention = {
                    queryCode: 'IsCorrectFormulaDate',
                    parameterValues: [
                        {
                            key: '@Date',
                            value: this.form.getControlValue('Date_Start')
                        },
                        {
                            key: '@RatingId',
                            value: value
                        }
                    ]
                };
                this.queryExecutor.getValue(queryForAttention).subscribe((val) => {
                    if (val > 0) {
                        this.openPopUpInfoDialog('На поточну дату та по даному рейтингу вже створена формула'); 
                        this.form.setControlValue('Date_Start', null);
                    }
                });
            }            
        },
        onChanged_Date_Start: function(value) {
            if (value) {
                const queryForAttention = {
                    queryCode: 'IsCorrectFormulaDate',
                    parameterValues: [
                        {
                            key: '@Date',
                            value: value
                        },
                        {
                            key: '@RatingId',
                            value: this.form.getControlValue('RatingId')
                        }
                    ]
                };
                this.queryExecutor.getValue(queryForAttention).subscribe((val) => {
                    
                    if (val > 0) {
                        this.openPopUpInfoDialog('На поточну дату та по даному рейтингу вже створена формула'); 
                        this.form.setControlValue('Date_Start', null);
                    }
                });
            }            
        },
        GetFormulaNameById: function(FormulaId) {
            const queryForAttention = {
                queryCode: 'GetFormulaNameById',
                parameterValues: [
                    {
                        key: '@Id',
                        value: this.form.getControlValue('formula_id')
                    }
                ]
            };
            this.queryExecutor.getValue(queryForAttention).subscribe((val) => {
                this.form.setControlValue('RatingFormulaContent', val);
            })
        },
        onChanged_formula_id: function(value) {
            this.form.setControlValue('RatingFormulaContent', null);
            if (typeof value === 'string') {
                return
            }
            
            this.GetFormulaNameById(value);
        }
    };
}());
