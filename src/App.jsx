// App.jsx - Main App component (slim orchestrator)
import React from 'react';
import { SettingsProvider, QuizProvider, useQuiz } from './context/index.js';
import { SettingsPanel } from './components/settings/index.js';
import { 
  QuizCard, 
  QuizInput, 
  QuizFeedback, 
  QuizControls, 
  QuizComplete,
  QuizHeader,
  QuizCounter
} from './components/quiz/index.js';
import { ProgressBar } from './components/ui/index.js';
import { useKeyboardShortcuts } from './hooks/index.js';

// Empty state component
function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-start px-4 pt-16 pb-1">
      <div className="text-center text-gray-400 text-sm">
        開始するには、レベルとタイプを1つ以上選択してください。
      </div>
    </div>
  );
}

// Loading state component
function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-start px-4 pt-16 pb-1">
      <div className="flex items-center justify-center text-white text-sm">ロード中...</div>
    </div>
  );
}

// Main quiz content
function QuizMain() {
  const { currentQuestion, feedback, handleNext, handleRetry } = useQuiz();
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts({
    feedback,
    onNext: handleNext,
    onRetry: handleRetry
  });
  
  if (!currentQuestion) {
    return <LoadingState />;
  }
  
  return (
    <div className="flex-1 flex flex-col items-center justify-start px-4 pt-16 pb-1">
      <QuizCard />
      
      {/* Input Area */}
      <div className="w-full max-w-sm space-y-2 mt-4">
        <QuizInput />
        <QuizFeedback />
        <QuizControls />
      </div>
    </div>
  );
}

// Quiz layout with conditional rendering
function QuizLayout() {
  const { isComplete, isEmpty, shuffledData, currentQuestion } = useQuiz();
  
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col font-sans relative">
      {/* Top 60% container - all interactive UI lives here */}
      <div className="h-[60vh] flex flex-col relative">
        <ProgressBar />
        <SettingsPanel />
        <QuizHeader />
        
        {isEmpty ? (
          <EmptyState />
        ) : isComplete ? (
          <QuizComplete />
        ) : (
          <QuizMain />
        )}
        
        <QuizCounter />
      </div>
      
      {/* Bottom 40% - Empty space for keyboard */}
      <div className="h-[40vh] bg-[#1a1a1a]"></div>
    </div>
  );
}

// Root App component with providers
export default function App() {
  return (
    <SettingsProvider>
      <QuizProvider>
        <QuizLayout />
      </QuizProvider>
    </SettingsProvider>
  );
}
