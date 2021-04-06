const jwt = require('jsonwebtoken');
const UnAuthError = require('../errors/un-auth-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnAuthError('Необходима авторизация');
  }
  // извлечь токен
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
    // записать пайлоад в объект запроса
    req.user = payload;
    next();
  } catch (err) {
    throw new UnAuthError('Необходима авторизация');
  }
};
