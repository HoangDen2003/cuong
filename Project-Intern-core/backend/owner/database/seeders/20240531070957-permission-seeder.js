'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Permissions', [
      {
        name: 'add',
        group_id: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'update',
        group_id: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'delete',
        group_id: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {});
  }
};
