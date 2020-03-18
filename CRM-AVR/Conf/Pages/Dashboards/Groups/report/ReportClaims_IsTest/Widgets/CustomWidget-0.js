(function() {
    return {
        title: [],
        hint: '',
        formatTitle: function() {},
        customConfig:
                `
                <style>
                        

/* The container */
.container {
    display: inline-table;
    position: relative;
    padding-left: 38px;
    margin-bottom: 18px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid #eeeeee;
    border-radius: 15px;
    margin-left: 14px;
}



/* Hide the browser's default radio button */
.container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
    position: absolute;
    top: 3px;
    left: 3px;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
    background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container input:checked ~ .checkmark {
    background-color: #517a9b;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
    display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
 	top: 9px;
	left: 9px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: white;
}


/* Для таблиц параметров внешних баз -- начало*/
.container_param {
    position: relative;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-left: 8%;
}

/* Hide the browser's default radio button */
.container_param input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

/* Create a custom radio button */
.checkmark_param {
    position: absolute;
    top: 3px;
    left: 3px;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container_param:hover input ~ .checkmark_param {
    background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container_param input:checked ~ .checkmark_param {
    background-color: #517a9b;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark_param:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the indicator (dot/circle) when checked */
.container_param input:checked ~ .checkmark_param:after {
    display: block;
}

/* Style the indicator (dot/circle) */
.container_param .checkmark_param:after {
 	top: 9px;
	left: 9px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: white;
}




/* Для таблиц параметров внешних баз -- конец*/

/* The container */
.container2 {
    display: inline-table;
    position: relative;
    padding-left: 38px;
    margin-bottom: 18px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid #eeeeee;
    border-radius: 15px;
    margin-left: 14px;
}



/* Hide the browser's default radio button */
.container2 input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}


/* On mouse-over, add a grey background color */
.container2:hover input ~ .checkmark {
    background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container2 input:checked ~ .checkmark {
    background-color: #517a9b;
}


/* Show the indicator (dot/circle) when checked */
.container2 input:checked ~ .checkmark:after {
    display: block;
}

/* Style the indicator (dot/circle) */
.container2 .checkmark:after {
 	top: 9px;
	left: 9px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: white;
}



table {
    border-collapse: collapse;
    width: 100%;
}

th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

tr:hover {background-color:#f5f5f5;}


.top-bar .searchbar {
    padding-left: 12px;
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
    max-width: 400px;
    position: relative
}



.top-bar .searchbar input[type="text"].f-input {
    margin: 0;
    height: 36px;
    border-width: 1px;
    border-color: #c8ccd0;
    border-radius: 3px;
    width: 100%;
    font-size: 14px;
    background-color: #FFF;
    box-shadow: none;
    color: #3b4045
}

.top-bar .searchbar input[type="text"].f-input:hover {
    border-color: rgba(0,149,255,0.5);
    box-shadow: inset 0 1px 2px #e4e6e8,0 0 2px rgba(0,149,255,0.2)
}

.top-bar .searchbar input[type="text"].f-input:focus {
    background-color: #FFF;
    border-color: #0095ff;
    box-shadow: inset 0 2px 2px #fafafb,0 0 5px rgba(0,119,204,0.4)
}

.top-bar .searchbar input[type="text"].f-input::-webkit-input-placeholder {
    color: #6a737c;
    font-style: normal
}

.top-bar .searchbar input[type="text"].f-input::-moz-placeholder {
    color: #6a737c;
    font-style: normal;
    opacity: 1
}

.top-bar .searchbar input[type="text"].f-input:-ms-input-placeholder {
    color: #6a737c;
    font-style: normal
}

.top-bar .searchbar input[type="text"].f-input::-ms-input-placeholder {
    color: #6a737c;
    font-style: normal
}

.top-bar .searchbar input[type="text"].f-input::placeholder {
    color: #6a737c;
    font-style: normal
}

.top-bar .searchbar .btn-topbar-primary {
    font-weight: normal;
    background: none;
    border: 1px solid transparent;
    border-radius: 2px;
    box-shadow: none;
    color: #FFF;
    background-color: #0095ff;
    border: 1px solid #07c;
    box-shadow: inset 0 1px 0 #66bfff;
    height: 36px;
    opacity: 0;
    margin: 0;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 0 3px 3px 0;
    z-index: -1;
    padding: 0 12px;
    transition: opacity .35s cubic-bezier(.165, .84, .44, 1)
}

.top-bar .searchbar .btn-topbar-primary:hover,.top-bar .searchbar .btn-topbar-primary:focus {
    color: rgba(255,255,255,0.9);
    background-color: #07c;
    border-color: #005999;
    box-shadow: inset 0 1px 0 #3af
}

.top-bar._search-open .navigation {
    opacity: 0;
    max-width: 0
}

.top-bar._search-open .searchbar input[type="text"].f-input {
    background-color: #FFF;
    padding-right: 50px
}

.top-bar._search-open .searchbar .btn-topbar-primary {
    opacity: 1;
    transform: translateY(-50%) translateX(1px);
    z-index: 0
}         

                .btn_filter_group{
                    height: 100%; 
                    border-radius: 8px;
                    background-color: white;
                }
                 .modal {
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
                .modal-content {
                    background-color: #fefefe;
                    border-radius:5px;
                    margin: 15% auto; 
                    padding: 20px;
                    border: 1px solid #888;
                    width: 85%; 
                    box-shadow: rgb(178, 178, 178) 1px 1px 2px;
                }
                .close {
                    position: relative;
                    top: -25px;
                    right: -10px;
                    color: #aaa;
                    float: right;
                    font-size: 28px;
                    font-weight: bold;
                }
                .close:hover,
                .close:focus {
                    color: black;
                    text-decoration: none;
                    cursor: pointer;
                }
                
                .Btn_ModalForm{
                        height: 35px;
                        width: 100%;
                        background: #f7eeee;
                }
                
                
                .display_none{
                    display: none;
                }
                
                .sp_title{
                    font-size: 2em;
                    display: inherit;
                    width: 100%;
                    text-align: center;
                    margin-bottom: 20px;
                }
                
                .btn_add_cl{
                    border-radius: 25%;
                    color: #4869aa;
                    cursor: pointer;
                    background: white;
                        transition: all ease-in-out 0.2s;
                            border: none;
                    width: 50px;
                    height: 50px;
                }
                .btn_add_cl:hover{
                  border: 1px solid #888;
                  background-color: #ddd;
                }


                table, th, td {
                    border: 1px solid #a5a5a58f;
                    border-collapse: collapse;
                }

                th, td {
                    padding: 5px;
                }
                
                .select_filters{
                    width: 100%;
                    height: 100%;
                }
                
                .span_noData{
                    color: red;
                }
                
                .date_filter{
                    width: 100%;
                    display: grid;
                }
                </style>
                
                <div>
                    <span class="sp_title"> Фильтр </span>
                    <div id="Table_Filters">
                       <table id="tabl_fil" style="width:100%">
                          <tr id="row_fil_1">
                            <th></th>
                            <th>Поле</th>
                            <th>Пошук</th> 
                            <th>Значення</th>
                          </tr>
                          
                        </table>                    
                    </div>
                    
                    <span style="display: inherit; padding-top: 30px;"> 
                        <button type="button" class="btn_add_cl" id="btn_add_filter">
                            <i class="material-icons" style="font-size: 3em;">add_box</i>
                        </button>
                    </span>
                    
                </div>
                
                
                <!--FILTERS The Modal Window -->
            <div id="myModal1" class="modal">
                <!-- Modal content -->
              	<div class="modal-content">
                    <span class="close">&times;</span>
                <p style="text-align: center; width: 97%; height: 40px; font-size: 1.5em; font-weight: bold;"> ПОЛЯ ДЛЯ ФИЛЬТРАЦИИ </p>
                <span class="span_noData display_none" id="span_noData_id">больше полей для фильтрации нет!</span>
                <form action="" id="Radio_Filters" class="Radio_Filters_class">
                   
                </form>
                
                <p style="text-align: right; width: 100%; height: 40px; margin-top: 15px;">  
                        <button type="button" style="width: 35%;" class="btn_filter_group" id="btn_search_filters">OK</button>
                </p> 
                </div>
            </div> 
                
    <p hidden id="chanLastValue"></p>            
    <p hidden id="chanLastId"></p>              
    <p hidden id="chanLastIdForPar"></p>              `
        ,
        init: function() {
            let executeQuery = {
                queryCode: 'SelectReport_Column',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQuery, this.load,this);
        },
        SelectedCol:[],
        load: function(data) {
        //console.log(data);
            if (data) {
            //   debugger;
                if (data.rows.length > 0) {
                    let paras = document.getElementsByClassName('container');
                    while(paras[0]) {
                        paras[0].parentNode.removeChild(paras[0]);
                    }
                    for (let i = 0; i < data.rows.length; i++) {
                        let iDiv = document.getElementById('Radio_Filters');
                        let iDiv2 = document.createElement('label');
                        iDiv2.style = '';
                        // debugger;
                        iDiv2.innerHTML = `
                                                        ` + data.rows[i].values[1] + `
                                                          <input type="radio" name="radio_fil" id="` + data.rows[i].values[0] + '" value="' + data.rows[i].values[1] + `">
                                                          <p hidden id="chanLastId_NEW">` + data.rows[i].values[4] + `</p>
                                                          <span class="checkmark"></span>
                                                        
                                                        `;
                        // Div2.id = 'okrug_radio'+ (Number(i));
                        iDiv2.className = 'container';
                        iDiv.appendChild(iDiv2);
                        // document.getElementById("changeDistrValue").innerText = "0";
                        //document.getElementById("input_adr_02").innerText = 'Load Data END';
                    }
                }
            }
            btn_search_filters.addEventListener('click', function() {
                for (var i = 0; i < document.getElementsByName('radio_fil').length; i++) {
                    //debugger;
                    if (document.getElementsByName('radio_fil')[i].checked == true) {
                        // debugger;
                        document.getElementById('chanLastValue').value = document.getElementsByName('radio_fil')[i].value;
                        document.getElementById('chanLastId').value = document.getElementsByName('radio_fil')[i].id;
                        document.getElementById('chanLastIdForPar').value = Number(document.getElementsByName('radio_fil')[i].nextElementSibling.innerText);
                        let clr_btn_length = document.getElementsByClassName('btn_clear').length;
                        let iDiv = document.getElementById('tabl_fil');
                        let iDiv2 = document.createElement('tr');
                        iDiv2.style = '';
                        iDiv2.innerHTML = `
                                <td><i class="material-icons btn_clear" style="font-size: 2em; color:red; cursor: pointer;" id="btn_clear_` + document.getElementById('chanLastId').value + `">clear</i></td>
                                <td>` + document.getElementById('chanLastValue').value + `</td>
                                <td id="TypeVariant` + document.getElementById('chanLastIdForPar').value + `">
                                </td> 
                                <td><select class="select_filters">
                                      <option selected>Пункт 2-1</option>
                                      <option>Пункт 2-2</option>
                                    </select>
                                </td>
                                            
                                            `;
                        iDiv2.id = 'Fil' + (Number(document.getElementById('chanLastId').value));
                        iDiv2.className = 'Fil_selected';
                        iDiv.children[0].append(iDiv2);
                        let executeQuery_TypeVariant = {
                            queryCode: 'SelectReport_ColumnTypeVariant',
                            limit: -1,
                            parameterValues: [{key: '@ColumnTypeId', value: Number(document.getElementById('chanLastIdForPar').value)}]
                        };
                        this.queryExecutor(executeQuery_TypeVariant, this.Load_TypeVariant, this);
                        //
                        let clr_length = document.getElementsByClassName('Fil_selected').length;
                        this.SelectedCol = [];
                        for (var i = 0; i < clr_length; i++) {
                            this.SelectedCol.push(Number(document.getElementsByClassName('Fil_selected')[i].id.replace('Fil','')));
                        }
                        //this.SelectedCol.push(Number(document.getElementById('chanLastId').value));
                        //console.log(this.SelectedCol);
                        document.getElementById('btn_clear_' + document.getElementById('chanLastId').value).onclick = function() {
                            // debugger;
                            event.currentTarget.parentElement.parentElement.remove()
                            this.SelectedCol = [];
                            let clr_length = document.getElementsByClassName('Fil_selected').length;
                            for (let i = 0; i < clr_length; i++) {
                                this.SelectedCol.push(Number(document.getElementsByClassName('Fil_selected')[i].id.replace('Fil','')));
                            }
                            //this.SelectedCol.push(Number(document.getElementById('chanLastId').value));
                            //console.log(this.SelectedCol);
                        }.bind(this);
                    }
                }
                modal1.style.display = 'none';
            }.bind(this));
            var modal1 = document.getElementById('myModal1');
            let span1 = document.querySelector('#myModal1 span.close');
            span1.onclick = function() {
                modal1.style.display = 'none';
            };
            modal1.style.display = 'block';
            let btn_add_fil = document.getElementById('btn_add_filter');
            btn_add_fil.onclick = function() {
                //debugger;
                if(this.SelectedCol.length === 0) {
                    this.SelectedCol = ['']
                }
                let executeQuery = {
                    queryCode: 'SelectReport_Column',
                    limit: -1,
                    parameterValues: [],
                    filterColumns: [{
                        key: 'Id',
                        value: {
                            operation: 0,
                            not: true,
                            values: this.SelectedCol
                        }
                    }]
                };
                this.queryExecutor(executeQuery, this.reload,this);
            }.bind(this);
        },
        Load_TypeVariant: function(data) {
        // console.log(data);
        // debugger
            console.log(document.getElementById('TypeVariant' + data.rows[0].values[1]));
            let txt_param = '<select class="select_filters" id="Select_' + document.getElementById('TypeVariant' + data.rows[0].values[1]).id + '">';
            for (var i = 0; i < data.rows.length; i++) {
                if (i == 0) {
                    txt_param = txt_param + '<option value="' + data.rows[i].values[0] + '" selected>' + data.rows[i].values[2] + '</option>';
                } else {
                    txt_param = txt_param + '<option value="' + data.rows[i].values[0] + '">' + data.rows[i].values[2] + '</option>';
                }
            }
            txt_param = txt_param + ' </select>';
            document.getElementById('TypeVariant' + data.rows[0].values[1]).innerHTML = txt_param;
            //Datetime
            document.getElementById('Select_' + document.getElementById('TypeVariant' + data.rows[0].values[1]).id).onchange = function() {
                //debugger;
                let kol_el = event.currentTarget.parentElement.nextElementSibling.children.length;
                for (let i = 0; i < kol_el; i++) {
                    event.currentTarget.parentElement.nextElementSibling.children[i].remove();
                }
                let iDiv = event.currentTarget.parentElement.nextElementSibling;
                let iDiv2 = document.createElement('div');
                //iDiv2.type = "datetime-local";
                if (event.currentTarget.selectedOptions[0].innerText == 'Между') {
                    iDiv2.innerHTML = '<input type="datetime-local" id="date_val1"><input type="datetime-local" id="date_val2">';
                } else {
                    iDiv2.innerHTML = '<input type="datetime-local" id="date_val1">';
                }
                if (event.currentTarget.selectedOptions[0].innerText == 'Между') {
                    //list
                    if (event.currentTarget.id.substr(-1) == '4') {
                        iDiv2.innerHTML = '<input type="text" id="text_val1"><input type="datetime-local" id="text_val2">';
                    }
                    //date
                    if (event.currentTarget.id.substr(-1) == '1') {
                        iDiv2.innerHTML = '<input type="datetime-local" id="date_val1"><input type="datetime-local" id="date_val2">';
                    }
                } else {
                    //list
                    if (event.currentTarget.id.substr(-1) == '4') {
                        iDiv2.innerHTML = '<input type="text" id="text_val1">';
                    }
                    //date
                    if (event.currentTarget.id.substr(-1) == '1') {
                        iDiv2.innerHTML = '<input type="datetime-local" id="date_val1">';
                    }
                }
                iDiv2.id = 'date_val';
                iDiv2.className = 'date_filter';
                iDiv.append(iDiv2);
            }.bind(this);
            //debugger;
            let kol_el = document.getElementById('Select_TypeVariant' + data.rows[0].values[1]).parentElement.nextElementSibling.children.length;
            for (var i = 0; i < kol_el; i++) {
                document.getElementById('Select_TypeVariant' + data.rows[0].values[1]).parentElement.nextElementSibling.children[i].remove();
            }
            let iDiv = document.getElementById('Select_TypeVariant' + data.rows[0].values[1]).parentElement.nextElementSibling;
            let iDiv2 = document.createElement('div');
            //iDiv2.type = "datetime-local";
            if (document.getElementById('Select_TypeVariant' + data.rows[0].values[1]).selectedOptions[0].innerText == 'Между') {
                //Int
                if (document.getElementById('Select_' + document.getElementById('TypeVariant' + data.rows[0].values[1]).id).id.substr(-1) == '3') {
                    iDiv2.innerHTML = '<input type="number" id="int_val1"><input type="number" id="int_val2">';
                }
                //date
                if (document.getElementById('Select_' + document.getElementById('TypeVariant' + data.rows[0].values[1]).id).id.substr(-1) == '1') {
                    iDiv2.innerHTML = '<input type="datetime-local" id="date_val1"><input type="datetime-local" id="date_val2">';
                }
            } else {
                //int
                if (document.getElementById('Select_' + document.getElementById('TypeVariant' + data.rows[0].values[1]).id).id.substr(-1) == '3') {
                    iDiv2.innerHTML = '<input type="number" id="int_val1">';
                }
                //list
                if (document.getElementById('Select_' + document.getElementById('TypeVariant' + data.rows[0].values[1]).id).id.substr(-1) == '4') {
                    iDiv2.innerHTML = '<input type="text" id="list_val1">';
                }
                //date
                if (document.getElementById('Select_' + document.getElementById('TypeVariant' + data.rows[0].values[1]).id).id.substr(-1) == '1') {
                    iDiv2.innerHTML = '<input type="datetime-local" id="date_val1">';
                }
                //listNested
                if (document.getElementById('Select_' + document.getElementById('TypeVariant' + data.rows[0].values[1]).id).id.substr(-1) == '5') {
                    iDiv2.innerHTML = '<input type="text" id="listnested_val1">';
                }
                //text
                if (document.getElementById('Select_' + document.getElementById('TypeVariant' + data.rows[0].values[1]).id).id.substr(-1) == '2') {
                    iDiv2.innerHTML = '<input type="text" id="text_val1">';
                }
            }
            iDiv2.id = 'date_val';
            iDiv2.className = 'date_filter';
            iDiv.append(iDiv2);
        },
        reload: function(data) {
        // console.log(data);
            var paras = document.getElementsByClassName('container');
            while(paras[0]) {
                paras[0].parentNode.removeChild(paras[0]);
            }
            if (data) {
            //   debugger;
                if (data.rows.length > 0) {
                    var paras = document.getElementsByClassName('container');
                    while(paras[0]) {
                        paras[0].parentNode.removeChild(paras[0]);
                    }
                    for (let i = 0; i < data.rows.length; i++) {
                        let iDiv = document.getElementById('Radio_Filters');
                        let iDiv2 = document.createElement('label');
                        iDiv2.style = '';
                        // debugger;
                        iDiv2.innerHTML = `
                                                        ` + data.rows[i].values[1] + `
                                                              <input type="radio" name="radio_fil" id="` + data.rows[i].values[0] + '" value="' + data.rows[i].values[1] + `">
                                                          <p hidden id="chanLastId_NEW">` + data.rows[i].values[4] + `</p>
                                                          <span class="checkmark"></span>
                                                        
                                                        `;
                        // Div2.id = 'okrug_radio'+ (Number(i));
                        iDiv2.className = 'container';
                        iDiv.appendChild(iDiv2);
                    }
                    document.getElementById('span_noData_id').classList.add('display_none');
                }
            }
            if (data.rows.length == 0) {
                document.getElementById('span_noData_id').classList.remove('display_none');
            }
            let modal1 = document.getElementById('myModal1');
            modal1.style.display = 'block';
        }
    };
}());
