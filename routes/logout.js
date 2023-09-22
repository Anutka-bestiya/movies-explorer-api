const routerLogout = require('express').Router();
const { logout } = require('../controllers/users');

routerLogout.get('/', logout); // выход

module.exports = routerLogout;
