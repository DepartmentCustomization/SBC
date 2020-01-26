(function() {
    return {
        title: ' ',
        hint: '',
        customConfig:
                    `
                    <style>
                    #algorithmWrapper{

                    }
                    </style>

                    <div id="containerEventAlgorithm"></div>
                    `
        ,
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if(children.length) {
                children.forEach(child =>{
                    element.appendChild(child);
                });
            }
            return element;
        },
        init: function() {
            this.eventAlgorithmContainer = document.getElementById('eventAlgorithmContainer');
            this.messageService.subscribe('sendCategoryId', this.executeAlgorithmQuery, this);
        },
        showHideAddressContent: function(message) {
            this.eventCardsContainer.style.display = message.status;
        },
        afterViewInit: function() {
            const container = document.getElementById('containerEventAlgorithm');
            this.container = container;
            const algorithmWrapper = this.createAlgorithmWrapper();
            this.algorithmWrapper = algorithmWrapper;
            this.container.appendChild(algorithmWrapper);
        },
        createAlgorithmWrapper: function() {
            const algorithmWrapper = this.createElement(
                'div',
                {
                    id: 'algorithmWrapper'
                }
            );
            return algorithmWrapper;
        },
        executeAlgorithmQuery: function(message) {
            const id = message.id;
            const queryAlgorithm = {
                queryCode: 'ak_EventAlgorithm112',
                parameterValues: [
                    { key: '@event_category_id', value: id}
                ],
                filterColumns: [],
                limit: -1
            };
            this.queryExecutor(queryAlgorithm, this.createCategoryAlgorithm, this);
        },
        createCategoryAlgorithm: function() {
            const categoryAlgorithm = this.createElement('div', {className: 'categoryAlgorithm'});
            this.algorithmWrapper.appendChild(categoryAlgorithm);
        }
    };
}());
