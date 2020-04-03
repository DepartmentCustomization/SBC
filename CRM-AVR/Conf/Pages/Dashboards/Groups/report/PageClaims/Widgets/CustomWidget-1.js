(function() {
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
                        
                        
                        .person_title{
                          text-align: center;
                          font-size: 1.4em;
                        }
                        
                    </style>
 
                     <div class="person_title" id="person_table_title" >
                        Контакт
                    </div>
 
                    <div id="person_table_id">
                        <param name="1" value="1" id="param_query"/>
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
