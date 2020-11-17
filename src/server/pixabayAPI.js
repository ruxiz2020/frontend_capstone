// This function gets images based on location from PixabayAPI
const fetch = require('node-fetch');

const fetchPixabayApi = async (city = '', pixabayAPI) => {

  const pixabayURL = 'https://pixabay.com/api/?key=';
  //const pixabayAPI = '18908213-9144f546c4d92c6d7fb7c781a';
  //let url = pixabayURL;
  //url = pixabayURL + pixabayAPI + '&q=' + city + ' city&image_type=photo';
  //let response = await fetch(url);
  const response = await fetch(pixabayURL + pixabayAPI + '&q=' + city + ' city&image_type=photo');

  //console.log('Pixabay API: ', response.status, response.statusText, response.ok);

  try {
    return await response.json();
  } catch (e) {
    console.log('error', e);
  }
};

module.exports = fetchPixabayApi;
