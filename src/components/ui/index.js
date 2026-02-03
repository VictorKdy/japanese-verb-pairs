/**
 * @fileoverview Exports reusable UI primitives and utility components.
 * These components provide consistent styling and behavior across the app,
 * including Japanese text rendering with furigana support.
 * @module components/ui
 */

/** @description Renders Japanese text with furigana (reading aid) above kanji characters */
export { RubyText } from './RubyText.jsx';

/** @description Specialized RubyText variant for displaying quiz answers with reveal animation */
export { AnswerRubyText } from './AnswerRubyText.jsx';

/** @description Visual progress indicator showing quiz completion percentage */
export { ProgressBar } from './ProgressBar.jsx';

/** @description Styled checkbox component for settings toggles */
export { Checkbox } from './Checkbox.jsx';

/** @description SVG icon components used throughout the application */
export * from './icons.js';
