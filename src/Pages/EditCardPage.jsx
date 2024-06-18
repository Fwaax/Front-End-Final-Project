import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useToken from '../Components/Hooks/UserToken';
import Card from '../Components/Cards/Card';

// https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/65422172e443ec28a252c27d
// take info from create page 
// 

const EditCardPage = ({ match }) => {
    const [fetchedCardData, setFetchedCardData] = useState(undefined); // Old data displayer
    const [updatedCardData, setUpdatedCardData] = useState({  // new data on fields
        "title": "a wonderful new card updated!",
        "subtitle": "a test value for this card",
        "description": "a test value for new card\na test value for new card\n",
        "phone": "012-3211234",
        "email": "qwe@gmail.com",
        "web": "www.bing.com",
        "image": {
            "url": "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
            "alt": "image of something"
        },
        "address": {
            "state": "IL",
            "country": "Israel",
            "city": "Arad",
            "street": "Shoham",
            "houseNumber": 5,
            "zip": 8920435
        }
    });
    const [isError, setIsError] = useState(false);
    const { cardId } = useParams();
    console.log(cardId);

    const {
        setUserToken,
        userToken,
        removeToken,
    } = useToken();

    async function fetchCardData() {
        try {
            const apiResponse = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                headers: { "x-auth-token": userToken.token, 'Content-Type': 'application/json' }
            });
            console.log(`apiResponse edit: `, apiResponse);
            setFetchedCardData(apiResponse.data);
            setUpdatedCardData({
                "title": apiResponse.data.title,
                "subtitle": "a test value for this card",
                "description": "a test value for new card\na test value for new card\n",
                "phone": "012-3211234",
                "email": "qwe@gmail.com",
                "web": "www.bing.com",
                "image": {
                    "url": "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
                    "alt": "image of something"
                },
                "address": {
                    "state": "IL",
                    "country": "Israel",
                    "city": "Arad",
                    "street": "Shoham",
                    "houseNumber": 5,
                    "zip": 8920435
                }
            })
        }
        catch (e) {
            setIsError(true)
            console.log(`Error : `, e);
        }
    }

    async function sendUpdateCardData() {
        const apiResponse = await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
            headers: { "x-auth-token": userToken.token, 'Content-Type': 'application/json' },
            data: updatedCardData,
        });
        console.log(`apiResponse edit: `, apiResponse);
    }

    useEffect(() => {
        fetchCardData();
    }, [])

    if (isError) {
        return (<div>Card {cardId} doesn't exist</div>)
    }
    if (!fetchedCardData) {
        return (<div>Loading...</div>)
    }
    if (fetchedCardData.user_id !== userToken?.decodedToken.payload._id) {
        return (<div>You are not authorized to edit this card</div>)
    }
    return (
        <div>

            <p>cardId: {cardId}</p>
            <Card card={fetchedCardData} />
        </div>
    )
}

export default EditCardPage
