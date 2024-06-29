import React, { useState, useContext } from 'react'
import './Card.css'
import useToken from '../Hooks/UserToken';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../../App';

const Card = ({ card, refetch }) => {
    const navigate = useNavigate();

    const { theme, toggleTheme } = useContext(ThemeContext);


    const {
        setUserToken,
        userToken,
        removeToken,
    } = useToken();


    const [isLiked, setIsLiked] = useState(card?.likes?.includes(userToken?.decodedToken.payload._id) || false);

    async function handleClick() {
        const token = userToken.token;
        const apiResponse = await axios.patch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`, {}, { headers: { "x-auth-token": token } });
        const userIDsThatLikedThisCard = apiResponse.data.likes;
        if (userIDsThatLikedThisCard.includes(userToken.decodedToken.payload._id)) {
            setIsLiked(true);
        }
        else {
            setIsLiked(false);
        }

        refetch?.(userToken.decodedToken.payload._id);
    }



    async function handleEdit() {
        navigate(`/editcard/${card?._id}`);
    }

    async function handleDelete() {
        if (userToken.decodedToken.payload.isAdmin !== true && userToken.decodedToken.payload._id !== card.address._id) {
            return
        }
        const apiResponse = await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`, { headers: { "x-auth-token": userToken.token } });
    }

    return (
        <div className='cardDiv' id={theme}>
            <div className='cardTop'>
                <img src={card.image?.url} alt={card.image?.alt} className='cardImg' />
                <div className='cardTitle'>{card.title}</div>
                <div className='dividerCard'></div>
                <div className='cardSubtitle'>{card.subtitle}</div>
                <div className='cardPhone'>{card.phone}</div>
                <div className='cardAddres'>{card.addres}</div>
            </div>
            <div className='svgHolder'>
                <div className='svgHolderLeft'>
                    <img className='imgSvg bin' src="https://www.svgrepo.com/show/433921/bin.svg" alt="Delete" onClick={handleDelete} />
                    <img className='imgSvg pencil' src="https://www.svgrepo.com/show/488318/pencil-ui.svg" alt="Edit" onClick={handleEdit} />
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

// https://www.svgrepo.com/