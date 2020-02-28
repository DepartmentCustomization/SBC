(function () {
  return {
    placeholder: 'Опис',
    onChangeValue: function(value) {
                var message = {
                                name: 'chance_filter_Description',
                                value: value
                              };
                this.messageService.publish(message);
    },
   init: function() {
        
    }
};
}());
