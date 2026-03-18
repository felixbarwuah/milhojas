import { useState, useEffect, useCallback } from 'react';
import { vocab, categoryLabels, categoryColors, type VocabWord, type VocabCategory } from '../data/vocab';
import {
  loadSRS, saveSRS, startSession, getDueCards, getCardState,
  recordCorrect, recordWrong, getSRSStats, loadXP, addXP,
} from '../data/srs';

type GameState = 'config' | 'card-front' | 'card-back' | 'summary';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Flashcards() {
  const [state, setState] = useState<GameState>('config');
  const [selectedCategories, setSelectedCategories] = useState<Set<VocabCategory>>(new Set());
  const [cards, setCards] = useState<VocabWord[]>([]);
  const [current, setCurrent] = useState(0);
  const [results, setResults] = useState<{ word: VocabWord; knew: boolean }[]>([]);
  const [srs, setSrs] = useState(loadSRS());
  const [xp, setXp] = useState(loadXP());
  const [sessionXP, setSessionXP] = useState(0);

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
    if (pool.length < 2) return;

    const newSrs = startSession(srs);
    setSrs(newSrs);
    saveSRS(newSrs);

    const cardIds = pool.map(w => `vocab:${w.id}`);
    const sorted = getDueCards(newSrs, cardIds);
    const selectedIds = sorted.slice(0, 20);
    const selectedWords = selectedIds
      .map(id => pool.find(w => `vocab:${w.id}` === id))
      .filter(Boolean) as VocabWord[];

    setCards(selectedWords);
    setCurrent(0);
    setResults([]);
    setSessionXP(0);
    setState('card-front');
  };

  const handleKnew = (knew: boolean) => {
    const word = cards[current];
    const cardId = `vocab:${word.id}`;
    let newSrs = knew ? recordCorrect(srs, cardId) : recordWrong(srs, cardId);
    setSrs(newSrs);
    saveSRS(newSrs);

    if (knew) {
      const earned = 5;
      setSessionXP(prev => prev + earned);
      setXp(addXP(earned));
    }

    setResults(prev => [...prev, { word, knew }]);

    if (current + 1 >= cards.length) {
      setState('summary');
    } else {
      setCurrent(prev => prev + 1);
      setState('card-front');
    }
  };

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (state === 'card-front' && e.key === ' ') {
        e.preventDefault();
        setState('card-back');
      }
      if (state === 'card-back') {
        if (e.key === 'ArrowRight' || e.key === '1') handleKnew(true);
        if (e.key === 'ArrowLeft' || e.key === '2') handleKnew(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state, current, cards, srs]);

  const word = cards[current];
  const stats = getSRSStats(srs, vocab.map(w => `vocab:${w.id}`));

  if (state === 'config') {
    return (
      <div className="quiz-config">
        <div className="srs-overview">
          <div className="srs-boxes">
            <div className="srs-box" data-box="1">
              <span className="srs-box-count">{stats.box1}</span>
              <span className="srs-box-label">Neu</span>
            </div>
            <div className="srs-box" data-box="2">
              <span className="srs-box-count">{stats.box2}</span>
              <span className="srs-box-label">Box 2</span>
            </div>
            <div className="srs-box" data-box="3">
              <span className="srs-box-count">{stats.box3}</span>
              <span className="srs-box-label">Box 3</span>
            </div>
            <div className="srs-box" data-box="4">
              <span className="srs-box-count">{stats.box4}</span>
              <span className="srs-box-label">Box 4</span>
            </div>
            <div className="srs-box" data-box="5">
              <span className="srs-box-count">{stats.box5}</span>
              <span className="srs-box-label">Gelernt</span>
            </div>
          </div>
          {stats.unseen > 0 && (
            <p className="srs-unseen">{stats.unseen} neue Wörter noch nicht gesehen</p>
          )}
        </div>

        <div className="config-section">
          <h3 className="config-title">Kategorien <span className="config-hint">(leer = alle)</span></h3>
          <div className="category-grid">
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
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        <button className="btn btn-primary start-btn" onClick={startGame}>
          Karteikarten starten
        </button>
      </div>
    );
  }

  if (state === 'summary') {
    const knewCount = results.filter(r => r.knew).length;
    const pct = Math.round((knewCount / results.length) * 100);
    return (
      <div className="quiz-summary">
        <div className="summary-score-ring">
          <span className="summary-pct">{pct}%</span>
          <span className="summary-label">gewusst</span>
        </div>
        <div className="summary-stats">
          <div className="stat">
            <span className="stat-value">{knewCount}/{results.length}</span>
            <span className="stat-label">Gewusst</span>
          </div>
          <div className="stat">
            <span className="stat-value">+{sessionXP}</span>
            <span className="stat-label">XP</span>
          </div>
        </div>
        <div className="summary-words">
          {results.map((r, i) => (
            <div key={r.word.id} className={`summary-word ${r.knew ? 'correct' : 'wrong'}`}>
              <span className="summary-indicator">{r.knew ? '✓' : '✗'}</span>
              <span className="summary-es">{r.word.es}</span>
              <span className="summary-de">{r.word.de}</span>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setState('config')}>
          Nochmal
        </button>
      </div>
    );
  }

  // Card view
  const cardState = getCardState(srs, `vocab:${word.id}`);
  const boxLabel = ['', 'Neu', 'Bekannt', 'Vertraut', 'Sicher', 'Gelernt'][cardState.box];

  return (
    <div className="quiz-play">
      <div className="quiz-header">
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${((current + 1) / cards.length) * 100}%` }} />
        </div>
        <div className="quiz-meta">
          <span className="label">{current + 1} / {cards.length}</span>
          <span className="label" style={{ color: categoryColors[word.category] }}>{boxLabel}</span>
        </div>
      </div>

      <div
        className={`flashcard ${state === 'card-back' ? 'flipped' : ''}`}
        onClick={() => state === 'card-front' && setState('card-back')}
      >
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <span className="label" style={{ color: categoryColors[word.category] }}>
              {categoryLabels[word.category]}
            </span>
            <h2 className="flashcard-word">{word.es}</h2>
            <p className="flashcard-hint">Antippen zum Aufdecken</p>
          </div>
          <div className="flashcard-back">
            <span className="label" style={{ color: categoryColors[word.category] }}>
              {word.es}
            </span>
            <h2 className="flashcard-word">{word.de}</h2>
            {word.example && (
              <p className="question-example">"{word.example}"</p>
            )}
          </div>
        </div>
      </div>

      {state === 'card-back' && (
        <div className="flashcard-actions">
          <button className="flashcard-btn wrong-btn" onClick={() => handleKnew(false)}>
            <span className="flashcard-btn-icon">✗</span>
            <span>Nicht gewusst</span>
          </button>
          <button className="flashcard-btn correct-btn" onClick={() => handleKnew(true)}>
            <span className="flashcard-btn-icon">✓</span>
            <span>Gewusst</span>
          </button>
        </div>
      )}
    </div>
  );
}
