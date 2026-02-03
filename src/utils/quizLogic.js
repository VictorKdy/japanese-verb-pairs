// Quiz filtering, shuffling, and answer validation logic
import { VERB_DATA } from '../data/sentenceData.js';
import { toHiragana } from './hiraganaUtils.js';

/**
 * Filter and optionally shuffle verb data based on selected levels and types
 */
export const filterAndShuffleData = (levels, types, isFixedOrder) => {
  const filtered = VERB_DATA.filter(item => 
    levels.includes(item.level) && types.includes(item.type)
  );
  
  if (filtered.length === 0) return [];
  
  return isFixedOrder 
    ? [...filtered].sort((a, b) => a.id - b.id)
    : [...filtered].sort(() => Math.random() - 0.5);
};

/**
 * Validate user's answer against correct answers
 */
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

/**
 * Find the pair verb for a given question (transitive/intransitive pair)
 */
export const findPairVerb = (question) => {
  const pairId = question.id % 2 === 1 ? question.id + 1 : question.id - 1;
  return VERB_DATA.find(v => v.id === pairId);
};
