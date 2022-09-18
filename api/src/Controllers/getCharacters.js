const axios = require('axios');
require('dotenv').config();
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const { Character } = require('../db.js');



//------------------------- DB -------------------------------------
async function getDBInfo(name) {
    try {
        if(!name) {
            const char = await Character.findAll({
                where: {
                    createdInDB: true
                }
            })
            let data = char.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    species: e.species,
                    origin: e.origin,
                    image: e.image,
                    created: e.created,
                    createdInDB: e.createdInDB,
                }
            })
            console.log(data.length, 'CHARACTERS TRAIDOS DE LA BASE DE DATOS')
            return data;
        }

        const char = await Character.findAll({
            where: {
                name: {
                    [op.iLike]: `%${name}%`
                }
            }
        })
        let data = char.map(e => {
            return {
                id: e.id,
                name: e.name,
                species: e.species,
                origin: e.origin,
                image: e.image,
                created: e.created,
                createdInDB: e.createdInDB,
            }
        })
        console.log(data.length, 'CHARACTERS TRAIDOS DE LA BASE DE DATOS')
        return data;

    } catch (error) {
        console.log(error);
    }
}



//----------------------------- API -------------------------------------
async function getApiInfo(name) {
    try {
        if (!name) {
            let apiData = [];
            let URL = `https://rickandmortyapi.com/api/character?page=`;
            for(let i=1; i<43; i++) {
                let pages = await axios.get(`${URL}${i}`)
                pages.data.results.map(e => {
                    apiData.push(
                        {
                            id: e.id,
                            name: e.name,
                            species: e.species,
                            origin: e.origin,
                            image: e.image,
                            created: e.created,
                            createdInDB: false,
                        }
                    )
                    next_URL = pages.data.next
                })
            }
            console.log(apiData.length, 'CHARACTERS TRAIDOS DE LA API')
            return apiData;
        }

        let {data} = await axios.get(`https://rickandmortyapi.com/api/character?name=${name}`)
        let apiData = [];
        data.results.map(e => {
            apiData.push(
                {
                    id: e.id,
                    name: e.name,
                    species: e.species,
                    origin: e.origin,                        
                    image: e.image,
                    created: e.created,
                    createdInDB: false,
                }
            )
        })
        console.log(apiData.length, 'CHARACTERS TRAIDOS DE LA API')
        return apiData;

    } catch (error) {
        console.log(error)
    }
}



//----------------------------- API + DB -------------------------------------
async function getAllInfo(req, res, next){
    try {
        const name = req.query.name
        if(!name){
            let data = await getApiInfo()
            let myData = await getDBInfo()
            if(!myData || myData.length === 0){
                if(!data || data.length === 0){
                    return res.status(404).json({msg: "Oops, something went wrong"})  //si llego aca es que no encontre nada en la DB ni en la Api
                }      
                return res.json(data)  //si llego aca es que no encontro nada en la DB pero si en la Api
            }
            let totalData = data.concat(myData)
            return res.json(totalData)   //aca traigo toda la info de la Api + la DB
        }

        let data = await getApiInfo(name)
        let myData = await getDBInfo(name)
        if(!myData || myData.length === 0){
            if(!data || data.length === 0){
                return res.status(404).json({msg: "Oops, this character does not exist"})
            }
            return res.json(data)
        }
        let totalData = [...myData, ...data] 
            return res.json(totalData)

    } catch (error) {
        return next(error)
    }
}



module.exports = getAllInfo