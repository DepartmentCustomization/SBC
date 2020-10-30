(function() {
    return {
        init: function() {
            let select2LibraryJS = 'select2LibraryJS';
            if (!document.getElementById(select2LibraryJS)) {
                let head = document.getElementsByTagName('head')[0];
                let scriptJQuery = document.createElement('script');
                scriptJQuery.id = 'jQueryLibraryJS';
                scriptJQuery.type = 'text/javascript';
                scriptJQuery.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
                head.appendChild(scriptJQuery);
                let scriptDevExpress = document.createElement('script');
                scriptDevExpress.id = 'jQueryLibraryJS';
                scriptDevExpress.type = 'text/javascript';
                scriptDevExpress.src = 'https://cdn3.devexpress.com/jslib/20.2.3/js/dx.all.js';
                head.appendChild(scriptDevExpress);
            }
        },
    };
}());
