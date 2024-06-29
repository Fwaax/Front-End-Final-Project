import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from './Card';
import useToken from '../Hooks/UserToken';
import './Cards.css'


// x - auth - token
const MyCardsContainer = () => {
    const {
        setUserToken,
        userToken,
        removeToken,
    } = useToken();


    const [cards, setCards] = useState([]);
    const [favCard, setFavCard] = useState([]);
    const [showNoCardMessege, setShowNoCardMessege] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiResponse = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards', { headers: { "x-auth-token": userToken.token } });
                if (apiResponse.data.length === 0) {
                    setShowNoCardMessege(true);
                    return
                }
                const cardList = apiResponse.data;
                setCards(cardList);
            } catch (error) {
                return;
            }
        };

        fetchData();
    }, []);

    return (
        <div className='cardContaina'>
            {showNoCardMessege && <div>There are no cards</div>}
            {cards.map((card, index) => (
                <div key={index}><Card card={card} /></div>
            ))
            }
        </div>
    )
}

export default MyCardsContainer
