(function () {
  return {
    title: [],
    hint:  '',
    global_PIB:  '%',
    global_Phone:  '%',
    global_Adress:  '%',
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
                        .close2 {
                            position: relative;
                            top: -25px;
                            right: -10px;
                            color: #aaa;
                            float: right;
                            font-size: 28px;
                            font-weight: bold;
                        }
                        
                        .close2:hover,
                        .close2:focus {
                            color: black;
                            text-decoration: none;
                            cursor: pointer;
                        }  
                        
      
           
 .top-bar .searchbar {
    padding-left: 12px;
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
    max-width: 400px;
    position: relative
}

.top-bar .searchbar input[type="text"].f-input {
    margin: 0;
    height: 29px;
    border-width: 1px;
    border-color: #c8ccd0;
    border-radius: 3px;
    width: 100%;
    font-size: 14px;
    background-color: #FFF;
    box-shadow: none;
    color: #3b4045;
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
    position: absolute;
    right: 0;
    top: 50%;
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
    padding-right: 50px
}

.top-bar._search-open .searchbar .btn-topbar-primary {
    opacity: 1;
    transform: translateY(-50%) translateX(1px);
    z-index: 0
}



@media screen and (max-width: 920px) {

    .top-bar .searchbar input[type="text"].f-input {
        font-size: 12px
    }

.hid-men {
    
    display: none;
}



}

.top-bar .searchbar {
    max-width: 750px
}

                        .back_color_select_row {
                            background-color: #f7f9fb;
                        }
          
          .overfl{
                  overflow: hidden;
              }
                        
           </style>
                
<html>
                <head>
                	<style>.mat-input-container{display:inline-block;position:relative;text-align:left}[dir=rtl] .mat-input-container{text-align:right}.mat-input-wrapper{position:relative}.mat-input-flex{display:inline-flex;align-items:baseline;width:100%}.mat-input-prefix,.mat-input-suffix{white-space:nowrap;flex:none}.mat-input-prefix .mat-datepicker-toggle,.mat-input-prefix .mat-icon,.mat-input-suffix .mat-datepicker-toggle,.mat-input-suffix .mat-icon{width:1em;height:1em;vertical-align:text-bottom}.mat-input-prefix .mat-icon-button,.mat-input-suffix .mat-icon-button{font:inherit;vertical-align:baseline}.mat-input-prefix .mat-icon-button .mat-icon,.mat-input-suffix .mat-icon-button .mat-icon{font-size:inherit;width:1em;height:1em;vertical-align:baseline}.mat-input-infix{display:block;position:relative;flex:auto}.mat-input-element{font:inherit;background:0 0;color:currentColor;border:none;outline:0;padding:0;width:100%;vertical-align:bottom}.mat-input-element:-moz-ui-invalid{box-shadow:none}.mat-input-element:-webkit-autofill+.mat-input-placeholder-wrapper .mat-input-placeholder{display:none}.mat-input-element:-webkit-autofill+.mat-input-placeholder-wrapper .mat-float{display:block;transition:none}.mat-input-element::placeholder{color:transparent!important}.mat-input-element::-moz-placeholder{color:transparent!important}.mat-input-element::-webkit-input-placeholder{color:transparent!important}.mat-input-element:-ms-input-placeholder{color:transparent!important}.mat-input-placeholder-wrapper{position:absolute;left:0;box-sizing:content-box;width:100%;height:100%;overflow:hidden;font-size: 0.7em; pointer-events:none}textarea.mat-input-element{overflow:auto}.mat-input-placeholder{position:absolute;left:0;font:inherit;pointer-events:none;width:100%;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;transform:perspective(100px);-ms-transform:none;transform-origin:0 0;transition:transform .4s cubic-bezier(.25,.8,.25,1),color .4s cubic-bezier(.25,.8,.25,1),width .4s cubic-bezier(.25,.8,.25,1);display:none}.mat-focused .mat-input-placeholder.mat-float,.mat-input-placeholder.mat-empty,.mat-input-placeholder.mat-float:not(.mat-empty){display:block}[dir=rtl] .mat-input-placeholder{transform-origin:100% 0;left:auto;right:0}.mat-input-placeholder:not(.mat-empty){transition:none}.mat-input-underline{position:absolute;height:1px;width:100%}.mat-input-underline.mat-disabled{background-image:linear-gradient(to right,rgba(0,0,0,.26) 0,rgba(0,0,0,.26) 33%,transparent 0);background-size:4px 1px;background-repeat:repeat-x;background-position:0;background-color:transparent}.mat-input-underline .mat-input-ripple{position:absolute;height:2px;top:0;left:0;width:100%;transform-origin:50%;transform:scaleX(.5);visibility:hidden;transition:background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-focused .mat-input-underline .mat-input-ripple,.mat-input-invalid .mat-input-underline .mat-input-ripple{visibility:visible;transform:scaleX(1);transition:transform 150ms linear,background-color .3s cubic-bezier(.55,0,.55,.2)}.mat-input-subscript-wrapper{position:absolute;width:100%;overflow:hidden}.mat-input-placeholder-wrapper .mat-datepicker-toggle,.mat-input-placeholder-wrapper .mat-icon,.mat-input-subscript-wrapper .mat-datepicker-toggle,.mat-input-subscript-wrapper .mat-icon{width:1em;height:1em;font-size:inherit;vertical-align:baseline}.mat-input-hint-wrapper{display:flex}.mat-input-hint-spacer{flex:1 0 1em}.mat-input-error{display:block}
                	</style>
	
                	<style>.mat-button,.mat-fab,.mat-icon-button,.mat-mini-fab,.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:88px;line-height:36px;padding:0 16px;border-radius:2px}[disabled].mat-button,[disabled].mat-fab,[disabled].mat-icon-button,[disabled].mat-mini-fab,[disabled].mat-raised-button{cursor:default}.cdk-keyboard-focused.mat-button .mat-button-focus-overlay,.cdk-keyboard-focused.mat-fab .mat-button-focus-overlay,.cdk-keyboard-focused.mat-icon-button .mat-button-focus-overlay,.cdk-keyboard-focused.mat-mini-fab .mat-button-focus-overlay,.cdk-keyboard-focused.mat-raised-button .mat-button-focus-overlay{opacity:1}.mat-button::-moz-focus-inner,.mat-fab::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-mini-fab::-moz-focus-inner,.mat-raised-button::-moz-focus-inner{border:0}.mat-fab,.mat-mini-fab,.mat-raised-button{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);transform:translate3d(0,0,0);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1)}.mat-fab:not([disabled]):active,.mat-mini-fab:not([disabled]):active,.mat-raised-button:not([disabled]):active{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}[disabled].mat-fab,[disabled].mat-mini-fab,[disabled].mat-raised-button{box-shadow:none}.mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{transition:none;opacity:0}.mat-button:hover .mat-button-focus-overlay{opacity:1}.mat-fab{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab:not([disabled]):active{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-fab .mat-icon,.mat-fab i{padding:16px 0;line-height:24px}.mat-mini-fab{box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab:not([disabled]):active{box-shadow:0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)}.mat-mini-fab .mat-icon,.mat-mini-fab i{padding:8px 0;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button .mat-icon,.mat-icon-button i{line-height:24px}.mat-button,.mat-icon-button,.mat-raised-button{color:currentColor}.mat-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*{vertical-align:middle}.mat-button-focus-overlay,.mat-button-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-button-focus-overlay{background-color:rgba(0,0,0,.12);border-radius:inherit;opacity:0;transition:opacity .2s cubic-bezier(.35,0,.25,1),background-color .2s cubic-bezier(.35,0,.25,1)}@media screen and (-ms-high-contrast:active){.mat-button-focus-overlay{background-color:rgba(255,255,255,.5)}}.mat-button-ripple-round{border-radius:50%;z-index:1}@media screen and (-ms-high-contrast:active){.mat-button,.mat-fab,.mat-icon-button,.mat-mini-fab,.mat-raised-button{outline:solid 1px}}
                	</style>
                
                	<style>.entry-form-wrapper{padding:15px 10px 0}
                	</style>
                
                	<style>.card-wrapper{border:1px solid #e7ecf1;padding:0 15px;margin-bottom:10px;border-radius:2px;box-shadow:0 2px 3px 2px rgba(0,0,0,.03)}.card-wrapper .card-title{font-weight:700;height:56px;line-height:56px;vertical-align:middle;color:#3f7ab7;font-size:16px;text-transform:uppercase}.card-wrapper .card-title.without-border{border-bottom:none}.card-wrapper .card-title .card-title-icon{width:28px;height:28px;float:right;background-color:#ff6e40;color:#fff;margin-top:14px;border-radius:50%;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.1),0 1px 2px rgba(0,0,0,.18)}.card-wrapper .card-title .card-title-icon:hover{box-shadow:0 3px 6px rgba(0,0,0,.2),0 3px 6px rgba(0,0,0,.26);background-color:#ff6333}.card-wrapper .card-title i{vertical-align:top;line-height:28px;width:28px;text-align:center;font-size:20px;transition:transform .2s linear}.card-wrapper .card-title i.rotate-arrow{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.card-wrapper .card-body{height:0;overflow:hidden;transition:all .2s linear;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin:0 -7.5px;border-top:1px solid #eef1f5;margin-bottom:-1px}.card-wrapper .card-body.expanded{height:auto;transition:all .2s linear;padding:15px 0;overflow:visible}.card-wrapper .card-body .light-table-title{margin:5px 0}
                	</style>
                </head>
                
    <body>
            <router-outlet class="static narrow">
            </router-outlet>
        
            <router-outlet class="ng-tns-c18-27">
            </router-outlet>
    

    
        <div class="entry-form-wrapper">
                    <div _ngcontent-c23="" class="light-table-title entry-form-title">
            
            
                    <sections style="display: flex; height: 100%;    margin-top: 0px; text-align: center; font-weight: bold;">
        
 
      <div style="display: flex; width: 100%;">  
            <div style="width: 100%;">  
                        <div _ngcontent-c23="" class="caption">
          
                                    <span _ngcontent-c23="" class="caption-subject"> ПОШУК
                                    </span>
                                     <span id="person_id" style="color:white; width: 0px;     display: none;"  _ngcontent-c23="" class="caption-subject"> 0
                                    </span>
                                     <span id="place_id" style="color:white; width: 0px;     display: none;"  _ngcontent-c23="" class="caption-subject"> 0
                                    </span>
                                     <span id="person_name" style="color:white; width: 0px;     display: none;"  _ngcontent-c23="" class="caption-subject"> 0
                                    </span>
                                     <span id="place_name" style="color:white; width: 0px;     display: none;"  _ngcontent-c23="" class="caption-subject"> 0
                                    </span>                                    
                                     <span id="claim_id" style="color:white; width: 0px;     display: none;"  _ngcontent-c23="" class="caption-subject"> 0
                                    </span>                                       
                                    
                                     <span id="label_object_id" style="color:white; width: 0px;     display: none;"  _ngcontent-c23="" class="caption-subject"> s
                                    </span>
                                     <span id="label_object_name" style="color:white; width: 0px;     display: none;"  _ngcontent-c23="" class="caption-subject"> s
                                    </span>
                                     <span id="label_person_id" style="color:white; width: 0px;     display: none;"  _ngcontent-c23="" class="caption-subject"> s
                                    </span>
                                     <span id="label_person_name" style="color:white; width: 0px;     display: none;"  _ngcontent-c23="" class="caption-subject"> s
                                    </span>
                                    <span id="label_phone" style="color:white; width: 0px;     display: none;"  _ngcontent-c23="" class="caption-subject"> s
                                    </span>
                               

                        </div>
                                                     
                                

                
              <div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 2px;">                 
                   <div class="searchbar" autocomplete="on">
                        <input id="phone_value" type="text" placeholder="Введіть ПІБ..." value="" tabindex="1" autocomplete="off" maxlength="240" class="f-input">
                        <button id="btn" class="btn-topbar-primary"><svg aria-hidden="true" class="svg-icon iconSearch" width="18" height="18" viewBox="0 0 18 18">
                        <path d="M12.86 11.32L18 16.5 16.5 18l-5.18-5.14v-.35a7 7 0 1 1 1.19-1.19h.35zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"></path></svg></button>
                    </div>
             </div>           
                                
              <div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 2px;">                 
           <div method="get" class="searchbar" autocomplete="on" role="search">
                <input id="phone_value2" name="q" type="text" placeholder="Введіть телефон..." value="" tabindex="2" autocomplete="off" maxlength="240" class="f-input js-search-field">
                <button type="submit" id="btn2" aria-label="ПІБ..." class="btn-topbar-primary js-search-submit"><svg aria-hidden="true" class="svg-icon iconSearch" width="18" height="18" viewBox="0 0 18 18">
                <path d="M12.86 11.32L18 16.5 16.5 18l-5.18-5.14v-.35a7 7 0 1 1 1.19-1.19h.35zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"></path></svg></button>
            </div>
            </div>

              <div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 2px;">                 
           <div class="searchbar" autocomplete="on">
                <input id="phone_value3" type="text" placeholder="Введіть місце..." value="" tabindex="3" autocomplete="off" maxlength="240" class="f-input">
                <button id="btn3" class="btn-topbar-primary"><svg aria-hidden="true" class="svg-icon iconSearch" width="18" height="18" viewBox="0 0 18 18">
                <path d="M12.86 11.32L18 16.5 16.5 18l-5.18-5.14v-.35a7 7 0 1 1 1.19-1.19h.35zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"></path></svg></button>
            </div>
            </div>


              <div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 2px;">                 
           <div class="searchbar" autocomplete="on">
                <input id="phone_value4" type="text" placeholder="Введіть коментарій..." value="" tabindex="4" autocomplete="off" maxlength="240" class="f-input">
                <button style="display: none;" id="btn4" class="btn-topbar-primary"><svg aria-hidden="true" class="svg-icon iconSearch" width="18" height="18" viewBox="0 0 18 18">
                <path d="M12.86 11.32L18 16.5 16.5 18l-5.18-5.14v-.35a7 7 0 1 1 1.19-1.19h.35zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"></path></svg></button>
            </div>
            </div>
            
             <div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 15px;">  
              <button type="submit" id="btn5" style="    height: 30px;    background-color: #f7f9fb;    width: 154px;    border-radius: 5px;"> Створити Заявку </button>
               </div>
               
          </div>  
                    
     
        </div>


    </body>
        
</html>

                    <!-- The modal1 -->
                    <div id="myModal1" class="modal1">
                        <!-- modal1 content -->
                        <div class="modal1-content">
                            <span class="close1">&times;</span>
                            <p style="text-align:center; font-size: 1.8em;"> Додання зверенення до заявки № <span id="claims_value"></span> </p>
                           <p style="text-align: left; font-size: 1.2em; margin-top: 10px;"> від контакта: <span id="person_value"></span> </p>
                        
                        
                        <div>                
                        <div  id="select_menuUser" style="margin-left: 10px; font-style: italic; display: inline; text-decoration: underline; color: cadetblue; font-size: 1.1em;"> </div>  
                        <div class="down12333124">
                         <button id="btn_save_data" style="background-color: #46da72; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer;"> ДОДАТИ </button>
                         <button id="btn_save_data2" style="background-color: #46da72; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer;"> ДОДАТИ </button>
                         <button id="btn_save_data3" style="background-color: #46da72; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer;"> ДОДАТИ </button>
                         <button class="close0" id="btn_close_data" style="background-color: #94959796; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer; margin-left: 25px;"> ВІДМІНА </button>
                         </div> 
                    </div>
                        </div>
                    </div>
                    
           
                    <!-- The modal2 -->
                    <div id="myModal2" class="modal1">
                        <!-- modal2 content -->
                        <div class="modal1-content">
                            <span class="close2">&times;</span>
                            <p style="text-align:center; font-size: 1.8em;"> Зверенення додано успішно </p>
                        </div>
                    </div>   
                    
                `

    ,
    init: function() {
         let executeQuery = {
            queryCode: 'search_contact',
            limit: 1,
            parameterValues: [{key: '@PIB',
                               value: this.global_PIB
                               },{
                               key: '@Phone',
                               value: this.global_Phone
                                }
                ]
        };
        this.queryExecutor(executeQuery, this.load, this);
    
    
         
    
    },
    
    load: function(data) {
      
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
            
        
              if (params[""] == 'undefined')
     {
        if (document.getElementById('phone_value3').value == "") {this.global_Adress = "%"} else {this.global_Adress = document.getElementById('phone_value3').value}; 
     }
     else
     {
      document.getElementById('phone_value3').value = params["par3"];
      document.getElementById('phone_value4').value = params["par4"];
      if (document.getElementById('phone_value3').value == "") {this.global_Adress = "%"} else {this.global_Adress = document.getElementById('phone_value3').value}; 
         
     };
     
   
        if (params[""] == 'undefined')
     {
         if (document.getElementById('phone_value').value == "") {this.global_PIB = "%"} else {this.global_PIB = document.getElementById('phone_value').value};
         if (document.getElementById('phone_value2').value == "") {this.global_Phone = "%"} else {this.global_Phone = document.getElementById('phone_value2').value};
     }
     else
     {
      document.getElementById('phone_value').value = params["par1"];
      document.getElementById('phone_value2').value = params["par2"];
       if (document.getElementById('phone_value').value == "") {this.global_PIB = "%"} else {this.global_PIB = document.getElementById('phone_value').value};
       if (document.getElementById('phone_value2').value == "") {this.global_Phone = "%"} else {this.global_Phone = document.getElementById('phone_value2').value};
         
     };  
      
      
      //console.log(data);
      
        let myBtn = document.getElementById('btn');
        myBtn.addEventListener( "click" , () => { this.load_search_data(data, this) } );

        let myBtn2 = document.getElementById('btn2');
        myBtn2.addEventListener( "click" , () => { this.load_search_data(data, this) } );
        
        let myBtn3 = document.getElementById('btn3');
        myBtn3.addEventListener( "click" , () => { this.load_search_data(data, this) } );
        
        let myBtn4 = document.getElementById('btn4');
        myBtn4.addEventListener( "click" , () => { this.load_search_data(data, this) } );

       
       
       document.getElementById('search_block_widget').classList.add("overfl");
       document.querySelector('smart-bi-custom-widget').classList.add("overfl");
       
       
       this.load_search_data(data, this)
     
        let myBtn5 = document.getElementById('btn5');
       myBtn5.addEventListener( "click" , () => {
            
            console.log(document.getElementById('place_name').innerText, document.getElementById('place_id').innerText);
            
                let r = [ { code: "Description", value: document.getElementById('phone_value4').value },  { code: "places_id", value: document.getElementById('place_name').innerText , keyValue: Number(document.getElementById('place_id').innerText) }];
                let r1 = JSON.stringify(r);
                let r2 = encodeURI(r1);
                     console.log(r2);
                     //row.values[0]
         
                   window.open(location.origin + localStorage.getItem('VirtualPath') + "/sections/Claims/add?DefaultValues="+r2, "_self");
            });

            // );                                                       
    },


 load_search_data: function() {
     


   //  debugger;
     

         if (document.getElementById('phone_value').value == "") {this.global_PIB = "%"} else {this.global_PIB = document.getElementById('phone_value').value};
         if (document.getElementById('phone_value2').value == "") {this.global_Phone = "%"} else {this.global_Phone = document.getElementById('phone_value2').value};


//?par1=sdf&par2=dsf&par3=fdsre&par4=dsfsd

       
         let executeQuery = {
            queryCode: 'search_contact',
            limit: -1,
            parameterValues: [{key: '@PIB',
                               value: this.global_PIB
                               },{
                               key: '@Phone',
                               value: this.global_Phone
                                }
                ]
        };
        this.queryExecutor(executeQuery, this.search_person_data, this);
        
        
      

        if (document.getElementById('phone_value3').value == "") {this.global_Adress = "%"} else {this.global_Adress = document.getElementById('phone_value3').value}; 

      
        let executeQuery2 = {
            queryCode: 'search_adress',
            limit: -1,
            parameterValues: [{key: '@Adress',
                               value: this.global_Adress
                               }]
        };
        this.queryExecutor(executeQuery2, this.search_place_data, this);
        
    },


  search_person_data: function(data, context) {
               if (document.getElementsByClassName('group_variant')){
            var paras = document.getElementsByClassName('group_variant');
            while(paras[0]) {
                paras[0].parentNode.removeChild(paras[0]);
            };
        };
      
         document.getElementById('person_id').innerText = "0";
         
                if (data) { 
                    
                                                let message = {
                                    name: 'showUserData',
                                    package: {
                                        type: Number(document.getElementById('person_id').innerText)
                                    }
                                };
                            this.messageService.publish(message);
                    
            for (var i=0;i<data.rows.length;i++){
              
             if (data.rows[i].values[0] == 0) {   
                var iDiv = document.getElementById('person_table_id');
                var iDiv2 = document.createElement('li');
                    iDiv2.style = `
                                font-size: 1em;
                                color: red;
                                border-bottom: 1px dotted #c3c3c3;
                                padding: 6px 8px 6px 16px;
                                text-decoration: none;
                                display: block;
                                width: 100%;
                                text-align: left;
                                cursor: pointer;
                                list-style-type: none;
                                outline: none;`;
                    iDiv2.innerHTML = '<li id="label_m_'+i+'" value="'+data.rows[i].values[0]+'" style="cursor: pointer;" >'+data.rows[i].values[1] + '<param name="'+data.rows[i].values[1]+'" value="'+data.rows[i].values[0]+'" id="param_m_'+i+'"/></li>'; 
                // debugger;
                iDiv2.id = 'q_group'+ i;
                iDiv2.className = 'group_variant back_color_select_row';
                iDiv.appendChild(iDiv2);
                

             }
             else 
             {
                var iDiv = document.getElementById('person_table_id');
                var iDiv2 = document.createElement('li');
                    iDiv2.style = `
                                font-size: 1em;
                                color: rgb(90, 96, 101);
                                border-bottom: 1px dotted #c3c3c3;
                                padding: 6px 8px 6px 16px;
                                text-decoration: none;
                                display: block;
                                width: 100%;
                                text-align: left;
                                cursor: pointer;
                                list-style-type: none;
                                outline: none;`;
                    iDiv2.innerHTML = '<li id="label_m_'+i+'" value="'+data.rows[i].values[0]+'" style="cursor: pointer;" >'+data.rows[i].values[1] + '</br>тел: ' +data.rows[i].values[5] + '<param name="'+data.rows[i].values[1]+'" value="'+data.rows[i].values[0]+'" id="param_m_'+i+'"/></li>'; 
                // debugger;
                iDiv2.id = 'q_group'+ i;
                iDiv2.className = 'group_variant';
                iDiv.appendChild(iDiv2);
             };
                
                
            };   
            
            for (let i = 0; i < document.getElementsByClassName('group_variant').length; i++) {
                var divMenuItemBlock = "";
                var divMenuItemBlock = document.getElementsByClassName('group_variant')[i];
                
                divMenuItemBlock.addEventListener('click', function(event) {
                    
                            //console.log(document.getElementById('param_m_'+i).name, ' / ', document.getElementById('param_m_'+i).value);
                                                
                            for (let i = 0; i < document.getElementsByClassName('group_variant').length; i++) {
                                document.getElementsByClassName('group_variant')[i].classList.remove("back_color_select_row");
                            };
                            document.getElementsByClassName('group_variant')[i].classList.add("back_color_select_row");
                            document.getElementById('person_id').innerText = document.getElementById('param_m_'+i).value;    
                            document.getElementById('person_name').innerText = document.getElementById('param_m_'+i).name;                                
                           // console.log(document.getElementById('person_id').innerText);
                            let message = {
                                    name: 'showUserData',
                                    package: {
                                        type: Number(document.getElementById('person_id').innerText),
                                        type2: Number(document.getElementById('place_id').innerText)
                                    }
                                };
                            this.messageService.publish(message);

                }.bind(this), false);         
            };

    };
     },

search_place_data: function(data, context) {
               if (document.getElementsByClassName('place_variant')){
            var paras = document.getElementsByClassName('place_variant');
            while(paras[0]) {
                paras[0].parentNode.removeChild(paras[0]);
            };
        };
      
         
         
                if (data) { 
            for (var i=0;i<data.rows.length;i++){
              
             if (data.rows[i].values[0] == 0) {   
                var iDiv = document.getElementById('place_table_id');
                var iDiv2 = document.createElement('li');
                    iDiv2.style = `
                                font-size: 1em;
                                color: red;
                                border-bottom: 1px dotted #c3c3c3;
                                padding: 6px 8px 6px 16px;
                                text-decoration: none;
                                display: block;
                                width: 100%;
                                text-align: left;
                                cursor: pointer;
                                list-style-type: none;
                                outline: none;`;
                    iDiv2.innerHTML = '<li id="place_label_m_'+i+'" value="'+data.rows[i].values[0]+'" style="cursor: pointer;" >'+data.rows[i].values[1] + '<param name="'+data.rows[i].values[1]+'" value="'+data.rows[i].values[0]+'" id="place_param_m_'+i+'"/></li>'; 
                // debugger;
                iDiv2.id = 'p_group'+ i;
                iDiv2.className = 'place_variant back_color_select_row';
                iDiv.appendChild(iDiv2);
             }
             else 
             {
                var iDiv = document.getElementById('place_table_id');
                var iDiv2 = document.createElement('li');
                    iDiv2.style = `
                                font-size: 1em;
                                color: rgb(90, 96, 101);
                                border-bottom: 1px dotted #c3c3c3;
                                padding: 6px 8px 6px 16px;
                                text-decoration: none;
                                display: block;
                                width: 100%;
                                text-align: left;
                                cursor: pointer;
                                list-style-type: none;
                                outline: none;`;
                    iDiv2.innerHTML = '<li id="place_label_m_'+i+'" value="'+data.rows[i].values[0]+'" style="cursor: pointer;" >'+data.rows[i].values[1] + '<param name="'+data.rows[i].values[1]+'" value="'+data.rows[i].values[0]+'" id="place_param_m_'+i+'"/></li>'; 
                // debugger;
                iDiv2.id = 'p_group'+ i;
                iDiv2.className = 'place_variant';
                iDiv.appendChild(iDiv2);
             };
                
                
            };  
            
            for (let i = 0; i < document.getElementsByClassName('place_variant').length; i++) {
                var divMenuItemBlock = "";
                var divMenuItemBlock = document.getElementsByClassName('place_variant')[i];
                
                divMenuItemBlock.addEventListener('click', function(event) {
                    
                            //console.log(document.getElementById('place_param_m_'+i).name, ' / ', document.getElementById('place_param_m_'+i).value);
                                                
                            for (let i = 0; i < document.getElementsByClassName('place_variant').length; i++) {
                                document.getElementsByClassName('place_variant')[i].classList.remove("back_color_select_row");
                            };
                            document.getElementsByClassName('place_variant')[i].classList.add("back_color_select_row");
                            document.getElementById('place_id').innerText = document.getElementById('place_param_m_'+i).value;       
                            document.getElementById('place_name').innerText = document.getElementById('place_param_m_'+i).name;     
                            let message = {
                                    name: 'showPlaceData',
                                    package: {
                                        type: Number(document.getElementById('place_id').innerText)
                                    }
                                };
                            this.messageService.publish(message);

                }.bind(this), false);         
            };
 
    };
     },

};
}());
