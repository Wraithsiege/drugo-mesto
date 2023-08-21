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
    await queryInterface.bulkInsert("Books", [{
      title: "JavaScript",
      author: "Pera Peric",
      genre: "Educational",
      publisher: "EduBooks",
      price: 1250
    },
    {
      title: "Ruby On Rails",
      author: "Mika Mikic",
      genre: "Educational",
      publisher: "EduBooks",
      price: 1250
    },
    {
      title: "Space Fights",
      author: "Zika Zikic",
      genre: "Science Fiction",
      publisher: "EpicBooks",
      price: 1000
    },
    {
      title: "Middle Ages",
      author: "Jovan Jovic",
      genre: "History",
      publisher: "HistoryBooks",
      price: 600
   },
    {
      title: "Space Fights 2",
      author: "Zika Zikic",
      genre: "Science Fiction",
      publisher: "EpicBooks",
      price: 800
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
