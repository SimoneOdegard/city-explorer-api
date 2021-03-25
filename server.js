'use strict';

const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());

const superagent = require('superagent');

const PORT = process.env.PORT || 3002;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY

app.get('/', function (request, response) {
    response.send('Hello World')
})

app.get('/weather', handleWeather);

app.use('*', (request, response) => {
  response.status(404).send('404: page not found!')
});

// const weather = require('');

function handleWeather(request,response){
  const city = request.query.city_name;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily`;
  const query = {
    city: city,
    key: WEATHER_API_KEY
  }

  superagent
  .get(url)
  .query(query)
  .then(superagentResults => {
  
    const weatherArray = superagentResults.body.data.map(agent => {
      return new Forecast(agent);
    })
    console.log(weatherArray)
    response.status(200).send(weatherArray)
  })
  .catch(err => {
    response.status(500).send(err.message)
  })

  // const city = weather.city_name;
  // const lat = weather.lat;
  // const lon = weather.lon;
  
//   try{
//     let array = weather.data.map(day => {
//       return new Forecast(day)
//       });
//       const results = {
//         city: city,
//         lat: lat,
//         lon: lon,
//         forecast: array,
//         key: process.env.WEATHER_API_KEY
//       };
//     response.status(200).json(results);
//   } catch (error) {
//     response.status(500).send(error.message);
// }
}

function Forecast(obj){
    this.description = obj.weather.description;
    this.date = obj.datetime; 
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));



