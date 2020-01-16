(function() {
    return {
        config: {
            query: {
                code: 'ClaimsSelect_Table_Report',
                parameterValues: [],
                filterColumns: [],
                sortColumns: [],
                skipNotVisibleColumns: true,
                chunkSize: 1000
            },
            columns: [
                {
                    dataField: 'ClaimId',
                    caption: 'Номер заявки',
                },
                {
                    dataField: 'created_at',
                    caption: 'Дата заявки',
                },
                {
                    dataField: 'claim_direction',
                    caption: 'Напрямок заявки',
                },
                {
                    dataField: 'claim_type',
                    caption: 'Тип заявки',
                },
                {
                    dataField: 'Adress',
                    caption: 'Місце заявки',
                },
                {
                    dataField: 'claim_state',
                    caption: 'Стан заявки',
                },
                {
                    dataField: 'control_date',
                    caption: 'Контрольна дата',
                },
                {
                    dataField: 'executed_at',
                    caption: 'Дата виконання',
                },
                {
                    dataField: 'executor',
                    caption: 'Відповідальний працівник',
                },
                {
                    dataField: 'org_executor',
                    caption: 'Підрозділ (відповідального працівника)',
                },
                {
                    dataField: 'applicantPIB',
                    caption: 'ПІБ заявника',
                }
            ],
            columnChooser: {
                enabled: true
            },
            sorting: {
                mode: 'multiple'
            },
            showBorders: false,
            showColumnLines: true,
            showRowLines: true,
            remoteOperations: null,
            allowColumnReordering: null,
            rowAlternationEnabled: null,
            columnAutoWidth: true,
            hoverStateEnabled: true,
            columnWidth: null,
            wordWrapEnabled: true,
            allowColumnResizing: true,
            showFilterRow: true,
            showHeaderFilter: false,
            showColumnChooser: true,
            showColumnFixing: true,
            groupingAutoExpandAll: null
        },
        init: function() {
            let msg = {
                name: 'SetFilterPanelState',
                package: {
                    value: true
                }
            };
            this.messageService.publish(msg);
            this.sub = this.messageService.subscribe('FiltersParams', this.setFiltersParams, this);
            this.sub1 = this.messageService.subscribe('ApplyGlobalFilters', this.renderTable, this);
            this.config.onContentReady = this.onMyContentReady.bind(this);
            this.config.onToolbarPreparing = this.createTableButton.bind(this);
        },
        setFiltersParams: function(message) {
            this.dateStart = message.dateStart;
            this.dateEnd = message.dateEnd;
            this.executor = message.executor;
            this.claimType = message.claimType;
            this.config.query.parameterValues = [
                {key: '@DateStart' , value: this.dateStart },
                {key: '@DateEnd' , value: this.dateEnd },
                {key: '@OrgId', value: this.executor },
                {key: '@TypeId', value: this.claimType }
            ];
        },
        renderTable: function() {
            let msg = {
                name: 'SetFilterPanelState',
                package: {
                    value: false
                }
            };
            this.messageService.publish(msg);
            this.loadData(this.afterLoadDataHandler);
        },
        createTableButton: function(e) {
            let toolbarItems = e.toolbarOptions.items;
            toolbarItems.push({
                widget: 'dxButton',
                location: 'after',
                options: {
                    icon: 'exportxlsx',
                    type: 'default',
                    text: 'Excel',
                    onClick: function(e) {
                        e.event.stopImmediatePropagation();
                        let exportQuery = {
                            queryCode: this.config.query.code,
                            limit: -1,
                            parameterValues: this.config.query.parameterValues
                        };
                        this.queryExecutor(exportQuery, this.myCreateExcel, this);
                        this.showPreloader = false;
                    }.bind(this)
                },
            });
        },
        myCreateExcel: function(data) {
            this.showPagePreloader('Зачекайте, формується документ');
            let visibleColumns = this.visibleColumns;
            this.columnsWithoutSub = [];
            let workbook = this.createExcel();
            let worksheet = workbook.addWorksheet('Заявки', {
                pageSetup:{
                    orientation: 'landscape',
                    fitToPage: false,
                }
            });
            worksheet.pageSetup.margins = {
                left: 0.4, right: 0.3,
                top: 0.4, bottom: 0.4,
                header: 0.0, footer: 0.0
            };
            let emptyCellInfoCaption = worksheet.getCell('A1');
            emptyCellInfoCaption.value = ' ';
            let captions = [];
            let columnsHeader = [];
            for (let i = 0; i < visibleColumns.length; i++) {
                let column = visibleColumns[i];
                let caption = column.caption;
                captions.push(caption);
                let header = '';
                let key = '';
                let width = 20;
                let index = 10;
                let columnProp = { header, key, width, index };
                columnsHeader.push(columnProp);
            }
            worksheet.columns = columnsHeader;
            worksheet.getRow(5).values = captions;
            worksheet.getRow(5).font = { name: 'Times New Roman', family: 4, size: 10, underline: false, bold: true , italic: false};
            worksheet.getRow(4).font = { name: 'Times New Roman', family: 4, size: 10, underline: false, bold: true , italic: false};
            worksheet.getRow(5).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            worksheet.getRow(4).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            worksheet.getRow(4).height = 70;
            worksheet.getRow(5).height = 70;
            this.subColumnCaption = [];
            this.allColumns = [];
            this.subIndex = 0;
            let resultColumns = [];
            for (let i = 0; i < this.config.columns.length; i++) {
                let column = this.config.columns[i];
                let colCaption = column.caption;
                if(!column.dataField) {
                    column.columns.forEach(col => {
                        let length = 0;
                        let colIndexTo = 0;
                        if(this.subColumnCaption.length > 0) {
                            if(this.subColumnCaption[this.subColumnCaption.length - 1].colCaption !== colCaption) {
                                let obj = {
                                    colCaption,
                                    length,
                                    colIndexTo
                                }
                                this.subColumnCaption.push(obj);
                                this.subIndex++;
                            }
                        } else{
                            let obj = {
                                colCaption,
                                length,
                                colIndexTo
                            }
                            this.subColumnCaption.push(obj);
                        }
                        let obj = {
                            isSub: true,
                            index: this.subIndex,
                            dataField: col.dataField,
                            caption: colCaption
                        }
                        this.allColumns.push(obj);
                    });
                }else{
                    let obj = {
                        isSub: false,
                        dataField: column.dataField,
                        caption: colCaption
                    }
                    this.allColumns.push(obj);
                }
            }
            for (let i = 0; i < visibleColumns.length; i++) {
                const visCol = visibleColumns[i];
                let df = visCol.dataField;
                let index = this.allColumns.findIndex(el => el.dataField === df);
                resultColumns.push(this.allColumns[index]);
            }
            for (let i = 0; i < resultColumns.length; i++) {
                const resCol = resultColumns[i];
                const colIndexTo = i+1;
                let indexCaptionFrom;
                if(resCol.isSub === true) {
                    if(this.subColumnCaption.length > 0) {
                        let group = this.subColumnCaption[resCol.index];
                        if(group.colCaption === resCol.caption) {
                            group.length ++;
                            group.colIndexTo = colIndexTo;
                        }
                    }
                    indexCaptionFrom = 5;
                }else{
                    let caption = resCol.caption;
                    let column = { caption, colIndexTo }
                    indexCaptionFrom = 4;
                    this.columnsWithoutSub.push(column);
                }
                worksheet.mergeCells(indexCaptionFrom, colIndexTo, 5, colIndexTo);
            }
            this.subColumnCaption.forEach(col => {
                let indexFrom = col.colIndexTo - col.length + 1;
                let indexTo = col.colIndexTo;
                if(col.length > 0) {
                    worksheet.mergeCells(4, indexFrom, 4, indexTo);
                    let caption = worksheet.getCell(4, indexFrom);
                    caption.value = col.colCaption;
                }
            });
            for (let i = 0; i < this.columnsWithoutSub.length; i++) {
                let element = this.columnsWithoutSub[i];
                let caption = worksheet.getCell(4, element.colIndexTo);
                caption.value = element.caption;
            }
            for (let i = 0; i < data.rows.length; i++) {
                let rowData = data.rows[i];
                let rowValues = [];
                for (let j = 0; j < resultColumns.length; j++) {
                    const element = resultColumns[j];
                    let index = data.columns.findIndex(el => el.code === element.dataField);
                    rowValues[j] = rowData.values[index];
                }
                worksheet.addRow(rowValues);
            }
            this.helperFunctions.excel.save(workbook, 'Заявки', this.hidePagePreloader);
        },
        afterLoadDataHandler: function() {
            this.render();
        },
        onMyContentReady: function() {
            this.visibleColumns = this.dataGridInstance.instance.getVisibleColumns();
        },
        destroy: function() {
        },
    };
}());
