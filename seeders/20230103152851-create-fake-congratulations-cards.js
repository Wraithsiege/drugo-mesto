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
    await queryInterface.bulkInsert("Congratulations Cards", [{
      type: "Wedding",
      price: 200
    },
    {
      type: "Birthday",
      price: 150
    },
    {
      type: "New Year",
      price: 150
    },
    {
      type: "Easter",
      price: 125
   },
    {
      type: "Birthday",
      price: 175
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
