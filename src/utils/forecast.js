const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const apiKey = '1ae01f84408b84568a64606c0aa34732';
    const unit = 'm'; // m for metric, s for kelvin, f for farheneit
    const url = 'http://api.weatherstack.com/current?access_key=' + apiKey + 
    '&query=' + latitude + ',' + longitude + '&units=' + unit;

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback("Unable to connect to the weather service!", undefined);
        }
        else if(body.error){
            callback("Unable to find location for the given co-ordinates!", undefined);
        }else{
            const data = {
                locationName: body.location.name + ', ' + body.location.region + ', ' + 
                body.location.country,
                localTime: body.location.localtime,
                weatherDescription: body.current.weather_descriptions[0],
                currentTemperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                chancesOfRain: body.current.precip + ' %',
                unitSystem: body.request.unit,
            }
            callback(undefined, data);
        }
    });
};

module.exports = forecast;