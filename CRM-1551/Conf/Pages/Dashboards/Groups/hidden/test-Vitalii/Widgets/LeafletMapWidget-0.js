(function() {
    return {
        title: 'Maps Title',
        hint: '',
        formatTitle: function() {},
        mapOptions: {
            zoom: 11,
            latitude: 50.450418,
            longitude: 30.523541,
            maxZoom: 19
        },
        init: function() {
            let executeQuery = {
                queryCode: 'tw1_q1',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        load: function() {
            let circle = L.circle([50.44, 30.50], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 300
            }).addTo(this.map);
            L.circle([50.5, 30.5], {
                radius: 500,
                color: 'green'
            }).addTo(this.map);
            let cityIcon = L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.3.4/dist/images/marker-icon.png',
                iconSize: [30, 50]
            });
            let myLines = [{
                'type': 'LineString',
                'coordinates': [[-100, 40], [-105, 45], [-110, 55]]
            }, {
                'type': 'LineString',
                'coordinates': [[-105, 40], [-110, 45], [-115, 55]]
            }];
            let myStyle = {
                'color': '#ff7800',
                'weight': 5,
                'opacity': 0.65
            };
            L.geoJSON(myLines, {style: myStyle}).addTo(this.map);

            let someFeatures = [{
                'type': 'Feature',
                'properties': {
                    'name': 'Coors Field',
                    'show_on_map': true
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [24.99404, 39.75621]
                }
            }, {
                'type': 'Feature',
                'properties': {
                    'name': 'Busch Field',
                    'show_on_map': false
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [24.98404, 39.74621]
                }
            }];
            L.geoJSON(someFeatures, {
                filter: function(feature) {
                    return feature.properties.show_on_map;
                }
            }).addTo(this.map);
            let geojsonFeature = {
                'type': 'Feature',
                'properties': {
                    'name': 'Coors Field',
                    'amenity': 'Baseball Stadium',
                    'popupContent': 'This is where the Rockies play!'
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [ 49.788976, 30.128565 ]
                }
            };
            L.geoJSON(geojsonFeature).addTo(this.map);
            myLines = [{
                'type': 'LineString',
                'coordinates': [[ 49, 40], [ 49, 45], [ 49, 55]]
            }, {
                'type': 'LineString',
                'coordinates': [[ 49, 40], [ 49, 45], [ 49, 55]]
            }];

            let myLayer = L.geoJSON().addTo(this.map);
            myLayer.addData(geojsonFeature);
            let marker1 = L.marker([50.37, 30.45], {icon: cityIcon}).addTo(this.map);
            this.map.panBy([200, 300]);
            this.map.panBy(L.point(200, 300));
            let polygon = L.polygon([
                [50.509, 30.58],
                [50.503, 30.56],
                [50.51, 30.547]
            ]).addTo(this.map);
            let dist = L.polygon([
                [50.4945, 30.3365],
                [50.49652843, 30.33741938],
                [50.49663763, 30.33905016],
                [50.49827557, 30.33939348],
                [50.49811178, 30.34050928],
                [50.49663763, 30.34042345],
                [50.49663763, 30.3411101],
                [50.49783879, 30.34205423],
                [50.49734741, 30.34402834],
                [50.49653526, 30.34410344],
                [50.49637829, 30.34562694],
                [50.49410537, 30.34633059],
                [50.48932747, 30.34589071],
                [50.488836, 30.34906644],
                [50.48635469, 30.34854328]
            ]).addTo(this.map);
            circle.bindPopup('I am a circle.');
            polygon.bindPopup('I am a polygon.');
            dist.bindPopup('Коцюбинське');
            marker1.bindPopup('Требуется обновить родные Png');
            L.popup()
                .setLatLng([50.431782, 30.516382])
                .setContent('I am a standalone popup.')
                .openOn(this.map);
        }
    };
}());
