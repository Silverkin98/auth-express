const bcrypt = require('bcrypt');
const userService = require('../users/users.service');

// function to authenticate user
async function authenticate({ username, password }) {
  // find user by username
  return userService.findUserByUsername(username).then((user) => {
    // check if user exists and password is correct
    if (user && bcrypt.compareSync(password, user.password)) {
      // remove password from user object before returning
      return userService.removePassword(user);
    }
    // if user not found or password is incorrect, return null
    return null;
  });
}

module.exports = {
  authenticate,
};
