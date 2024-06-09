import React from 'react';
import './MainPage.css';
import arrow from './images/arrow.png'
import back from './background_bruh_2.png'

const divStyle = {
  backgroundImage: `url(${back})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
};

const MainPage = () => {
  return (
    <div id='MainPageDiv' style={divStyle}>
      <h1>Welcome to the Quiz App</h1>
      <div id='ArrowDiv'>
        <div>  
          <img id='Arrow' alt='Arrow' src={arrow}/>
          <p>Select a tab from the menu to get started. </p>
        </div>
        <div className='fill'></div>
      </div>
      <div id='BottomFill'></div>
    </div>
  );
};

export default MainPage;
