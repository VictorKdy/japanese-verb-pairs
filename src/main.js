import React, { useState, useEffect, useRef } from 'react';
import { Settings, CheckCheck, CheckCircle, XCircle, RefreshCw } from './icons.js';

import { romajiToHiragana, toHiragana } from "./hiraganaUtils.js";
import { VERB_DATA } from "./sentenceData.js";

// Helper Component: RubyText
const RubyText = ({ data, showFurigana }) => {
  return (
    <div className="flex items-end">
      {data.map((item, idx) => (
        <React.Fragment key={idx}>
          {showFurigana && item.rt ? (
            <ruby className="flex flex-col-reverse items-center">
              <span className="text-3xl font-medium tracking-wide">{item.text}</span>
              <rt className="text-xs text-gray-300 font-normal mb-0.5">{item.rt}</rt>
            </ruby>
          ) : (
            <span className="text-3xl font-medium tracking-wide">{item.text}</span>
          )}
        </React.Fragment>
      ))}
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
  
  // Levels and Types
  const [selectedLevels, setSelectedLevels] = useState([1, 2]); 
  const [selectedTypes, setSelectedTypes] = useState(['Intransitive', 'Transitive']); 
  const [isEasyMode, setIsEasyMode] = useState(false); // NEW: Easy Mode state

  const [shuffledData, setShuffledData] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
    } else {
      setShuffledData([]);
    }
  }, [selectedLevels, selectedTypes, isEasyMode]); // Dependency added

  // Force focus on mount
  useEffect(() => {
    if(inputRef.current) inputRef.current.focus();
  }, []);

  const currentQuestion = shuffledData[currentIndex];

  const handleInputChange = (e) => {
    // Convert to Hiragana on the fly
    const rawValue = e.target.value;
    const hiraganaValue = romajiToHiragana(rawValue);
    setUserInput(hiraganaValue);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    
    // Accessibility: If already showing feedback (incorrect/correct), Enter should go to next
    if (feedback === 'incorrect' || showAnswer) {
      handleNext();
      return;
    }

    if (!currentQuestion) return;

    // Normalization logic: Convert everything to Hiragana for comparison
    // This handles Katakana words (like ドア) by converting user's hiragana input (どあ) matches
    const inputHira = toHiragana(userInput.trim().replace(/\s+/g, ''));
    const targetKanjiHira = toHiragana(currentQuestion.sentence);
    const targetKanaHira = toHiragana(currentQuestion.kana.replace(/\s+/g, ''));

    if (inputHira === targetKanjiHira || inputHira === targetKanaHira) {
      setFeedback('correct');
      // Auto advance after short delay (Latency Reduction: 1500ms -> 800ms)
      setTimeout(() => {
        handleNext();
      }, 800);
    } else {
      setFeedback('incorrect');
      // Do NOT lose focus here, so user can press Enter to skip
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setUserInput('');
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % shuffledData.length);
    if(inputRef.current) inputRef.current.focus();
  };

  const handleGiveUp = () => {
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
             <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 border-b border-gray-600 pb-1">
               Select Levels
             </div>
             <div className="flex flex-col gap-0 mb-3">
               {[1, 2, 3, 4, 5, 6].map(level => (
                 <label key={level} className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-1 px-2 rounded transition-colors">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedLevels.includes(level) ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                      {selectedLevels.includes(level) && <CheckCheck size={12} className="text-white" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={selectedLevels.includes(level)}
                      onChange={() => toggleLevel(level)}
                    />
                    <span className={`text-base ${selectedLevels.includes(level) ? 'text-white font-medium' : 'text-gray-500'}`}>
                      レベル {level}
                    </span>
                 </label>
               ))}
             </div>

             {/* TRANSITIVITY SECTION */}
             <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 border-b border-gray-600 pb-1">
               Verb Type
             </div>
             <div className="flex flex-col gap-0 mb-3">
               <label className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-1 px-2 rounded transition-colors">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedTypes.includes('Intransitive') ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`}>
                    {selectedTypes.includes('Intransitive') && <CheckCheck size={12} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={selectedTypes.includes('Intransitive')}
                    onChange={() => toggleType('Intransitive')}
                  />
                  <div className="flex flex-col">
                    <span className={`text-base ${selectedTypes.includes('Intransitive') ? 'text-blue-400 font-medium' : 'text-gray-500'}`}>
                      自動詞
                    </span>
                    <span className="text-[10px] text-gray-500">Intransitive</span>
                  </div>
               </label>

               <label className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-1 px-2 rounded transition-colors">
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
                    <span className={`text-base ${selectedTypes.includes('Transitive') ? 'text-yellow-400 font-medium' : 'text-gray-500'}`}>
                      他動詞
                    </span>
                    <span className="text-[10px] text-gray-500">Transitive</span>
                  </div>
               </label>
             </div>

             {/* DISPLAY OPTIONS SECTION (Moved from Top Right) */}
             <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 border-b border-gray-600 pb-1">
               Display Options
             </div>
             <div className="flex flex-col gap-0 mb-3">
               <label className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-1 px-2 rounded transition-colors">
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
                    <span className={`text-base ${showFurigana ? 'text-white font-medium' : 'text-gray-500'}`}>
                      振仮名
                    </span>
                    <span className="text-[10px] text-gray-500">Furigana</span>
                  </div>
               </label>

               <label className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-1 px-2 rounded transition-colors">
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
                    <span className={`text-base ${showDictionary ? 'text-white font-medium' : 'text-gray-500'}`}>
                      辞書形
                    </span>
                    <span className="text-[10px] text-gray-500">Dictionary Form</span>
                  </div>
               </label>

               <label className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-1 px-2 rounded transition-colors">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${showPairs ? 'bg-purple-500 border-purple-500' : 'border-gray-500'}`}>
                    {showPairs && <CheckCheck size={12} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={showPairs}
                    onChange={() => setShowPairs(!showPairs)}
                  />
                  <div className="flex flex-col">
                    <span className={`text-base ${showPairs ? 'text-white font-medium' : 'text-gray-500'}`}>
                      ペア表示
                    </span>
                    <span className="text-[10px] text-gray-500">Show Pairs</span>
                  </div>
               </label>
             </div>

             {/* EASY MODE SECTION */}
             <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 border-b border-gray-600 pb-1">
               Quiz Mode
             </div>
             <div className="flex flex-col gap-0">
               <label className="flex items-center gap-2 cursor-pointer hover:bg-[#333] py-1 px-2 rounded transition-colors">
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
                    <span className={`text-base ${isEasyMode ? 'text-white font-medium' : 'text-gray-500'}`}>
                      イージーモード
                    </span>
                    <span className="text-[10px] text-gray-500">Easy Mode</span>
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
          style={{ width: `${shuffledData.length > 0 ? ((currentIndex + 1) / shuffledData.length) * 100 : 0}%` }}
        />
      </div>
      
      {/* Icon - Top Right Corner */}
      {currentQuestion && currentQuestion.icon && (
        <div className="absolute top-4 right-3 z-40 px-3 py-2 bg-[#2a2a2a] rounded-lg shadow-inner border border-[#333] flex items-center justify-center">
          <currentQuestion.icon size={18} className={`${currentQuestion.color} opacity-90`} strokeWidth={1.5} />
        </div>
      )}
      
      {/* Main Content Area - positioned within top 50% */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 pt-16 pb-1">
        
        {shuffledData.length === 0 ? (
          <div className="text-center text-gray-400 text-sm">
            Select at least one level and type to start.
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
                    <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold">noun</span>
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
                    <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold">Verb</span>
                  </div>
                </div>
              </div>

              {/* 3. Type Indicator */}
              <div className={`text-lg tracking-wide font-light ${currentQuestion.type === 'Transitive' ? 'text-yellow-400' : 'text-blue-400'}`}>
                {currentQuestion.type === 'Transitive' ? '他動詞' : '自動詞'} <span className="text-xs text-gray-500">({currentQuestion.type})</span>
              </div>

            </div>

            {/* Input Area - Compact */}
            <div className="w-full max-w-sm space-y-2 mt-4">
              <form onSubmit={handleCheck} className="relative w-full">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder="Type sentence..."
                  className={`w-full bg-white text-black text-center text-base py-1.5 px-4 rounded-full focus:outline-none focus:ring-2 transition-all shadow-lg
                    ${feedback === 'correct' ? 'ring-green-500 bg-green-50' : ''}
                    ${feedback === 'incorrect' ? 'ring-red-500 bg-red-50' : 'ring-transparent focus:ring-blue-400'}
                  `}
                  autoFocus
                  disabled={feedback === 'correct'}
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
                    <p className="text-red-400 text-xs font-bold mb-2">正しい回答</p>
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-lg font-bold">{currentQuestion.sentence}</p>
                      <p className="text-xs text-gray-500 italic">{currentQuestion.english}</p>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">({currentQuestion.kana})</p>
                    {showPairs && (() => {
                      const pairId = currentQuestion.id % 2 === 1 ? currentQuestion.id + 1 : currentQuestion.id - 1;
                      const pairVerb = VERB_DATA.find(v => v.id === pairId);
                      const pairColor = pairId % 2 === 1 ? 'text-blue-400' : 'text-yellow-400';
                      if (pairVerb) {
                        return (
                          <p className={`text-sm ${pairColor} mt-2`}>
                            ペア: {pairVerb.dictionaryRuby.map(r => r.text).join('')}
                          </p>
                        );
                      }
                      return null;
                    })()}
                  </div>
                )}
                 {feedback === 'correct' && (
                  <div className="text-center text-green-400 font-bold text-sm animate-in zoom-in space-y-1">
                    <p>Great Job!</p>
                    {showPairs && (() => {
                      const pairId = currentQuestion.id % 2 === 1 ? currentQuestion.id + 1 : currentQuestion.id - 1;
                      const pairVerb = VERB_DATA.find(v => v.id === pairId);
                      const pairColor = pairId % 2 === 1 ? 'text-blue-400' : 'text-yellow-400';
                      if (pairVerb) {
                        return (
                          <p className={`text-sm ${pairColor} mt-2 font-normal`}>
                            ペア: {pairVerb.dictionaryRuby.map(r => r.text).join('')}
                          </p>
                        );
                      }
                      return null;
                    })()}
                  </div>
                )}
              </div>
              
              {/* Controls */}
              <div className="flex gap-2 justify-center mt-8">
                {(feedback === 'incorrect' || showAnswer) && (
                  <>
                    <button 
                      onClick={handleRetry}
                      className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1.5 px-6 rounded-full flex items-center gap-1.5 transition-colors text-sm"
                    >
                      もう一度
                    </button>
                    <button 
                      onClick={handleNext}
                      className={`${feedback === 'correct' ? 'bg-green-700 hover:bg-green-600' : 'bg-red-700 hover:bg-red-600'} text-white font-bold py-1.5 px-6 rounded-full transition-colors text-sm`}
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
                   className="text-gray-500 hover:text-gray-300 text-xs font-medium py-0.5 px-3 transition-colors"
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
      <div className="text-center text-gray-600 text-[10px] pb-1">
        Question {currentIndex + 1} of {shuffledData.length}
      </div>
      
      </div>
      
      {/* Bottom 40% - Empty space for keyboard */}
      <div className="h-[40vh] bg-[#1a1a1a]"></div>
    </div>
  );
}