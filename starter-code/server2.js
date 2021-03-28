'use strict';

//libraries
require('dotenv');
const express = require('express');
const cors = require('cors');

// server initialization
const app = express();

// opens up server
app.use(cors());

// require
const weather = require('./starter-code/modules/weather.js');
const movie = require('./starter-code/modules/movie.js');

// PORT
const PORT = process.env.PORT || 3002;

// routes
app.get('/weather', weather);
app.get('/movies', movie);

app.listen(PORT, () => console.log(`Server up on ${PORT}`));