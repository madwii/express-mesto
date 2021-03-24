//функции, которые занимаются непосредственно обработкой запросов
const User = require("../models/user");

//поиск всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

//поиск одного пользователя по id
const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      res.send(user);
    })
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

//создание пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Ошибка валидации" });
      } else {
        res.status(500).send({ message: `Внутренняя ошибка сервера ${err}` });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const { _id = "" } = req.user;
  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      res.send(user);
    })
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id = "" } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!avatar) {
        return res.status(400).send({ message: "Ошибка валидации" });
      }
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
      res.send(user);
    })
    .catch((err) => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};