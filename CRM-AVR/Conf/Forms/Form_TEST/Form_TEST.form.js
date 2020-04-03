(function() {
    return {
        init: function() {
            this.form.onControlValueChanged('count', this.isCounter);
        },
        isCounter: function(scorer) {
            for(let i = 1; i <= 10; i++) {
                if (typeof this.form.getControlValue('diameter' + i) === 'object') {
                    console.log('Remove to field: ' + i)
                    this.form.removeControl('diameter' + i)
                }
            }
            for(let i = 1; i <= scorer; i++) {
                let field_diameter = {
                    placeholder: 'Діаметр ' + i,
                    code: 'diameter' + i,
                    hidden: false,
                    fullScreen: true,
                    // type: 'number',
                    position: i + 1,
                    required: false,
                    queryListCode: 'dir_DiametersSelectRows',
                    listDisplayColumn: 'Size',
                    listKeyColumn: 'Id',
                    type: 'select'
                }
                // let field_value = {
                //     placeholder: 'Кількість ' + i,
                //     code: 'value'+ i,
                //     hidden: false,
                //     fullScreen: false,
                //     type: 'number',
                //     position: i+2,
                //     required: false
                //     }
                this.form.addControl('test', field_diameter);
            }
        }
    };
}());
