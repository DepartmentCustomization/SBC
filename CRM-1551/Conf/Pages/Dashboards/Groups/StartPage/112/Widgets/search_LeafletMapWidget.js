(function() {
    return {
        title: ' ',
        hint: '',
        mapOptions: {
            zoom: 11,
            latitude: 50.450418,
            longitude: 30.523541,
            maxZoom: 19
        },
        dataForMap: {
            search: []
        },
        init: function() {
            this.messageService.subscribe('setSearchMarker', this.setSearchMarker, this);
            const queryCategoryList = {
                queryCode: 'list_filter_districts',
                parameterValues: [],
                filterColumns: [],
                limit: -1
            };
            this.queryExecutor(queryCategoryList, this.load, this);
        },
        initMap: function(zoomLevel = 5, viewOne = 50.433841, viewTwo = 30.453244) {
            this.map.setView([Number(viewOne), Number(viewTwo)], zoomLevel);
        },
        setSearchMarker: function(message) {
            const data = message.data;
            if(data.rows.length) {
                let indexId = data.columns.findIndex(el => el.code.toLowerCase() === 'id');
                let indexAddress = data.columns.findIndex(el => el.code.toLowerCase() === 'addresssearch');
                let indexOfLatitude = data.columns.findIndex(el => el.code.toLowerCase() === 'geolocation_lat');
                let indexOfLongitude = data.columns.findIndex(el => el.code.toLowerCase() === 'geolocation_lon');
                this.indexId = indexId;
                const address = data.rows[0].values[indexAddress];
                const name = 'sendSearchAddress'
                const latitude = data.rows[0].values[indexOfLatitude];
                const longitude = data.rows[0].values[indexOfLongitude];
                this.messageService.publish({name, address, latitude, longitude});
                this.indexAddress = indexAddress;
            }
        }
    };
}());
