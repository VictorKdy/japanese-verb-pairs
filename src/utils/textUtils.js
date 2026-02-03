// Pure functions for text validation

// Check if a string contains Katakana characters
export const containsKatakana = (str) => /[\u30a1-\u30f6]/.test(str);

// Check if string contains only Hiragana characters (strict: no spaces, punctuation, or symbols)
// Hiragana range: \u3041-\u3096 (excludes small kana iteration marks)
export const isHiraganaOnly = (str) => /^[\u3041-\u3096]+$/.test(str);
