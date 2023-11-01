const mongoose = require('mongoose');
const Movie = require('../models/movie'); // данные
const {
  OK_STATUS_CODE,
  HTTP_CREATED_STATUS_CODE,
} = require('../utils/status_code');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const ConflictError = require('../errors/conflict-err');
const {
  BAD_DATA,
  NOT_FOUND_DATA,
  NOT_FOUND_ID,
  CONFLICT_MOVIE,
  FORBIDDEN,
} = require('../utils/message');

// Получение movies
const getMovies = (req, res, next) => {
  const owner = req.user._id; // используем req.user
  Movie.find({ owner })
    .then((movies) => {
      if (!movies) { next(new NotFoundError(NOT_FOUND_DATA)); }
      res.status(OK_STATUS_CODE).send(movies);
    })
    .catch(next);
};

// создание movie
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id; // используем req.user
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(HTTP_CREATED_STATUS_CODE).send(movie))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(CONFLICT_MOVIE));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(BAD_DATA));
      } else { next(err); }
    });
};

// удаление movie
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const someOwner = req.user._id; // используем req.user

  Movie
    .findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_ID);
      }
      const { owner: movieOwner } = movie;

      if (movieOwner.valueOf() !== someOwner) {
        throw new ForbiddenError(FORBIDDEN);
      }
      Movie.deleteOne(movie)
        .then((movieDel) => {
          res.status(OK_STATUS_CODE).send(movieDel);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(BAD_DATA));
      } else { next(err); }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
