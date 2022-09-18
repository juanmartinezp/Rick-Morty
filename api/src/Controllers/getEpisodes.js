const axios = require('axios');
require('dotenv').config();
const { Episode } = require('../db.js');



async function generateEpisodes() {  //Me guardo los episodios en la DB y la funcion generateEpisodes se ejecuta en el index cada vez que se levanta el server
    try {
        let URL = `https://rickandmortyapi.com/api/episode?page=`
        for(let i=1; i<4; i++) {
            let pages = await axios.get(`${URL}${i}`)
            pages.data.results.forEach(async (e) => {
            const [createdEpisodes, isCreated] = await Episode.findOrCreate({
                where: {
                    id: e.id,
                },
                defaults: {
                    name: e.name,
                    id: e.id
                }
            })
            console.log(isCreated)
            })
        }
    } catch (error) {
        console.log(error)
    }
}



async function getEpisodes(req, res) {
    try {
        const allDBEpisodes = await Episode.findAll()
        const orderDBEpisodes = allDBEpisodes.sort((a, b) => a.id - b.id)
        console.log(orderDBEpisodes.length, ' EPISODES FOUND IN THE DB')
        return res.json(orderDBEpisodes);

    } catch (error) {
        return res.status(404).json({msg: 'Oops, somethign went wrong with the episodes'})
    }
}



module.exports = {getEpisodes, generateEpisodes}