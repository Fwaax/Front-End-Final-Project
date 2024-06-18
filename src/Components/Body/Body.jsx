import React, { useState } from 'react'
import './Bodyjsx.css'
import Footer from '../Footer/Footer'
import CardsContainer from '../Cards/CardsContainer'
import CardsForm from '../Cards/CardsForm'
// import CardsForm from '../Cards/CardsForm'


{/* <CardsForm /> */ }

const Body = ({ cards, handleLike }) => {
    const [displayCreateCardComp, setDisplayCreateCardComp] = useState(false)

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
                                    <CardsContainer cards={cards} handleLike={handleLike} />
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
            <Footer />
        </div>
    )
}

export default Body
