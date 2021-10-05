const request = require('request');

const geocode = (address, callback) => {
    
    const apiKey = 'pk.eyJ1Ijoia3VydC1jb2JhaW4iLCJhIjoiY2t1Nm9lbWl0MGpoODJvbzc5d3Qxano0MSJ9.zKK_fw14ksnMYiEooIL0vA'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)
    + '.json?access_token=' + apiKey + '&limit=1';
    
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback("Unable to connect to the geocoding service!", undefined);
        }
        else if(body.features.length == 0){
            callback("Unable to find co-ordinates for provided location : " + 
            address, undefined); 
        }
        else{
            const placeName = body.features[0].place_name;
            const mssg = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placeName: placeName,
            }
            callback(undefined, mssg);
        }
    });
}

module.exports = geocode;