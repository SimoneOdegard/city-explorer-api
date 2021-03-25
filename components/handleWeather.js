'use strict';
const superagent = require('superagent');
const Forecast = require('./ForecastConstructor');

function handleWeather(request,response){
  const { city_name, lat, lon } = request.query;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily`;
  const query = {
    key: process.env.WEATHER_API_KEY,
    city: city_name,
    lat: lat,
    lon: lon
  }

  superagent
  .get(url)
  .query(query)
  .then(superagentResults => {
    const weatherArray = superagentResults.body.data.map(day => {
      return new Forecast(day);
    })
    console.log(weatherArray);
    response.status(200).send(weatherArray);
  })
  .catch(err => {
    console.log('something went wrong with superagent call');
    response.status(500).send(err.message);
  });
}

module.exports = handleWeather;
