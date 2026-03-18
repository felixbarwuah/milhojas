/**
 * Wiktionary API client for Spanish word lookups
 * Uses es.wiktionary.org - excellent Spanish coverage (100k+ words)
 */

const API_BASE = 'https://es.wiktionary.org/w/api.php';

export interface DictionaryEntry {
  word: string;
  partOfSpeech?: string;
  definitions: string[];
  synonyms?: string[];
  etymology?: string;
}

/** Parse Wiktionary plaintext extract to get Spanish definitions */
function parseWiktionaryExtract(word: string, extract: string): DictionaryEntry | null {
  // Find the "Español" section
  const esMatch = extract.match(/== Español ==\n([\s\S]*?)(?=\n== [A-Z]|\n== $|$)/);
  if (!esMatch) return null;

  const esSection = esMatch[1];

  // Extract part of speech
  const posMatch = esSection.match(/==== (Sustantivo|Verbo|Adjetivo|Adverbio|Pronombre|Preposición|Conjunción|Interjección)[^=]*====/);
  const partOfSpeech = posMatch ? posMatch[1] : undefined;

  // Extract numbered definitions
  const definitions: string[] = [];
  const defRegex = /^\d+\s+(?:[A-ZÁ-Ú][a-záéíóúñü]*\n)?(.+)/gm;
  let match;
  while ((match = defRegex.exec(esSection)) !== null) {
    const def = match[1].trim();
    if (def && def.length > 2 && !def.startsWith('Uso:') && !def.startsWith('Ejemplo:')) {
      definitions.push(def);
    }
    if (definitions.length >= 4) break;
  }

  // Fallback: try to get lines after "Sustantivo/Verbo" heading that look like definitions
  if (definitions.length === 0) {
    const lines = esSection.split('\n');
    for (const line of lines) {
      const cleaned = line.trim();
      if (cleaned.match(/^\d+\s/) || cleaned.match(/^[A-ZÁÉÍÓÚ]/)) {
        const defText = cleaned.replace(/^\d+\s*/, '').trim();
        if (defText.length > 3 && !defText.startsWith('=') && !defText.startsWith('Del ') && !defText.startsWith('Sinónimo')) {
          definitions.push(defText);
          if (definitions.length >= 4) break;
        }
      }
    }
  }

  // Extract synonyms
  const synMatch = esSection.match(/Sinónimos?:\s*([^\n]+)/);
  const synonyms = synMatch
    ? synMatch[1].split(',').map(s => s.trim()).filter(Boolean).slice(0, 5)
    : undefined;

  // Extract etymology (first sentence only)
  const etymMatch = esSection.match(/=== Etimología[^=]*===\n([^\n]+)/);
  const etymology = etymMatch ? etymMatch[1].trim() : undefined;

  if (definitions.length === 0 && !partOfSpeech) return null;

  return {
    word,
    partOfSpeech,
    definitions: definitions.length > 0 ? definitions : ['(Definition auf Wiktionary verfügbar)'],
    synonyms: synonyms && synonyms.length > 0 ? synonyms : undefined,
    etymology,
  };
}

export async function lookupWord(word: string): Promise<DictionaryEntry | null> {
  try {
    const clean = word.toLowerCase().trim();
    const url = `${API_BASE}?action=query&titles=${encodeURIComponent(clean)}&prop=extracts&explaintext=1&format=json&origin=*`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Milhojas/1.0 (Spanish learning app)' },
    });
    if (!res.ok) return null;

    const data = await res.json();
    const pages = data?.query?.pages;
    if (!pages) return null;

    const page = Object.values(pages)[0] as { extract?: string; missing?: boolean };
    if (!page.extract || page.missing) return null;

    return parseWiktionaryExtract(clean, page.extract);
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

  return [...new Set(words)];
}

export function cleanWord(word: string): string {
  return word.replace(/[.,;:!?¡¿"'()\[\]{}\-]/g, '').toLowerCase().trim();
}
