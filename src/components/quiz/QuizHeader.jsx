// QuizHeader - Top right controls (reset button, icon)
import React from 'react';
import { RefreshCw } from '../ui/icons.js';
import { useQuiz } from '../../context/QuizContext.jsx';

export function QuizHeader() {
  const { currentQuestion, handleRestart } = useQuiz();
  
  if (!currentQuestion) return null;
  
  return (
    <div className="absolute top-4 right-3 z-40 flex items-center gap-2">
      {/* Reset Quiz Button */}
      <button
        onClick={handleRestart}
        className="px-3 py-2 bg-[#2a2a2a] rounded-lg shadow-inner border border-[#333] flex items-center justify-center hover:bg-[#333] transition-colors"
        title="リセット (Reset Quiz)"
      >
        <RefreshCw size={18} className="text-gray-300 opacity-90" strokeWidth={1.5} />
      </button>
      
      {/* Icon */}
      {currentQuestion.icon && (
        <div className="px-3 py-2 bg-[#2a2a2a] rounded-lg shadow-inner border border-[#333] flex items-center justify-center">
          <currentQuestion.icon size={18} className={`${currentQuestion.color} opacity-90`} strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
}
