(function() {
    return {
        insertText: function ( id, text ) {
            //ищем элемент по id
              var txtarea = document.getElementById(id);
              //ищем первое положение выделенного символа
              var start = txtarea.selectionStart;
              //ищем последнее положение выделенного символа
              var end = txtarea.selectionEnd;
              // текст до + вставка + текст после (если этот код не работает, значит у вас несколько id)
              var finText = txtarea.value.substring(0, start) + text + txtarea.value.substring(end);
              // подмена значения
              txtarea.value = finText;
              // возвращаем фокус на элемент
              txtarea.focus();
              // возвращаем курсор на место - учитываем выделили ли текст или просто курсор поставили
              txtarea.selectionEnd = ( start == end )? (end + text.length) : end ;
        },
        init: function() {
            this.form.onControlValueChanged('organization_id', this.onStreetsChanged);

////////////////////////////

                var css = `.menu-item {
                    border: 2px solid #a6a6a6;
                    background: #a6a6a6;
                    color: white;
                    display: inline-block;
                    text-align: center;
                    position: relative;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .menu-item .submenu {
                    /*height: 50px;*/
                    width: 150px;
                    /*margin-top: 5px;*/
                    background: #efefef;
                    right: -13px;
                    padding: 5px;
                    display: none;
                    position: absolute;
                    cursor: pointer;
                }
                .menu-item .submenu .submenu-btn {
                    width: 90%;
                    margin-top: 5px;
                    border: 1px solid #a6a6a6;
                    border-radius: 5px;
                    background: #a6a6a6;
                    color: white;
                    cursor: pointer;
                }`;

                var htmlDiv = document.createElement('div');
                htmlDiv.innerHTML = '<p></p><style>' + css + '</style>';
                document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[1]);


                
                // var node = document.createElement("button");
                
                // var textnode = document.createTextNode("Тег");
                // node.appendChild(textnode);
                


                var t  = document.getElementById('content');
                var menu = document.createElement("div");
                menu.style.float = 'right';
                menu.style.width = '60px';
                menu.className = 'menu-item';
                menu.id = 'menu_item';
                menu.innerText = 'меню';
                // node.appendChild(menu);
                t.parentElement.insertBefore(menu, t); 




                var submenu = document.createElement("div");
                submenu.className = 'submenu';
                menu.appendChild(submenu);

                //ADD BUTTONS
                var btn1 = document.createElement("button");
                btn1.className = 'submenu-btn';
                btn1.innerText = 'tag 1';
                btn1.id = 'AddTag1';
                submenu.appendChild(btn1);

                document.getElementById('AddTag1').addEventListener('click', function() {
                    this.insertText('content', '{TAG1}');
                }.bind(this));

                var btn2 = document.createElement("button");
                btn2.className = 'submenu-btn';
                btn2.innerText = 'tag 2';
                btn2.id = 'AddTag2';
                submenu.appendChild(btn2);

                document.getElementById('AddTag2').addEventListener('click', function() {
                    this.insertText('content', '{TAG2}');
                }.bind(this));

                ///////////////////

        document.getElementById('menu_item').onmouseover= function(event) {
            var target = event.target; // где был клик?
            if (target.className == 'menu-item') {
                var s=target.getElementsByClassName('submenu');
                closeMenu();
                s[0].style.display='block';
            }
        };
        
        document.onmousemove=function(event) {
            var target = event.target; // где был клик?
            // console.log(event.target);
            if (target.className!='menu-item' && target.className!='submenu' && target.className!='submenu-btn') {
                closeMenu();
            }
        }
        function closeMenu(){
            var menu=document.getElementById('menu_item');
            var subm=document.getElementsByClassName('submenu');
            for (var i=0; i<subm.length; i++) {
                subm[i].style.display="none";
            }
        }





        },
        onStreetsChanged: function(dis_id) {
            if (typeof dis_id === 'string') {
                return
            } else if (dis_id == null) {
                this.form.setControlValue('position_id', null);
                let dependParams = [{ parameterCode: '@organization_id', parameterValue: dis_id }];
                this.form.setControlParameterValues('position_id', dependParams);
                this.form.disableControl('position_id');
            } else {
                let dependParams = [{ parameterCode: '@organization_id', parameterValue: dis_id }];
                this.form.setControlParameterValues('position_id', dependParams);
                this.form.enableControl('position_id');
            }
        }
    };
}());