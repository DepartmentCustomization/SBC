(function() {
    return {
        title: ' ',
        hint: '',
        customConfig:
                    `
                    <style>
                        #modalMaps{
                        }
                        #modalWindowWrapper{
                            position:fixed;
                            display:flex;
                            width:100%;
                            height:100%;
                            justify-content:center;
                            align-items:center;
                            background:rgba(0,0,0,.7);
                            z-index:100;
                            top: 44px;
                            left: 0;
                        }
                        #modalWindow{
                            display: flex;
                            flex-direction: column;
                            position: fixed;
                            top: 140px;
                            margin-left: 50%;
                            left: -450px;
                            z-index: 100;
                            background: #fafafa;
                            width: 100%;
                            max-width: 900px;
                            padding: 15px;
                        }
                    </style>
                    <div id="modalMaps"></div>
                    `
        ,
        init: function() {
            this.messageService.subscribe('captionModalMaps', this.createCaption, this);
            this.messageService.subscribe('headerModalMaps', this.setHeader, this);
        },
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if(children.length) {
                children.forEach(child =>{
                    element.appendChild(child);
                });
            } return element;
        },
        afterViewInit: function() {
            const container = document.getElementById('modalMaps');
            this.container = container;
            const modalWindow = this.createElement('div', { id:'modalWindow'});
            this.modalWindow = modalWindow;
            const modalWindowWrapper = this.createElement(
                'div',
                {
                    id:'modalWindowWrapper',
                    className: 'modalWindowWrapper'
                },
                modalWindow
            );
            container.appendChild(modalWindowWrapper);
            this.createHeader();
            this.addContainerChild(
                this.header
            );
        },
        createHeader: function() {
            const header = {
                text: 'Пошук адреси',
                iconClass: 'fa fa-map',
                widget: 'ModalMaps'
            }
            const name = 'createHeader';
            this.messageService.publish({ name, header });
        },
        setHeader: function(message) {
            this.header = message.header;
        },
        addContainerChild: function(...params) {
            params.forEach(item => this.modalWindow.appendChild(item));
        }
    };
}());