const { Router } = require('express');

const ensureAuthenticated = require("../middleware/ensureAuthenticated");
const usersController = require('../controllers/usersController');

const controller = new usersController();
const userRoutes = Router();

userRoutes.post('/', controller.create)
userRoutes.put("/", ensureAuthenticated, controller.update)

module.exports = userRoutes
