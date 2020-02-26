(function () {
  return {
    title: [],
    hint: '',
    formatTitle: function() {},
    customConfig: `
                
                <style>
                
                 #hideBlock{
                    float: right;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    background: lightgray;
                    outline: none;
                }
                
                
                .material-icons.up{
                    display: block;
                }
                
                
                .material-icons.down{
                    display: none;
                }
                
                
                
                  .nav_tickets {
                border-bottom: 1px inset #cecece;
                 height: 35px;
                 width: 100%;
                     box-shadow: 0 0 7px rgba(0,0,0,0.5);
                }
                
                #hiddenDiv{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                }
                
                 .container2{
                        margin: 0 2px;
                        width: 140px;
                    }
                    .btnContainer2{
                        overflow: hidden;
                      
                    }
                    .btn2 {
                        font-size: 16px;
                        font-family: 'Open Sans';
                        float: left;
                        border: none;
                        outline: none;
                        cursor: pointer;
                        padding: 4px 10px;
                        transition: 0.3s;
                        color:#07d;
                        background-color: #eff2f5;
                        text-transform: uppercase;
                    }
                    
                    .btn2.active {
                        border-bottom: 4px solid #f44336;
                    }
                    
                    .btn_block_active{
                        border: inset; 
                    }
                    
                    
                    .btn2:hover {
                      background: #e3e6e9;
                      color: #ffffff;
                    }
                    
                    .btn2 i {
                        vertical-align: middle;
                        color: #ddd;
                    }
                   .registrationMainBlock{
                               background: white;
                                width: 25em;
                                height: 30em;
                                border-radius: 10px;
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                   }
                   .textareaMoreDetails {
                	    overflow: auto;
                        resize: none;
                        width: 300px;
                        height: 50px;
                        background: #f6f6f6;
                        border: 1px solid #cecece;
                        border-radius: 8px;
                        padding: 8px 0 8px 10px;
                }
                
                   .inputCaption, .inputURL {
                    	width: 300px;
                    	font-size: 13px;
                    	margin: 1vh 0vh;
                    	padding: 6px 0 4px 10px;
                    	border: 1px solid #cecece;
                    	background: #F6F6f6;
                    	border-radius: 8px;
                    }
                    @keyframes regForm {
                      from {
                        opacity: 0;
                        height:0vh;
                      }
                    
                      to {
                         opacity: 1;
                         height: 50vh;
                      }
                    }
                    
                    .selectItem{
                        width: 60%;
                    }
                    
                    .selectTypeDiv{
                        display: flex;
                        justify-content: space-around;
                        padding: 1vh 2vh;
                    }
                    .inputsBlock{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .redirectToForm{
                        display: none;
                    }
                    .buttonAddTask, .redirectToForm{
                            background: #494c83;
                            border: none;
                            color: white;
                            padding: 1vh;
                            cursor: pointer;
                            font-size: 14px;
                            margin-right: 2vh;
                            border-radius: 3px;
                    }
                    .buttonCancel{
                            background: #b54343;
                            border: none;
                            color: white;
                            cursor: pointer;
                            padding: 1vh;
                            font-size: 14px;
                            margin-right: 2vh;
                            border-radius: 3px;
                    }
                    .spanForCheckbox{
                            display: flex;
                            text-align: left;
                            align-items: center;
                            width: 30%;
                    }
                    
                    .checkboxControl{
                        margin-right: 0.7vh;
                    }
                    .buttonsBlock{
                            display: flex;
                            justify-content: center;
                    }
                    .datesBlock{
                           display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        
                    }
                    .dateFrom{
                            margin-right: 1vh;
                    }
                    .dateFrom, .dateTo, .inputTime, .remindMeAtDate{
                            font-size: 13px;
                            padding: 6px 0 4px 10px;
                            border: 1px solid #cecece;
                            background: #F6F6f6;
                            border-radius: 8px;
                    }
                    .labelForInputTimeFrom, .labelForInputTimeTo{
                     
                        font-family: sans-serif;
                    }
                    .labelForInputTimeFrom{
                        font-family: sans-serif;
                        margin-right: 1vh;
                    }
                    .remindIconFlag{
                        float: right;
                        display: flex;
                        margin-right: 20%;
                    }
                    
                    .flexBoxContainerForDate{
                           
                            width: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: space-around;
                            color: black;
                    }
                    .flexBoxContainerForInputTypeTimeFrom, .flexBoxContainerForInputTypeTimeTo{
                        margin-top: 1vh;
                    }
                    .timeContainer{
                            display: flex;
                            justify-content: space-around;
                            width: 100%;
                    }
                    .inputError{
                            border: 1px solid red;
                            background: #b326264a;
                    }
                    .textError{
                        color: red;
                    }
                    :disabled{
                        background: lightgray;
                        color:black;
                    }
                    
                    .recallCheckboxDiv{
                            margin-top: 1vh;;
                            margin-bottom: 2vh;
                            margin-left: 2.82vh;;
                    }
                    .recallCheckboxControl{
                        margin-right: 0.7vh;
                    }
                    .remindMeDiv{
                        width: 100%;
                        display: none;
                        flex-direction: column-reverse;
                        justify-content: start;
                    }
                    .remindMeLeftDiv{
                        text-align: left;
                        margin: 1vh 0vh;
                        align-items: center;
                    } 
                    .creteInputTypeTimeRemind{
                        text-align: center;
                    }
                    .remindIconFlag>.material-icons{
                        cursor: pointer;
                    }
                    
                    .remindIconFlag>.material-icons:hover{
                            background: #d3d3d396;
                            border-radius: 50%;
                    }
                    .remindMeRightDiv{
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                    }
                    .remindIconThrough>.material-icons:hover{
                        cursor: pointer;
                         background: #d3d3d396;
                         border-radius: 50%;
                    }
                    .remindMeAtDate{
                        margin-right: 1em;
                    }
                     
 .top-bar .searchbar {
    padding-left: 12px;
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
    max-width: 400px;
    position: initial
}

.top-bar .searchbar input[type="text"].f-input {
    margin: 0;
    height: 29px;
    border-width: 1px;
    border-color: #c8ccd0;
    border-radius: 3px;
    
    font-size: 14px;
    background-color: #FFF;
    box-shadow: none;
    color: #3b4045;    
    margin-left: 16px;
    width: 190px;
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
    background-color: #3169910a;
    border: 1px solid #a1abb2;
    box-shadow: inset 0 1px 0 #f8f8f8;
    height: 29px;
    opacity: 0;
    margin: 0;
    position: fixed;
    transform: translateY(-50%);
    border-radius: 0 3px 3px 0;
    z-index: -1;
    padding: 0 12px;
    transition: opacity .35s cubic-bezier(.165, .84, .44, 1)
}

.top-bar .searchbar .btn-topbar-primary:hover {
    color: rgba(255,255,255,0.9);
    background-color: #83909963;
    border-color: #88969f;
    box-shadow: inset 0 1px 0 #b2b2b2
}

.top-bar .searchbar .btn-topbar-primary:active {
    color: rgba(255,255,255,0.9);
    background-color: #c7dae6;
    border-color: #ffffff;
    box-shadow: inset 0 1px 0 #b2b2b2;
    border: 2px solid #ffffffc2;
}



.top-bar._search-open .navigation {
    opacity: 0;
    max-width: 0
}

.top-bar._search-open .searchbar input[type="text"].f-input {
    background-color: #FFF;
    padding-right: 50px;
    margin-top: 2px;
}

.top-bar._search-open .searchbar .btn-topbar-primary {
    opacity: 1;
    transform: translateY(-50%) translateX(1px);
    z-index: 0;
        margin-top: 15px;
}



@media screen and (max-width: 920px) {

    .top-bar .searchbar input[type="text"].f-input {
        font-size: 12px
    }
 
.top-bar .searchbar {
    max-width: 750px
}   
    

        </style>
         

                 
                    

                

         <div class="nav_tickets" id="nav122345">
                        <sections style="display: flex; height: 100%;">
                            <div style="    width: 90%;">
                            
                                               
                            
                            
                                <span id="myTarget1_1" style='color: #a1a1a1; font-size: 1.1em; display: block; padding-left: 17px;'>

                                    
                                    <button id="menuBtn_view_table" class="btn2"> <i class="material-icons" id="menuBtn_view_table_Icon" style="color:#cecece;">view_module</i>  </button>                    
                                    <button id="menuBtn_view_row" class="btn2"> <i class="material-icons" id="menuBtn_view_row_Icon" style="color:#cecece;">view_stream</i>  </button>
                                    <button id="menuBtn_view_calendar" class="btn2"> <i class="material-icons" id="menuBtn_view_calendar_Icon" style="color:#cecece;">date_range</i>  </button>
                                    <button id="menuBtn_view_map" class="btn2"> <i class="material-icons" id="menuBtn_view_map_Icon" style="color:#cecece;">location_on</i>   </button>

                                               <div id="map_seach_adress" class="top-bar js-top-bar _fixed _search-open display_none">                 
                                                   <div class="searchbar" autocomplete="on">
                                                        <input id="map_adress_value" type="text" placeholder="Введіть адресу..." value="" tabindex="1" autocomplete="off" maxlength="240" class="f-input">
                                                        <button style="margin-top: 16px;" id="btn_map_adress_search" class="btn-topbar-primary"><svg aria-hidden="true" class="svg-icon iconSearch" width="18" height="18" viewBox="0 0 18 18">
                                                        <path d="M12.86 11.32L18 16.5 16.5 18l-5.18-5.14v-.35a7 7 0 1 1 1.19-1.19h.35zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"></path></svg></button>
                                                    </div>
                                                </div>    

                                                     
                                     <input  id='check_vukon' type="checkbox" checked="checked" name="option1" value="a1" style="position: relative; bottom: -3px; margin-left: 29px; height: 18px; width: 18px;"><b id='check_vukon_text' style="color: black; font-weight: normal;"> Я виконавець </b></input>
                                     <input  id='check_avt' type="checkbox" name="option2" value="a2" style="position: relative; bottom: -3px; margin-left: 20px; height: 18px; width: 18px;"><b id='check_avt_text' style="color: black; font-weight: normal;"> Я автор </b></input>
                                     <button id="btn_block_newTask" style="margin-left: 30px; background: #fdbc49; width: 50px; height: 24px; border-radius: 0px; text-align: center; color: #ffffff; cursor: pointer; font-size: 12px;"> НОВА </button>
                                     <button id="btn_block_proccesTask" style="margin-left: -6px; background: #53d77f; width: 70px; height: 24px; border-radius: 0px; text-align: center; color: #ffffff; cursor: pointer; font-size: 12px;"> В РОБОТІ </button>
                                     <button id="btn_block_overTask" style="margin-left: -5px; background: #ff5e5e; width: 102px; height: 24px; border-radius: 0px; text-align: center; color: #ffffff; cursor: pointer; font-size: 12px;"> ПРОСТРОЧЕНО </button>
                                     <button id="btn_block_allTask" style="margin-left: -6px; background: #eff2f5; width: 35px; height: 24px; border-radius: 0px; text-align: center; color: #797979; cursor: pointer; font-size: 12px;"> ВСІ </button>
                              
                                     <button id="hideBlock">
                                        <i class="material-icons up">arrow_drop_up</i>
                                    </button>
                                    
                                    
                                 </span>
                            </div>
                            <div style="    width: 10%;">
                                <button class="display_none" id="addNewCard" style="margin-left: -6px; background: #66cfdc; width: 91px; height: 32px; border-radius: 5px; text-align: center; color: #ffffff; cursor: pointer; font-size: 14px;"> + ДОДАТИ </button>
                            </div>
                        <sections>
        </div>    
                
                <span id='checkboxType' style='display: none'></span>
                `,
                
                
    init: function() {
        //  <span id="myTarget3_1" style='color: #000000; font-size: 1.5em; display: block; align-items: right; text-align: right;'>sdfsd </span>
        let executeQuery = {
            queryCode: 'select_message_group',
            parameterValues: []
        };
        this.queryExecutor(executeQuery, this.load, this);
    },

    currentItem: '',
    iconRemind: '',
    IsOpen: true,
    Executor: true,
    Author: false,
    Color: '',
    load: function(data) {
        const exec = document.getElementById('check_vukon');
        const auth = document.getElementById('check_avt');
    

         
        document.getElementById('hideBlock').addEventListener('click', function(){
            if(this.IsOpen === true){
                document.querySelectorAll('.material-icons.up')[0].classList.toggle('rotatingUp');
                document.getElementById('graphicsBlock').style.position = 'absolute';
                document.getElementById('graphicsBlock').style.top = '-100%';
            }else{
                document.getElementById('graphicsBlock').removeAttribute('style');
                setTimeout(()=>{
                    document.querySelectorAll('.material-icons.up')[0].classList.toggle('rotatingUp');
                },0)
            }
             this.IsOpen = !this.IsOpen;
        }.bind(this), false);


        exec.addEventListener('click', function() {
            this.Executor = exec.checked;
            this.renderBlocks('Executor', this.Executor)
        }.bind(this), false);

        auth.addEventListener('click', function() {
            this.Author = auth.checked;
            this.renderBlocks('Author', this.Author)
        }.bind(this), false);




        const addNewCard = document.getElementById('addNewCard');

        addNewCard.addEventListener('click', this.addCardFunction.bind(this), false);

        this.handleButtonGroupClick("showCalendar", btn_block_allTask, btn_block_newTask, btn_block_proccesTask, btn_block_overTask);

        this.handleButtonClick("showTaskTable", menuBtn_view_table, menuBtn_view_row, menuBtn_view_calendar, menuBtn_view_map);
        menuBtn_view_table_Icon.style = 'color:red;';
        menuBtn_view_calendar_Icon.style = 'color:#cecece;';
        menuBtn_view_row_Icon.style = 'color:#cecece;';
        menuBtn_view_map_Icon.style = 'color:#cecece;';

        btn_block_allTask.addEventListener("click", function() {
            this.handleButtonGroupClick("typeAll", btn_block_allTask, btn_block_newTask, btn_block_proccesTask, btn_block_overTask);
            
            if(this.Author == true && this.Executor == false){
                this.Color = '';
                this.renderBlocks('Author', this.Author)
            }else if(this.Author == false && this.Executor == true){
                this.Color = '';
                this.renderBlocks('Executor', this.Executor)
            }else{
                this.Color = '';
                this.renderBlocks();
            }
        }.bind(this), true);

        btn_block_newTask.addEventListener("click", function() {
            this.handleButtonGroupClick("typeOrange", btn_block_newTask, btn_block_allTask, btn_block_proccesTask, btn_block_overTask);
            
            
            if(this.Author == true && this.Executor == false){
                this.Color = '.typeOrange';
                this.renderBlocks('Author', this.Author)
            }else if(this.Author == false && this.Executor == true){
                this.Color = '.typeOrange';
                this.renderBlocks('Executor', this.Executor)
            }else{
                this.Color = '.typeOrange';
                this.renderBlocks();
            }
            
            
        }.bind(this), true);

        btn_block_proccesTask.addEventListener("click", function() {
            this.handleButtonGroupClick("typeGreen", btn_block_proccesTask, btn_block_newTask, btn_block_allTask, btn_block_overTask);
            
            if(this.Author == true && this.Executor == false){
                this.Color = '.typeGreen';
                this.renderBlocks('Author', this.Author)
            }else if(this.Author == false && this.Executor == true){
                this.Color = '.typeGreen';
                this.renderBlocks('Executor', this.Executor)
            }else{
                this.Color = '.typeGreen';
                this.renderBlocks();
            }
        }.bind(this), true);

        btn_block_overTask.addEventListener("click", function() {
            this.handleButtonGroupClick("typeRed", btn_block_overTask, btn_block_newTask, btn_block_proccesTask, btn_block_allTask);
            
            if(this.Author == true && this.Executor == false){
                this.Color = '.typeRed';
                this.renderBlocks('Author', this.Author)
            }else if(this.Author == false && this.Executor == true){
                this.Color = '.typeRed';
                this.renderBlocks('Executor', this.Executor)
            }else{
                this.Color = '.typeRed';
                this.renderBlocks();
            }
        }.bind(this), true);


        menuBtn_view_calendar.addEventListener("click", function() {
            this.handleButtonClick("showCalendar", menuBtn_view_calendar, menuBtn_view_table, menuBtn_view_row, menuBtn_view_map);
            menuBtn_view_calendar_Icon.style = 'color:red;';
            menuBtn_view_table_Icon.style = 'color:#cecece;';
            menuBtn_view_row_Icon.style = 'color:#cecece;';
            menuBtn_view_map_Icon.style = 'color:#cecece;';
        }.bind(this), true);

        menuBtn_view_map.addEventListener("click", function() {
            this.handleButtonClick("showMap", menuBtn_view_map, menuBtn_view_table, menuBtn_view_row, menuBtn_view_calendar);
            menuBtn_view_map_Icon.style = 'color:red;';
            menuBtn_view_table_Icon.style = 'color:#cecece;';
            menuBtn_view_row_Icon.style = 'color:#cecece;';
            menuBtn_view_calendar_Icon.style = 'color:#cecece;';
        }.bind(this), true);

        menuBtn_view_table.addEventListener("click", function() {
            this.handleButtonClick("showTaskTable", menuBtn_view_table, menuBtn_view_row, menuBtn_view_calendar, menuBtn_view_map);
            menuBtn_view_table_Icon.style = 'color:red;';
            menuBtn_view_calendar_Icon.style = 'color:#cecece;';
            menuBtn_view_row_Icon.style = 'color:#cecece;';
            menuBtn_view_map_Icon.style = 'color:#cecece;';
        }.bind(this), true);

        menuBtn_view_row.addEventListener("click", function() {
            this.handleButtonClick("showTaskRow", menuBtn_view_row, menuBtn_view_table, menuBtn_view_calendar, menuBtn_view_map);
            menuBtn_view_row_Icon.style = 'color:red;';
            menuBtn_view_table_Icon.style = 'color:#cecece;';
            menuBtn_view_calendar_Icon.style = 'color:#cecece;';
            menuBtn_view_map_Icon.style = 'color:#cecece;';
        }.bind(this), true);

    },
    renderBlocks: function(type, state) {

        if (this.Executor == true && this.Author == true) {
            
           if(this.Color != ""){
            const hide1 = document.querySelectorAll(`div.mainBlockForCard`);
            const show2 = document.querySelectorAll(`div${this.Color}.avtor`);
            const show3 = document.querySelectorAll(`div${this.Color}.ispoln`);
            const show4 = document.querySelectorAll(`div${this.Color}.both`);
           if(hide1 != undefined){
                for (let i = 0; i < hide1.length; i++) {
                    hide1[i].style.display = 'none'
                }
           }
           if(show2 != undefined){
                for (let i = 0; i < show2.length; i++) {
                    show2[i].style.display = 'flex'
                }
           }
           if(show3 != undefined){
                for (let i = 0; i < show3.length; i++) {
                    show3[i].style.display = 'flex'
                }
           }
           if(show4 != undefined){
                for (let i = 0; i < show4.length; i++) {
                    show4[i].style.display = 'flex'
                }
           }
            return;
            }
            
            const show1 = document.querySelectorAll(`div.avtor`);
            const show2 = document.querySelectorAll(`div.ispoln`);
            const both = document.querySelectorAll(`div.both`);
            
            for (let i = 0; i < show1.length; i++) {
                show1[i].style.display = 'flex'
            }
            for (let i = 0; i < show2.length; i++) {
                show2[i].style.display = 'flex'
            }
            for (let i = 0; i < both.length; i++) {
                both[i].style.display = 'flex'
            }


        } else if (type == 'Author' && state == true) {
            if(this.Color != ""){
            const hide = document.querySelectorAll(`div.mainBlockForCard`);
            const show = document.querySelectorAll(`div${this.Color}.avtor`);
           const show1 = document.querySelectorAll(`div${this.Color}.both`);
           if(hide != undefined){
                for (let i = 0; i < hide.length; i++) {
                    hide[i].style.display = 'none'
                }
           }
           if(show != undefined){
                for (let i = 0; i < show.length; i++) {
                   show[i].style.display = 'flex'
                }
           }
           if(show1 != undefined){
                for (let i = 0; i < show1.length; i++) {
                   show1[i].style.display = 'flex'
                }
           }
            return;
            }
            const hide = document.querySelectorAll(`div.mainBlockForCard:not(.avtor)`);
            const show = document.querySelectorAll(`div.avtor`);
            const both = document.querySelectorAll(`div.both`);

            for (let i = 0; i < hide.length; i++) {
                hide[i].style.display = 'none'
            }
            for (let i = 0; i < show.length; i++) {
                show[i].style.display = 'flex'
            }
            for (let i = 0; i < both.length; i++) {
                both[i].style.display = 'flex'
            }

        } else if (type == 'Author' && state == false) {
            if (this.Executor == false) {
                const hide = document.querySelectorAll(`.mainBlockForCard`)
                for (let i = 0; i < hide.length; i++) {
                    hide[i].style.display = 'none'
                }

            } else {
                 if(this.Color != ""){
                const hide = document.querySelectorAll(`div.mainBlockForCard`);
                const show = document.querySelectorAll(`div${this.Color}.ispoln`);
                const show1 = document.querySelectorAll(`div${this.Color}.both`);
                if(hide != undefined){
                    for (let i = 0; i < hide.length; i++) {
                        hide[i].style.display = 'none'
                    }
                }
                if(show != undefined){
                    for (let i = 0; i < show.length; i++) {
                       show[i].style.display = 'flex'
                    }
                }
                if(show1 != undefined){
                    for (let i = 0; i < show1.length; i++) {
                       show1[i].style.display = 'flex'
                    }
                }
                return;
                }
                const hide = document.querySelectorAll(`div.avtor`);
                const show = document.querySelectorAll(`div.ispoln`);
                const both = document.querySelectorAll(`div.both`);
                
                 for (let i = 0; i < both.length; i++) {
                    both[i].style.display = 'flex'
                }
                for (let i = 0; i < show.length; i++) {
                    show[i].style.display = 'flex'
                }
                for (let i = 0; i < hide.length; i++) {
                    hide[i].style.display = 'none'
                }
                 

            }
        } else if (type == 'Executor' && state == true) {
            if(this.Color != ""){
            const hide = document.querySelectorAll(`div.mainBlockForCard`);
            const show = document.querySelectorAll(`div${this.Color}.ispoln`);
            const show1 = document.querySelectorAll(`div${this.Color}.both`);
            if(hide != undefined){
                for (let i = 0; i < hide.length; i++) {
                    hide[i].style.display = 'none'
                }
            }
            if(show != undefined){
                for (let i = 0; i < show.length; i++) {
                   show[i].style.display = 'flex'
                }
            }
            if(show1 != undefined){
                for (let i = 0; i < show1.length; i++) {
                   show1[i].style.display = 'flex'
                }
            }
            return;
            }
            const hide = document.querySelectorAll(`div.mainBlockForCard:not(.ispoln)`);
            const show = document.querySelectorAll(`div.ispoln`);
            const both = document.querySelectorAll(`div.both`);
            
            
            for (let i = 0; i < hide.length; i++) {
                hide[i].style.display = 'none'
            }
            for (let i = 0; i < both.length; i++) {
                both[i].style.display = 'flex'
            }
            for (let i = 0; i < show.length; i++) {
                show[i].style.display = 'flex'
            }

        } else if (type == 'Executor' && state == false) {
            if (this.Author == false) {
                const hide = document.querySelectorAll(`.mainBlockForCard`)
                for (let i = 0; i < hide.length; i++) {
                    hide[i].style.display = 'none'
                }

            } else {
                if(this.Color != ""){
                const hide = document.querySelectorAll(`div.mainBlockForCard`);
                const show = document.querySelectorAll(`div${this.Color}.avtor`);
                const show1 = document.querySelectorAll(`div${this.Color}.both`);
                if(hide != undefined){
                    for (let i = 0; i < hide.length; i++) {
                        hide[i].style.display = 'none'
                    }
                }
                if(show != undefined){
                    for (let i = 0; i < show.length; i++) {
                       show[i].style.display = 'flex'
                    }
                }
                if(show1 != undefined){
                    for (let i = 0; i < show1.length; i++) {
                       show1[i].style.display = 'flex'
                    }
                }
                return;
                }
                const hide = document.querySelectorAll(`div.ispoln`);
                const show = document.querySelectorAll(`div.avtor`);
                const both = document.querySelectorAll(`div.both`);

                for (let i = 0; i < both.length; i++) {
                    both[i].style.display = 'flex'
                }

                for (let i = 0; i < hide.length; i++) {
                    hide[i].style.display = 'none'
                }
                for (let i = 0; i < show.length; i++) {
                    show[i].style.display = 'flex'
                }

            }
        }

    },


    afterViewInit2: function() {


    },

    addCardFunction: function() {
        const option1 = this.createElements('option', {
            className: 'option1'
        }, 'Задача');
        const option2 = this.createElements('option', {
            className: 'option2'
        }, 'Подача');
        const option3 = this.createElements('option', {
            className: 'option3'
        }, 'ДедаДача');
        const selectItem = this.createElements('select', {
            className: 'selectItem'
        }, option1, option2, option3);
        selectItem.disabled = true;

        const checkboxControl = this.createElements('input', {
            checked: 'true',
            type: 'checkbox',
            className: 'checkboxControl'
        });

        const redirectToForm = this.createElements('button', {
            className: 'redirectToForm'
        }, 'Перейти до форми');

        checkboxControl.addEventListener('click', function() {
            const checkbox = document.getElementsByClassName('checkboxControl')[0];
            if (checkbox.checked != true) {
                document.getElementsByClassName('inputsBlock')[0].style.display = 'none';
                document.getElementsByClassName('redirectToForm')[0].style.display = 'block';
                document.getElementsByClassName('recallCheckboxDiv')[0].style.display = 'none';

                document.getElementsByClassName('buttonAddTask')[0].style.display = 'none';
                document.getElementsByClassName('datesBlock')[0].style.display = 'none';
                // document.getElementsByClassName('registrationMainBlock')[0].style.maxHeight = '15vh';
                document.getElementsByClassName('selectItem')[0].disabled = false;


            } else {
                document.getElementsByClassName('recallCheckboxDiv')[0].style.display = 'block';
                document.getElementsByClassName('inputsBlock')[0].style.display = 'flex';
                document.getElementsByClassName('redirectToForm')[0].style.display = 'none';
                document.getElementsByClassName('buttonAddTask')[0].style.display = 'block';
                document.getElementsByClassName('datesBlock')[0].style.display = 'flex';
                document.getElementsByClassName('selectItem')[0].disabled = true;
            }
        }, false);

        const spanForCheckbox = this.createElements('span', {
            className: 'spanForCheckbox'
        }, checkboxControl, 'Приватне');



        const selectType = this.createElements('div', {
            className: 'selectTypeDiv'
        }, spanForCheckbox, selectItem);

        const inputCaption = this.createElements('input', {
            className: 'inputCaption',
            placeholder: 'Текст заголовка'
        });
        const textareaMoreDetails = this.createElements('textarea', {
            className: 'textareaMoreDetails',
            rows: '10',
            cols: '45',
            placeholder: 'Більш детальний текст'
        });
        const inputURL = this.createElements('input', {
            className: 'inputURL',
            placeholder: 'Перехід на сторінку'
        });


        const inputsBlock = this.createElements('div', {
            className: 'inputsBlock'
        }, inputCaption, textareaMoreDetails, inputURL);

        const buttonAddTask = this.createElements('button', {
            className: 'buttonAddTask'
        }, 'Додати задачу');

        buttonAddTask.addEventListener('click', function() {
            alert('Button is work!');
        }, false)

        const buttonCancel = this.createElements('button', {
            className: 'buttonCancel'
        }, 'Скасувати');
        buttonCancel.addEventListener('click', function() {
            document.getElementsByTagName('body')[0].removeChild(createBackground);
        }, false);
        const buttonsBlock = this.createElements('div', {
            className: 'buttonsBlock'
        }, redirectToForm, buttonAddTask, buttonCancel);

        const dateFrom = this.createElements('input', {
            className: 'dateFrom',
            value: this.formatDate(new Date()),
            type: 'date',
            name: 'dateFromInput'
        });
        const dateTo = this.createElements('input', {
            className: 'dateTo',
            type: 'date',
            name: 'dateToInput'
        });

        const creteInputTypeTimeFrom = this.createElements('input', {
            className: 'inputTimeFrom',
            type: 'time',
            value: this.formatTime(),
            name: 'inputTimeFrom'
        });

        dateFrom.onblur = () => {
            if (dateFrom.value == '') {
                dateFrom.classList.add('inputError');
                buttonAddTask.disabled = true;
            } else {
                if (dateFrom.classList.contains('inputError')) {
                    dateFrom.classList.remove('inputError');
                }
                buttonAddTask.disabled = false;
            }
        }

        const creteInputTypeTimeTo = this.createElements('input', {
            className: 'inputTimeTo',
            type: 'time',
            name: 'inputTimeTo',
            value: 'now'
        });

        const labelForFromDate = this.createElements('label', {
            className: 'labelForFromDate'
        }, 'Дата з:');
        labelForFromDate.for = 'dateFromInput';
        const labelForToDate = this.createElements('label', {
            className: 'labelForToDate'
        }, 'Дата по:');
        labelForToDate.for = 'dateToInput';

        const labelForInputTimeFrom = this.createElements('label', {
            className: 'labelForInputTimeFrom'
        }, 'Час: ');
        labelForInputTimeFrom.for = 'inputTimeFrom';
        const labelForInputTimeTo = this.createElements('label', {
            className: 'labelForInputTimeTo'
        }, 'Час: ');
        labelForInputTimeTo.for = 'inputTimeTo';

        const flexBoxContainerForLable = this.createElements('div', {
            className: 'flexBoxContainerForDate'
        }, labelForFromDate, labelForToDate);
        const flexBoxContainerForInputs = this.createElements('div', {
            className: 'flexBoxContainerForDate'
        }, dateFrom, dateTo);

        const flexBoxContainerForInputTypeTimeFrom = this.createElements('div', {
            className: 'flexBoxContainerForInputTypeTimeFrom'
        }, labelForInputTimeFrom, creteInputTypeTimeFrom);
        const flexBoxContainerForInputTypeTimeTo = this.createElements('div', {
            className: 'flexBoxContainerForInputTypeTimeTo'
        }, labelForInputTimeTo, creteInputTypeTimeTo);

        const timeContainer = this.createElements('div', {
            className: 'timeContainer'
        }, flexBoxContainerForInputTypeTimeFrom, flexBoxContainerForInputTypeTimeTo);

        const datesBlock = this.createElements('div', {
            className: 'datesBlock'
        }, flexBoxContainerForLable, flexBoxContainerForInputs, timeContainer);

        const remindIconFlag = this.createElements('div', {
            className: 'remindIconFlag'
        });

        const recallCheckboxControl = this.createElements('input', {
            checked: false,
            type: 'checkbox',
            className: 'recallCheckboxControl'
        });
        recallCheckboxControl.addEventListener('click', function() {
            if (recallCheckboxControl.checked != true) {
                document.getElementsByClassName('remindMeDiv')[0].style.display = 'none';
            } else {
                document.getElementsByClassName('remindMeDiv')[0].style.display = 'flex';
            }
        }, false);

        const recallCheckboxLabel = this.createElements('span', {
            className: 'recallCheckboxLabel'
        }, recallCheckboxControl, 'Нагадати', remindIconFlag);


        const remindMeAtDate = this.createElements('input', {
            className: 'remindMeAtDate',
            type: 'date',
            name: 'remindMeAtDate',
            value: this.formatDate(new Date())
        });
        const labelForRemindDate = this.createElements('label', {
            className: 'labelForFromDate'
        }, 'Дата:');

        const creteInputTypeTimeRemind = this.createElements('input', {
            className: 'creteInputTypeTimeRemind',
            type: 'time',
            name: 'creteInputTypeTimeRemind',
            value: this.formatTime()
        });
        const labelForInputTimeRemind = this.createElements('label', {
            className: 'labelForInputTimeRemind'
        }, 'Час: ');

        const remindIconThrough = this.createElements('div', {
            className: 'remindIconThrough'
        });

        const iconNames = ['today', 'alarm', 'date_range', 'brightness_low'];
        const phrases = ['Сьогодні', 'Завтра', 'Наступної неділі', 'Через 1 місяц'];

        for (let i = 0; i < 4; i++) {
            const iconRemind = this.createElements('i', {
                className: 'material-icons'
            }, `${iconNames[i]}`);
            iconRemind.title = `${phrases[i]}`;
            iconRemind.id = `iconElement${i+1}`;
            remindIconThrough.appendChild(iconRemind);

            iconRemind.addEventListener('click', function(event) {

                switch (event.target.id) {
                    case 'iconElement1':
                        document.getElementsByClassName('remindMeAtDate')[0].value = this.formatDate(new Date());
                        break;
                    case 'iconElement2':
                        document.getElementsByClassName('remindMeAtDate')[0].value = this.formatDate(new Date((Date.now()) + 86400000));
                        break;
                    case 'iconElement3':
                        document.getElementsByClassName('remindMeAtDate')[0].value = this.formatDate(new Date((Date.now()) + (86400000 * 7)));
                        break;
                    case 'iconElement4':
                        document.getElementsByClassName('remindMeAtDate')[0].value = this.formatDate(new Date((Date.now()) + (86400000 * 30)));
                        break;
                }


                let newElement = event.target;
                if (newElement != this.iconRemind) {
                    newElement.style.borderBottom = `1px solid gray`;
                    if (this.iconRemind != '') {
                        this.iconRemind.style.borderBottom = 'none';
                    }
                }
                this.iconRemind = newElement;
            }.bind(this), false);


        }

        remindIconFlag.appendChild(document.createTextNode('Пріоритет:'));
        const colorsArray = ['red', 'orange', '#d0d000c7', 'green'];
        for (let i = 0; i < 4; i++) {
            const iconFlag = this.createElements('i', {
                className: 'material-icons'
            }, 'flag');
            iconFlag.title = `Пріоритет ${(i+1)}`;
            iconFlag.style.color = colorsArray[i];
            remindIconFlag.appendChild(iconFlag);

            iconFlag.addEventListener('click', function(event) {
                let newElement = event.target;
                if (newElement != this.currentItem) {
                    newElement.style.borderBottom = `1px solid ${colorsArray[i]}`;
                    if (this.currentItem != '') {
                        this.currentItem.style.borderBottom = 'none';
                    }
                }
                this.currentItem = newElement;
            }.bind(this), false);


        }
        const remindMeLeftDiv = this.createElements('div', {
            className: 'remindMeLeftDiv'
        }, labelForRemindDate, remindMeAtDate, labelForInputTimeRemind, creteInputTypeTimeRemind);

        const remindMeRightDiv = this.createElements('div', {
            className: 'remindMeRightDiv'
        }, remindIconThrough);

        const remindMeDiv = this.createElements('div', {
            className: 'remindMeDiv'
        }, remindMeLeftDiv, remindMeRightDiv);


        const recallCheckboxDiv = this.createElements('div', {
            className: 'recallCheckboxDiv'
        }, recallCheckboxLabel, remindMeDiv);




        const registrationBlock = this.createElements('div', {
            className: 'registrationMainBlock'
        }, selectType, inputsBlock, datesBlock, recallCheckboxDiv, buttonsBlock);
        registrationBlock.addEventListener('click', this.stopPropagationFunction.bind(this), false);

        const createBackground = this.createElements('div', {
            id: 'hiddenDiv'
        }, registrationBlock);
        createBackground.addEventListener('click', function() {
            document.getElementsByTagName('body')[0].removeChild(createBackground);
        }, false);

        document.getElementsByTagName('body')[0].appendChild(createBackground);
    },
    stopPropagationFunction: function(event) {
        event.stopPropagation();
    },
    formatTime: function() {
        let hh = new Date().getHours();
        if (hh < 10) hh = '0' + hh;
        let mm = new Date().getMinutes();
        if (mm < 10) mm = '0' + mm;

        return hh + ':' + mm
    },
    formatDate: function(date) {

        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yy = date.getFullYear();
        if (yy < 10) yy = '0' + yy;

        return yy + '-' + mm + '-' + dd;
    },



    createElements: function(tag, props, ...children) {
        const element = document.createElement(tag);
        Object.keys(props).forEach(key => element[key] = props[key]);

        if (children.length > 0) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    child = document.createTextNode(child);
                }
                element.appendChild(child);
            })
        }
        return element;
    },

    handleButtonClick: function(message, activateBtn, unactivateBtn1, unactivateBtn2, unactivateBtn3) {

        // let message = {
        //     name: message,
        //     package: {
        //         value: activateBtn
        //     }
        // };
        // this.messageService.publish(message);

        this.messageService.publish({
            name: message
        });

        activateBtn.classList.add('active');
        unactivateBtn1.classList.remove('active');
        unactivateBtn2.classList.remove('active');
        unactivateBtn3.classList.remove('active');
    },
    checkboxClickedCheck: function(messageValue) {
        let message = {
            name: 'checkBoxValue',
            package: {
                value: messageValue
            }
        };
        this.messageService.publish(message);
    },

    handleButtonGroupClick: function(messageValue, activateBtn, unactivateBtn1, unactivateBtn2, unactivateBtn3) {
     


        activateBtn.classList.add('btn_block_active');
        unactivateBtn1.classList.remove('btn_block_active');
        unactivateBtn2.classList.remove('btn_block_active');
        unactivateBtn3.classList.remove('btn_block_active');
    }
};
}());
