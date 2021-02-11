const router = require("express").Router();
const { Page } = require("../db/models");

// GET api/page/:canvasId
router.get("/:canvasId", async (req, res, next) => {
  try {
    console.log('We are in the correct backend route!');
    console.log('canvasId:', req.params.canvasId);
    const canvasId = req.params.canvasId;

    const page = await Page.findOne({
      where: {
        canvasId: canvasId,
      },
    });

    res.json(page);
  } catch (error) {
    next(error);
  }
});

router.post("/:canvasId", async (req, res, next) => {
  try {
    const canvasId = req.params.canvasId;
    const newPage = req.body;

    const pageExists = await Page.findOne({
      where: {
        canvasId: canvasId,
      },
    });

    if (pageExists) {
      // update page
      const [numUpdatedPages, updatedPages] = await Page.update(
        {
          pageData: newPage,
        },
        {
          where: {
            canvasId: canvasId,
          },
          returning: true,
          plain: true,
        }
      );
      res.json(updatedPages);
    } else {
      // create new
      const createdPage = await Page.create({
        pageData: newPage,
        canvasId: canvasId,
      });
      res.json(createdPage);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
