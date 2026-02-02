Based on my analysis of main.js, I'll propose a modular structure that separates concerns logically.

## Proposed Directory Structure

```
root/src/
├── index.html
├── index.jsx                    # Entry point (unchanged)
├── App.jsx                      # Main App component (slim orchestrator)
├── data/
│   ├── hiraganaData.js          # (existing) Hiragana mapping
│   ├── sentenceData.js          # (existing) Verb data & rules
│   └── index.js                 # Re-exports
├── utils/
│   ├── hiraganaUtils.js         # (existing) Romaji/Katakana conversion
│   ├── rubyUtils.js             # buildSentenceRuby, containsKatakana helpers
│   └── index.js                 # Re-exports
├── hooks/
│   ├── useQuizState.js          # Quiz logic: shuffling, filtering, progress
│   ├── useInputHandler.js       # Input handling, validation, romaji conversion
│   └── index.js                 # Re-exports
├── components/
│   ├── common/
│   │   ├── RubyText.jsx         # Tap-to-toggle furigana component
│   │   ├── AnswerRubyText.jsx   # Answer display with furigana
│   │   └── index.js
│   ├── quiz/
│   │   ├── QuizCard.jsx         # Main question card (noun + verb display)
│   │   ├── TypeIndicator.jsx    # 自動詞/他動詞 indicator
│   │   ├── InputArea.jsx        # Text input with validation
│   │   ├── FeedbackPanel.jsx    # Correct/incorrect feedback + answer reveal
│   │   ├── VerbPairs.jsx        # Transitive/intransitive pair display
│   │   ├── ProgressBar.jsx      # Top progress bar
│   │   └── index.js
│   ├── settings/
│   │   ├── SettingsMenu.jsx     # Settings dropdown container
│   │   ├── LevelSelector.jsx    # Level checkboxes (N5-N4)
│   │   ├── TypeSelector.jsx     # Intransitive/Transitive toggles
│   │   ├── FormSelector.jsx     # Polite/Plain form toggles
│   │   ├── DisplayOptions.jsx   # Furigana, Dictionary, Pairs, English toggles
│   │   ├── QuizModeToggle.jsx   # Fixed Sequence toggle
│   │   └── index.js
│   ├── layout/
│   │   ├── Header.jsx           # Top bar with settings, restart, icon
│   │   ├── CompletionScreen.jsx # Quiz complete celebration
│   │   └── index.js
│   └── index.js                 # Re-exports all components
└── icons.js                     # (existing) Lucide icon re-exports
```

## File Responsibilities

### **`App.jsx`** - Orchestrator
- State declarations and wiring
- Combines hooks and renders layout
- ~100 lines (down from 900+)

### **`hooks/useQuizState.js`**
- `shuffledData`, `currentIndex`, `correctCount`, `totalQuestions`
- `selectedLevels`, `selectedTypes`, `selectedForms`, `isFixedOrder`
- Filter/shuffle logic, `handleNext`, `handleRestart`, `handleRetry`

### **`hooks/useInputHandler.js`**
- `userInput`, `isInvalidInput`, `feedback`, `showAnswer`
- `handleInputChange` (romaji conversion with cursor preservation)
- `handleCheck` (answer validation)
- `handleGiveUp`

### **`utils/rubyUtils.js`**
- `buildSentenceRuby(question, isPolite)`
- `containsKatakana(str)`

### **`components/common/RubyText.jsx`**
- Tap-to-toggle furigana logic
- `preventBlur` for mobile keyboard retention

### **`components/quiz/QuizCard.jsx`**
- Noun + Verb display with `RubyText`
- Dictionary form toggle display

### **`components/settings/SettingsMenu.jsx`**
- Dropdown container with click-outside detection
- Composes `LevelSelector`, `TypeSelector`, etc.

## Benefits

| Aspect | Before | After |
|--------|--------|-------|
| File size | 900+ lines | ~100 lines per file |
| Testing | Difficult | Isolated unit tests per component/hook |
| Reusability | None | Components reusable across features |
| Onboarding | Overwhelming | Clear entry points per concern |
| Code navigation | Scrolling | File-based discovery |

Would you like me to implement this refactoring?
