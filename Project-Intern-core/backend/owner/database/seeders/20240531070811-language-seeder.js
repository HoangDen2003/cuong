'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Languages', [
      {
        flag: 'vn.png',
        locale: 'vi-VI',
        name: 'Việt Nam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flag: 'kr.png',
        locale: 'kr-KR',
        name: 'Hàn Quốc',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flag: 'cn.png',
        locale: 'cn-CN',
        name: 'Trung Quốc',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Languages', null, {});
  }
};
