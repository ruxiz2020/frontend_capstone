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
//const username = 'saumyapandeyy';
//const weatherbitkey = 'd3312ce43bf04b32ae663b6dda486b03';
//const pixabayAPI = '18908213-9144f546c4d92c6d7fb7c781a';
//
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
//app.listen(port, function() {
//    console.log(`*** Travel App is listening on port ${port}! ***`);
//    console.log('Base trip variable:\n', trip);
//});
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
    //trip.to = destinationData.city;
    //trip.country_code = destinationData.country_code;
    trip.latitude = destinationData.latitude;
    trip.longitude = destinationData.longitude;
    // console.log('destination data:\n', destinationData);
    // fetch country using country_code by Rest Countries API
    //let countryData = await restcountriesApi(trip.destination.country_code);
    //trip.destination.country = countryData.country;
    //trip.destination.population = countryData.population;
    // fetch weather data from weatherbit API
    // console.log(trip);
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
    // fetch flight data by skyscannerAPI
    //let flightData = await getFlightPrice(
    //    req.body.departure,
    //    req.body.destination,
    //    req.body.date,
    //    process.env.SKYSCANNER_KEY
    //);
    //trip.flight.price = flightData.price;
    //trip.flight.carrier = flightData.carrier;
    //trip.flight.direct = flightData.direct;
    // fetch COVID data by covidAPI
    // console.log(trip);
    //let covidData = await covid.fetchCovidApi(trip.destination.country);
    // console.log(covidData, trip.destination.population);
    //trip.covid.growth = covid.getCovidGrowthLevel(covidData);
    //trip.covid.level = covid.getCovidRiskLevel(covidData, trip.destination.population);

    res.send(trip);
    console.info('** This request has been processed:\n', req.body, ' **');
    console.info('** This resp:\n', trip, ' **');
});

module.exports = app;
