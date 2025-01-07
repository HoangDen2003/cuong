'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        email: 'admin@gmail.com',
        birthday: new Date('2024-05-31'),
        password: 'admin',
        address: 'Ha Noi',
        role_id: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user',
        email: 'user@gmail.com',
        birthday: new Date('2024-05-31'),
        password: 'user',
        address: 'Ha Noi',
        role_id: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});

  }
};
