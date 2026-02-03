/**
 * @fileoverview Exports React Context providers and their associated hooks.
 * These contexts manage global application state, separating user preferences
 * (settings) from quiz session state for better separation of concerns.
 * @module context
 */

/**
 * @description SettingsProvider wraps the app to provide user preferences.
 * @description useSettings hook accesses settings state (levels, forms, display options).
 */
export { SettingsProvider, useSettings } from './SettingsContext.jsx';

/**
 * @description QuizProvider manages active quiz session state.
 * @description useQuiz hook provides access to current question, score, and quiz actions.
 */
export { QuizProvider, useQuiz } from './QuizContext.jsx';
