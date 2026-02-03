# Modular Architecture Refactoring Proposal for `main.js`

## ✅ IMPLEMENTED

This refactoring has been completed. The modular architecture is now in place.

---

## Executive Summary

The original `main.js` (937 lines) was a monolithic file containing the entire application logic. This proposal outlined a modular architecture following separation of concerns, improving maintainability, testability, and developer experience.

---

## Current State Analysis

### `main.js` Contains:
| Concern | Lines (approx) | Description |
|---------|---------------|-------------|
| Imports | 1-5 | React, icons, utilities, data |
| Helper Functions | 7-50 | `containsKatakana`, `buildSentenceRuby` |
| UI Components | 52-115 | `AnswerRubyText`, `RubyText` |
| App State | 117-145 | 15+ useState hooks |
| Side Effects | 147-180 | useEffect hooks |
| Business Logic | 182-320 | Input handling, answer validation, quiz logic |
| Settings Panel | 420-670 | Complex nested JSX |
| Quiz Display | 670-850 | Main quiz interface |
| Feedback Display | 850-930 | Answer reveal and controls |

---

## Proposed Directory Structure

```
root/src/
├── index.html
├── index.jsx                    # Entry point (unchanged)
├── App.jsx                      # Main App component (slim orchestrator)
│
├── components/                  # Presentational React components
│   ├── ui/                      # Reusable UI primitives
│   │   ├── RubyText.jsx         # Furigana display with toggle
│   │   ├── AnswerRubyText.jsx   # Answer display with furigana
│   │   ├── Checkbox.jsx         # Custom styled checkbox
│   │   ├── ProgressBar.jsx      # Quiz progress indicator
│   │   └── index.js             # Barrel export
│   │
│   ├── quiz/                    # Quiz-specific components
│   │   ├── QuizCard.jsx         # Noun + Verb display card
│   │   ├── QuizInput.jsx        # Input field with validation
│   │   ├── QuizFeedback.jsx     # Correct/Incorrect feedback
│   │   ├── QuizControls.jsx     # Retry/Next/GiveUp buttons
│   │   ├── QuizComplete.jsx     # Completion celebration screen
│   │   └── index.js             # Barrel export
│   │
│   └── settings/                # Settings panel components
│       ├── SettingsPanel.jsx    # Main settings container
│       ├── LevelSelector.jsx    # Level checkboxes
│       ├── TypeSelector.jsx     # Verb type selector
│       ├── FormSelector.jsx     # Polite/Plain form selector
│       ├── DisplayOptions.jsx   # Furigana, dictionary, English toggles
│       ├── QuizModeSelector.jsx # Fixed order toggle
│       └── index.js             # Barrel export
│
├── hooks/                       # Custom React hooks
│   ├── useQuizState.js          # Quiz state management
│   ├── useInputValidation.js    # Input change & validation logic
│   ├── useKeyboardShortcuts.js  # Global keyboard event handlers
│   ├── useClickOutside.js       # Click outside detection
│   └── index.js                 # Barrel export
│
├── context/                     # React Context for global state
│   ├── QuizContext.jsx          # Quiz state provider
│   ├── SettingsContext.jsx      # Settings state provider
│   └── index.js                 # Barrel export
│
├── utils/                       # Pure utility functions
│   ├── hiraganaUtils.js         # (existing) romaji conversion
│   ├── textUtils.js             # containsKatakana, isHiraganaOnly
│   ├── sentenceBuilder.js       # buildSentenceRuby logic
│   ├── quizLogic.js             # Answer validation, shuffling
│   └── index.js                 # Barrel export
│
├── data/                        # Static data files
│   ├── hiraganaData.js          # (existing) HIRAGANA_MAP
│   ├── sentenceData.js          # (existing) VERB_DATA, rules
│   └── index.js                 # Barrel export
│
├── constants/                   # App-wide constants
│   ├── quizDefaults.js          # Default levels, types, forms
│   ├── colors.js                # Theme color tokens
│   └── index.js                 # Barrel export
│
└── icons.js                     # (existing) Lucide icon re-exports
```

---

## Detailed File Breakdown

### 1. `App.jsx` - Slim Orchestrator (~80 lines)

