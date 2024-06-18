import React from 'react'
import MyCardsContainer from '../Components/Cards/MyCardsContainer'

const MyCardPage = () => {


    return (

        <div className='containerBody'>
            <div className='containerCards'>
                <div className='header'>
                    <h1>My Cards Page</h1>
                    <p>Here you can find your business cards</p>
                </div>
                <div className='divider'></div>
                <div className='cardsholder'>
                    <MyCardsContainer />
                </div>
            </div>
        </div>

    )
}

export default MyCardPage
