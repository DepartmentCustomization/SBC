(function() {
    return {
        title: ' ',
        hint: '',
        customConfig:
                    `<div id='container'></div>
                    `
        ,
        executorInfo: {
            Id: null,
            Ids: null,
            Position_Organization: null,
            Position_PIB: null,
            Parent_Positions_Name: null,
            Organizations_Name: null,
            WorkDays: null
        },
        init: function() {
            this.showPagePreloader('Зачекайте, файл завантажується');
        },
        afterViewInit: function() {
            this.container = document.getElementById('container');
            const phoneNumber = this.getUrlParams();
            this.executeExecutorInfoQuery(phoneNumber);
        },
        getUrlParams: function() {
            const getUrlParams = window
                .location
                .search
                .replace('?', '')
                .split('&')
                .reduce(function(p, e) {
                    let a = e.split('=');
                    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                    return p;
                }, {}
                );
            const phoneNumber = getUrlParams.phoneNumber;
            return phoneNumber;
        },
        executeExecutorInfoQuery: function(phoneNumber) {
            let executeQuery = {
                queryCode: 'h_JA_MainInfo',
                limit: -1,
                parameterValues: [
                    {key: '@phone_number', value: phoneNumber}
                ]
            };
            this.queryExecutor(executeQuery, this.setExecutorInfo, this);
        },
        setExecutorInfo: function(data) {
            for (let i = 0; i < data.rows.length; i++) {
                const row = data.rows[i];
                for (let j = 0; j < row.values.length; j++) {
                    const value = row.values[j];
                    const code = data.columns[j].code
                    this.executorInfo[code] = value;
                }
            }
            this.createWrapper();
        },
        createWrapper: function() {
            const positionOrganization = this.createElement('div',
                {id: 'positionOrganization', className: 'itemWrapper', innerText: this.executorInfo.Position_Organization}
            );
            const positionPIB = this.createElement('div',
                {id: 'positionPIB', className: 'itemWrapper', innerText: this.executorInfo.Position_PIB}
            );
            const parentPositions = this.createItemWrapper('Підпорядковується: ', this.executorInfo.Parent_Positions_Name);
            const organizationsName = this.createItemWrapper('Організація: ', this.executorInfo.Organizations_Name, 'pointer');
            const workDays = this.createItemWrapper('Робочий час: ', this.executorInfo.WorkDays);
            const wrapper = this.createElement('div', {id: 'wrapper'},
                positionOrganization, positionPIB, parentPositions, organizationsName, workDays
            );
            this.container.appendChild(wrapper);
            this.hidePagePreloader();
        },
        createItemWrapper: function(captionText, valueText, pointer) {
            const caption = this.createElement('div', {className: 'caption', innerText: captionText});
            const value = this.createElement('div', {className: 'value', innerText: valueText});
            const parentPositions = this.createElement('div', {className: 'itemWrapper'}, caption, value);
            if (pointer) {
                parentPositions.classList.add(pointer);
                parentPositions.addEventListener('click', () => {
                    window.open(
                        location.origin +
                        localStorage.getItem('VirtualPath') +
                        '/sections/Organizations/view/' +
                        this.executorInfo.Id
                    );
                });
            }
            return parentPositions;
        },
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if (children.length > 0) {
                children.forEach(child => {
                    element.appendChild(child);
                });
            }
            return element;
        }
    };
}());
