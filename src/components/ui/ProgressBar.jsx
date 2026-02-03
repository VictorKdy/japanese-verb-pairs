// ProgressBar - displays quiz progress
import React from 'react';
import { useQuiz } from '../../context/QuizContext.jsx';

export function ProgressBar() {
  const { progress } = useQuiz();
  
  return (
    <div className="w-full absolute top-0 h-1 bg-gray-800">
      <div 
        className="h-full bg-red-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
