/**
 * Custom vocabulary storage for user-added words (e.g. from sentence mining)
 * Stored in localStorage, supplements the built-in vocab array
 */

import { type VocabWord } from './vocab';

const STORAGE_KEY = 'milhojas-custom-vocab';

export interface CustomWord extends VocabWord {
  category: 'custom';
  source?: string;
  addedAt: number;
}

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveJSON<T>(key: string, data: T): void {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
}

export function loadCustomVocab(): CustomWord[] {
  return loadJSON(STORAGE_KEY, []);
}

export function saveCustomWord(word: Omit<CustomWord, 'id' | 'category' | 'addedAt'>): CustomWord {
  const words = loadCustomVocab();
  const newWord: CustomWord = {
    ...word,
    id: `custom-${Date.now()}`,
    category: 'custom',
    difficulty: word.difficulty || 'medium',
    addedAt: Date.now(),
  };
  words.push(newWord);
  saveJSON(STORAGE_KEY, words);
  return newWord;
}

export function removeCustomWord(id: string): void {
  const words = loadCustomVocab().filter(w => w.id !== id);
  saveJSON(STORAGE_KEY, words);
}

export function isWordKnown(es: string, allWords: VocabWord[]): boolean {
  const normalized = es.toLowerCase().trim();
  return allWords.some(w =>
    w.es.toLowerCase().trim() === normalized ||
    w.es.toLowerCase().replace(/^(el|la|los|las|un|una)\s+/, '').trim() === normalized
  );
}
