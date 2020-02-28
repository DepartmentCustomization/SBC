(function() {
    return {
        init: function() {
            let org = this.form.getControlValue('organizations_name');
            if (org == null) {
                this.form.setControlRequirement('Number', true);
            }
            this.form.disableControl('parent_organization_id');
            this.form.disableControl('organizations_name');
            this.form.disableControl('Short_name');
        }
    };
}());
