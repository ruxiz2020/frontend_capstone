

const details = {};

const trip_details_section = document.getElementById('trip_details_section');
const plan_trip = document.getElementById('plan_trip');

function handleSubmit(e) {
  e.preventDefault(); //Prevent default behaviour to stop page reload

  // Getting elements value from DOM
  details['from'] = document.getElementById('from_place').value;
  details['to'] = document.getElementById('to_place').value;
  details['date'] = document.getElementById('travel_date').value;
  details['daystogo'] = date_diff_indays(details['date']);

  try {
    // Fetching geo stats of destination place.
    getGeoDetails(details['to']).then((toInfo) => {
      //Assigning the fetched value from JSON toInfo
      const toLat = toInfo.geonames[0].lat;
      const toLng = toInfo.geonames[0].lng;

      //Getting Weather details
      return getWeatherData(toLat, toLng, details['date']);
    }).then((weatherData) => {
      //Storing the weather details
      details['temperature'] = weatherData['data'][0]['temp'];
      details['weather_condition'] = weatherData['data']['0']['weather']['description'];

      //Calling Pixabay API to fetch the first img of the city
      return getImage(details['to']);
    }).then((imageDetails) => {
      if (imageDetails['hits'].length > 0) {
        details['cityImage'] = imageDetails['hits'][0]['webformatURL'];
      }
      //Sending data to server to store the details.
      return postData(details);
    }).then((data) => {
      //Receiving the data from server and updating the UI
      updateUI(data);
    })
  } catch (e) {
    console.log('error', e);
  }
}



async function postData(details) {
  const response = await fetch('http://localhost:8082/postData', {
    method: "POST",
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(details)
  });

  try {
    return await response.json();
  } catch (e) {
    console.log('error', e);
  }
}

//Updating the UI
function updateUI(data) {
  trip_details_section.classList.remove('invisible');
  trip_details_section.scrollIntoView({behavior: "smooth"});

  let destination_details = document.getElementById("destination");
  let boarding_details = document.getElementById("boarding");
  let departure_date = document.getElementById("departing_date");
  let number_of_days = document.getElementById('number_of_days');
  let temperature = document.getElementById('temperature');
  let dest_desc_photo = document.getElementById('dest_desc_photo');
  let weather = document.getElementById('weather');

  destination_details.innerHTML = data.to;
  boarding_details.innerText = data.from;
  departure_date.innerHTML = data.date;

  if (data.daystogo < 0) {
    document.querySelector('#days_to_go_details').innerHTML = 'Seems like you have already been to the trip!';
  } else {
    number_of_days.innerHTML = data.daystogo;
  }
  temperature.innerHTML = data.temperature + '&#8451;';
  if (data.cityImage !== undefined) {
    dest_desc_photo.setAttribute('src', data.cityImage);
  }

  weather.innerHTML = data.weather_condition;
}

let date_diff_indays = function(date1) {
  let dt1 = new Date(date1);
  let dt2 = new Date();
  return Math.floor((Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) - Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate())) / (1000 * 60 * 60 * 24));
};

export {
  plan_trip,
  handleSubmit,
  trip_details_section
}
