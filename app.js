const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
// const path = require('path');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => console.log('Успешное подключение к базе данных!'));

const app = express();

// временное решение авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '605b55f4e5dc578ff8ac61d3' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(bodyParser.json());

app.use(router); // любой запрос предавай на корневой роутер

app.listen(PORT, () => {
    console.log('App start');
});

// app.use(function (req, res, next) {
//   console.log(`${req.method} ${req.path}`)
// next(); });

// app.use(express.static(path.join(__dirname, 'public')));