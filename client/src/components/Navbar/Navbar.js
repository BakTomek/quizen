import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav>
      <ul className='top'>
        <li>Quizen</li>
        <li id='Redirections'><Link to="/" className="custom-link">
          Main</Link></li>
        <li className='OtherLi'><Link to="/quizzes" className="custom-link">Quizzes</Link></li>
        <li className='OtherLi'><Link to="/create-quiz" className="custom-link">Create</Link></li>
      </ul>
      <ul className='middle'>
        <li>NIEWIEM</li>
        <li>wypelnij</li>
        <li>za mnie</li>
        <li>PODTYTUL</li>
        <li>wypelnij</li>
        <li>za mnie</li>
      </ul>
      <ul className='bottom'>
        <li>KONTAKT</li>
        <li>github</li>
        <li>dokumenty</li>
        <li>kolory?</li>
      </ul>
    </nav>
  );
};

export default Navbar;
