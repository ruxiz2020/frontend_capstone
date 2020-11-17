import {handleSubmit} from "./js/handleSubmit";
import {plan_now} from "./js/app";
import {remove_trip} from "./js/app";

import './styles/reset.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/style.scss'

import './views/img/travel-logo.png'
import './views/img/travel.jpg'

// import JS
//import {handleSubmit} from './js/handleSubmit.js';
//import { saveTrip, displayTrips } from './js/displayTrips';



// Main
//document.addEventListener('DOMContentLoaded', () => {
//  console.log('DOM fully loaded and parsed');
  // display all trips from localStorage
  //displayTrips();
  // add eventListeners
//  document.getElementById("travel_details_submit").addEventListener("click", handleSubmit);
  //document.getElementById('submit').onclick = handleSubmit;
  //document.getElementsByClassName('save').onclick = saveTrip;
//});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(registration => {
      console.log("SW registered: ", registration);
    }).catch(registrationError => {
      console.log("SW registration failed: ", registrationError);
    });
  });
}

export {
  handleSubmit,
  plan_now,
  remove_trip
}
