// Build ruby data for a sentence
// Returns array of { text, rt } objects where rt is only set for kanji/katakana

export const buildSentenceRuby = (question, isPolite) => {
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
