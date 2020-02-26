(function () {
  return {
    title: ' ',
    hint: '',
    formatTitle: function() {},
    customConfig:
                `
                <div id='infoContainer'></div>
                `
    ,
    init: function() {
        let executeQuery = {
            queryCode: 'es_userNameAvatar',
            limit: -1,
            parameterValues: []
        };
        this.queryExecutor(executeQuery, this.showUserInfo, this);
    },
    showUserInfo: function(data) {
        indexFirstName =  data.columns.findIndex(el => el.code.toLowerCase() === 'firstname' );
        indexLastName =  data.columns.findIndex(el => el.code.toLowerCase() === 'lastname' );
        indexIcon =  data.columns.findIndex(el => el.code.toLowerCase() === 'avatar' );
        
        const infoContainer = document.getElementById('infoContainer');
        
        userInfo__icon = this.createElement( 'img', {  className: 'userInfo__icon', src:  ''+data.rows[0].values[indexIcon]+'' } );
        userInfo__firstName = this.createElement( 'div', {  className: 'userInfo__firstName caption', innerText: ''+data.rows[0].values[indexFirstName]+'' } );
        userInfo__lastName = this.createElement( 'div', {  className: 'userInfo__lastName caption', innerText: ''+data.rows[0].values[indexLastName]+'' } );
        const userInfo = this.createElement( 'div', { id: 'userInfo' }, userInfo__icon, userInfo__lastName, userInfo__firstName );
        infoContainer.appendChild(userInfo);
    },
	createElement: function(tag, props, ...children) {
        const element = document.createElement(tag);
        Object.keys(props).forEach( key => element[key] = props[key] );
        if(children.length > 0){
            children.forEach( child =>{
                element.appendChild(child);
            });
        } return element;
    },    
};
}());
