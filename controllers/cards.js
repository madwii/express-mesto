const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: `Внутренняя ошибка сервера ${err}` }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Ошибка валидации' });
      } else {
        res.status(500).send({ message: `Внутренняя ошибка сервера ${err}` });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Не найдена карточка по id' });
    }
    return res.send(card);
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Ошибка данных' });
      } else {
        res.status(500).send({ message: `Внутренняя ошибка сервера ${err}` });
      }
    });
};

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Не найдена карточка по id' });
    }
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Ошибка данных' });
    } else {
      res.status(500).send({ message: `Внутренняя ошибка сервера ${err}` });
    }
  });

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Не найдена карточка по id' });
    }
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Ошибка данных' });
    } else {
      res.status(500).send({ message: `Внутренняя ошибка сервера ${err}` });
    }
  });

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
