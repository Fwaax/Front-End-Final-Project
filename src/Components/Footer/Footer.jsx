import React from 'react';
import './footer.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../App';


const Footer = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);

    function handleAbout() {
        navigate('/about', { replace: true });
    }

    function handleFavorite() {
        navigate('/favorite', { replace: true });
    }

    function handleCards() {
        navigate('/mycards', { replace: true });
    }

    return (
        <div className='footer' id={theme}>

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

// https://www.svgrepo.com/