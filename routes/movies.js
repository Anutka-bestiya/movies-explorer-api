const routerMovies = require('express').Router(); // создали роутер
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  movieDataValidation,
  movieIdValidation,
} = require('../utils/validation');

routerMovies.get('/', getMovies); // возвращает все сохранённые текущим пользователем фильмы
routerMovies.post('/', movieDataValidation, createMovie); // создаёт фильм
routerMovies.delete('/:movieId', movieIdValidation, deleteMovie); // удаляет сохранённый фильм по id

module.exports = routerMovies;
