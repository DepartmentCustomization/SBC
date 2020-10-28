(function() {
    return {
        init: function() {
            let select2LibraryJS = 'select2LibraryJS';
            if (!document.getElementById(select2LibraryJS)) {
                let head = document.getElementsByTagName('head')[0];
                let script = document.createElement('script');
                script.id = 'jQueryLibraryJS';
                script.type = 'text/javascript';
                script.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
                head.appendChild(script);
                script.onload = function() {
                    let script2 = document.createElement('script');
                    script2.id = 'devexpress';
                    script2.type = 'text/javascript';
                    script2.src = 'https://cdn3.devexpress.com/jslib/20.2.3/js/dx.all.js';
                    head.appendChild(script2);
                }.bind(self);
            }
        },
    };
}());
