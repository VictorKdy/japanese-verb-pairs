import React, { useState, useEffect, useRef } from 'react';
import { Settings, CheckCheck, CheckCircle, XCircle, RefreshCw } from './icons.js';

import { romajiToHiragana, toHiragana } from "./hiraganaUtils.js";
import { VERB_DATA, VERB_SUFFIX_RULES, getVerbSuffixType } from "./sentenceData.js";

// Helper function to build ruby data for a sentence
// Returns array of { text, rt } objects where rt is only set for kanji/katakana
const buildSentenceRuby = (question, isPolite) => {
  const result = [];
  
  // Add noun parts (already has proper rt for kanji/katakana)
  result.push(...question.nounRuby);
  
  // Determine particle from sentence (character after noun)
  const sentence = isPolite ? question.politeSentence : question.plainSentence;
  const nounText = question.nounRuby.map(r => r.text).join('');
  const nounIndex = sentence.indexOf(nounText);
  const particle = sentence.charAt(nounIndex + nounText.length);
  result.push({ text: particle, rt: "" });
  
  if (isPolite) {
    // For polite form, get verb part from sentence
    const verbStart = nounIndex + nounText.length + 1; // +1 for particle
    const verbPart = sentence.substring(verbStart);
    
    // The verbRuby has the kanji stem, rest is hiragana suffix
    const verbKanji = question.verbRuby.map(r => r.text).join('');
    
    if (verbPart.startsWith(verbKanji)) {
      // Add verb kanji with furigana
      result.push(...question.verbRuby);
      // Add remaining hiragana suffix (きます, けます, etc.)
      const suffix = verbPart.substring(verbKanji.length);
      if (suffix) {
        result.push({ text: suffix, rt: "" });
      }
    } else {
      // Fallback: add the whole verb part without ruby
      result.push({ text: verbPart, rt: "" });
    }
  } else {
    // For plain form, use dictionaryRuby directly
    result.push(...question.dictionaryRuby);
  }
  
  return result;
};

