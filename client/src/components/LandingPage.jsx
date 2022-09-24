import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css';


const LandingPage = () => {
    const dispatch = useDispatch()

    return (
        <div className='home'>
            <div class="homeText">
                <span>W</span>
                <span>E</span>
                <span>L</span>
                <span>C</span>
                <span>O</span>
                <span>M</span>
                <span>E</span>
            </div>
            <Link to="/home">
            <h4 className="homeLink">START</h4>
            </Link>
        </div>
    )
}

export default LandingPage
