(function() {
    return {
        title: [],
        hint: '',
        formatTitle: function() {},
        customConfig:
                `
                <style>
                
                header .multi-shower:hover {
                        position: absolute;
                        width: 900px; !important;
                        top: -3px;
                    }

                // .multi-shower:hover mat-input-container {
                //   width: 230px !important; 
                // }
                
              .disabled_btn {
                   color: #979797 !important;
                    background: #e8e8e870 !important;
                    border: none !important;
                    cursor: no-drop !important;
                }     
               
                    button.button5{
    display: inline-block;
    padding: 0.46em 1.6em;
    border: 0.1em solid #3f7ab7;
    margin: 0 0.2em 0.2em 0;
    border-radius: 0.12em;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Roboto',sans-serif;
    cursor: pointer;
    font-weight: 300;
    font-size: 1.2em;
    border-radius: 3px;
    color: #3f7ab7;
    text-shadow: 0 0.04em 0.04em rgba(255, 255, 255, 0.35);
    background-color: #FFFFFF;
    text-align: center;
    transition: all 0.15s;
}
button.button5:hover{
    text-shadow: 0 0 2em rgb(185, 164, 164);
    color: #3f7ab7;
    border-color: #f7f7f7;
}
@media all and (max-width:30em){
    button.button5{
    display:block;
    margin:0.4em auto;
    }
}

thead tr[class^='ng-star']:last-child th {
                    background: rgb(79,129,189) !important;         
                }
                
                thead tr[class^='ng-star'] th:nth-child(1) {
                    background: rgb(226,107,10) !important;    
                }
                thead tr[class^='ng-star'] th:nth-child(2)  {
                    background: rgb(192,80,77) !important; 
                }
                
                
                .title1_table{
                    display: grid;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    color: #5f84a9;
                    text-shadow: 1px 1px 2px #99b2e2;
                    height: 100px;
                    font-weight: 700;
                    font-size: 1.2em;
                    padding: 2px;
                }
                
                .title2_table{
                        font-weight: initial;
                }
                
               thead tr[class^='ng-star']:last-child th {
                    background: rgb(79,129,189) !important;         
                }
                
                thead tr[class^='ng-star'] th:nth-child(1) {
                    background: rgb(226,107,10) !important;    
                }
                thead tr[class^='ng-star'] th:nth-child(2)  {
                    background: rgb(192,80,77) !important; 
                }
                
                
                .title1_table{
                    display: grid;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    color: #5f84a9;
                    text-shadow: 1px 1px 2px #99b2e2;
                    height: 100px;
                    font-weight: 700;
                    font-size: 1.2em;
                    padding: 2px;
                }
                
                .title2_table{
                        font-weight: initial;
                }     
                
                .calendar_kast{
                        background: #3f7ab7;
                        color: white;
                        cursor: pointer;
                        height: 17px;
                        text-overflow: ellipsis;
                        border-bottom: 1px solid #fff0;
                        border-left: 0px solid #fff;
                        border-right: 0px solid #fff;
                        border-top: 0px solid #fff;
                        font: 400 13.3333px Arial;
                        display: inline;
                        font-size: 0.89em;
                }
                </style>
                
                <span style="text-align: center; display: inline-flex; width: 100%;">
                     <div class="title1_table" style="height: 50px; width: 60%;">
                                            <span style="">Реєстр заявок</span>
                                            <span class="title2_table" style="display: none;" id="title_bottom">за період з  р. по  року</span>
                                </div>
                    <button class="button5" id="btn1" STYLE="background-color:#ffffff;">Сформувати звіт</button>
                    <button class="button5" id="btn2" STYLE="background-color:#ffffff;"><i class="fa fa-file-excel-o" aria-hidden="true"></i> Вивантажити в Excel</button>

                </span>
                
                
                   
                
                
                `
        ,
        sub1: {},
        init: function() {
            this.sub1 = this.messageService.subscribe('GlobalFilterChanged', this.executeSql, this);
            /* document.getElementById('Tabl1').style.display = 'none';
         document.getElementById('Tabl1').style.height = "calc(100% - 100px)";
*/
            let executeQuery = {
                queryCode: 'Q1',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        executeSql:function(message) {
            //  this.IsReportCalc = message.package.value.values[3].value;
        },
        load: function(data) {
            //  var y2 = document.querySelectorAll('#DataGridWidget-0 > smart-bi-data-grid-widget > smart-bi-widget-container > dx-data-grid > div > div.dx-datagrid-header-panel > div > div > div.dx-toolbar-after > div:nth-child(1) > div > div');
            //  y2[0].style.display = 'none';
            // // var sp2 = document.querySelectorAll('.search-list-wrapper')
            // // var t = Array.from(sp2[1].children)
            // // t.map(el => el.style.display="none");
            // var t = document.querySelector('.main-block')
            // t.style.display = "none";
            // var r = document.querySelector('.mat-input-element');
            // // r.placeholder = "";
            // r.value = "Усі організації";
            // var y = document.querySelectorAll('.main-block');
            // var y2 = y[0].nextElementSibling;
            // var event = new Event("click");
            // y2.dispatchEvent(event);
            let btn_calc = document.getElementById('btn1');
            btn_calc.addEventListener('click', function() {
                let message = {
                    name: 'LoadData',
                    value: 1
                };
                this.messageService.publish(message);
            }.bind(this));
            let btn_calc2 = document.getElementById('btn2');
            btn_calc2.addEventListener('click', function() {
                //     NameExcel =  'ExportToExcel';
                //     var message = {
                //                         name: NameExcel,
                //                         value: 1
                //                     };
                // this.messageService.publish(message);
                let y = document.querySelectorAll('#DataGridWidget-0 > smart-bi-data-grid-widget > smart-bi-widget-container > dx-data-grid > div > div.dx-datagrid-header-panel > div > div > div.dx-toolbar-after > div:nth-child(1) > div > div');
                let y2 = y[0];
                let event = new Event('click');
                y2.dispatchEvent(event);
            }.bind(this));
            //   document.getElementById('btn1').disabled = false;
    	   //document.getElementById('btn1').classList.remove("disabled_btn");
    	   //document.getElementById('btn2').disabled = true;
    	   //document.getElementById('btn2').classList.add("disabled_btn");
            /*
             if (document.getElementById('calendar_kast_component').value == "") {
    	    document.getElementById('btn1').disabled = true;
    	    document.getElementById('btn1').classList.add("disabled_btn");
    	    document.getElementById('btn2').disabled = true;
    	    document.getElementById('btn2').classList.add("disabled_btn");
    	} else {
    	   document.getElementById('btn1').disabled = false;
    	   document.getElementById('btn1').classList.remove("disabled_btn");
    	   document.getElementById('btn2').disabled = true;
    	   document.getElementById('btn2').classList.add("disabled_btn");
    	};
         */
        },
        destroy: function() {
            this.sub1.unsubscribe();
        }
    };
}());
