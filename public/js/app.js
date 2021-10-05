const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const mssgOne = document.querySelector('#mssg1');

const printJSON = (data) => {
    let string = "";
    for(key in data){
        string += '<b>' + key;
        string += ' : </b>';
        string += data[key];
        string += '<br>';
    }
    return string;
};

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value;

    mssgOne.textContent = 'Loading....';
    document.getElementById('content').innerHTML = "";


    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
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