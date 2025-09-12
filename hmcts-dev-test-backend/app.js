const express = require('express');
const router = require('./src/routes/index');
const ApiError = require('./src/utils/apiError');
const errorHandler = require('./src/controllers/errorController');
require('dotenv').config();

process.on('uncaughtException', (err) => {
  console.log(`Task-API :: Error :: uncaughtException ${err}`);
  process.exit(1);
});

const app = express();
app.use(express.json()); // middleware to parse JSON bodies

// liveness probs for kubernetes
app.get('/liveness', async (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// rediness probs for kubernetes
app.get('/rediness', async (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.use('/api/v1/tasks', router);

app.use('/', (req, res, next) => {
  next(new ApiError(`${req.originalUrl} Route not found`, 404));
});

// Error middleware
app.use(errorHandler);

module.exports = app;
