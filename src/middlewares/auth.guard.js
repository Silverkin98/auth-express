const authService = require('../services/auth/auth.service');

const publicRoutes = [
  '/',
  '/api/auth/login',
  '/api/auth/register',
];
async function basicAuth(req, res, next) {
  // if request is public, skip auth
  if (publicRoutes.includes(req.path)) {
    return next();
  }

  // check for basic auth header
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }

  // verify auth credentials
  const base64Credentials = req.headers.authorization.split(' ')[1];
  // decode base64 credentials
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
  // split credentials into username and password
  const [username, password] = credentials.split(':');
  // authenticate user
  const user = await authService.authenticate({ username, password });
  if (!user) {
    return res.status(401).json({ message: 'Invalid Credentials' });
  }
  // attach user to request object
  req.user = user;
  next();
}

module.exports = {
  basicAuth,
};
