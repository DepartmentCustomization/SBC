(function () {
    return {
        title: ' ',
        hint: '',
        formatTitle: function () { },
        customConfig:
            `
                  <div id='container' ></div>
                  `
        ,
        disabled: false,
        afterViewInit: function () {
            this.clearImportTable();
            const CONTAINER = document.getElementById('container');
            let fileInput = this.createElement('input', { type: 'file', className: 'inputfile', id: 'fileInput', accept: ".csv" });
            let fileLabel__triangle = this.createElement('div', { className: 'triangle fileLabel__triangle' });
            let fileLabelText = this.createElement('div', { id: 'fileChooserText', className: 'btn', innerText: ' Выбрать файл' });
            let fileLabel = this.createElement('label', { id: 'fileLabel', htmlFor: 'fileInput' }, fileLabelText, fileLabel__triangle);
            let btnImportFile__triangle = this.createElement('div', { className: 'triangle btnImportFile__triangle' });
            let btnImportFile = this.createElement('div', { className: 'btn', id: 'btnImportFile', innerText: ' Загрузить файл' }, btnImportFile__triangle);
            let btnConfirmImport__triangle = this.createElement('div', { className: 'triangle btnImportFile__triangle' });
            let btnConfirmImport = this.createElement('div', { className: 'btn', id: 'btnConfirmImport', innerText: ' Подтвердить' }, btnConfirmImport__triangle);
            let btnsWrapper = this.createElement('div', { id: 'btnsWrapper' }, fileInput, fileLabel, btnImportFile, btnConfirmImport);
            CONTAINER.appendChild(btnsWrapper);
            fileInput.addEventListener('input', event => {
                let target = event.currentTarget;
                if (target.value !== '') {
                    btnImportFile.disabled = false;
                }
            });
            btnConfirmImport.addEventListener('click', event => {
                if (this.disabled === true) {
                    this.showPagePreloader("Выполнение..");
                    let target = event.currentTarget;
                    target.disabled = true;
                    let executeQuery = {
                        queryCode: 'Insert_RunCar',
                        limit: -1,
                        parameterValues: []
                    };
                    this.queryExecutor(executeQuery, this.hidePreloader, this);
                    this.showPreloader = false;
                }
            });
          btnImportFile.addEventListener('click', () => {
                let fileInput = document.getElementById('fileInput');
                if (fileInput.files.length > 0) {
                    this.showPagePreloader("Ожидайте, файл загружается");
                    let files = fileInput.files;
                    let file = files[0];
                    let data = new FormData();
                    data.append("file", file);
                    data.append("configuration", "{\n   \"HasHeaderRecord\":true,\n   \"EncodingName\":\"windows-1251\",\n   \"Delimiter\":\";\",\n   \"Quote\":\"\\\"\",\n   \"MaxAllowedErrors\":0\n}");
                    let xhr = new XMLHttpRequest();
                    xhr.addEventListener("readystatechange", () => {
                        if (xhr.readyState === 4) {
                            let json = xhr.responseText;
                            let response = JSON.parse(json);
                            let responseNotification = {};
                            if (response.errors.length === 0) {
                                responseNotification = {
                                    title: 'Ошибок в файле не обнаружено',
                                    success: 'Обработано строк: ' + response.success
                                }
                            } else {
                                responseNotification = {
                                    title: 'Ошибка загрузки!',
                                    errorRow: 'Строка: ' + response.errors[0].row,
                                    errorColumn: 'Колонка: ' + response.errors[0].column,
                                    errorInfo: 'Ошибка: ' + response.errors[0].text
                                }
                            }
                            let responseModal = this.createElement('div', { id: 'responseModal' });
                            this.showModalWindow(responseModal, responseNotification, CONTAINER);
                        }
                    });
                    let url = window.location.origin + '/api/section/Import_RunCar/import/csv';
                    xhr.open("POST", url);
                    let token = localStorage.getItem('X-Auth-Token');
                    xhr.setRequestHeader("Authorization", 'Bearer ' + token);
                    xhr.send(data);
                }
                this.disabled = true;
            });
            let labelValue = fileLabel.innerHTML;
            fileInput.addEventListener('change', event => {
                let fileName = '';
                if (this.files && this.files.length > 1) {
                    fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
                } else {
                    fileName = event.target.value.split('\\').pop();
                }
                fileLabel.innerHTML = fileName !== '' ? fileName : labelValue;
                let fileLabel__triangle = this.createElement('div', { className: 'triangle fileLabel__triangle' });
                fileLabel.appendChild(fileLabel__triangle);
            });
        },
        hidePreloader: function (data) {
            this.hidePagePreloader();
            let responseModal = this.createElement('div', { id: 'responseModal' });
            this.showLoadInfo(responseModal, data);
        },
        showModalWindow: function (responseModal, responseNotification, CONTAINER) {
            const modalBtnTrue = this.createElement('button', { id: 'modalBtnTrue', className: 'btn', innerText: 'ОК' });
            const modalBtnWrapper = this.createElement('div', { id: 'modalBtnWrapper', className: 'modalBtnWrapper' }, modalBtnTrue);
            const contentWrapper = this.createElement('div', { id: 'contentWrapper' }, responseModal);
            const modalTitle = this.createElement('div', { id: 'modalTitle', innerText: 'Результат загрузки:' });
            const modalWindow = this.createElement('div', { id: 'modalWindow', className: 'modalWindow' }, modalTitle, contentWrapper, modalBtnWrapper);
            const modalWindowWrapper = this.createElement('div', { id: 'modalWindowWrapper', className: 'modalWindowWrapper' }, modalWindow);
            modalBtnTrue.addEventListener('click', event => {
                let target = event.currentTarget;
                target.disabled = true;
                target.style.backgroundColor = '#d7d2d1';
                this.messageService.publish({ name: 'showTable' });
                CONTAINER.removeChild(CONTAINER.lastElementChild);
            });
            let key = undefined;
            for (key in responseNotification) {
                if (key === 'title') {
                    let responseTitle = this.createElement('div', { id: 'responseTitle', className: 'responseTest', innerText: responseNotification[key] });
                    responseModal.appendChild(responseTitle);
                } else if (key === 'errorInfo') {
                    let responseErrorInfo = this.createElement('div', { id: 'responseErrorInfo', className: 'responseTest', innerText: responseNotification[key] });
                    responseModal.appendChild(responseErrorInfo);
                } else if (key === 'errorRow') {
                    let responseErrorRow = this.createElement('div', { id: 'responseErrorRow', className: 'responseError responseTest', innerText: responseNotification[key] });
                    responseModal.appendChild(responseErrorRow);
                } else if (key === 'errorColumn') {
                    let responseErrorColumn = this.createElement('div', { id: 'responseErrorColumn', className: 'responseError responseTest', innerText: responseNotification[key] });
                    responseModal.appendChild(responseErrorColumn);
                }
            }
            this.hidePagePreloader();
            CONTAINER.appendChild(modalWindowWrapper);
        },
        showLoadInfo: function (responseModal, data) {
            const CONTAINER = document.getElementById('container');
            const modalBtnTrue = this.createElement('button', { id: 'modalBtnTrue', className: 'btn', innerText: 'ОК' });
            const modalBtnWrapper = this.createElement('div', { id: 'modalBtnWrapper', className: 'modalBtnWrapper' }, modalBtnTrue);
            const contentWrapper = this.createElement('div', { id: 'contentWrapper' }, responseModal);
            const modalTitle = this.createElement('div', { id: 'modalTitle', innerText: data.rows[0].values[0] });
            const modalWindow = this.createElement('div', { id: 'modalWindow', className: 'modalWindow' }, modalTitle, contentWrapper, modalBtnWrapper);
            const modalWindowWrapper = this.createElement('div', { id: 'modalWindowWrapper', className: 'modalWindowWrapper' }, modalWindow);
            modalBtnTrue.addEventListener('click', event => {
                let target = event.currentTarget;
                target.disabled = true;
                CONTAINER.removeChild(CONTAINER.lastElementChild);
            });
            CONTAINER.appendChild(modalWindowWrapper);
        },
        createElement: function (tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if (children.length > 0) {
                children.forEach(child => {
                    element.appendChild(child);
                });
            } return element;
        },
        clearImportTable: function () {
            let clearQuery = {
                queryCode: 'Clear_Import',
                parameterValues: []
            };
            this.queryExecutor(clearQuery);
            this.showPreloader = false;
        }
    };
}());
