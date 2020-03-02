(function() {
    return {
        init: function() {
            const x = window.matchMedia('(max-width: 1000px)');
            this.myFunction(x);
            x.addListener(this.myFunction);
        },
        myFunction: function(x) {
            const greenWidget = document.querySelector('#green-widget smart-bi-widget-wrapper');
            if (!greenWidget) {
                return;
            }
            if (x.matches) {
                greenWidget.style.backgroundColor = 'yellow';
            } else {
                greenWidget.style.backgroundColor = 'pink';
            }
        }
    };
}());
