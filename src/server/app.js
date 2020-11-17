// import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// import required functions
const countdown = require('./daytogo');
const fetchGeonamesApi = require('./geonamesAPI');
//const restcountriesApi = require('./restcountriesAPI');
const fetchWeatherbitApi = require('./weatherbitAPI');
const fetchPixabayApi = require('./pixabayAPI');
//const getFlightPrice = require('./skyscannerAPI');
//const covid = require('./covidAPI');

dotenv.config();
const username = process.env.username;
const weatherbitkey = process.env.weatherbitkey;
const pixabayAPI = process.env.pixabayAPI;

// variables: trip details, env variables
const trip = {
    to: '',
    latitude: '',
    longitude: '',
    from: '',
    temperature: '',
    weather_condition: '',
    daystogo: '',
    cityImage: '',
    date: ''
};


// app set up
const app = express();
app.use(express.static('dist'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// designates what port the app will listen to for incoming requests
const port = 8085;

app.get('/', function(req, res) {
  res.status(200).sendFile('dist/index.html');
});


// post request about trip
app.post('/trip', async (req, res) => {
    //console.log(req.body);
    // set departure city and date
    trip.from = req.body.from;
    trip.to = req.body.to;
    trip.date = req.body.date;
    // get countdown number
    trip.daystogo = countdown(req.body.date).toString();
    // fetch destination data by GeonamesAPI
    let destinationData = await fetchGeonamesApi(trip.to, username);

    trip.latitude = destinationData.latitude;
    trip.longitude = destinationData.longitude;

    let weatherData = await fetchWeatherbitApi(
        trip.latitude,
        trip.longitude,
        trip.date,
        weatherbitkey
    );
    // console.log(weatherData);
    trip.temperature = weatherData.temperature;
    //trip.weather.icon = weatherData.weather_icon;
    trip.weather_condition = weatherData.weather_condition;
    // fetch image url by pixabay API
    const pixRes = await fetchPixabayApi(req.body.to, pixabayAPI);
    trip.cityImage = pixRes['hits'][0]['webformatURL'];

    res.send(trip);
    console.info('** This request has been processed:\n', req.body, ' **');
    console.info('** This resp:\n', trip, ' **');
});

module.exports = app;
