'use strict';
let cache = require('./cache.js');
const superagent = require('superagent');

function getMovies(request, response) {
  const { city_name } = request.query;
  const key = `movie-${city_name}`;
  const url = 'https://api.themoviedb.org/3/search/movie';
  const query = {
    api_key: process.env.MOVIE_API_KEY,
    query: city_name
  }
  
  
  if (cache[key] && (Date.now() - cache[key].timestamp < 300000)) {
    console.log('Cache hit movie');
    response.status(200).send(cache[key].data);
  } else {
    console.log('Cache miss movie');
    cache[key] = {};
    cache[key].timestamp = Date.now();

    superagent
    .get(url)
    .query(query)
    .then(superagentResults => {
      const movieArray = parseMovie (superagentResults.body);
      movieArray.then (item => {
        cache[key].data = item;
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

function parseMovie(movieData) {
  try {
    const movieSummaries = movieData.results.map(item => {
      return new Movies(item);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Movies {
  constructor(obj) {
    this.title = obj.title; 
    this.description = obj.overview;
  }
}

module.exports = getMovies;
