const UserService = require('./service');
const UserModel = require('./model');

const { schemaForName, schemaForEmail, schemaForBoth } = require('./validation');

async function getAll(req, res, next) {
  try {
    const users = await UserService.findAll();
    if (users.email && users.name) {
      await schemaForBoth.validateAsync(users);
    } else if (users.email || users.name) {
      await schemaForEmail.validateAsync(users);
    }
    res.status(200).json({ email: users.email });
  } catch (error) {
    if (error.isJoi) {
      res.status(400).send(error.details[0].message);
    }
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const newUser = {
      email: req.body.email,
      name: req.body.name
    };

    await schemaForBoth.validateAsync(newUser);

    if (!newUser.name || !newUser.email) {
      return res.status(400).json({ message: 'Please type a name and email' });
    }

    UserModel.push(newUser);

    res.status(201).json(UserModel[UserModel.length - 1]);
  } catch (error) {
    if (error.isJoi) {
      res.status(400).send(error.details[0].message);
    }
    next(error);
  }
}

async function update(req, res, next) {
  try {
    await schemaForName.validateAsync({ name: req.body.name });

    UserModel.forEach(user => {
      if (req.body.name) {
        user.name = req.body.name;

        res.status(201).json({ name: user.name });
      } else {
        res.status(400).json({ message: 'No name was found' });
      }
    });
  } catch (error) {
    if (error.isJoi) {
      res.status(400).send(error.details[0].message);
    }

    next();
  }
}

async function remove(req, res) {
  try {
    await schemaForName.validateAsync({ name: req.body.name });

    UserModel.forEach(user => {
      if (req.body.name === user.name) {
        delete(user.name);
        res.status(200).json({ email: user.email });
      } else {
        res.status(400).json({ message: 'No name was found', user });
      }
    });
  } catch (error) {
    if (error.isJoi) {
      res.status(400).send(error.details[0].message);
    }
  }
}

module.exports = {
  getAll,
  create,
  update,
  remove,
}
