'use strict';

//libraries
require('dotenv');
const express = require('express');
const cors = require('cors');

// server initialization
const app = express();

// opens up server
// added
app.use(cors());

// require
const weather = require('./modules/weather.js');

// PORT
// added
const PORT = process.env.PORT || 3002;

// routes
// app.get('/weather', weatherHandler);
app.get('/weather', weather);



// function weatherHandler(request, response) {
//   const { lat, lon } = request.query;
//   weather(lat, lon)
//   .then(summaries => response.send(summaries))
//   .catch((error) => {
//     console.error(error);
//     response.status(200).send('Sorry. Something went wrong!')
//   });
// }  

// app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));
app.listen(PORT, () => console.log(`Server up on ${PORT}`));