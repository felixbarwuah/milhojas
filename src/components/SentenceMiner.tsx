import { useState, useRef } from 'react';
import { getAllVocab, type VocabWord } from '../data/vocab';
import { lookupWord, tokenize, cleanWord, type DictionaryEntry } from '../data/dictionary';
import { saveCustomWord } from '../data/custom-vocab';
import { loadSRS, saveSRS } from '../data/srs';
import { speak, isTTSSupported } from '../data/speech';

type ViewState = 'input' | 'analysis';

export default function SentenceMiner() {
  const [view, setView] = useState<ViewState>('input');
  const [text, setText] = useState('');
  const [tokens, setTokens] = useState<string[]>([]);
  const [originalText, setOriginalText] = useState('');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [deInput, setDeInput] = useState('');
  const [addedWords, setAddedWords] = useState<VocabWord[]>([]);
  const [knownWords, setKnownWords] = useState<Set<string>>(new Set());
  const deInputRef = useRef<HTMLInputElement>(null);

  const analyze = () => {
    if (!text.trim()) return;
    setOriginalText(text.trim());
    const t = tokenize(text);
    setTokens(t);

    // Check which words are already known
    const allVocab = getAllVocab();
    const known = new Set<string>();
    for (const token of t) {
      const isKnown = allVocab.some(w => {
        const clean = w.es.toLowerCase().replace(/^(el|la|los|las|un|una)\s+/, '').trim();
        return clean === token || w.es.toLowerCase().trim() === token;
      });
      if (isKnown) known.add(token);
    }
    setKnownWords(known);
    setSelectedWord(null);
    setEntry(null);
    setNotFound(false);
    setView('analysis');
  };

  const handleTokenClick = async (word: string) => {
    if (knownWords.has(word) && word === selectedWord) {
      setSelectedWord(null);
      return;
    }
    setSelectedWord(word);
    setEntry(null);
    setNotFound(false);
    setDeInput('');
    setLoading(true);

    const result = await lookupWord(word);
    setLoading(false);
    if (result) {
      setEntry(result);
    } else {
      setNotFound(true);
    }
    setTimeout(() => deInputRef.current?.focus(), 100);
  };

  const addWord = () => {
    if (!selectedWord || !deInput.trim()) return;

    const newWord = saveCustomWord({
      es: selectedWord,
      de: deInput.trim(),
      difficulty: 'medium',
      example: entry?.definitions[0],
    });

    // Register in SRS
    const srs = loadSRS();
    saveSRS(srs); // getCardState will auto-create on next access

    setAddedWords(prev => [...prev, newWord]);
    setKnownWords(prev => new Set([...prev, selectedWord!]));
    setSelectedWord(null);
    setEntry(null);
    setNotFound(false);
    setDeInput('');
  };

  if (view === 'input') {
    return (
      <div className="miner-input">
        <textarea
          className="miner-textarea"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Spanischen Text hier einfügen... (z.B. einen Songtext, Nachrichtenartikel, oder Dialog)"
          rows={8}
        />
        <button
          className="btn btn-primary start-btn"
          onClick={analyze}
          disabled={!text.trim()}
        >
          Text analysieren
        </button>
        {addedWords.length > 0 && (
          <div className="miner-added-summary">
            <p className="label">{addedWords.length} Wörter in dieser Session hinzugefügt</p>
          </div>
        )}
      </div>
    );
  }

  // Analysis view
  const words = originalText.split(/(\s+|[.,;:!?¡¿"'()\[\]{}\-\n])/);

  return (
    <div className="miner-container">
      <div className="miner-text">
        {words.map((w, i) => {
          const clean = cleanWord(w);
          if (!clean || clean.length <= 1) {
            return <span key={i}>{w}</span>;
          }
          const isKnown = knownWords.has(clean);
          const isSelected = selectedWord === clean;
          return (
            <span
              key={i}
              className={`miner-token ${isKnown ? 'known' : ''} ${isSelected ? 'selected' : ''}`}
              onClick={() => handleTokenClick(clean)}
            >
              {w}
            </span>
          );
        })}
      </div>

      {loading && (
        <div className="word-detail">
          <p className="label">Suche...</p>
        </div>
      )}

      {selectedWord && (entry || notFound) && (
        <div className="word-detail">
          <div className="word-detail-header">
            <h3>{selectedWord}</h3>
            {entry?.partOfSpeech && <span className="word-phonetic">{entry.partOfSpeech}</span>}
            <div className="word-detail-actions">
              {isTTSSupported() && (
                <button className="speak-btn" onClick={() => speak(selectedWord)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                </button>
              )}
            </div>
          </div>

          {entry && (
            <div className="word-meanings">
              {entry.definitions.map((def, i) => (
                <p key={i} className="word-def">{i + 1}. {def}</p>
              ))}
              {entry.synonyms && entry.synonyms.length > 0 && (
                <p className="word-synonyms">
                  <span className="word-pos">Synonyme:</span> {entry.synonyms.join(', ')}
                </p>
              )}
              {entry.etymology && (
                <p className="word-etymology">{entry.etymology}</p>
              )}
            </div>
          )}

          {notFound && (
            <p className="word-not-found">Kein Wörterbucheintrag gefunden. Du kannst das Wort manuell hinzufügen.</p>
          )}

          {!knownWords.has(selectedWord) && (
            <div className="add-word-form">
              <input
                ref={deInputRef}
                type="text"
                className="add-word-input"
                value={deInput}
                onChange={e => setDeInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addWord()}
                placeholder="Deutsche Übersetzung..."
                autoComplete="off"
              />
              <button
                className="btn btn-primary"
                onClick={addWord}
                disabled={!deInput.trim()}
              >
                Hinzufügen
              </button>
            </div>
          )}
        </div>
      )}

      {addedWords.length > 0 && (
        <div className="miner-added">
          <h3 className="config-title">Hinzugefügt ({addedWords.length})</h3>
          {addedWords.map(w => (
            <div key={w.id} className="summary-word correct">
              <span className="summary-indicator">+</span>
              <span className="summary-es">{w.es}</span>
              <span className="summary-de">{w.de}</span>
            </div>
          ))}
        </div>
      )}

      <div className="miner-actions">
        <button className="btn" onClick={() => { setView('input'); setSelectedWord(null); }}>
          Neuer Text
        </button>
      </div>
    </div>
  );
}
