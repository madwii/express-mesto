const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');

router.post('/signup', createUser);

router.post('/signin', login);

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
