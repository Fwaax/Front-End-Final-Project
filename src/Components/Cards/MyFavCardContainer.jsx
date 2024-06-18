import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from './Card';
import useToken from '../Hooks/UserToken';
import './Cards.css'



// x - auth - token
const MyFavCardsContainer = ({ favArr, cards }) => {
    const {
        setUserToken,
        userToken,
        removeToken,
    } = useToken();

    console.log(`favArr`, JSON.stringify(favArr));
    // const [cards, setCards] = useState([]);
    const [favCard, setFavCard] = useState([]);


    // These two blocks are duplicates
    // can I print favArr from Card component while other components like MyCards and AllCard use it?


    return (
        <div className='cardContaina'>
            {favArr.map((card, index) => (
                <div key={index}><Card card={card} /></div>
            ))
            }
        </div>
    )
}

export default MyFavCardsContainer
