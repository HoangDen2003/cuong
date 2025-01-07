'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Thời sự',
        slug: 'thoi_su',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Thể thao',
        slug: 'the_thao',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Khoa học',
        slug: 'khoa_hoc',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Giải trí',
        slug: 'giai_tri',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
