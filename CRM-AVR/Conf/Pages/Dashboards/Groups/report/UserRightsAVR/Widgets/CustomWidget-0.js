(function() {
    return {
        title: [],
        hint:  '',
        subscriptions: [],
        formatTitle: function() {},
        load_page: 0,
        param_hiden2: 0,
        customConfig:
                `
                <style>
                    * {
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                    }
                
                    .sidenav {
                        cursor: pointer;
                        z-index: 2;
                        font-size: 16px;
                        text-decoration: none;
                        color: #eee;
                        background: #ffffff;
                        background: -webkit-linear-gradient(#ffffff, #ffffff);
                        background: -moz-linear-gradient(#ffffff, #ffffff);
                        background: -o-linear-gradient(#ffffff, #ffffff);
                        background: -ms-linear-gradient(#ffffff, #ffffff);
                        background: linear-gradient(#ffffff, #ffffff);
                        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
                    }

                    /* Style the sidenav links and the dropdown button */
                    .sidenav a, .dropdown-btn {
                        border-top: 1px solid #eff2f5;
                        padding: 6px 8px 6px 16px;
                        text-decoration: none;
                        color: #eff2f5;
                        display: block;
                        border: none;
                        background: none;
                        width: 100%;
                        text-align: left;
                        cursor: pointer;
                        outline: none;
                    }
    
                    .dropdown-btn i {
                        font-size: 21px;
                    }
                    .sidenav a, .sidenav button {
                        border-top: 1px solid #eff2f5;
                        height: 40px;
                        font-size: 16px;
                        color: black;
                    }
    
                    .sidenav i {
                        color: #848484;
                        font-size: 1.6em;
                    }
    
                    /* On mouse-over */
                    .sidenav a:hover, .dropdown-btn:hover {
                        color: black;
                         background: #eff2f5;
                    }
    
                    .dropdown-btn.active2 .fa-caret-down {
                        color: red;
                    }

                    /* Add an active class to the active dropdown button */
                    .active2 {
                        background-color: #ffffff;
                        color: white;
                    }
    
                    /* Dropdown container (hidden by default). Optional: add a lighter background color and some left padding to change the design of the dropdown content */
                    .dropdown-container {
                        display: none;
                        padding-left: 0px;
                    }

                    .dropdown-container a {
                        cursor: pointer;
                        border: none;
                        padding: 10px 40px;
                        z-index: 1;
                        text-decoration: none;
                        font-size: 0.9em;
                        color: black;
                        background: white;
                        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
                    }
    
                    .dropdown-container sections {
                        cursor: pointer;
                        padding: 10px 20px;
                        z-index: 1;
                        text-decoration: none;
                        font-size: 16px;
                        color: black;
                        background: white;
                        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
                    }

                    .dropdown-container a:hover {
                        background: ##eff2f5;
                        color: black;
                    }
    
                    /* Optional: Style the caret down icon */
                    .fa-caret-down {
                        float: right;
                        padding-right: 8px;
                    }
    
                    .menu_checkbox {
                        width: 20px;
                        height: 20px;
                        margin-right: 10px;
                        vertical-align: bottom;
                    }
        
            </style>
    
            <div style="display: none;" id="UserId_Value"> </div> 
                            
            <div id="main_menuUser_load" style="margin-left: 10px; font-size: 2em; color: darkgray;"> <i class="material-icons" style="font-size: 1.2em; margin-top: 10px;">account_circle</i>  виберіть користувача </div>              
                 
            <div class="sidenav hid_elem" id="main_menuUser">
                    <!--  Add modified menu preview-->
                    <!-- MENU №1 START-->
                    <div>
                        <button class="dropdown-btn" style="border-top:1.45px solid #eff2f5;"><i style ="font-size: 1.6em; color: #48d640;" class="material-icons">assignment</i> 
                            <b style="vertical-align: super;">Звернення</b> 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        
                        <div class="dropdown-container">
                            <div>  
                                <button style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                                	
                                    <div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                    <input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_2" value="2" >Пошук+Реєстрація звернення <i class="fa fa-caret-down"></i>
                                </button>
                            
                                <div class="dropdown-container">
                                    <section style="display: flex; text-align: center; cursor:auto;">
                                        <div class="sectionWrapper" style="width: 100%;">
                                            <div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                            		            <form id="search2"   method="get" class="searchbar" autocomplete="on" role="search">
                            		            	<input id="input_search_phone_value2" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть номер телефону..." value="" tabindex="1" autocomplete="off" maxlength="240" class="f-input js-search-field">
                            		            </form>
                            	            </div>
                            	            
                            	            <div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                            		            <form id="search2b"  method="get" class="searchbar" autocomplete="on" role="search">
                            		            	<input id="input_search_pib_value2" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть ПІБ..." value="" tabindex="2" autocomplete="off" maxlength="240" class="f-input js-search-field">
                            		            </form>
                            	            </div>
                            	            
                            	            <div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                            		            <form class="searchbar" autocomplete="on">
                            		            	<input id="input_search_address_value2" style="width: 230px; height: 34px;" type="text" placeholder="  Введіть місце..." value="" tabindex="3" autocomplete="off" maxlength="240" class="f-input">
                            		            </form>
                            	            </div>
                            	            
                            	            <div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                            		            <form class="searchbar" autocomplete="on">
                            		            	<input id="input_search_text_value2" style="width: 230px; height: 34px;" type="text" placeholder="  Введіть коментарій..." value="" tabindex="4" autocomplete="off" maxlength="240" class="f-input">
                            		            </form>
                            	            </div>
                            	            
                            	            <div style="width:100%; margin-bottom:10px; margin-top: 10px; padding-left: 43px;">  
                            		            <button id="btn_search_appeals2" style="background-color: #adb2b7; position: relative; left: -90px; margin: 0; border:none; width: 110px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer;">
                            		                Пошук
                            		            </button>
                            	            </div> 
                            			</div> <!--sectionWrapper_end -->   
                                    </section>
                                </div> <!--btn_dropdown_end -->
                            </div>  <!-- menu_checkbox2_end -->
                            
                            <a>
                            	
                                <div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                <input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_3" value="3" >Всі звернення
                            </a>
                            
                        </div> <!--dropdown_container_end -->
                    </div>                           
                    <!-- MENU №1 END-->    
                
                    <!-- MENU №2 START -->
                    <div>
                        <button class="dropdown-btn" style="border-top: 1.45px solid #eff2f5;"><i style="font-size: 1.6em; color: #40b9d6;" class="material-icons">work</i>
                            <b style="vertical-align: super;">Заявка</b> 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        
                        <div class="dropdown-container">
                            <button style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                            	
                        		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_5" value="5" disabled>Створення заявки для:
                        		<i class="fa fa-caret-down"></i>
                        	</button>
                            
                        	<div class="dropdown-container">
                        		<a style="padding-left: 70px;">
                        			
                        			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			 <input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_6" value="6" >• Підрозділу
                        		</a>
                        
                        		<a style="padding-left: 70px;">
                        			
                        			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			 <input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_7" value="7" >• Замовленя Техніки
                        		</a>
                        
                        		<a style="padding-left: 70px;">
                        			
                        			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			 <input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_8" value="8" >• Замовленя Матеріалів
                        		</a>
                        	</div> <!-- btnDropdown  End -->
                        	
                        	<div>  
                        		<button style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                        			
                        			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_9" value="9">Пошук Заявки
                        			<i class="fa fa-caret-down"></i>
                        		</button>
                
                        		<div class="dropdown-container">
                        			<section style="display: flex; text-align: center;  cursor: auto;">
                        				<div style=" width: 100%;" class="sectionWrapper">  
                        					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                        						<form id="search9"   method="get" class="searchbar" autocomplete="on" role="search">
                        							<input id="input_search_request_value9" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть номер заявки..." value="" tabindex="1" autocomplete="off" maxlength="240" class="f-input js-search-field">
                        						</form>
                        					</div>
                        
                        					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                        						<form id="search9b"  method="get" class="searchbar" autocomplete="on" role="search">
                        							<input id="input_search_phone_value9" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть номер телефону..." value="" tabindex="2" autocomplete="off" maxlength="240" class="f-input js-search-field">
                        						</form>
                        					</div>
                        
                        					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                        						<form class="searchbar" autocomplete="on">
                        							<input id="input_search_pib_value9" style="width: 230px; height: 34px;" type="text" placeholder="  Введіть ПІБ..." value="" tabindex="3" autocomplete="off" maxlength="240" class="f-input">
                        						</form>
                        					</div>
                        
                        					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                        						<form class="searchbar" autocomplete="on">
                        							<input id="input_search_address_value9" style="width: 230px; height: 34px;" type="text" placeholder="  Введіть місце..." value="" tabindex="4" autocomplete="off" maxlength="240" class="f-input">
                        						</form>
                        					</div>
                        					
                        					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                        						<form class="searchbar" autocomplete="on">
                        							<input id="input_search_type_value9" style="width: 230px; height: 34px;" type="text" placeholder="  Введіть тип заявки..." value="" tabindex="4" autocomplete="off" maxlength="240" class="f-input">
                        						</form>
                        					</div>
                        					
                        					<div style="width: 100%; margin-bottom: 10px; margin-top: 10px; padding-left: 43px;">  
                        						<button id="btn_search_appeals9" style="background-color: #adb2b7; position: relative; left: -100px; margin: 0; border: none; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight:bold; color: white; cursor: pointer;">
                        						Пошук 
                        						</button>
                        					</div> 
                        				</div>  <!-- sectionWrapper End -->
                        			</section>
                        		</div>   <!-- btnDropdown  End -->
                            </div>  <!-- menuCheckbox9 End-->
                        	
                        	<a>
                        		
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        	<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_10" value="10" >	Всі заявки
                        	</a>
                        </div> <!--dropdown_container_end -->
                    </div>             
                    <!-- MENU №2 END-->   
                
                    <!-- MENU №3 START -->
                    <div>
                        <button class="dropdown-btn" style="border-top: 1.45px solid #eff2f5;"><i style="font-size: 1.6em; color: #f38800b8;" class="material-icons">assignment_ind</i>
                            <b style="vertical-align: super;">Наряд</b> 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        
                        <div class="dropdown-container">
                            <div>  
                        		<button style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                        			
                        			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_12" value="12">	Пошук Наряда
                        			<i class="fa fa-caret-down"></i>
                        		</button>
                        
                        		<div class="dropdown-container">
                        			<section style="display: flex; text-align: center;  cursor: auto;">
                        				<div style=" width: 100%;" class="sectionWrapper">  
                        					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                        						<form id="search12"   method="get" class="searchbar" autocomplete="on" role="search">
                        							<input id="input_search_number_value12" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть номер наряду..." value="" tabindex="1" autocomplete="off" maxlength="240" class="f-input js-search-field">
                        						</form>
                        					</div>
                        
                        					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                        						<form id="search12b"  method="get" class="searchbar" autocomplete="on" role="search">
                        							<input id="input_search_request_value12" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть номер заявки..." value="" tabindex="2" autocomplete="off" maxlength="240" class="f-input js-search-field">
                        						</form>
                        					</div>
                        
                        					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                        						<form class="searchbar" autocomplete="on">
                        							<input id="input_search_pib_value12" style="width: 230px; height: 34px;" type="text" placeholder="  Введіть ПІБ бригадира..." value="" tabindex="3" autocomplete="off" maxlength="240" class="f-input">
                        						</form>
                        					</div>
                        
                        					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                        						<form class="searchbar" autocomplete="on">
                        							<input id="input_search_address_value12" style="width: 230px; height: 34px;" type="text" placeholder="  Введіть місце..." value="" tabindex="4" autocomplete="off" maxlength="240" class="f-input">
                        						</form>
                        					</div>
                        
                        					<div style="width: 100%; margin-bottom:10px; margin-top: 10px; padding-left: 43px;">  
                        						<button id="btn_search_appeals12" style="background-color: #adb2b7; position: relative; left: -100px; margin: 0; border: none; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer;">
                        							Пошук 
                        						</button>
                        					</div> 
                        				</div>  <!-- sectionWrapper End -->
                        			</section>
                        		</div>   <!-- btnDropdown  End -->
                        	</div> <!-- dropdownMenu12 End-->
                        	
                        	<a>
                        	
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_13" value="13">Наряди підрозділа
                        	</a>
                        	
                        	<a>
                        		
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        	<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_14" value="14">	Всі наряди
                        	</a>
                        </div> <!--dropdown_container_end -->
                    </div>                  
                    <!-- MENU №3 END--> 
                    
                    <!-- MENU №4 START -->
                    <div>
                        <button class="dropdown-btn" style="border-top: 1.45px solid #eff2f5;"><i style="font-size: 1.6em; color: #d654a1d6;" class="material-icons">account_balance_wallet</i> 
                            <b style="vertical-align: super;">Водоканал</b> 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        
                        <div class="dropdown-container">
                            <!-- external wrapper for the content of menu#4 -->
                            
                            <button style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                				
                        		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_16" value="16" disabled>Аварійне обслуговування
                        		<i class="fa fa-caret-down"></i>
                        	</button>
                        	
                        	<div class="dropdown-container">
                               <!-- Підрозділи для Аварійного обслуговування -->
                               <button style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                               		
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_17" value="17" disabled>Мій відділ
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            		<a style="padding-left: 70px;">
                            			
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_18" value="18">	• Календар змін-бригад
                            		</a>
                            
                            		<a style="padding-left: 70px;" >
                            			
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_19" value="19">• Посади
                            		</a>
                            
                            		<a style="padding-left: 70px;">
                            			
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_20" value="20">	• Техніка Підрозділа
                            		</a>
                            		
                            		<a style="padding-left: 70px;">
                            			
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_21" value="21">	• Мій Підрозділ
                            		</a>
                            	</div> <!-- dropdownMenu17:Мій відділ  End -->
                            	
                            	<a style="padding-left: 55px;">
                            		
                            	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_22" value="22">Загальна структура
                            	</a>
                            	
                            	<button style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            	<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_23" value="23" disabled>	Співробітники
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            	    <div>  
                                		<button style="font-size: 0.9em; border-top: none; padding-left: 70px;" class="dropdown-btn">
                                		
                                			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_24" value="24">	• Пошук Співробітника
                                			<i class="fa fa-caret-down"></i>
                                		</button>
                                
                                		<div class="dropdown-container">
                                			<section style="display: flex; text-align: center;  cursor: auto;">
                                				<div style=" width: 100%;" class="sectionWrapper">  
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form id="search24"   method="get" class="searchbar" autocomplete="on" role="search">
                                							<input id="input_search_pib_value24" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть ПІБ..." value="" tabindex="1" autocomplete="off" maxlength="240" class="f-input js-search-field">
                                						</form>
                                					</div>
                                
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form id="search24b"  method="get" class="searchbar" autocomplete="on" role="search">
                                							<input id="input_search_phone_value24" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть номер телефону..." value="" tabindex="2" autocomplete="off" maxlength="240" class="f-input js-search-field">
                                						</form>
                                					</div>
                                
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form class="searchbar" autocomplete="on">
                                							<input id="input_search_position_value24" style="width: 230px; height: 34px;" type="text" placeholder="  Введіть посаду..." value="" tabindex="3" autocomplete="off" maxlength="240" class="f-input">
                                						</form>
                                					</div>
                                                        
                                                    <div style="width: 100%; margin-bottom:10px;  margin-top: 10px; padding-left: 43px;">  
                                						<button id="btn_search_appeals24" style="background-color: #adb2b7; position: relative; left: -100px; margin: 0; border: none; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer;">
                                							Пошук 
                                						</button>
                                					</div> 
                                				</div>  <!-- sectionWrapper End -->
                                			</section>
                                		</div>   <!-- dropdownMenu  End -->
                                	</div> <!-- menuCheckbox24 End--> 
                            
                            		<a style="padding-left: 70px;">
                            			
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_25" value="25">• Загалом
                            		</a>
                                </div> <!-- dropdownMenu  End -->
                                
                                <button style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                                	
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            	<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_26" value="26" disabled>	Парк Техніки (ТЗ)
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            	    <div>  
                                		<button style="font-size: 0.9em; border-top: none; padding-left: 70px;" class="dropdown-btn">
                                			
                                			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_27" value="27">• Пошук транспорту
                                			<i class="fa fa-caret-down"></i>
                                		</button>
                                
                                		<div class="dropdown-container">
                                			<section style="display: flex; text-align: center;  cursor: auto;">
                                				<div style=" width: 100%;" class="sectionWrapper">  
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form id="search27"   method="get" class="searchbar" autocomplete="on" role="search">
                                							<input id="input_search_number_value" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть державний номер..." value="" tabindex="1" autocomplete="off" maxlength="240" class="f-input js-search-field">
                                						</form>
                                					</div>
                                
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form id="search27b"  method="get" class="searchbar" autocomplete="on" role="search">
                                							<input id="input_search_phone_value27" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть тип телефону..." value="" tabindex="2" autocomplete="off" maxlength="240" class="f-input js-search-field">
                                						</form>
                                					</div>
                                                    
                                                    <div style="width: 100%; margin-bottom:10px; margin-top: 10px; padding-left: 43px;">  
                                						<button id="btn_search_appeals27" style="background-color: #adb2b7; position: relative; left: -100px; margin: 0; border: none; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer;">
                                							Пошук 
                                						</button>
                                					</div> 
                                				</div>  <!-- sectionWrapper End -->
                                			</section>
                                		</div>   <!-- dropdownMenu27  End -->
                                	</div> <!-- menuCheckbox26 End--> 
                            
                            		<a style="padding-left: 70px;">
                            			
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_28" value="28">• Загалом
                            		</a>
                                </div> <!-- dropdownMenu  End -->
                            </div> <!-- dropdownMenu16  End -->
                            
                            <!-- Підрозділ2: Каналізаційне обслуговування -->
                            <button style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                            	
                        		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_29" value="29" disabled>Каналізаційне обслуговування
                        		<i class="fa fa-caret-down"></i>
                        	</button>
                        	
                        	<div class="dropdown-container">
                               <!-- Підрозділи для Каналізаційного обслуговування -->
                               <button style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            	<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_30" value="30" disabled>	Мій відділ
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            		<a style="padding-left: 70px;">
                            			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_31" value="31">
                            			• Календар змін-бригад
                            		</a>
                            
                            		<a style="padding-left: 70px;">
                            			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_32" value="32">
                            			• Посади
                            		</a>
                            
                            		<a style="padding-left: 70px;">
                            			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_33" value="33">
                            			• Техніка Підрозділа
                            		</a>
                            		
                            		<a style="padding-left: 70px;">
                            			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_34" value="34">
                            			• Мій Підрозділ
                            		</a>
                            	</div> <!-- dropdownMenu30:Мій відділ  End -->
                            	
                            	<a style="padding-left:55px;">
                            		
                            	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            	<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_35" value="35">	Загальна структура
                            	</a>
                            	
                            	<button style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            	<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_36" value="36" disabled>	Співробітники
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            	    <div>  
                                		<button style="font-size: 0.9em; border-top: none; padding-left: 70px;" class="dropdown-btn">
                                			
                                			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_37" value="37">• Пошук Співробітника
                                			<i class="fa fa-caret-down"></i>
                                		</button>
                                
                                		<div class="dropdown-container">
                                			<section style="display: flex; text-align: center;  cursor: auto;">
                                				<div style=" width: 100%;" class="sectionWrapper">  
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form id="search37"   method="get" class="searchbar" autocomplete="on" role="search">
                                							<input id="input_search_pib_value37" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть ПІБ..." value="" tabindex="1" autocomplete="off" maxlength="240" class="f-input js-search-field">
                                						</form>
                                					</div>
                                
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form id="search37b"  method="get" class="searchbar" autocomplete="on" role="search">
                                							<input id="input_search_phone_value37" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть номер телефону..." value="" tabindex="2" autocomplete="off" maxlength="240" class="f-input js-search-field">
                                						</form>
                                					</div>
                                
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form class="searchbar" autocomplete="on">
                                							<input id="input_search_position_value37" style="width: 230px; height: 34px;" type="text" placeholder="  Введіть посаду..." value="" tabindex="3" autocomplete="off" maxlength="240" class="f-input">
                                						</form>
                                					</div>
                                                        
                                                    <div style="width: 100%; margin-bottom:10px; margin-top: 10px; padding-left: 43px;">  
                                						<button id="btn_search_appeals37" style="background-color: #adb2b7; position: relative; left: -100px; margin: 0; border: none; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer;">
                                							Пошук 
                                						</button>
                                					</div> 
                                				</div>  <!-- sectionWrapper End -->
                                			</section>
                                		</div>   <!-- dropdownMenu37  End -->
                                	</div> <!-- menuCheckbox36 End--> 
                            
                            		<a style="padding-left: 70px;">
                            			
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_38" value="38">	• Загалом
                            		</a>
                                </div> <!-- dropdownMenu  End -->
                                
                                <button style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                                	
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_39" value="39" disabled>Парк Техніки (ТЗ)
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            	    <div>  
                                		<button style="font-size: 0.9em; border-top: none; padding-left: 70px;" class="dropdown-btn">
                                			
                                			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_40" value="40">	• Пошук транспорту
                                			<i class="fa fa-caret-down"></i>
                                		</button>
                                
                                		<div class="dropdown-container">
                                			<section style="display: flex; text-align: center;  cursor: auto;">
                                				<div style=" width: 100%;" class="sectionWrapper">  
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form id="search40"   method="get" class="searchbar" autocomplete="on" role="search">
                                							<input id="input_search_number_value40" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть державний номер..." value="" tabindex="1" autocomplete="off" maxlength="240" class="f-input js-search-field">
                                						</form>
                                					</div>
                                
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form id="search40b"  method="get" class="searchbar" autocomplete="on" role="search">
                                							<input id="input_search_phone_value40" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть тип телефону..." value="" tabindex="2" autocomplete="off" maxlength="240" class="f-input js-search-field">
                                						</form>
                                					</div>
                                                    
                                                    <div style="width: 100%; margin-bottom:10px; margin-top: 10px; padding-left: 43px;">  
                                						<button id="btn_search_appeals40" style="background-color: #adb2b7; position: relative; left: -100px; margin: 0; border: none; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer;">
                                							Пошук 
                                						</button>
                                					</div> 
                                				</div>  <!-- sectionWrapper End -->
                                			</section>
                                		</div>   <!-- dropdownMenu40  End -->
                                	</div> <!-- menuCheckbox39 End--> 
                            
                            		<a style="padding-left: 70px;">
                            			
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_41" value="41">	• Загалом
                            		</a>
                                </div> <!-- dropdownMenu  End -->
                            </div> <!-- dropdownMenu16  End -->
                            
                            <!-- Підрозділ3: Енергетичне обслуговування -->
                            <button style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                            	
                        		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        	<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_42" value="42" disabled>	Енергетичне обслуговування
                        		<i class="fa fa-caret-down"></i>
                        	</button>
                        	
                        	<div class="dropdown-container">
                               <!-- Підрозділи для Енергетичного обслуговування -->
                               <button style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                               		
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_43" value="43" disabled> Мій відділ
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            		<a style="padding-left: 70px;">
                            			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_44" value="44">
                            			• Календар змін-бригад
                            		</a>
                            
                            		<a style="padding-left: 70px;">
                            			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_45" value="45">
                            			• Посади
                            		</a>
                            
                            		<a style="padding-left: 70px;">
                            			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_46" value="46">
                            			• Техніка Підрозділа
                            		</a>
                            		
                            		<a style="padding-left: 70px;">
                            			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_47" value="47">
                            			• Мій Підрозділ
                            		</a>
                            	</div> <!-- dropdownMenu43:Мій відділ  End -->
                            	
                            	<a style="padding-left:55px;">
                            		
                            	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            	<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_48" value="48">	Загальна структура
                            	</a>
                            	
                            	<button style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            	<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_49" value="49" disabled>	Співробітники
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            	    <div>  
                                		<button style="font-size: 0.9em; border-top: none; padding-left: 70px;" class="dropdown-btn">
                                			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_50" value="50">		• Пошук Співробітника
                                			<i class="fa fa-caret-down"></i>
                                		</button>
                                
                                		<div class="dropdown-container">
                                			<section style="display: flex; text-align: center;  cursor: auto;">
                                				<div style=" width: 100%;" class="sectionWrapper">  
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form id="search50"   method="get" class="searchbar" autocomplete="on" role="search">
                                							<input id="input_search_pib_value50" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть ПІБ..." value="" tabindex="1" autocomplete="off" maxlength="240" class="f-input js-search-field">
                                						</form>
                                					</div>
                                
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form id="search50b"  method="get" class="searchbar" autocomplete="on" role="search">
                                							<input id="input_search_phone_value50" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть номер телефону..." value="" tabindex="2" autocomplete="off" maxlength="240" class="f-input js-search-field">
                                						</form>
                                					</div>
                                
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form class="searchbar" autocomplete="on">
                                							<input id="input_search_position_value50" style="width: 230px; height: 34px;" type="text" placeholder="  Введіть посаду..." value="" tabindex="3" autocomplete="off" maxlength="240" class="f-input">
                                						</form>
                                					</div>
                                                        
                                                    <div style="width: 100%; margin-bottom:10px; margin-top: 10px; padding-left: 43px;">  
                                						<button id="btn_search_appeals50" style="background-color: #adb2b7; position: relative; left: -100px; margin: 0; border: none; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer;">
                                							Пошук 
                                						</button>
                                					</div> 
                                				</div>  <!-- sectionWrapper End -->
                                			</section>
                                		</div>   <!-- dropdownMenu50  End -->
                                	</div> <!-- menuCheckbox49 End--> 
                            
                            		<a style="padding-left: 70px;">
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_51" value="51">		• Загалом
                            		</a>
                                </div> <!-- dropdownMenu  End -->
                                
                                <button style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_52" value="52" disabled> Парк Техніки (ТЗ)
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            	    <div>  
                                		<button style="font-size: 0.9em; border-top: none; padding-left: 70px;" class="dropdown-btn">
                                			
                                			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_53" value="53"> • Пошук транспорту
                                			<i class="fa fa-caret-down"></i>
                                		</button>
                                
                                		<div class="dropdown-container">
                                			<section style="display: flex; text-align: center;  cursor: auto;">
                                				<div style=" width: 100%;" class="sectionWrapper">  
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form id="search53"   method="get" class="searchbar" autocomplete="on" role="search">
                                							<input id="input_search_number_value53" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть державний номер..." value="" tabindex="1" autocomplete="off" maxlength="240" class="f-input js-search-field">
                                						</form>
                                					</div>
                                
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form id="search53b"  method="get" class="searchbar" autocomplete="on" role="search">
                                							<input id="input_search_phone_value53" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть тип телефону..." value="" tabindex="2" autocomplete="off" maxlength="240" class="f-input js-search-field">
                                						</form>
                                					</div>
                                                    
                                                    <div style="width: 100%; margin-bottom:10px; margin-top: 10px; padding-left: 43px;">  
                                						<button id="btn_search_appeals53" style="background-color: #adb2b7; position: relative; left: -100px; margin: 0; border: none; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer;">
                                							Пошук 
                                						</button>
                                					</div> 
                                				</div>  <!-- sectionWrapper End -->
                                			</section>
                                		</div>   <!-- dropdownMenu53  End -->
                                	</div> <!-- menuCheckbox52 End--> 
                            
                            		<a style="padding-left: 70px;">
                            		
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_54" value="54">	• Загалом
                            		</a>
                                </div> <!-- dropdownMenu  End -->
                            </div> <!-- dropdownMenu16  End -->
                        </div> <!--dropdown_container_end -->
                    </div>                  
                    <!-- MENU №4 END-->            
                
                    <!-- MENU №5 START -->
                    <div>
                        <button class="dropdown-btn" style="  border-top: 1.45px solid #eff2f5; "><i style ="font-size: 1.6em; color: #7560c7;" class="material-icons">record_voice_over</i> 
                            <b style="vertical-align: super;">Довідники загальні</b> 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        
                        <div class="dropdown-container">
                            <button style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                        	
                        		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_56" value="56" disabled>	Місця
                        		<i class="fa fa-caret-down"></i>
                        	</button>
                        
                        	<div class="dropdown-container">
                        		<div>  
                            		<button style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            			
                            			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_57" value="57">	• Пошук місця
                            			<i class="fa fa-caret-down"></i>
                            		</button>
                            
                            		<div class="dropdown-container">
                            			<section style="display: flex; text-align: center;  cursor: auto;">
                            				<div style=" width: 100%;" class="sectionWrapper">  
                            					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                            						<form id="search57"   method="get" class="searchbar" autocomplete="on" role="search">
                            							<input id="input_search_type_value57" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть тип..." value="" tabindex="1" autocomplete="off" maxlength="240" class="f-input js-search-field">
                            						</form>
                            					</div>
                            
                            					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                            						<form id="search57b"  method="get" class="searchbar" autocomplete="on" role="search">
                            							<input id="input_search_street_value57" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть вулицю..." value="" tabindex="2" autocomplete="off" maxlength="240" class="f-input js-search-field">
                            						</form>
                            					</div>
                            
                            					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                            						<form class="searchbar" autocomplete="on">
                            							<input id="input_search_building_value57" style="width: 230px; height: 34px;" type="text" placeholder="  Введіть будівлю..." value="" tabindex="3" autocomplete="off" maxlength="240" class="f-input">
                            						</form>
                            					</div>
                                            
                                                <div style="width: 100%; margin-bottom:10px;  margin-top: 10px; padding-left: 43px;">  
                            						<button id="btn_search_appeals57" style="background-color: #adb2b7; position: relative; left: -100px; margin: 0; border: none; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer;">
                            							Пошук 
                            						</button>
                            					</div> 
                            				</div>  <!-- sectionWrapper End -->
                            			</section>
                            		</div>   <!-- dropdownMenu57  End -->
                            	</div> <!-- menuCheckbox56 End--> 
                        
                        		<a style="padding-left: 55px;">
                        		
                        			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_58" value="58">	• Загалом
                        		</a>
                        
                        		<a style="padding-left: 55px;">
                        			
                        			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_59" value="59">	• Створити нове месце
                        		</a>
                        	</div> <!-- dropdownMenu  End -->
                        	
                        	<button style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                        	
                        		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_60" value="60" disabled>	Вулиці
                        		<i class="fa fa-caret-down"></i>
                        	</button>
                        
                        	<div class="dropdown-container">
                        		<div>  
                            		<button style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		
                            			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_61" value="61">	 • Пошук Вулиці
                            			<i class="fa fa-caret-down"></i>
                            		</button>
                            
                            		<div class="dropdown-container">
                            			<section style="display: flex; text-align: center;  cursor: auto;">
                            				<div style=" width: 100%;" class="sectionWrapper">  
                            					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                            						<form id="search61" method="get" class="searchbar" autocomplete="on" role="search">
                            							<input id="input_search_street_value61" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть вулицю..." value="" tabindex="1" autocomplete="off" maxlength="240" class="f-input js-search-field">
                            						</form>
                            					</div>
                                                
                                                <div style="width: 100%; margin-bottom:10px; margin-top: 10px; padding-left: 43px;">  
                            						<button id="btn_search_appeals61" style="background-color: #adb2b7; position: relative; left: -100px; margin: 0; border: none; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer;">
                            							Пошук 
                            						</button>
                            					</div> 
                            				</div>  <!-- sectionWrapper End -->
                            			</section>
                            		</div>   <!-- dropdownMenu  End -->
                            	</div> <!-- menuCheckbox61 End-->  
                        
                        		<a style="padding-left: 55px;">
                        		
                        			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_62" value="62">	• Загалом
                        		</a>
                            </div> <!-- dropdownMenu60  End -->
                            
                            <a>
                            	
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        	<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_63" value="63">	Райони
                        	</a>
                        	
                        	<button style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                        		
                        		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        	<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_64" value="64" disabled>	Абоненти
                        		<i class="fa fa-caret-down"></i>
                        	</button>
                        
                        	<div class="dropdown-container">
                        		<button style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            	
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_65" value="65" disabled>	•  Фізичні особи
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            		<div>  
                                		<button style="font-size: 0.9em; border-top: none; padding-left: 70px;" class="dropdown-btn">
                                		
                                			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_66" value="66">	Пошук Особи
                                			<i class="fa fa-caret-down"></i>
                                		</button>
                                
                                		<div class="dropdown-container">
                                			<section style="display: flex; text-align: center;  cursor: auto;">
                                				<div style=" width: 100%;" class="sectionWrapper">  
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form id="search66"  method="get" class="searchbar" autocomplete="on" role="search">
                                							<input id="input_search_pib_value66" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть ПІБ..." value="" tabindex="2" autocomplete="off" maxlength="240" class="f-input js-search-field">
                                						</form>
                                					</div>
                                
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form class="searchbar" autocomplete="on">
                                							<input id="input_search_phone_value66" style="width: 230px; height: 34px;" type="text" placeholder="  Введіть телефон..." value="" tabindex="3" autocomplete="off" maxlength="240" class="f-input">
                                						</form>
                                					</div>
                                
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form class="searchbar" autocomplete="on">
                                							<input id="input_search_place_value66" style="width: 230px; height: 34px;" type="text" placeholder="  Введіть місце..." value="" tabindex="4" autocomplete="off" maxlength="240" class="f-input">
                                						</form>
                                					</div>
                                
                                					<div style="width: 100%; margin-bottom:10px; margin-top: 10px; padding-left: 43px;">  
                                						<button id="btn_search_appeals66" style="background-color: #adb2b7; position: relative; left: -100px; margin: 0; border: none; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer;">
                                							Пошук 
                                						</button>
                                					</div> 
                                				</div>  <!-- sectionWrapper End -->
                                			</section>
                                		</div>   <!-- dropdownMenu  End -->
                                	</div> <!-- menuCheckbox66 End-->    
                            
                            		<a style="padding-left: 70px;">
                            		
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_67" value="67">	Загалом
                            		</a>
                            	</div> <!-- dropdownMenu65  End -->
                                <!--фізочні особи end -->
                                
                        		<a style="padding-left: 55px;">
                        			
                        			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_68" value="68">	• Створити Фіз. особу
                        		</a>
                        		
                        		<button style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            	
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_69" value="69" disabled>	• Юридичні особи
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            		<div>  
                                		<button style="font-size: 0.9em; border-top: none; padding-left: 70px;" class="dropdown-btn">
                                		
                                			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_70" value="70">	Пошук Особи
                                			<i class="fa fa-caret-down"></i>
                                		</button>
                                
                                		<div class="dropdown-container">
                                			<section style="display: flex; text-align: center;  cursor: auto;">
                                				<div style=" width: 100%;" class="sectionWrapper">  
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form id="search70"  method="get" class="searchbar" autocomplete="on" role="search">
                                							<input id="input_search_name_value70" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть назву..." value="" tabindex="2" autocomplete="off" maxlength="240" class="f-input js-search-field">
                                						</form>
                                					</div>
                                
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form class="searchbar" autocomplete="on">
                                							<input id="input_search_phone_value70" style="width: 230px; height: 34px;" type="text" placeholder="  Введіть телефон..." value="" tabindex="3" autocomplete="off" maxlength="240" class="f-input">
                                						</form>
                                					</div>
                                
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form class="searchbar" autocomplete="on">
                                							<input id="input_search_place_value70" style="width: 230px; height: 34px;" type="text" placeholder="  Введіть місце..." value="" tabindex="4" autocomplete="off" maxlength="240" class="f-input">
                                						</form>
                                					</div>
                                
                                					<div style="width: 100%; margin-bottom:10px;  margin-top: 10px; padding-left: 43px;">  
                                						<button id="btn_search_appeals70" style="background-color: #adb2b7; position: relative; left: -100px; margin: 0; border: none; width: 91px; height: 32px; border-radius: 5px; text-align: center; font-size: 14px; font-weight: bold; color: white; cursor: pointer;">
                                							Пошук 
                                						</button>
                                					</div> 
                                				</div>  <!-- sectionWrapper End -->
                                			</section>
                                		</div>   <!-- dropdownMenu  End -->
                                	</div> <!-- menuCheckbox70 End-->    
                            
                            		<a style="padding-left: 70px;">
                            			
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_71" value="71">	Загалом
                            		</a>
                            	</div> <!-- dropdownMenu  End -->
                        		
                        		<!-- юридичні особи end -->
                        		<a style="padding-left: 55px;">
                        			
                        			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_72" value="72">	• Створити Юр. особу
                        		</a>
                        	</div> <!-- dropdownMenu64_Абоненти  End -->
                        </div> <!--dropdown_container_end -->
                    </div>                  
                    <!-- MENU №5 END-->            
                
                    <!-- MENU №6 START -->
                    <div>
                        <button class="dropdown-btn" style="  border-top: 1.45px solid #eff2f5; "><i style ="font-size: 1.6em; color: #cc4b4b;" class="material-icons">import_contacts</i> 
                            <b style="vertical-align: super;">Довідники технічні</b> 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        
                        <div class="dropdown-container">
                            <a>
                        	 	
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        	<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_74" value="74">	Доступи
                        	</a>
                        	
                        	<a>
                        		
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        	<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_75" value="75">	Матеріали
                        	</a>
                        	
                        	<a>
                        		
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_76" value="76"> Типи відключень
                        	</a>
                        	
                        	<a>
                        	
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_77" value="77"> Типи Заявок
                        	</a>
                        	
                        	<a>
                        	
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_78" value="78">	Типи Пов'заних місць
                        	</a>
                        	
                        	<a>
                        		
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        	<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_79" value="79">	Типи Робіт
                        	</a>
                        	
                        	<a>
                        	
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		<input class="menu_checkbox" name="menu_item" type="checkbox" id="menu_checkbox_80" value="80">	Типи Техніки
                        	</a>
                        
                        </div> <!-- dropdownMenuFor73  End -->
                    </div>                  
                    <!-- MENU №6 END-->  
            
            </div>  

                `
        ,
        init: function() {
            let sub1 = this.messageService.subscribe('showUserData', this.showUserData, this);
            this.subscriptions.push(sub1);
            let executeQuery = {
                queryCode: 'accessRights_ListMenu',
                limit: -1,
                parameterValues: [{key: '@UserId', value: ''}]
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        showUserData: function(message) {
            //   debugger;
            document.getElementById('UserId_Value').innerText = message.package.type;
            let executeQuery = {
                queryCode: 'accessRights_ListMenu',
                limit: -1,
                parameterValues: [{key: '@UserId', value: message.package.type}]
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        load: function(data) {
            if (this.param_hiden2 == 0) {
                //  document.getElementById('main_menuUser').classList.add("hid_elem");
                document.getElementById('main_menuUser_load').classList.remove('hid_elem');
                document.getElementById('btn_save_data').disabled = 'true';
                this.param_hiden2 = 1
            } else {
                document.getElementById('main_menuUser_load').classList.add('hid_elem');
                document.getElementById('main_menuUser').classList.remove('hid_elem');
                document.getElementById('btn_save_data').disabled = '';
            }
            console.log('LIST-MENU - ', data);
            // debugger;
            if (this.load_page == 0) {
                let dropdown = document.getElementsByClassName('dropdown-btn');
                let i;
                for (i = 0; i < dropdown.length; i++) {
                    dropdown[i].addEventListener('click', function() {
                        this.classList.toggle('active2');
                        let dropdownContent = this.nextElementSibling;
                        if (dropdownContent.style.display === 'block') {
                            dropdownContent.style.display = 'none';
                        } else {
                            dropdownContent.style.display = 'block';
                        }
                    });
                }
                this.load_page = 1;
            }
            if (data) {
            // debugger;
                for (let i2 = 0; i2 < data.rows.length; i2++) {
                //   debugger;
                    // document.getElementsByClassName('menu_checkbox')
                    if (document.getElementById('menu_checkbox_' + data.rows[i2].values[0])) {
                    //   debugger;
                        if (data.rows[i2].values[3] == 1) {
                            document.getElementById('menu_checkbox_' + data.rows[i2].values[0]).checked = 'true';
                        } else {
                            document.getElementById('menu_checkbox_' + data.rows[i2].values[0]).checked = '';
                        }
                    }
                }
            }
        },
        unsubscribeFromMessages() {
            for(let i = 0; i < this.subscriptions.length; i++) {
                this.subscriptions[i].unsubscribe();
            }
        },
        destroy() {
            this.unsubscribeFromMessages();
        }
    };
}());
