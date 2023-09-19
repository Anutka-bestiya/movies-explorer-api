const { celebrate, Joi } = require('celebrate');
const { PASS_REGEX, LINK_REGEX } = require('./regex');

const userLoginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).regex(PASS_REGEX),
  }),
});

const userCreateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).regex(PASS_REGEX),
  }),
});

const userDataValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const movieDataValidation = celebrate({
  body: Joi.object().keys({
    // country, director, duration, year, description, image,
    // trailer, nameRU, nameEN и thumbnail, movieId
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().min(2).max(200).required(),
    image: Joi.string().required().regex(LINK_REGEX),
    trailerLink: Joi.string().required().regex(LINK_REGEX),
    nameRU: Joi.string().min(2).max(30).required(),
    nameEN: Joi.string().min(2).max(30).required(),
    thumbnail: Joi.string().required().regex(LINK_REGEX),
    movieId: Joi.number().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  userLoginValidation,
  userCreateValidation,
  userDataValidation,
  movieDataValidation,
  movieIdValidation,
};
