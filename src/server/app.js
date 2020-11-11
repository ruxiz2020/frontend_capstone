// Dotenv package allows environment variables to protect API keys
const dotenv = require('dotenv');
dotenv.config();

// All the resources of APIs
const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
//const username = 'ruxiz2020';
const username = 'saumyapandeyy';
const weatherbitforecastURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const weatherbithistoryURL = 'https://api.weatherbit.io/v2.0/history/daily?lat=';
const weatherbitkey = 'd3312ce43bf04b32ae663b6dda486b03';
const pixabayURL = 'https://pixabay.com/api/?key=';
//const pixabayAPI = '18908213-9144f546c4d92c6d7fb7c781a';
const pixabayAPI = process.env.pixabayAPI;

// Initialise object that will store all user/API data on server side
const bigData = []

// All required server boilerplate
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const app = express()

app.use(cors())
app.use(express.static('dist'))

/* Middleware */
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json())

// This is for testing server endpoints with Jest and Supertest packages
module.exports = app

// Serves the main page to browser
app.get('/', function(req, res) {
  res.status(200).sendFile('dist/index.html');
});

// Endpoint for the Geonames API
app.post('/getgeo', getGeoDetails)

// Function to get Geo stats
async function getGeoDetails(req, res) {
  console.log(`Geonames request city is ${req.body.userData.destinationCity}`)
  const city = req.body.userData.destinationCity
  const response = await fetch(geoNamesURL + city + '&maxRows=10&username=' + username);
  console.log(`Geonames URL is ${response}`)
  try {
    const responseJSON = await response.json();
    res.send(responseJSON)
    // If failed connection to API, return null
  } catch (e) {
    console.log('error', e);
    res.send(null)
  }
}


// Endpoint for the Weatherbit API
app.post('/getweather', getWeatherData)

//Function to get weather data
async function getWeatherData(req, res) {

  console.log(`Request latitude is ${req.body.cityData.latitude}`)
  console.log(`Request longitude is ${req.body.cityData.longitude}`)
  const toLat = req.body.cityData.latitude
  const toLat = req.body.cityData.longitude
  const date = req.body.date

  // Getting the timestamp for the current date and traveling date for upcoming processing.
  const timestamp_trip_date = Math.floor(new Date(date).getTime() / 1000);
  const todayDate = new Date();
  const timestamp_today = Math.floor(new Date(todayDate.getFullYear() + '-' + todayDate.getMonth() + '-' + todayDate.getDate()).getTime() / 1000);

  let response;
  // Check if the date is gone and call the appropriate endpoint.
  if (timestamp_trip_date < timestamp_today) {
    let next_date = new Date(date);
    next_date.setDate(next_date.getDate() + 1);
    response = await fetch(weatherbithistoryURL + toLat + '&lon=' + toLng + '&start_date=' + date + '&end_date=' + next_date + '&key=' + weatherbitkey)
  } else {
    response = await fetch(weatherbitforecastURL + toLat + '&lon=' + toLng + '&key=' + weatherbitkey);
  }

  try {
    const responseJSON = await response.json();
    res.send(responseJSON);
  } catch (e) {
    console.log('error', e)
    res.send(null);
  }
}

// Endpoint for the Pixabay API
app.post('/getimage', getImage)

async function getImage(req, res) {
  console.log(`Pixabay request city is ${req.body.userData.destinationCity}`)
  const toCity = req.body.userData.destinationCity
  const response = await fetch(pixabayURL + pixabayAPI + '&q=' + toCity + ' city&image_type=photo');
  try {
    responseJSON = await response.json();
    res.send(responseJSON);
  } catch (e) {
    console.log('error', e);
    res.send(null);
  }
}

let projectData = {};

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.status(200).sendFile('dist/index.html');
});

app.post('/postData', function(req, res) {
  projectData['to'] = req.body.to;
  projectData['from'] = req.body.from;
  projectData['temperature'] = req.body.temperature;
  projectData['weather_condition'] = req.body.weather_condition;
  projectData['daystogo'] = req.body.daystogo;
  projectData['cityImage'] = req.body.cityImage;
  projectData['date'] = req.body.date;

  res.send(projectData);
});

module.exports = app;
