const head = document.getElementsByTagName('head')[0];
const scriptDevExtremeViz = document.createElement('script');
scriptDevExtremeViz.id = 'scriptDevExtremeViz';
scriptDevExtremeViz.type = 'text/javascript';
scriptDevExtremeViz.src = 'https://cdn3.devexpress.com/jslib/20.2.3/js/dx.viz.js';
head.appendChild(scriptDevExtremeViz);
