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
    await queryInterface.bulkInsert("Writing Accessories", [{
      manufacturer: "GoodPens",
      type: "Pen",
      color: "Blue",
      price: 100
    },
    {
      manufacturer: "GoodPens",
      type: "Pencil",
      color: "Black",
      price: 80
    },
    {
      manufacturer: "GoodPens",
      type: "Pen",
      color: "Black",
      price: 120
    },
    {
      manufacturer: "GoodPens",
      type: "Pen",
      color: "Multicolor",
      price: 250
   },
    {
      manufacturer: "GoodPens",
      type: "Pencil",
      color: "Green",
      price: 75
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
