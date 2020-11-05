(function() {
    return {
        config: {
            query: {
                code: 'DamageCounting_capture',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
            ],
            keyExpr: 'Id',
            scrolling: {
                mode: 'virtual'
            },
            filterRow: {
                visible: true,
                applyFilter: 'auto'
            },
            showBorders: false,
            showColumnLines: false,
            showRowLines: true,
            remoteOperations: null,
            allowColumnReordering: null,
            rowAlternationEnabled: null,
            columnAutoWidth: null,
            hoverStateEnabled: true,
            columnWidth: null,
            wordWrapEnabled: true,
            allowColumnResizing: true,
            showFilterRow: true,
            showHeaderFilter: true,
            showColumnChooser: false,
            showColumnFixing: true,
            groupingAutoExpandAll: null
        },
        init: function() {
            this.dataGridInstance.height = window.innerHeight - 150;
            this.sub = this.messageService.subscribe('GlobalFilterChanged', this.getFiltersParams, this);



        },
        columnData: [],
        recalColumns: function() {
            let executeQuery = {
                    queryCode: 'DamageCounting_capture',
                    parameterValues: [
                                        { key: '@dateFrom', value: this.dateFrom },
                                        { key: '@dateTo', value: this.dateTo },
                                        { key: '@variant', value:  this.variant },
                                        { key: '@vision', value:  this.vision },
                                        { key: '@orgId', value:  this.orgVal }
                                    ]
                };
            this.queryExecutor(executeQuery, this.loadColumns, this);
        },
        loadColumns: function(data){
            debugger;
            // var data; // parse the JSON into here
            var nodeTargets = [];
            var nodeParents = [];
            data.rows.forEach(function(x) {
                var source = x.values[1];
                var target = x.values[0];
                
                if (!nodeTargets[source]) {
                    nodeTargets[source] = []
                }
                nodeTargets[source].push(target);

                nodeParents[target] = source;
            });


            tree = function (object) {
                var o = {}, children = {};

                o[0] = { name: "All" };
                object.rows.forEach(function (a, i) {
                    o[a.values[0]] = { name: a.values[3] };
                });
        
                object.rows.forEach(function (a) {
                    // debugger;
                    o[a.values[0]].parent = (o[a.values[1]] ? o[a.values[1]].name : '');
                    o[a.values[1]].children = (o[a.values[1]] ? o[a.values[1]].children || [] : null);
                    o[a.values[1]].children.push(o[a.values[0]]);
                    children[a.values[0]] = true;
                });
        
                return Object.keys(o).filter(function (k) {
                    return !children[k];
                }).map(function (k) {
                    return o[k];
                });

            }(data);
            debugger;

            // var buildNode = function(index) {

            //     var children = nodeTargets[index].map(function(x) {
            //         return buildNode(x);
            //     });

            //     var parentIndex = nodeParents[index];
            //     var parentName;
            //     if (parentIndex !== undefined) {
            //         parentName = data.rows[parentIndex].values[2];
            //     }
            //     return {
            //         name: data.rows[index].values[2],
            //         code: data.rows[index].values[3],
            //         parent: parentName,
            //         children: children
            //     };
            // };

            // var tree = buildNode(0);

            // var data; // parse the JSON into here
            var index = 0;
            var buildNode = function(index) {
            
                var children = data.rows.filter(function(x) {
                    return x.values[1] === index;
                }).map(function(x) {
                    return buildNode(x.values[0]);
                });

               

                //with ES6 you can use .find to get the first matching item, instead of .filter and [0]
                var parent = data.rows.filter(function(x) {
                    return x.values[1] === index;
                })[0];
                var parentName = parent ? parent.values[3] : undefined;
            
                return {
                    name: (data.rows[index] ? data.rows[index].values[3] : undefined),
                    parent: parentName,
                    children: children
                };
             };
            
            // var tree = buildNode(0);

            debugger;
        },
        changeDateTimeValues: function(value) {
            let trueDate;
            if (value !== null) {
                let date = new Date(value);
                let dd = date.getDate();
                let MM = date.getMonth();
                let yyyy = date.getFullYear();
                let HH = date.getUTCHours()
                let mm = date.getMinutes();
                MM += 1;
                if ((dd.toString()).length === 1) {
                    dd = '0' + dd;
                }
                if ((MM.toString()).length === 1) {
                    MM = '0' + MM;
                }
                if ((HH.toString()).length === 1) {
                    HH = '0' + HH;
                }
                if ((mm.toString()).length === 1) {
                    mm = '0' + mm;
                }
                trueDate = dd + '.' + MM + '.' + yyyy;
            } else {
                trueDate = ' ';
            }
            return trueDate;
        },
        getFiltersParams: function(message) {
            let period = message.package.value.values.find(f => f.name === 'period').value;
            let orgVal = message.package.value.values.find(f => f.name === 'division').value;
            let variant = 'short';
            let vision = null;
            this.config.query.filterColumns = [];
            if (period !== null) {
                if (period.dateFrom !== '' && period.dateTo !== '') {
                    this.dateFrom = period.dateFrom;
                    this.dateTo = period.dateTo;
                    this.variant = variant;
                    this.vision = vision;
                    this.orgVal = this.extractValues(orgVal);
                    this.config.query.parameterValues = [
                        { key: '@dateFrom', value: this.dateFrom },
                        { key: '@dateTo', value: this.dateTo },
                        { key: '@variant', value:  this.variant },
                        { key: '@vision', value:  this.vision },
                        { key: '@orgId', value:  this.orgVal }
                    ];
                    // this.loadData(this.afterLoadDataHandler);
                }
            }
            this.recalColumns();
        },
        extractValues: function(items) {
            if(items.length && items !== '') {
                const valuesList = [];
                items.forEach(item => valuesList.push(item.value));
                return valuesList.join(', ');
            }
            return [];
        },
        afterLoadDataHandler: function() {
            this.render();
        },
        destroy: function() {
            this.sub.unsubscribe();
        }
    };
}());
