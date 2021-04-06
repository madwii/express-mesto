const express = require('express');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const { handlerError } = require('./middlewares/handler-err');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: true,
}).then(() => console.log('Успешное подключение к базе данных!'));

const app = express();

app.use(bodyParser.json());

app.use(router); // любой запрос предавай на корневой роутер

app.use(errors());

app.use(handlerError);

app.listen(PORT, () => {
  console.log('App start');
});
