// useKeyboardShortcuts - handles global keyboard events for quiz navigation
import { useEffect } from 'react';

export function useKeyboardShortcuts({ feedback, onNext, onRetry }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Enter to proceed to next when feedback is showing
      if (e.key === 'Enter' && (feedback === 'incorrect' || feedback === 'correct')) {
        e.preventDefault();
        onNext(feedback === 'correct');
      }
      
      // Backspace to retry when answer is revealed
      if (e.key === 'Backspace' && (feedback === 'incorrect' || feedback === 'correct')) {
        e.preventDefault();
        onRetry();
      }
    };
    
    if (feedback) {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [feedback, onNext, onRetry]);
}
