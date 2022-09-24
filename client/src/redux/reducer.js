import {
    GET_ALL_CHARACTERS,
    GET_CHAR_BY_NAME,
    CREATE_CHARACTER,
    GET_ALL_EPISODES,
    CLEAR_CACHE
} from './actions';  



const initialState = {
    characters: [],
    allCharacters: [],
    character: [],
    episodes: [],
    search: false,
    page: 1,
};



const rooReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_CHARACTERS:
            return {
                ...state,
                search: false,
                characters: [...action.payload],
                allCharacters: [...action.payload],
                page: 1
            }

        case GET_CHAR_BY_NAME:
            let error = {error: 'Character not found'};
            if (action.payload.length === 0) {
                return {
                    ...state,
                    search: true,
                    characters: [error],
                    page: 1
                }
            }
            return {
                ...state,
                search: true,
                characters: action.payload,
                allCharacters: action.payload,
                page: 1,
            }
        
        case CREATE_CHARACTER:
            return {
                ...state,
                characters: [...state.characters, action.payload],
                allCharacters: [...state.allCharacters, action.payload],
            }

        case GET_ALL_EPISODES:
            return {
                ...state,
                episodes: action.payload,
            }

        case CLEAR_CACHE:
            return {
                ...state,
                characters: [],
                allCharacters: [],
                character: [],
            }
        
        default: return state;
    };
};


export default rooReducer;
