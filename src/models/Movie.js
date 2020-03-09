import {
  map as _map,
} from 'lodash'

function getImageFullPath (path, size = 300) {
  return `https://image.tmdb.org/t/p/w${size}${path}`
}

/**
 * Format simple movie response
 * @param {Object} response Response for a movie from API
 */
function fromApi (response) {
  return {
    id: response.id,
    title: response.title,
    voteAverage: response.vote_average,
    overview: response.overview,
    releaseDate: response.release_date,
    posterPath: getImageFullPath(response.poster_path),
  }
}

/**
 * Format detailed movie response from API
 * @param {Object} response Detailed response for a movie
 */
function fromDetailedApi (response) {
  return {
    id: response.id,
    title: response.title,
    voteAverage: response.vote_average,
    voteCount: response.vote_count,
    overview: response.overview,
    releaseDate: response.release_date,
    posterPath: getImageFullPath(response.poster_path),
    backdropPath: getImageFullPath(response.backdrop_path, 500),
    budget: response.budget,
    productionCompanies: _map(response.production_companies, 'name'),
    genres: _map(response.genres, 'name'),
  }
}

export default {
  fromApi,
  fromDetailedApi,
}
