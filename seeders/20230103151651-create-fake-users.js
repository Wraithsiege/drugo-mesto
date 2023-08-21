'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert("Users", [{
      username: "admin",
      email: "admin@stefan.com",
      password: "admin123",
      admin: true,
      moderator: false
    },
    {
      username: "pera",
      email: "pera@stefan.com",
      password: "sifra123",
      admin: false,
      moderator: false
    },
    {
      username: "mika",
      email: "mika@stefan.com",
      password: "sifra321",
      admin: false,
      moderator: false
    },
    {
      username: "zika",
      email: "zika@stefan.com",
      password: "moderator123",
      admin: false,
      moderator: true
   },
    {
      username: "djole",
      email: "djole@stefan.com",
      password: "lozinka123",
      admin: false,
      moderator: false
   }])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
