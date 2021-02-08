const Sequelize = require('sequelize');
const db = require('../db');
const CanvasElement = require('./canvasElement');
const ComicBook = require('./ComicBook');
const Page = require('./page');
const User = require('./user');

Page.belongsTo(ComicBook);
ComicBook.hasMany(Page);

User.hasMany(ComicBook);
ComicBook.belongsTo(User);

ComicBook.findComicBookAndItsPages = function (comicBookId) {
  return ComicBook.findByPk(comicBookId, {
    include: [
      {
        model: Page,
      },
    ],
  });
};

module.exports = {
  CanvasElement,
  ComicBook,
  Page,
  User,
};
