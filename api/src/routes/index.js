const { Router } = require("express");
const {getAllInfo} = require('../Controllers/getCharacters.js')
const {getEpisodes} = require('../Controllers/getEpisodes.js')
const {createCharacter }= require('../Controllers/postCharacter.js')

const router = Router();

// Configurar los routers
router.get('/characters', getAllInfo)
router.get('/episodes', getEpisodes)
router.post('/character', createCharacter)


module.exports = router;
