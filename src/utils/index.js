/**
 * @fileoverview Exports utility functions for text processing and quiz logic.
 * These pure functions handle Japanese text manipulation, sentence construction,
 * and quiz state management without side effects.
 * @module utils
 */

/** @description Text manipulation utilities for string formatting and comparison */
export * from './textUtils.js';

/** @description Constructs complete Japanese sentences from verb data and templates */
export * from './sentenceBuilder.js';

/** @description Core quiz logic: question generation, answer validation, scoring */
export * from './quizLogic.js';

/**
 * @description romajiToHiragana converts romanized input to Japanese hiragana.
 * @description toHiragana normalizes mixed kana text to hiragana for comparison.
 */
export { romajiToHiragana, toHiragana } from './hiraganaUtils.js';
