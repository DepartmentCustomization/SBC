(function() {
    return {
        formatTitle: function() {
            return `
            
            `;
        },
        chartConfig: {
            chart: {
                spacing: [10, 0, 10, 0]
            },

            legend: {
                title: {
                    text: 'Test headline'
                },
                enabled: false,
                align: 'left',
                verticalAlign: 'bottom',
                floating: true,
                layout: 'vertical',
                labelFormat:'{label}'
            },
            title: false,
            plotOptions: {
                map: {
                    allAreas: true,
                    dataLabels: {
                        x:28,
                        y:2,
                        padding:2,
                        crop: false,
                        overflow:'none',
                        backgroundColor: 'rgba(0, 104, 203, 0.5)',
                        borderRadius: 2,
                        enabled: true,
                        color:'#004ecb',
                        format: '{point.properties.value}',
                        style: {
                            fontWeight: '400',
                            fontSize: '0.85em'
                        }
                    },
                    mapData:{
                        'type':'FeatureCollection',
                        'hc-transform':{'default':{'crs':
                        '+proj=lcc +lat_1=43 +lat_2=62 +lat_0=30 +lon_0=10 +x_0=0 +y_0=0 +ellps=intl +units=m +no_defs'}},
                        'features': [] },
                    tooltip: {
                        headerFormat:'',
                        pointFormat: '<br><b>{point.properties.name}</b>'
                    }
                }
            },
            series : [{
                color: '#0095ff',
                joinBy: null,
                data: [{
                    value: 6,
                    name: 'Point1',
                    color: '#0095ff',
                    label: ''
                }]
            }],
            credits: {
                enabled: false
            }
        },
        init: function() {
            let executeQuery = {
                queryCode: 'tw1_q1',
                limit: -1,
                parameterValues: []
            };
            this.queryExecutor(executeQuery, this.load, this);
        },
        load: function(data, options) {
            options.plotOptions.map.mapData.features.push({
                'type': 'Feature',
                'properties': {'name': 'Новозеландский Остров', 'label': 'test' , 'value': '1'},
                'geometry':{'type': 'Polygon', 'coordinates':  [ ] }
            });
            let obolonDist = [[100,-69],
                [107,-60],[117,-70],
                [120,-59],[127,-59],
                [128,-56],[118,-52],
                [105,-43],[120,-41],
                [147,-41],[150,-26],
                [212,-31],[212,-36],
                [234,-54],[255,-76],
                [263,-90],[263,-108],
                [263, -115],[270,-133],
                [267,-135],[260,-136],
                [263,-143],[238,-143],
                [233,-151],[226,-142],
                [223,-127],[216,-137],
                [209,-132],[202,-113],
                [191,-102],[195,-100],[172,-97],[163,-97],[141,-104],[95,-64]];
            let desnjanDist = [[264,-100],
                [269,-104],
                [275,-102],[277,-109],
                [284,-109],[284,-102],
                [277,-92],[279,-84],
                [324,-91],[357,-92],
                [366,-76],[389,-63],
                [389,-70],[400,-70],
                [399,-48],[407,-39],
                [403,-30],[428,-41],
                [439,-41],[439,-44],
                [441,-48],[450,-48],
                [452,-44],[461,-59],
                [461,-80],[450,-100],
                [415,-120],[407,-128],
                [402,-130],[403,-137],
                [374,-151],[310,-151],
                [312,-146],[313,-143],
                [311,-133],[271,-132],
                [264,-117],[264,-108]];
            let trigger = options.plotOptions.map.mapData.features.length;
            let totalArr = [desnjanDist,obolonDist];
            let title = ['Пробний запуск DashBoardMaps'];
            for (let i = 0; i < trigger; i++) {
                options.plotOptions.map.mapData.features[i].geometry.coordinates.push(totalArr[i]);
                options.plotOptions.map.mapData.features[i].properties.value = title[i];
            }
            let districts = options.plotOptions.map.mapData.features;
            for (let i = districts.length; i--;) {
                if (districts[i].properties.value) {
                    options.series[0].data.push.apply(options.series[0].data[i], {label: districts[i].properties.label});
                }
            }
            this.renderHightMap();
        }
    };
}());
