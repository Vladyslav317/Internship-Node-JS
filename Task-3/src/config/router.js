const express = require('express');

const { getAll, create, update, remove }
  = require('../components/user/controller');

const router = express.Router();

router.get('/v1/user', (req, res, next) => {
  getAll(req, res, next);
});

router.post('/v1/user', (req, res, next) => {
  create(req, res, next);
});

router.patch('/v1/user', (req, res, next) => {
  update(req, res, next);
});

router.delete('/v1/user', (req, res) => {
  remove(req, res);
});

module.exports = router;
