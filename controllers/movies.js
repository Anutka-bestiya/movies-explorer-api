const mongoose = require('mongoose');
const Movie = require('../models/movie'); // данные
const {
  OK_STATUS_CODE,
  HTTP_CREATED_STATUS_CODE,
} = require('../utils/status_code');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

// Получение movies
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(OK_STATUS_CODE).send(movies))
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
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('При создании карточки переданы некорректные данные'));
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
        throw new NotFoundError('Не найдена карточка с таким id');
      }
      const { owner: movieOwner } = movie;

      if (movieOwner.valueOf() !== someOwner) {
        throw new ForbiddenError('Карточку может удалить только ее автор');
      }
      Movie.deleteOne(movie)
        .then((movieDel) => {
          res.status(OK_STATUS_CODE).send(movieDel);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('При попытке удаления фильма переданы некорректные данные'));
      } else { next(err); }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
