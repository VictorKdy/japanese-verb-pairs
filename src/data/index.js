/**
 * @fileoverview Exports static data sets for Japanese language processing.
 * Contains hiragana character mappings and verb conjugation data sourced
 * from JLPT study materials to power the quiz generation system.
 * @module data
 */

/** @description Romaji-to-hiragana conversion lookup table for input handling */
export { HIRAGANA_MAP } from './hiraganaData.js';

/**
 * @description VERB_DATA contains all verbs with their conjugations and levels.
 * @description VERB_SUFFIX_RULES defines conjugation patterns by verb class.
 * @description getVerbSuffixType determines verb class from dictionary form ending.
 */
export { VERB_DATA, VERB_SUFFIX_RULES, getVerbSuffixType } from './sentenceData.js';
