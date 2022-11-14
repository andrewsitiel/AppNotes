require('express-async-errors');

const cors = require("cors")

const express = require('express');

const router = require('./routes/index');

const app = express();

const migrationsRun = require('../src/database/sqlite/migrations/index');
const appError = require('./utils/appError');
const { UPLOADS_FOLDER } = require('./configs/upload');

app.use(express.json());
app.use(cors());

app.use("/files", express.static(UPLOADS_FOLDER))
app.use(router);


migrationsRun();

app.use((error, req, res, next) => {
  if (error instanceof appError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  };

  return res.status(500).json({
    error: 'error',
    message: 'Internal Server Error'
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("It's Running");
});
