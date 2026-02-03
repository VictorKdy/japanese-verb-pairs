// Settings Context - manages all user preferences and display options
import React, { createContext, useContext, useState, useCallback } from 'react';
import { DEFAULT_LEVELS, DEFAULT_TYPES, DEFAULT_FORMS } from '../constants/quizDefaults.js';

const SettingsContext = createContext(null);

// Helper to toggle an item in an array (with minimum 1 item constraint)
const toggleItem = (prev, item) => {
  if (prev.includes(item)) {
    if (prev.length === 1) return prev; // At least one must remain
    return prev.filter(i => i !== item);
  }
  return [...prev, item];
};

export function SettingsProvider({ children }) {
  // Filter settings
  const [selectedLevels, setSelectedLevels] = useState(DEFAULT_LEVELS);
  const [selectedTypes, setSelectedTypes] = useState(DEFAULT_TYPES);
  const [selectedForms, setSelectedForms] = useState(DEFAULT_FORMS);
  const [isFixedOrder, setIsFixedOrder] = useState(false);
  
  // Display settings
  const [showFurigana, setShowFurigana] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [showPairs, setShowPairs] = useState(false);
  const [showEnglish, setShowEnglish] = useState(false);
  
  // Toggle functions with minimum constraint
  const toggleLevel = useCallback((level) => {
    setSelectedLevels(prev => toggleItem(prev, level));
  }, []);
  
  const toggleType = useCallback((type) => {
    setSelectedTypes(prev => toggleItem(prev, type));
  }, []);
  
  const toggleForm = useCallback((form) => {
    setSelectedForms(prev => toggleItem(prev, form));
  }, []);
  
  const value = {
    // Filter settings
    selectedLevels,
    selectedTypes,
    selectedForms,
    isFixedOrder,
    toggleLevel,
    toggleType,
    toggleForm,
    setIsFixedOrder,
    
    // Display settings
    showFurigana,
    showDictionary,
    showPairs,
    showEnglish,
    setShowFurigana,
    setShowDictionary,
    setShowPairs,
    setShowEnglish,
  };
  
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
