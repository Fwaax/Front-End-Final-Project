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

  const [isLoged, setIsLoged] = useState(false);
  const queryClient = new QueryClient()

  const {
    setUserToken,
    userToken,
    removeToken,
  } = useToken();


  function handleLogOut() {
    setIsLoged(false);
    removeToken();
  }

  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<Login setIsLoged={setIsLoged} isLoged={isLoged} />} />
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