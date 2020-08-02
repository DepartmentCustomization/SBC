(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        customConfig:
                    `<div id='modalContainer'></div>
                    `
        ,
        resultsValues: [],
        resolutionsValues: [],
        init: function() {
            this.showPagePreloader('Зачекайте, файл завантажується');
            this.subscribers.push(this.messageService.subscribe('openModalForm', this.openModalForm, this));
            this.executeSelectResultQuery('h_JA_ResultsSRows', this.resultsValues);
            this.executeSelectResultQuery('h_JA_ResolutionsSRows', this.resolutionsValues);
        },
        executeSelectResultQuery: function(code, array) {
            let executeQuery = {
                queryCode: code,
                limit: -1,
                parameterValues: [
                    { key: '@pageOffsetRows', value: 0 },
                    { key: '@pageLimitRows', value: 10 }
                ]
            };
            this.queryExecutor(executeQuery, this.setResultsId.bind(this, array), this);
            this.showPreloader = false;
        },
        setResultsId: function(array, data) {
            if(data.columns.length > 2) {
                data.rows.forEach(el => {
                    array.push({
                        id: el.values[0],
                        resolutionId: el.values[1],
                        resultId: el.values[2],
                        innerText: el.values[3]
                    });
                });
            } else {
                data.rows.forEach(el => {
                    array.push({
                        innerText: el.values[1],
                        value: el.values[0]
                    });
                });
            }
        },
        openModalForm: function(message) {
            this.sendIdValue = message.id;
            const modalContainer = document.getElementById('modalContainer');
            this.createModalWindow(modalContainer);
        },
        createModalWindow: function(modalContainer) {
            this.resolutionId = '';
            this.resultId = '';
            this.comment = '';
            this.checkBoxChecked = '';
            this.selectedRows = [];
            const button_close = this.createElement('button', { id: 'button_close', className: 'modalBtn', innerText: 'Закрити' });
            const button_save = this.createElement('button',
                { id: 'button_save', className: 'modalBtn', innerText: 'Зберегти', disabled: true }
            );
            const buttonWrapper = this.createElement('div', { id: 'buttonWrapper' }, button_close, button_save);
            const resultSelectOption = this.createElement('option', { innerText: '', value: 0 });
            const resultSelect = this.createElement('select',
                { id: 'resultSelect', className: 'resultSelect selectItem js-example-basic-single' },
                resultSelectOption
            );
            const assigmResult = this.createElement('div', { id: 'assigmResult', className: 'modalItem' }, resultSelect);
            const assigmResultTitle = this.createElement('span', { className: 'assigmResultTitle caption', innerText: 'Результат' });
            const assigmResultWrapper = this.createElement('div', { className: 'assigmResultWrapper' },
                assigmResultTitle, assigmResult
            );
            const resolution__value = this.createElement('span', { id: 'resolution__value', innerText: '', resolutionId: 0 });
            const assigmResolution = this.createElement('div', { id: 'assigmResolutionValue', className: 'modalItem' },
                resolution__value
            );
            const assigmResolutionTitle = this.createElement('span',
                { className: 'assigmResultTitle caption', innerText: 'Резолюцiя' }
            );
            const assigmResolutionWrapper = this.createElement('div',
                { id: 'assigmResolution', className: 'assigmResultWrapper' },
                assigmResolutionTitle, assigmResolution
            );
            const templateSelectOption = this.createElement('option', { innerText: '', value: 0 });
            const templateSelect = this.createElement('select',
                { id: 'templateSelect', className: 'resultSelect selectItem js-example-basic-single' },
                templateSelectOption
            );
            const assigmComment = this.createElement('input',
                { type: 'text', id: 'assigmComment', className: 'modalItem', placeholder: 'Коментар' }
            );
            const modalWindow = this.createElement('div', { id: 'modalWindow' },
                assigmResultWrapper, assigmResolutionWrapper, assigmComment, buttonWrapper
            );
            const modalWrapper = this.createElement('div', { id: 'modalWrapper' }, modalWindow);
            modalContainer.appendChild(modalWrapper);
            button_close.addEventListener('click', () => {
                this.closeModal(modalContainer);
            });
            button_save.addEventListener('click', (event) => {
                let target = event.currentTarget;
                target.disabled = true;
                target.style.backgroundColor = '#cfcbcb';
                this.comment = assigmComment.value;
                this.executeSendResultQuery(modalContainer);
            });
            this.setOptions(resultSelect, this.resultsValues, this);
            this.setOptions(templateSelect, this.resolutionsValues, this);
            $('#resultSelect').on('select2:select', e => {
                e.stopImmediatePropagation();
                this.resultId = Number(e.params.data.id);
                this.showHiddenElements(this.resultId, button_save);
            });
            $('#templateSelect').on('select2:select', e => {
                e.stopImmediatePropagation();
                assigmComment.value = e.params.data.text;
            });
        },
        executeSendResultQuery: function(modalContainer) {
            let executeQuery = {
                queryCode: 'h_JA_Button',
                limit: -1,
                parameterValues: [
                    { key: '@Ids', value: this.sendIdValue },
                    { key: '@comment', value: this.comment },
                    { key: '@result_Id', value: this.resultId },
                    { key: '@resolution_Id', value: this.resolutionId }
                ]
            };
            this.queryExecutor(executeQuery, this.closeModal.bind(this, modalContainer, true), this);
            this.showPreloader = false;
        },
        closeModal: function(modalContainer, reload) {
            modalContainer.removeChild(modalContainer.firstElementChild);
            if (reload) {
                this.messageService.publish({ name: 'reloadMainTable'});
            }
        },
        setOptions: function(select, data) {
            data.forEach(el => {
                let option = this.createElement('option', { innerText: el.innerText, value: el.value, className: 'option' });
                select.appendChild(option);
            });
            this.createOptions();
        },
        showHiddenElements: function(resultId, button_save) {
            button_save.disabled = false;
            document.getElementById('resolution__value').innerText = this.getResolutionId(resultId);
            document.getElementById('resolution__value').resolutionId = this.resolutionId;
        },
        getResolutionId: function(resultId) {
            const index = this.resolutionsValues.findIndex(a => a.resultId === resultId);
            this.resolutionId = this.resolutionsValues[index].resolutionId;
            return this.resolutionsValues[index].innerText;
        },
        hideElement: function(id) {
            document.getElementById(id).classList.add('displayNone');
        },
        showElement: function(id) {
            document.getElementById(id).classList.remove('displayNone');
        },
        createOptions: function() {
            $(document).ready(function() {
                $('.js-example-basic-single').select2();
                $('.js-example-placeholder-district').select2({
                    placeholder: 'Обрати район',
                    allowClear: true
                });
                $('.js-example-placeholder-categorie').select2({
                    placeholder: 'Обрати напрямок робiт',
                    allowClear: true
                });
            });
            this.messageService.publish({ name: 'hidePagePreloader' });
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
