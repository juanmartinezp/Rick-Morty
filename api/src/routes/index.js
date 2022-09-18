const { Router } = require("express");
const getAllInfo = require('../Controllers/getCharacters.js')

const router = Router();

// Configurar los routers
router.get('/characters', getAllInfo)

module.exports = router;
