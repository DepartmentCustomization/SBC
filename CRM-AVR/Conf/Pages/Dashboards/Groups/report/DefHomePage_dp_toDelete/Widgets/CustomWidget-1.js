(function () {
  return {
    title: ' ',
    hint: '',
    formatTitle: function() {},
    customConfig: `
            <style>
                        ::-webkit-scrollbar-track {
                        box-shadow: none;
                    }
                    .container{
                            border-bottom: 1px inset #cecece;
                        margin: 0 2px;
                        width: calc(100% - 2px);
                        height: 50px;
                    }
                    .btnContainer{
                        border-bottom: 1px inset #cecece;
                        overflow: hidden;
                        height: 100%;
                        display: flex;
                        flex-direction:row;
                    }
                    .btn {
                    width: 70px;
                        height:100%;
                        font-size: 16px;
                        font-family: 'Open Sans';
                        float: left;
                        border: none;
                        outline: none;
                        cursor: pointer;
                        padding: 4px 10px;
                        transition: 0.3s;
                        color:#07d;
                        background-color: #fff;
                        text-transform: uppercase;
                    }
                    
                    .btn.active {
                        border-bottom: 4px solid #f44336;
                    }
                    
                    
                    .btn:hover {
                      background: #f1f1f1;
                      color: #ffffff;
                    }
                    
                    .btn i {
                        vertical-align: middle;
                        color: #ddd;
                    }
                   .dropdown-menu.notifications.show{
                       position: fixed!important;
                       top: 12%!important;
                       left: 5%!important;
                       box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
                       
                   }
                   
                   
                   
                   /* CSS used here will be applied after bootstrap.css */

                .dropdown {
                    display:inline-block;
                    margin-left:20px;
                    padding:10px;
                  }
                
                
                .glyphicon-bell {
                   
                    font-size:1.5rem;
                  }
                
                .notifications {
                   min-width:120px; 
                  }
                  
                  .notifications-wrapper {
                      
                      overflow:auto;
                      max-height:0px;
                      height: auto;
                      opacity: 1;
                  }
                    
                                        
                    
                 .menu-title {
                     color:#ff7788;
                     font-size:1.5rem;
                      display:inline-block;
                      }
                 
                .glyphicon-circle-arrow-right {
                      margin-left:10px;     
                   }
                  
                   
                 .notification-heading{
                padding: 10px 10px;
                text-align: center;
                color: black;
                font-size: 3vh;
                       }
               
               .notification-footer{
                    padding: 10px 10px;
                    text-align: center;
                    color: blue;
                    cursor: pointer;
                    font-size: 2vh;
                    margin-top: 0px;
                    transition: margin-top 0.7s;
               }
                .notification-footer:hover{
                     margin-top: 1vh;
                }
               
                .dropdown-menu.divider {
                  margin:5px 0;          
                  }
                
                .item-title {
                  
                 font-size:1.3rem;
                 color:#000;
                    
                }
                
                .contentNotifyCont a.content {
                 text-decoration:none;
                 background:#ccc;
                
                 }
                
                .content{
                    cursor: pointer;
                }
                .notification-item {
                color: black;
                font-size: 1.65vh;
                     padding:10px;
                     margin:0px;
                     border-bottom: 1px solid #cecece;
                     background:white;
                     display: flex;
                     justify-content: space-between;
                     border-radius: 8px;
                 }
                .notification-item p{
                    width: 65%;
                }
                .notification-item:hover {
                    background: #e8e8e8;
                    
                }
                .notification-item .material-icons{
                    font-size: 2.5vh;
                }
                
                #menutItemDivBlock{
                    background: white;
                    color: black;
                    padding: 1em;
                    border-bottom :1px solid gray;
                    font-size: 2vh;
                    font-family: sans-serif;
                    display: flex;
                    justify-content: space-between;
                    cursor: pointer;
                    align-items: center;
                    border-radius: 8px;
                }
                #menutItemDivBlock:hover{
                    background: #eff2f5;
                }
                #messageContainer{
                        font-family: sans-serif;
                        background: white;
                        border-bottom: 1px solid gainsboro;
                        padding: 1em;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                }
                #messageContainer:hover{
                    background: gainsboro;
                }
                
                #unreadCount{
                    background: #3f7ab7;
                    border-radius: 100%;
                    display: none;
                    padding: 3px;
                    color: white;
                    font-size: 1vh;
                }
                .divHeader{
                       text-align: center;
                        padding: 1em;
                        font-size: 2.3vh;
                        border-bottom: 1px solid gray;
                        background: #929aa2;
                        color: white;
                        font-family: sans-serif;
                        display: flex;
                        justify-content: center;
                        flex-direction: row-reverse;
                        align-items: center;
                }
                #notificationBtn{
                    margin-right: -2vh;
                }
                #messagesBtn{
                    margin-right: -2vh;
                }
                #spanBlock{
                    display: flex;
                    flex-direction: column-reverse;
                    text-align: right;
                }
                   #hiddenDiv{
                       width: 100%;
                       height: 100%;
                       background: #0000004a;
                       position: fixed;
                       top: 0;
                   }
                   
                   
                #iconOpenItems:hover{
                       background: #80808040;
                        border-radius: 100%;
                }
                .contentCont, .contentNotifyCont{
                    overflow: scroll;
                    width: 45vh;
                    max-width: 80vh;
                    height: auto;
                    max-height: 50vh;
                }
                .messagesMenuItem, .notifyMenuItem{
                    width: auto;
                    max-width: 80vh;
                    max-height: 50vh;
                    opacity: 1;
                    position: absolute;
                   
                }
                .contentNotifyCont{
                    animation-duration: 0.7s;
                    max-height:50vh;
                    animation-name: messages;
                    animation-fill-mode: forwards;
                }
                .contentCont{
                    animation-duration: 0.7s;
                    max-height:50vh;
                    animation-name: messages;
                    animation-fill-mode: forwards;
                }
                .divGroupWrapper{
                    animation-duration: 0.3s;
                    max-height:50vh;
                    animation-name: messages;
                    animation-fill-mode: forwards;
                }
                
                #spanGroupMessage{
                    width: 50%;
                    margin-left: 1em;
                    margin-right: 1em;
                }
                
                @keyframes messages {
                      from {
                        opacity: 0;
                        max-height:0vh;
                      }
                    
                      to {
                         opacity: 1;
                         max-height: 50vh;
                      }
                    }
                    
                .displayNone{
                    display:none;
                    background: yellow;
                }
                #backLogoItem{
                    background: white;
                    cursor: pointer;
                    color: black;
                    border-radius: 100%;
                    padding: 0.6vh;
                    margin-right: 1vh;
                }
                
                 #backLogoItem:hover{
                         padding: 0.5vh;
                         background: gainsboro;
                 }
                 #textDivHeader{
                     width: 65%;
                     text-align: center;
                 }
                 #logoDivHeader{
                     width: 35%;
                     text-align: left;
                     display: none;
                 }
                 #spanGroupDate{
                     text-align: center;
                 }
                 #avatarLogo{
                    width: 4.5vh;
                    font-size: 4.5vh;
                    height: 4.5vh;
                    border-radius: 50%;
                 }
                 #containerForImgAndName{
                     display:flex;
                     flex-direction: column-reverse;
                     justify-content: center;
                     align-items: center;
                 }
                 #paragSpan{
                     width:2vh;
                     height:2vh;
                     display:block;
                     border-radius:50px;
                     font-size:1.5vh; color:#fff;
                     text-align:center;
                     background:#3f7ab7
                 }
                 #menutItemParagBlock{
                     display: flex;
                 }
                 #unreadCountMessages{
                    background: #3f7ab7;
                    border-radius: 100%;
                    display: none;
                    padding: 3px;
                    color: white;
                    font-size: 1vh;
                 }
                 .noMessagesDiv{
                     font-size: 2vh;
                    background: white;
                    padding: 2em;
                    text-align: center;
                    font-family: sans-serif;
                 }
                 
                 .mat_btn{
                     
                         color: #929aa2;
                 }
                 </style>
                 
                    
                 <div class="container">
                    <div class="btnContainer">
                     <div>
                          <button id="menuBtn" class="btn"> <i class="material-icons" id="menuBtn_Icon" style="color:#cecece;">blur_on</i>  </button>               
                      </div>
                      <div>
                          <button id="messagesBtn" class="btn">
                                <i class="material-icons" id="messagesBtn_Icon" style="color:#cecece;">insert_comment</i> 
                          </button>
                          <span id="unreadCountMessages"></span>
                      </div>
                      <div>
                              <button id="notificationBtn" class="btn" style="color:#cecece;">
                                  <i class="material-icons" id="notificationBtn_Icon" style="color:#cecece;">notifications</i>
                              </button>
                              <span id="unreadCount"></span>
                       </div>
                   </div>
                </div>
                
       
            `,
    JsonItem1: null,
    JsonItem2: null,

    init: function() {

        let executeQuery2 = {
            queryCode: 'select_message_group',
            parameterValues: []
        };
        this.queryExecutor(executeQuery2, this.load2, this);
     
    },
    onLoad: function() {
    
     let executeQuery = {
            queryCode: 'select_notification',
            parameterValues: []
            };
        this.queryExecutor(executeQuery, this.load, this);
    },
    

    afterViewInit: function() {
        this.handleButtonClick("showMenu", menuBtn, notificationBtn, messagesBtn);
        menuBtn_Icon.style = 'color:red;';
        notificationBtn_Icon.style = 'color:#cecece;';
        messagesBtn_Icon.style = 'color:#cecece;';


        menuBtn.addEventListener("click", function() {
            this.handleButtonClick("showMenu", menuBtn, notificationBtn, messagesBtn);
            menuBtn_Icon.style = 'color:red;';
            notificationBtn_Icon.style = 'color:#cecece;';
            messagesBtn_Icon.style = 'color:#cecece;';
        }.bind(this), true);

    },
    handleButtonClick: function(message, activateBtn, unactivateBtn, unactivateBtn2) {
        this.messageService.publish({
            name: message
        });
        activateBtn.classList.add('active');
        unactivateBtn.classList.remove('active');
        unactivateBtn2.classList.remove('active');
    },
    load: function(data) {


    if (data) {
      if (data.rows.length >= 1) {
            document.getElementById('unreadCountMessages').innerText = JSON.parse(this.JsonItem1).rows[0].values[2];
            
            document.getElementById('unreadCount').innerText = data.rows[0].values[1];
    
    // debugger;
            const unreadCount = document.getElementById('unreadCount');
            const unreadCountMessages = document.getElementById('unreadCountMessages');
    
            if (unreadCountMessages.innerText == 0) {
                unreadCountMessages.style.display = 'none';
            } else {
                unreadCountMessages.innerText = JSON.parse(this.JsonItem1).rows[0].values[2];
                unreadCountMessages.style.display = 'inline-block';
                unreadCountMessages.style.width = '15px';
                unreadCountMessages.style.height = '15px';
            }
    
    
            if (unreadCount.innerText == 0) {
                unreadCount.style.display = 'none';
            } else {
                unreadCount.innerText = data.rows[0].values[1];
                unreadCount.style.display = 'inline-block';
                unreadCount.style.width = '15px';
                unreadCount.style.height = '15px';
            }
            
             document.getElementById('notificationBtn').addEventListener('click', this.notificationBtnClickFunction.bind(this, data), false);
            }
            else {
                  const unreadCountMessages = document.getElementById('unreadCountMessages');
             document.getElementById('unreadCountMessages').innerText = JSON.parse(this.JsonItem1).rows[0].values[2];
               if (unreadCountMessages.innerText == 0) {
                unreadCountMessages.style.display = 'none';
            } else {
                unreadCountMessages.innerText = JSON.parse(this.JsonItem1).rows[0].values[2];
                unreadCountMessages.style.display = 'inline-block';
                unreadCountMessages.style.width = '15px';
                unreadCountMessages.style.height = '15px';
            }
       
            };
         }
        else
        {
 
            
            //  unreadCount.style.display = 'none';
                unreadCount.style.display = 'inline-block';
                unreadCount.style.width = '15px';
                unreadCount.style.height = '15px';
                
          
        };

        document.getElementById('messagesBtn').addEventListener('click', this.createMessagesMenuFunction.bind(this), false);


       



    },

    createMessagesMenuFunction: function(event) {
        this.handleButtonClick("showMenu", messagesBtn, notificationBtn, menuBtn);
        messagesBtn_Icon.style = 'color:red;';
        notificationBtn_Icon.style = 'color:#cecece;';
        menuBtn_Icon.style = 'color:#cecece;';


        let createBackground = document.createElement('div');
        createBackground.id = 'hiddenDiv'
        let createMenu = document.createElement('div');
        createMenu.className = 'messagesMenuItem';
        createMenu.id = 'messagesMenuItems';
        let element = document.getElementById('messagesBtn');
        let position = element.getBoundingClientRect();
        let x = position.left;
        let y = position.top;
        createMenu.style.top = `${y+50}px`;
        createMenu.style.left = `${x}px`;
        let headerWrapper = document.createElement('div');
        let divHeader = document.createElement('div');
        divHeader.className = 'divHeader';
        let textHeader = document.createElement('div');
        textHeader.id = 'textDivHeader';
        textHeader.appendChild(document.createTextNode("Повідомлення"));
        divHeader.appendChild(textHeader);
        const backLogo = document.createElement('i');
        backLogo.className = 'material-icons mat_btn';
        backLogo.id = 'backLogoItem';
        backLogo.appendChild(document.createTextNode('arrow_back'));

        let logoHeader = document.createElement('div');
        logoHeader.id = 'logoDivHeader';
        logoHeader.appendChild(backLogo);

        divHeader.appendChild(logoHeader);
        headerWrapper.appendChild(divHeader);
        headerWrapper.className = 'headerCont';
        createMenu.appendChild(headerWrapper);
        let contentWrapper = document.createElement('div');
        contentWrapper.className = 'contentCont';
        contentWrapper.id = 'contentContain';
        for (let i = 0; i < JSON.parse(this.JsonItem1).rows.length; i++) {
            let divMenuItemBlock = document.createElement('div');
            divMenuItemBlock.id = 'menutItemDivBlock';
            // Функция клика на группу ( Скрытие групп и отоборажение подгрупп)
            divMenuItemBlock.addEventListener('click', function(event) {
                let executeQuery3 = {
                    queryCode: 'select_message',
                    parameterValues: [{
                        key: '@GroupId',
                        value: JSON.parse(this.JsonItem1).rows[i].values[0]
                    }]
                };
                this.queryExecutor(executeQuery3, this.openGroupItems, this);

            }.bind(this), false);
            // Конец функуции клика на группу
            let parag = document.createElement('ul');
            parag.id = 'menutItemParagBlock';
            let parText = document.createElement('span');
            parText.appendChild(document.createTextNode(`${JSON.parse(this.JsonItem1).rows[i].values[1]}`));
            parag.appendChild(parText);
            let paragSpan = document.createElement("span");
            paragSpan.id = 'paragSpan';
            paragSpan.appendChild(document.createTextNode(`${JSON.parse(this.JsonItem1).rows[i].values[3]}`));
            let divInfo = document.createElement('div');
            let iconOpenItems = document.createElement("i");
            iconOpenItems.className = 'material-icons  mat_btn';
            iconOpenItems.id = 'iconOpenItems';
            iconOpenItems.appendChild(document.createTextNode('arrow_forward'));
            divInfo.appendChild(paragSpan);
            divInfo.appendChild(iconOpenItems);
            divMenuItemBlock.appendChild(parag);
            divMenuItemBlock.appendChild(divInfo);
            contentWrapper.appendChild(divMenuItemBlock);
            if (JSON.parse(this.JsonItem1).rows[i].values[3] == '0') {
                paragSpan.style.display = 'none';
            }
        };
        createMenu.appendChild(contentWrapper);
        const menuElementClassName = 'messagesMenuItem';
        createBackground.addEventListener('click', this.closeBackgroundFunction.bind(this, menuElementClassName), false);
        createMenu.addEventListener('click', this.stopPropagationFunction.bind(this), false);
        createBackground.appendChild(createMenu);
        document.getElementsByTagName('body')[0].appendChild(createBackground);
    },
    closeBackgroundFunction: function(data) {
        messagesBtn_Icon.style = 'color:#cecece;';
        notificationBtn_Icon.style = 'color:#cecece;';
        menuBtn_Icon.style = 'color:red;';


        this.handleButtonClick("showMenu", menuBtn, notificationBtn, messagesBtn);
        const backgroundItem = document.getElementById('hiddenDiv');
        const mainMenuItem = document.getElementsByClassName(data)[0];
        backgroundItem.style.display = 'none';
        mainMenuItem.style.display = 'none';
        document.getElementsByTagName('body')[0].removeChild(backgroundItem);
    },

    getMinutesEnding: function(time) {
        let getLastNumber = String(Math.floor(time)).split('');
        getResult = '';
        switch (getLastNumber[getLastNumber.length - 1]) {
            case '1':
                getResult = `${Math.floor(time)} хвилину тому`;
                break;
            case '2':
            case '3':
            case '4':
                getResult = `${Math.floor(time)} хвилины тому`;
                break;
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                getResult = `${Math.floor(time)} хвилин тому`;
                break;
        }
        return getResult;
    },
    getHoursEnding: function(time) {
        let getLastNumber = String(Math.floor(time)).split('');
        getResult = '';
        switch (getLastNumber[getLastNumber.length - 1]) {
            case '1':
                getResult = `${Math.floor(time)} годину тому`;
                break;
            case '2':
            case '3':
            case '4':
                getResult = `${Math.floor(time)} годины тому`;
                break;
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                getResult = `${Math.floor(time)} годин тому`;
                break;
        }
        return getResult;
    },
    getSecondsEnding: function(time) {
        let getLastNumber = String(Math.floor(time)).split('');
        getResult = '';
        switch (getLastNumber[getLastNumber.length - 1]) {
            case '1':
                getResult = `${Math.floor(time)} секунду тому`;
                break;
            case '2':
            case '3':
            case '4':
                getResult = `${Math.floor(time)} секунды тому`;
                break;
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                getResult = `${Math.floor(time)} секунд тому`;
                break;
        }
        return getResult;
    },
    getDaysEnding: function(time) {
        const getTime = Math.floor(time);
        if (getTime == '11' || getTime == '12' || getTime == '13' || getTime == '14' || getTime == '15' || getTime == '16' || getTime == '17' || getTime == '18' || getTime == '19') {
            return `${getTime} днів тому`;
        }

        let getLastNumber = String(Math.floor(time)).split('');
        getResult = '';
        switch (getLastNumber[getLastNumber.length - 1]) {
            case '1':
                getResult = `${Math.floor(time)} день тому`;
                break;
            case '2':
            case '3':
            case '4':
                getResult = `${Math.floor(time)} дні тому`;
                break;
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                getResult = `${Math.floor(time)} днів тому`;
                break;
        }
        return getResult;
    },
    load2: function(data) {
        
   



        
        
        if (data) {
            // console.log(JSON.stringify(data));
             this.JsonItem1 = JSON.stringify(data);
        }
        else {
            this.JsonItem1   = {"columns":[{"code":"GroupId","name":"GroupId","isVisible":true,"isFileContent":false,"dataType":"Integer"},
            {"code":"GroupName","name":"GroupName","isVisible":true,"isFileContent":false,"dataType":"Text"},
            {"code":"CountAll","name":"CountAll","isVisible":true,"isFileContent":false,"dataType":"Integer"},
            {"code":"CountActivity","name":"CountActivity","isVisible":true,"isFileContent":false,"dataType":"Integer"}],
            "rows":[{"values":[1,"",0,0]}]};
        };
               setTimeout(this.onLoad(), 1500);   

    },
    notificationBtnClickFunction: function(data, event) {

        messagesBtn_Icon.style = 'color:#cecece;';
        notificationBtn_Icon.style = 'color:red;';
        menuBtn_Icon.style = 'color:#cecece;';

        this.handleButtonClick("showMenu", notificationBtn, menuBtn, messagesBtn);
        let createBackgroundForNotify = document.createElement('div');
        createBackgroundForNotify.id = 'hiddenDiv'

        let createMenuForNotify = document.createElement('div');
        createMenuForNotify.className = 'notifyMenuItem';
        createMenuForNotify.id = 'notifyMenuItems';
        var element = document.getElementById('notificationBtn');
        var position = element.getBoundingClientRect();
        var x = position.left;
        var y = position.top;
        createMenuForNotify.style.top = `${y+50}px`;
        createMenuForNotify.style.left = `${x}px`;


        const currentDate = new Date();

        let headerWrapper = document.createElement('div');

        let divHeader = document.createElement('div');
        divHeader.className = 'divHeader';
        divHeader.appendChild(document.createTextNode("Оповіщення"));
        headerWrapper.className = 'headerNotifyCont';
        createMenuForNotify.appendChild(headerWrapper);
        let contentWrapper = document.createElement('div');
        contentWrapper.className = 'contentNotifyCont';
        contentWrapper.id = 'contentNotifyContant';

        headerWrapper.appendChild(divHeader);
        headerWrapper.appendChild(contentWrapper);


        for (var i = 0; i < data.rows.length; i++) {
            const date = new Date(data.rows[i].values[5]);
            const calcDate = currentDate - date;

            let itemLink = document.createElement("a");
            itemLink.className = 'content';
            itemLink.href = `${location.origin}${localStorage.getItem('VirtualPath')}${data.rows[i].values[6]}`;

            let divItem = document.createElement("div");
            divItem.className = 'notification-item';


            let iconFirstItem = document.createElement("i");
            iconFirstItem.className = 'material-icons';

            switch (data.rows[i].values[2]) {
                case 'Add':
                    iconFirstItem.appendChild(document.createTextNode('add'));
                    iconFirstItem.style.color = 'green'
                    break;
                case 'Edit':
                    iconFirstItem.appendChild(document.createTextNode('edit'));
                    iconFirstItem.style.color = 'red'
                    break;
            }


            let paragItem = document.createElement("p");
            paragItem.className = 'item-info';
            paragItem.appendChild(document.createTextNode(data.rows[i].values[4]))

            let iconSecondItem = document.createElement("i");
            iconSecondItem.className = 'material-icons';
            switch (data.rows[i].values[3]) {
                case 'Work':
                    iconSecondItem.appendChild(document.createTextNode('assignment'));
                    break;
                case 'Document':
                    iconSecondItem.appendChild(document.createTextNode('create_new_folder'));
                    break;
                case 'Project':
                    iconSecondItem.appendChild(document.createTextNode('open_with'));
                    break;
            }


            let spanBlock = document.createElement("span");
            spanBlock.id = 'spanBlock';
            let spanDate = document.createElement("span");
            spanDate.id = 'spanDate';
            if ((calcDate / 1000 / 60 / 60 / 24) < 1) {
                if ((calcDate / 1000 / 60 / 60) < 1) {
                    if ((calcDate / 1000 / 60) < 1) {
                        spanDate.appendChild(document.createTextNode(`${this.getSecondsEnding(calcDate/1000)}`));
                    } else {
                        spanDate.appendChild(document.createTextNode(`${this.getMinutesEnding(calcDate/1000/60)}`));
                    }
                } else {
                    spanDate.appendChild(document.createTextNode(`${this.getHoursEnding(calcDate/1000/60/60)}`));
                }
            } else {
                spanDate.appendChild(document.createTextNode(`${this.getDaysEnding(calcDate/1000/60/60/24)}`));
            }

            spanBlock.appendChild(spanDate);
            spanBlock.appendChild(iconSecondItem);


            divItem.appendChild(iconFirstItem);
            divItem.appendChild(paragItem);
            divItem.appendChild(spanBlock);

            itemLink.appendChild(divItem);
            contentWrapper.appendChild(itemLink);
        }


        const backgroundParam = 'notifyMenuItem';
        createBackgroundForNotify.addEventListener('click', this.closeBackgroundFunction.bind(this, backgroundParam), false);
        createMenuForNotify.addEventListener('click', this.stopPropagationFunction.bind(this), false);
        createBackgroundForNotify.appendChild(createMenuForNotify);
        document.getElementsByTagName('body')[0].appendChild(createBackgroundForNotify);
    },

    stopPropagationFunction: function(event) {
        event.stopPropagation();
    },
    openGroupItems: function(data) {
        let backLogo = document.getElementById('backLogoItem');
        let divBackLogo = document.getElementById('logoDivHeader');
        let createMenu = document.getElementById('messagesMenuItems');
        let contentWrapper = document.getElementById('contentContain');
        let divGroupWrapper = document.createElement('div');
        divGroupWrapper.className = 'divGroupWrapper';
        const currentDate = new Date();


        logoDivHeader.style.display = 'inline';
        document.getElementById('textDivHeader').style.textAlign = 'left';

        backLogo.addEventListener('click', function(event) {
            if(createMenu.contains(divGroupWrapper)){
                createMenu.removeChild(divGroupWrapper);
            }
            for (let i = 1; i < createMenu.childNodes.length; i++) {
                createMenu.childNodes[i].style.display = 'block';
                document.getElementById('textDivHeader').style.textAlign = 'center';
            }
            logoDivHeader.style.display = 'none';
        }, false);

        for (let i = 1; i < createMenu.childNodes.length; i++) {
            createMenu.childNodes[i].style.display = 'none';
        }
        if (data.rows[0]) {

            for (let i = 0; i < data.rows.length; i++) {
                const date = new Date(data.rows[i].values[3]);
                const calcDate = currentDate - date;
                let containerForImgAndName = document.createElement('div');
                containerForImgAndName.id = 'containerForImgAndName';
                let spanForName = document.createElement('span');
                spanForName.appendChild(document.createTextNode(data.rows[i].values[0]));
                let divGroupItems = document.createElement('div');
                divGroupItems.id = 'messageContainer';
                let spanGroupLogo = document.createElement('span');
                spanGroupLogo.id = 'spanGroupLogo';

                let logoPic = data.rows[i].values[1];
                if (logoPic == null) {

                    let someLogo = document.createElement('i');
                    someLogo.className = 'material-icons';
                    someLogo.id = 'avatarLogo';
                    someLogo.appendChild(document.createTextNode('account_circle'));
                    someLogo.style.color = '#adaaaf';
                    someLogo.title = data.rows[i].values[0];
                    containerForImgAndName.appendChild(spanForName);
                    containerForImgAndName.appendChild(someLogo);

                    spanGroupLogo.appendChild(containerForImgAndName);
                } else {
                    let containerForImgAndName = document.createElement('div');
                    containerForImgAndName.id = 'containerForImgAndName';
                    let spanForName = document.createElement('span');
                    spanForName.appendChild(document.createTextNode(data.rows[i].values[0]));
                    let imgLogo = document.createElement('img');
                    imgLogo.id = 'avatarLogo';
                    imgLogo.alt = 'avatar';
                    imgLogo.src = logoPic;

                    imgLogo.title = data.rows[i].values[0];
                    containerForImgAndName.appendChild(spanForName);
                    containerForImgAndName.appendChild(imgLogo);

                    spanGroupLogo.appendChild(containerForImgAndName);
                }
                let spanGroupMessage = document.createElement('span');
                spanGroupMessage.id = 'spanGroupMessage';

                spanGroupMessage.appendChild(document.createTextNode(data.rows[i].values[2]));
                let spanGroupDate = document.createElement('span');
                spanGroupDate.id = 'spanGroupDate';
                if ((calcDate / 1000 / 60 / 60 / 24) < 1) {
                    if ((calcDate / 1000 / 60 / 60) < 1) {
                        if ((calcDate / 1000 / 60) < 1) {
                            spanGroupDate.appendChild(document.createTextNode(`${this.getSecondsEnding(calcDate/1000)}`));
                        } else {
                            spanGroupDate.appendChild(document.createTextNode(`${this.getMinutesEnding(calcDate/1000/60)}`));
                        }
                    } else {
                        spanGroupDate.appendChild(document.createTextNode(`${this.getHoursEnding(calcDate/1000/60/60)}`));
                    }
                } else {
                    spanGroupDate.appendChild(document.createTextNode(`${this.getDaysEnding(calcDate/1000/60/60/24)}`));
                }

                divGroupItems.appendChild(spanGroupLogo);

                divGroupItems.appendChild(spanGroupMessage);

                divGroupItems.appendChild(spanGroupDate);

                divGroupWrapper.appendChild(divGroupItems);


            }
        } else {
            const noMessagesDiv = document.createElement('div');
            noMessagesDiv.className = 'noMessagesDiv';
            noMessagesDiv.appendChild(document.createTextNode('У даному блоці немає повідомлень'));
            divGroupWrapper.appendChild(noMessagesDiv);
        }

        createMenu.appendChild(divGroupWrapper);
    }
};
}());
