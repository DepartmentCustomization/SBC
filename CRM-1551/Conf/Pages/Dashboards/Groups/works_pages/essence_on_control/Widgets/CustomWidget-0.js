(function() {
    return {
        title: '',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `
                    <div class='main-buttons-block' id='main-buttons-block'></div>
                    `
        ,
        afterViewInit: function() {
            this.createButtons()
        },
        createButtons() {
            const con = this.createElement('div',{className:'btns-con',id:'btns-con'})
            const mainCon = document.getElementById('main-buttons-block')
            const questionBtn = this.createElement('a',{
                className:'btn question',
                id:'question',
                textContent: 'Питань'
            })
            const assignmentBtn = this.createElement('a',{
                className:'btn assignment',
                id:'assignment',
                textContent: 'Доручень'
            })
            const eventBtn = this.createElement('a',{
                className:'btn event',
                id:'event',
                textContent: 'Заходів'
            })
            con.append(questionBtn,assignmentBtn,eventBtn)
            mainCon.append(con)
            const title = document.getElementById('title')
            title.remove()
        },
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if(children.length > 0) {
                children.forEach(child =>{
                    element.appendChild(child);
                });
            } return element;
        },
        load: function() {
        }
    };
}());
