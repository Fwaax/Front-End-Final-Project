import React, { useEffect, useState } from 'react'
import CardsContainer from '../Components/Cards/CardsContainer'
import useToken from '../Components/Hooks/UserToken';
import axios from 'axios';



const MyFavCardPage = () => {


    const {
        setUserToken,
        userToken,
        removeToken,
    } = useToken();

    const [favArr, setFavArr] = useState([]);


    const fetchData = async (id) => {
        try {
            const apiResponse = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
            const cardList = apiResponse.data;
            const newFavArray = [];

            cardList.forEach(card => {
                if (card.likes.includes(id)) {
                    newFavArray.push(card)
                }
            });
            setFavArr(newFavArray);
        } catch (error) {
            return;
        }
    };

    useEffect(() => {


        if (userToken?.decodedToken?.payload?._id) {
            fetchData(userToken?.decodedToken?.payload?._id);
        }
    }, []);

    return (

        <div className='containerBody'>
            <div className='containerCards'>
                <div className='header'>
                    <h1>My Favorite Cards Page</h1>
                    <p>Here you can find cards that you liked</p>
                </div>
                <div className='divider'></div>
                <div className='cardsholder'>
                    <CardsContainer cards={favArr} refetch={fetchData} />
                </div>
            </div>
        </div>
    )
}

export default MyFavCardPage
