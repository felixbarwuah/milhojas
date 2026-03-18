import { useState, useEffect } from 'react';
import { facts, factCategoryLabels, factCategoryColors, type Fact, type FactCategory } from '../data/facts';
import { addXP } from '../data/srs';
import ErrorBoundary from './ErrorBoundary';

type State = 'config' | 'reading' | 'question' | 'result' | 'summary';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FactsQuiz() {
  const [state, setState] = useState<State>('config');
  const [selectedCats, setSelectedCats] = useState<Set<FactCategory>>(new Set());
  const [items, setItems] = useState<Fact[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showCats, setShowCats] = useState(false);

  const categories = Object.keys(factCategoryLabels) as FactCategory[];

  const start = () => {
    let pool = [...facts];
    if (selectedCats.size > 0) pool = pool.filter(f => selectedCats.has(f.category));
    setItems(shuffle(pool).slice(0, 10));
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setState('reading');
  };

  const answer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === items[current].correctIndex;
    setAnswers(prev => [...prev, correct]);
    if (correct) addXP(8);
    setState('result');
  };

  const next = () => {
    if (current + 1 >= items.length) { setState('summary'); return; }
    setCurrent(prev => prev + 1);
    setSelected(null);
    setState('reading');
  };

  const fact = items[current];

  if (state === 'config') {
    return (
      <ErrorBoundary><div className="quiz-config">
        <div className="config-section">
          <button className="category-toggle" onClick={() => setShowCats(!showCats)}>
            <h3 className="config-title" style={{ margin: 0 }}>
              Themen <span className="config-hint">{selectedCats.size > 0 ? `(${selectedCats.size} gewählt)` : '(alle)'}</span>
            </h3>
            <span className={`category-arrow ${showCats ? 'open' : ''}`}>▾</span>
          </button>
          {showCats && (
            <div className="category-grid" style={{ marginTop: '12px' }}>
              {categories.map(cat => (
                <button key={cat}
                  className={`category-chip ${selectedCats.has(cat) ? 'selected' : ''}`}
                  style={{ '--cat-color': factCategoryColors[cat], borderColor: selectedCats.has(cat) ? factCategoryColors[cat] : undefined, background: selectedCats.has(cat) ? `${factCategoryColors[cat]}10` : undefined } as React.CSSProperties}
                  onClick={() => { const n = new Set(selectedCats); n.has(cat) ? n.delete(cat) : n.add(cat); setSelectedCats(n); }}
                >{factCategoryLabels[cat]}</button>
              ))}
            </div>
          )}
        </div>
        <button className="btn btn-primary start-btn" onClick={start}>Fakten-Quiz starten</button>
      </div></ErrorBoundary>
    );
  }

  if (state === 'summary') {
    const correct = answers.filter(Boolean).length;
    return (
      <ErrorBoundary><div className="quiz-summary">
        <div className="summary-score-ring">
          <span className="summary-pct">{Math.round((correct / items.length) * 100)}%</span>
          <span className="summary-label">richtig</span>
        </div>
        <div className="summary-stats">
          <div className="stat"><span className="stat-value">{correct}/{items.length}</span><span className="stat-label">Richtig</span></div>
          <div className="stat"><span className="stat-value">+{correct * 8}</span><span className="stat-label">XP</span></div>
        </div>
        <button className="btn btn-primary" onClick={() => setState('config')}>Nochmal</button>
      </div></ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary><div className="quiz-play">
      <div className="quiz-header">
        <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${((current + 1) / items.length) * 100}%` }} /></div>
        <div className="quiz-meta">
          <span className="label">{current + 1} / {items.length}</span>
          <span className="label" style={{ color: factCategoryColors[fact.category] }}>{factCategoryLabels[fact.category]}</span>
        </div>
      </div>

      {state === 'reading' && (
        <div className="question-card">
          <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>{fact.text}</p>
          <button className="btn btn-primary" style={{ marginTop: 'var(--space-lg)' }} onClick={() => setState('question')}>Zur Frage</button>
        </div>
      )}

      {(state === 'question' || state === 'result') && (
        <>
          <div className="question-card">
            <h2 className="question-word" style={{ fontSize: '20px' }}>{fact.question}</h2>
          </div>
          <div className="options-grid">
            {fact.options.map((opt, i) => {
              let cls = 'option-btn';
              if (selected !== null) {
                if (i === fact.correctIndex) cls += ' correct';
                else if (i === selected) cls += ' wrong';
                else cls += ' dimmed';
              }
              return (
                <button key={i} className={cls} onClick={() => answer(i)} disabled={selected !== null}>
                  <span className="option-key">{i + 1}</span>
                  <span className="option-text">{opt}</span>
                </button>
              );
            })}
          </div>
          {state === 'result' && (
            <div className="result-bar">
              <span className={selected === fact.correctIndex ? 'result-correct' : 'result-wrong'}>
                {selected === fact.correctIndex ? 'Richtig!' : 'Falsch'}
              </span>
              <button className="btn" onClick={next}>Weiter →</button>
            </div>
          )}
          {state === 'result' && (
            <p style={{ marginTop: 'var(--space-md)', fontSize: '14px', color: 'var(--text-muted)', maxWidth: '600px', margin: 'var(--space-md) auto 0', padding: '0 var(--space-lg)' }}>{fact.explanation}</p>
          )}
        </>
      )}
    </div></ErrorBoundary>
  );
}
