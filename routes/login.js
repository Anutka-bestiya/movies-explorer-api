const routerLogin = require('express').Router();
const { login } = require('../controllers/users');
const { userLoginValidation } = require('../utils/validation');

routerLogin.post('/', userLoginValidation, login); // авторизация

module.exports = routerLogin;
