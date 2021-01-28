
const Sequelize = require('sequelize')
const db = require('../db')

const ComicBook = db.define('comicBook', {
  title: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      len: [1, 100]
    }
  },
  cover: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: 'https://assets.rappler.co/332C37C25F1C494CB2A72D68B08BC456/img/BFF17363FAC142EE9A8D8C37949C5EA4/20170919_-_Blisstina_-_1.jpg'
  },
  canvasJSON: {
    type: Sequelize.JSON
  }
})

module.exports = ComicBook
