import { useState, useEffect, useRef } from 'react';
import { vocab, categoryLabels, categoryColors, type VocabWord, type VocabCategory } from '../data/vocab';
import SpeakButton from './SpeakButton';
import {
  loadSRS, saveSRS, startSession, getDueCards,
  recordCorrect, recordWrong, loadXP, addXP,
} from '../data/srs';

type GameState = 'config' | 'playing' | 'result' | 'summary';
type Direction = 'es-de' | 'de-es';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(s: string): string {
  return s.trim().toLowerCase()
    .replace(/^(der|die|das|el|la|los|las|un|una)\s+/i, '')
    .replace(/\s+/g, ' ');
}

export default function WriteMode() {
  const [state, setState] = useState<GameState>('config');
  const [direction, setDirection] = useState<Direction>('es-de');
  const [selectedCategories, setSelectedCategories] = useState<Set<VocabCategory>>(new Set());
  const [cards, setCards] = useState<VocabWord[]>([]);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');
  const [results, setResults] = useState<{ word: VocabWord; given: string; correct: boolean }[]>([]);
  const [srs, setSrs] = useState(loadSRS());
  const [sessionXP, setSessionXP] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = Object.keys(categoryLabels) as VocabCategory[];

  const toggleCategory = (cat: VocabCategory) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      return next;
    });
  };

  const startGame = () => {
    let pool = [...vocab];
    if (selectedCategories.size > 0) {
      pool = pool.filter(w => selectedCategories.has(w.category));
    }
    // Filter out phrases for write mode (too long)
    pool = pool.filter(w => w.category !== 'frases');
    if (pool.length < 4) return;

    const newSrs = startSession(srs);
    setSrs(newSrs);
    saveSRS(newSrs);

    const cardIds = pool.map(w => `vocab:${w.id}`);
    const sorted = getDueCards(newSrs, cardIds);
    const selectedIds = sorted.slice(0, 15);
    const selectedWords = selectedIds
      .map(id => pool.find(w => `vocab:${w.id}` === id))
      .filter(Boolean) as VocabWord[];

    setCards(selectedWords);
    setCurrent(0);
    setInput('');
    setResults([]);
    setSessionXP(0);
    setShowResult(false);
    setState('playing');
  };

  const checkAnswer = () => {
    if (showResult || !input.trim()) return;
    const word = cards[current];
    const isEsToDe = direction === 'es-de';
    const correctFull = isEsToDe ? word.de : word.es;
    const userNorm = normalize(input);
    const correctNorm = normalize(correctFull);

    // Also accept without article
    const correct = userNorm === correctNorm
      || userNorm === correctFull.trim().toLowerCase();

    const cardId = `vocab:${word.id}`;
    let newSrs = correct ? recordCorrect(srs, cardId) : recordWrong(srs, cardId);
    setSrs(newSrs);
    saveSRS(newSrs);

    if (correct) {
      const earned = 10;
      setSessionXP(prev => prev + earned);
      addXP(earned);
    }

    setResults(prev => [...prev, { word, given: input.trim(), correct }]);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (current + 1 >= cards.length) {
      setState('summary');
    } else {
      setCurrent(prev => prev + 1);
      setInput('');
      setShowResult(false);
      setState('playing');
    }
  };

  useEffect(() => {
    if (state === 'playing' && !showResult && inputRef.current) {
      inputRef.current.focus();
    }
  }, [state, showResult, current]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (showResult) nextQuestion();
      else checkAnswer();
    }
  };

  const [showCategories, setShowCategories] = useState(false);

  const categoryDE: Record<string, string> = {
    comida: 'Essen & Trinken', viaje: 'Reise & Transport', casa: 'Haus & Wohnung',
    trabajo: 'Arbeit & Büro', naturaleza: 'Natur', cuerpo: 'Körper & Gesundheit',
    ropa: 'Kleidung', ciudad: 'Stadt & Orte', familia: 'Familie & Personen',
    tiempo: 'Wetter & Klima', frases: 'Alltagssätze', verbos: 'Wichtige Verben', custom: 'Meine Wörter',
  };

  if (state === 'config') {
    return (
      <div className="quiz-config">
        <div className="config-section">
          <h3 className="config-title">Richtung</h3>
          <div className="direction-toggle">
            <button
              className={`toggle-btn flag-btn ${direction === 'es-de' ? 'active' : ''}`}
              onClick={() => setDirection('es-de')}
            >
              🇪🇸 → 🇩🇪
            </button>
            <button
              className={`toggle-btn flag-btn ${direction === 'de-es' ? 'active' : ''}`}
              onClick={() => setDirection('de-es')}
            >
              🇩🇪 → 🇪🇸
            </button>
          </div>
        </div>

        <div className="config-section">
          <button className="category-toggle" onClick={() => setShowCategories(!showCategories)}>
            <h3 className="config-title" style={{ margin: 0 }}>
              Kategorien
              <span className="config-hint">
                {selectedCategories.size > 0 ? `(${selectedCategories.size} gewählt)` : '(alle)'}
              </span>
            </h3>
            <span className={`category-arrow ${showCategories ? 'open' : ''}`}>▾</span>
          </button>
          {showCategories && (
            <div className="category-grid" style={{ marginTop: '12px' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`category-chip ${selectedCategories.has(cat) ? 'selected' : ''}`}
                  style={{
                    '--cat-color': categoryColors[cat],
                    borderColor: selectedCategories.has(cat) ? categoryColors[cat] : undefined,
                    background: selectedCategories.has(cat) ? `${categoryColors[cat]}10` : undefined,
                  } as React.CSSProperties}
                  onClick={() => toggleCategory(cat)}
                >
                  {categoryDE[cat] || categoryLabels[cat]}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="btn btn-primary start-btn" onClick={startGame}>
          Schreib-Modus starten
        </button>
      </div>
    );
  }

  if (state === 'summary') {
    const correctCount = results.filter(r => r.correct).length;
    const pct = Math.round((correctCount / results.length) * 100);
    return (
      <div className="quiz-summary">
        <div className="summary-score-ring">
          <span className="summary-pct">{pct}%</span>
          <span className="summary-label">richtig</span>
        </div>
        <div className="summary-stats">
          <div className="stat">
            <span className="stat-value">{correctCount}/{results.length}</span>
            <span className="stat-label">Richtig</span>
          </div>
          <div className="stat">
            <span className="stat-value">+{sessionXP}</span>
            <span className="stat-label">XP</span>
          </div>
        </div>
        <div className="summary-words">
          {results.map((r, i) => (
            <div key={r.word.id} className={`summary-word ${r.correct ? 'correct' : 'wrong'}`}>
              <span className="summary-indicator">{r.correct ? '✓' : '✗'}</span>
              <span className="summary-es">{r.word.es}</span>
              <span className="summary-de">
                {r.correct ? r.word.de : (
                  <>{r.given} <span className="correction">→ {direction === 'es-de' ? r.word.de : r.word.es}</span></>
                )}
              </span>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setState('config')}>
          Nochmal
        </button>
      </div>
    );
  }

  const word = cards[current];
  const isEsToDe = direction === 'es-de';
  const prompt = isEsToDe ? word.es : word.de;
  const correctAnswer = isEsToDe ? word.de : word.es;
  const lastResult = results[results.length - 1];

  return (
    <div className="quiz-play">
      <div className="quiz-header">
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${((current + (showResult ? 1 : 0)) / cards.length) * 100}%` }} />
        </div>
        <div className="quiz-meta">
          <span className="label">{current + 1} / {cards.length}</span>
          <span className="label">+{sessionXP} XP</span>
        </div>
      </div>

      <div className="question-card">
        <span className="label" style={{ color: categoryColors[word.category] }}>
          {isEsToDe ? 'Übersetze ins Deutsche' : 'Übersetze ins Spanische'}
        </span>
        <h2 className="question-word">{prompt}</h2>
        {isEsToDe && <SpeakButton text={word.es} />}
      </div>

      <div className="conjugation-input-area">
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className={`conjugation-input ${showResult ? (lastResult?.correct ? 'input-correct' : 'input-wrong') : ''}`}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isEsToDe ? 'Deutsche Übersetzung...' : 'Traduccion en español...'}
            disabled={showResult}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {!showResult && (
            <button className="btn btn-primary check-btn" onClick={checkAnswer} disabled={!input.trim()}>
              Prüfen
            </button>
          )}
        </div>

        {showResult && (
          <div className="result-bar">
            <span className={lastResult?.correct ? 'result-correct' : 'result-wrong'}>
              {lastResult?.correct ? 'Richtig!' : (
                <>Falsch - <strong>{correctAnswer}</strong></>
              )}
            </span>
            <button className="btn" onClick={nextQuestion}>
              Weiter →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
