require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { createUser, login, logout } = require('./controllers/users');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const {
  URL_PATTERN,
} = require('./utils/utils');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const app = express();
const { cors } = require('./middlewares/corsHandler');
app.use(cors);

app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  'mongodb://localhost:27017/mestodb',
  (err) => {
    if (err) throw err;
  },
);

const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errorsHandler');

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_PATTERN),
  }),
}), createUser);

app.use(auth);

app.get('/signout', (req, res) => {
  // console.log(cookie);
  res.clearCookie('jwt').send({ message: 'Выход' });
  // console.log(cookie);
});
// app.get('/signout', logout);

app.use(usersRouter);
app.use(cardsRouter);
app.use('*', () => {
  throw new NotFoundError('Вы сделали что-то не то. Вернитесь назад.');
});

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
app.listen(PORT, () => {
  // console.log(`App listen to ${PORT} port`);
});
