(function () {
  return {
    title: ' ',
    hint: ' ',
    formatTitle: function() {},
    customConfig:
                `
                <div id='infoContainer'></div>
                `
    ,
    init: function() {
        this.messageService.subscribe( 'sendEmployeeName', this.setEmployeeName, this );

        let executeQuery = {
            queryCode: 'get_organization_id',
            limit: -1,
            parameterValues: []
        };
        this.queryExecutor(executeQuery, this.getOrgId, this);
        this.showPreloader = false;
    },
    getOrgId: function(data) {
        const org_id = data.rows[0].values[0];
        const isAdminStatus = data.rows[0].values[1];
        this.isAdmin =  isAdminStatus === 1 ? true : false;
        let executeQuery = {
            queryCode: 'get_organization_name',
            limit: -1,
            parameterValues: [ { key: '@orgianization_id', value: org_id }]
        };
        this.queryExecutor(executeQuery, this.getOrgName, this);
        this.showPreloader = false;  
        this.messageService.publish( { name: 'sendOrganizationId', org_id: org_id } );
    },
    getOrgName: function(data) {
        const infoContainer = document.getElementById('infoContainer');
        const employeeCaption  = this.createElement('div', {  className: 'infoCaption box', innerText: 'Співробітник' });
        const employeeTitle  = this.createElement('div', { id: 'employeeTitle',  className: 'infoCaption box', innerText: '' });
        const employeeWrapper = this.createElement('div', { id: 'employeeWrapper', className: 'infoWrapper'}, employeeCaption, employeeTitle);
        const infoCaption  = this.createElement('div', {  className: 'infoCaption box', innerText: 'Підрозділ' });
        const infoTitle  = this.createInfo(data);
        const infoWrapper = this.createElement('div', { id: 'infoWrapper', className: 'infoWrapper'}, infoCaption, infoTitle);
        infoContainer.appendChild(infoWrapper);
        infoContainer.appendChild(employeeWrapper);
    },
    createInfo: function(data) {
        if (this.isAdmin) {
            const select = this.createElement('select', {  className: 'infoTitle box', innerText: data.rows[0].values[2] });
            this.queryOptions(select);
            
            select.addEventListener('change', event => {
                const target = event.currentTarget;
                const value = event.target.value;
                this.messageService.publish( { name: 'sendOrganizationId', org_id: value } );
            });
            return select;
        } 
        return this.createElement('div', {className: 'infoTitle box', innerText: data.rows[0].values[2] });
    },
    queryOptions: function(select) {
        let executeQuery = {
            queryCode: 'all_Organizations_for_Admin',
            limit: -1,
            parameterValues: []
        };
        this.queryExecutor(executeQuery, this.setOptions.bind(this, select), this);
        this.showPreloader = false;
    },
    setOptions: function(select, data) {
        for(let i = 0; i < data.rows.length; i++) {
            const option = this.createElement('option',
                {
                    className: 'infoTitle box',
                    label: data.rows[i].values[1],
                    id: data.rows[i].values[0],
                    value: +data.rows[i].values[0]
                }
            );
            select.appendChild(option);
        }
    },
    setEmployeeName: function(message){
        document.getElementById('employeeTitle').innerText = message.employee_name;
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