```jsx
// App.jsx - Main orchestrator component
import React from 'react';
import { QuizProvider } from './context/QuizContext';
import { SettingsProvider } from './context/SettingsContext';
import { SettingsPanel } from './components/settings';
import { QuizCard, QuizInput, QuizFeedback, QuizControls, QuizComplete } from './components/quiz';
import { ProgressBar } from './components/ui';
import { useQuizState } from './hooks';

export default function App() {
  return (
    <SettingsProvider>
      <QuizProvider>
        <QuizLayout />
      </QuizProvider>
    </SettingsProvider>
  );
}

function QuizLayout() {
  const { isComplete, isLoading, isEmpty } = useQuizState();
  
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col">
      <div className="h-[60vh] flex flex-col relative">
        <ProgressBar />
        <SettingsPanel />
        {isEmpty ? <EmptyState /> : isComplete ? <QuizComplete /> : <QuizMain />}
      </div>
      <div className="h-[40vh] bg-[#1a1a1a]" />
    </div>
  );
}
```

---

### 2. Context Files - State Management

#### `context/QuizContext.jsx` (~120 lines)
```jsx
// Manages: currentIndex, shuffledData, feedback, userInput, correctCount, totalQuestions
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { filterAndShuffleData } from '../utils/quizLogic';

const QuizContext = createContext();

const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA': return { ...state, shuffledData: action.payload, currentIndex: 0 };
    case 'NEXT_QUESTION': return { ...state, currentIndex: state.currentIndex + 1 };
    case 'SET_FEEDBACK': return { ...state, feedback: action.payload };
    case 'SET_INPUT': return { ...state, userInput: action.payload };
    case 'INCREMENT_CORRECT': return { ...state, correctCount: state.correctCount + 1 };
    case 'REMOVE_CURRENT': // ... splice logic
    case 'MOVE_TO_END': // ... reorder logic
    case 'RESET': return initialState;
    default: return state;
  }
};

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  // ... initialization effect
  return <QuizContext.Provider value={{ state, dispatch }}>{children}</QuizContext.Provider>;
}

export const useQuiz = () => useContext(QuizContext);
```

#### `context/SettingsContext.jsx` (~80 lines)
```jsx
// Manages: selectedLevels, selectedTypes, selectedForms, showFurigana, showEnglish, etc.
import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_LEVELS, DEFAULT_TYPES, DEFAULT_FORMS } from '../constants/quizDefaults';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [selectedLevels, setSelectedLevels] = useState(DEFAULT_LEVELS);
  const [selectedTypes, setSelectedTypes] = useState(DEFAULT_TYPES);
  const [selectedForms, setSelectedForms] = useState(DEFAULT_FORMS);
  const [showFurigana, setShowFurigana] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [showPairs, setShowPairs] = useState(false);
  const [showEnglish, setShowEnglish] = useState(false);
  const [isFixedOrder, setIsFixedOrder] = useState(false);
  
  const value = {
    selectedLevels, toggleLevel: (l) => setSelectedLevels(prev => toggleItem(prev, l)),
    selectedTypes, toggleType: (t) => setSelectedTypes(prev => toggleItem(prev, t)),
    selectedForms, toggleForm: (f) => setSelectedForms(prev => toggleItem(prev, f)),
    showFurigana, setShowFurigana,
    showDictionary, setShowDictionary,
    showPairs, setShowPairs,
    showEnglish, setShowEnglish,
    isFixedOrder, setIsFixedOrder,
  };
  
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export const useSettings = () => useContext(SettingsContext);
```

---

### 3. Custom Hooks

#### `hooks/useQuizState.js`
```jsx
// Combines quiz context with derived state
export function useQuizState() {
  const { state } = useQuiz();
  const { shuffledData, currentIndex, correctCount, totalQuestions } = state;
  
  return {
    currentQuestion: shuffledData[currentIndex],
    isComplete: shuffledData.length === 0 && totalQuestions > 0,
    isEmpty: shuffledData.length === 0 && totalQuestions === 0,
    isLoading: !shuffledData.length && !totalQuestions,
    progress: totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0,
    questionNumber: correctCount + 1,
    totalQuestions,
  };
}
```

