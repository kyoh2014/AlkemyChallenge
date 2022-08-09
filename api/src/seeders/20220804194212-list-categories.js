'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    let categories = [

      { name: 'Without category', createdAt: new Date, updatedAt: new Date },
      { name: 'Shopping', createdAt: new Date, updatedAt: new Date},
      { name: 'Entertainment', createdAt: new Date, updatedAt: new Date},
      { name: 'Restaurants and Bars', createdAt: new Date, updatedAt: new Date},
      { name: 'Health and Sport', createdAt: new Date, updatedAt: new Date},
      { name: 'Services', createdAt: new Date, updatedAt: new Date},
      { name: 'Supermarket', createdAt: new Date, updatedAt: new Date},
      { name: 'Transportation', createdAt: new Date, updatedAt: new Date},
      { name: 'Holidays', createdAt: new Date, updatedAt: new Date}

    ]

  
    return queryInterface.bulkInsert('categories', categories, {});
  
  },

  down: (queryInterface, Sequelize) => {
    
    
    return queryInterface.bulkDelete('categories', null, {});
    
  }
};
