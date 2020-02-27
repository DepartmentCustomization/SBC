(function () {
  return {
    placeholder: 'Пошук бригадира',
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
