import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from './Card';
import useToken from '../Hooks/UserToken';
import './Cards.css'


// x - auth - token
const CardsContainer = ({ cards, refetch }) => {



    return (
        <div className='cardContaina'>
            {cards.map((card, index) => (
                <div key={index}><Card card={card} refetch={refetch} /></div>
            ))
            }
        </div>
    )
}

export default CardsContainer
