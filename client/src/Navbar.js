import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Main Page</Link></li>
        <li><Link to="/quizzes">Existing Quizzes</Link></li>
        <li><Link to="/create-quiz">Create Quiz</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
