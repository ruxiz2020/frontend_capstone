import {handleSubmit} from "./js/handleSubmit";
import {plan_now} from "./js/app";
import {remove_trip} from "./js/app";

import './styles/reset.scss'
import './styles/footer.scss'
import './styles/header.scss'
import './styles/style.scss'

import './views/img/travel-logo.png'
import './views/img/travel.jpg'


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
    console.log('service worker registration succeeded:', registration);
  }, function(error) {
    console.log('service worker registration failed:', error);
  });
} else {
  console.log('service workers are not supported.');
}

export {
  handleSubmit,
  plan_now,
  remove_trip
}
