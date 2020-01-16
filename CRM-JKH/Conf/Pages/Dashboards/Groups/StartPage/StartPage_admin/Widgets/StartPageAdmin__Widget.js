(function () {
    return {
        customConfig:
                `               
                    <div id='container'></div>  
                `
        ,
        init: function() {
            let executeQuery = {
                queryCode: 'GetAppealTypes',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQuery, this.load, this);
            this.showPreloader = false;
        },
        load: function() {
            const CONTAINER = document.getElementById('container');
            let title = this.createElement('div', { className: 'header-label', innerText: ' '});
            let groupViewAppeals__icon = this.createElement('div', { className: 'icon letterIcon material-icons',  innerText: 'group' });
            let groupViewAppeals__description = this.createElement('div', { className: 'description', innerText: 'Управління користувачами'});
            groupViewAppeals__icon.style.color = '#ff7961';
            let groupViewAppeals__borderBottom = this.createElement('div', { className: 'border-bottom' });
            let groupViewAppeals__borderRight = this.createElement('div', { className: 'border-right'});
            let groupViewAppeals = this.createElement('div', { className: 'group', tabindex: '0' }, groupViewAppeals__icon, groupViewAppeals__description, groupViewAppeals__borderBottom, groupViewAppeals__borderRight );
            groupViewAppeals.addEventListener('click', () => {
                window.open(location.origin + localStorage.getItem('VirtualPath')+'/admin/users');
            });
            let groupViewAppeals2__icon = this.createElement('div', { className: 'icon letterIcon material-icons',  innerText: 'location_city' });
            let groupViewAppeals2__description = this.createElement('div', { className: 'description', innerText: 'Організації'});
            groupViewAppeals2__icon.style.color = '#ff7961';
            let groupViewAppeals2__borderBottom = this.createElement('div', { className: 'border-bottom' });
            let groupViewAppeals2__borderRight = this.createElement('div', { className: 'border-right'});
            let groupViewAppeals2 = this.createElement('div', { className: 'group', tabindex: '0' }, groupViewAppeals2__icon, groupViewAppeals2__description, groupViewAppeals2__borderBottom, groupViewAppeals2__borderRight );
            groupViewAppeals2.addEventListener('click', () => {
                window.open(location.origin + localStorage.getItem('VirtualPath')+'/sections/Organizations');
            });
            let groupsWrapper = this.createElement('div', { className: 'group-btns' }, groupViewAppeals, groupViewAppeals2);
            CONTAINER.appendChild(title);
            CONTAINER.appendChild(groupsWrapper);
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
        typeAppeal: 1
    };
}());
