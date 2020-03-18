(function() {
    return {
        init: function() {
        // let sh_name = this.form.getControlValue('shifts_name');
            this.form.setGroupTitle('Group_Shift_Order', 'Прив`язати зміну: ' + this.form.getControlValue('shifts_name') + ' до виїзду')
        }
    };
}());
