(function () {
  return {
    init:function(){
        this.form.onControlValueChanged('places_id', this.shoice_flats);
    },
    shoice_flats: function(pl_id){
        debugger;
        let param =  [{parameterCode: '@place_id' , parameterValue: pl_id }];
        this.form.setControlParameterValues('flats_id', param);

    }
};
}());