#### `hooks/useInputValidation.js`
```jsx
// Encapsulates input handling and romaji conversion
import { romajiToHiragana } from '../utils/hiraganaUtils';
import { isHiraganaOnly } from '../utils/textUtils';

export function useInputValidation(inputRef) {
  const [isInvalidInput, setIsInvalidInput] = useState(false);
  
  const handleInputChange = useCallback((e, setUserInput) => {
    // ... cursor position preservation logic
    const hiraganaValue = romajiToHiragana(rawValue);
    setUserInput(hiraganaValue);
    if (isInvalidInput) setIsInvalidInput(false);
  }, [isInvalidInput]);
  
  const validateInput = useCallback((input) => {
    const trimmed = input.trim();
    if (trimmed.length === 0 || !isHiraganaOnly(trimmed)) {
      setIsInvalidInput(true);
      setTimeout(() => setIsInvalidInput(false), 500);
      return false;
    }
    return true;
  }, []);
  
  return { handleInputChange, validateInput, isInvalidInput };
}
```

#### `hooks/useKeyboardShortcuts.js`
```jsx
// Global keyboard event handling
export function useKeyboardShortcuts(feedback, handlers) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && feedback) {
        e.preventDefault();
        handlers.onNext(feedback === 'correct');
      }
      if (e.key === 'Backspace' && feedback) {
        e.preventDefault();
        handlers.onRetry();
      }
    };
    
    if (feedback) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [feedback, handlers]);
}
```

---

### 4. Utility Functions

#### `utils/textUtils.js`
```js
// Pure functions for text validation
export const containsKatakana = (str) => /[\u30a1-\u30f6]/.test(str);
export const isHiraganaOnly = (str) => /^[\u3041-\u3096]+$/.test(str);
```

#### `utils/sentenceBuilder.js`
```js
// buildSentenceRuby moved here
export const buildSentenceRuby = (question, isPolite) => {
  // ... existing implementation
};
```

#### `utils/quizLogic.js`
```js
// Quiz filtering and validation
import { VERB_DATA } from '../data/sentenceData';
import { toHiragana } from './hiraganaUtils';

export const filterAndShuffleData = (levels, types, isFixedOrder) => {
  const filtered = VERB_DATA.filter(item => 
    levels.includes(item.level) && types.includes(item.type)
  );
  return isFixedOrder 
    ? [...filtered].sort((a, b) => a.id - b.id)
    : [...filtered].sort(() => Math.random() - 0.5);
};

export const validateAnswer = (input, question, selectedForms) => {
  const inputHira = toHiragana(input.trim().replace(/\s+/g, ''));
  const validAnswers = [];
  
  if (selectedForms.includes('Polite')) {
    validAnswers.push(toHiragana(question.politeSentence));
    validAnswers.push(toHiragana(question.politeKana.replace(/\s+/g, '')));
  }
  if (selectedForms.includes('Plain')) {
    validAnswers.push(toHiragana(question.plainSentence));
    validAnswers.push(toHiragana(question.plainKana.replace(/\s+/g, '')));
  }
  
  return validAnswers.includes(inputHira);
};
```

---

### 5. Component Examples

#### `components/ui/RubyText.jsx`
```jsx
// Extracted RubyText component with toggle functionality
import React, { useState, useEffect } from 'react';

export function RubyText({ data, showFurigana }) {
  const [isToggled, setIsToggled] = useState(false);
  
  useEffect(() => { setIsToggled(false); }, [data]);
  
  const hasFurigana = data.some(item => item.rt);
  const shouldShowFurigana = showFurigana ? !isToggled : isToggled;
  
  // ... render logic
}
```

#### `components/settings/SettingsPanel.jsx`
```jsx
// Settings panel with sections
import { useSettings } from '../../context/SettingsContext';
import { useClickOutside } from '../../hooks';
import { LevelSelector, TypeSelector, FormSelector, DisplayOptions, QuizModeSelector } from './';

export function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => setIsOpen(false));
  
  return (
    <div ref={ref} className="absolute top-4 left-3 z-50">
      <SettingsButton onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <div className="settings-dropdown">
          <LevelSelector />
          <TypeSelector />
          <FormSelector />
          <DisplayOptions />
          <QuizModeSelector />
        </div>
      )}
    </div>
  );
}
```

