import React, { useState } from 'react'
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
    const [favCard, setFavCard] = useState([]);

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
