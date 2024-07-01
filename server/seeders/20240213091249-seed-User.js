'use strict';

const { hashPw } = require('../helpers/bcrypt');

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
    let password1 = hashPw('akuadmin1')
    let password2 = hashPw('akuadmin2')

    await queryInterface.bulkInsert('Users', [{
      fullname: "admin1",
      email: "1admin@mail.com",
      password: password1,
      address: "jl sini no.1, Surabaya",
      role: "Admin",
      updatedAt: new Date(),
      createdAt: new Date()
    },{
      fullname: "admin2",
      email: "2admin@mail.com",
      password: password2,
      address: "jl sana no.2, Surabaya",
      role: "Admin",
      updatedAt: new Date(),
      createdAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
