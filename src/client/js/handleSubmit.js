const tripData = {};

const trip_details_section = document.getElementById('trip_details_section');
const plan_trip = document.getElementById('plan_trip');



// function that handles new search submit
async function handleSubmit(event) {
  console.info('::: Starting Form Validation :::');
  event.preventDefault();
  // get input from the form
  tripData['from'] = document.getElementById('from_place').value;
  tripData['to'] = document.getElementById('to_place').value;
  tripData['date'] = document.getElementById('travel_date').value;

  //const data = postData(tripData);
  const tripResult = await postData(tripData).then((res) => {
        
        console.log(res);

        return res;
  });
  console.log(tripResult);
  updateUI(tripResult);

}

async function postData(details) {
  const response = await fetch('http://localhost:8085/trip', {
    method: "POST",
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(details)
  });
  //console.log(await response);
  try {
    return await response.json();
  } catch (e) {
    console.log('error', e);
  }
}

async function updateUI(trip) {
  console.log(trip);

  trip_details_section.classList.remove('invisible');
  trip_details_section.scrollIntoView({behavior: "smooth"});

  let destination_details = document.getElementById("destination");
  let boarding_details = document.getElementById("boarding");
  let departure_date = document.getElementById("departing_date");
  let number_of_days = document.getElementById('number_of_days');
  let temperature = document.getElementById('temperature');
  let dest_desc_photo = document.getElementById('dest_desc_photo');
  let weather = document.getElementById('weather');

  destination_details.innerHTML = trip.to;
  boarding_details.innerText = trip.from;
  departure_date.innerHTML = trip.date;

  if (trip.daystogo < 0) {
    document.querySelector('#days_to_go_details').innerHTML = 'Seems like you have already been to the trip!';
  } else {
    number_of_days.innerHTML = trip.daystogo;
  }
  temperature.innerHTML = trip.temperature + '&#8451;';
  if (trip.cityImage !== undefined) {
    dest_desc_photo.setAttribute('src', trip.cityImage);
  }

  weather.innerHTML = trip.weather_condition;
}

export {
  plan_trip,
  handleSubmit,
  trip_details_section
};
