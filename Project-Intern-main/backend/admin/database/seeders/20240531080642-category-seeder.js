"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "News",
          slug: "news",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sports",
          slug: "sports",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // {
        //   name: "Khoa học",
        //   slug: "khoa-hoc",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   name: "Giải trí",
        //   slug: "giai-tri",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
