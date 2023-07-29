"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Usop99",
          email: "usop@gmail.com",
          password:
            "$2a$10$Ld5F6BHFiIZ6iPX6sugsIuoOIpnE4CD5ci.WUm97vUqGDYNlqclY.",
          role: "Admin",
          isActive: true,
          imgProfile: null,
          createdAt: "2023-01-27 07:52:27",
          updatedAt: "2023-01-27 07:52:27",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  },
};
