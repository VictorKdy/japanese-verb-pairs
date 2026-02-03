// AnswerRubyText - displays sentence with furigana above kanji and katakana
import React from 'react';
import { containsKatakana } from '../../utils/textUtils.js';
import { toHiragana } from '../../utils/hiraganaUtils.js';

export function AnswerRubyText({ data, colorClass, textSize = "text-xl", showFurigana = true }) {
  return (
    <div className={`flex items-end justify-center ${colorClass}`}>
      {data.map((item, idx) => {
        // Determine furigana: use rt if available, or generate from Katakana
        const furigana = item.rt || (containsKatakana(item.text) ? toHiragana(item.text) : "");
        
        return (
          <React.Fragment key={idx}>
            {furigana && showFurigana ? (
              <ruby className="flex flex-col-reverse items-center">
                <span className={`${textSize} font-bold`}>{item.text}</span>
                <rt className="text-[10px] text-gray-400 font-normal">{furigana}</rt>
              </ruby>
            ) : (
              <span className={`${textSize} font-bold`}>{item.text}</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
