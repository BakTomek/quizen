import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={isOpen ? 'open' : ''}>
        <ul className='top'>
          <li>Quizen</li>
          <li id='Redirections'><Link to="/" className="custom-link">Main</Link></li>
          <li className='OtherLi'><Link to="/quizzes" className="custom-link">Quizzes</Link></li>
          <li className='OtherLi'><Link to="/create-quiz" className="custom-link">Create</Link></li>
        </ul>
        <ul className='middle'>
          <li>QUIZZES</li>
          <li>search up a quiz</li>
          <li>then click it</li>
          <li>CREATE</li>
          <li>start creating</li>
          <li>your own quiz</li>
        </ul>
        <ul className='bottom'>
          <li>CONTACT</li>
          <li><a href="https://github.com/BakTomek/quizen/blob/master/README.md" target="_blank" rel="noopener noreferrer">documentation</a></li>
          <li><a href="https://github.com/BakTomek/quizen" target="_blank" rel="noopener noreferrer">github</a></li>
          <li>version 1.4.3</li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
