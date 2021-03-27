'use strict';
let cache = require('./cache.js');
const superagent = require('superagent');

function getWeather(request, response) {
  const { city_name, lat, lon } = request.query;
  const url = 'http://api.weatherbit.io/v2.0/forecast/daily';
  const query = {
    key: process.env.WEATHER_API_KEY,
    city: city_name,
    lat: lat,
    lon: lon
  }
  
  superagent
  .get(url)
  .query(query)
  .then(summaries => {
    const weatherArray = summaries.body.data.map(day => {
      return new Weather(day);
    })
    console.log(weatherArray);
    response.status(200).send(weatherArray);
  })
  .catch((error => {
    console.error(error);
    response.status(500).send('Sorry. Something went wrong!');
  });

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = superagent.get(url)
    .then(response => parseWeather(response.body));
  }
  
  return cache[key].data;

}  

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.description;
    this.date = day.datetime;
  }
}

module.exports = getWeather;
