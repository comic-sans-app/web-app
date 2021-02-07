const router = require('express').Router()
const {CanvasElement} = require('../db/models')
module.exports = router

//mount on api/characters
router.get('/', async (req, res, next) => {
  try {
    let allCharacters = await CanvasElement.findAll({
        //this will only get the char type from the imageUrls in CanvasElement
        where: {
          type: 'character'
        }
    })
    //Map over it and get the array of string Urls
    // ['url1', 'url2', ...]
    //Reasoning: we need the imageUrl string in order to use fabric.imageUrl on the frontend
    let mappedChars = allCharacters.map(char => {
        return char.imageUrl
    })
    res.json(mappedChars)
  } catch (err) {
    next(err)
  }
})