const router = require('express').Router()
const { Page } = require('../db/models')

router.get('/:canvasId', async (req, res, next) => {
  try {

    const canvasId = req.params.canvasId;

    const page = await Page.findOne({
      where: {
        canvasId: canvasId
      }
    })

    res.json(page)
  }

  catch (error) {
    next(error)
  }
})

router.post('/:canvasId', async (req, res, next) => {
  try {

    const canvasId = req.params.canvasId;
    const newPage = req.body;

    const pageExists = await Page.findOne({
      where: {
        canvasId: canvasId
      }
    })

    if (pageExists){
      // update page
      await Page.update(
        {
          pageData: newPage
        },
        {
          where: {
            canvasId: canvasId
          }
        }
      )
    }

    else {
      // create new
      await Page.create({
        pageData: newPage,
        canvasId: canvasId
      })
    }

    res.send(200).end()
  }

  catch (error) {
    next(error)
  }
})

module.exports = router;

// "id":"canvas"

const data =
[
  {
     "type":"circle",
     "version":"4.3.1",
     "originX":"left",
     "originY":"top",
     "left":123,
     "top":378,
     "width":100,
     "height":100,
     "fill":"blue",
     "stroke":"green",
     "strokeWidth":3,
     "strokeDashArray":null,
     "strokeLineCap":"butt",
     "strokeDashOffset":0,
     "strokeLineJoin":"miter",
     "strokeUniform":false,
     "strokeMiterLimit":4,
     "scaleX":1,
     "scaleY":1,
     "angle":0,
     "flipX":false,
     "flipY":false,
     "opacity":1,
     "shadow":null,
     "visible":true,
     "backgroundColor":"",
     "fillRule":"nonzero",
     "paintFirst":"fill",
     "globalCompositeOperation":"source-over",
     "skewX":0,
     "skewY":0,
     "radius":50,
     "startAngle":0,
     "endAngle":6.283185307179586
  },
  {
     "type":"rect",
     "version":"4.3.1",
     "originX":"left",
     "originY":"top",
     "left":161,
     "top":235,
     "width":200,
     "height":200,
     "fill":"red",
     "stroke":null,
     "strokeWidth":1,
     "strokeDashArray":null,
     "strokeLineCap":"butt",
     "strokeDashOffset":0,
     "strokeLineJoin":"miter",
     "strokeUniform":false,
     "strokeMiterLimit":4,
     "scaleX":1,
     "scaleY":1,
     "angle":0,
     "flipX":false,
     "flipY":false,
     "opacity":1,
     "shadow":null,
     "visible":true,
     "backgroundColor":"",
     "fillRule":"nonzero",
     "paintFirst":"fill",
     "globalCompositeOperation":"source-over",
     "skewX":0,
     "skewY":0,
     "rx":0,
     "ry":0
  }
]
