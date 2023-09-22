const routerUsers = require('express').Router();
// const path = require("path");
const {
  getUserProfile,
  updateProfile,
} = require('../controllers/users');
const { userDataValidation } = require('../utils/validation');

routerUsers.get('/me', getUserProfile); // возвращает информацию о пользователе
routerUsers.patch('/me', userDataValidation, updateProfile); // обновляет информацию о пользователе

module.exports = routerUsers;
