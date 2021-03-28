'use strict';

function Forecast(obj){
  this.description = `Low of ${obj.low_temp} and high of ${obj.high_temp} with ${obj.weather.description}`;
  this.date = obj.datetime; 
}

module.exports = Forecast;
