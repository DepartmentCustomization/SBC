(function() {
    return {
        title: [],
        hint:  '',
        param_btm_load: 0,
        formatTitle: function() {},
        customConfig:
                `
                    <style>
                        #infoBtn1 {
                            border: none !important;
                            background: transparent !important;
                            
                        }
                        #infoBtn1:hover .theIcon {
                            cursor:pointer;
                            opacity: 1 !important;
                            
                        }
                        .modal1 {
                            display: none;
                            position: fixed;
                            z-index: 1; 
                            left: 0;
                            bottom:-63px;
                            width: 100%;
                            height: 100%; 
                            overflow: auto; 
                            background-color: rgb(0,0,0); 
                            background-color: rgba(0,0,0,0.4);
                        }
                        .modal1-content {
                            background-color: #fefefe;
                            border-radius:5px;
                            margin: 15% auto; 
                            padding: 20px;
                            border: 1px solid #888;
                            width: 40%; 
                            box-shadow: rgb(178, 178, 178) 1px 1px 2px;
                        }
                        .close1 {
                            position: relative;
                            top: -25px;
                            right: -10px;
                            color: #aaa;
                            float: right;
                            font-size: 28px;
                            font-weight: bold;
                        }
                        
                        .close1:hover,
                        .close1:focus {
                            color: black;
                            text-decoration: none;
                            cursor: pointer;
                        }
                        .down12333124 {
                            float: right;
                            padding-right: 8px;
                        }
                    </style>

                    <!-- The modal1 -->
                    <div id="myModal1" class="modal1">
                        <!-- modal1 content -->
                        <div class="modal1-content">
                            <span class="close1">&times;</span>
                            <p style="text-align:center; font-size: 2em;"> Дані збережені <span id="dateValue1"> </span> </p>
                        </div>
                    </div>
           
                    <div>                
                        <div  id="select_menuUser" style="margin-left: 10px; font-style: italic; display: inline; text-decoration: underline; color: cadetblue; font-size: 1.1em;"> </div>  
                        <div class="down12333124">
                            <button id="btn_save_data" style="background-color: #adb2b7; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer;"> ЗБЕРЕГТИ </button>
                         </div> 
                    </div>
   

                `
        ,
        init: function() {
            let executeQuery = {
                queryCode: 'select_message',
                limit: -1,
                parameterValues: [{key: '@Phone', value: '0444119057'},{key: '@PIB', value: '%'},{key: '@Adress', value: '%'}]
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        load: function(data) {
        // debugger;
            if (this.param_btm_load == 0) {
                btn_save_data.addEventListener('click', function() {
                    // debugger;
                    let executeQuery = {
                        queryCode: 'ARM_userAccess_SaveMenu',
                        limit: -1,
                        parameterValues: [
                            {key: '@UserId', value: document.getElementById('UserId_Value').innerText},
                            {key: '@menu_checkbox_2', value: document.getElementById('menu_checkbox_2').checked},
                            {key: '@menu_checkbox_3', value: document.getElementById('menu_checkbox_3').checked},
                            {key: '@menu_checkbox_5', value: document.getElementById('menu_checkbox_5').checked},
                            {key: '@menu_checkbox_6', value: document.getElementById('menu_checkbox_6').checked},
                            {key: '@menu_checkbox_7', value: document.getElementById('menu_checkbox_7').checked},
                            {key: '@menu_checkbox_8', value: document.getElementById('menu_checkbox_8').checked},
                            {key: '@menu_checkbox_9', value: document.getElementById('menu_checkbox_9').checked},
                            {key: '@menu_checkbox_10', value: document.getElementById('menu_checkbox_10').checked},
                            {key: '@menu_checkbox_12', value: document.getElementById('menu_checkbox_12').checked},
                            {key: '@menu_checkbox_13', value: document.getElementById('menu_checkbox_13').checked},
                            {key: '@menu_checkbox_14', value: document.getElementById('menu_checkbox_14').checked},
                            {key: '@menu_checkbox_16', value: document.getElementById('menu_checkbox_16').checked},
                            {key: '@menu_checkbox_17', value: document.getElementById('menu_checkbox_17').checked},
                            {key: '@menu_checkbox_18', value: document.getElementById('menu_checkbox_18').checked},
                            {key: '@menu_checkbox_19', value: document.getElementById('menu_checkbox_19').checked},
                            {key: '@menu_checkbox_20', value: document.getElementById('menu_checkbox_20').checked},
                            {key: '@menu_checkbox_21', value: document.getElementById('menu_checkbox_21').checked},
                            {key: '@menu_checkbox_22', value: document.getElementById('menu_checkbox_22').checked},
                            {key: '@menu_checkbox_23', value: document.getElementById('menu_checkbox_23').checked},
                            {key: '@menu_checkbox_24', value: document.getElementById('menu_checkbox_24').checked},
                            {key: '@menu_checkbox_25', value: document.getElementById('menu_checkbox_25').checked},
                            {key: '@menu_checkbox_26', value: document.getElementById('menu_checkbox_26').checked},
                            {key: '@menu_checkbox_27', value: document.getElementById('menu_checkbox_27').checked},
                            {key: '@menu_checkbox_28', value: document.getElementById('menu_checkbox_28').checked},
                            {key: '@menu_checkbox_29', value: document.getElementById('menu_checkbox_29').checked},
                            {key: '@menu_checkbox_30', value: document.getElementById('menu_checkbox_30').checked},
                            {key: '@menu_checkbox_31', value: document.getElementById('menu_checkbox_31').checked},
                            {key: '@menu_checkbox_32', value: document.getElementById('menu_checkbox_32').checked},
                            {key: '@menu_checkbox_33', value: document.getElementById('menu_checkbox_33').checked},
                            {key: '@menu_checkbox_34', value: document.getElementById('menu_checkbox_34').checked},
                            {key: '@menu_checkbox_35', value: document.getElementById('menu_checkbox_35').checked},
                            {key: '@menu_checkbox_36', value: document.getElementById('menu_checkbox_36').checked},
                            {key: '@menu_checkbox_37', value: document.getElementById('menu_checkbox_37').checked},
                            {key: '@menu_checkbox_38', value: document.getElementById('menu_checkbox_38').checked},
                            {key: '@menu_checkbox_39', value: document.getElementById('menu_checkbox_39').checked},
                            {key: '@menu_checkbox_40', value: document.getElementById('menu_checkbox_40').checked},
                            {key: '@menu_checkbox_41', value: document.getElementById('menu_checkbox_41').checked},
                            {key: '@menu_checkbox_42', value: document.getElementById('menu_checkbox_42').checked},
                            {key: '@menu_checkbox_43', value: document.getElementById('menu_checkbox_43').checked},
                            {key: '@menu_checkbox_44', value: document.getElementById('menu_checkbox_44').checked},
                            {key: '@menu_checkbox_45', value: document.getElementById('menu_checkbox_45').checked},
                            {key: '@menu_checkbox_46', value: document.getElementById('menu_checkbox_46').checked},
                            {key: '@menu_checkbox_47', value: document.getElementById('menu_checkbox_47').checked},
                            {key: '@menu_checkbox_48', value: document.getElementById('menu_checkbox_48').checked},
                            {key: '@menu_checkbox_49', value: document.getElementById('menu_checkbox_49').checked},
                            {key: '@menu_checkbox_50', value: document.getElementById('menu_checkbox_50').checked},
                            {key: '@menu_checkbox_51', value: document.getElementById('menu_checkbox_51').checked},
                            {key: '@menu_checkbox_52', value: document.getElementById('menu_checkbox_52').checked},
                            {key: '@menu_checkbox_53', value: document.getElementById('menu_checkbox_53').checked},
                            {key: '@menu_checkbox_54', value: document.getElementById('menu_checkbox_54').checked},
                            {key: '@menu_checkbox_56', value: document.getElementById('menu_checkbox_56').checked},
                            {key: '@menu_checkbox_57', value: document.getElementById('menu_checkbox_57').checked},
                            {key: '@menu_checkbox_58', value: document.getElementById('menu_checkbox_58').checked},
                            {key: '@menu_checkbox_59', value: document.getElementById('menu_checkbox_59').checked},
                            {key: '@menu_checkbox_60', value: document.getElementById('menu_checkbox_60').checked},
                            {key: '@menu_checkbox_61', value: document.getElementById('menu_checkbox_61').checked},
                            {key: '@menu_checkbox_62', value: document.getElementById('menu_checkbox_62').checked},
                            {key: '@menu_checkbox_63', value: document.getElementById('menu_checkbox_63').checked},
                            {key: '@menu_checkbox_64', value: document.getElementById('menu_checkbox_64').checked},
                            {key: '@menu_checkbox_65', value: document.getElementById('menu_checkbox_65').checked},
                            {key: '@menu_checkbox_66', value: document.getElementById('menu_checkbox_66').checked},
                            {key: '@menu_checkbox_67', value: document.getElementById('menu_checkbox_67').checked},
                            {key: '@menu_checkbox_68', value: document.getElementById('menu_checkbox_68').checked},
                            {key: '@menu_checkbox_69', value: document.getElementById('menu_checkbox_69').checked},
                            {key: '@menu_checkbox_70', value: document.getElementById('menu_checkbox_70').checked},
                            {key: '@menu_checkbox_71', value: document.getElementById('menu_checkbox_71').checked},
                            {key: '@menu_checkbox_72', value: document.getElementById('menu_checkbox_72').checked},
                            {key: '@menu_checkbox_74', value: document.getElementById('menu_checkbox_74').checked},
                            {key: '@menu_checkbox_75', value: document.getElementById('menu_checkbox_75').checked},
                            {key: '@menu_checkbox_76', value: document.getElementById('menu_checkbox_76').checked},
                            {key: '@menu_checkbox_77', value: document.getElementById('menu_checkbox_77').checked},
                            {key: '@menu_checkbox_78', value: document.getElementById('menu_checkbox_78').checked},
                            {key: '@menu_checkbox_79', value: document.getElementById('menu_checkbox_79').checked},
                            {key: '@menu_checkbox_80', value: document.getElementById('menu_checkbox_80').checked}
                        ]
                    };
                    this.queryExecutor(executeQuery, this.load, this);
                    let modal = document.getElementById('myModal1');
                    // Get the <span> element that closes the modal
                    let span = document.getElementsByClassName('close1')[0];
                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function() {
                        modal.style.display = 'none';
                    };
                    // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function(event) {
                        if (event.target == modal) {
                            modal.style.display = 'none';
                        }
                    };
                    modal.style.display = 'block';
                }.bind(this), false);
                this.param_btm_load = 1;
            }
        }
    };
}());
