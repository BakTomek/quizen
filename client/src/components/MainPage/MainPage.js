import React from 'react';
import './MainPage.css';
import arrow from './images/arrow.png'
import hat from './images/mortarboard.png'

const MainPage = () => {
  return (
    <div id='MainPageDiv'>
      <h1>Welcome to the Quiz App</h1>
      <div id='ArrowDiv'>
        <div>  
          <img id='Arrow' alt='Arrow' src={arrow}/>
          <p>Select a tab from the menu to get started. </p>
        </div>
        <div className='fill'><img id='hat' alt='hat' src={hat} /> Learn with us!</div>
      </div>
      <div id='BottomFill'></div>
    </div>
  );
};

export default MainPage;
