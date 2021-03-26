'use strict';
const superagent = require('superagent');
const Movies = require('./movieConstructor');

function handleMovies(request,response){
  const { title, overview, average_votes } = request.query;
  const url = `https://api.themoviedb.org/3/movie/550`;
  const query = {
    key: process.env.MOVIE_API_KEY,
    title: title,
    overview: overview,
    average_votes: average_votes
  }

  superagent
  .get(url)
  .query(query)
  .then(superagentResults => {
    const movieArray = superagentResults.body.data.map(item => {
      return new Movies(item);
    })
    console.log(movieArray);
    response.status(200).send(movieArray);
  })
  .catch(err => {
    console.log('something went wrong with superagent call');
    response.status(500).send(err.message);
  });
}

module.exports = handleMovies;
