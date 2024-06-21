import React, { useState, useEffect } from 'react'
import './Bodyjsx.css'
import Footer from '../Footer/Footer'
import CardsContainer from '../Cards/CardsContainer'
import CardsForm from '../Cards/CardsForm'
import axios from 'axios'
import useToken from '../Hooks/UserToken'


const Body = () => {

    const {
        setUserToken,
        userToken,
        removeToken,
    } = useToken();

    const [cards, setCards] = useState([]);
    const [displayCreateCardComp, setDisplayCreateCardComp] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiResponse = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
                const cardList = apiResponse.data.slice(0, 5);
                setCards(cardList);

                const newFavArray = [];

                cardList.forEach(card => {
                    if (card.likes.includes(userToken?.decodedToken?.payload?._id)) {
                        newFavArray.push(card._id)
                    }
                });
                console.log(`newFavArray: `, newFavArray);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (userToken?.decodedToken?.payload?._id) {
            fetchData();
        }
    }, []);

    return (
        <div className='containerBody'>
            <div className='containerCards'>
                <div className='header'>
                    <h1>Cards Page</h1>
                    <p>Here you can find business cards from all categories</p>
                </div>
                <div className='divider'></div>
                <div className='cardsholder'>


                    <div className='cardCreation'>
                        {displayCreateCardComp === false ?
                            <div>
                                <div>
                                    <CardsContainer cards={cards} />
                                </div>
                                <h2 className='cardCreationBtn' onClick={() => setDisplayCreateCardComp(true)}>+</h2>
                            </div>
                            : <div>
                                <CardsForm setDisplayCreateCardComp={setDisplayCreateCardComp} />
                            </div>
                        }
                    </div>

                </div>


            </div>
        </div>
    )
}

export default Body
