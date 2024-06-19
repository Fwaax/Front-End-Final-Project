import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useToken from '../Components/Hooks/UserToken';
import Card from '../Components/Cards/Card';
import EditCardsForm from '../Components/Cards/EditCardForm';
import { useQuery } from "@tanstack/react-query";

// https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/65422172e443ec28a252c27d
// take info from create page 
// 

const EditCardPage = ({ match }) => {
    const [cardDataToEdit, setCardDataToEdit] = useState({  // new data on fields

        "title": ``,
        "subtitle": ``,
        "description": ``,
        "phone": ``,
        "email": ``,
        "web": ``,
        "image": {
            "url": ``,
            "alt": ``
        },
        "address": {
            "state": ``,
            "country": ``,
            "city": ``,
            "street": ``,
            "houseNumber": ``,
            "zip": ``
        }
    });
    const { cardId } = useParams();
    console.log(cardId);

    const {
        setUserToken,
        userToken,
        removeToken,
    } = useToken();

    const { data: fetchedCardData, isLoading: isFetchedCardDataLoading, isError: isFetchedCardDataErrored } = useQuery({
        staleTime: 60000,
        gcTime: 60000,
        queryKey: ["cardDataFromServer"],
        queryFn: async () => {
            try {
                const apiResponse = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                    headers: { "x-auth-token": userToken.token, 'Content-Type': 'application/json' }
                });
                console.log(`apiResponse edit in Quary: `, apiResponse);
                setCardDataToEdit({
                    "title": apiResponse.data.title,
                    "subtitle": apiResponse.data.subtitle,
                    "description": apiResponse.data.description,
                    "phone": apiResponse.data.phone,
                    "email": apiResponse.data.email,
                    "web": apiResponse.data.web,
                    "image": {
                        "url": apiResponse.data.image.url,
                        "alt": apiResponse.data.image.alt
                    },
                    "address": {
                        "state": apiResponse.data.address.state,
                        "country": apiResponse.data.address.country,
                        "city": apiResponse.data.address.city,
                        "street": apiResponse.data.address.street,
                        "houseNumber": apiResponse.data.address.houseNumber,
                        "zip": apiResponse.data.address.zip
                    }
                })
                return apiResponse.data;
            } catch (e) {
                console.log(`An Error Occurd: `, e);
                return null;
            }
        },

    });


    async function sendUpdateCardData() {
        const apiResponse = await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
            headers: { "x-auth-token": userToken.token, 'Content-Type': 'application/json' },
            data: cardDataToEdit,
        });
        console.log(`apiResponse edit 2: `, apiResponse);
    }



    if (isFetchedCardDataLoading) {
        return (<div>Loading...</div>)
    }
    if (isFetchedCardDataErrored) {
        return (<div>An error occurd card may not exist</div>)
    }
    if (!fetchedCardData) {
        return (<div>Card {cardId} doesn't exist</div>)
    }
    if (fetchedCardData.user_id !== userToken?.decodedToken.payload._id) {
        return (<div>You are not authorized to edit this card</div>)
    }
    return (
        <div>
            <p>cardId: {cardId}</p>
            <Card card={fetchedCardData} />
            {/* <EditCardsForm /> */}

        </div>
    )
}

export default EditCardPage
