(function() {
    return {
        limit: 100,
        formatTitle: function() {
            return `
            <style>
                thead tr[class^='ng-star']:last-child th {
                    background: rgb(79,129,189) !important;         
                }
                
                thead tr[class^='ng-star']  th:nth-child(1) {
                    background: rgb(226,107,10) !important;    
                }
                thead tr[class^='ng-star']  th:nth-child(2)  {
                    background: rgb(192,80,77) !important; 
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
                	display: block;
                	width:50%;
                	max-width: 590px;
                	padding: 16px;
                	position: absolute;
                    top: 40%;
                    left: 50%;
                    transform: translate(-50%, -40%);
                	box-sizing:border-box;
                    pointer-events: auto;
                    background-color: #fff;
                    background-clip: padding-box;
                    border: 1px solid rgba(0,0,0,.4);
                    border-radius: .3rem;
                	color: #212529;
                	font-weight:400;
                	font-size: 1rem;
                	line-height: 1.5;
                	text-align: left;
                }
                
                .modal1-content p {
                    margin: 5px;
                    font-size: 1rem;
                }
                
                #btn_save_data {
                	height: 40px;
                    width: 130px;
                    font-weight: 400;
                    text-align: center;
                    font-size: 1rem;
                    line-height: 1.5;
                    color: #fff;
                    padding: .375rem .75rem;
                    border: 1px solid transparent;
                    background-color: #007bff;
                    border-color: #007bff;
                    border-radius: .25rem;
                	margin-top: 19px;
                	white-space: nowrap;
                    vertical-align: middle;
                    transition: color .15s 
                	    ease-in-out,background-color .15s 
                	    ease-in-out,border-color .15s 
                	    ease-in-out,box-shadow .15s 
                	    ease-in-out;
                }
                
                #btn_save_data:hover{
                	background-color: #0069d9;
                    border-color: #0062cc;
                    cursor: pointer;
                }
                        
                .close1 {
                    position: relative;
                    top: -15px;
                    right: 0px;
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
                
                @media screen and (min-width: 1200px){
                    td{
                      height: 3.5em;
                    }
                }
                .btn {
                    height:100%;
                    font-size: 12px;
                    float: left;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    padding: 4px 8px;
                    transition: 0.3s;
                    color:#fff;
                    background-color: transparent;
                    text-transform: uppercase;
                    }
                .btn.overal {
                    float: left;
                    font-size: 0.4em;
                    color: black;
                }
                
                #infoBtn1 {
                    float:right;
                    margin-right:0px;
                    display:flex; 
                    align-items:center; 
                    color:#212529;
                    background-color: #f8f9fa !important;
                    border: 1px solid transparent;
                    border-color: #f8f9fa;
                    border-radius: .25rem;
                    font-weight: 400;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: middle;
                    user-select: none;
                    padding: .375rem .75rem;
                    font-size: 0.8rem;
                    line-height: 1.5;
                    
                    transition: color .15s 
                        ease-in-out,background-color .15s
                        ease-in-out,border-color .15s 
                        ease-in-out,box-shadow .15s 
                        ease-in-out;
                }
                #infoBtn1:hover {
                    cursor:pointer;
                    color: #212529;
                    background-color: #e2e6ea !important;
                    border-color: #dae0e5 !important;
                }
                #dateValue4 {
                    height: 40px;
                    width: 50%;
                    max-width: 18rem;
                    padding: .375rem .75rem;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    color: #495057;
                    background-color: #fff;
                    background-clip: padding-box;
                    border: 1px solid #ced4da;
                    border-radius: .25rem;
                }
            
            </style>
                
            <!-- The modal1 -->
            <div id="myModal1" class="modal1">
                <!-- modal1 content -->
                <div class="modal1-content">
                    <span class="close1">&times;</span>
                    <p style="text-align:left;"><span style="font-weight: 600;">Дата початку: </span><span id="dateValue1"> </span> </p>
                    <p style="text-align:left;"><span style="font-weight: 600;">Дата закінчення: </span><span id="dateValue2"> </span> </p>
                    <p style="text-align:left;"><span style="font-weight: 600;">Організація: </span><span id="dateValue3"> </span> <span id="dateValue3_2" style="display: none;"> </span> </p>
                    <p style="text-align:left; color:#212529; font-weight:600; margin-top: 36px;">Вкажіть ел. пошту: <input id="dateValue4" type="text" name="fname" style=""> </p>
                    
                    <p style="text-align:right; font-size: 1.4em; color:#212529; font-weight:600;"> <button id="btn_save_data" style=""> Відправити </button> </p>
                </div>
            </div>
            
            <!-- Button for email -->
            <div style="display:block; text-align:center; background-color: white; border-radius:5px; color: #555; text-shadow: 1px 1px 2px #9E9E9E; height:43px; line-height:40px; font-weight: bold; font-size:1.2em;margin-bottom:1px;padding: 2px;">
                <span style="top: 3px;">Порівняльна довідка по закриттю заявок</span>
                
                <button id="infoBtn1" style=""><i class="material-icons theIcon" style="color:#212529;">present_to_all</i>  <b class="theIcon" style="padding-left:5px;">Відправити по Email </b> </button>
            </div>
            
            
            
        `;
        },
        table: {
            header: [
                {
                    title: '№/ №',
                    columnCode: 'Num'
                },
                {
                    title: 'Підрозділ',
                    columnCode: 'organizations_name'
                },
                {
                    title: 'Заявка №',
                    columnCode: 'Claim_Number'
                },
                {
                    title: 'Адреса',
                    columnCode: 'places_name'
                },{
                    title: 'Дата реєстрації',
                    columnCode: 'Created_at'
                },{
                    title: 'Дата закриття',
                    columnCode: 'Fact_finish_at'
                },{
                    title: 'Тип заявки',
                    columnCode: 'types_name'
                }
            ],
            columns: [{
                columnCode: 'Claim_Number',
                visible: true,
                onCellClick(cell, column, row, value, rowIndex, tableMethods) {
                    tableMethods.goToSection('Claims/edit/' + row.values[7]);
                },
                format(cell, column, row, value, rowIndex) {
                    cell.setStyle('cursor:pointer; text-decoration: underline; color:#1565c0;');
                    return '<b title="перейти до заявки">' + value + '</b>';
                }
            },
            {
                columnCode: 'claims_id',
                visible: false
            }
            ]
        },
        par1: new Date(2018, 0, 1),
        par2: new Date(),
        par3: 'АЦ "Київводоканал"',
        par4: 19,
        param_btm_load: 0,
        par5: new Date(2018, 0, 1),
        par6: new Date(),
        par7: 19,
        sub1: {},
        init:function() {
            this.sub1 = this.messageService.subscribe('GlobalFilterChanged', this.executeSql, this);
            let executeQuery = {
                queryCode: 'Table_Comparative_Reference',
                parameterValues: [{key: '@dateStart', value: new Date(2018, 0, 1)},{key: '@dateFinish', value: new Date() },{key: '@OrgId', value:28}]
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        executeSql:function(message) {
            debugger
            // debugger;
            function checkDateFrom(val) {
                return val ? val.dateFrom : null;
            }
            function checkDateTo(val) {
                return val ? val.dateTo : null;
            }
            function checkValue(val) {
                return val ? val.value : null;
            }
            function checkValue2(val) {
                return val ? val.viewValue : null;
            }
            function checkDateText(val) {
                let today = val;
                let dd = today.getDate();
                let mm = today.getMonth() + 1; //January is 0!
                let yyyy = today.getFullYear();
                let hh = today.getHours();
                let mi = today.getMinutes();
                let ss = today.getSeconds();
                if(dd < 10) {
                    dd = '0' + dd
                }
                if(mm < 10) {
                    mm = '0' + mm
                }
                if(hh < 10) {
                    hh = '0' + hh
                }
                if(mi < 10) {
                    mi = '0' + mi
                }
                if(ss < 10) {
                    ss = '0' + ss
                }
                today = yyyy + '-' + mm + '-' + dd;
                return val ? today : null;
            }
            this.par1 = checkDateText(message.package.value.values[0].value.dateFrom);
            this.par2 = checkDateText(message.package.value.values[0].value.dateTo);
            this.par3 = checkValue2(message.package.value.values[1].value);
            this.par4 = checkValue(message.package.value.values[1].value);
            document.getElementById('dateValue1').innerText = this.par1;
            document.getElementById('dateValue2').innerText = this.par2;
            document.getElementById('dateValue3').innerText = this.par3;
            document.getElementById('dateValue3_2').innerText = this.par4;
            this.par5 = checkDateFrom(message.package.value.values[0].value);
            this.par6 = checkDateTo(message.package.value.values[0].value);
            this.par7 = checkValue(message.package.value.values[1].value);
            checkValue(message.package.value.values[0].value)
            let executeQuery = {
                queryCode: 'Table_Comparative_Reference',
                parameterValues: [{key: '@dateStart', value: checkDateFrom(message.package.value.values[0].value) },{key: '@dateFinish', value: checkDateTo(message.package.value.values[0].value)},{key: '@OrgId', value:checkValue(message.package.value.values[1].value) }]
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        load2:function(data) {
        },
        load:function(data) {
            debugger
            //debugger;
            if (data && data.rows.length > 0) {
                document.getElementById('dateValue4').value = data.rows[0].values[1].substring(4,17) + '@Valentin.happy';
            }
            let modal = document.getElementById('myModal1');
            // Get the button that opens the modal
            let btn = document.getElementById('infoBtn1');
            // Get the <span> element that closes the modal
            let span = document.getElementsByClassName('close1')[0];
            // When the user clicks on the button, open the modal
            btn.onclick = function() {
                modal.style.display = 'block';
            }
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = 'none';
            }
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            }
            if (this.param_btm_load == 0) {
                btn_save_data.addEventListener('click', function() {
                    if (document.getElementById('dateValue4').value == '') {
                        alert('Введіть ел. пошту!');
                    } else {
                        // debugger;
                        let executeQuery = {
                            queryCode: 'Table_Comparative_Reference_ExcelSend',
                            limit: -1,
                            parameterValues: [
                                {key: '@date_Start', value: document.getElementById('dateValue1').innerText},
                                {key: '@date_Finish', value: document.getElementById('dateValue2').innerText},
                                {key: '@OrgId', value: Number(document.getElementById('dateValue3_2').innerText)},
                                {key: '@email', value: document.getElementById('dateValue4').value}
                            ]
                        };
                        this.queryExecutor(executeQuery, this.load2, this);
                        modal.style.display = 'none';
                        func = function() {
                            let executeQuery2 = {
                                queryCode: 'Table_Comparative_Reference',
                                parameterValues: [{key: '@dateStart', value: this.par5},{key: '@dateFinish', value: this.par6},{key: '@OrgId', value: this.par7}]
                            };
                            this.queryExecutor(executeQuery2, this.load, this);
                        }.bind(this);
                        setTimeout(func, 1000);
                        alert('Дані відправлено на ел. пошту "' + document.getElementById('dateValue4').value + '"');
                    }
                }.bind(this), false);
                this.param_btm_load = 1;
            }
        },
        destroy: function() {
            this.sub1.unsubscribe();
        }
    };
}());
