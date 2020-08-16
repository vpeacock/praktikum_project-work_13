const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users.length) {
        res.status(404).send({ message: 'В базе данных пользователи не созданы' });
        return;
      }
      res.send({ data: users });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      res.status(404).send({ message: 'Пользователя с таким id не существует' });
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })

    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Данные не прошли валидацию' });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не существует' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Данные не прошли валидацию' });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Данные не прошли валидацию' });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};
