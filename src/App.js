import './App.css';
import Body from './Components/Body/Body';
import Footer from './Components/Footer/Footer';
import CardsForm from './Components/Cards/CardsForm';
import SignUp from './Components/Auth/SignUp';
import Login from './Components/Auth/Login';
import useToken from './Components/Hooks/UserToken';
import MyCardPage from './Pages/MyCardPage';
import MyFavCardPage from './Pages/MyFavCardPage';
import axios from 'axios';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [cards, setCards] = useState([]);
  const [favArr, setFavArr] = useState([]);
  const [isLoged, setIsLoged] = useState(false);

  const {
    setUserToken,
    userToken,
    removeToken,
  } = useToken();


  // function newCards(cardList, favoriteList) {
  //   console.log(`Exucting newCards`);
  //   cardList.forEach(card => {
  //     if (favoriteList.includes(card._id)) {
  //       card.isLiked = true;
  //       console.log(`Adding to new cards`);
  //     }
  //   })
  // }


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
        // setFavArr((prevFavArray) => [...prevFavArray, ...newFavArray]);
        // newCards(cardList, newFavArray);

        // setFavArr((prevFavArray) => [...prevFavArray, cardList.filter((card) => card.isLiked === true)]);
        // setFavArr(cardList.filter((card) => card.isLiked === true));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (userToken?.decodedToken?.payload?._id) {
      fetchData();
    }
  }, []);


  function handleLogOut() {
    setIsLoged(false);
    removeToken();
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div className='container'>
          <nav className='nav'>
            <ul>
              <div className='navLeft'>
                <li><Link to="/">BCard</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/favorite">Fav Cards</Link></li>
                <li><Link to="/mycards">My Cards</Link></li>
              </div>
            </ul>

            <ul>
              <div className='navRight'>
                <li><input type="text" placeholder="Search" /></li>
                <li><div>Light/Dark mode</div></li>
                {!userToken.token ? (
                  <div>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign up</Link></li>
                  </div>
                ) : (
                  <div>
                    <li>Hello {userToken.decodedToken.payload._id}</li>
                    <div onClick={handleLogOut}>
                      <li>Sign out</li>
                    </div>
                  </div>
                )}
              </div>
            </ul>
          </nav>
        </div>

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setIsLoged={setIsLoged} isLoged={isLoged} />} />
          <Route path="/" element={<Body cards={cards} />} />
          <Route path="/mycards" element={<MyCardPage />} />
          <Route path="/favorite" element={<MyFavCardPage cards={cards} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;