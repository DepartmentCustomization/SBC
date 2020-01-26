(function() {
    return {
        title: ' ',
        hint: '',
        customConfig:
                    `
                    <style>
                    .cardsWrapper{

                    }
                    .cardHeader{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        background: green !important;
                        padding: 0.4em !important;
                        color: #fff;
                    }
                    .cardInfoWrapper{
                        display: flex;
                        flex-direction: column;
                        padding: 10px;
                    }
                    .cardInfoItem{
                        border-bottom: 1px dashed black;
                        color: black;
                        padding: 10px;
                    }
                    .eventCard{
                        padding: 0.5em 1em;
                        box-shadow: 0 0 1px 1px rgba(0,0,0,.1);
                        background-color: rgb(232, 231, 231);
                        margin: 15px 10px;
                    }
                    </style>

                    <div id="containerEventCards"></div>
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
            this.eventCardsContainer = document.getElementById('eventCardsContainer');
            const queryEventCardsList = {
                queryCode: 'ak_LastCard112',
                parameterValues: [
                    { key: '@pageOffsetRows', value: 0},
                    { key: '@pageLimitRows', value: 10}
                ],
                filterColumns: [],
                limit: -1
            };
            this.queryExecutor(queryEventCardsList, this.getCards, this);
        },
        showHideAddressContent: function(message) {
            this.eventCardsContainer.style.display = message.status;
        },
        afterViewInit: function() {
            const container = document.getElementById('containerEventCards');
            this.container = container;
        },
        getCards: function(data) {
            const cardsWrapper = this.createCardsWrapper(data);
            this.container.appendChild(cardsWrapper);
        },
        createCardsWrapper: function(data) {
            const cardsWrapper = this.createElement(
                'div',
                {
                    className: 'cardsWrapper'
                }
            );
            if(data.rows.length) {
                for (let i = 0; i < data.rows.length; i++) {
                    const cardProps = data.rows[i];
                    const card = this.createCard(data, cardProps);
                    cardsWrapper.appendChild(card);
                }
            }
            return cardsWrapper;
        },
        createCard: function(data, props) {
            const indexId = data.columns.findIndex(el => el.code.toLowerCase() === 'id');
            const indexReceiptDate = data.columns.findIndex(el => el.code.toLowerCase() === 'receipt_date');
            const indexPersonPhone = data.columns.findIndex(el => el.code.toLowerCase() === 'person_phone');
            const indexContent = data.columns.findIndex(el => el.code.toLowerCase() === 'content');
            const indexFullName = data.columns.findIndex(el => el.code.toLowerCase() === 'fio');
            const idValue = props.values[indexId];
            const receiptDateValue = props.values[indexReceiptDate];
            const personPhoneValue = props.values[indexPersonPhone];
            const contentValue = props.values[indexContent];
            const fullNameValue = props.values[indexFullName];
            const card__number = this.createElement('div', {className: 'card__number', innerText: 'Номер: '});
            const curd__receiptDate = this.createElement('div',
                {className: 'card__receiptDate', innerText: this.setDateTimeValues(receiptDateValue)}
            );
            const cardHeader = this.createElement('div', {className: 'cardHeader'},
                card__number, curd__receiptDate
            );
            const cardInfo__location_icon = this.createElement('i', {className: 'fa fa-map-marker typ marker'});
            const cardInfo__location_text = this.createElement('i', {className: 'cardInfoItemText', innerText: 'Локацiя'});
            const cardInfo__location = this.createElement('div', {className: 'cardInfoItem'},
                cardInfo__location_icon, cardInfo__location_text
            );
            const cardInfo__content_icon = this.createElement('i', {className: 'fa fa-file-text typ marker'});
            const cardInfo__content_text = this.createElement('i', {className: 'cardInfoItemText', innerText: contentValue});
            const cardInfo__content = this.createElement('div', {className: 'cardInfoItem'},
                cardInfo__content_icon, cardInfo__content_text
            );
            const cardInfo__phone_icon = this.createElement('i', {className: 'fa fa-phone fa-lg  marker'});
            const cardInfo__phone_text = this.createElement('i', {className: 'cardInfoItemText', innerText: personPhoneValue});
            const cardInfo__phone = this.createElement('div', {className: 'cardInfoItem'},
                cardInfo__phone_icon, cardInfo__phone_text
            );
            const cardInfo__fullName_icon = this.createElement('i', {className: 'fa fa-user fa-lg marker'});
            const cardInfo__fullName_text = this.createElement('i', {className: 'cardInfoItemText', innerText: fullNameValue});
            const cardInfo__fullName = this.createElement('div', {className: 'cardInfoItem'},
                cardInfo__fullName_icon, cardInfo__fullName_text
            );
            const cardInfo = this.createElement('div', {className: 'cardInfoWrapper', id: idValue},
                cardInfo__location,
                cardInfo__content,
                cardInfo__phone,
                cardInfo__fullName
            );
            const card = this.createElement('div', {className: 'eventCard'},
                cardHeader, cardInfo
            );
            return card
        },
        setDateTimeValues: function() {
            let date = new Date();
            let DD = date.getDate().toString();
            let MM = (date.getMonth() + 1).toString();
            let YYYY = date.getFullYear().toString();
            DD = DD.length === 1 ? '0' + DD : DD;
            MM = MM.length === 1 ? '0' + MM : MM;
            return DD + '.' + MM + '.' + YYYY;
        }
    };
}());