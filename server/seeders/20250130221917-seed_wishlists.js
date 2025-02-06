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

    let wishlists = require('../data/wishlists.json');
    wishlists.forEach(wishlist => {
      delete wishlist.id;
      wishlist.createdAt = new Date();
      wishlist.updatedAt = new Date();
    })

    await queryInterface.bulkInsert('Wishlists', wishlists, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Wishlists', null, {});
  }
};
