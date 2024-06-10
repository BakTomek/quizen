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
    <div id='MainPageDiv' data-testid='main-page-div' style={divStyle}>
      <h1>Welcome to the Quiz App</h1>
      <div id='ArrowDiv' data-testid='arrow-div'>
        <div>
          <img id='Arrow' data-testid='arrow-image' alt='Arrow' src={arrow}/>
          <p>Select a tab from the menu to get started. </p>
        </div>
        <div className='fill'></div>
      </div>
      <div id='BottomFill' data-testid='bottom-fill'></div>
    </div>
  );
};

export default MainPage;
