(function () {
  return {
    title: ' ',
    hint: '',
    formatTitle: function() {},
    customConfig:
                `
                
                <div id='container'> </div>
                `
    ,
    init: function() {
       /* let executeQuery = {
            queryCode: '',
            limit: -1,
            parameterValues: []
        };
        this.queryExecutor(executeQuery, this.load);*/
        
    },
    load: function(data) {
    },
    
    afterViewInit: function(){
        const cont = document.getElementById('container');
        const inp1 = document.createElement('input');
        const btn1 = document.createElement('button');
        btn1.innerText = 'жми сюда';
        cont.appendChild(inp1);
        cont.appendChild(btn1);
        
        btn1.addEventListener('click', e => {
            let value = inp1.value;
            this.messageToSend('message', value)
           
        });
    },
    messageToSend: function(message, value){
        this.messageService.publish({name: message, value: value })
    }
};
}());
