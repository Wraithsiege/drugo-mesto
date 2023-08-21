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
    await queryInterface.bulkInsert("Toys", [{
      manufacturer: "Happy Kid",
      type: "Plushie",
      name: "Ben The Shark",
      color: "Grey",
      price: 200
    },
    {
      manufacturer: "Happy Kid",
      type: "Puzzle",
      name: "Yellow Puzzle",
      color: "Yellow",
      price: 800
    },
    {
      manufacturer: "Happy Kid",
      type: "Board Game",
      name: "The Fastest One",
      color: "Brown",
      price: 2600
    },
    {
      manufacturer: "Happy Kid",
      type: "Kitchen Set",
      name: "My Kitchen",
      color: "Black",
      price: 5000
   },
    {
      manufacturer: "Happy Kid",
      type: "Creative Center",
      name: "Creative Center",
      color: "Green",
      price: 8600
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
