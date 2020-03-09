import { TMDB_API_TOKEN } from 'react-native-dotenv'
import Movie from '../models/Movie'

const BASE_URL = 'https://api.themoviedb.org/3'

/**
 * Get a new page result for a text search from API
 * @param {string} text Text to search
 * @param {number} page Page number
 */
export async function getMoviesFromApiWithSearchedText (text, page) {
  const url = `${BASE_URL}/search/movie?api_key=${TMDB_API_TOKEN}&language=fr&query=${text}&page=${page}`
  const response = await fetch(url)
  const { results, ...restResponse } = await response.json()
  return {
    movies: results.map(Movie.fromApi),
    ...restResponse,
  }
}

/**
 * Get all information for a movie
 * @param {number} id Movie Id
 */
export async function getMovieDetailFromApi (id) {
  const url = `${BASE_URL}/movie/${id}?api_key=${TMDB_API_TOKEN}&language=fr`
  const response = await fetch(url)
  return Movie.fromDetailedApi(await response.json())
}

export async function getLatestMoviesFromApi (page) {
  const url = `${BASE_URL}/discover/movie?api_key=${TMDB_API_TOKEN}&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page=${page}`
  const response = await fetch(url)
  const { results, ...restResponse } = await response.json()
  return {
    movies: results.map(Movie.fromApi),
    ...restResponse,
  }
}
