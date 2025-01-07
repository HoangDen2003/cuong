"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Languages",
      [
        {
          flag: "vn.png",
          locale: "vi",
          name: "Tiếng Việt",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          flag: "en.png",
          locale: "en",
          name: "English",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          flag: "cn.png",
          locale: "zh",
          name: "中国人",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Languages", null, {});
  },
};
