// QuizFeedback - displays correct/incorrect feedback with answers
import React from 'react';
import { AnswerRubyText } from '../ui/AnswerRubyText.jsx';
import { useQuiz } from '../../context/QuizContext.jsx';
import { useSettings } from '../../context/SettingsContext.jsx';
import { buildSentenceRuby } from '../../utils/sentenceBuilder.js';
import { findPairVerb } from '../../utils/quizLogic.js';
import { VERB_SUFFIX_RULES, getVerbSuffixType } from '../../data/sentenceData.js';

export function QuizFeedback() {
  const { feedback, currentQuestion } = useQuiz();
  const { selectedForms, showFurigana, showEnglish, showPairs } = useSettings();
  
  if (!feedback || !currentQuestion) return null;
  
  if (feedback === 'correct') {
    return (
      <div className="min-h-[90px] flex items-start justify-center pt-3">
        <div className="text-center text-green-400 font-bold text-sm animate-in zoom-in space-y-1">
          <p>Great Job!</p>
        </div>
      </div>
    );
  }
  
  if (feedback === 'incorrect') {
    const pairVerb = showPairs ? findPairVerb(currentQuestion) : null;
    
    return (
      <div className="min-h-[90px] flex items-start justify-center pt-3">
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
          
          {showEnglish && (
            <p className="text-sm text-gray-300 italic">{currentQuestion.english}</p>
          )}
          
          {/* Pair hints */}
          {showPairs && pairVerb && <PairHints currentQuestion={currentQuestion} pairVerb={pairVerb} showFurigana={showFurigana} showEnglish={showEnglish} />}
        </div>
      </div>
    );
  }
  
  return null;
}

// Sub-component for pair hints
function PairHints({ currentQuestion, pairVerb, showFurigana, showEnglish }) {
  // Determine which is intransitive (purple) and transitive (yellow)
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
            {showEnglish && <span className="text-sm text-gray-300 italic">{VERB_SUFFIX_RULES.aru.explanationEn}</span>}
          </div>
        )}
        {transitiveSuffix === 'suffix-su' && (
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">{VERB_SUFFIX_RULES.su.explanationJa}</span>
            {showEnglish && <span className="text-sm text-gray-300 italic">{VERB_SUFFIX_RULES.su.explanationEn}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
