require('express-async-errors')
const express = require('express')
const router = require('./routes/index')
const app = express()
const appError = require('./utils/appError')

app.use(express.json())
app.use(router)

app.use((error, req, res, next) => {
  if (error instanceof appError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  return res.status(500).json({
    error: 'error',
    message: 'Internal Server Error'
  })
})

const PORT = 5000
app.listen(PORT, () => {
  console.log("It's Running")
})