---

## Migration Strategy

### Phase 1: Extract Utilities (Low Risk)
1. Create `utils/textUtils.js` with pure functions
2. Create `utils/sentenceBuilder.js` with `buildSentenceRuby`
3. Create `utils/quizLogic.js` with filter/validate functions
4. Update imports in `main.js`

### Phase 2: Extract UI Components (Medium Risk)
1. Create `components/ui/RubyText.jsx` and `AnswerRubyText.jsx`
2. Create `components/ui/ProgressBar.jsx`
3. Create `components/ui/Checkbox.jsx`
4. Test rendering

### Phase 3: Create Context Providers (Medium Risk)
1. Create `context/SettingsContext.jsx`
2. Create `context/QuizContext.jsx`
3. Wrap app with providers
4. Migrate state from `useState` to context

### Phase 4: Extract Quiz Components (High Impact)
1. Create `components/quiz/QuizCard.jsx`
2. Create `components/quiz/QuizInput.jsx`
3. Create `components/quiz/QuizFeedback.jsx`
4. Create `components/quiz/QuizControls.jsx`
5. Create `components/quiz/QuizComplete.jsx`

### Phase 5: Extract Settings Components (High Impact)
1. Create individual selector components
2. Create `SettingsPanel.jsx` orchestrator

### Phase 6: Extract Hooks (Final)
1. Create `hooks/useQuizState.js`
2. Create `hooks/useInputValidation.js`
3. Create `hooks/useKeyboardShortcuts.js`
4. Create `hooks/useClickOutside.js`

### Phase 7: Slim Down App.jsx
1. Compose components in `App.jsx`
2. Remove old `main.js` code
3. Final testing

---

## Benefits of This Architecture

| Benefit | Description |
|---------|-------------|
| **Separation of Concerns** | UI, logic, and data are cleanly separated |
| **Testability** | Hooks and utilities can be unit tested independently |
| **Reusability** | UI components can be reused across features |
| **Maintainability** | Small focused files (~50-150 lines each) |
| **Developer Experience** | Easier to navigate and understand codebase |
| **State Management** | Context pattern centralizes state changes |
| **Type Safety Ready** | Structure ready for TypeScript migration |

---

## File Size Comparison

| Current | Proposed (approx lines per file) |
|---------|----------------------------------|
| `main.js`: 937 lines | `App.jsx`: 80 |
| | `QuizContext.jsx`: 120 |
| | `SettingsContext.jsx`: 80 |
| | `SettingsPanel.jsx`: 60 |
| | `LevelSelector.jsx`: 40 |
| | `TypeSelector.jsx`: 50 |
| | `FormSelector.jsx`: 50 |
| | `DisplayOptions.jsx`: 80 |
| | `QuizCard.jsx`: 60 |
| | `QuizInput.jsx`: 80 |
| | `QuizFeedback.jsx`: 100 |
| | `QuizControls.jsx`: 40 |
| | `RubyText.jsx`: 50 |
| | `AnswerRubyText.jsx`: 40 |
| | Hooks: 50-80 each |
| | Utils: 20-40 each |

**Total: ~25 files averaging 50-80 lines each**

---

## Optional Enhancements

### 1. TypeScript Migration
After modularization, add TypeScript for type safety:
```
src/types/
├── quiz.types.ts
├── verb.types.ts
└── settings.types.ts
```

### 2. Testing Infrastructure
```
src/__tests__/
├── hooks/
├── utils/
└── components/
```

### 3. Storybook for Components
Document UI components independently for design review.

---

## Conclusion

This refactoring transforms a 937-line monolithic file into a well-organized, modular architecture with:
- **25+ focused files** averaging 50-80 lines
- **Clear separation** of UI, logic, and data concerns
- **Context-based state management** for predictable state updates
- **Reusable hooks** encapsulating complex behavior
- **Testable utilities** with pure functions

The phased migration approach minimizes risk while incrementally improving the codebase.
