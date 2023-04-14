const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { prisma } = require('../../utils/db');

// function to remove password from user object
function removePassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// gets user by email or username
function findUserByEmailOrUsername(email, username) {
  return prisma.users.findFirst({
    where: {
      OR: [
        {
          email,
        },
        {
          username,
        },
      ],
    },
  }).then((user) => removePassword(user));
}

// gets user by username
function findUserByUsername(username) {
  return prisma.users.findFirst({
    where: {
      username,
    },
  });
}

// gets all users from database
function getAllUsers() {
  return prisma.users.findMany().then((users) => {
    // remove password from response
    return users.map((user) => removePassword(user));
  });
}

// creates a new user
function createUser(user) {
  // hash password
  user.password = bcrypt.hashSync(user.password, 13);
  // generate uuid
  user.id = uuidv4();
  const newUser = prisma.users.create({
    data: user,
  });
  // remove password from response
  return removePassword(newUser);
}

// esporto la funzione per poterla utilizzare altrove
module.exports = {
  getAllUsers,
  createUser,
  findUserByEmailOrUsername,
  findUserByUsername,
  removePassword,
};
