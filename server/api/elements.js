const router = require("express").Router();
const { CanvasElement } = require("../db/models");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    let canvasElements = await CanvasElement.findAll({
      attributes: ["imageUrl", "type"],
    });

    res.json(canvasElements);
  } catch (error) {
    next(error);
  }
});
