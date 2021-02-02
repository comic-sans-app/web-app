const Sequelize = require('sequelize');
const db = require('../db');

const Page = db.define('page', {
  pageData: {
    type: Sequelize.JSON,
  },
  canvasId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Page;
