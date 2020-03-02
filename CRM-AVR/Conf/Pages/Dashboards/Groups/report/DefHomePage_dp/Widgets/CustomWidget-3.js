(function() {
    return {
        title: [],
        hint: '',
        formatTitle: function() {},
        subscriptions: [],
        customConfig:
                `
                
                <style>
                
                
                
  #top {
    background: #eee;
    border-bottom: 1px solid #ddd;
    padding: 0 10px;
    line-height: 40px;
    font-size: 12px;
  }

  #calendar {
   /* max-width: 900px;
    margin: 40px auto;*/
    padding: 0 10px;
    position: sticky;
  }
                
       
                .display_none {
                    display: none;
                }  
                
                
                .red-label{
                          border-left: 9px solid #ff5e5e;
                }
               
                .ticket {
                     margin-top: 10px;
                    flex-direction: row;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                }
              
   
            .firstBlock{
                margin-bottom: 2em;
            }
            .mainBlockForCard{
                min-height: 20vh;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 31%;
            }
            
            .mainBlockForCard_Rows{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 100%;
            }
            
            .bottomBodyRightSide{
                font-weight: bold;
                
            }
            .bottomHeaderTextItem, .bottomBodyTextItem{
                margin-left: 1vh;
            }
            .topHeaderDivItem{
                display: flex;
                justify-content: space-between;
                margin-bottom: 1em;
            }
            .bottomBodyDivItem{
                 margin-bottom: 1em;
            }
            .topFooterDivItem, .bottomFooterLeftSpanBottomItem, .bottomFooterRightSpanBottomItem{
                font-weight: bold;
            }
            .bottomFooterLeftSpanBottomItem, .bottomFooterRightSpanBottomItem{
                margin-bottom: 0.7vh;
                font-size: 1.4vh;
            }
            .bottomHeaderDivItem{
                margin-bottom: 1vh;
            }
            .bottomBodyDivItem{
                    display: flex;
                    justify-content: space-between;
            }
            .bottomFooterDivItem{
                    display: flex;
                    justify-content: space-between;
            }
            .bottomFooterLefItem{
                    display: flex;
                     flex-direction: column;
                     float: right;
            }   
            .bottomFooterRightItem{
                    display: flex;
                    flex-direction: column;
                    margin-left: 0.8em;
            }
            .bottomBodyLeftSide, .bottomBodyRightSide, .bottomHeaderDivItem{
                    align-items: center;
                    display: flex;
            }
            .mainBlockForCard{
                    border-bottom: 1px solid #cecece;
                    border-left: 1px solid #cecece;
                    border-right: 1px solid #cecece;
                    border-radius: 5px;
                    font-family: sans-serif;
                    margin: 9px;
            }
            .nameProj, .bottomFooterLeftSpanTopItem, .bottomFooterRightSpanTopItem{
                color: #a7a7a7;
                font-size: 1.6vh;
            }
             .nameProj{
                 margin-left: 1vh;
             }
            .secondBlock{
                margin: 1em;
            }
            .topFooterDivItem{
                margin: 0px 1em;
            }
            .topHeaderDivItem{
                margin-top: 1vh;
            }
            
            .logoSpanHeader{
                cursor: pointer;
            }
            .logoSpanHeader>i{
                padding-right: 0.6em;
                font-size: 1em;
                color: white;
                    margin-top: 4px;
                    margin-left: 4px;
            }
     
            .logoSpanHeader.typeOrange{
                background: #fdbc49;
                    height: 25px;
            }
             .logoSpanHeader.typeGreen{
                background: #53d77f;
                    height: 25px;
            }
             .logoSpanHeader.typeRed{
                background: #ff4e4e;
                    height: 25px;
            }
             .logoSpanHeader.typeBlack{
                background: #000000;
                    height: 25px;
            }
            .material-icons.person{
                    background: #848484;
                    padding: 0.2vh;
                    border-radius: 50%;
                    color: white;
            }
            
            .bottomBodyRightSide.typeOrange{
                color: #fdbc49;
            }
             .bottomBodyRightSide.typeGreen{
                color: #53d77f;
            }
             .bottomBodyRightSide.typeRed{
                color: #ff5e5e;
            }
            
             .mainBlockForCard.typeOrange{
                 border-top: 4px solid #fdbc49;
            }
             .mainBlockForCard.typeGreen{
               border-top: 4px solid #53d77f;
            }
             .mainBlockForCard.typeRed{
                border-top: 4px solid #ff5e5e;
            }
             .mainBlockForCard.typeBlack{
                border-top: 4px solid #000000;
            }
     
     
            .mainBlockForCard_Rows.typeOrange{
                 border-top: 4px solid #fdbc49;
            }
             .mainBlockForCard_Rows.typeGreen{
               border-top: 4px solid #53d77f;
            }
             .mainBlockForCard_Rows.typeRed{
                border-top: 4px solid #ff5e5e;
            }
              .mainBlockForCard_Rows.typeBlack{
                border-top: 4px solid #000000;
            }
            
     
     
     .logo_avatar{
         width: 27px;    
         height: 27px;    
         border-radius: 50%;
     }
     
                </style>
                
    
                        
    <div class="ticket"></div>
  


  <div id='top' class="display_none">

    Locales:
    <select id='locale-selector'></select>

  </div>
  <div id='calendar'>
  
  </div>


                `
        ,
        sub2: {},
        sub3: {},
        sub4: {},
        sub5: {},
        sub6: {},
        init: function() {
        //  <span id="myTarget3_1" style='color: #000000; font-size: 1.5em; display: block; align-items: right; text-align: right;'>sdfsd </span>
            this.sub2 = this.messageService.subscribe('showCalendar', this.getViewCard, this);
            this.subscriptions.push(this.sub2);
            this.sub3 = this.messageService.subscribe('showMap', this.getViewCard, this);
            this.subscriptions.push(this.sub3);
            this.sub4 = this.messageService.subscribe('showTaskTable', this.getViewCard, this);
            this.subscriptions.push(this.sub4);
            this.sub5 = this.messageService.subscribe('showTaskRow', this.getViewCard, this);
            this.subscriptions.push(this.sub5);
            let executeQuery = {
                queryCode: 'ARM_Menu_TaskList_CurrenUser',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQuery, this.load, this);
            let executeQuery2 = {
                queryCode: 'GetOrg_UserSystem',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQuery2, this.getOrg_SystemUser, this);
            // Create the tooltips only when document ready
            //  $(document).ready(function()
            //  {
            //      // MAKE SURE YOUR SELECTOR MATCHES SOMETHING IN YOUR HTML!!!
            //      $('a').each(function() {
            //          $(this).qtip({
            //             content: {
            //                 text: function(event, api) {
            //                     $.ajax({
            //                         url: api.elements.target.attr('href') // Use href attribute as URL
            //                     })
            //                     .then(function(content) {
            //                         // Set the tooltip content upon successful retrieval
            //                         api.set('content.text', content);
            //                     }, function(xhr, status, error) {
            //                         // Upon failure... set the tooltip content to error
            //                         api.set('content.text', status + ': ' + error);
            //                     });
            //                     return 'Loading...'; // Set some initial text
            //                 }
            //             },
            //             position: {
            //                 viewport: $(window)
            //             },
            //             style: 'qtip-wiki'
            //          });
            //      });
            //  });
        },
        sub1: {},
        location_obj: '',
        location_ico_obj: '',
        datestart_obj: '',
        bottomBodyIconItem: '',
        dateend_obj: '',
        datestart_value_obj: '',
        dateend_value_obj: '',
        load: function(data) {
            function func() {
                function addScript(src) {
                    let script = document.createElement('script');
                    script.src = src;
                    script.async = false; // чтобы гарантировать порядок
                    document.head.appendChild(script);
                }
                document.querySelector('head').innerHTML += '<link href="fullcalendar/fullcalendar.min.css" rel="stylesheet" />';
                document.querySelector('head').innerHTML += '<link href="fullcalendar/fullcalendar.print.min.css" rel="stylesheet" media="print" />';
                addScript('fullcalendar/lib/moment.min.js');
                addScript('fullcalendar/lib/jquery.min.js');
                addScript('fullcalendar/fullcalendar.min.js');
                addScript('fullcalendar/locale-all.js');
            }
            setTimeout(func, 100);
            console.log(data);
            let arrayOfTypes = ['typeOrange','typeGreen', 'typeRed', 'typeBlack'];
            //   var sub1 = this.messageService.subscribe('showTask', this.showTask, this);
            //   var sub2 = this.messageService.subscribe('showCalendar', this.showCalendar, this);
            //   var sub3 = this.messageService.subscribe('showMap', this.showMap, this);
            this.sub1 = this.messageService.subscribe('sendTypeOfCard', this.getTypeOfCard, this);
            this.subscriptions.push(this.sub1);
            //   this.subscriptions.push(sub2);
            //   this.subscriptions.push(sub3);;
            if (data) {
                for(let i = 0; i < data.rows.length; i++) {
                    //let rand = data.rows[i].values[5];//Math.floor(Math.random() * arrayOfTypes.length); //'typeOrange'
                    let rand = Math.floor(Math.random() * arrayOfTypes.length); //'typeOrange'
                    if (data.rows[i].values[3] == null) {
                        this.location_obj = '';
                        this.location_ico_obj = '';
                    } else {
                        this.location_obj = data.rows[i].values[3];
                        this.location_ico_obj = 'location_on';
                    }
                    if (data.rows[i].values[9] == null) {
                        this.datestart_obj = '';
                        this.datestart_value_obj = '';
                    } else {
                        //  this.datestart_obj = data.rows[i].values[9];
                        var today = new Date(data.rows[i].values[9]);
                        var dd = today.getDate();
                        var mm = today.getMonth() + 1; //January is 0!
                        var yyyy = today.getFullYear();
                        var hh = today.getHours();
                        var mi = today.getMinutes();
                        var ss = today.getSeconds();
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
                        today = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mi + ':' + ss;
                        this.datestart_obj = today;
                        this.datestart_value_obj = 'Початок';
                    }
                    if (data.rows[i].values[10] == null) {
                        this.dateend_obj = '';
                        this.dateend_value_obj = '';
                    } else {
                        var today = new Date(data.rows[i].values[10]);
                        var dd = today.getDate();
                        var mm = today.getMonth() + 1; //January is 0!
                        var yyyy = today.getFullYear();
                        var hh = today.getHours();
                        var mi = today.getMinutes();
                        var ss = today.getSeconds();
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
                        today = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mi + ':' + ss;
                        this.dateend_obj = today;
                        this.dateend_value_obj = 'Кінець';
                    }
                    // debugger;
                    const headSpan = this.createElements('span',{className: 'nameProj'},data.rows[i].values[2]); //'Проект: Рівні можливості'
                    const logoSpan = this.createElements('i',{className: 'material-icons'},'share');
                    const headLogoSpan = this.createElements('span',{className: `logoSpanHeader ${data.rows[i].values[5]}`}, logoSpan); /*arrayOfTypes[rand]*/
                    headLogoSpan.addEventListener('click', function() {
                        window.location = `${location.origin}${localStorage.getItem('VirtualPath')}/sections/Claims/edit/${data.rows[i].values[0]}`
                    },false);
                    // debugger;
                    const topHeaderDivItem = this.createElements('div', {className: 'topHeaderDivItem'}, headSpan, headLogoSpan);
                    const topFooterDivItem = this.createElements('div', {className: 'topFooterDivItem'}, data.rows[i].values[8]); //'участь у тренінгу в ЦРМ Порушення правил дорожнього руху'
                    // debugger;
                    //debugger;
                    const bottomHeaderIconItem = this.createElements('i',{className: 'material-icons'},this.location_ico_obj);
                    //   debugger;
                    const bottomHeaderTextItem = this.createElements('span',{className: 'bottomHeaderTextItem'}, this.location_obj); //'вул, Богатирська 17'
                    //debugger;
                    if(data.rows[i].values[12] != null) {
                        this.bottomBodyIconItem = this.createElements('img',{alt: 'avatar', src: `${data.rows[i].values[12]}`, className: 'logo_avatar'},'account_circle');
                    }else{
                        this.bottomBodyIconItem = this.createElements('i',{className: 'material-icons person'},'person');
                    }
                    // debugger;
                    const bottomBodyTextItem = this.createElements('span',{className: 'bottomBodyTextItem'},data.rows[i].values[14]); //'Адміністратор системи'
                    const bottomBodyLeftSide = this.createElements('span',{className: 'bottomBodyLeftSide'}, this.bottomBodyIconItem, bottomBodyTextItem);
                    const bottomBodyRightSide = this.createElements('span',{className: `bottomBodyRightSide ${data.rows[i].values[5]}`}, String(data.rows[i].values[4])); //'0%'
                    const bottomFooterLeftSpanTopItem = this.createElements('span', {className: 'bottomFooterLeftSpanTopItem'}, this.datestart_value_obj); //'Початок'
                    const bottomFooterLeftSpanBottomItem = this.createElements('span', {className: 'bottomFooterLeftSpanBottomItem'}, this.datestart_obj); //'10.01.2018 15:00'
                    const bottomFooterRightSpanTopItem = this.createElements('span', {className: 'bottomFooterRightSpanTopItem'}, this.dateend_value_obj); //'Кінець'
                    const bottomFooterRightSpanBottomItem = this.createElements('span', {className: 'bottomFooterRightSpanBottomItem'}, this.dateend_obj); //'12.02.2018 09:00'
                    const bottomFooterLefItem = this.createElements('div', {className: 'bottomFooterLefItem'}, bottomFooterLeftSpanTopItem, bottomFooterLeftSpanBottomItem);
                    const bottomFooterRightItem = this.createElements('div', {className: 'bottomFooterRightItem'}, bottomFooterRightSpanTopItem, bottomFooterRightSpanBottomItem);
                    const bottomHeaderDivItem = this.createElements('div', {className: 'bottomHeaderDivItem'}, bottomHeaderIconItem, bottomHeaderTextItem);
                    const bottomBodyDivItem = this.createElements('div',{className: 'bottomBodyDivItem'}, bottomBodyLeftSide, bottomBodyRightSide);
                    const bottomFooterDivItem = this.createElements('div',{className: 'bottomFooterDivItem'}, bottomFooterLefItem, bottomFooterRightItem);
                    const firstBlock = this.createElements('div', {className: 'firstBlock'}, topHeaderDivItem, topFooterDivItem);
                    const secondBlock = this.createElements('div', {className: 'secondBlock'}, bottomHeaderDivItem, bottomBodyDivItem, bottomFooterDivItem);
                    const mainBlockForCard = this.createElements('div', {className: `mainBlockForCard ${data.rows[i].values[5]} ${data.rows[i].values[15]}`}, firstBlock, secondBlock);
                    if(data.rows[i].values[15] != 'ispoln' && data.rows[i].values[15] != 'both') {
                        mainBlockForCard.style.display = 'none';
                    }
                    document.getElementsByClassName('ticket')[0].appendChild(mainBlockForCard);
                }
            }
        },
        createElements: function(tag, props, ...children) {
            // debugger;
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if(children.length > 0) {
                children.forEach(child => {
                    if (typeof child === 'string') {
                        child = document.createTextNode(child);
                    }
                    element.appendChild(child);
                })
            }
            return element;
        },
        Org_SystemUser: 0,
        getOrg_SystemUser: function(data) {
            if (data.rows.length > 0) {
                if (data.rows[0].values[0]) {
                    this.Org_SystemUser = data.rows[0].values[0];
                    //  debugger;
                    let stateObj = { url: window.location.href};
                    let baseUrl = window.location.href.split('?')[0];
                    let urlParam = (stateObj.url == baseUrl) ?
                        ({'organization': data.rows[0].values[0]})
                        : this.decomposeUrl3(stateObj.url);
                    let updatedUrl = baseUrl + '?organization=' + data.rows[0].values[0];
                    history.pushState(stateObj, 'changeTab', updatedUrl);
                    // var getUrlParams = window
                    // .location
                    //     .search
                    //         .replace('?', '')
                    //             .split('&')
                    //                 .reduce(function(p, e) {
                    //                           var a = e.split('=');
                    //                           p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                    //                           return p;
                    //                         }, {}
                    //                             );
                    //   debugger;
                }
            }
            //   debugger;
        },
        decomposeUrl3:function(url) {
            let arr = url.split('?');
            let params = arr[1].split('&');
            let urlParams = {};
            for (let i = 0; i < params.length; i++) {
                let bin = params[i].split('=');
                Object.defineProperty(urlParams, bin[0], {
                    value: bin[1],
                    writable: false
                });
            }
            return urlParams;
        },
        getViewCard: function(data) {
            if (data.name == 'showTaskRow') {
                document.getElementById('check_vukon').classList.remove('display_none');
                document.getElementById('check_vukon_text').classList.remove('display_none');
                document.getElementById('check_avt').classList.remove('display_none');
                document.getElementById('check_avt_text').classList.remove('display_none');
                document.getElementById('btn_block_newTask').classList.remove('display_none');
                document.getElementById('btn_block_proccesTask').classList.remove('display_none');
                document.getElementById('btn_block_overTask').classList.remove('display_none');
                document.getElementById('btn_block_allTask').classList.remove('display_none');
                document.getElementById('global_task_block').classList.remove('display_none');
                document.getElementById('global_map_block').classList.add('display_none');
                document.getElementsByClassName('ticket')[0].style.display = '';
                for (let i = 0; i < document.getElementsByClassName('mainBlockForCard').length; i++) {
                    document.getElementsByClassName('mainBlockForCard')[i].classList.add('mainBlockForCard_Rows');
                    document.getElementById('calendar').classList.add('display_none');
                    document.getElementById('top').classList.add('display_none');
                    document.getElementById('map_seach_adress').classList.add('display_none');
                }
            }
            if (data.name == 'showTaskTable') {
                document.getElementById('check_vukon').classList.remove('display_none');
                document.getElementById('check_vukon_text').classList.remove('display_none');
                document.getElementById('check_avt').classList.remove('display_none');
                document.getElementById('check_avt_text').classList.remove('display_none');
                document.getElementById('btn_block_newTask').classList.remove('display_none');
                document.getElementById('btn_block_proccesTask').classList.remove('display_none');
                document.getElementById('btn_block_overTask').classList.remove('display_none');
                document.getElementById('btn_block_allTask').classList.remove('display_none');
                document.getElementById('global_task_block').classList.remove('display_none');
                document.getElementById('global_map_block').classList.add('display_none');
                document.getElementsByClassName('ticket')[0].style.display = '';
                for (let i2 = 0; i2 < document.getElementsByClassName('mainBlockForCard').length; i2++) {
                    document.getElementsByClassName('mainBlockForCard')[i2].classList.remove('mainBlockForCard_Rows');
                    document.getElementById('calendar').classList.add('display_none');
                    document.getElementById('top').classList.add('display_none');
                    document.getElementById('map_seach_adress').classList.add('display_none');
                }
            }
            if (data.name == 'showCalendar') {
                document.getElementById('check_vukon').classList.add('display_none');
                document.getElementById('check_vukon_text').classList.add('display_none');
                document.getElementById('check_avt').classList.add('display_none');
                document.getElementById('check_avt_text').classList.add('display_none');
                document.getElementById('btn_block_newTask').classList.add('display_none');
                document.getElementById('btn_block_proccesTask').classList.add('display_none');
                document.getElementById('btn_block_overTask').classList.add('display_none');
                document.getElementById('btn_block_allTask').classList.add('display_none');
                document.getElementById('global_task_block').classList.remove('display_none');
                document.getElementsByClassName('ticket')[0].style.display = 'none';
                document.getElementById('global_map_block').classList.add('display_none');
                document.getElementById('calendar').classList.remove('display_none');
                document.getElementById('top').classList.add('display_none');
                document.getElementById('map_seach_adress').classList.add('display_none');
                let executeQuery = {
                    queryCode: 'Calendar_Shifts_SelectRows',
                    limit: -1,
                    parameterValues: []
                };
                this.queryExecutor(executeQuery, this.showCalendar, this);
            }
            if (data.name == 'showMap') {
                document.getElementById('check_vukon').classList.add('display_none');
                document.getElementById('check_vukon_text').classList.add('display_none');
                document.getElementById('check_avt').classList.add('display_none');
                document.getElementById('check_avt_text').classList.add('display_none');
                document.getElementById('btn_block_newTask').classList.add('display_none');
                document.getElementById('btn_block_proccesTask').classList.add('display_none');
                document.getElementById('btn_block_overTask').classList.add('display_none');
                document.getElementById('btn_block_allTask').classList.add('display_none');
                document.getElementsByClassName('ticket')[0].style.display = 'none';
                document.getElementById('calendar').classList.add('display_none');
                document.getElementById('top').classList.add('display_none');
                document.getElementById('global_task_block').classList.add('display_none');
                document.getElementById('global_map_block').classList.remove('display_none');
                document.getElementById('map_seach_adress').classList.remove('display_none');
            }
        },
        // getTypeOfCard: function(data){
        //     console.log('data - ',data.package.type)
        //     switch(data.package.value){
        //     case 'typeGreen':
        //         this.hideCards('typeOrange','typeRed','typeGreen');
        //         break;
        //     case 'typeOrange':
        //         this.hideCards('typeGreen','typeRed','typeOrange');
        //         break;
        //     case 'typeRed':
        //         this.hideCards('typeGreen','typeOrange','typeRed');
        //         break;
        //     case 'typeAll':
        //         this.showAllCards(;
        //         break;
        //     }
        // },
        //     showTask(){
        //         console.log('funk_showTask');
        //         document.getElementById('tickets_block').classList.remove('display_none');
        //         document.getElementById('calendar').classList.add('display_none');
        //     },
        showCalendar: function(data) {
            console.log('funk_showCalendar',data);
            //     document.getElementById('calendar').classList.remove('display_none');
            //  document.getElementById('top').classList.add('display_none');
            // this.subscriptions.push(this.sub1);
            let events_data = [];
            for(let i = 0; i < data.rows.length; i++) {
                //debugger;
                let sub_data = {
                    id: data.rows[i].values[0],
                    //description: 'This is a cool event',
                    title: data.rows[i].values[2],
                    // textColor: '#ff5e5e',
                    // color: 'yellow',
                    start: data.rows[i].values[6],
                    end: data.rows[i].values[7],
                    // name: 'First Конференція Name',
                    editable: false,
                    allDay: false,
                    url: location.origin + localStorage.getItem('VirtualPath') + '/sections/Shifts/edit/' + data.rows[i].values[0],
                    className: 'red-label',
                    startEditable: false,
                    durationEditable: false,
                    resourceEditable: false,
                    //   rendering: 'background',
                    overlap: false
                };
                events_data.push(sub_data);
            }
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1; //January is 0!
            let yyyy = today.getFullYear();
            if(dd < 10) {
                dd = '0' + dd
            }
            if(mm < 10) {
                mm = '0' + mm
            }
            today = yyyy + '-' + mm + '-' + dd;
            // debugger;
            //  debugger;
            $(document).ready(function() {
                let initialLocaleCode = 'uk';
                $('#calendar').fullCalendar({
                    header: {
                        left: 'prev,next, today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay,listMonth'
                    },
                    //--Проставить бизнес время
                    //                           businessHours: [ // specify an array instead
                    //     {
                    //         dow: [ 1, 2, 3 ], // Monday, Tuesday, Wednesday
                    //         start: '08:00', // 8am
                    //         end: '18:00' // 6pm
                    //     },
                    //     {
                    //         dow: [ 4, 5 ], // Thursday, Friday
                    //         start: '10:00', // 10am
                    //         end: '16:00' // 4pm
                    //     }
                    // ],
                    defaultDate: today,
                    locale: initialLocaleCode,
                    buttonIcons: false, // show the prev/next text
                    weekNumbers: true,
                    navLinks: true, // can click day/week names to navigate views
                    selectable: true, // add tasks
                    selectHelper: true,
                    //hiddenDays: [ 2, 4 ], //Скрывать дни недели
                    bootstrapGlyphicons: {
                        close: 'glyphicon-remove',
                        prev: 'glyphicon-chevron-left',
                        next: 'glyphicon-chevron-right',
                        prevYear: 'glyphicon-backward',
                        nextYear: 'glyphicon-forward'
                    },
                    //--prompt
                    //   select: function(start, end) {
                    //     var title = prompt('Event Title:');
                    //     var eventData;
                    //     if (title) {
                    //       eventData = {
                    //         title: title,
                    //         start: start,
                    //         end: end
                    //       };
                    //       $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                    //     }
                    //     $('#calendar').fullCalendar('unselect');
                    //   },
                    select: function(start, end) {
                        let today = new Date(start._d);
                        let dd = today.getDate();
                        let mm = today.getMonth() + 1; //January is 0!
                        let yyyy = today.getFullYear();
                        if(dd < 10) {
                            dd = '0' + dd
                        }
                        if(mm < 10) {
                            mm = '0' + mm
                        }
                        today = dd + '.' + mm + '.' + yyyy;
                        let r = [ { code: 'Shift_date', value: today }];
                        let r1 = JSON.stringify(r);
                        let r2 = encodeURI(r1);
                        // debugger;
                        let getUrlParams = window
                            .location
                            .search
                            .replace('?', '')
                            .split('&')
                            .reduce(function(p, e) {
                                let a = e.split('=');
                                p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                                return p;
                            }, {}
                            );
                        window.open(location.origin + localStorage.getItem('VirtualPath') + '/sections/Shifts/add/Organizations_WO/' + Number(getUrlParams.organization) + '?DefaultValues=' + r2, '_self');
                        //debugger;
                        console.log(start, end);
                    },
                    editable: true,
                    eventLimit: true, // allow "more" link when too many events
                    events: events_data /*[
                            {
                              id: 123,
                              description: 'This is a cool event',
                              title: 'Конференція Конференція Конференція',
                              textColor: '#ff5e5e',
                              color: 'yellow',
                              start: '2018-03-11',
                              end: '2018-03-13',
                              name: 'First Конференція Name',
                              editable: false,
                              allDay: true,
                            //   url: 'http://google.com/',
                            //   className: 'asdd',
                              startEditable: true,
                              durationEditable: true,
                              resourceEditable: true,
                            //   rendering: 'background',
                              overlap: true
                             //  constraint: 'businessHours'
                            },
                            {
                              title: 'Зустріч',
                              start: '2018-03-05T10:30:00',
                              end: '2018-03-05T12:30:00'
                            },
                            {
                              title: 'Обід',
                              start: '2018-03-12 12:00:00.000'
                            },
                            {
                              title: 'Click for Google',
                              url: 'http://google.com/',
                              start: '2018-03-28'
                            },
                          ]*/
                    /*,
    eventRender: function(event, element) {
        element.qtip({
            content: event.description
        });
    }*/
                });
                //   var view = $('#calendar').fullCalendar('getView');
                // alert("The view's title is " + view.title);
                // build the locale selector's options
                $.each($.fullCalendar.locales, function(localeCode) {
                    $('#locale-selector').append(
                        $('<option/>')
                            .attr('value', localeCode)
                            .prop('selected', localeCode == initialLocaleCode)
                            .text(localeCode)
                    );
                });
                // when the selected option changes, dynamically change the calendar option
                $('#locale-selector').on('change', function() {
                    if (this.value) {
                        $('#calendar').fullCalendar('option', 'locale', this.value);
                    }
                });
            });
        },
        //     showMap(){
        //         console.log('funk_showMap');
        //         document.getElementById('calendar').classList.add('display_none');
        //         document.getElementById('tickets_block').classList.add('display_none');
        //         document.getElementById('top').classList.add('display_none');
        //     },
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
