import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useToken from '../Components/Hooks/UserToken';
import Card from '../Components/Cards/Card';
import EditCardsForm from '../Components/Cards/EditCardForm';
import { useQuery } from "@tanstack/react-query";
import { ThemeContext } from '../App';
import './EditCardPage.css'

const EditCardPage = ({ match }) => {

    const { theme, toggleTheme } = useContext(ThemeContext);
    const [cardDataToEdit, setCardDataToEdit] = useState({  // new data on fields

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
    const { cardId } = useParams();

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
                resetData(apiResponse.data)
                return apiResponse.data;
            } catch (e) {
                return null;
            }
        },

    });


    async function sendUpdateCardData() {
        try {
            const req = {
                "title": cardDataToEdit.title,
                "subtitle": cardDataToEdit.subtitle,
                "description": cardDataToEdit.description,
                "phone": cardDataToEdit.phone,
                "email": cardDataToEdit.email,
                "web": cardDataToEdit.web,
                "image": {
                    "url": cardDataToEdit.imgurl,
                    "alt": cardDataToEdit.alt
                },
                "address": {
                    "state": cardDataToEdit.state,
                    "country": cardDataToEdit.country,
                    "city": cardDataToEdit.city,
                    "street": cardDataToEdit.street,
                    "houseNumber": cardDataToEdit.houseNumber,
                    "zip": cardDataToEdit.zip
                }
            }
            const apiResponse = await axios.put(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, req, {
                headers: { "x-auth-token": userToken.token, 'Content-Type': 'application/json' },
            });
            refetchCardData();
        } catch (e) {
            return;
        }
    }

    function resetData(cardDataToSet) {
        if (!cardDataToSet) {
            return
        }
        setCardDataToEdit({
            "title": cardDataToSet.title,
            "subtitle": cardDataToSet.subtitle,
            "description": cardDataToSet.description,
            "phone": cardDataToSet.phone,
            "email": cardDataToSet.email,
            "web": cardDataToSet.web,
            "imgurl": cardDataToSet.image.url,
            "imgalt": cardDataToSet.image.alt,
            "state": cardDataToSet.address.state,
            "country": cardDataToSet.address.country,
            "city": cardDataToSet.address.city,
            "street": cardDataToSet.address.street,
            "houseNumber": cardDataToSet.address.houseNumber,
            "zip": cardDataToSet.address.zip
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
        <div id={theme}>
            <div className='editCardPageDiv'>
                <Card card={fetchedCardData} />
                <EditCardsForm cardDataToEdit={cardDataToEdit} setCardDataToEdit={setCardDataToEdit} onEditClick={sendUpdateCardData} onCancelClick={() => resetData(fetchedCardData)} />
            </div>
        </div>
    )
}

export default EditCardPage
