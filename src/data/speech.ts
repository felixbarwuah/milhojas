/**
 * Web Speech API utilities for pronunciation
 * - Text-to-Speech: play Spanish pronunciation (SpeechSynthesis)
 * - Speech-to-Text: listen to user speaking (SpeechRecognition, Chrome/Edge only)
 */

// ── Text-to-Speech ──

let cachedVoice: SpeechSynthesisVoice | null | undefined = undefined;

function findSpanishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;

  const voices = speechSynthesis.getVoices();
  // Priority: es-ES > es-MX > es-* > any Spanish
  const esES = voices.find(v => v.lang === 'es-ES');
  if (esES) return esES;
  const esMX = voices.find(v => v.lang === 'es-MX');
  if (esMX) return esMX;
  const esAny = voices.find(v => v.lang.startsWith('es'));
  if (esAny) return esAny;
  return null;
}

function getSpanishVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice !== undefined) return cachedVoice;
  cachedVoice = findSpanishVoice();
  return cachedVoice;
}

// Voices load asynchronously in some browsers
if (typeof window !== 'undefined' && window.speechSynthesis) {
  speechSynthesis.onvoiceschanged = () => {
    cachedVoice = findSpanishVoice();
  };
}

export function isTTSSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text: string, lang: string = 'es-ES'): void {
  if (!isTTSSupported()) return;

  // Cancel any ongoing speech
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9; // slightly slower for learners
  utterance.pitch = 1;

  const voice = getSpanishVoice();
  if (voice) utterance.voice = voice;

  speechSynthesis.speak(utterance);
}

// ── Speech-to-Text ──

function getSpeechRecognition(): (new () => any) | null {
  if (typeof window === 'undefined') return null;
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function isSTTSupported(): boolean {
  return getSpeechRecognition() !== null;
}

export interface ListenOptions {
  lang?: string;
  onResult: (transcript: string) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

export function startListening(options: ListenOptions): { stop: () => void } | null {
  const SpeechRecognitionClass = getSpeechRecognition();
  if (!SpeechRecognitionClass) return null;

  const recognition = new SpeechRecognitionClass();
  recognition.lang = options.lang || 'es-ES';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    const transcript = event.results?.[0]?.[0]?.transcript || '';
    options.onResult(transcript);
  };

  recognition.onerror = (event: any) => {
    options.onError?.(event.error || 'unknown');
  };

  recognition.onend = () => {
    options.onEnd?.();
  };

  recognition.start();

  return {
    stop: () => {
      try { recognition.stop(); } catch {}
    },
  };
}

// ── Comparison ──

function normalize(s: string): string {
  return s.trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9\s]/g, '') // remove punctuation
    .replace(/\s+/g, ' ');
}

export function comparePronunciation(expected: string, spoken: string): {
  match: boolean;
  similarity: number;
  expected: string;
  spoken: string;
} {
  const e = normalize(expected);
  const s = normalize(spoken);

  if (e === s) return { match: true, similarity: 1, expected: e, spoken: s };

  // Levenshtein distance
  const len1 = e.length;
  const len2 = s.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
    for (let j = 1; j <= len2; j++) {
      if (i === 0) { matrix[i][j] = j; continue; }
      const cost = e[i - 1] === s[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  const distance = matrix[len1][len2];
  const maxLen = Math.max(len1, len2);
  const similarity = maxLen === 0 ? 1 : 1 - distance / maxLen;

  return {
    match: similarity >= 0.8,
    similarity,
    expected: e,
    spoken: s,
  };
}
