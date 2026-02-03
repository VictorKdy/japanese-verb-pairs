// QuizControls - Retry, Next, Give Up buttons
import React from 'react';
import { useQuiz } from '../../context/QuizContext.jsx';

export function QuizControls() {
  const { feedback, showAnswer, handleRetry, handleNext, handleGiveUp } = useQuiz();
  
  return (
    <>
      {/* Retry/Next buttons shown when feedback is displayed */}
      <div className="flex gap-3 justify-center mt-12 mb-4">
        {(feedback === 'incorrect' || showAnswer) && (
          <>
            <button 
              onClick={handleRetry}
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2.5 px-8 rounded-full flex items-center gap-1.5 transition-colors text-sm"
            >
              もう一度
            </button>
            <button 
              onClick={() => handleNext(feedback === 'correct')}
              className={`${feedback === 'correct' ? 'bg-green-700 hover:bg-green-600' : 'bg-red-700 hover:bg-red-600'} text-white font-bold py-2.5 px-8 rounded-full transition-colors text-sm`}
            >
              次へ
            </button>
          </>
        )}
      </div>

      {/* "I don't know" button */}
      {feedback === null && (
        <div className="flex justify-center">
          <button 
            onClick={handleGiveUp}
            className="text-gray-300 hover:text-gray-100 text-sm font-medium py-1 px-4 transition-colors"
          >
            わからない
          </button>
        </div>
      )}
    </>
  );
}
