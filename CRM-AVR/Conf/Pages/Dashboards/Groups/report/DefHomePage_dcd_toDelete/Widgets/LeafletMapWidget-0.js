(function () {
  return {
  sub1: {},
    sub2: {},
    sub3: {},
    sub4: {},
    marker01: [],
    line: [],
    flightPlanCoordinate: [],
    markerCluster: null,
        title: [],
    hint: '',
     formatTitle: function() {
        // leaflet  doesn't see the styles below. These styles applied  via title widget
        
        `
        <style>
        
            .leaflet-popup-content-wrapper{
                height: 500px;
            }
            
            .leaflet-popup-content, .leaflet-popup-scrolled {
                overflow: hidden;
            }
            .customPopup {
                background: #ff9800 !important;
            }
            
            .customPopup .leaflet-popup-content {
                margin-top: 3px;
                margin-bottom: 3px;
                margin-right: 10px;
                margin-left: 10px;
                line-height: 1.3;
            }
            
             .customPopup .leaflet-popup-content p {
                 margin: 5px 0;
             }
   </style>          
        `
    },
    global_Adress_Map: "%",
   setMapOnAll: function(map) {
        for (var i = 0; i < this.marker01.length; i++) {
            this.marker01[i].setMap(map);
        };
    },

    deleteAllPolylines: function(map) {

        for (i = 0; i < this.line.length; i++) {
            if (this.line[i] != null) {
                this.line[i].setMap(map);
            }
        };
    },
    googleMapConfig: {
        latitude: 50.431782,
        longitude: 30.516382,
        zoom: 9,
        type: 'roadmap',
        disableDefaultUI: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
    },
    init: function() {
        
   
        let self = this;
        
        
        function func() {
                var jsId = 'myJS'; // you could encode the css path itself to generate id..
                if (!document.getElementById(jsId)) {
                    var head = document.getElementsByTagName('head')[0];
                    var script = document.createElement('script');
                    script.id = jsId;
                    //script.rel  = 'stylesheet';
                    script.type = 'text/javascript';
                    script.src = 'markerclusterer.js';
                    head.appendChild(script);
                    }
     
        
                
        let myBtn = document.getElementById('btn_map_adress_search');
        myBtn.addEventListener( "click" , () => { self.load_map_search_data() } );

        
        
        let executeQuery = {
            queryCode: 'Map_Claim_SwitchOff_Address_SelectRows',
            limit: -1,
            parameterValues: [{
                    key: '@Adress',
                    value: '%'
                }]
        };
        self.queryExecutor(executeQuery, self.load, self);
        
        
        };
        setTimeout(func, 200);
 
    },
    
    load_map_search_data: function() {
         
         
           (function clearMarkers() {
            this.setMapOnAll(null);
        }.bind(this)());
        
        
                
         (function deleteLines() {
            this.deleteAllPolylines(null);

        }.bind(this)());
         
         if (document.getElementById('map_adress_value').value == "") {this.global_Adress_Map = "%"} else {this.global_Adress_Map = document.getElementById('map_adress_value').value};
         
         
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
    
    load: function(data) {
        
        function getHoursLeft(str) {
            let hours = parseInt(((new Date(str) - new Date()) / 3600000));
            return hours < 1 ? 0 : hours;
        }
        
        function getDateString(str) {
            let date = new Date(str);
            return date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU');
        }
        
       // debugger;
         let indexOfLatitude = 7;
        let indexOfLongitude = 8;

        let emergencyPoints = [];

        let emergencyInfoWindows = [];

        var emergencyMarkers = [];

        let indexOfFinishDate = 6;
        let indexOfAddress = 3;
        let indexOfStartDate = 5;
        let indexOfClaimNumber = 4;
        let indexOfClaimDistrict = 1;
        let indexOfClaimPlace = 3;
        let indexOfClaimEmployee = 20;


           this.line = [];
        //this.line = line;

        
        let marker01 = [];
        this.marker01 = marker01;
        

        
        this.flightPlanCoordinates = [];
        //this.flightPlanCoordinates = flightPlanCoordinates;
        
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
            var contentString1 = '<div id="infowindow_marker01' + i.toString() + '" style="display: flex; max-height: 255px; width:100%;">' +
                    '<div style="display: inline-block; height: 165px; min-width: 165px; background-color: #f9572b; padding: 2.2px; margin-top: auto; margin-bottom: auto;">' +
                    '<div style="height:100%; width: 100%; border: 7px solid #fff; border-radius: 50%; text-align: center; color: #fff;">' +
                    '<span style="font-weight: bold; font-size: 62px; display: block; margin-top: 15px;">' + getHoursLeft(data.rows[i].values[indexOfFinishDate]) + '</span>' +
                    '<span style="font-size: 14px; display: inline-block;"> ЗАЛИШИЛОСЬ </br> ГОДИН </span>' +
                    '</div>' + 
                    '</div>' +
                    '<div style="display: inline-block; height: 100%; padding-left: 7px;">' +
                    '<p style="font-weight: bold; color: black; font-size: 16px; margin: 10px auto 5px;">' + data.rows[i].values[indexOfAddress] + '</p>' +
                    '<p style="margin: 5px 0 0;"> <span style="width: 90px; height: 20px; line-height: 20px; background-color: #3f7ab7; color: #fff; text-align: center; display: inline-block;"> Відключення </span></p>'+
                    '<p style="margin: 5px 0 0;"> <b style="color: #999"> <i class="material-icons" style="vertical-align: middle; margin: -3px 5px 0; color: #999;">access_time</i>' + getDateString(data.rows[i].values[indexOfStartDate]) + ' - ' + getDateString(data.rows[i].values[indexOfFinishDate]) + '</b></p>' +
                    '<p style="margin: 3px 0 0;">Номер заявки: <b>' + data.rows[i].values[indexOfClaimNumber] + '</b></p>' +
                    '<p style="margin: 5px 0;">Район: <b>' + data.rows[i].values[indexOfClaimDistrict] + '</b></p>' +
                    '<p style="margin: 5px 0;">Місце: <b>' + data.rows[i].values[indexOfClaimPlace] + '</b></p>' +
                    `<a style="color: #3f7ab7; font-weight: bold;" href="${location.origin}${localStorage.getItem('VirtualPath')}/sections/Claims/edit/` + data.rows[i].values[indexOfClaimNumber] + '"> Детальніше </a>' +
                     '</div>' + 
                     '</div>';
            

            infowindow_marker01.push(new google.maps.InfoWindow({
                content: contentString1
            }));

    };
        
    for (var i = 0; i < marker01.length; i++) {
            (function() {
                var k = i;
                marker01[k].addListener("click", function() {
                    my_infowindow(k);
                });
            }.bind(this)());
        };

    function my_infowindow(val) {
            for (var i = 0; i < marker01.length; i++) {
                infowindow_marker01[i].close();
            };
            infowindow_marker01[val].open(this.map, marker01[val]);
        }
        
        
        

    }
};
}());
