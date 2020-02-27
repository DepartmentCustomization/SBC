(function () {
  return {
    title: [],
    hint: '',
    formatTitle: function() {},
     customConfig:
                `
                    
                    <style>
                        .hid_elem {
                            display: none;
                        }
                        
                        
                        .place_title{
                          text-align: center;
                          font-size: 1.4em;
                        }
                        
                    </style>
 
                     <div class="place_title" id="place_table_title" >
                        Місце
                    </div>
 
                    <div id="place_table_id">
                        <param name="1" value="1" id="place_param_query"/>
                    </div>

                `
    ,
    init: function() {
        // let executeQuery = {
        //     queryCode: '<Название источника>',
        //     limit: -1,
        //     parameterValues: []
        // };
        // this.queryExecutor(executeQuery, this.load);
    },
    load: function(data) {
    }
};
}());
