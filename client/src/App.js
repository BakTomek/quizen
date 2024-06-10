/*import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MainPage from './components/MainPage/MainPage';
import Quizzes from './components/Quizzes/Quizzes';
import CreateQuiz from './components/CreateQuiz/CreateQuiz';
import Quiz from './components/Quiz/Quiz';
import { QuizProvider } from './components/Quiz/QuizContext';
import './App.css';

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

export default App;*/
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MainPage from './components/MainPage/MainPage';
import Quizzes from './components/Quizzes/Quizzes';
import CreateQuiz from './components/CreateQuiz/CreateQuiz';
import Quiz from './components/Quiz/Quiz';
import { QuizProvider } from './components/Quiz/QuizContext';
import './App.css';

const AppContent = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/quizzes" element={<Quizzes />} />
      <Route path="/create-quiz" element={<CreateQuiz />} />
      <Route path="/create-quiz/:quizId" element={<CreateQuiz />} />
      <Route path="/quiz/:quizId" element={<Quiz />} />
    </Routes>
  </>
);

const App = () => (
  <QuizProvider>
    <Router>
      <AppContent />
    </Router>
  </QuizProvider>
);

export default App;
export { AppContent }; // Export for testing without Router
