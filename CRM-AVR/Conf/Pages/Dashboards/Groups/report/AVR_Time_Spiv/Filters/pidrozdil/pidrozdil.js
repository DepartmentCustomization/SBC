(function() {
    return {
        placeholder: 'Пошук працівника',
        onChangeValue: function(value) {
            this.selectMan(value);
        },
        selectMan(value) {
            let message = {
                name: 'yo',
                package: {
                    value: value
                }
            }
            this.messageService.publish(message);
        }
    };
}());
