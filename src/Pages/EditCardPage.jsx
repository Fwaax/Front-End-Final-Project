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

    const { data: fetchedCardData, isLoading: isFetchedCardDataLoading, isError: isFetchedCardDataErrored, refetch: refetchCardData } = useQuery({
        staleTime: 60000,
        gcTime: 60000,
        queryKey: ["cardDataFromServer"],
        queryFn: async () => {
            try {
                const apiResponse = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
                    headers: { "x-auth-token": userToken.token, 'Content-Type': 'application/json' }
                });
                console.log(`apiResponse edit in Quary: `, apiResponse);
                resetData(apiResponse.data)
                return apiResponse.data;
            } catch (e) {
                console.log(`An Error Occurd: `, e);
                return null;
            }
        },

    });


    async function sendUpdateCardData() {
        console.log(`About to Request: `, cardDataToEdit);
        const apiResponse = await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, cardDataToEdit, {
            headers: { "x-auth-token": userToken.token, 'Content-Type': 'application/json' },
        });
        console.log(`apiResponse edit 2: `, apiResponse);
        refetchCardData();
    }

    function resetData(cardDataToSet) {
        if (!cardDataToSet) {
            console.log(`cardDataToSet is Undefined Cannot procced:`, cardDataToSet);
            return
        }
        setCardDataToEdit({
            "title": cardDataToSet.title,
            "subtitle": cardDataToSet.subtitle,
            "description": cardDataToSet.description,
            "phone": cardDataToSet.phone,
            "email": cardDataToSet.email,
            "web": cardDataToSet.web,
            "image": {
                "url": cardDataToSet.image.url,
                "alt": cardDataToSet.image.alt
            },
            "address": {
                "state": cardDataToSet.address.state,
                "country": cardDataToSet.address.country,
                "city": cardDataToSet.address.city,
                "street": cardDataToSet.address.street,
                "houseNumber": cardDataToSet.address.houseNumber,
                "zip": cardDataToSet.address.zip
            }
        })
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
            <EditCardsForm cardDataToEdit={cardDataToEdit} setCardDataToEdit={setCardDataToEdit} onEditClick={sendUpdateCardData} onCancelClick={() => resetData(fetchedCardData)} />

        </div>
    )
}

export default EditCardPage
