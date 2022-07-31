const { Router } = require('express')
const usersController = require('../controller/usersController')

const controller = new usersController()
const userRoutes = Router()

userRoutes.post('/', controller.create)

module.exports = userRoutes
