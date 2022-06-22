const UserModel = [{
  email: 'test@gmail.com'
}];

async function findAll() {
  return UserModel.find(user => user);
}

module.exports = {
  findAll,
  UserModel
}