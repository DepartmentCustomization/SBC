(function() {
    return {
        init: function() {
            let head = document.getElementsByTagName('head')[0];

            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js';
            head.appendChild(script);
        }
    };
}());