// Helper Component: AnswerRubyText - displays sentence with furigana above kanji only
const AnswerRubyText = ({ data, colorClass, textSize = "text-xl", showFurigana = true }) => {
  return (
    <div className={`flex items-end justify-center ${colorClass}`}>
      {data.map((item, idx) => (
        <React.Fragment key={idx}>
          {item.rt && showFurigana ? (
            <ruby className="flex flex-col-reverse items-center">
              <span className={`${textSize} font-bold`}>{item.text}</span>
              <rt className="text-[10px] text-gray-400 font-normal">{item.rt}</rt>
            </ruby>
          ) : (
            <span className={`${textSize} font-bold`}>{item.text}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Helper Component: RubyText with tap-to-toggle furigana
const RubyText = ({ data, showFurigana }) => {
  // Track if the entire compound word's furigana is toggled
  const [isToggled, setIsToggled] = useState(false);

  // Reset toggle when data changes (new question)
  useEffect(() => {
    setIsToggled(false);
  }, [data]);

  // Check if this compound has any furigana
  const hasFurigana = data.some(item => item.rt);

  const handleTap = () => {
    if (!hasFurigana) return; // Only toggle if there's furigana
    setIsToggled(prev => !prev);
  };

  // Determine if furigana should show: global setting XOR toggle
  const shouldShowFurigana = showFurigana ? !isToggled : isToggled;

  return (
    <div 
      className={`flex items-end ${hasFurigana ? 'cursor-pointer select-none hover:opacity-80 transition-opacity' : ''}`}
      onClick={handleTap}
    >
      {data.map((item, idx) => {
        return (
          <React.Fragment key={idx}>
            {item.rt ? (
              <ruby className="flex flex-col-reverse items-center">
                <span className="text-3xl font-medium tracking-wide">{item.text}</span>
                {shouldShowFurigana && (
                  <rt className="text-xs text-gray-300 font-normal mb-0.5">{item.rt}</rt>
                )}
              </ruby>
            ) : (
              <span className="text-3xl font-medium tracking-wide">{item.text}</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null); 
  const [showAnswer, setShowAnswer] = useState(false);
  const [showFurigana, setShowFurigana] = useState(false); 
  const [showDictionary, setShowDictionary] = useState(false);
  const [showPairs, setShowPairs] = useState(false);
  const [correctCount, setCorrectCount] = useState(0); // Track correctly answered questions
  const [totalQuestions, setTotalQuestions] = useState(0); // Original total for display
  
  // Levels and Types
  const [selectedLevels, setSelectedLevels] = useState([1, 2]); 
  const [selectedTypes, setSelectedTypes] = useState(['Intransitive', 'Transitive']); 
  const [selectedForms, setSelectedForms] = useState(['Polite', 'Plain']); // Polite (丁寧形) and Plain (普通形) forms
  const [isEasyMode, setIsEasyMode] = useState(false); // NEW: Easy Mode state

  const [shuffledData, setShuffledData] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInvalidInput, setIsInvalidInput] = useState(false); // Track invalid (non-hiragana) input
  const settingsRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Updated Filter Logic: Check Level AND Type AND Mode
  useEffect(() => {
    // 1. Filter
    const filtered = VERB_DATA.filter(item => 
      selectedLevels.includes(item.level) && 
      selectedTypes.includes(item.type)
    );
    
    if (filtered.length > 0) {
      let finalPool;
      // 2. Sort or Shuffle based on Easy Mode
      if (isEasyMode) {
        finalPool = [...filtered].sort((a, b) => a.id - b.id);
      } else {
        finalPool = [...filtered].sort(() => Math.random() - 0.5);
      }
      
      setShuffledData(finalPool);
      setCurrentIndex(0); 
      setFeedback(null);
      setUserInput('');
      setShowAnswer(false);
      setCorrectCount(0); // Reset correct count
      setTotalQuestions(finalPool.length); // Store original total
    } else {
      setShuffledData([]);
      setTotalQuestions(0);
    }
  }, [selectedLevels, selectedTypes, isEasyMode]); // Dependency added

  // Force focus on mount
  useEffect(() => {
    if(inputRef.current) inputRef.current.focus();
  }, []);

  const currentQuestion = shuffledData[currentIndex];

  // Auto-focus and select input when new question renders
  useEffect(() => {
    if (currentQuestion && !feedback && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [currentQuestion, feedback]);

  // Check if string contains only Hiragana characters (strict: no spaces, punctuation, or symbols)
  const isHiraganaOnly = (str) => {
    // Hiragana range: \u3041-\u3096 (excludes small kana iteration marks)
    return /^[\u3041-\u3096]+$/.test(str);
  };

  const handleInputChange = (e) => {
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
    
    setUserInput(hiraganaValue);
    
    // Restore cursor position after React re-renders
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = newCursorPos;
        inputRef.current.selectionEnd = newCursorPos + (selectionEnd - selectionStart);
      }
    });
    
    // Clear invalid state when user types
    if (isInvalidInput) setIsInvalidInput(false);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    
    // Accessibility: If already showing feedback (incorrect/correct), Enter should go to next
    if (feedback === 'incorrect' || showAnswer) {
      handleNext(false); // Pass false for incorrect/skipped
      return;
    }

    if (!currentQuestion) return;

    // Validate input is hiragana only and not empty
    const trimmedInput = userInput.trim();
    if (trimmedInput.length === 0 || !isHiraganaOnly(trimmedInput)) {
      setIsInvalidInput(true);
      // Reset animation after it completes
      setTimeout(() => setIsInvalidInput(false), 500);
      return; // Don't process the input
    }

    // Normalization logic: Convert everything to Hiragana for comparison
    // This handles Katakana words (like ドア) by converting user's hiragana input (どあ) matches
    const inputHira = toHiragana(userInput.trim().replace(/\s+/g, ''));
    
    // Build array of valid answers based on selected forms
    const validAnswers = [];
    if (selectedForms.includes('Polite')) {
      validAnswers.push(toHiragana(currentQuestion.politeSentence));
      validAnswers.push(toHiragana(currentQuestion.politeKana.replace(/\s+/g, '')));
    }
    if (selectedForms.includes('Plain')) {
      validAnswers.push(toHiragana(currentQuestion.plainSentence));
      validAnswers.push(toHiragana(currentQuestion.plainKana.replace(/\s+/g, '')));
    }

    if (validAnswers.includes(inputHira)) {
      // Correct answer: advance to next immediately without showing feedback
      handleNext(true);
    } else {
      setFeedback('incorrect');
      // Do NOT lose focus here, so user can press Enter to skip
    }
  };

  const handleNext = (wasCorrect = false) => {
    if (wasCorrect) {
      // Correct answer: increment count and remove question from pool
      setCorrectCount(prev => prev + 1);
      setShuffledData(prev => {
        const newData = [...prev];
        newData.splice(currentIndex, 1);
        return newData;
      });
      // Adjust currentIndex if needed (stay at same index since we removed current)
      setCurrentIndex(prev => prev >= shuffledData.length - 1 ? 0 : prev);
    } else {
      // Incorrect answer: move question to end of pool
      setShuffledData(prev => {
        const newData = [...prev];
        const [currentQ] = newData.splice(currentIndex, 1);
        newData.push(currentQ); // Re-insert at end
        return newData;
      });
      // Stay at same index (next question slides into this position)
    }
    setFeedback(null);
    setUserInput('');
    setShowAnswer(false);
    if(inputRef.current) inputRef.current.focus();
  };

  // Global keyboard listener for Enter when feedback is showing
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Enter' && (feedback === 'incorrect' || feedback === 'correct')) {
        e.preventDefault();
        // Create inline logic to avoid stale closure
        if (feedback === 'correct') {
          setCorrectCount(prev => prev + 1);
          setShuffledData(prev => {
            const newData = [...prev];
            newData.splice(currentIndex, 1);
            return newData;
          });
          setCurrentIndex(prev => prev >= shuffledData.length - 1 ? 0 : prev);
        } else {
          setShuffledData(prev => {
            const newData = [...prev];
            const [currentQ] = newData.splice(currentIndex, 1);
            newData.push(currentQ);
            return newData;
          });
        }
        setFeedback(null);
        setUserInput('');
        setShowAnswer(false);
        if(inputRef.current) inputRef.current.focus();
      }
    };
    
    if (feedback) {
      window.addEventListener('keydown', handleGlobalKeyDown);
    }
    
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [feedback, currentIndex, shuffledData.length]);

  const handleGiveUp = () => {
    // Show the answer first, then user presses Next to trigger re-insertion
    setFeedback('incorrect');
    setShowAnswer(true);
    // Focus remains on input implicitly or explicitly
    if(inputRef.current) inputRef.current.focus();
  };

  const handleRetry = () => {
    setFeedback(null);
    setUserInput('');
    setShowAnswer(false);
    if(inputRef.current) inputRef.current.focus();
  };

  const handleRestart = () => {
    // Re-initialize the quiz with current settings
    const filtered = VERB_DATA.filter(item => 
      selectedLevels.includes(item.level) && 
      selectedTypes.includes(item.type)
    );
    
    if (filtered.length > 0) {
      let finalPool;
      if (isEasyMode) {
        finalPool = [...filtered].sort((a, b) => a.id - b.id);
      } else {
        finalPool = [...filtered].sort(() => Math.random() - 0.5);
      }
      
      setShuffledData(finalPool);
      setCurrentIndex(0);
      setFeedback(null);
      setUserInput('');
      setShowAnswer(false);
      setCorrectCount(0);
      setTotalQuestions(finalPool.length);
    }
    if(inputRef.current) inputRef.current.focus();
  };

  const toggleLevel = (level) => {
    setSelectedLevels(prev => {
      if (prev.includes(level)) {
        if (prev.length === 1) return prev; 
        return prev.filter(l => l !== level);
      } else {
        return [...prev, level];
      }
    });
  };

  const toggleType = (type) => {
    setSelectedTypes(prev => {
      if (prev.includes(type)) {
        if (prev.length === 1) return prev; 
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const toggleForm = (form) => {
    setSelectedForms(prev => {
      if (prev.includes(form)) {
        if (prev.length === 1) return prev; // At least one must remain
        return prev.filter(f => f !== form);
      } else {
        return [...prev, form];
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col font-sans relative">
      {/* Top 60% container - all interactive UI lives here */}
      <div className="h-[60vh] flex flex-col relative">
        {/* Settings Button */}
        <div className="absolute top-4 left-3 z-50" ref={settingsRef}>
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#333] text-gray-200 px-4 py-2 rounded-lg border border-[#333] shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <Settings size={18} className="text-gray-300" />
            <span className="font-medium text-sm tracking-wide">設定</span>
          </button>

        {isSettingsOpen && (
          <div className="absolute top-full left-0 mt-1 bg-[#2a2a2a] p-2 rounded-lg border border-[#333] shadow-xl w-48 animate-in fade-in slide-in-from-top-2 z-50 max-h-[100vh] overflow-y-auto">
             
             {/* LEVEL SECTION */}
             <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 border-b border-gray-600 pb-1">
               Select Levels
             </div>
             <div className="flex flex-col gap-0 mb-2">
               {[1, 2, 3, 4, 5, 6].map(level => (
                 <label key={level} className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-0.5 px-2 rounded transition-colors">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedLevels.includes(level) ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                      {selectedLevels.includes(level) && <CheckCheck size={12} className="text-white" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={selectedLevels.includes(level)}
                      onChange={() => toggleLevel(level)}
                    />
                    <span className={`text-base ${selectedLevels.includes(level) ? 'text-white font-bold' : 'text-gray-400'}`}>
                      レベル {level}
                    </span>
                 </label>
               ))}
             </div>

             {/* TRANSITIVITY SECTION */}
             <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 border-b border-gray-600 pb-1">
               Verb Type
             </div>
             <div className="flex flex-col gap-0 mb-2">
               <label className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-0.5 px-2 rounded transition-colors">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedTypes.includes('Intransitive') ? 'bg-purple-500 border-purple-500' : 'border-gray-500'}`}>
                    {selectedTypes.includes('Intransitive') && <CheckCheck size={12} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={selectedTypes.includes('Intransitive')}
                    onChange={() => toggleType('Intransitive')}
                  />
                  <div className="flex flex-col">
                    <span className={`text-base ${selectedTypes.includes('Intransitive') ? 'text-purple-400 font-bold' : 'text-gray-400'}`}>
                      自動詞
                    </span>
                    <span className={`text-[10px] ${selectedTypes.includes('Intransitive') ? 'text-gray-400 font-bold' : 'text-gray-400'}`}>Intransitive</span>
                  </div>
               </label>

               <label className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-0.5 px-2 rounded transition-colors">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedTypes.includes('Transitive') ? 'bg-yellow-500 border-yellow-500' : 'border-gray-500'}`}>
                    {selectedTypes.includes('Transitive') && <CheckCheck size={12} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={selectedTypes.includes('Transitive')}
                    onChange={() => toggleType('Transitive')}
                  />
                  <div className="flex flex-col">
                    <span className={`text-base ${selectedTypes.includes('Transitive') ? 'text-yellow-400 font-bold' : 'text-gray-400'}`}>
                      他動詞
                    </span>
                    <span className={`text-[10px] ${selectedTypes.includes('Transitive') ? 'text-gray-400 font-bold' : 'text-gray-400'}`}>Transitive</span>
                  </div>
               </label>
             </div>

             {/* VERB FORM SECTION */}
             <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 border-b border-gray-600 pb-1">
               Verb Form
             </div>
             <div className="flex flex-col gap-0 mb-2">
               <label className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-0.5 px-2 rounded transition-colors">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedForms.includes('Polite') ? 'bg-[#5F9EA0] border-[#5F9EA0]' : 'border-gray-500'}`}>
                    {selectedForms.includes('Polite') && <CheckCheck size={12} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={selectedForms.includes('Polite')}
                    onChange={() => toggleForm('Polite')}
                  />
                  <div className="flex flex-col">
                    <span className={`text-base ${selectedForms.includes('Polite') ? 'text-[#5F9EA0] font-bold' : 'text-gray-400'}`}>
                      丁寧形
                    </span>
                    <span className={`text-[10px] ${selectedForms.includes('Polite') ? 'text-gray-400 font-bold' : 'text-gray-400'}`}>Polite Form</span>
                  </div>
               </label>

               <label className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-0.5 px-2 rounded transition-colors">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedForms.includes('Plain') ? 'bg-[#D1AD8C] border-[#D1AD8C]' : 'border-gray-500'}`}>
                    {selectedForms.includes('Plain') && <CheckCheck size={12} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={selectedForms.includes('Plain')}
                    onChange={() => toggleForm('Plain')}
                  />
                  <div className="flex flex-col">
                    <span className={`text-base ${selectedForms.includes('Plain') ? 'text-[#D1AD8C] font-bold' : 'text-gray-400'}`}>
                      普通形
                    </span>
                    <span className={`text-[10px] ${selectedForms.includes('Plain') ? 'text-gray-400 font-bold' : 'text-gray-400'}`}>Plain Form</span>
                  </div>
               </label>
             </div>

             {/* DISPLAY OPTIONS SECTION (Moved from Top Right) */}
             <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 border-b border-gray-600 pb-1">
               Display Options
             </div>
             <div className="flex flex-col gap-0 mb-2">
               <label className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-0.5 px-2 rounded transition-colors">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${showFurigana ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                    {showFurigana && <CheckCheck size={12} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={showFurigana}
                    onChange={() => setShowFurigana(!showFurigana)}
                  />
                  <div className="flex flex-col">
                    <span className={`text-base ${showFurigana ? 'text-white font-bold' : 'text-gray-400'}`}>
                      振仮名
                    </span>
                    <span className={`text-[10px] ${showFurigana ? 'text-gray-400 font-bold' : 'text-gray-400'}`}>Furigana</span>
                  </div>
               </label>

               <label className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-0.5 px-2 rounded transition-colors">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${showDictionary ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                    {showDictionary && <CheckCheck size={12} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={showDictionary}
                    onChange={() => setShowDictionary(!showDictionary)}
                  />
                  <div className="flex flex-col">
                    <span className={`text-base ${showDictionary ? 'text-white font-bold' : 'text-gray-400'}`}>
                      辞書形
                    </span>
                    <span className={`text-[10px] ${showDictionary ? 'text-gray-400 font-bold' : 'text-gray-400'}`}>Dictionary Form</span>
                  </div>
               </label>

               <label className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-0.5 px-2 rounded transition-colors">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${showPairs ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                    {showPairs && <CheckCheck size={12} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={showPairs}
                    onChange={() => setShowPairs(!showPairs)}
                  />
                  <div className="flex flex-col">
                    <span className={`text-base ${showPairs ? 'text-white font-bold' : 'text-gray-400'}`}>
                      ペア表示
                    </span>
                    <span className={`text-[10px] ${showPairs ? 'text-gray-400 font-bold' : 'text-gray-400'}`}>Show Pairs</span>
                  </div>
               </label>
             </div>

             {/* EASY MODE SECTION */}
             <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 border-b border-gray-600 pb-1">
               Quiz Mode
             </div>
             <div className="flex flex-col gap-0">
               <label className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-0.5 px-2 rounded transition-colors">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isEasyMode ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                    {isEasyMode && <CheckCheck size={12} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={isEasyMode}
                    onChange={() => setIsEasyMode(!isEasyMode)}
                  />
                  <div className="flex flex-col">
                    <span className={`text-base ${isEasyMode ? 'text-white font-bold' : 'text-gray-400'}`}>
                      イージーモード
                    </span>
                    <span className={`text-[10px] ${isEasyMode ? 'text-gray-400 font-bold' : 'text-gray-400'}`}>Easy Mode</span>
                  </div>
               </label>
             </div>

          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full absolute top-0 h-1 bg-gray-800">
        <div 
          className="h-full bg-red-500 transition-all duration-300"
          style={{ width: `${totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0}%` }}
        />
      </div>
      
      {/* Top Right Controls */}
      <div className="absolute top-4 right-3 z-40 flex items-center gap-2">
        {/* Reset Quiz Button */}
        {currentQuestion && (
          <button
            onClick={handleRestart}
            className="px-3 py-2 bg-[#2a2a2a] rounded-lg shadow-inner border border-[#333] flex items-center justify-center hover:bg-[#333] transition-colors"
            title="リセット (Reset Quiz)"
          >
            <RefreshCw size={18} className="text-gray-300 opacity-90" strokeWidth={1.5} />
          </button>
        )}
        
        {/* Icon */}
        {currentQuestion && currentQuestion.icon && (
          <div className="px-3 py-2 bg-[#2a2a2a] rounded-lg shadow-inner border border-[#333] flex items-center justify-center">
            <currentQuestion.icon size={18} className={`${currentQuestion.color} opacity-90`} strokeWidth={1.5} />
          </div>
        )}
      </div>
      
      {/* Main Content Area - positioned within top 50% */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 pt-16 pb-1">
        
        {shuffledData.length === 0 && totalQuestions === 0 ? (
          <div className="text-center text-gray-400 text-sm">
            Select at least one level and type to start.
          </div>
        ) : shuffledData.length === 0 && totalQuestions > 0 ? (
          <div className="text-center text-green-400 text-xl font-bold space-y-4">
            <p>🎉 おめでとうございます！</p>
            <p className="text-base text-gray-300 font-normal">All {totalQuestions} questions answered correctly!</p>
            <button
              onClick={handleRestart}
              className="bg-green-800 hover:bg-green-700 text-white font-bold py-2.5 px-8 rounded-full transition-colors text-sm mt-4"
            >
              Restart
            </button>
          </div>
        ) : !currentQuestion ? (
          <div className="flex items-center justify-center text-white text-sm">Loading...</div>
        ) : (
          <>
            {/* Main Card Area - Compact Layout */}
            <div className="w-full max-w-sm flex flex-col items-center gap-2">

              {/* 1. Top Row: Noun + Verb Prompt */}
              <div className="w-full flex justify-between items-end px-4 pr-12">
                {/* Noun Section */}
                <div className="flex flex-col items-center group">
                  <div className="mb-0.5 h-12 flex items-end">
                    <RubyText data={currentQuestion.nounRuby} showFurigana={showFurigana} />
                  </div>
                  <div className="flex flex-col items-center w-full">
                    <div className="h-[2px] w-10 bg-red-600 mb-0.5"></div>
                    <span className="text-[10px] text-gray-300 tracking-wider font-semibold">名詞</span>
                  </div>
                </div>

                {/* Verb Section */}
                <div className="flex flex-col items-center">
                  <div className="mb-0.5 h-12 flex items-end">
                     <RubyText 
                        data={showDictionary ? currentQuestion.dictionaryRuby : currentQuestion.verbRuby} 
                        showFurigana={showFurigana} 
                     />
                  </div>
                  <div className="flex flex-col items-center w-full">
                    <div className="h-[2px] w-10 bg-red-600 mb-0.5"></div>
                    <span className="text-[10px] text-gray-300 tracking-wider font-semibold">動詞</span>
                  </div>
                </div>
              </div>

              {/* 3. Type Indicator */}
              <div className={`text-xl tracking-wide ${currentQuestion.type === 'Transitive' ? 'text-yellow-400' : 'text-purple-400'}`}>
                <span className="font-bold">{currentQuestion.type === 'Transitive' ? '他動詞' : '自動詞'}</span> <span className="text-xs text-gray-300 font-normal">{currentQuestion.type}</span>
              </div>

            </div>

            {/* Input Area - Compact */}
            <div className="w-full max-w-sm space-y-2 mt-4">
              <form 
                onSubmit={handleCheck} 
                className="relative w-full"
                onKeyDown={(e) => {
                  // Allow Enter to proceed to next even when input is disabled
                  if (e.key === 'Enter' && (feedback === 'incorrect' || feedback === 'correct')) {
                    e.preventDefault();
                    handleNext(feedback === 'correct');
                  }
                }}
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

              {/* Feedback / Answer Reveal - Expanded */}
              <div className="min-h-[90px] flex items-start justify-center pt-3">
                {feedback === 'incorrect' && (
                  <div className="text-center animate-in fade-in slide-in-from-bottom-2 space-y-1.5">
                    <p className="text-green-700 text-xs font-bold mb-2">正しい回答</p>
                    
                    {/* Show Polite Form if selected */}
                    {selectedForms.includes('Polite') && (
                      <div className="mb-2">
                        <AnswerRubyText 
                          data={buildSentenceRuby(currentQuestion, true)} 
                          colorClass="text-[#5F9EA0]" 
                          showFurigana={showFurigana}
                        />
                      </div>
                    )}
                    
                    {/* Show Plain Form if selected */}
                    {selectedForms.includes('Plain') && (
                      <div className="mb-2">
                        <AnswerRubyText 
                          data={buildSentenceRuby(currentQuestion, false)} 
                          colorClass="text-[#D1AD8C]" 
                          showFurigana={showFurigana}
                        />
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-300 italic">{currentQuestion.english}</p>
                    
                    {showPairs && (() => {
                      const pairId = currentQuestion.id % 2 === 1 ? currentQuestion.id + 1 : currentQuestion.id - 1;
                      const pairVerb = VERB_DATA.find(v => v.id === pairId);
                      if (pairVerb) {
                        // Determine which is intransitive (blue) and transitive (yellow)
                        const isCurrentIntransitive = currentQuestion.type === 'Intransitive';
                        const intransitiveVerb = isCurrentIntransitive ? currentQuestion : pairVerb;
                        const transitiveVerb = isCurrentIntransitive ? pairVerb : currentQuestion;
                        
                        // Get suffix types for both verbs
                        const intransitiveSuffix = getVerbSuffixType(intransitiveVerb.dictionaryRuby);
                        const transitiveSuffix = getVerbSuffixType(transitiveVerb.dictionaryRuby);
                        
                        return (
                          <div className="flex flex-col items-center gap-2 mt-2">
                            <div className="flex items-center justify-center gap-3">
                              <AnswerRubyText 
                                data={intransitiveVerb.dictionaryRuby} 
                                colorClass="text-purple-400" 
                                textSize="text-lg"
                                showFurigana={showFurigana}
                              />
                              <span className="text-gray-500">/</span>
                              <AnswerRubyText 
                                data={transitiveVerb.dictionaryRuby} 
                                colorClass="text-yellow-400" 
                                textSize="text-lg"
                                showFurigana={showFurigana}
                              />
                            </div>
                            {/* Rule explanations */}
                            <div className="flex flex-col items-center gap-1 text-base mt-1">
                              {intransitiveSuffix === 'suffix-aru' && (
                                <div className="flex items-center gap-2">
                                  <span className="text-purple-400">{VERB_SUFFIX_RULES.aru.explanationJa}</span>
                                  <span className="text-sm text-gray-300 italic">{VERB_SUFFIX_RULES.aru.explanationEn}</span>
                                </div>
                              )}
                              {transitiveSuffix === 'suffix-su' && (
                                <div className="flex items-center gap-2">
                                  <span className="text-yellow-400">{VERB_SUFFIX_RULES.su.explanationJa}</span>
                                  <span className="text-sm text-gray-300 italic">{VERB_SUFFIX_RULES.su.explanationEn}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                )}
                 {feedback === 'correct' && (
                  <div className="text-center text-green-400 font-bold text-sm animate-in zoom-in space-y-1">
                    <p>Great Job!</p>
                  </div>
                )}
              </div>
              
              {/* Controls */}
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

              {/* "I don't know" */}
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
            </div>
          </>
        )}

      </div>
      
      {/* Question Counter - at bottom of top half */}
      {shuffledData.length > 0 && (
        <div className="text-center text-gray-400 text-base pb-1">
          第{correctCount + 1}問 / 全{totalQuestions}問
        </div>
      )}
      
      </div>
      
      {/* Bottom 40% - Empty space for keyboard */}
      <div className="h-[40vh] bg-[#1a1a1a]"></div>
    </div>
  );
}