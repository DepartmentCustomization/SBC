(function() {
    return {
        title: ' !!!',
        hint: '',
        formatTitle: function() {
            return {
                'border': '1px solid #eef1f5',
                'font-weight': 'bold',
                'padding': '20px',
                'color': '#e7505a',
                'font-size': '22px',
                'background-color':'#eef1f5',
                'border-top-left-radius': '10px',
                'border-top-right-radius': '10px'
            }
        },
        dateFormat: 'd.MM.y HH:mm',
        sliceCount: '250',
        newsStyles: function() {
            return {
                news: {
                    'padding': '10px',
                    'border': '1px solid #eef1f5',
                    'border-top': 'none'
                },
                title: {
                    'color':'#3f7ab7',
                    'font-size':'24px',
                    'padding-left':'15px'
                },
                description: {
                    'color': 'gray',
                    'padding': '0 5px',
                    'font-size':'18px'
                }
            }
        },
        init: function() {
        }
    }
}());
