(function() {
    return {
        formatTitle: function() {
            return `
      <style>
            #btnExport {
                    align-items:center; 
                    color: black;
                    background-color: #00ff99 !important;
                    border: 1px solid transparent;
                    border-color: #f8f9fa;
                    border-radius: .25rem;
                    font-weight: 400;
                    text-align: center;
                    padding: .6rem .9rem;
                    font-size: 0.8rem;
                }
           #btnExport:hover {
                    cursor:pointer;
                    color: #212529;
                    background-color: #e2e6ea !important;
                    border-color: #dae0e5 !important;
                }
      </style>
            <div>
                
                <div style="display:block; text-align:center; background-color: white; border-radius:5px; 
                color: #555; text-shadow: 1px 1px 2px #9E9E9E; height:43px; line-height:40px; font-weight: bold; 
                font-size:1.5em;margin-bottom:1px;padding: 2px;">
                 <span style="top: 3px;"> Поточний стан заявок</span>
                </div>
               
                <button id="btnExport" style=""> Завантажити в Excel </button>
               
            </div>
    
            `
        },
        queryCode: 'reports_current_status_claims',
        limit: 100,
        query: {
            code: 'reports_current_status_claims',
            parameterValues: [{key: '@date_from', value: ''},
                {key: '@date_to', value: ''}],
            filterColumns: [],
            skipNotVisibleColumns: true,
            chunkSize: 100
        },
        table:{
            style: {
                header: {
                    row: 'color: #660033; background-color: #ffd480; height: 56px',
                    cell: 'border: 5px solid #e69900'
                },
                body: {
                    row: 'border: none; border-bottom: 2px dashed #8a8a5c',
                    cell: 'padding: 20px 10px; color: #009; text-decoration: none'
                }
            },
            header: [{
                title: 'Організація',
                columnCode: 'org_name'
            },{
                title: 'Створено',
                columnCode: 'Created_at'
            },{
                title: 'Заявка',
                columnCode: 'Claim_Number'
            },{
                title: 'Місце',
                columnCode: 'place_name'
            },{
                title: 'Район',
                columnCode: 'district'
            },{
                title: 'Тип заявки',
                columnCode: 'Full_Name'
            },{
                title: 'D',
                columnCode: 'Size'
            },{
                title: 'Виїзди',
                columnCode: 'orders'
            },{
                title: 'Опис',
                columnCode: 'Description'
            },{
                title: 'Роботи',
                columnCode: 'actions'
            },{
                title: 'Claim_class_ID',
                columnCode: 'Claim_class_ID'
            },{
                title: 'Status_ID',
                columnCode: 'Status_ID'
            },{
                title: 'Відключення',
                columnCode: 'switch_places_name'
            },{
                title: 'Ускладнення',
                columnCode: 'description_sequela'
            },{
                title: 'Зареєстрував',
                columnCode: 'user_register'
            },{
                title: 'Закрив',
                columnCode: 'user_close'
            }
            ],
            columns:[
                {
                    columnCode: 'actions',
                    visibile: true,
                    format(cell, column, row, value) {
                        if (value === null) {
                            return '<p>' + 'Роботи відсутні' + '</p>';
                        }
                        let newVal = value.replace(/;/g, ';<br>');
                        return '<p>' + newVal + '</p>';
                    }
                },{
                    columnCode: 'orders',
                    visibile: true,
                    format(cell, column, row, value) {
                        if (value === null) {
                            return '<p>' + 'Виїзди відсутні' + '</p>';
                        }
                        let newVal = value.replace(/;/g, ';<br>');
                        return '<p>' + newVal + '</p>';
                    }
                },{
                    columnCode: 'switch_places_name',
                    visibile: true,
                    format(cell, column, row, value) {
                        if (value === null) {
                            return '<p>' + 'Відключення відсутні' + '</p>';
                        }
                        let newVal = value.replace(/;/g, ';<br>');
                        return '<p>' + newVal + '</p>';
                    }
                },{
                    columnCode: 'description_sequela',
                    visibile: true,
                    format(cell, column, row, value) {
                        if (value === null) {
                            return '<p>' + 'Ускладнення відсутні' + '</p>';
                        }
                        let newVal = value.replace(/;/g, ';<br>');
                        return '<p>' + newVal + '</p>';
                    }
                },{
                    columnCode: 'Claim_class_ID',
                    visible: false
                },{
                    columnCode: 'Status_ID',
                    visible: false
                }
            ]
        },
        sub1: [],
        init: function() {
            this.sub1.push(this.messageService.subscribe('GlobalFilterChanged', this.querySQL, this));
            let executeQuery = {
                queryCode: 'reports_current_status_claims',
                parameterValues: [],
                limit: -1
            };
            this.queryExecutor(executeQuery, this.load2, this);
        },
        afterViewInit: function() {
        },
        querySQL: function(message) {
            function claimsTypeStatus(val) {
                let valList = [];
                if(val.length > 0) {
                    for(let i = 0; i < val.length; i++) {
                        valList.push(val[i].value)
                    }
                }
                return valList.length > 0 ? valList : [''];
            }
            this.dateFrom = message.package.value.values[2].value.dateFrom;
            this.dateTo = message.package.value.values[2].value.dateTo;
            this.type = claimsTypeStatus(message.package.value.values[0].value);
            this.status = claimsTypeStatus(message.package.value.values[1].value);
            let executeQuery = {
                queryCode: 'reports_current_status_claims',
                parameterValues: [
                    {key: '@date_from' , value: this.dateFrom},
                    {key: '@date_to', value: this.dateTo }
                ],
                filterColumns: [
                    {key: 'Claim_class_ID', value: {operation: 0, not: false, values: this.type } },
                    {key: 'Status_ID', value: {operation: 0, not: false, values: this.status } }
                ]
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        querySQL2: function() {
            function claimsTypeStatus(val) {
                let valList = [];
                if(val.length > 0) {
                    for(let i = 0; i < val.length; i++) {
                        valList.push(val[i].value)
                    }
                }
                return valList.length > 0 ? valList : [''];
            }
            let exportQuery = {
                code: 'reports_current_status_claims',
                parameterValues: [
                    {key: '@date_from' , value: this.dateFrom},
                    {key: '@date_to', value: this.dateTo }],
                filterColumns: [
                    {key: 'Claim_class_ID', value: {operation: 6, not: false, values: claimsTypeStatus(this.globalFilterValues[1].value)}},
                    {key: 'Status_ID', value: {operation: 6, not: false, values: claimsTypeStatus(this.globalFilterValues[2].value)}}
                ],
                skipNotVisibleColumns: true,
                chunkSize: 100
            };
            this.getChunkedValues(exportQuery, this.myCreateExcel, this);
        },
        myCreateExcel: function(excelVal) {
            this.showPagePreloader('Подождите формируем для вас документ');
            const workbook = this.createExcel();
            let worksheet = workbook.addWorksheet('Звіт', {
                pageSetup:{orientation: 'landscape', fitToPage: false, fitToWidth: true}
            });
            worksheet.pageSetup.margins = {
                left: 0.6, right: 0.6,
                top: 1.9, bottom: 1.9,
                header: 0.3, footer: 0.3
            };
            let cell = worksheet.getCell('A1');
            let currentD = new Date();
            cell.value = 'Поточний стан заявок, станом на ' + currentD.toLocaleString();
            worksheet.mergeCells('A1:J1');
            worksheet.mergeCells('A2:J2');
            worksheet.getRow(1).font = { name: 'Times New Roman', family: 4, size: 14, underline: false, bold: true , italic: false};
            worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
            let Col1 = worksheet.getColumn(1);
            let Col2 = worksheet.getColumn(2);
            let Col3 = worksheet.getColumn(3);
            let Col4 = worksheet.getColumn(4);
            let Col5 = worksheet.getColumn(5);
            let Col6 = worksheet.getColumn(6);
            let Col7 = worksheet.getColumn(7);
            let Col8 = worksheet.getColumn(8);
            let Col9 = worksheet.getColumn(9);
            let Col10 = worksheet.getColumn(10);
            Col1.width = 11;
            Col2.width = 10;
            Col3.width = 7;
            Col4.width = 15;
            Col5.width = 7;
            Col6.width = 18;
            Col7.width = 5;
            Col8.width = 17;
            Col9.width = 17;
            Col10.width = 30;
            let rows = [['Організація','Створено','Заявка', 'Місце', 'Район','Тип заявки', 'D', 'Виїзди', 'Опис', 'Роботи']];
            if(excelVal.length > 1) {
                for(let i = 1; i < excelVal.length; i++) {
                    rows.push(excelVal[i])
                }
            }
            worksheet.addRows(rows);
            worksheet.getRow(3).font = { name: 'Times New Roman', family: 4, size: 11, underline: false, bold: true , italic: false};
            worksheet.getRow(3).alignment = { vertical: 'middle', horizontal: 'center' };
            worksheet.getCell('A3').border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}};
            worksheet.getCell('B3').border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}};
            worksheet.getCell('C3').border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}};
            worksheet.getCell('D3').border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}};
            worksheet.getCell('E3').border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}};
            worksheet.getCell('F3').border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}};
            worksheet.getCell('G3').border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}};
            worksheet.getCell('H3').border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}};
            worksheet.getCell('I3').border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}};
            worksheet.getCell('J3').border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}};
            worksheet.getCell('A3').fill = {type: 'pattern', pattern: 'solid', fgColor:{argb:'ebebe0'}};
            worksheet.getCell('B3').fill = {type: 'pattern', pattern: 'solid', fgColor:{argb:'ebebe0'}};
            worksheet.getCell('C3').fill = {type: 'pattern', pattern: 'solid', fgColor:{argb:'ebebe0'}};
            worksheet.getCell('D3').fill = {type: 'pattern', pattern: 'solid', fgColor:{argb:'ebebe0'}};
            worksheet.getCell('E3').fill = {type: 'pattern', pattern: 'solid', fgColor:{argb:'ebebe0'}};
            worksheet.getCell('F3').fill = {type: 'pattern', pattern: 'solid', fgColor:{argb:'ebebe0'}};
            worksheet.getCell('G3').fill = {type: 'pattern', pattern: 'solid', fgColor:{argb:'ebebe0'}};
            worksheet.getCell('H3').fill = {type: 'pattern', pattern: 'solid', fgColor:{argb:'ebebe0'}};
            worksheet.getCell('I3').fill = {type: 'pattern', pattern: 'solid', fgColor:{argb:'ebebe0'}};
            worksheet.getCell('J3').fill = {type: 'pattern', pattern: 'solid', fgColor:{argb:'ebebe0'}};
            let row_val = 3;
            for(let i = 1; i < excelVal.length; i++) {
                worksheet.getRow((i + row_val)).alignment = { vertical: 'middle', horizontal: 'center' , wrapText: true};
                worksheet.getRow((i + row_val)).font = { name: 'Times New Roman', family: 4, size: 10,
                    underline: false, bold: false, strike: false };
                worksheet.getCell('A' + (i + 3)).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},
                    right: {style:'thin'}};
                worksheet.getCell('B' + (i + 3)).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},
                    right: {style:'thin'}};
                worksheet.getCell('C' + (i + 3)).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},
                    right: {style:'thin'}};
                worksheet.getCell('D' + (i + 3)).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},
                    right: {style:'thin'}};
                worksheet.getCell('E' + (i + 3)).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},
                    right: {style:'thin'}};
                worksheet.getCell('F' + (i + 3)).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},
                    right: {style:'thin'}};
                worksheet.getCell('G' + (i + 3)).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},
                    right: {style:'thin'}};
                worksheet.getCell('H' + (i + 3)).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},
                    right: {style:'thin'}};
                worksheet.getCell('I' + (i + 3)).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},
                    right: {style:'thin'}};
                worksheet.getCell('J' + (i + 3)).border = {top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'},
                    right: {style:'thin'}};
            }
            this.helperFunctions.excel.save(workbook, 'Звіт по поточним заявкам', this.hidePagePreloader);
        },
        load2:function() {
            let btn = document.getElementById('btnExport');
            btn.addEventListener('click', ()=>{
                this.querySQL2();
            });
        },
        destroy: function() {
            this.sub1.forEach(item => {
                item.unsubscribe();
            })
        }
    };
}());
