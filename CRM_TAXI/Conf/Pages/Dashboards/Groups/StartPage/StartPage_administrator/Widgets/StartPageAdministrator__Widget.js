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
      let groupViewAppeals__icon = this.createElement('div', { className: "icon letterIcon material-icons",  innerText: 'assessment' });
      let groupViewAppeals__description = this.createElement('div', { className: "description", innerText: 'Приход за отчетный период'});
      groupViewAppeals__icon.style.color = '#ff7961';
      let groupViewAppeals__borderBottom = this.createElement('div', { className: "border-bottom" });
      let groupViewAppeals__borderRight = this.createElement('div', { className: "border-right"});
      let groupViewAppeals = this.createElement('div', { className: "group", tabindex: '0' }, groupViewAppeals__icon, groupViewAppeals__description, groupViewAppeals__borderBottom, groupViewAppeals__borderRight );
      groupViewAppeals.addEventListener('click', () => { 
          window.open(location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/ArrivalReport');
      });
      let groupRegAppeals__icon = this.createElement('div', { className: "icon letterIcon material-icons",  innerText: 'assignment' });
      let groupRegAppeals__description = this.createElement('div', { className: "description", innerText: 'Расход за отчетный период'});
      groupRegAppeals__icon.style.color = '#2196F3';
      let groupRegAppeals__borderBottom = this.createElement('div', { className: "border-bottom" });
      let groupRegAppeals__borderRight = this.createElement('div', { className: "border-right"});
      let groupRegAppeals = this.createElement('div', { className: "group", tabindex: '0' }, groupRegAppeals__icon, groupRegAppeals__description, groupRegAppeals__borderBottom, groupRegAppeals__borderRight );
      groupRegAppeals.addEventListener('click',  () => { 
          window.open(location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/ChangeReport');
      });
      let groupSearchTable__icon = this.createElement('div', { className: "icon letterIcon material-icons",  innerText: 'assignment' });
      let groupSearchTable__description = this.createElement('div', { className: "description", innerText: 'Остаток за отчетный период'});
      groupSearchTable__icon.style.color = '#2196F3';
      let groupSearchTable__borderBottom = this.createElement('div', { className: "border-bottom" });
      let groupSearchTable__borderRight = this.createElement('div', { className: "border-right"});
      let groupSearchTable = this.createElement('div', { className: "group", tabindex: '0' }, groupSearchTable__icon, groupSearchTable__description, groupSearchTable__borderBottom, groupSearchTable__borderRight );
      groupSearchTable.addEventListener('click', () => { 
          window.open(location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/PartReport');
      });
      let groupCall__icon = this.createElement('div', { className: "icon letterIcon material-icons",  innerText: 'assessment' });
      let groupCall__description = this.createElement('div', { className: "description", innerText: 'Пробег и расход по всем автомобилям'});
      groupCall__icon.style.color = '#ff7961';
      let groupCall__borderBottom = this.createElement('div', { className: "border-bottom" });
      let groupCall__borderRight = this.createElement('div', { className: "border-right"});
      let groupCall = this.createElement('div', { className: "group", tabindex: '0' }, groupCall__icon, groupCall__description, groupCall__borderBottom, groupCall__borderRight );
      groupCall.addEventListener('click',  () => { 
          window.open(location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/CarsReport');
      });
      let groupCarChangeReport__icon = this.createElement('div', { className: "icon letterIcon material-icons",  innerText: 'assessment' });
      let groupCarChangeReport__description = this.createElement('div', { className: "description", innerText: 'Пробег и расход по конкретной машине'});
      groupCarChangeReport__icon.style.color = '#ff7961';
      let groupCarChangeReport__borderBottom = this.createElement('div', { className: "border-bottom" });
      let groupCarChangeReport__borderRight = this.createElement('div', { className: "border-right"});
      let groupCarChangeReport = this.createElement('div', { className: "group", tabindex: '0' }, groupCarChangeReport__icon, groupCarChangeReport__description, groupCarChangeReport__borderBottom, groupCarChangeReport__borderRight );
      groupCarChangeReport.addEventListener('click',  () => { 
          window.open(location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/CarChangeReport');
      });
      let groupChangeOnDateReport__icon = this.createElement('div', { className: "icon letterIcon material-icons",  innerText: 'assignment' });
      let groupChangeOnDateReport__description = this.createElement('div', { className: "description", innerText: 'Расход запчастей на конкретную дату'});
      groupChangeOnDateReport__icon.style.color = '#2196F3';
      let groupChangeOnDateReport__borderBottom = this.createElement('div', { className: "border-bottom" });
      let groupChangeOnDateReport__borderRight = this.createElement('div', { className: "border-right"});
      let groupChangeOnDateReport = this.createElement('div', { className: "group", tabindex: '0' }, groupChangeOnDateReport__icon, groupChangeOnDateReport__description, groupChangeOnDateReport__borderBottom, groupChangeOnDateReport__borderRight );
      groupChangeOnDateReport.addEventListener('click', () => { 
          window.open(location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/ChangeOnDateReport');
      });
      let groupPartsExplorationReport__icon = this.createElement('div', { className: "icon letterIcon material-icons",  innerText: 'assignment' });
      let groupPartsExplorationReport__description = this.createElement('div', { className: "description", innerText: 'Отчет об эксплуатационном пробеге конкретной марки запчастей'});
      groupPartsExplorationReport__icon.style.color = '#2196F3';
      let groupPartsExplorationReport__borderBottom = this.createElement('div', { className: "border-bottom" });
      let groupPartsExplorationReport__borderRight = this.createElement('div', { className: "border-right"});
      let groupPartsExplorationReport = this.createElement('div', { className: "group", tabindex: '0' }, groupPartsExplorationReport__icon, groupPartsExplorationReport__description, groupPartsExplorationReport__borderBottom, groupPartsExplorationReport__borderRight );
      groupPartsExplorationReport.addEventListener('click',  () => { 
          window.open(location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/PartsExplorationReport');
      });
      let groupPartFailedReport__icon = this.createElement('div', { className: "icon letterIcon material-icons",  innerText: 'assessment' });
      let groupPartFailedReport__description = this.createElement('div', { className: "description", innerText: 'Отчет о деталях, которые не прошли эксплуатационный период'});
      groupPartFailedReport__icon.style.color = '#ff7961';
      let groupPartFailedReport__borderBottom = this.createElement('div', { className: "border-bottom" });
      let groupPartFailedReport__borderRight = this.createElement('div', { className: "border-right"});
      let groupPartFailedReport = this.createElement('div', { className: "group", tabindex: '0' }, groupPartFailedReport__icon, groupPartFailedReport__description, groupPartFailedReport__borderBottom, groupPartFailedReport__borderRight );
      groupPartFailedReport.addEventListener('click',  () => { 
          window.open(location.origin + localStorage.getItem('VirtualPath')+'/dashboard/page/PartFailedReport');
      });
      let groupsWrapper = this.createElement('div', { className: 'group-btns' }, 
      groupViewAppeals, groupRegAppeals, groupSearchTable, groupCall, 
      groupCarChangeReport, groupChangeOnDateReport, 
      groupPartsExplorationReport, 
      groupPartFailedReport);
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
