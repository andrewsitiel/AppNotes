const { Router } = require('express')
const usersController = require('../controller/usersController')

const controller = new usersController()
const userRoutes = Router()

userRoutes.post('/', controller.create)
userRoutes.put("/:id", controller.update)

module.exports = userRoutes
