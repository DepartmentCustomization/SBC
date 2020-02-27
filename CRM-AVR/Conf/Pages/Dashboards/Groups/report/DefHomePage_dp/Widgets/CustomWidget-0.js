(function () {
  return {
    title: [],
    hint:  '',
    formatTitle: function() {},
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
                    button[id^="btn_search_appeals"]:hover { 
                        background-color: #7b7e81 !important;
                    }
                    
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
                        background: #eff2f5;
                        color: black;
                    }

                    /* Optional: Style the caret down icon */
                    
                    .fa-caret-down {
                        float: right;
                        padding-right: 8px;
                    }
                    .hid_elem {
                        display: none;
                    }
                </style>
                
                <!-- WRAPPER FOR WHOLE MENU-->
                <div class="sidenav hid_elem" id="main_menu">
                    
                    <!-- MENU №1 START-->
                    <div id="menu_checkbox_1">
                        <button class="dropdown-btn" style="border-top:1.45px solid #eff2f5;"><i style ="font-size: 1.6em; color: #48d640;" class="material-icons">assignment</i> 
                            <b style="vertical-align: super;">Звернення</b> 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        
                        <div class="dropdown-container">
                            <div id="menu_checkbox_2">  
                                <button style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                                    <div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                    Пошук та Реєстрація <i class="fa fa-caret-down"></i>
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
                            
                            <a id="menu_checkbox_3" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Appeals'+`">
                                <div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                Всі звернення
                            </a>
                            
                        </div> <!--dropdown_container_end -->
                    </div>                           
                    <!-- MENU №1 END-->    

                    <!-- MENU №2 START -->
                    <div id="menu_checkbox_4">
                        <button class="dropdown-btn" style="border-top: 1.45px solid #eff2f5;"><i style="font-size: 1.6em; color: #40b9d6;" class="material-icons">work</i>
                            <b style="vertical-align: super;">Заявка</b> 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        
                        <div class="dropdown-container">
                            <button id="menu_checkbox_5" style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                        		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Створення заявки для:
                        		<i class="fa fa-caret-down"></i>
                        	</button>
                            
                        	<div class="dropdown-container">
                        		<a id="menu_checkbox_6" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Claims/add'+`">
                        			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			 • Підрозділу
                        		</a>
                        
                        		<a id="menu_checkbox_7" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Claims/add/params/JTdCJTIyc29ydENvbHVtbnMlMjIlM0ElNUIlN0IlMjJrZXklMjIlM0ElMjJDcmVhdGVkQXQlMjIlMkMlMjJ2YWx1ZSUyMiUzQTElN0QlNUQlMkMlMjJmaWx0ZXJDb2x1bW5zJTIyJTNBJTVCJTdCJTIya2V5JTIyJTNBJTIyQXBwZWFsVHlwZU5hbWUlMjIlMkMlMjJ2YWx1ZSUyMiUzQSU3QiUyMm9wZXJhdGlvbiUyMiUzQTYlMkMlMjJ2YWx1ZXMlMjIlM0ElNUIlMjIldTA0MTcldTA0MzIldTA0MzUldTA0NDAldTA0M0QldTA0MzUldTA0M0QldTA0M0QldTA0NEYlMjAldTA0MzIlMjAldTA0M0UldTA0NDRpJXUwNDQxJTIyJTVEJTdEJTdEJTVEJTdE'+`">
                        			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			 • Замовленя Техніки
                        		</a>
                        
                        		<a id="menu_checkbox_8" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Claims/add/params/JTdCJTIyc29ydENvbHVtbnMlMjIlM0ElNUIlN0IlMjJrZXklMjIlM0ElMjJDcmVhdGVkQXQlMjIlMkMlMjJ2YWx1ZSUyMiUzQTElN0QlNUQlMkMlMjJmaWx0ZXJDb2x1bW5zJTIyJTNBJTVCJTdCJTIya2V5JTIyJTNBJTIyQXBwZWFsVHlwZU5hbWUlMjIlMkMlMjJ2YWx1ZSUyMiUzQSU3QiUyMm9wZXJhdGlvbiUyMiUzQTYlMkMlMjJ2YWx1ZXMlMjIlM0ElNUIlMjIldTA0MTcldTA0MzIldTA0MzUldTA0NDAldTA0M0QldTA0MzUldTA0M0QldTA0M0QldTA0NEYlMjAldTA0MzcldTA0MzAlMjAldTA0NDIldTA0MzUldTA0M0IldTA0MzUldTA0NDQldTA0M0UldTA0M0QldTA0M0UldTA0M0MlMjIlNUQlN0QlN0QlNUQlN0Q'+`">
                        			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			 • Замовленя Матеріалів
                        		</a>
                        		<a id="menu_checkbox_91" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Template'+`">
                        	 	   <div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div> 
                        			 • Заявка із шаблону
                        	    </a>
                        	</div> <!-- btnDropdown  End -->
                        	
                        	<div id="menu_checkbox_9">  
                        		<button style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                        			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			Пошук Заявки
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
                        	
                        	<a id="menu_checkbox_10" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Claims'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Всі заявки
                        	</a>
                        </div> <!--dropdown_container_end -->
                    </div>             
                    <!-- MENU №2 END-->   

                    <!-- MENU №3 START -->
                    <div id="menu_checkbox_11">
                        <button class="dropdown-btn" style="border-top: 1.45px solid #eff2f5;"><i style="font-size: 1.6em; color: #f38800b8;" class="material-icons">assignment_ind</i>
                            <b style="vertical-align: super;">Виїзд</b> 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        
                        <div class="dropdown-container">
                            <div id="menu_checkbox_12">  
                        		<button style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                        			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			Пошук Виїзда
                        			<i class="fa fa-caret-down"></i>
                        		</button>
                        
                        		<div class="dropdown-container">
                        			<section style="display: flex; text-align: center;  cursor: auto;">
                        				<div style=" width: 100%;" class="sectionWrapper">  
                        					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                        						<form id="search12"   method="get" class="searchbar" autocomplete="on" role="search">
                        							<input id="input_search_number_value12" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть номер виїзду..." value="" tabindex="1" autocomplete="off" maxlength="240" class="f-input js-search-field">
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
                        	
                        	<a id="menu_checkbox_13" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Orders'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Виїзди підрозділа
                        	</a>
                        	
                        	<a id="menu_checkbox_14" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Orders'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Всі виїзди
                        	</a>
                        </div> <!--dropdown_container_end -->
                    </div>                  
                    <!-- MENU №3 END--> 
                    
                    <!-- MENU №4 START -->
                    <div id="menu_checkbox_15">
                        <button class="dropdown-btn" style="border-top: 1.45px solid #eff2f5;"><i style="font-size: 1.6em; color: #d654a1d6;" class="material-icons">account_balance_wallet</i> 
                            <b style="vertical-align: super;">Водоканал</b> 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        
                        <div class="dropdown-container">
                            <!-- external wrapper for the content of menu#4 -->
                            
                            <button id="menu_checkbox_16" style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                        		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Водопостачання
                        		<i class="fa fa-caret-down"></i>
                        	</button>
                        	
                        	<div class="dropdown-container">
		                       <!-- Підрозділи для Водопостачання/Аварійного обслуговування -->
		                       <button id="menu_checkbox_17" style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		Мій відділ
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            		<a id="menu_checkbox_18" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Shifts'+`">
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			• Календар змін-бригад
                            		</a>
                            
                            		<a id="menu_checkbox_19" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Shifts'+`">
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			• Посади
                            		</a>
                            
                            		<a id="menu_checkbox_20" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Mechanisms'+`">
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			• Техніка Підрозділа
                            		</a>
                            		
                            		<a id="menu_checkbox_21" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Organizations_WO'+`">
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			• Мій Підрозділ
                            		</a>
                            	</div> <!-- dropdownMenu17:Мій відділ  End -->
                            	
                            	<a id="menu_checkbox_22" style="padding-left: 55px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Organizations_WO'+`">
                            	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		Загальна структура
                            	</a>
                            	
                            	<button id="menu_checkbox_23" style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		Співробітники
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            	    <div id="menu_checkbox_24">  
                                		<button style="font-size: 0.9em; border-top: none; padding-left: 70px;" class="dropdown-btn">
                                			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                			• Пошук Співробітника
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
                            
                            		<a id="menu_checkbox_25" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Shifts'+`">
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			• Загалом
                            		</a>
                                </div> <!-- dropdownMenu  End -->
                                
                                <button id="menu_checkbox_26" style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		Парк Техніки (ТЗ)
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            	    <div id="menu_checkbox_27">  
                                		<button style="font-size: 0.9em; border-top: none; padding-left: 70px;" class="dropdown-btn">
                                			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                			• Пошук транспорту
                                			<i class="fa fa-caret-down"></i>
                                		</button>
                                
                                		<div class="dropdown-container">
                                			<section style="display: flex; text-align: center;  cursor: auto;">
                                				<div style=" width: 100%;" class="sectionWrapper">  
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form id="search27"   method="get" class="searchbar" autocomplete="on" role="search">
                                							<input id="input_search_number_value27" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть державний номер..." value="" tabindex="1" autocomplete="off" maxlength="240" class="f-input js-search-field">
                                						</form>
                                					</div>
                                
                                					<div class="top-bar js-top-bar _fixed _search-open" style="width: 95%; margin-top: 5px;">                 
                                						<form id="search27b"  method="get" class="searchbar" autocomplete="on" role="search">
                                							<input id="input_search_phone_value27" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть тип транспорту..." value="" tabindex="2" autocomplete="off" maxlength="240" class="f-input js-search-field">
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
                            
                            		<a id="menu_checkbox_28" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Mechanisms'+`">
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			• Загалом
                            		</a>
                                </div> <!-- dropdownMenu  End -->
		                    </div> <!-- dropdownMenu16  End -->
		                    
		                    <!-- Підрозділ2: Каналізаційне обслуговування -->
		                    <button id="menu_checkbox_29" style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                        		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Каналізаційне обслуговування
                        		<i class="fa fa-caret-down"></i>
                        	</button>
                        	
                        	<div class="dropdown-container">
		                       <!-- Підрозділи для Каналізаційного обслуговування -->
		                       <button id="menu_checkbox_30" style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		Мій відділ
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            		<a id="menu_checkbox_31" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Shifts'+`">
                            			• Календар змін-бригад
                            		</a>
                            
                            		<a id="menu_checkbox_32" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Shifts'+`">
                            			• Посади
                            		</a>
                            
                            		<a id="menu_checkbox_33" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Mechanisms'+`">
                            			• Техніка Підрозділа
                            		</a>
                            		
                            		<a id="menu_checkbox_34" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Organizations_WO'+`">
                            			• Мій Підрозділ
                            		</a>
                            	</div> <!-- dropdownMenu30:Мій відділ  End -->
                            	
                            	<a id="menu_checkbox_35" style="padding-left:55px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Organizations_WO'+`">
                            	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		Загальна структура
                            	</a>
                            	
                            	<button id="menu_checkbox_36" style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		Співробітники
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            	    <div id="menu_checkbox_37">  
                                		<button style="font-size: 0.9em; border-top: none; padding-left: 70px;" class="dropdown-btn">
                                			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                			• Пошук Співробітника
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
                            
                            		<a id="menu_checkbox_38" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Shifts'+`">
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			• Загалом
                            		</a>
                                </div> <!-- dropdownMenu  End -->
                                
                                <button id="menu_checkbox_39" style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		Парк Техніки (ТЗ)
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            	    <div id="menu_checkbox_40">  
                                		<button style="font-size: 0.9em; border-top: none; padding-left: 70px;" class="dropdown-btn">
                                			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                			• Пошук транспорту
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
                                							<input id="input_search_phone_value40" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть тип транспорту..." value="" tabindex="2" autocomplete="off" maxlength="240" class="f-input js-search-field">
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
                            
                            		<a id="menu_checkbox_41" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Mechanisms'+`">
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			• Загалом
                            		</a>
                                </div> <!-- dropdownMenu  End -->
		                    </div> <!-- dropdownMenu16  End -->
		                    
		                    <!-- Підрозділ3: Енергетичне обслуговування -->
		                    <button id="menu_checkbox_42" style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                        		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Енергетичне обслуговування
                        		<i class="fa fa-caret-down"></i>
                        	</button>
                        	
                        	<div class="dropdown-container">
		                       <!-- Підрозділи для Енергетичного обслуговування -->
		                       <button id="menu_checkbox_43" style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		Мій відділ
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            		<a id="menu_checkbox_44" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Shifts'+`">
                            			• Календар змін-бригад
                            		</a>
                            
                            		<a id="menu_checkbox_45" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Shifts'+`">
                            			• Посади
                            		</a>
                            
                            		<a id="menu_checkbox_46" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Mechanisms'+`">
                            			• Техніка Підрозділа
                            		</a>
                            		
                            		<a id="menu_checkbox_47" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Organizations_WO'+`">
                            			• Мій Підрозділ
                            		</a>
                            	</div> <!-- dropdownMenu43:Мій відділ  End -->
                            	
                            	<a id="menu_checkbox_48" style="padding-left:55px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Organizations_WO'+`">
                            	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		Загальна структура
                            	</a>
                            	
                            	<button id="menu_checkbox_49" style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		Співробітники
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            	    <div id="menu_checkbox_50">  
                                		<button style="font-size: 0.9em; border-top: none; padding-left: 70px;" class="dropdown-btn">
                                			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                			• Пошук Співробітника
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
                            
                            		<a id="menu_checkbox_51" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Shifts'+`">
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			• Загалом
                            		</a>
                                </div> <!-- dropdownMenu  End -->
                                
                                <button id="menu_checkbox_52" style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		Парк Техніки (ТЗ)
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            	    <div id="menu_checkbox_53">  
                                		<button style="font-size: 0.9em; border-top: none; padding-left: 70px;" class="dropdown-btn">
                                			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                			• Пошук транспорту
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
                                							<input id="input_search_phone_value53" style="width: 230px; height: 34px;" name="q" type="text" placeholder="  Введіть тип транспорту..." value="" tabindex="2" autocomplete="off" maxlength="240" class="f-input js-search-field">
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
                            
                            		<a id="menu_checkbox_54" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Mechanisms'+`">
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			• Загалом
                            		</a>
                                </div> <!-- dropdownMenu  End -->
		                    </div> <!-- dropdownMenu16  End -->
		                    <!-- ПідрозділX: Артезіанська вода-->
    	                    <button id="menu_checkbox_хх" style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                        		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Артезіанська вода
                        		<!-- <i class="fa fa-caret-down"></i> -->
                        	</button>
                        	<!-- Артезіанська вода: End-->
		                    
                        </div> <!--dropdown_container_end -->
                        
                        
                    </div> 
                    
                    
                    <!-- MENU №4 END-->            

                    <!-- MENU №5 START -->
                    <div id="menu_checkbox_55">
                        <button class="dropdown-btn" style="  border-top: 1.45px solid #eff2f5; "><i style ="font-size: 1.6em; color: #7560c7;" class="material-icons">record_voice_over</i> 
                            <b style="vertical-align: super;">Довідники загальні</b> 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        
                        <div class="dropdown-container">
                            <button id="menu_checkbox_56" style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                        		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Місця
                        		<i class="fa fa-caret-down"></i>
                        	</button>
                        
                        	<div class="dropdown-container">
                        		<div id="menu_checkbox_57">  
                            		<button style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			• Пошук місця
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
                        
                        		<a id="menu_checkbox_58" style="padding-left: 55px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Places'+`">
                        			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			• Загалом
                        		</a>
                        
                        		<a id="menu_checkbox_59" style="padding-left: 55px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Places/add'+`">
                        			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			• Створити нове месце
                        		</a>
                        	</div> <!-- dropdownMenu  End -->
                        	
                        	<button id="menu_checkbox_60" style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                        		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Вулиці
                        		<i class="fa fa-caret-down"></i>
                        	</button>
                        
                        	<div class="dropdown-container">
                        		<div id="menu_checkbox_61">  
                            		<button style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			 • Пошук Вулиці
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
                        
                        		<a id="menu_checkbox_62" style="padding-left: 55px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Streets'+`">
                        			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			• Загалом
                        		</a>
                            </div> <!-- dropdownMenu60  End -->
                            
                            <a id="menu_checkbox_63" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Shifts'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Райони
                        	</a>
                        	
                        	<button id="menu_checkbox_64" style="font-size: 0.9em; border-top: none; padding-left: 40px;" class="dropdown-btn">
                        		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Абоненти
                        		<i class="fa fa-caret-down"></i>
                        	</button>
                        
                        	<div class="dropdown-container">
                        		<button id="menu_checkbox_65" style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		•  Фізичні особи
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            		<div id="menu_checkbox_66">  
                                		<button style="font-size: 0.9em; border-top: none; padding-left: 70px;" class="dropdown-btn">
                                			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                			Пошук Особи
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
                            
                            		<a id="menu_checkbox_67" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Contact'+`">
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			Загалом
                            		</a>
                            	</div> <!-- dropdownMenu65  End -->
                                <!--фізочні особи end -->
                                
                        		<a id="menu_checkbox_68" style="padding-left: 55px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Contact/add'+`">
                        			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			• Створити Фіз. особу
                        		</a>
                        		
                        		<button id="menu_checkbox_69" style="font-size: 0.9em; border-top: none; padding-left: 55px;" class="dropdown-btn">
                            		<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            		• Юридичні особи
                            		<i class="fa fa-caret-down"></i>
                            	</button>
                            
                            	<div class="dropdown-container">
                            		<div id="menu_checkbox_70">  
                                		<button style="font-size: 0.9em; border-top: none; padding-left: 70px;" class="dropdown-btn">
                                			<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                                			Пошук Особи
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
                            
                            		<a id="menu_checkbox_71" style="padding-left: 70px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Contact'+`">
                            			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                            			Загалом
                            		</a>
                            	</div> <!-- dropdownMenu  End -->
                        		
                        		<!-- юридичні особи end -->
                        		<a id="menu_checkbox_72" style="padding-left: 55px;" href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Contact/add'+`">
                        			<div class="border-line" style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 90%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        			• Створити Юр. особу
                        		</a>
                        	</div> <!-- dropdownMenu64_Абоненти  End -->
                        </div> <!--dropdown_container_end -->
                    </div>                  
                    <!-- MENU №5 END-->            

                    <!-- MENU №6 START -->
                    <div id="menu_checkbox_73">
                        <button class="dropdown-btn" style="  border-top: 1.45px solid #eff2f5; "><i style ="font-size: 1.6em; color: #cc4b4b;" class="material-icons">import_contacts</i> 
                            <b style="vertical-align: super;">Довідники технічні</b> 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        
                        <div class="dropdown-container">
                            <a id="menu_checkbox_74"  href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Shifts'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Доступи
                        	</a>
                        	
                        	<a id="menu_checkbox_75"  href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Materials'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Матеріали
                        	</a>
                        	
                        	<a id="menu_checkbox_76"  href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/SwitchOff_types'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Типи відключень
                        	</a>
                        	
                        	<a id="menu_checkbox_77"  href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Claim_types'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Типи Заявок
                        	</a>
                        	
                        	<a id="menu_checkbox_78"  href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Type_PP_link'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Типи Пов'заних місць
                        	</a>
                        	
                        	<a id="menu_checkbox_79"  href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Action_types'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Типи Робіт
                        	</a>
                        	
                        	<a id="menu_checkbox_80"  href="`+location.origin + localStorage.getItem('VirtualPath')+'/sections/Mechanism_types'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Типи Техніки
                        	</a>
                        
                        </div> <!-- dropdownMenuFor73  End -->
                    </div>                  
                    <!-- MENU №6 END-->  
                    
                    <!-- MENU №7 START -->
                    <div id="menu_checkbox_81">
                        <button class="dropdown-btn" style="  border-top: 1.45px solid #eff2f5; "><i style ="font-size: 1.6em; color: #cc4b4b;" class="material-icons">dvr</i> 
                            <b style="vertical-align: super;">Звітність</b> 
                            <i class="fa fa-caret-down"></i>
                        </button>
                        
                        <div class="dropdown-container">
                            <a id="menu_checkbox_82"  href="`+location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/ReportClaims'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Вільна форма пошуку
                        	</a>
                        	
                        	<a id="menu_checkbox_83"  href="`+location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/Current_status_claims'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Поточний стан заявок
                        	</a>
                        	
                        	<a id="menu_checkbox_84"  href="`+location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/AVR_teamsTime'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Відпрацьований час бригадами 
                        	</a>
                        	
                        	<a id="menu_checkbox_85"  href="`+location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/AVR_Time_Spiv'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Відпрацьований час співробітників
                        	</a>
                        	
                        	<a id="menu_checkbox_86"  href="`+location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/AVR_allClaims'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Довідка по всіх работах в заявках
                        	</a>
                        	
                        	<a id="menu_checkbox_87"  href="`+location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/AVR_materialsGeneral'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		* Довідка по залученим матеріалам
                        	</a>
                        	
                        	<a id="menu_checkbox_88"  href="`+location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/AVR_damageCounting'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		* Відомість обліку пошкоджень
                        	</a>
                        	
                        	<a id="menu_checkbox_89"  href="`+location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/AVR_requestsClosing'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		Порівняльна довідка по закриттю заявок
                        	</a>
                        	
                        	<a id="menu_checkbox_90"  href="`+location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/AVR_generalTech'+`">
                        	 	<div style="height: 1px; border-top: 1px dotted #dfe3e7; position: relative; width: 100%; height: 1.1px; right: 10px; margin-top: -10px; padding-top: 6px;"></div>
                        		* Довідка по техниці
                        	</a>
                        
                        
                        </div> <!-- dropdownMenuFor81  End -->
                    </div>                  
                    <!-- MENU №7 END--> 
                    
                      <!-- last menu_checkbox_91 -->

                `
    ,
    init: function() {
        let executeQuery = {
            queryCode: 'UserLeftMenu',
            limit: -1,
            parameterValues: []
        };
        this.queryExecutor(executeQuery, this.load, this);
    },
    load: function(data) {
        // debugger;
        
        var dropdown = document.getElementsByClassName("dropdown-btn");
        var i;
        
        for (i = 0; i < dropdown.length; i++) {
          dropdown[i].addEventListener("click", function() {
            this.classList.toggle("active2");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
              dropdownContent.style.display = "none";
            } else {
              dropdownContent.style.display = "block";
            }
          });
        };


        btn_search_appeals2.addEventListener("click", function() {
            // Сформировать объект с настройками
            // let obj = {
            //         "sortColumns": [{
            //             "key": "Date",
            //             "value": 1
            //         }],
            //         "filterColumns": [{
            //             "key": "Number",
            //             "value": {
            //                 "operation": 6,
            //                 "values": [document.getElementById('input_search_phone_value2').value]
            //             }
            //         },
            //         {
            //             "key": "Name",
            //             "value": {
            //                 "operation": 6,
            //                 "values": [document.getElementById('input_search_pib_value2').value]
            //             }
            //         },
            //         {
            //             "key": "ObjectName",
            //             "value": {
            //                 "operation": 6,
            //                 "values": [document.getElementById('input_search_address_value2').value]
            //             }
            //         },
            //         {
            //             "key": "Description",
            //             "value": {
            //                 "operation": 6,
            //                 "values": [document.getElementById('input_search_text_value2').value]
            //             }
            //         }
            //         ]
            //     };

            // // Получить сериализированный объект
            // let str = JSON.stringify(obj);
             
            // // Получить строку base64
            // let base64Str = str.encodeBase64();
            // window.location=location.origin + localStorage.getItem('VirtualPath')+'/sections/Appeals/params/'+base64Str;
            
            window.location=location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/PageClaims?par1='+document.getElementById('input_search_pib_value2').value+'&par2='+document.getElementById('input_search_phone_value2').value+'&par3='+document.getElementById('input_search_address_value2').value+'&par4='+document.getElementById('input_search_text_value2').value
         });


    
     btn_search_appeals9.addEventListener("click", function() {
            // Сформировать объект с настройками
            let obj = {
                    "sortColumns": [{
                        "key": "Created_at",
                        "value": 1
                    }],
                    "filterColumns": [{
                        "key": "Claim_Number",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_request_value9').value]
                        }
                    },
                    {
                        "key": "ContactPhone",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_phone_value9').value]
                        }
                    },
                    {
                        "key": "ContactPIB",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_pib_value9').value]
                        }
                    },
                    {
                        "key": "Adress",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_address_value9').value]
                        }
                    },
                    {
                        "key": "Types_name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_type_value9').value]
                        }
                    }
                    ]
                };

            // Получить сериализированный объект
            let str = JSON.stringify(obj);
             
            // Получить строку base64
            let base64Str = str.encodeBase64();
            window.location=location.origin + localStorage.getItem('VirtualPath')+'/sections/Claims/params/'+base64Str;
         });



    
     btn_search_appeals12.addEventListener("click", function() {
            // Сформировать объект с настройками
            let obj = {
                    "sortColumns": [{
                        "key": "Created_at",
                        "value": 1
                    }],
                    "filterColumns": [{
                        "key": "Id",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_number_value12').value]
                        }
                    },
                    {
                        "key": "Claim_Number",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_request_value12').value]
                        }
                    },
                    {
                        "key": "shifts_name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_pib_value12').value]
                        }
                    },
                    {
                        "key": "organization_name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_address_value12').value]
                        }
                    }
                    ]
                };

            // Получить сериализированный объект
            let str = JSON.stringify(obj);
             
            // Получить строку base64
            let base64Str = str.encodeBase64();
            window.location=location.origin + localStorage.getItem('VirtualPath')+'/sections/Orders/params/'+base64Str;
         });




  
  btn_search_appeals24.addEventListener("click", function() {
            // Сформировать объект с настройками
            let obj = {
                    "sortColumns": [{
                        "key": "Created_at",
                        "value": 1
                    }],
                    "filterColumns": [{
                        "key": "contacts_name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_pib_value24').value]
                        }
                    },
                    {
                        "key": "Number",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_phone_value24').value]
                        }
                    },
                    {
                        "key": "jobs_name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_position_value24').value]
                        }
                    }
                    ]
                };

            // Получить сериализированный объект
            let str = JSON.stringify(obj);
             
            // Получить строку base64
            let base64Str = str.encodeBase64();
            window.location=location.origin + localStorage.getItem('VirtualPath')+'/sections/Contacts_WS/params/'+base64Str;
         });
   
   
    btn_search_appeals37.addEventListener("click", function() {
            // Сформировать объект с настройками
            let obj = {
                    "sortColumns": [{
                        "key": "Created_at",
                        "value": 1
                    }],
                    "filterColumns": [{
                        "key": "contacts_name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_pib_value37').value]
                        }
                    },
                    {
                        "key": "Number",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_phone_value37').value]
                        }
                    },
                    {
                        "key": "jobs_name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_position_value37').value]
                        }
                    }
                    ]
                };

            // Получить сериализированный объект
            let str = JSON.stringify(obj);
             
            // Получить строку base64
            let base64Str = str.encodeBase64();
            window.location=location.origin + localStorage.getItem('VirtualPath')+'/sections/Contacts_WS/params/'+base64Str;
         });
         
         
     btn_search_appeals50.addEventListener("click", function() {
            // Сформировать объект с настройками
            let obj = {
                    "sortColumns": [{
                        "key": "Created_at",
                        "value": 1
                    }],
                    "filterColumns": [{
                        "key": "contacts_name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_pib_value50').value]
                        }
                    },
                    {
                        "key": "Number",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_phone_value50').value]
                        }
                    },
                    {
                        "key": "jobs_name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_position_value50').value]
                        }
                    }
                    ]
                };

            // Получить сериализированный объект
            let str = JSON.stringify(obj);
             
            // Получить строку base64
            let base64Str = str.encodeBase64();
            window.location=location.origin + localStorage.getItem('VirtualPath')+'/sections/Contacts_WS/params/'+base64Str;
         });


         
         
     btn_search_appeals27.addEventListener("click", function() {
            // Сформировать объект с настройками
            let obj = {
                    "sortColumns": [{
                        "key": "Created_at",
                        "value": 1
                    }],
                    "filterColumns": [{
                        "key": "mechanisms_number",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_number_value27').value]
                        }
                    },
                    {
                        "key": "mechanism_types_name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_phone_value27').value]
                        }
                    }
                    ]
                };

            // Получить сериализированный объект
            let str = JSON.stringify(obj);
             
            // Получить строку base64
            let base64Str = str.encodeBase64();
            window.location=location.origin + localStorage.getItem('VirtualPath')+'/sections/Mechanisms/params/'+base64Str;
         });
         
         
             btn_search_appeals40.addEventListener("click", function() {
            // Сформировать объект с настройками
            let obj = {
                    "sortColumns": [{
                        "key": "Created_at",
                        "value": 1
                    }],
                    "filterColumns": [{
                        "key": "mechanisms_number",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_number_value40').value]
                        }
                    },
                    {
                        "key": "mechanism_types_name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_phone_value40').value]
                        }
                    }
                    ]
                };

            // Получить сериализированный объект
            let str = JSON.stringify(obj);
             
            // Получить строку base64
            let base64Str = str.encodeBase64();
            window.location=location.origin + localStorage.getItem('VirtualPath')+'/sections/Mechanisms/params/'+base64Str;
         }); 


           btn_search_appeals53.addEventListener("click", function() {
            // Сформировать объект с настройками
            let obj = {
                    "sortColumns": [{
                        "key": "Created_at",
                        "value": 1
                    }],
                    "filterColumns": [{
                        "key": "mechanisms_number",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_number_value53').value]
                        }
                    },
                    {
                        "key": "mechanism_types_name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_phone_value53').value]
                        }
                    }
                    ]
                };

            // Получить сериализированный объект
            let str = JSON.stringify(obj);
             
            // Получить строку base64
            let base64Str = str.encodeBase64();
            window.location=location.origin + localStorage.getItem('VirtualPath')+'/sections/Mechanisms/params/'+base64Str;
         });          
         
         
             btn_search_appeals57.addEventListener("click", function() {
            // Сформировать объект с настройками
            let obj = {
                    "sortColumns": [{
                        "key": "Created_at",
                        "value": 1
                    }],
                    "filterColumns": [{
                        "key": "place_types_name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_type_value57').value]
                        }
                    },
                    {
                        "key": "streets_name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_street_value57').value]
                        }
                    },
                    {
                        "key": "places_name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_building_value57').value]
                        }
                    }
                    ]
                };

            // Получить сериализированный объект
            let str = JSON.stringify(obj);
             
            // Получить строку base64
            let base64Str = str.encodeBase64();
            window.location=location.origin + localStorage.getItem('VirtualPath')+'/sections/Places/params/'+base64Str;
         });         
           
 
             btn_search_appeals61.addEventListener("click", function() {
            // Сформировать объект с настройками
            let obj = {
                    "sortColumns": [{
                        "key": "Created_at",
                        "value": 1
                    }],
                    "filterColumns": [{
                        "key": "Name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_street_value61').value]
                        }
                    }
                    ]
                };

            // Получить сериализированный объект
            let str = JSON.stringify(obj);
             
            // Получить строку base64
            let base64Str = str.encodeBase64();
            window.location=location.origin + localStorage.getItem('VirtualPath')+'/sections/Streets/params/'+base64Str;
         });  
 
   
   
            btn_search_appeals70.addEventListener("click", function() {
            // Сформировать объект с настройками
            let obj = {
                    "sortColumns": [{
                        "key": "Created_at",
                        "value": 1
                    }],
                    "filterColumns": [{
                        "key": "organizations_name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_name_value70').value]
                        }
                    },
                    {
                        "key": "Number",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_phone_value70').value]
                        }
                    },
                    {
                        "key": "adress",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_place_value70').value]
                        }
                    }
                    ]
                };

            // Получить сериализированный объект
            let str = JSON.stringify(obj);
             
            // Получить строку base64
            let base64Str = str.encodeBase64();
            window.location=location.origin + localStorage.getItem('VirtualPath')+'/sections/Organizations_UR/params/'+base64Str;
         });      
   
   
   
           btn_search_appeals66.addEventListener("click", function() {
            // Сформировать объект с настройками
            let obj = {
                    "sortColumns": [{
                        "key": "Created_at",
                        "value": 1
                    }],
                    "filterColumns": [{
                        "key": "Name",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_pib_value66').value]
                        }
                    },
                    {
                        "key": "Number",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_phone_value66').value]
                        }
                    },
                    {
                        "key": "adress",
                        "value": {
                            "operation": 6,
                            "values": [document.getElementById('input_search_place_value66').value]
                        }
                    }
                    ]
                };

            // Получить сериализированный объект
            let str = JSON.stringify(obj);
             
            // Получить строку base64
            let base64Str = str.encodeBase64();
            window.location=location.origin + localStorage.getItem('VirtualPath')+'/sections/Contact/params/'+base64Str;
         });    
         
         
        // console.log(data);
        if (data) {
            // debugger;
            for (var i2=0;i2<data.rows.length;i2++){
                //   debugger;
            // document.getElementsByClassName('menu_checkbox')
                if (document.getElementById('menu_checkbox_'+data.rows[i2].values[0]))
                {
                    // console.log(document.getElementById('menu_checkbox_'+data.rows[i2].values[0]));
                // document.getElementById('menu_checkbox_'+data.rows[i2].values[0]).classList.add("hid_elem");
                document.getElementById('menu_checkbox_'+data.rows[i2].values[0]).style.display = "none";
                    };
                };
            };
    
        document.getElementById('main_menu').classList.remove("hid_elem"); 
    }
};
}());
