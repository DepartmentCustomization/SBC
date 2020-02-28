(function () {
  return {
    title: ' ',
    hint: '',
    formatTitle: function() {},
    customConfig:
                `
                <style>
                    #canalization{
                        text-align: center;
                        font-size: 22px;
                        font-weight: 700
                    }
                </style>
                <div id='canalization'> КАНАЛІЗАЦІЯ  </div>
                `
    ,
    init: function() {
        let executeQuery = {
            queryCode: 'Chart_Control_of_trips',
            limit: -1,
            parameterValues: []
        };
        this.queryExecutor(executeQuery, this.load);
    },
    load: function(data) {
    }
};
}());
