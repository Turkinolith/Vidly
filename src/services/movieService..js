import httpService from "./httpService";
import { Endpoint } from "../config.json";

const movielist = Endpoint + "/movies";

function movieURL(id) {
  return `${movielist}/${id}`;
}

export function getRealMovies() {
  return httpService.get(movielist);
}

export function getRealMovie(id) {
  return httpService.get(movieURL(id));
}

/* 
///////////// DEAD OLD ONE THAT DIDN"T WORK

export async function saveRealMovie(movie) {
  const { data: genres } = await getRealGenres();
  const { data: movies } = await httpService.get(movielist);
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = genres.find(g => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    //movieInDb._id = Date.now().toString();
    //movies.push(movieInDb);
    const { data: post } = await httpService.post(movielist, movieInDb);
  }

  await httpService.put(`${movielist}/${movieInDb._id}`, movieInDb);
  //return movieInDb;
}

//////////// ORIGINAL FAKE MOVIE SERVICE SAVE

export function saveMovie(movie) {
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString();
    movies.push(movieInDb);
  }

  return movieInDb;
}

*/

// WORKING SAVE
export function saveRealMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return httpService.put(movieURL(movie._id), body);
  }

  return httpService.post(movielist, movie);
}

export function deleteMovie(id) {
  return httpService.delete(movieURL(id));
}
