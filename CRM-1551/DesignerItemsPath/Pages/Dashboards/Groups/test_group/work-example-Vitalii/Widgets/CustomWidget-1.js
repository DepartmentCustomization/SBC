(function () {
  return {
    title: '',
    hint: '',
    formatTitle: function() {},
    customConfig:
                `<div id='container2'></div>
                `
    ,
    init: function() {
        let executeQuery = {
            queryCode: '',
            limit: -1,
            parameterValues: []
        };
        this.queryExecutor(executeQuery, this.load, this);
    },
    load: function(data) {
    }
};
}());
