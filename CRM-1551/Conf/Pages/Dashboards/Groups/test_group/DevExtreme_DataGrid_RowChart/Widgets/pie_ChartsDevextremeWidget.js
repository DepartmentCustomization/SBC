(function () {
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
            size: {
                width: 500
            },
            palette: "bright",
            series: [
                {
                    argumentField: "Name",
                    valueField: "2010",
                    label: {
                        visible: true,
                        connector: {
                            visible: true,
                            width: 1
                        }
                    }
                }
            ],
            title: "Area of Countries",
            "export": {
                enabled: true
            },
            id: 'myPie'
        },
        init: function() {
            this.loadData(this.afterLoadDataHandler);
        },  
        afterLoadDataHandler: function() {
            this.render();
        }
    };
}());


/* 
        onPointClick: function (e) {
            var point = e.target;
            this.toggleVisibility(point);
        },
        onLegendClick(e) {
            var arg = e.target;
            debugger;
            const parameter = this.config.getAllSeries()[0].getPointsByArg(arg)[0];
            this.toggleVisibility();
        },
        toggleVisibility(item) {
            if(item.isVisible()) {
                item.hide();
            } else { 
                item.show();
            }
        }, */