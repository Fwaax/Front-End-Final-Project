import React, { useEffect, useState } from 'react'
import MyFavCardsContainer from '../Components/Cards/MyFavCardContainer'
import CardsContainer from '../Components/Cards/CardsContainer'


const MyFavCardPage = ({ cards, handleLike }) => {

    const [favArr, setFavArr] = useState([]);

    useEffect(() => {
        setFavArr(cards.filter((card) => card.isLiked === true));
    }, [])

    function handleLikeClick(cardID, isLiked) {
        if (isLiked) {
            setFavArr((prevLikeArray) => [
                ...prevLikeArray,
                cardID
            ]);
        }
        else {
            // setLikeArray(prevLikeArray.filter(card => card !== cardID))
            setFavArr((prevLikeArray) => prevLikeArray.filter(card => card !== cardID));
        }
    }


    return (

        <div className='containerBody'>
            <div className='containerCards'>
                <div className='header'>
                    <h1>My Favorite Cards Page</h1>
                    <p>Here you can find cards that you liked</p>
                </div>
                <div className='divider'></div>
                <div className='cardsholder'>
                    <CardsContainer cards={favArr} handleLike={handleLikeClick} />
                </div>
            </div>
        </div>
    )
}

export default MyFavCardPage
