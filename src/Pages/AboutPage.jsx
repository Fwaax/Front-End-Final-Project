import React from 'react';
import './AboutPage.css'
import { ThemeContext } from '../App';
import { useContext } from 'react';


const AboutPage = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className='aboutContainer' id={theme}>

            <div className='textContainer'>
                This is About Page about the project and how to use it
                The buttons for delete and edit card are only for admin and the card creator
                The user can see all the cards Limited to 5 at a time
            </div>

        </div>
    )
}

export default AboutPage
