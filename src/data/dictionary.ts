/**
 * Free Dictionary API client for Spanish word lookups
 * https://dictionaryapi.dev/
 */

const API_BASE = 'https://api.dictionaryapi.dev/api/v2/entries/es';

export interface DictionaryEntry {
  word: string;
  phonetic?: string;
  audioUrl?: string;
  meanings: {
    partOfSpeech: string;
    definitions: { definition: string; example?: string }[];
  }[];
}

export async function lookupWord(word: string): Promise<DictionaryEntry | null> {
  try {
    const res = await fetch(`${API_BASE}/${encodeURIComponent(word.toLowerCase().trim())}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const entry = data[0];
    const audioUrl = entry.phonetics?.find((p: { audio?: string }) => p.audio)?.audio || undefined;

    return {
      word: entry.word,
      phonetic: entry.phonetic || undefined,
      audioUrl,
      meanings: (entry.meanings || []).map((m: { partOfSpeech: string; definitions: { definition: string; example?: string }[] }) => ({
        partOfSpeech: m.partOfSpeech,
        definitions: (m.definitions || []).slice(0, 3).map((d: { definition: string; example?: string }) => ({
          definition: d.definition,
          example: d.example || undefined,
        })),
      })),
    };
  } catch {
    return null;
  }
}

const STOP_WORDS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
  'de', 'del', 'al', 'en', 'y', 'o', 'que', 'es', 'por',
  'con', 'para', 'a', 'se', 'no', 'lo', 'le', 'me', 'te',
  'su', 'mi', 'tu', 'nos', 'si', 'ya', 'muy', 'mas', 'pero',
  'como', 'este', 'esta', 'estos', 'estas', 'ese', 'esa',
]);

export function tokenize(text: string): string[] {
  const words = text
    .replace(/[.,;:!?¡¿"'()\[\]{}\-\n\r\t]/g, ' ')
    .split(/\s+/)
    .map(w => w.toLowerCase().trim())
    .filter(w => w.length > 1 && !STOP_WORDS.has(w));

  // Deduplicate while preserving order
  return [...new Set(words)];
}

export function cleanWord(word: string): string {
  return word.replace(/[.,;:!?¡¿"'()\[\]{}\-]/g, '').toLowerCase().trim();
}
