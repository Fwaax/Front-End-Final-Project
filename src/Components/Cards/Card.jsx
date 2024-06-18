import React, { useState } from 'react'
import './Card.css'
import useToken from '../Hooks/UserToken';
import axios from 'axios';

const Card = ({ card, handleLike }) => {
    {/* img ,title , subtitle , phone , address , card number */ }
    const [isLiked, setIsLiked] = useState(card?.isLiked || false);

    const {
        setUserToken,
        userToken,
        removeToken,
    } = useToken();


    async function handleClick() {
        setIsLiked(!isLiked);
        const token = userToken.token;
        const apiResponse = await axios.patch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`, {}, { headers: { "x-auth-token": token } });

        handleLike(card._id, !isLiked);
        console.log(`Patching a card`, apiResponse.status);
    }

    async function handleDelete() {
        const token = userToken.token;
        const apiResponse = await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`, { headers: { "x-auth-token": token } });
        console.log(`deleting a card`, apiResponse.status);
    }

    return (
        <div className='cardDiv'>
            <div className='cardTop'>
                <img src={card.image?.url} alt={card.image?.alt} className='cardImg' />
                <div className='cardId'>{card.id}</div>
                <div className='cardTitle'>{card.title}</div>
                <div className='dividerCard'></div>
                <div className='cardSubtitle'>{card.subtitle}</div>
                <div className='cardPhone'>{card.phone}</div>
                <div className='cardAddres'>{card.addres}</div>
            </div>
            <div className='svgHolder'>
                <div className='svgHolderLeft'>
                    <img className='imgSvg bin' src="https://www.svgrepo.com/show/433921/bin.svg" alt="Delete" onClick={handleDelete} />
                    <img className='imgSvg pencil' src="https://www.svgrepo.com/show/488318/pencil-ui.svg" alt="Edit" />
                </div>
                <div className='svgHolderRight'>
                    <img className='imgSvg phone' src="https://www.svgrepo.com/show/506672/phone.svg" alt="Phone Number" />
                    {isLiked === false ? <img className='imgSvg heart' src="https://www.svgrepo.com/show/532473/heart.svg" alt="Favorite" onClick={handleClick} /> : <img className='imgSvg heart' src="https://www.svgrepo.com/show/315933/heart-red.svg" alt="Favorite" onClick={handleClick} />}
                </div>
            </div>
        </div>
    )
}
export default Card

// https://www.svgrepo.com/show/506672/phone.svg --- Phone
// https://www.svgrepo.com/show/433921/bin.svg --- Bin
// https://www.svgrepo.com/show/488318/pencil-ui.svg --- Pencil
// https://www.svgrepo.com/show/532473/heart.svg --- Heart
// https://www.svgrepo.com/show/315933/heart-red.svg --- Red Heart
// https://www.svgrepo.com/show/486514/about-filled.svg --- About
// https://www.svgrepo.com/show/497628/user-square.svg --- My Cards
// https://www.svgrepo.com/


// User likes or dislikes a card we have to do patch request to the card API

// Delete function , calls the API to do stuff