import React from 'react';
import { QuizProvider } from './QuizContext';
import Quizzes from './Quizzes';
import Quiz from './Quiz';

const App = () => {
  return (
    <QuizProvider>
      <div className="App">
        <Quizzes />
        <Quiz />
      </div>
    </QuizProvider>
  );
};

export default App;