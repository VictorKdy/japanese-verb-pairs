// QuizCard - displays noun and verb prompt
import React from 'react';
import { RubyText } from '../ui/RubyText.jsx';
import { useQuiz } from '../../context/QuizContext.jsx';
import { useSettings } from '../../context/SettingsContext.jsx';

export function QuizCard() {
  const { currentQuestion } = useQuiz();
  const { showFurigana, showDictionary, showEnglish } = useSettings();
  
  if (!currentQuestion) return null;
  
  return (
    <div className="w-full max-w-sm flex flex-col items-center gap-2">
      {/* Top Row: Noun + Verb Prompt */}
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

      {/* Type Indicator */}
      <div className={`text-xl tracking-wide ${currentQuestion.type === 'Transitive' ? 'text-yellow-400' : 'text-purple-400'}`}>
        <span className="font-bold">{currentQuestion.type === 'Transitive' ? '他動詞' : '自動詞'}</span>
        {showEnglish && <span className="text-xs text-gray-300 font-normal"> {currentQuestion.type}</span>}
      </div>
    </div>
  );
}
