const express = require('express');
const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');

const router = express.Router();

router.use('/auth', auth);
router.use('/users', users);
module.exports = router;
