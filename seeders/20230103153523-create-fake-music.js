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

    await queryInterface.bulkInsert("Music", [{
      albumName: "Nice Album",
      performer: "Zika Zikic",
      genre: "Rock",
      price: 300
    },
    {
      albumName: "Very Nice Album",
      performer: "Mika Mikic",
      genre: "Pop",
      price: 600
    },
    {
      albumName: "Amazing Music",
      performer: "Pera Peric",
      genre: "Jazz",
      price: 800
    },
    {
      albumName: "Guitar Sounds",
      performer: "Jovan Jovic",
      genre: "Heavy Metal",
      price: 500
   },
    {
      albumName: "ElectroSounds",
      performer: "Stefan Stefic",
      genre: "Electronic",
      price: 1000
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
