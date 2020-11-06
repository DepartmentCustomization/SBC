(function () {
  return {
        init: async function() {
            /*
            const head = document.getElementsByTagName('head')[0];
            const scriptDevExpress = document.createElement('script');
            scriptDevExpress.id = 'jQueryLibraryJS';
            scriptDevExpress.type = 'text/javascript';
            scriptDevExpress.src = 'https://cdn3.devexpress.com/jslib/20.2.3/js/dx.all.js';
            head.appendChild(scriptDevExpress);
            */
           await import('/modules/Helpers/Libraries/DevExtremeChartsAll.js');
        }
    };
}());
