(function () {
  return {
    config: {
        query: {
            code: 'report_NKRE',
            parameterValues: [],
            filterColumns: [],
            sortColumns: [],
            skipNotVisibleColumns: true,
            chunkSize: 1000
        },
        columns: [
            {
                dataField: 'row_num',
                caption: '№ з/п перерви в водопостачанні',
                alignment: 'center',
                width: 60
            }, {
                dataField: 'Claim_ID',
                caption: 'Код джерела інформації',
                alignment: 'center',
                width: 60
            }, {
                dataField: 'Adress',
                caption: 'Адреса місця пошкодження',
                alignment: 'center',
                width: 200
            }, {
                dataField: 'switch_places_name',
                caption: 'Відключена частина мережі (перелік вулиць/будинків)',
                alignment: 'center',
                width: 250
            }, {
                dataField: 'action_name',
                caption: 'Інформація про виконані роботи',
                alignment: 'center',
                width: 150
            }, {
                caption: 'Класифікація перерв',
                alignment: 'center',
                columns: [
                    {
                        caption: 'заплановані перерви',
                        alignment: 'center',
                        columns: [
                            {
                                dataField: '6',
                                caption: 'з попередженням',
                                width: 70
                            },{
                                dataField: '7',
                                caption: 'без попередження',
                                width: 70
                            },
                        ]
                    }, {
                        caption: 'незаплановані (аварійні) перерви',
                        alignment: 'center',
                        columns: [
                            {
                                dataField: '8',
                                caption: 'форс-мажорні обставини',
                                width: 70
                            },{
                                dataField: '9',
                                caption: 'з вини інших осіб або споживачів',
                                width: 70
                            },{
                                dataField: '10',
                                caption: 'з вини ліцензіата',
                                width: 70
                            },
                        ]
                    }
                ]
                
            }, {
                dataField: 'SwitchOff_start',
                caption: 'Дата та час початку перерви   дд.мм.рррр  гг:хх',
                format: { type: 'shortDateShortTime' },
                alignment: 'center',
                width: 120
            }, {
                dataField: 'SwitchOff_finish',
                caption: 'Дата та час кінця перерви дд.мм.рррр  гг:хх',
                format: { type: 'shortDateShortTime' },
                alignment: 'center',
                width: 120
            }, {
                dataField: '13',
                caption: 'Тривалість часу під час перерви, протягом якого вода не мала подаватися за графіком, хв',
                alignment: 'center',
                width: 80
            }, {
                dataField: '14',
                caption: 'Тривалість перерви, хв.',
                alignment: 'center',
                width: 80
            }, {
                caption: 'Кількість відключених абонентів',
                alignment: 'center',
                columns: [
                    {
                        dataField: 'flat_count',
                        caption: 'побутових',
                        width: 70
                    },{
                        dataField: 'ur_count',
                        caption: 'непобутових',
                        width: 70
                    }
                ]
            },
            {
                dataField: '17',
                caption: 'Примітки',
                alignment: 'center',
                width: 150
            }, {
                dataField: '18',
                caption: 'Виявлені помилки',
                width: 170
            }
        ],
        summary: {
            totalItems: [
                {
                    column: "switch_places_name",
                    summaryType: "count",
                    customizeText: function(data) {
                        return "Всього: " + data.value + ' відключень';
                    }
                }
            ]
        },
        keyExpr: 'row_num'
    },
    init: function() {
        this.dataGridInstance.height = window.innerHeight - 80;
        this.sub = this.messageService.subscribe( 'GlobalFilterChanged', this.getFiltersParams, this );
        
        this.config.onToolbarPreparing = this.createTableButton.bind(this);
        this.config.onContentReady = this.afterRenderTable.bind(this);
    },
    getFiltersParams: function(message){
        let period = message.package.value.values.find(f => f.name === 'period').value;
        
        if( period !== '' ){
            this.dateFrom = this.convertDateTimeToDate(period.dateFrom);
            this.dateTo = this.convertDateTimeToDate(period.dateTo);
            
            this.config.query.parameterValues = [
                {key: '@dateStart' , value: this.dateFrom },
                {key: '@dateFinish' , value: this.dateTo }
            ];
            this.loadData(this.afterLoadDataHandler);
        }
    },
    convertDateTimeToDate(value) {
		if (value === '') {
			return value;
		}
		const dateTime = new Date(value);
		const year = dateTime.getFullYear();
		let day = dateTime.getDate().toString();
		let month = (dateTime.getMonth() + 1).toString();
		day = day.length === 1 ? '0' + day : day;
		month = month.length === 1 ? '0' + month : month;
		const stringDate = year + '-' + month + '-' + day;
		return new Date(stringDate);
	},
	afterRenderTable: function(){
	    this.visibleColumns = this.dataGridInstance.instance.getVisibleColumns();
	    
		let tds = document.querySelectorAll('td');
		tdsArr = Array.from(tds);
		tdsArr.forEach( el => {
		   el.style.whiteSpace = "pre-wrap";
		});
		
        let noWrapTdCollection = document.querySelectorAll('.dx-datagrid-text-content');
        let noWrapTdArr = Array.from(noWrapTdCollection);
        noWrapTdArr.forEach( td => {
            td.style.whiteSpace = "pre-wrap";
            td.parentElement.style.verticalAlign = "middle";
        });	
	},
    createTableButton: function (e) {
        let toolbarItems = e.toolbarOptions.items;

        toolbarItems.push({
            widget: "dxButton", 
            location: "after",
            options: { 
                icon: "exportxlsx",
                type: "default",
                text: "Excel",
                onClick: function(e) {
                    e.event.stopImmediatePropagation();
                    let exportQuery = {
                        queryCode: 'report_NKRE',
                        limit: -1,
                        parameterValues: [
                            {key: '@dateStart' , value: this.dateFrom },
                            {key: '@dateFinish' , value: this.dateTo }
                        ]
                    };
                    this.queryExecutor(exportQuery, this.myCreateExcel, this);
                }.bind(this)
            },
        });
    },
    myCreateExcel: function (data) {
        this.showPagePreloader('Зачекайте, формується документ');
        let visibleColumns = this.visibleColumns;
        this.columnsWithoutSub = [];
        let workbook = this.createExcel();
        let worksheet = workbook.addWorksheet('Реєстр перерв у водопостачанні', {
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
        
        worksheet.mergeCells( 'B2', 'C2' );
        let responsiblePerson = worksheet.getCell('B2');
        responsiblePerson.value = 'Відповідальна особа';
        
        let responsiblePerson__text = worksheet.getCell('D2');
        responsiblePerson__text.value = '_______________________';
        
        
        worksheet.mergeCells( 'A7', 'D7' );
        let sheetName =  worksheet.getCell('A7');
        sheetName.value = 'Реєстр перерв у водопостачанні';
        sheetName.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        
        let subdivisionName = worksheet.getCell('E7');
        subdivisionName.value = '______________';
        subdivisionName.alignment = { horizontal: 'center', wrapText: true };
        
        let subdivisionName__subname = worksheet.getCell('E8');
        subdivisionName__subname.value = '(назва підрозділу)';
        subdivisionName__subname.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        
        worksheet.mergeCells( 'K7', 'L7' );
        let licensiatName = worksheet.getCell('K7');
        licensiatName.value = '______________';
        licensiatName.alignment = {  horizontal: 'center', wrapText: true };
        
        worksheet.mergeCells( 'K8', 'L8' );
        let licensiatName__subname = worksheet.getCell('K8');
        licensiatName__subname.value = '(назва ліцензіата)';
        licensiatName__subname.alignment = {  horizontal: 'center', wrapText: true };
        
        let phoneCaption = worksheet.getCell('F2');
        phoneCaption.value = 'тел.'
        
        worksheet.mergeCells( 'G2', 'J2');
        let phoneValue = worksheet.getCell('G2');
        phoneValue.value = '_____________________';
        
        let emailCaption = worksheet.getCell('K2');
        emailCaption.value = 'e-mail'
        
        let emailCaptionValue = worksheet.getCell('L2');
        emailCaptionValue.value = '__________________';
        /*=============*/
        
        // worksheet.mergeCells('K2', 'O2');
        // let emailCaption = worksheet.getCell('K2');
        // phoneValue.value = '___________________________________________________________';
        
        
        
        
        const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
        // let captions = [];
        let columnsHeader = [];      
        for (let i = 0; i < visibleColumns.length; i++) {
            let column = visibleColumns[i];
            let caption = column.caption;
            let key = column.dataField;
            let width = 15;
            let index = 10;
            let columnProp = { caption, key, width, index };
            columnsHeader.push(columnProp);    
        }
       
        worksheet.columns = columnsHeader;
        worksheet.getRow(11).font = { name: 'Times New Roman', family: 4, size: 10, underline: false, bold: true , italic: false};
        worksheet.getRow(10).font = { name: 'Times New Roman', family: 4, size: 10, underline: false, bold: true , italic: false};
        worksheet.getRow(9).font = { name: 'Times New Roman', family: 4, size: 10, underline: false, bold: true , italic: false};
        worksheet.getRow(11).alignment = {  horizontal: 'center', wrapText: true };
        worksheet.getRow(10).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getRow(12).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getRow(9).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getRow(13).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getRow(9).height = 90;
        worksheet.getRow(10).height = 90;
        worksheet.getRow(11).height = 120;
        worksheet.getRow(12).values = numbers;
        worksheet.mergeCells( 13, 5, 13, 1 );
        let counter = worksheet.getCell(13, 5);
        counter.value =  'Всього: ' + data.rows.length + ' відключень';				

        
        worksheet.getCell('A9').alignment = { textRotation: 90, vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getCell('B9').alignment = { textRotation: 90, vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getCell('F11').alignment = { textRotation: 90, vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getCell('G11').alignment = { textRotation: 90, vertical: 'middle', horizontal: 'center' , wrapText: true};
        worksheet.getCell('H11').alignment = { textRotation: 90, vertical: 'middle', horizontal: 'center' , wrapText: true};
        worksheet.getCell('I11').alignment = { textRotation: 90, vertical: 'middle', horizontal: 'center' , wrapText: true};
        worksheet.getCell('J11').alignment = { textRotation: 90, vertical: 'middle', horizontal: 'center' , wrapText: true};
        worksheet.getCell('O10').alignment = { textRotation: 90, vertical: 'middle', horizontal: 'center' , wrapText: true};
        worksheet.getCell('P10').alignment = { textRotation: 90, vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getCell('M9').alignment = { textRotation: 90, vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getCell('N9').alignment = { textRotation: 90, vertical: 'middle', horizontal: 'center' , wrapText: true};
        worksheet.getCell('W10').alignment = { textRotation: 90, vertical: 'middle', horizontal: 'center' , wrapText: true};
        worksheet.getCell('X10').alignment = { textRotation: 90, vertical: 'middle', horizontal: 'center', wrapText: true };
        worksheet.getCell('F10').alignment = { textRotation: 90, vertical: 'middle', horizontal: 'center', wrapText: true };
        
        
        let newAllColumns = [];
        let newSub0COlumns = [];
        let newSub1COlumns = [];
        let newSub2COlumns = [];
        let newHeaders = [];
        let newCaption = []
        let position = 0;
        
        for (let i = 0; i < this.config.columns.length; i++) {
            let column = this.config.columns[i];
            let colCaption = column.caption;
            
            if( !column.dataField ) {
                let obj = {
                    caption: colCaption,
                    position
                }
                newHeaders.push(obj);
                for (  j = 0; j < column.columns.length; j++) {
                    let col1 = column.columns[j];
                    if( !col1.dataField ) {
                        let obj = {
                            isSub: true,
                            caption: col1.caption,
                            position
                        }
                        newSub1COlumns.push(obj);
                        
                        col1.columns.forEach( col2 => {
                            position++;
                            let obj = {
                                isSub: false,
                                dataField: col2.dataField,
                                caption: col2.caption,
                                position
                            }
                            newSub2COlumns.push(obj);
                             
                        });
                    } else {
                        position++;
                        let obj = {
                            isSub: false,
                            dataField: col1.dataField,
                            caption: col1.caption,
                            position
                        }
                        newSub0COlumns.push(obj);
                    }
                    
                }
            } else {
                position++;
                let obj = {
                    isSub: false,
                    dataField: column.dataField,
                    caption: colCaption,
                    position
                }
                newAllColumns.push(obj);
            }
            
        }
        
        newAllColumns.forEach( col => {
            worksheet.mergeCells( 9, col.position, 11, col.position );
            let cell = worksheet.getCell(9, col.position);
            cell.value = col.caption;
        });
        
        newSub0COlumns.forEach( col => {
            worksheet.mergeCells( 10, col.position, 11, col.position );
            let cell = worksheet.getCell(10, col.position);
            cell.value = col.caption;
        });
        
        for(let i = 0; i < newSub1COlumns.length; i++) {
            const col = newSub1COlumns[i];
            if(i === 0) { 
                worksheet.mergeCells( 10, 6, 10, 7 );
                let cell = worksheet.getCell(10, 7);
                cell.value = col.caption;
            }else if( i === 1) {
                worksheet.mergeCells( 10, 8, 10, 10 );
                let cell = worksheet.getCell(10, 10);
                cell.value = col.caption;
            }
            
        }
        
        newSub2COlumns.forEach( col => {
            worksheet.mergeCells( 11, col.position, 11, col.position );
            let cell = worksheet.getCell(11, col.position);
            cell.value = col.caption;
        });

        for(let i = 0; i < newHeaders.length; i++) {
            const header = newHeaders[i];
            if( i === 0) {
                worksheet.mergeCells( 9, newSub2COlumns[0].position, 9, newSub2COlumns[newSub2COlumns.length - 1].position );
                let cell = worksheet.getCell(9, newSub2COlumns[0].position);
                cell.value = header.caption;
            }else if(i === 1) {
                worksheet.mergeCells( 9, newSub0COlumns[0].position, 9, newSub0COlumns[newSub0COlumns.length - 1].position );
                let cell = worksheet.getCell(9, newSub0COlumns[0].position);
                cell.value = header.caption;
            }
        }
        
        for (let i = 0; i < data.rows.length; i++) {
            let rowData = data.rows[i];
            let rowValues = [];
            for( j = 0; j < rowData.values.length; j++ ) {
                let value = rowData.values[j];
                rowValues.push(value);
                
            }
            worksheet.addRow(rowValues);
        }
        
        this.helperFunctions.excel.save(workbook, 'Реєстр перерв у водопостачанні', this.hidePagePreloader);
    },
    afterLoadDataHandler: function(data) {
        this.render();
    },
    destroy: function(){
        this.sub.unsubscribe();
    }
};
}());
