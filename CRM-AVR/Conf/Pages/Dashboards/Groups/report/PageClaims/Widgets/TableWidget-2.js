(function () {
  return 
{
        formatTitle: function() {
        return `
            <div style="color: cadetblue;    font-size: larger;    text-align: center;     background: #ffc7c7;">
            Місця з відсутністью водопостачання
            </div>
        `;
    },

     table: {

         style: {
            header: {
                cell: 'font-family:"Open Sans";font-size:0.9em;color:#808285;font-weight:bold;border: 0;text-align:left',
                row: 'border: 0;border-bottom: 1px dotted #959595;'
            },
            body: {
                cell: 'font-family:"Open Sans";font-size:0.9em;color:#000;border: 0;text-align:left;white-space:nowrap;overflow: hidden',
                row: 'border: 0;border-bottom: 1px dotted #959595;'
            }
        },

 
header: [   {
            title: '      ',
            columnCode: 'AddAppeal'
            },
            {
            title: 'Район',
            columnCode: 'Заявка'
            },
            {
            title: 'Місце',
            columnCode: 'Тип'
            },
            {
            title: 'Заявка',
            columnCode: 'Місце'
            },
            {
            title: 'Створена',
            columnCode: 'Створена'
            },
            {
            title: 'План виконання',
            columnCode: 'План виконання'
            }
            ],

columns: [
{
            columnCode: 'AddAppeal',
            onCellClick(cell, column, row, value, rowIndex, config){
             // debugger;
              config.mySuperFunction(row.values[5]);
            },
            format(cell, column, row, value, rowIndex){
                     row.setStyle('background-color: #fff');
                     if (value == 0)
                     {
                      return '<button style="color: #bfbfbf; background-color: #fff; padding: 6px 12px; width: 100%; font-size: 0.9em;">' + value + '</button>' 
   ;
                     }
                     else {
                        return '<button style="color: #5b5b5b; background-color: #fff; padding: 6px 12px; width: 50px; font-size: 1.4em; border-radius: 5px;" title="Додати звернення">' + value + '</button>'; 
                     };
                    }
            },
            {
            columnCode: 'Count_Claim',
            onCellClick(cell, column, row, value, rowIndex, config){
             // debugger;
              config.mySuperFunction2(row.values[0]);
            },
            format(cell, column, row, value, rowIndex){
                     row.setStyle('background-color: #fff');
                     if (value == 0)
                     {
                      return '<button style="color: #bfbfbf; background-color: #fff; padding: 6px 12px; width: 6em; font-size: 1.2em;">' + value + '</button>' 
   ;
                     }
                     else {
                        return '<button style="color: #5b5b5b; background-color: #fff; padding: 6px 12px; width: 6em;    font-size: 1.2em;">' + value + '</button>'; 
                     };
                    }
            },
            {
            columnCode: 'Район_Id',
            visible: false
            },
            {
            columnCode: 'Місце_Id',
            visible: false
            },
            {
            columnCode: 'Заявник_Id',
            visible: false
            }
        ]
     },
   subscriptions: [], 
   I_Value1: 0,
    I_Value2: 0,
    
    init: function() {
           
            var params = window
            .location
            .search
            .replace('?','')
            .split('&')
            .reduce(
                function(p,e){
                    var a = e.split('=');
                    p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                    return p;
                },
                {}
            );

            
          let executeQuery = {
            queryCode: 'table3_claim_switchoff',
            limit: -1,
            parameterValues: [{
                        key: '@PlaceId',
                        value: this.I_Value1
                    }]
                     };
         this.queryExecutor(executeQuery, this.load, this);
         
         
         var sub1 = this.messageService.subscribe('showPlaceData', this.executeSql, this);
         this.subscriptions.push(sub1);
         
    },
       
executeSql: function(message) {

     this.I_Value1 = Number(document.getElementById('place_id').innerText);
  console.log (this.I_Value1);
       //  if (this.I_Value1 == undefined || this.I_Value1 == "" || this.I_Value1 == " ") {this.I_Value1 = 0} else {this.I_Value1 = this.I_Value1};
 
  
  
          let executeQuery = {
            queryCode: 'table3_claim_switchoff',
            limit: -1,
            parameterValues: [{
                        key: '@PlaceId',
                        value: this.I_Value1
                    }]
                     };
         this.queryExecutor(executeQuery, this.load, this);
                    
},
 
     load: function(data, options) {
  //  console.log(data);
    
       var divMenuItemBlock2 = document.getElementById('btn_save_data3');
                
                divMenuItemBlock2.addEventListener('click', function(event) {
                    
                    var modal0 = document.getElementById('myModal1');
                    modal0.style.display = "none";
                    
                    
                             this.addAppeals_saveData2();
                
                var modal = document.getElementById('myModal2');
               
                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close2")[0];
              // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                    modal.style.display = "none";
                };
                
                 span.onclick = function() {
                    modal.style.display = "none";
                };
                               
                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                };    
                
                modal.style.display = "block";        
                             
                             
                             
                }.bind(this), false);    
    
    },
    
    
    
        load2: function(data, options) {
             // console.log(data);  
        },
    
    addAppeals_saveData2: function() {
       
       if (Number(document.getElementById('person_name').innerText) == 0 || document.getElementById('person_name').innerText == "Всі контакти")
        { 
                         console.log('Анонімний');  
                         
                        let executeQuery = {
                            queryCode: 'insertAppeal_contact_claim_anonymous',
                            limit: 1,
                            parameterValues: [{key: '@contacts_Name',
                                              value: document.getElementById('person_value').innerText
                                              },{
                                              key: '@claims_Id', 
                                              value: Number(document.getElementById('claim_id').innerText)
                                                },{
                                              key: '@contacts_Phone', 
                                              value: document.getElementById('phone_value2').value
                                                }
                                            ]
                        };
                        this.queryExecutor(executeQuery, this.load2, this); 
                    this.executeSql('refresh');                         
                         
        }
     else {
                
               console.log( Number(document.getElementById('person_id').innerText), Number(document.getElementById('claim_id').innerText));  
                             
              let executeQuery = {
                    queryCode: 'insertAppeal_contact_claim',
                    limit: 1,
                    parameterValues: [{key: '@contacts_Id',
                                      value: Number(document.getElementById('person_id').innerText)
                                      },{
                                      key: '@claims_Id', 
                                      value: Number(document.getElementById('claim_id').innerText)
                                        }
                                    ]
                };
                this.queryExecutor(executeQuery, this.load2, this); 
            this.executeSql('refresh');
            };
            
        },    
    
    mySuperFunction: function(arg1) {
        
    // window.open(location.origin + localStorage.getItem('VirtualPath') + "/sections/Persons/edit/"+arg1);
    //debugger;
 
                document.getElementById('btn_save_data2').style.display = 'none';
                document.getElementById('btn_save_data').style.display = 'none';
                document.getElementById('btn_save_data3').style.display = '';
                
                var modal = document.getElementById('myModal1');
               
                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close1")[0];
                var span2 = document.getElementsByClassName("close0")[0];
                
                // console.log(arg1);
                // console.log(document.getElementsByClassName("claims_value").innerText);
                document.getElementById('claims_value').innerText = arg1;
                
               // debugger;
                if (Number(document.getElementById('person_name').innerText) == 0 || document.getElementById('person_name').innerText == "Всі контакти")
                {
                   if (document.getElementById('phone_value').value == "") {
                         document.getElementById('person_value').innerText = "Анонімний"; 
                         document.getElementById('claim_id').innerText = Number(arg1);    
                   }
                   else
                   {
                         document.getElementById('person_value').innerText = document.getElementById('phone_value').value; 
                         document.getElementById('claim_id').innerText = Number(arg1);       
                   };
                   
                   
                }
                else {
                document.getElementById('person_value').innerText = document.getElementById('person_name').innerText; 
                document.getElementById('claim_id').innerText = Number(arg1);    
                };
                
                
                // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                    modal.style.display = "none";
                };
                
                 span2.onclick = function() {
                    modal.style.display = "none";
                };
                               
                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                };    
                
                modal.style.display = "block";
    
    },
    
    mySuperFunction2: function(arg1) {

     window.open(location.origin + localStorage.getItem('VirtualPath') + "/dashboard/page/appeals_phone?phone="+arg1+"&type=gp"); 
    
    },
    unsubscribeFromMessages(){
        for(var i =0; i < this.subscriptions.length; i++) {
                this.subscriptions[i].unsubscribe();
        }
    },
    destroy(){
        this.unsubscribeFromMessages();
    }

};
}());
