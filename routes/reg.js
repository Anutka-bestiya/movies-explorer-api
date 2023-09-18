const routerReg = require('express').Router();
const { createUser } = require('../controllers/users');
const { userCreateValidation } = require('../utils/validation');

routerReg.post('/', userCreateValidation, createUser); // регистрация

module.exports = routerReg;
