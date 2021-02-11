const Sequelize = require("sequelize");
const db = require("../db");

const CanvasElement = db.define("canvasElement", {
  imageUrl: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
});

module.exports = CanvasElement;
