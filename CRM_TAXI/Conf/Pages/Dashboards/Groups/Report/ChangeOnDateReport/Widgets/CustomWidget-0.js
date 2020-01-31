(function() {
    return {
        title: ' ',
        hint: '',
        customConfig:
                `
                <style>
                #reportTitle{
                    text-align: center;
                    font-size: 20px;
                    font-weight: 600;
                }
                </style>
                
                 <div id='reportTitle'>Расход запчастей на конкретную дату
                 </div>
                `
        ,
        afterViewInit: function() {
            const reportTitle = document.getElementById('reportTitle');
            const organizationNameInput = document.createElement('span');
            reportTitle.appendChild(organizationNameInput);
        }
    };
}());
