(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        customConfig:
                `
                <div  id='employeeContainer' ></div>
                `
        ,
        init: function() {
            this.sub = this.messageService.subscribe('sendEmployeeName', this.getEmployeeId, this);
            this.sub1 = this.messageService.subscribe('reloadTimeCounter', this.reloadTimeCounter, this);
            let executeQuery = {
                queryCode: 'schedule_month',
                limit: -1,
                parameterValues: [
                    { key: '@pageOffsetRows', value: 0 },
                    { key: '@pageLimitRows', value: 12 }
                ]
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        load: function(data) {
            const employeeContainer = document.getElementById('employeeContainer');
            const timeCounterCaption = this.createElement('div', { className: 'infoCaption box', innerText: 'Кiлькiсть годин' });
            const timeCounterTitle = this.createElement('div', { id: 'timeCounterTitle', className: 'infoCaption box', innerText: '' });
            const timeCounterWrapper = this.createElement('div', { id: 'timeCounterWrapper', className: 'infoWrapper'}, timeCounterCaption, timeCounterTitle);
            const monthSelect = this.createElement('select', { id: 'monthSelect', className: 'dateSelect  box'});
            const date = new Date();
            const month = date.getMonth()
            for(let i = 0; i < data.rows.length; i++) {
                let item = data.rows[i];
                const monthOption = this.createElement('option', {label: String(String(item.values[1])), value: String(String(item.values[0])), className: 'monthOption'});
                if(month == item.values[0]) {
                    monthOption.selected = true;
                    this.month = month;
                }
                monthSelect.appendChild(monthOption);
            }
            let currentYear = date.getFullYear();
            let previousYear = currentYear - 1;
            let currentYearLabel = currentYear.toString();
            let previuosYearLabel = previousYear.toString();
            const yearOption1 = this.createElement('option', { label: currentYearLabel, value: currentYear, className: 'yearOption'});
            const yearOption2 = this.createElement('option', { label: previousYear, value: previousYear, className: 'yearOption'});
            const yearSelect = this.createElement('select', { id: 'yearSelect', className: 'dateSelect  box'}, yearOption1, yearOption2);
            this.year = Number(yearSelect.value);
            const valuesWrapper = this.createElement('div', { className: 'valuesWrapper' }, monthSelect, yearSelect);
            const dateCaption = this.createElement('div', { className: 'infoCaption  box', innerText: 'Місяць i рiк' });
            const dateWrapper = this.createElement('div', { id: 'dateWrapper', className: 'infoWrapper'}, dateCaption, valuesWrapper);
            employeeContainer.appendChild(dateWrapper);
            employeeContainer.appendChild(timeCounterWrapper);
            this.setThisDate();
            monthSelect.addEventListener('change', event => {
                let target = event.currentTarget;
                this.month = Number(target.value);
                this.setThisDate();
                this.sendDateMessage();
                this.messageService.publish({
                    name: 'disabledCreateBtn', value: false
                });
            });
            yearSelect.addEventListener('change', event => {
                let target = event.currentTarget;
                this.month -= 1;
                this.year = Number(target.value);
                this.setThisDate();
                this.sendDateMessage();
                this.messageService.publish({ name: 'disabledCreateBtn', value: false });
            });
        },
        sendDateMessage: function() {
            this.messageService.publish({
                name: 'getSetDate',
                monthNumber: this.month,
                yearNumber: this.year,
                dayCounter: this.dayCounter,
                dayStart: this.start_date,
                employeeId: this.employeeId
            });
        },
        getEmployeeId: function(message) {
            this.employeeId = message.employee_id;
            this.sendDateMessage();
        },
        reloadTimeCounter: function() {
            let executeQuery = {
                queryCode: 'avr_timeSheet_Select_countTime',
                limit: -1,
                parameterValues: [
                    { key: '@month', value:  this.month },
                    { key: '@year', value:  this.year },
                    { key: '@job_id', value: this.employeeId }
                ]
            };
            this.queryExecutor(executeQuery, this.setHoursCounter, this);
            this.showPreloader = false;
        },
        setThisDate: function(message) {
            this.month += 1;
            let myMonth;
            myMonth = this.month < 10 ? '0' + this.month : this.month;
            const val = String(String(myMonth) + ' 01 ' + this.year);
            this.start_date = extractStartDate(val);
            this.finish_date = extractEndDate(this.start_date);
            this.dayCounter = extractDayCounter(this.start_date);
            function extractStartDate(val) {
                let today = new Date(val);
                inMonth = new Date(val);
                inMonth.setMonth(today.getMonth());
                let mm = inMonth.getMonth(val) + 1; //January is 0!
                let yyyy = inMonth.getFullYear();
                if(mm < 10) {
                    mm = '0' + mm
                }
                return yyyy + '-' + mm + '-' + '01 00:00:00';
            }
            function extractEndDate(val) {
                let today = new Date(val);
                inMonth = new Date(val);
                inMonth.setMonth(today.getMonth() + 1);
                inMonth.setDate(-0);
                let dd = inMonth.getDate() - 0;
                let mm = inMonth.getMonth() + 1;
                let yyyy = inMonth.getFullYear();
                let hh = inMonth.getHours();
                let mi = inMonth.getMinutes();
                let ss = inMonth.getSeconds();
                if(dd < 10) {
                    dd = '0' + dd
                }
                if(mm < 10) {
                    mm = '0' + mm
                }
                if(hh < 10) {
                    hh = '0' + hh
                }
                if(mi < 10) {
                    mi = '0' + mi
                }
                if(ss < 10) {
                    ss = '0' + ss
                }
                return yyyy + '-' + mm + '-' + dd + ' 00:00:00';
            }
            function extractDayCounter(val) {
                let today = new Date(val);
                inMonth = new Date(val);
                inMonth.setMonth(today.getMonth() + 1);
                inMonth.setDate(-0);
                let dd = inMonth.getDate() - 0;
                if(dd < 10) {
                    dd = '0' + dd
                }
                return dd;
            }
            function getMonth(val) {
                if(val == 1) {
                    return 'Січень'
                } else if(val == 2) {
                    return 'Лютий'
                } else if(val == 3) {
                    return 'Березень'
                } else if(val == 4) {
                    return 'Квітень'
                } else if(val == 5) {
                    return 'Травень'
                } else if(val == 6) {
                    return 'Червень'
                } else if(val == 7) {
                    return 'Липень'
                } else if(val == 8) {
                    return 'Серпень'
                } else if(val == 9) {
                    return 'Вересень'
                } else if(val == 10) {
                    return 'Жовтень'
                } else if(val == 11) {
                    return 'Листопад'
                } else if(val == 12) {
                    return 'Грудень'
                }
            }
        },
        setHoursCounter: function(data) {
            const el = document.getElementById('timeCounterTitle');
            el.innerText = data.rows[0] ? data.rows[0].values[0] === null ? '' : data.rows[0].values[0] : '';
        },
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if(children.length > 0) {
                children.forEach(child =>{
                    element.appendChild(child);
                });
            } return element;
        }
    };
}());
