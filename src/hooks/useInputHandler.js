// useInputHandler - handles romaji to hiragana conversion with cursor preservation
import { useCallback } from 'react';
import { romajiToHiragana } from '../utils/hiraganaUtils.js';
import { isHiraganaOnly } from '../utils/textUtils.js';

export function useInputHandler(inputRef, setInput, setInvalidInput) {
  const handleInputChange = useCallback((e) => {
    const input = e.target;
    const rawValue = input.value;
    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;
    
    // Get the portion before cursor to calculate length difference
    const beforeCursor = rawValue.slice(0, selectionStart);
    const convertedBeforeCursor = romajiToHiragana(beforeCursor);
    
    // Convert full value to Hiragana
    const hiraganaValue = romajiToHiragana(rawValue);
    
    // Calculate new cursor position based on converted text before cursor
    const newCursorPos = convertedBeforeCursor.length;
    
    setInput(hiraganaValue);
    
    // Restore cursor position after React re-renders
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = newCursorPos;
        inputRef.current.selectionEnd = newCursorPos + (selectionEnd - selectionStart);
      }
    });
  }, [inputRef, setInput]);
  
  const validateInput = useCallback((input) => {
    const trimmed = input.trim();
    if (trimmed.length === 0 || !isHiraganaOnly(trimmed)) {
      setInvalidInput(true);
      return false;
    }
    return true;
  }, [setInvalidInput]);
  
  return { handleInputChange, validateInput };
}
