(function () {
    return {
        title: ' ',
        hint: ' ',
        formatTitle: function() {},
        customConfig:
                `
                <style>
                .wrapper {
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    height: 100%;
                    align-items: center;
                }
                
                .item {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    margin: 0 5px;
                }
                
                .numbers {
                    margin-left: 10px;
                    font-weight: 700;
                }
                
                .circle {
                    height: 1.5vw;
                    width: 1.5vw;
                    border-radius: 1.5vw;
                    margin-right: 10px;
                }
                
                </style>
                
                <div class="wrapper">
                    <div class="item">
                        <div style="background: #9999CC" class="circle"></div>
                        <span class="status">Усі</span> <span class="numbers">0</span>
                    </div>
                    <div class="item">
                        <div style="background: #ffc1079e" class="circle"></div>
                        <span class="status">Нова</span> <span class="numbers"></span>
                    </div>
                    <div class="item">
                        <div style="background: #2ECCFA" class="circle"></div>
                        <span class="status">В роботі</span> <span class="numbers">0</span>
                    </div>
                    <div class="item">
                        <div style="background: #669966" class="circle"></div>
                        <span class="status">Відмінена</span> <span class="numbers">0</span>
                    </div>
                    <div class="item">
                        <div style="background: #80FF00" class="circle"></div>
                        <span class="status">Закрита</span> <span class="numbers">0</span>
                    </div>
                    <div class="item">
                        <div style="background: #FFFF33" class="circle"></div>
                        <span class="status">Відхилено</span> <span class="numbers">0</span>
                    </div>
                </div>
                `
        ,
        init: function() {
            let executeQuery = {
                queryCode: 'Claims_State_Select',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQuery, this.load);
        },
        load: function(data) {
            let total = 0;
            let tempArr = [];
            let numbers = [...document.getElementsByClassName('numbers')];
            let status = [...document.getElementsByClassName('status')];
            function find(array, value) {
                if (array.indexOf) {
                    return array.indexOf(value);
                }
                for (let i = 0; i < array.length; i++) {
                    if (array[i] === value) return i;
                }
                return -1;
            }
            for(let j=0; j<data.rows.length; j++) {
                tempArr.push(data.rows[j].values[1]);
                total += data.rows[j].values[0]
            }
            for(let i=0; i<status.length; i++) {
                let search = find(tempArr, status[i].innerText)
                if(search != -1) {
                    numbers[i].innerText = data.rows[search].values[0]
                }
            }
            numbers[0].innerText = total;
        }
    };
}());
