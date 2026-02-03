// Quiz Context - manages quiz state using useReducer
import React, { createContext, useContext, useReducer, useEffect, useRef, useCallback } from 'react';
import { filterAndShuffleData, validateAnswer } from '../utils/quizLogic.js';
import { useSettings } from './SettingsContext.jsx';

const QuizContext = createContext(null);

// Initial state
const initialState = {
  shuffledData: [],
  currentIndex: 0,
  feedback: null,
  userInput: '',
  showAnswer: false,
  correctCount: 0,
  totalQuestions: 0,
  isInvalidInput: false,
};

// Action types
const ACTIONS = {
  SET_DATA: 'SET_DATA',
  SET_FEEDBACK: 'SET_FEEDBACK',
  SET_INPUT: 'SET_INPUT',
  SET_SHOW_ANSWER: 'SET_SHOW_ANSWER',
  SET_INVALID_INPUT: 'SET_INVALID_INPUT',
  CORRECT_ANSWER: 'CORRECT_ANSWER',
  INCORRECT_ANSWER: 'INCORRECT_ANSWER',
  RETRY: 'RETRY',
  RESET: 'RESET',
};

function quizReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_DATA: {
      return {
        ...state,
        shuffledData: action.payload,
        currentIndex: 0,
        feedback: null,
        userInput: '',
        showAnswer: false,
        correctCount: 0,
        totalQuestions: action.payload.length,
      };
    }
    
    case ACTIONS.SET_FEEDBACK:
      return { ...state, feedback: action.payload };
    
    case ACTIONS.SET_INPUT:
      return { ...state, userInput: action.payload, isInvalidInput: false };
    
    case ACTIONS.SET_SHOW_ANSWER:
      return { ...state, showAnswer: action.payload };
    
    case ACTIONS.SET_INVALID_INPUT:
      return { ...state, isInvalidInput: action.payload };
    
    case ACTIONS.CORRECT_ANSWER: {
      // Remove current question from pool
      const newData = [...state.shuffledData];
      newData.splice(state.currentIndex, 1);
      return {
        ...state,
        shuffledData: newData,
        correctCount: state.correctCount + 1,
        currentIndex: state.currentIndex >= newData.length ? 0 : state.currentIndex,
        feedback: null,
        userInput: '',
        showAnswer: false,
      };
    }
    
    case ACTIONS.INCORRECT_ANSWER: {
      // Move current question to end of pool
      const newData = [...state.shuffledData];
      const [currentQ] = newData.splice(state.currentIndex, 1);
      newData.push(currentQ);
      return {
        ...state,
        shuffledData: newData,
        feedback: null,
        userInput: '',
        showAnswer: false,
      };
    }
    
    case ACTIONS.RETRY:
      return {
        ...state,
        feedback: null,
        userInput: '',
        showAnswer: false,
      };
    
    case ACTIONS.RESET:
      return { ...initialState, totalQuestions: state.totalQuestions };
    
    default:
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const inputRef = useRef(null);
  const { selectedLevels, selectedTypes, isFixedOrder, selectedForms } = useSettings();
  
  // Initialize/reinitialize quiz when filters change
  useEffect(() => {
    const data = filterAndShuffleData(selectedLevels, selectedTypes, isFixedOrder);
    dispatch({ type: ACTIONS.SET_DATA, payload: data });
  }, [selectedLevels, selectedTypes, isFixedOrder]);
  
  // Force focus on mount
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);
  
  // Auto-focus when new question renders
  const currentQuestion = state.shuffledData[state.currentIndex];
  useEffect(() => {
    if (currentQuestion && !state.feedback && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [currentQuestion, state.feedback]);
  
  // Action creators
  const setInput = useCallback((value) => {
    dispatch({ type: ACTIONS.SET_INPUT, payload: value });
  }, []);
  
  const setFeedback = useCallback((value) => {
    dispatch({ type: ACTIONS.SET_FEEDBACK, payload: value });
  }, []);
  
  const setInvalidInput = useCallback((value) => {
    dispatch({ type: ACTIONS.SET_INVALID_INPUT, payload: value });
    if (value) {
      setTimeout(() => dispatch({ type: ACTIONS.SET_INVALID_INPUT, payload: false }), 500);
    }
  }, []);
  
  const handleCorrect = useCallback(() => {
    dispatch({ type: ACTIONS.CORRECT_ANSWER });
    if (inputRef.current) inputRef.current.focus();
  }, []);
  
  const handleIncorrect = useCallback(() => {
    dispatch({ type: ACTIONS.INCORRECT_ANSWER });
    if (inputRef.current) inputRef.current.focus();
  }, []);
  
  const handleNext = useCallback((wasCorrect) => {
    if (wasCorrect) {
      handleCorrect();
    } else {
      handleIncorrect();
    }
  }, [handleCorrect, handleIncorrect]);
  
  const handleRetry = useCallback(() => {
    dispatch({ type: ACTIONS.RETRY });
    if (inputRef.current) inputRef.current.focus();
  }, []);
  
  const handleGiveUp = useCallback(() => {
    dispatch({ type: ACTIONS.SET_FEEDBACK, payload: 'incorrect' });
    dispatch({ type: ACTIONS.SET_SHOW_ANSWER, payload: true });
    if (inputRef.current) inputRef.current.focus();
  }, []);
  
  const handleRestart = useCallback(() => {
    const data = filterAndShuffleData(selectedLevels, selectedTypes, isFixedOrder);
    dispatch({ type: ACTIONS.SET_DATA, payload: data });
    if (inputRef.current) inputRef.current.focus();
  }, [selectedLevels, selectedTypes, isFixedOrder]);
  
  const checkAnswer = useCallback((input) => {
    if (!currentQuestion) return false;
    return validateAnswer(input, currentQuestion, selectedForms);
  }, [currentQuestion, selectedForms]);
  
  const value = {
    // State
    ...state,
    currentQuestion,
    inputRef,
    
    // Derived state
    isComplete: state.shuffledData.length === 0 && state.totalQuestions > 0,
    isEmpty: state.shuffledData.length === 0 && state.totalQuestions === 0,
    progress: state.totalQuestions > 0 ? (state.correctCount / state.totalQuestions) * 100 : 0,
    questionNumber: state.correctCount + 1,
    
    // Actions
    setInput,
    setFeedback,
    setInvalidInput,
    handleNext,
    handleRetry,
    handleGiveUp,
    handleRestart,
    handleCorrect,
    handleIncorrect,
    checkAnswer,
  };
  
  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
