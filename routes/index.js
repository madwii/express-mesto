const router = require('express').Router();

const { createUser, login } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../middlewares/validatons');

const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');

router.post('/signup', validateCreateUser, createUser);

router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/', userRouter);
router.use('/', cardRouter);

router.use('/*', (req, res) => {
  res
    .status(404)
    .send({
      message:
        'Cервер не может найти запрашиваемый ресурс',
    });
});

module.exports = router;
