// This function gets weather historic data based on city, country, start date, end date from WeatherbitAPI
const fetch = require('node-fetch');


const fetchWeatherbitApi = async (toLat, toLng, date, weatherbitkey) => {

  const weatherbitforecastURL = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
  const weatherbithistoryURL = 'https://api.weatherbit.io/v2.0/history/daily?lat=';
  //let url = 'https://api.weatherbit.io/v2.0/history/hourly?';
  // Getting the timestamp for the current date and traveling date for upcoming processing.
  const timestamp_trip_date = Math.floor(new Date(date).getTime() / 1000);
  const todayDate = new Date();
  const timestamp_today = Math.floor(new Date(todayDate.getFullYear() + '-' + todayDate.getMonth() + '-' + todayDate.getDate()).getTime() / 1000);

  let response;
  if (timestamp_trip_date < timestamp_today) {
    let next_date = new Date(date);
    next_date.setDate(next_date.getDate() + 1);
    response = await fetch(weatherbithistoryURL + toLat + '&lon=' + toLng + '&start_date=' + date + '&end_date=' + next_date + '&key=' + weatherbitkey)
  } else {
    response = await fetch(weatherbitforecastURL + toLat + '&lon=' + toLng + '&key=' + weatherbitkey);
  }
  //console.log('Weatherbit API:', response.status, response.statusText, response.ok);

  if (response.ok) {
    let data = await response.json();
    // console.log(data);
    return {
      temperature: data.data[0].temp,
      //weather_icon: 'https://www.weatherbit.io/static/img/icons/' + data.data[0].weather.icon + '.png',
      weather_condition: data.data[0].weather.description
    };
  } else {
    console.log(`ERROR: code ${response.status} ${response.statusText}.`);
    return {temperature: 'no data', weather_condition: 'no data'};
  }
};

module.exports = fetchWeatherbitApi;
