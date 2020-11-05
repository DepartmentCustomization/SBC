(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        customConfig:
                `
                <style>
                #reportTitle{
                    text-align: center;
                    font-size: 20px;
                    font-weight: 600;
                }
                </style>
                
                 <div id='reportTitle'>Відомість обліку пошкоджень
                 </div>
                `
        ,
        init: function() {
            let s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = '/lib/defiant.js-master/src/defiant.js';
            document.getElementsByTagName('head')[0].appendChild(s);
            s.onload = function() {
            }.bind(this)    
        },
        afterViewInit: function() {
        }
    };
}());
