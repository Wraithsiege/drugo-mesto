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
    await queryInterface.bulkInsert("School Accessories", [{
      manufacturer: "Epic School",
      type: "Ruler Set",
      color: "White",
      price: 600
    },
    {
      manufacturer: "Pen House",
      type: "Pencil Case",
      color: "Cartoon Theme",
      price: 1200
    },
    {
      manufacturer: "Pen House",
      type: "Pencil Case",
      color: "Green",
      price: 800
    },
    {
      manufacturer: "SchoolBag Inc",
      type: "School Bag",
      color: "Black",
      price: 5000
   },
    {
      manufacturer: "SchoolBag Inc",
      type: "School Bag Pro",
      color: "Black",
      price: 7500
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
