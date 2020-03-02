(function() {
    return {
        init: function() {
            this.details.setVisibility('Detail_Places_Cl_2', false);
            this.details.setVisibility('Detail_Template', false);
            this.form.disableControl('Size');
            this.form.disableControl('Types_name');
            this.form.disableControl('places_name');
            this.form.disableControl('organization_name');
            this.form.disableControl('Description');
            this.form.disableControl('classes_name');
            this.form.disableControl('place_type_name');
            this.form.disableControl('add');
            this.form.disableControl('contact_name');
            let btn_applyTemplate = document.getElementById('btn_applyTemplate');
            btn_applyTemplate.addEventListener('click', (e) => {
                this.navigateTo('/sections/Test_Claims/add/Template/' + this.form.getControlValue('temp_id'))
            });
        },
        afterSave: function() {
            const myForm = {
                title: '',
                text: 'Створити заявку за шаблоном?',
                acceptBtnText: 'create',
                cancelBtnText: 'no'
            };
            const formCallback = (res) => {
                if (res == true) {
                    this.details.create('Detail_Template');
                }
            }
            this.openModalForm(myForm, formCallback);
        }
    };
}());
