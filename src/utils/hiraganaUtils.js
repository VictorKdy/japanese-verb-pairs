import { HIRAGANA_MAP } from "../data/hiraganaData.js";

// Helper to escape regex characters
const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Sort keys by length descending to match longest possible string first
const MAP_KEYS = Object.keys(HIRAGANA_MAP).sort((a, b) => b.length - a.length);
// Escape keys before joining to prevent "nothing to repeat" error
const MAP_REGEX = new RegExp(MAP_KEYS.map(escapeRegExp).join('|'), 'g');

export const romajiToHiragana = (text) => {
  if (!text) return '';
  let converted = text.toLowerCase();

  // 1. Handle Sokuon (Double Consonants): 'tt' -> 'っt', 'kk' -> 'っk'
  // Excluding 'n' because 'nn' is 'ん'
  converted = converted.replace(/([bcdfghjklmpqrstvwxyz])\1/g, 'っ$1');

  // 2. Handle 'nn' -> 'ん' (must come BEFORE n+consonant rule)
  converted = converted.replace(/nn/g, 'ん');

  // 3. Handle 'n' followed by a consonant (except y) -> 'ん' + consonant
  // e.g., 'kanta' -> 'ka' 'n' 'ta' -> 'ka' 'ん' 'ta'
  converted = converted.replace(/n(?=[^aeiouy])/g, 'ん');

  // 4. Main Mapping Replacement
  converted = converted.replace(MAP_REGEX, (match) => HIRAGANA_MAP[match]);

  return converted;
};

// Helper to normalize Katakana to Hiragana for comparison
// Unicode Shift: Katakana (30A0-30FF) - 0x60 = Hiragana (3040-309F)
export const toHiragana = (str) => {
  return str.replace(/[\u30a1-\u30f6]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
};
