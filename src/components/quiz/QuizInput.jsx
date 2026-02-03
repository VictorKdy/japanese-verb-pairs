// QuizInput - input field with validation
import React from 'react';
import { CheckCircle, XCircle } from '../ui/icons.js';
import { useQuiz } from '../../context/QuizContext.jsx';
import { useInputHandler } from '../../hooks/useInputHandler.js';

export function QuizInput() {
  const { 
    userInput, 
    setInput, 
    setInvalidInput,
    setFeedback,
    isInvalidInput,
    feedback, 
    inputRef,
    handleNext,
    checkAnswer
  } = useQuiz();
  
  const { handleInputChange, validateInput } = useInputHandler(inputRef, setInput, setInvalidInput);
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // If already showing feedback, Enter should go to next
    if (feedback === 'incorrect' || feedback === 'correct') {
      handleNext(feedback === 'correct');
      return;
    }
    
    // Validate input is hiragana only and not empty
    if (!validateInput(userInput)) {
      return;
    }
    
    // Check if answer is correct
    if (checkAnswer(userInput)) {
      handleNext(true);
    } else {
      setFeedback('incorrect');
    }
  };
  
  const handleKeyDown = (e) => {
    // Allow Enter to proceed to next even when input is disabled
    if (e.key === 'Enter' && (feedback === 'incorrect' || feedback === 'correct')) {
      e.preventDefault();
      handleNext(feedback === 'correct');
    }
  };
  
  return (
    <form 
      onSubmit={handleFormSubmit} 
      className="relative w-full"
      onKeyDown={handleKeyDown}
    >
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="文を入力..."
        className={`w-full bg-white text-black text-center text-lg py-2.5 px-4 rounded-full focus:outline-none focus:ring-2 transition-all shadow-lg
          ${feedback === 'correct' ? 'ring-green-500 bg-green-50' : ''}
          ${feedback === 'incorrect' ? 'ring-red-500 bg-red-50' : ''}
          ${isInvalidInput ? 'ring-red-500 ring-2 bg-red-50 animate-shake' : ''}
          ${!feedback && !isInvalidInput ? 'ring-transparent focus:ring-blue-400' : ''}
        `}
        autoFocus
        disabled={feedback === 'correct' || feedback === 'incorrect'}
      />
      
      {/* Status Icons */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {feedback === 'correct' && <CheckCircle size={16} className="text-green-600 animate-bounce" />}
        {feedback === 'incorrect' && <XCircle size={16} className="text-red-600 animate-pulse" />}
      </div>
    </form>
  );
}
