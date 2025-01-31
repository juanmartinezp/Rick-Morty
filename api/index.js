const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {generateEpisodes} = require('./src/Controllers/getEpisodes.js')
require ('dotenv').config()


// Syncing all the models at once.

// Para la precarga cuando se levanta el server, ejecutar la funcion getEpisodes(). Al ser una peticion vamos a usar async await.

conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    generateEpisodes();
    console.log("Listening at 3001"); // eslint-disable-line no-console
  });
});
