import axios from 'axios';

//------------------------RUTAS------------------------
const RUTA_CHARACTERS = 'http://localhost:3001/characters';
const RUTA_EPISODES = 'http://localhost:3001/episodes';



//---------------------ACTION TYPES---------------------
export const GET_ALL_CHARACTERS = 'GET_ALL_CHARACTERS';
export const GET_CHAR_BY_NAME = 'GET_CHAR_BY_NAME';
export const CREATE_CHARACTER = 'CREATE_CHARACTER';
export const GET_ALL_EPISODES = 'GET_ALL_EPISODES';
export const CLEAR_CACHE = 'CLEAR_CACHE';



//---------------------ACTION CREATORS---------------------
export function getAllCharacters() {
    return function(dispatch) {
        return axios.get(`${RUTA_CHARACTERS}`)
        .then (characters => dispatch({type: GET_ALL_CHARACTERS, payload: characters.data}))
        .catch (error => alert ('Sorry, I cant get all the Characters', error.message));
    };
};


export function getCharByName(name) {
    return function(dispatch) {
        return axios.get(`${RUTA_CHARACTERS}?name=${name}`)
        .then (character => dispatch({type: GET_CHAR_BY_NAME, payload: character.data}))
        .catch (error => alert ('Sorry, I cant find that Character', error.message));
    };
};


export function createCharacter(payload) {
    return function(dispatch) {
        return axios.post(`${RUTA_CHARACTERS}`, payload)
        .then (character => dispatch({type: CREATE_CHARACTER, payload: character.data}))
        .catch (error => alert ('Sorry, I cant create that Character', error.message));
    };
};


export function getAllEpisodes() {
    return function(dispatch) {
        return axios.get(`${RUTA_EPISODES}`)
        .then (episodes => dispatch({type: GET_ALL_EPISODES, payload: episodes.data}))
        .catch (error => alert ('Sorry, I cant get all the Episodes', error.message));
    };
};


export function clearCache() {
    return function(dispatch) {
        return dispatch({type: CLEAR_CACHE})
    };
};



