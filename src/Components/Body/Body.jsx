import React, { useState, useEffect, useContext } from 'react'
import './Bodyjsx.css'
import CardsContainer from '../Cards/CardsContainer'
import CardsForm from '../Cards/CardsForm'
import axios from 'axios'
import useToken from '../Hooks/UserToken'
import { ThemeContext } from '../../App'


const Body = () => {

    const {
        setUserToken,
        userToken,
        removeToken,
    } = useToken();

    const [cards, setCards] = useState([]);
    const [displayCreateCardComp, setDisplayCreateCardComp] = useState(false)
    const { theme, toggleTheme } = useContext(ThemeContext);


    const [cardDataToSubmit, setCardDataToSubmit] = useState({

        "title": ``,
        "subtitle": ``,
        "description": ``,
        "phone": ``,
        "email": ``,
        "web": ``,
        "imgurl": '',
        "imgalt": '',
        "state": ``,
        "country": ``,
        "city": ``,
        "street": ``,
        "houseNumber": ``,
        "zip": ``
    });

    async function submitButtonClickHandler() {
        setDisplayCreateCardComp(true);
        const req = {
            "title": cardDataToSubmit.title,
            "subtitle": cardDataToSubmit.subtitle,
            "description": cardDataToSubmit.description,
            "phone": cardDataToSubmit.phone,
            "email": cardDataToSubmit.email,
            "web": cardDataToSubmit.web,
            "image": {
                "url": cardDataToSubmit.imgurl,
                "alt": cardDataToSubmit.imgalt
            },
            "address": {
                "state": cardDataToSubmit.state,
                "country": cardDataToSubmit.country,
                "city": cardDataToSubmit.city,
                "street": cardDataToSubmit.street,
                "houseNumber": cardDataToSubmit.houseNumber,
                "zip": cardDataToSubmit.zip
            }
        }
        try {
            const apiResponse = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', req, {
                headers: { "x-auth-token": userToken.token, 'Content-Type': 'application/json' }
            });
            const newCard = apiResponse.data;
            setDisplayCreateCardComp(false);
        } catch (e) {
            console.log(`An Error Occurd: `, e);
        }
    }

    function cancelButtonClickHandler() {
        setDisplayCreateCardComp(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiResponse = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
                const cardList = apiResponse.data;
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

        <div className='containerBody' id={theme}>
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
                                <CardsForm setDisplayCreateCardComp={setDisplayCreateCardComp} onCancelClick={cancelButtonClickHandler} onSubmitClick={submitButtonClickHandler} cardDataToSubmit={cardDataToSubmit} setCardDataToSubmit={setCardDataToSubmit} />
                            </div>
                        }
                    </div>

                </div>


            </div>
        </div>
    )
}

export default Body
