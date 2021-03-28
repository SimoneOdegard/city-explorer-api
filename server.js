'use strict';

//libraries
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// server initialization
const app = express();

// opens up server
app.use(cors());

// require
// const handleWeather = require('./components/handleWeather');
// const handleMovies = require('./components/handleMovies');
const weather = require('./starter-code/modules/weather.js');
const movie = require('./starter-code/modules/movie.js');

// PORT
const PORT = process.env.PORT || 3002;

// routes
app.get('/', function (request, response) {
  response.send('Hello World')
})
// app.get('/weather', handleWeather);
// app.get('/movies', handleMovies);
app.get('/weather', weather);
app.get('/movies', movie);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
