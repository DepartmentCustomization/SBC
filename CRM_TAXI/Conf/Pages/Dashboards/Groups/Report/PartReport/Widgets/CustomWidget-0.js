(function () {
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
                
                 <div id='reportTitle'>Остаток за отчетный период по запчастям
                 </div>
                `
    ,
    init: function() {
    },
    afterViewInit: function() {
        const reportTitle = document.getElementById('reportTitle');
        const organizationNameInput = document.createElement('span');
        reportTitle.appendChild(organizationNameInput);
    }
};
}());
