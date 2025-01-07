'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
      {
        title: 'Bài viết 1',
        body: 'Đây là nội dung của bài viết 1',
        user_id: '1',
        status: 'active',
        file: '',
        category_id: '1',
        language_id: '1',
        slug: 'bai_viet_1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
