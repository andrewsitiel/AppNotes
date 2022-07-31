const { Router } = require('express')
const userRoutes = require('./users.routes')

const router = Router()

router.use('/route01', userRoutes)

module.exports = router
