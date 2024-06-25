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
import EditCardPage from './Pages/EditCardPage';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AboutPage from './Pages/AboutPage';


function App() {

  const [UserLoggedForImg, setUserLoggedForImg] = useState(localStorage.getItem(`imgUrl`));
  const [isLoged, setIsLoged] = useState(false);
  const queryClient = new QueryClient();

  const {
    setUserToken,
    userToken,
    removeToken,
  } = useToken();

  function handleLogOut() {
    setIsLoged(false);
    removeToken();
  }

  console.log(`UserLoggedForImg: `, UserLoggedForImg);

  console.log({ userToken });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <div className='container'>
            <nav className='nav'>
              <ul>
                <div className='navLeft'>
                  <li><Link className='link' to="/">BCard</Link></li>
                  <li><Link className='link' to="/about">About</Link></li>
                  <li><Link className='link' to="/favorite">Fav Cards</Link></li>
                  <li><Link className='link' to="/mycards">My Cards</Link></li>
                </div>
              </ul>

              <ul>
                <div className='navRight'>
                  <li><input type="text" placeholder="Search" /></li>
                  <li><div>Light/Dark mode</div></li>
                  {!userToken.token ? (
                    <div className='rightNavLogContainer'>
                      <li><Link className='link' to="/login">Login</Link></li>
                      <li><Link className='link' to="/signup">Sign up</Link></li>
                    </div>
                  ) : (
                    <div className='rightNavImgAndLogout'>
                      <li ><img className='userImg' src={UserLoggedForImg} alt="userImg" /></li>
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
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<Login setIsLoged={setIsLoged} isLoged={isLoged} setUserLoggedForImg={setUserLoggedForImg} setUserToken={setUserToken} />} />
            <Route path="/" element={<Body />} />
            <Route path="/mycards" element={<MyCardPage />} />
            <Route path="/editcard/:cardId" element={<EditCardPage />} />
            <Route path="/favorite" element={<MyFavCardPage />} />
          </Routes>
        </BrowserRouter>

        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;