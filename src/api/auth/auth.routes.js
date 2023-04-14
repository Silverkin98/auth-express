const express = require('express');

const router = express.Router();
const userService = require('../../services/users/users.service');
const authService = require('../../services/auth/auth.service');

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    // get username, email and password from request body
    const { username, email, password } = req.body;
    // verify if username, email and password are not empty
    if (!username || !email || !password) {
      res.status(400);
      throw new Error('Username, email and password are required');
    }
    // check if username and email are unique
    const user = await userService.findUserByEmailOrUsername(email, username);
    if (user) {
      res.status(409);
      throw new Error('User already exists');
    }
    const newUser = await userService.createUser({
      username,
      email,
      password,
    });
    // set content type to json
    res.type('application/json');
    // if user is created, send user object as response
    res.json(newUser);
  } catch (err) {
    // if error, pass it to the error handler
    next(err);
  }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    // get username and password from request body
    const { username, password } = req.body;
    // verify if username and password are not empty
    if (!username || !password) {
      res.status(400);
      throw new Error('Username and password are required');
    }
    // try to authenticate user
    const user = await authService.authenticate({ username, password });
    if (!user) {
      res.status(401);
      throw new Error('Invalid credentials');
    }
    // set content type to json
    res.type('application/json');
    // if user exists, send user object as response
    res.json(user);
  } catch (err) {
    // if error, pass it to the error handler
    next(err);
  }
});

module.exports = router;
