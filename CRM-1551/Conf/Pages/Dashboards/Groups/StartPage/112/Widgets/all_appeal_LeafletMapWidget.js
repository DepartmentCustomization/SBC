(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        init: function() {
            this.allAppealLeafLetMap = document.getElementById('allAppealLeafLetMap');
            this.messageService.subscribe('showAllAppealLeafLetMap', this.showAllAppealLeafLetMap, this);
            this.messageService.subscribe('hideAllAppealLeafLetMap', this.hideAllAppealLeafLetMap, this);
            const queryEventCardsList = {
                queryCode: 'ak_LastCard112',
                parameterValues: [
                    { key: '@pageOffsetRows', value: 0},
                    { key: '@pageLimitRows', value: 10}
                ],
                filterColumns: [],
                limit: -1
            };
            this.queryExecutor(queryEventCardsList, this.load, this);
        },
        dataForMap: {
            claims: []
        },
        convertDateTime: function (datetime) {
            let d = new Date(datetime),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            time;

            time = yyyy + '-' + mm + '-' + dd + ' ' + h + ':' + min;
            return time;
        },
        load: function(data){
            let indexOfLatitude = 3;
            let indexOfLongitude = 2;
            let indexReceipt_date = 1;
            let indexPerson_phone = 4;
            let indexContent = 5;
            let indexFIO = 6;
            let indexIdRow = 0;

            let LeafIcon = L.Icon.extend({
                options: {
                    shadowUrl: '',
                    iconSize: [28, 28],
                    shadowSize: [50, 64]
                }
            });
            
            let yellowIcon = new LeafIcon({
                iconUrl: 'assets/img/yellow-point.png'
            });

            L.icon = function(options) {
                return new L.Icon(options);
            };

            const claims = L.layerGroup(this.dataForMap.claims);
            claims.addTo(this.map);
            claims.clearLayers();

            if (data.rows.length > 0) {
                for (let i = 0; i < data.rows.length; i++) {
                    let marker = L.marker([data.rows[i].values[indexOfLatitude], data.rows[i].values[indexOfLongitude]], {
                        icon: yellowIcon
                    }).addTo(this.map).bindPopup('<div id="infowindow_marker01' + i.toString() + '" style="display: flex; height: 173px;">' +
                        '<div style="display: inline-block; height: 100%; padding-left: 15px;">' +
                        '<p style="font-weight: bold; color: black; font-size: 16px; margin-bottom: 0px;">Подія: <b>' + data.rows[i].values[indexIdRow] + '</b></p>' +
                        '<p style="margin: 5px 0;">Дата реєстрації: <b>' + this.convertDateTime(data.rows[i].values[indexReceipt_date]) + '</b></p>' +
                        '<p style="margin: 5px 0;">Заявник: <b>' + data.rows[i].values[indexFIO] + '</b></p>' +
                        '<p style="margin: 5px 0;">Телефон заявника: <b>' + data.rows[i].values[indexPerson_phone] + '</b></p>' +
                        '<p style="margin: 5px 0;">Опис: <b>' + data.rows[i].values[indexContent] + '</b></p>' +
                        '</div></div>', {maxWidth: 800, maxHeight: 500});
                        this.dataForMap.claims.push(marker);

                        marker.IdRow = data.rows[i].values[indexIdRow];
                        marker.addEventListener("click", function(e){
                            let message = {
                                name: 'LeafletMap_SelectRow',
                                package: {
                                    IdRow: e.sourceTarget.IdRow
                                }
                            }
                            this.messageService.publish(message);
                        }.bind(this));
                };
               this.initMap();
            };

        },
        initMap(zoomLevel = 10, viewOne = 50.433841, viewTwo = 30.453244) {
           this.map.setView([Number(viewOne), Number(viewTwo)], zoomLevel);
        },
        showAllAppealLeafLetMap: function() {
            this.allAppealLeafLetMap.style.display = 'block';
        },
        hideAllAppealLeafLetMap: function() {
            this.allAppealLeafLetMap.style.display = 'none';
        }
    };
}());
