(function() {
    return {
        config: {
            query: {
                code: 'DevExtreme_DataGrid_RowChart_SelectRows',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: "ColPercent",
                    caption: "ColPercent %",
                    dataType: "number",
                    format: "percent",
                    alignment: "right",
                    allowGrouping: false,
                    cellTemplate: "discountCellTemplate",
                    cssClass: "bullet"
                },
                {
                    dataField: "Name",
                    dataType: "Name"
                }],
            
            paging: {
                pageSize: 10
            },
            pager: {
                showPageSizeSelector: true,
                allowedPageSizes: [10, 25, 50, 100]
            },
            remoteOperations: false,
            searchPanel: {
                visible: true,
                highlightCaseSensitive: true
            },
            groupPanel: { visible: true },
            grouping: {
                autoExpandAll: false
            },
            allowColumnReordering: true,
            rowAlternationEnabled: true,
            showBorders: true,
            keyExpr: 'Id'
        },
        init: function() {
            debugger;
            this.config.columns[0].cellTemplate = this.discountCellTemplate.bind(this);
            this.loadData(this.afterLoadDataHandler);
        },

        afterLoadDataHandler: function() {
            this.render();
        },
        createElement: function(tag, props, ...children) {
            const element = document.createElement(tag);
            Object.keys(props).forEach(key => element[key] = props[key]);
            if(children.length > 0) {
                children.forEach(child =>{
                    element.appendChild(child);
                });
            } return element;
        },
        discountCellTemplate: function(container, options) {
            let ChartRow_ValueAttribute  = `{
                onIncidentOccurred: null,
                size: {
                    width: 150,
                    height: 35
                },
                margin: {
                    top: 5,
                    bottom: 0,
                    left: 5
                },
                showTarget: false,
                showZeroLevel: true,
                value: discount.value * 100,
                startScaleValue: 0,
                endScaleValue: 100,
                tooltip: {
                    enabled: true,
                    font: {
                        size: 18
                    },
                    paddingTopBottom: 2,
                    customizeTooltip: customizeTooltip,
                    zIndex: 5
                }
            }`;
            let ChartRow = this.createElement('div', { className: ''});
            ChartRow.setAttribute('dx-bullet', ChartRow_ValueAttribute);
            container.appendChild(ChartRow);

        }
    };
}());
