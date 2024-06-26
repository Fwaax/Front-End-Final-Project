import React from 'react';
import './footer.css';
import AboutPage from '../../Pages/AboutPage';
import MyFavCardPage from '../../Pages/MyFavCardPage';
import MyCardPage from '../../Pages/MyCardPage';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


const Footer = () => {
    const navigate = useNavigate();

    function handleAbout() {
        console.log(`handleAbout`);
        navigate('/about', { replace: true });
    }

    function handleFavorite() {
        console.log(`handleFavorite`);
        navigate('/favorite', { replace: true });
    }

    function handleCards() {
        console.log(`handleCards`);
        navigate('/mycards', { replace: true });
    }

    return (
        <div className='footer'>

            <div className='footerDiv' onClick={handleAbout}>
                <p>About</p>
                <img className='imgSvg about' src="https://www.svgrepo.com/show/486514/about-filled.svg" alt="About" />
            </div>

            <div className='footerDiv' onClick={handleFavorite}>
                <p>Favorites</p>
                <img className='imgSvg favorite' src="https://www.svgrepo.com/show/532473/heart.svg" alt="Favorite" />
            </div>

            <div className='footerDiv' onClick={handleCards}>
                <p>My Cards</p>
                <img className='imgSvg cards' src="https://www.svgrepo.com/show/497628/user-square.svg" alt="My Cards" />
            </div>

        </div>
    )
}

export default Footer



// https://www.svgrepo.com/show/506672/phone.svg --- Phone
// https://www.svgrepo.com/show/433921/bin.svg --- Bin
// https://www.svgrepo.com/show/488318/pencil-ui.svg --- Pencil
// https://www.svgrepo.com/show/532473/heart.svg --- Heart
// https://www.svgrepo.com/show/315933/heart-red.svg --- Red Heart
// https://www.svgrepo.com/show/486514/about-filled.svg --- About
// https://www.svgrepo.com/show/497628/user-square.svg --- My Cards
// https://www.svgrepo.com/