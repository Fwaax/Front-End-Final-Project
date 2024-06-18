import React from 'react'
import './Header.css'

const Header = () => {




    return (
        <div className='container'>
            <nav className='nav'>
                <div className='navLeft'>
                    <div>BCard</div>
                    <div>About</div>
                    <div>Fav Cards</div>
                    <div>My Cards</div>
                </div>
                <div className='navRight'>
                    <input type="text" placeholder="Search" />
                    <div>Light/Dark mod</div>
                    <img src="" alt="Profile Pic from API" />
                </div>
            </nav>
        </div>
    )
}

export default Header
