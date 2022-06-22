const UserModel = require('./model');

async function findAll() {
  return UserModel.find(user => user);
}

module.exports = {
  findAll,
}