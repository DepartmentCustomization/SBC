(function() {
    return {
        title: ' ',
        hint: '',
        formatTitle: function() {},
        googleMapConfig: {
            latitude: 50.431782,
            longitude: 30.516382,
            zoom: 10,
            type: 'roadmap',
            disableDefaultUI: true,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
        },
        global_Adress_Map: '%',
        init: function() {
            document.getElementById('maps_applications').style.display = 'none';
            this.sub = this.messageService.subscribe('showAddress', this.load_map_search_data, this);
            this.sub1 = this.messageService.subscribe('tabsClick', this.showTable);
        },
        showTable: function(message) {
            if(message.value != 'btn_maps') {
                document.getElementById('maps_applications').style.display = 'none';
            }else{
                document.getElementById('maps_applications').style.display = 'block';
            }
        },
        afterViewInit: function() {
            let executeQuery = {
                queryCode: 'Map_Claim_SwitchOff_Address_SelectRows',
                limit: -1,
                parameterValues: [{
                    key: '@Adress',
                    value: this.global_Adress_Map
                }]
            };
            this.queryExecutor(executeQuery, this.closedOgject, this);
            let executeQuery1 = {
                queryCode: 'avr_mainPage',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQuery1, this.claimsOnMaps, this);
        },
        load_map_search_data: function(message) {
            (function clearMarkers() {
                this.setMapOnAll(null);
            }.bind(this)());
            (function deleteLines() {
                this.deleteAllPolylines(null);
            }.bind(this)());
            this.global_Adress_Map = message.value;
            if (document.getElementById('map_adress_value').value == '') {
                this.global_Adress_Map = '%'
            } else {
                this.global_Adress_Map = document.getElementById('map_adress_value').value
            }
            let executeQuery = {
                queryCode: 'Map_Claim_SwitchOff_Address_SelectRows',
                limit: -1,
                parameterValues: [{
                    key: '@Adress',
                    value: this.global_Adress_Map
                }]
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        setMapOnAll: function(map) {
            for (let i = 0; i < this.marker01.length; i++) {
                this.marker01[i].setMap(map);
            }
        },
        deleteAllPolylines: function(map) {
            for (i = 0; i < this.line.length; i++) {
                if (this.line[i] != null) {
                    this.line[i].setMap(map);
                }
            }
        },
        claimsOnMaps: function(data) {
            let marker02 = [];
            this.marker02 = marker02;
            let infowindow_marker02 = [];
            claimAddress = data.columns.findIndex(el => el.code.toLowerCase() === 'name');
            claimNumber = data.columns.findIndex(el => el.code.toLowerCase() === 'claim_number');
            District = data.columns.findIndex(el => el.code.toLowerCase() === 'district');
            unit = data.columns.findIndex(el => el.code.toLowerCase() === 'organizations');
            claimType = data.columns.findIndex(el => el.code.toLowerCase() === 'full_name');
            claimDate = data.columns.findIndex(el => el.code.toLowerCase() === 'created_at');
            for (let i = 0; i < data.rows.length; i++) {
                let Lattitude = data.rows[i].values[7];
                let Longitude = data.rows[i].values[8];
                let title = String(String(data.rows[i].values[4]) + '\n' + data.rows[i].values[2] + '\n' + data.rows[i].values[1]);
                this.marker02.push(new google.maps.Marker({
                    position: new google.maps.LatLng(Lattitude, Longitude),
                    map: this.map,
                    title: String(String(data.rows[i].values[4]) + '\n' + data.rows[i].values[2] + '\n' + data.rows[i].values[1]),
                    icon: 'https://unpkg.com/leaflet@1.3.4/dist/images/marker-icon.png'
                }));
		    if(data.rows[i].values[District] == null) {
		        data.rows[i].values[District] = '';
		    }
                let contentString1 = '<div id="infowindow_marker02' + i.toString() + '" style="display: flex; max-height: 255px; width:100%;">' +
                    '</div>' +
                    '</div>' +
                    '<div style="display: inline-block; height: 100%; padding-left: 7px;">' +
                    '<p style="font-weight: bold; color: black; font-size: 16px; margin: 10px auto 5px;">' + data.rows[i].values[claimAddress] + '</p>' +
                    '<p style="margin: 5px 0 0;"> <span style="width: 90px; height: 20px; line-height: 20px; background-color: #3f7ab7; color: #fff; text-align: center; display: inline-block;"> Заявка </span></p>' +
                    '<p style="margin: 3px 0 0;">Номер заявки: <b>' + data.rows[i].values[claimNumber] + '</b></p>' +
                    '<p style="margin: 5px 0;">Район: <b>' + data.rows[i].values[District] + '</b></p>' +
                    '<p style="margin: 3px 0 0;">Пiдроздiл: <b>' + data.rows[i].values[unit] + '</b></p>' +
                    '<p style="margin: 3px 0 0;">Тип заявки: <b>' + data.rows[i].values[claimType] + '</b></p>' +
                    '<p style="margin: 3px 0 0;">Дата реєстрації: <b>' + data.rows[i].values[claimDate] + '</b></p>' +
                    `<a style="color: #3f7ab7; font-weight: bold;" href="${location.origin}${localStorage.getItem('VirtualPath')}/sections/Claims/edit/` + data.rows[i].values[claimNumber] + '"> Детальніше </a>' +
                     '</div>' +
                     '</div>';
                infowindow_marker02.push(new google.maps.InfoWindow({
                    content: contentString1
                }));
            }
            for (var i = 0; i < marker02.length; i++) {
                (function() {
                    let k = i;
                    marker02[k].addListener('click', function() {
                        my_infowindow(k);
                    });
                }.bind(this)());
            }
            function my_infowindow(val) {
                for (let i = 0; i < marker02.length; i++) {
                    infowindow_marker02[i].close();
                }
                infowindow_marker02[val].open(this.map, marker02[val]);
            }
        },
        showAddress: function(message) {
        },
        closedOgject: function(data) {
            function getHoursLeft(str) {
                let hours = parseInt(((new Date(str) - new Date()) / 3600000));
                return hours < 1 ? 0 : hours;
            }
            function getDateString(str) {
                let date = new Date(str);
                return date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU');
            }
            let indexOfLatitude = 7;
            let indexOfLongitude = 8;
            let emergencyPoints = [];
            let emergencyInfoWindows = [];
            let emergencyMarkers = [];
            let indexOfFinishDate = 6;
            let indexOfAddress = 3;
            let indexOfStartDate = 5;
            let indexOfClaimNumber = 4;
            let indexOfClaimDistrict = 1;
            let indexOfClaimPlace = 3;
            let indexOfClaimEmployee = 20;
            this.line = [];
            let marker01 = [];
            this.marker01 = marker01;
            this.flightPlanCoordinates = [];
            let infowindow_marker01 = [];
            for (var i = 0; i < data.rows.length; i++) {
                this.flightPlanCoordinatess = [{
                    lat: data.rows[i].values[7],
                    lng: data.rows[i].values[8]
                }
                ];
                this.marker01.push(new google.maps.Marker({
                    position: new google.maps.LatLng(data.rows[i].values[indexOfLatitude], data.rows[i].values[indexOfLongitude]),
                    icon: 'assets/img/red-point.png',
                    map: this.map,
                    draggable: false,
                    /* animation: google.maps.Animation.DROP,*/
                    title: 'Відключено аварійно',
                    label: ''
                }));
                // var contentString1 = '<div id="infowindow_marker01' + i.toString() + '" style="display: flex; max-height: 255px; width:100%;">' +
                //         '<div style="display: inline-block; height: 165px; min-width: 165px; background-color: #f9572b; padding: 2.2px; margin-top: auto; margin-bottom: auto;">' +
                //         '<div style="height:100%; width: 100%; border: 7px solid #fff; border-radius: 50%; text-align: center; color: #fff;">' +
                //         '<span style="font-weight: bold; font-size: 62px; display: block; margin-top: 15px;">' + getHoursLeft(data.rows[i].values[indexOfFinishDate]) + '</span>' +
                //         '<span style="font-size: 14px; display: inline-block;"> ЗАЛИШИЛОСЬ </br> ГОДИН </span>' +
                //         '</div>' +
                //         '</div>' +
                //         '<div style="display: inline-block; height: 100%; padding-left: 7px;">' +
                //         '<p style="font-weight: bold; color: black; font-size: 16px; margin: 10px auto 5px;">' + data.rows[i].values[indexOfAddress] + '</p>' +
                //         '<p style="margin: 5px 0 0;"> <span style="width: 90px; height: 20px; line-height: 20px; background-color: #3f7ab7; color: #fff; text-align: center; display: inline-block;"> Відключення </span></p>'+
                //         '<p style="margin: 5px 0 0;"> <b style="color: #999"> <i class="material-icons" style="vertical-align: middle; margin: -3px 5px 0; color: #999;">access_time</i>' + getDateString(data.rows[i].values[indexOfStartDate]) + ' - ' + getDateString(data.rows[i].values[indexOfFinishDate]) + '</b></p>' +
                //         '<p style="margin: 3px 0 0;">Номер заявки: <b>' + data.rows[i].values[indexOfClaimNumber] + '</b></p>' +
                //         '<p style="margin: 5px 0;">Район: <b>' + data.rows[i].values[indexOfClaimDistrict] + '</b></p>' +
                //         '<p style="margin: 5px 0;">Місце: <b>' + data.rows[i].values[indexOfClaimPlace] + '</b></p>' +
                //         `<a style="color: #3f7ab7; font-weight: bold;" href="${location.origin}${localStorage.getItem('VirtualPath')}/sections/Claims/edit/` + data.rows[i].values[indexOfClaimNumber] + '"> Детальніше </a>' +
                //          '</div>' +
                //          '</div>';
    		claimAddress = data.columns.findIndex(el => el.code.toLowerCase() === 'place');
    		claimNumber = data.columns.findIndex(el => el.code.toLowerCase() === 'claim');
    		District = data.columns.findIndex(el => el.code.toLowerCase() === 'district');
    		unit = data.columns.findIndex(el => el.code.toLowerCase() === 'org_short_name');
    		claimType = data.columns.findIndex(el => el.code.toLowerCase() === 'claim_type_name');
    		claimDate = data.columns.findIndex(el => el.code.toLowerCase() === 'create_date');
		    if(data.rows[i].values[District] == null) {
		        data.rows[i].values[District] = '';
		    }
                let contentString1 = '<div id="infowindow_marker02' + i.toString() + '" style="display: flex; max-height: 255px; width:100%;">' +
                    '</div>' +
                    '</div>' +
                    '<div style="display: inline-block; height: 100%; padding-left: 7px;">' +
                    '<p style="font-weight: bold; color: black; font-size: 16px; margin: 10px auto 5px;">' + data.rows[i].values[claimAddress] + '</p>' +
                    '<p style="margin: 5px 0 0;"> <span style="width: 90px; height: 20px; line-height: 20px; background-color: #3f7ab7; color: #fff; text-align: center; display: inline-block;"> Заявка </span></p>' +
                    '<p style="margin: 3px 0 0;">Номер заявки: <b>' + data.rows[i].values[claimNumber] + '</b></p>' +
                    '<p style="margin: 5px 0;">Район: <b>' + data.rows[i].values[District] + '</b></p>' +
                    '<p style="margin: 3px 0 0;">Пiдроздiл: <b>' + data.rows[i].values[unit] + '</b></p>' +
                    '<p style="margin: 3px 0 0;">Тип заявки: <b>' + data.rows[i].values[claimType] + '</b></p>' +
                    '<p style="margin: 3px 0 0;">Дата реєстрації: <b>' + data.rows[i].values[claimDate] + '</b></p>' +
                    `<a style="color: #3f7ab7; font-weight: bold;" href="${location.origin}${localStorage.getItem('VirtualPath')}/sections/Claims/edit/` + data.rows[i].values[claimNumber] + '"> Детальніше </a>' +
                     '</div>' +
                     '</div>';
                infowindow_marker01.push(new google.maps.InfoWindow({
                    content: contentString1
                }));
            }
            for (var i = 0; i < marker01.length; i++) {
                (function() {
                    let k = i;
                    marker01[k].addListener('click', function() {
                        my_infowindow(k);
                    });
                }.bind(this)());
            }
            function my_infowindow(val) {
                for (let i = 0; i < marker01.length; i++) {
                    infowindow_marker01[i].close();
                }
                infowindow_marker01[val].open(this.map, marker01[val]);
            }
        }
    };
}());
