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

    await queryInterface.bulkInsert("Messages", [{
      content: "Cao",
      userId: 1
    },
    {
      content: "Zdravo",
      userId: 2
    },
    {
      content: "Sta ima?",
      userId: 1
    },
    {
      content: "Cao",
      userId: 3
   },
    {
      content: "Eeee",
      userId: 2
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
