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
    await queryInterface.bulkInsert("Movies", [{
      name: "Really Good Movie",
      genre: "Comedy",
      price: 600
    },
    {
      name: "Best Movie",
      genre: "Comedy",
      price: 650
    },
    {
      name: "Space Wars",
      genre: "Science Fiction",
      price: 400
    },
    {
      name: "Epic Adventure",
      genre: "Adventure",
      price: 450
   },
    {
      name: "Weird House",
      genre: "Horror",
      price: 560
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
