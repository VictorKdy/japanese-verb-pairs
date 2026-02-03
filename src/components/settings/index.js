/**
 * @fileoverview Exports settings and configuration components.
 * These components allow users to customize their quiz experience,
 * including difficulty levels, verb types, and display preferences.
 * @module components/settings
 */

/** @description Main collapsible panel containing all quiz configuration options */
export { SettingsPanel } from './SettingsPanel.jsx';

/** @description Allows selection of difficulty levels for verb filtering */
export { LevelSelector } from './LevelSelector.jsx';

/** @description Filters verbs by transitive/intransitive */
export { TypeSelector } from './TypeSelector.jsx';

/** @description Selects which verb forms to practice (polite or plain) */
export { FormSelector } from './FormSelector.jsx';

/** @description Controls visual preferences like furigana display and hints */
export { DisplayOptions } from './DisplayOptions.jsx';

/** @description Practice mode quiz mode */
export { QuizModeSelector } from './QuizModeSelector.jsx';
