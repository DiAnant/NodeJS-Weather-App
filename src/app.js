const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
// port will be provided by env variable, if not available 3000
const port = process.env.PORT || 3000;

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// so that express can use HBS (handlebars) to serve dynamic content
app.set('view engine', 'hbs');
// so that express can know new location of 'views' directory
app.set('views', viewsPath);
// so that express can serve static content from this public directory
app.use(express.static(publicDirectoryPath));
// so that hbs knows the address of partials
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Your Weather',
        name: '@DiAnant',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: '@DiAnant',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        mssg: "Help Yourself Ser!",
        name: '@DiAnant',
    });
});

app.get('/weather', (req, res) => {

    const query = req.query;
    if(!query.address){
        return res.send({
            error: 'Address Must Be Provided!',
        });
    }

    geocode(query.address, (error, data) => {
        if(error)
            return res.send({error});
        
        forecast(data.latitude, data.longitude, (error, fData) => {
            if(error)
                return res.send({error});
            res.send({
                forecastData: fData,
                address: query.address,
            });
        });
    });
});

// for setting 404 ERROR
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: '@DiAnant',
        error: 'Help Article Not Found!',
    });
});

// for setting 404 ERROR
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: '@DiAnant',
        error: 'Page Not Found!',
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});