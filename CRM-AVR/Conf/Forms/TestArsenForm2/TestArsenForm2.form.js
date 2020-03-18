(function() {
    return {
        init: function(state) {
            console.log('Init');
            let newControl = {
						    code: 'Types_id',
                fullScreen: true,
                hidden: false,
                listDisplayColumn: 'Name',
                listKeyColumn: 'Id',
                listParentIdColumn: 'Parent_сlaim_types_ID',
                lookupType: 'tree',
                placeholder: 'Тип заявки',
                position: 2,
                queryListCode: 'test_Claims_types',
                required: true,
                type: 'lookup'
            };
            this.form.addControl('group1', newControl);
            debugger;
            setTimeout(() => {
                return;
                console.log('Log from init');
            }, 3000);
        },
        validate: function() {
            console.log('Validate block: return true');
            return true;
        },
        afterSave: function(data, state) {
            console.log('After Save Hook!');
            console.log('Server response : ', data)
            const fieldsForm = {
                title: 'Дополнительное добавление',
                acceptBtnText: 'add',
                cancelBtnText: 'exit',
	        fieldGroups: [
	           {
                        code: 'TestGroup',
                        name: 'Блок заявок',
                        expand: true,
                        position: 1,
                        fields: [
					    {
                                code: 'Type_name',
                                fullScreen: true,
                                hidden: false,
                                placeholder: 'Назва заявки',
                                position: 1,
                                required: true,
                                type: 'text'
                            },
                            {
						    code: 'Types_id',
                                fullScreen: true,
                                hidden: false,
                                listDisplayColumn: 'Name',
                                listKeyColumn: 'Id',
                                listParentIdColumn: 'Parent_сlaim_types_ID',
                                lookupType: 'tree',
                                placeholder: 'Тип заявки',
                                position: 2,
                                queryListCode: 'test_Claims_types',
                                required: true,
                                type: 'lookup'
                            }
                        ]
                    }
                ]
            };
            debugger;
            const fieldsFormCallback = (res) => {
                if (res === false) {
                    this.navigateTo('sections');
                } else {
                    const body = {
                        queryCode: 'TestQuery',
                        parameterValues: res
                    };
                    this.queryExecutor.submitValues(body).subscribe();
                }
            }
            const questionForm = {
                title: 'Создана новая заявка',
                acceptBtnText: 'add',
                cancelBtnText: 'exit',
                text: 'Хотите добавить к ней что-то там? Lorem ipsum – псевдо-латинский текст, который используется для веб дизайна, типографии, оборудования, и распечатки вместо английского текста для того, чтобы сделать ударение не на содержание, а на элементы дизайна. Такой текст также называется как заполнитель. Это очень удобный инструмент для моделей (макетов).'
            };
            const questionCallback = (response) => {
                if (response === true) {
                    this.openModalForm(fieldsForm, fieldsFormCallback);
                }
            }
            this.openModalForm(questionForm, questionCallback);
        }
    };
}());
