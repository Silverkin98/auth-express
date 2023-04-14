const { PrismaClient } = require('@prisma/client');

// database connection
const prisma = new PrismaClient();

module.exports = {
  prisma,
};
