const appError = require('../utils/appError')

class usersController {
  create(req, res) {
    const { name, email, password } = req.body

    if (!name) {
      throw new appError('Nome é obrigatório')
      return
    }

    res.status(201).json({ name, email, password })
  }
}

module.exports = usersController
