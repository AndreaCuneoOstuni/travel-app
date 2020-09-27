// Require dotenv for environment variables
const dotenv = require('dotenv');
dotenv.config();

// Require path
const path = require('path');

// Require and use expressjs
const express = require('express');
const app = express();
app.use(express.static('dist'));

// Require and use body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Require and use Cors
const cors = require('cors');
app.use(cors());

// Require fetch
const fetch = require('node-fetch');

// Set favicon icon
var favicon = require('serve-favicon')
app.use(favicon(path.join('src', 'favicon.ico')));

// API keys:
const weatherKey = process.env.WEATHER_KEY;
const pixabayKey = process.env.PIXABAY_KEY;
const geonamesUser = process.env.GEONAMES_USER;

// Base url's for endpoint urls
const weatherbitCurrentUrl = "http://api.weatherbit.io/v2.0/current";
const weatherbitFutureUrl = "http://api.weatherbit.io/v2.0/forecast/daily";
const pixabayUrl = "https://pixabay.com/api/?key=";
const geonamesBaseUrl = "http://api.geonames.org/searchJSON?q=";



// Assign the Port to the app
app.listen(8081, function() {
    console.log('App listening in: localhost: 8081');
});

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});


app.post('/location', async function(req, res) {
    const city = req.body.location;
    const getGeonamesData = await fetch(`${geonamesBaseUrl}${city}&maxRows=1&username=${geonamesUser}`);
    try {
        const geoData = await getGeonamesData.json();
        res.send(geoData.geonames[0]);
    } catch (error) {
        console.log(error);
    };
});

app.post('/weather', async function(req, res) {
    const lat = req.body.lat;
    const lng = req.body.lng;
    const dateInFuture = req.body.dateInFuture;
    const getWeatherData = await fetch(`${weatherbitCurrentUrl}?lat=${lat}&lon=${lng}&key=${weatherKey}`);
    const getFutureWeatherData = await fetch(`${weatherbitFutureUrl}?lat=${lat}&lon=${lng}&key=${weatherKey}`);
    if (dateInFuture) {
        try {
            const futureWeatherData = await getFutureWeatherData.json();
            res.send(futureWeatherData);
        } catch (error) {
            console.log(error);
        };
    } else {
        try {
            const weatherData = await getWeatherData.json();
            res.send(weatherData);
        } catch (error) {
            console.log(error);
        };
    }

});


app.post('/picture', async function(req, res) {
    const capital = req.body.location;
    const country = req.body.country;
    const getImageData = await fetch(`${pixabayUrl}${pixabayKey}&q=${capital}&image_type=photo&category=places&order=popular&orientation=horizontal`);
    const getCountryImageData = await fetch(`${pixabayUrl}${pixabayKey}&q=${country}&image_type=photo&category=places&order=popular&orientation=horizontal`);
    try {
        const imageData = await getImageData.json();
        if (imageData.hits.length >= 1) {
            res.send(imageData.hits[0]);
        } else {
            try {
                const imageCountryData = await getCountryImageData.json();
                res.send(imageCountryData.hits[0]);
            } catch (error) {
                console.log(error);
            };
        }
    } catch (error) {
        console.log(error);
    };
});
