// fetch geonames API with city and get latitude, longitude, country
const fetch = require('node-fetch');

const fetchGeonamesApi = async (city = '', username) => {
    //const url = `http://api.geonames.org/search?username=${key}&type=json&name=`;
    const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
    //const url = `geoNamesURL${city}&maxRows=10&username=${username}`

    //let response = await fetch(url);
    const response = await fetch(geoNamesURL + city + '&maxRows=10&username=' + username);
    //console.log('Geonames API: ', response.status, response.statusText, response.ok);
    //console.log('Geonames API: ', response);

    if (response.ok) {
        let data = await response.json();
        // console.log(data, data.geonames);
        if (data.geonames.length > 0) {
            data = data.geonames[0];
            return {
                latitude: data.lat.slice(0, 6),
                longitude: data.lng.slice(0, 6),
                country_code: data.countryCode,
                city: data.name
            };
        }
    } else {
        console.log(`ERROR: code ${response.status} ${response.statusText}.`);
    }
    return {
        latitude: 'no data',
        longitude: 'no data',
        country_code: 'no data',
        city: 'no data'
    };
};


module.exports = fetchGeonamesApi;
