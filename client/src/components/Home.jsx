import React, { useEffect, useState } from 'react';  //, useState
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCharacters, getCharByName, getAllEpisodes, clearCache } from '../redux/actions';
import LandingPage from './LandingPage';
import CharacterCard from './CharacterCard';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import Loading from './Loading';
import Error from './Error';
import './styles/Home.css';


const Home = () => {

    const page = useSelector(state => state.page)
    const charactersPerPage = 20
    const allCharacters = useSelector(state => state.allCharacters)
    const characters = useSelector(state => state.characters)
    const episodes = useSelector(state => state.episodes)
    const reload = useSelector(state => state.search)


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllCharacters())
        dispatch(getAllEpisodes())
    }, [dispatch])


    const handleClick = () => {
        dispatch(getAllCharacters())
        dispatch(clearCache())
    }


    let lastIndex = page * charactersPerPage
    let firstIndex = lastIndex - charactersPerPage
    let currentCharacters = characters.slice(firstIndex, lastIndex)


    return (
        allCharacters.length === 0 ? 
        <Loading /> 
        :
        <>
            <div className='conteinerCharacters'>
                <div className='titleContainer'>
                    <div className='title'>RICK AND MORTY</div>
                    <SearchBar />
                    {
                        reload === true ?
                        <button className='reload' onClick={() => handlleCLick()}>RELOAD CHARACTERS</button>
                        :
                        null
                    }
                </div>
                <div className='create'>
                    <Link to='/create'>
                        <h4>Create Character</h4>
                    </Link>
                </div>
            </div>

            {
                allCharacters.error ?
                <Error />
                :
                <>
                    <Pagination 
                        allCharacters={characters.length}
                    />


                    <div className='containerCharactersCard'>
                        {
                            currentCharacters?.map( e =>
                                <div className='containerCard' key={e.id}>
                                    <CharacterCard
                                        id={e.id}
                                        name={e.name}
                                        image={e.image}
                                        species={e.species}
                                        origin={e.origin}
                                    />
                                </div>
                            )
                        }
                    </div>
                    <Pagination
                        allCharacters={characters.length}
                    />
                </>
            }
        </>
    )
};

export default Home


