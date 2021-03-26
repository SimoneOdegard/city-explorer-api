'use strict';

function Movies(obj){
  this.title = obj.title; 
  this.description = `rated ${obj.average_votes} by viewers. ${obj.overview}`;
}

module.exports = Movies;
