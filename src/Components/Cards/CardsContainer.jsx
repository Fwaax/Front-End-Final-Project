import React from 'react'
import Card from './Card';
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
