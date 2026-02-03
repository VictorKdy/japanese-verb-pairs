/**
 * @fileoverview Exports custom React hooks for shared behavior.
 * These hooks encapsulate reusable logic for DOM interactions and
 * event handling, keeping components focused on rendering.
 * @module hooks
 */

/** @description Detects clicks outside a ref element to close dropdowns/modals */
export { useClickOutside } from './useClickOutside.js';

/** @description Registers global keyboard shortcuts (Enter to submit, Escape to skip) */
export { useKeyboardShortcuts } from './useKeyboardShortcuts.js';

/** @description Manages quiz input state with real-time romaji-to-hiragana conversion */
export { useInputHandler } from './useInputHandler.js';
