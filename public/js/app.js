const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const mssgOne = document.querySelector('#mssg1');

const printJSON = (data) => {

    let string = "You searched weather for location <b>" + data['locationName'] + 
    ".</b> Current weather can be described as <b>" + data['weatherDescription'] + 
     "</b> and local time is <b>" + data['localTime'] + "</b>. The current temprature \
     is <b>" + data['currentTemperature'] + " degrees</b> celsius and it feels \
     like <b>" + data['feelsLike'] + " degrees</b> celsius. Chances of precipitation\
     stand at about <b>" + data['chancesOfRain'] + "</b>.";
    
    return string;
};

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value;

    mssgOne.textContent = 'Loading....';
    document.getElementById('content').innerHTML = "";


    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                mssgOne.textContent = data.error;
                document.getElementById('content').innerHTML = "";
            }
            else{
                mssgOne.textContent = 'Location: ' + data.address;
                document.getElementById('content').innerHTML = printJSON(data.forecastData);
            }
        });
    });    

});