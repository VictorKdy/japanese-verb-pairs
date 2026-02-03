// QuizCounter - Question counter display
import React from 'react';
import { useQuiz } from '../../context/QuizContext.jsx';

export function QuizCounter() {
  const { shuffledData, questionNumber, totalQuestions } = useQuiz();
  
  if (shuffledData.length === 0) return null;
  
  return (
    <div className="text-center text-gray-400 text-base pb-1">
      第{questionNumber}問 / 全{totalQuestions}問
    </div>
  );
}
