(function () {
  return {
    title: [],
    param_hiden: 1,
    param_data_prev: 1,
    param_type_prev: 1,
    param_filter: 1,
    count_click: 0,
    hint:  '',
    formatTitle: function() {},
    customConfig:
                `
                    
                    <style>
                        .hid_elem {
                            display: none;
                        }
                        .back_color_select_row {
                            background-color: #ccdff3;
                        }
                    </style>
 
                    <div id="person_table_id">
                        <param name="1" value="1" id="param_query"/>
                        <div style="margin-bottom: 10px;">  <i class="material-icons" id="refresh_group_list" style="cursor: pointer; margin-left: 14px;font-size: 3em;" title="Оновити">loop</i> <i class="material-icons hid_elem" id="undo_group_list" style="cursor: pointer; margin-left: 14px;font-size: 3em;" title="Назад">undo</i> </div>
                    </div>

                `
    ,
    init: function() {
        let executeQuery = {
            queryCode: 'menuRights_Person',
            parameterValues: [{
                        key: '@Id',
                        value: 1
                    },{
                        key: '@Type',
                        value: 1
                                }]
        };
        this.queryExecutor(executeQuery, this.load, this);
    },
    load_group: function(data, type) {
        //  debugger;
        this.count_click = this.count_click + 1;  
        this.param_data_prev = 1;
        this.param_type_prev = 1;
                
        // if (this.count_click == 1 && this.param_data_prev == 1) {
        //         this.param_data_prev = 1;
        //         this.param_type_prev = 1;
        //         // this.count_click = 1;  
        // }
        // else
        // {
        //      this.param_data_prev = data;
        //      this.param_type_prev = type;
        // };
         
        if (data != this.param_hiden) { 
            document.getElementById('refresh_group_list').classList.add("hid_elem");
            document.getElementById('undo_group_list').classList.remove("hid_elem");
        } else {
            document.getElementById('undo_group_list').classList.add("hid_elem");
            document.getElementById('refresh_group_list').classList.remove("hid_elem");  
        };
         
        var elem = document.querySelector("#clock");
        let executeQuery = {
                queryCode: 'menuRights_Person',
                parameterValues: [{
                            key: '@Id',
                            value: data
                        },{
                            key: '@Type',
                            value: type
                        }]
            };
        this.queryExecutor(executeQuery, this.load, this);
    },
    load_filter: function(data, type) {
        if (this.param_filter == 1) {
            var div = document.getElementById('refresh_group_list');
            var listener = function (event) {
                    this.load_group(1, 1);
            }.bind(this);
            div.addEventListener('click', listener, false);
            // div.removeEventListener('click', listener, false);
    
            var div2 = document.getElementById('undo_group_list');
            var listener2 = function (event) {
                    this.load_group(this.param_data_prev, this.param_type_prev);
            }.bind(this);
            div2.addEventListener('click', listener2, false);
            // div2.removeEventListener('click', listener2, false);
                      
            this.param_filter = 0;       
            
            //  document.getElementById('refresh_group_list').addEventListener('click', function(event) {
            //                 this.load_group(1, 1);
            //                                 }.bind(this), false); 
        
            //   document.getElementById('undo_group_list').addEventListener('click', function(event) {
            //                 this.load_group(this.param_data_prev, this.param_type_prev);
            //                                 }.bind(this), false);  
        };
    },
    load: function(data) {
        console.log(data);
        //  debugger;
        this.load_filter();
    
        if (document.getElementsByClassName('group_variant')){
            var paras = document.getElementsByClassName('group_variant');
            while(paras[0]) {
                paras[0].parentNode.removeChild(paras[0]);
            };
        };
    
        if (data) { 
            for (var i=0;i<data.rows.length;i++){
                var iDiv = document.getElementById('person_table_id');
                var iDiv2 = document.createElement('li');
                
                if (data.rows[i].values[5] == 0) {
                    iDiv2.style = ` height: 40px;
                                font-size: 16px;
                                color: black;
                                border-bottom: 1px solid #889aad;
                                padding: 6px 8px 6px 16px;
                                text-decoration: none;
                                display: block;
                                width: 100%;
                                text-align: left;
                                cursor: pointer;
                                list-style-type: none;
                                outline: none;`;
                    iDiv2.innerHTML = '<li id="label_m_'+i+'" value="'+data.rows[i].values[0]+'" style="cursor: pointer;" ><i class="material-icons" style="margin-right: 6px;">folder</i>'+data.rows[i].values[1] + '/ ' + data.rows[i].values[4]+ '/ ' + data.rows[i].values[5] + '<param name="'+data.rows[i].values[4]+'" value="'+data.rows[i].values[5]+'" id="param_m_'+i+'"/></li>'; 
                }else {
                    iDiv2.style = ` height: 40px;
                                font-size: 16px;
                                color: black;
                                border-bottom: 1px solid #889aad;
                                padding: 6px 8px 6px 16px;
                                text-decoration: none;
                                display: block;
                                width: 100%;
                                text-align: left;
                                cursor: pointer;
                                list-style-type: none;
                                outline: none;`;   
                    iDiv2.innerHTML = '<li id="label_m_'+i+'" value="'+data.rows[i].values[0]+'" style="cursor: pointer;" ><i class="material-icons" style="margin-right: 6px;">folder</i>'+data.rows[i].values[1] + '/ ' + data.rows[i].values[4]+ '/ ' + data.rows[i].values[5] + '<param name="'+data.rows[i].values[4]+'" value="'+data.rows[i].values[5]+'" id="param_m_'+i+'"/></li>'; 
                                   
                  };
                                    
                if (data.rows[i].values[5] == 0 && data.rows[i].values[4] == 0 ) {
                    iDiv2.style = ` height: 40px;
                                font-size: 16px;
                                color: #8f9ba7;
                                border-bottom: 1px solid #889aad;
                                padding: 6px 8px 6px 16px;
                                text-decoration: none;
                                display: block;
                                width: 100%;
                                text-align: left;
                                cursor: pointer;
                                list-style-type: none;
                                outline: none;`;
                    iDiv2.innerHTML = '<li id="label_m_'+i+'" value="'+data.rows[i].values[0]+'" style="cursor: pointer;" ><i class="material-icons" style="margin-right: 6px;">folder</i>'+data.rows[i].values[1] + '/ ' + data.rows[i].values[4]+ '/ ' + data.rows[i].values[5] + '<param name="'+data.rows[i].values[4]+'" value="'+data.rows[i].values[5]+'" id="param_m_'+i+'"/></li>'; 
                };
                                    
                if (data.rows[i].values[5] == null && data.rows[i].values[4] == null ) {
                    iDiv2.style = ` height: 40px;
                                font-size: 16px;
                                color: #053e77;
                                border-bottom: 1px solid #889aad;
                                padding: 6px 8px 6px 16px;
                                text-decoration: none;
                                display: block;
                                width: 100%;
                                text-align: left;
                                cursor: pointer;
                                list-style-type: none;
                                outline: none;`;
                    iDiv2.innerHTML = '<li id="label_m_'+i+'" value="'+data.rows[i].values[0]+'" style="cursor: pointer;" ><i class="material-icons" style="margin-right: 6px;">account_circle</i>'+data.rows[i].values[7]+ '<param name="'+data.rows[i].values[6]+'" value="'+data.rows[i].values[7]+'" id="param_m_'+i+'"/></li>'; 
                };
                // debugger;
                iDiv2.id = 'q_group'+ i;
                iDiv2.className = 'group_variant';
                iDiv.appendChild(iDiv2);
            };  
            
            for (let i = 0; i < document.getElementsByClassName('group_variant').length; i++) {
                var divMenuItemBlock = "";
                var divMenuItemBlock = document.getElementsByClassName('group_variant')[i];
                
                // Функция клика на группу ( Скрытие групп и отоборажение подгрупп)
                divMenuItemBlock.addEventListener('click', function(event) {
                    // debugger;
                    if (Number(document.getElementById('param_m_'+i).name) == 0 && Number(document.getElementById('param_m_'+i).value) != 0) {
                        console.log("Есть группа, нет пользователей!");
                        this.load_group(document.getElementById('label_m_'+i).value, 1);
                       };
 
                    if (Number(document.getElementById('param_m_'+i).name) != 0 && Number(document.getElementById('param_m_'+i).value) != 0) {  
                        console.log("Есть группа, есть пользователи!");
                        //debugger;
                                            
                            if (document.getElementById('label_m_'+i).value == 99999) {
                                console.log(document.getElementById('param_m_'+i).name, ' / ', document.getElementById('param_m_'+i).value);
                                for (let i = 0; i < document.getElementsByClassName('group_variant').length; i++) {
                                    document.getElementsByClassName('group_variant')[i].classList.remove("back_color_select_row");
                                };
                                                
                                document.getElementsByClassName('group_variant')[i].classList.add("back_color_select_row");
                                document.getElementById('select_menuUser').innerText = document.getElementById('param_m_'+i).value;
                                                    
                                let message = {
                                        name: 'showUserData',
                                        package: {
                                            type: document.getElementById('param_m_'+i).name
                                        }
                                    };
                                this.messageService.publish(message);
                                 // 
                            } else {
                                this.load_group(document.getElementById('label_m_'+i).value, 1);
                               };
                    };
                                   
                    if (Number(document.getElementById('param_m_'+i).name) != 0 && Number(document.getElementById('param_m_'+i).value) == 0) {  
                        console.log("Нет групп, есть пользователи!");
                                           
                        if (document.getElementById('label_m_'+i).value == 99999) {
                            console.log(document.getElementById('param_m_'+i).name, ' / ', document.getElementById('param_m_'+i).value);
                                                
                            for (let i = 0; i < document.getElementsByClassName('group_variant').length; i++) {
                                document.getElementsByClassName('group_variant')[i].classList.remove("back_color_select_row");
                            };
                            document.getElementsByClassName('group_variant')[i].classList.add("back_color_select_row");
                            document.getElementById('select_menuUser').innerText = document.getElementById('param_m_'+i).value;            
                            let message = {
                                    name: 'showUserData',
                                    package: {
                                        type: document.getElementById('param_m_'+i).name
                                    }
                                };
                            this.messageService.publish(message);
                        } else {
                            this.load_group(document.getElementById('label_m_'+i).value, 2);
                        };
                    };
 
                    if (Number(document.getElementById('param_m_'+i).name) == 0 && Number(document.getElementById('param_m_'+i).value) == 0) {  
                        console.log("Нет групп, нет пользователей!");
                        // this.load_group(document.getElementById('label_m_'+i).value);
                    };
                }.bind(this), false);         
            };
 
    };
    
    }
}   ;
}());
