const express = require('express');

const gracefulShutdown = require('http-graceful-shutdown');
const { middleware } = require('../config/middleware');

const app = express();

middleware(app);

const server = app.listen(3000, () => {
  console.log('server is running');
});

gracefulShutdown(server);
