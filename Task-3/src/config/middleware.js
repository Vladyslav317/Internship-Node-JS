const compression = require('compression');
const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

function middleware(app) {
  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));

  app.use(cookieParser());

  app.use(compression());

  app.use(helmet());

  app.use(cors());

  app.use('/', require('../config/router'));
}

module.exports = {
  middleware
}
