'use strict';

function Forecast(obj){
  this.description = `Low of ${obj.low_temp || 'no temp available'} and high of ${obj.high_temp || 'no temp available'} with ${obj.weather.description}`;
  this.date = obj.datetime; 
}

module.exports = Forecast;
