'use strict';
const superagent = require('superagent');
const Movies = require('./movieConstructor');

function handleMovies(request,response){
  console.log('made it to movies');
  const { city_name } = request.query;
  const url = `https://api.themoviedb.org/3/search/movie`;
  const query = {
    api_key: process.env.MOVIE_API_KEY,
    query: city_name
  }

  superagent
  .get(url)
  .query(query)
  .then(superagentResults => {
    const movieArray = superagentResults.body.results.map(item => {
      return new Movies(item);
    })
    console.log(movieArray);
    response.status(200).send(movieArray);
  })
  .catch(err => {
    console.log('something went wrong with superagent call', err);
    response.status(500).send(err.message);
  });
}

module.exports = handleMovies;
