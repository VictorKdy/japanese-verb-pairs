// RubyText - displays Japanese text with tap-to-toggle furigana
import React, { useState, useEffect } from 'react';

export function RubyText({ data, showFurigana }) {
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

  // Prevent mousedown/touchstart from stealing focus from input (keeps virtual keyboard open)
  const preventBlur = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      className={`flex items-end ${hasFurigana ? 'cursor-pointer select-none hover:opacity-80 transition-opacity' : ''}`}
      onMouseDown={hasFurigana ? preventBlur : undefined}
      onTouchStart={hasFurigana ? preventBlur : undefined}
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
}
