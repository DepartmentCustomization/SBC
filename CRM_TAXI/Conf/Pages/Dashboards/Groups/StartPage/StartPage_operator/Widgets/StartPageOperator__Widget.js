(function () {
  return {
    customConfig:
                `               
                    <div id='container'></div>  
                `
    ,
    init: function() {
        let executeQuery = {
            queryCode: 'SelectParts',
            limit: -1,
            parameterValues: []
            };
        this.queryExecutor(executeQuery, this.load, this);
        this.showPreloader = false;
    },
    load: function() {
      const CONTAINER = document.getElementById('container');
      let groupViewAppeals__icon = this.createElement('div', { className: "icon letterIcon material-icons",  innerText: 'build' });
      let groupViewAppeals__description = this.createElement('div', { className: "description", innerText: 'Списание запчастей'});
      groupViewAppeals__icon.style.color = '#ff7961';
      let groupViewAppeals__borderBottom = this.createElement('div', { className: "border-bottom" });
      let groupViewAppeals__borderRight = this.createElement('div', { className: "border-right"});
      let groupViewAppeals = this.createElement('div', { className: "group", tabindex: '0' }, groupViewAppeals__icon, groupViewAppeals__description, groupViewAppeals__borderBottom, groupViewAppeals__borderRight );
      groupViewAppeals.addEventListener('click',  () => { 
          window.open(location.origin + localStorage.getItem('VirtualPath')+'/sections/PartsArrivalWithChange');
      });
      let groupRegAppeals__icon = this.createElement('div', { className: "icon letterIcon material-icons",  innerText: 'reorder' });
      let groupRegAppeals__description = this.createElement('div', { className: "description", innerText: 'Категории товаров'});
      groupRegAppeals__icon.style.color = '#2196F3';
      let groupRegAppeals__borderBottom = this.createElement('div', { className: "border-bottom" });
      let groupRegAppeals__borderRight = this.createElement('div', { className: "border-right"});
      let groupRegAppeals = this.createElement('div', { className: "group", tabindex: '0' }, groupRegAppeals__icon, groupRegAppeals__description, groupRegAppeals__borderBottom, groupRegAppeals__borderRight );
      groupRegAppeals.addEventListener('click', () => { 
          window.open(location.origin + localStorage.getItem('VirtualPath')+'/sections/CategoriesWithPartArrival');
      });
      let groupSearchTable__icon = this.createElement('div', { className: "icon letterIcon material-icons",  innerText: 'cached' });
      let groupSearchTable__description = this.createElement('div', { className: "description", innerText: 'Расход запчастей'});
      groupSearchTable__icon.style.color = '#2196F3';
      let groupSearchTable__borderBottom = this.createElement('div', { className: "border-bottom" });
      let groupSearchTable__borderRight = this.createElement('div', { className: "border-right"});
      let groupSearchTable = this.createElement('div', { className: "group", tabindex: '0' }, groupSearchTable__icon, groupSearchTable__description, groupSearchTable__borderBottom, groupSearchTable__borderRight );
      groupSearchTable.addEventListener('click', () => { 
          window.open(location.origin + localStorage.getItem('VirtualPath')+'/sections/PartsChange');
      });
      let groupCall__icon = this.createElement('div', { className: "icon letterIcon material-icons",  innerText: 'system_update_alt' });
      let groupCall__description = this.createElement('div', { className: "description", innerText: 'Приход запчастей'});
      groupCall__icon.style.color = '#ff7961';
      let groupCall__borderBottom = this.createElement('div', { className: "border-bottom" });
      let groupCall__borderRight = this.createElement('div', { className: "border-right"});
      let groupCall = this.createElement('div', { className: "group", tabindex: '0' }, groupCall__icon, groupCall__description, groupCall__borderBottom, groupCall__borderRight );
      groupCall.addEventListener('click', () => { 
          window.open(location.origin + localStorage.getItem('VirtualPath')+'/sections/PartsArrival');
      });
      let groupsWrapper = this.createElement('div', { className: 'group-btns' }, groupViewAppeals, groupRegAppeals, groupSearchTable, groupCall);
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
    showModalWindow: function() {
      let CONTAINER = document.getElementById('container');
      const modalBtnClose =  this.createElement('button', { id:'modalBtnClose', className: 'btn', innerText: 'Закрити'});
      const modalBtnTrue =  this.createElement('button', { id:'modalBtnTrue', className: 'btn', innerText: 'Підтвердити'});
      const modalBtnWrapper =  this.createElement('div', { id:'modalBtnWrapper' }, modalBtnTrue, modalBtnClose);
      const modalWindow = this.createElement('div', { id:'modalWindow', className: 'modalWindow'}, modalBtnWrapper); 
      const modalWindowWrapper = this.createElement('div', { id:'modalWindowWrapper', className: 'modalWindowWrapper'}, modalWindow); 
      CONTAINER.appendChild(modalWindowWrapper);
    }, 
};
}());
