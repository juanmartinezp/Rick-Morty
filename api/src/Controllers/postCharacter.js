const { Character } = require('../db.js');
const axios = require('axios');
require('dotenv').config();
const Sequelize = require('sequelize');




async function createCharacter(req, res) {
    let {name, species, origin, image, created, createdInDB} = req.body

    if(!name || !species || !origin) {
        return res.status(404).send("Missing data to Create your Game");
    }
    //valido que el nombre del character no exista
    const findCharacter = await Character.findAll({ where: { name: name} });
    if( findCharacter.length > 0) {
        return res.send('That character already exists')
    }

    //creo un character
    let charCreate = await Character.create({
        name,
        species,
        origin,
        image: image ? image : 'https://i.etsystatic.com/36162656/r/il/4b8cc6/3940389176/il_340x270.3940389176_ahp9.jpg',
        created: created ? created : 'No created date available',
        createdInDB
    })
    return res.send('Character created successfully')
}



module.exports = {createCharacter}