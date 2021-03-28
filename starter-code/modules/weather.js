'use strict';
let cache = require('./cache.js');
const superagent = require('superagent');

function getWeather(request, response) {
  const { city_name, lat, lon } = request.query;
  const key = `weather-${lat}-${lon}`;
  const url = 'http://api.weatherbit.io/v2.0/forecast/daily';
  const query = {
    key: process.env.WEATHER_API_KEY,
    city: city_name,
    lat: lat,
    lon: lon
  }
  
  
  if (cache[key] && (Date.now() - cache[key].timestamp < 300000)) {
    console.log('Cache hit weather');
    response.status(200).send(cache[key].data);
  } else {
    console.log('Cache miss weather');
    cache[key] = {};
    cache[key].timestamp = Date.now();

    superagent
    .get(url)
    .query(query)
    .then(summaries => {
      const weatherArray = parseWeather (summaries.body);
      weatherArray.then (day => {
        cache[key].data = day;
        response.status(200).send(cache[key].data);
      })
    })
    .catch((error => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!');
    }));
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
    this.description = `Low of ${day.low_temp} and high of ${day.high_temp} with ${day.weather.description}`;
    this.date = day.datetime;
  }
}

module.exports = getWeather;
