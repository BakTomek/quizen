import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import MainPage from './MainPage';
import Quizzes from './Quizzes';
import CreateQuiz from './CreateQuiz';
import Quiz from './Quiz';
import { QuizProvider } from './QuizContext';

const App = () => {
  return (
    <QuizProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/create-quiz/:quizId" element={<CreateQuiz />} />
          <Route path="/quiz/:quizId" element={<Quiz />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
};

export default App;
