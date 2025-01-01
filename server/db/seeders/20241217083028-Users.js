const { hashSync } = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmail.com',
        password: hashSync('adminadmin', 5),
        UUID: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'katya@gmail.com',
        password: hashSync('p#sT6$8z', 5),
        UUID: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'artemVolk@gmail.com',
        password: hashSync('@5hK9*dB', 5),
        UUID: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {}, {});
  },
};
