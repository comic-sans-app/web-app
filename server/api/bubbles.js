const router = require('express').Router()
const {CanvasElement} = require('../db/models')
module.exports = router

//mount on api/textbubbles
router.get('/', async (req, res, next) => {
  try {
    let allBubbles = await CanvasElement.findAll({
        attributes: ['imageUrl']
    })
    //Map over it and get the array of string Urls
    // ['url1', 'url2', ...]
    //Reasoning: we need the imageUrl string in order to use fabric.imageUrl on the frontend
    let mappedBubbles = allBubbles.map(bubble => {
        return bubble.imageUrl
    })
    res.json(mappedBubbles)
  } catch (err) {
    next(err)
  }
})