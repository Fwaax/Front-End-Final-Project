import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from './Card';
import useToken from '../Hooks/UserToken';
import './Cards.css'


// x - auth - token
const CardsContainer = ({ cards, handleLike }) => {
    const {
        setUserToken,
        userToken,
        removeToken,
    } = useToken();

    // const [cards, setCards] = useState([]);
    const [favCard, setFavCard] = useState([]);

    // const [likeArray, setLikeArray] = useState([]);

    // function handleLike(cardID, isLiked) {
    //     console.log(`LikeArray before`, likeArray);
    //     if (isLiked) {
    //         setLikeArray((prevLikeArray) => [
    //             ...prevLikeArray,
    //             cardID
    //         ]);
    //     }
    //     else {
    //         // setLikeArray(prevLikeArray.filter(card => card !== cardID))
    //         setLikeArray((prevLikeArray) => prevLikeArray.filter(card => card !== cardID));
    //     }
    //     console.log(`LikeArray after`, likeArray);
    // }



    return (
        <div className='cardContaina'>
            {cards.map((card, index) => (
                <div key={index}><Card card={card} handleLike={handleLike} /></div>
            ))
            }
        </div>
    )
}

export default CardsContainer
