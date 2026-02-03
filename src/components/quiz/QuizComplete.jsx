// QuizComplete - Celebration screen when quiz is completed
import React from 'react';
import { useQuiz } from '../../context/QuizContext.jsx';

export function QuizComplete() {
  const { totalQuestions, handleRestart } = useQuiz();
  
  return (
    <div className="flex-1 flex flex-col items-center justify-start px-4 pt-16 pb-1">
      <div className="text-center text-green-400 text-xl font-bold space-y-4">
        <p>🎉 おめでとうございます！</p>
        <p className="text-base text-gray-300 font-normal">全 {totalQuestions} 問正解です！</p>
        <button
          onClick={handleRestart}
          className="bg-green-800 hover:bg-green-700 text-white font-bold py-2.5 px-8 rounded-full transition-colors text-sm mt-4"
        >
          リスタート
        </button>
      </div>
    </div>
  );
}
