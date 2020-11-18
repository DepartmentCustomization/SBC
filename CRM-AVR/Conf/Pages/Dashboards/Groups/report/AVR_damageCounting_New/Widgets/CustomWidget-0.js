(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() { },
        customConfig:
            `
                <style>
                #reportTitle {
                    text-align: center;
                    font-size: 20px;
                    font-weight: 600;
                }
                </style>
                
                <div class="titleTable">
                        <div class="can-toggle demo-rebrand-1" id="toggle_check_chart1" style="">
                            Режим звіту
                            <input id="check_chart1" type="checkbox">
                            <label for="check_chart1">
                            <div class="can-toggle__switch" data-checked="Повно" data-unchecked="Скорочено"></div>
                            </label>
                        </div>

                        <div class="can-toggle demo-rebrand-1" id="toggle_check_chart2" style="">
                            Пусті значення
                            <input id="check_chart2" type="checkbox">
                            <label for="check_chart2">
                            <div class="can-toggle__switch" data-checked="Так" data-unchecked="Ні"></div>
                            </label>
                        </div>
                        <div class="btn-export">
                            <button id="export-excel"><span class="material-icons">archive</span>Excel</button>                            
                        </div>
                </div>
                `
        ,
        init: function() {
        },
        isSmall: 1,
        isNullValues: 0,
        afterViewInit: function() {

            document.getElementById('check_chart1').addEventListener('click', function(e) {
                if (e.currentTarget.checked) {
                    this.isSmall = 0;
                } else {
                    this.isSmall = 1;
                }
                let messageSelect = {
                    name: 'CheckIsSmall',
                    package: {
                        value: this.isSmall
                    }
                }
                this.messageService.publish(messageSelect);
            }.bind(this));

            document.getElementById('check_chart2').addEventListener('click', function(e) {
                if (e.currentTarget.checked) {
                    this.isNullValues = 1;
                } else {
                    this.isNullValues = 0;
                }
                let messageSelect = {
                    name: 'CheckIsNullValues',
                    package: {
                        value: this.isNullValues
                    }
                }
                this.messageService.publish(messageSelect);
            }.bind(this));
        }
    };
}());
