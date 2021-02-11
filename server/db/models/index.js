
const Sequelize = require("sequelize");
const db = require("../db");
const CanvasElement = require("./canvasElement");
const ComicBook = require("./ComicBook");
const Page = require("./page");
const User = require("./user");

// these associations are currently unused >>>>>>>>>>>>>
Page.belongsTo(ComicBook);
ComicBook.hasMany(Page);

User.hasMany(ComicBook);
ComicBook.belongsTo(User);

//>>>>>>>>>>>>>>
// the associations below are the only ones we are using right now:
User.hasOne(Page);
Page.belongsTo(User);

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
