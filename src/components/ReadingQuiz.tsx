import { useState } from 'react';
import { readings, type ReadingExercise } from '../data/reading';
import { addXP } from '../data/srs';
import SpeakButton from './SpeakButton';
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

export default function ReadingQuiz() {
  const [state, setState] = useState<State>('config');
  const [level, setLevel] = useState<'all' | 'A1' | 'A2'>('all');
  const [items, setItems] = useState<ReadingExercise[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const start = () => {
    let pool = [...readings];
    if (level !== 'all') pool = pool.filter(r => r.level === level);
    setItems(shuffle(pool).slice(0, 8));
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
    if (correct) addXP(12);
    setState('result');
  };

  const next = () => {
    if (current + 1 >= items.length) { setState('summary'); return; }
    setCurrent(prev => prev + 1);
    setSelected(null);
    setState('reading');
  };

  const item = items[current];

  if (state === 'config') {
    return (
      <ErrorBoundary><div className="quiz-config">
        <div className="config-section">
          <h3 className="config-title">Niveau</h3>
          <div className="direction-toggle">
            {(['all', 'A1', 'A2'] as const).map(l => (
              <button key={l} className={`toggle-btn ${level === l ? 'active' : ''}`} onClick={() => setLevel(l)}>
                {l === 'all' ? 'Alle' : l}
              </button>
            ))}
          </div>
        </div>
        <button className="btn btn-primary start-btn" onClick={start}>Lesen starten</button>
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
          <div className="stat"><span className="stat-value">+{correct * 12}</span><span className="stat-label">XP</span></div>
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
          <span className="label" style={{ color: item.level === 'A1' ? 'var(--correct)' : 'var(--accent-blue)' }}>{item.level}</span>
        </div>
      </div>

      {state === 'reading' && (
        <div className="question-card reading-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)' }}>
            <span className="label">{item.title}</span>
            <SpeakButton text={item.text} />
          </div>
          <p className="reading-text">{item.text}</p>
          <button className="btn btn-primary" style={{ marginTop: 'var(--space-lg)' }} onClick={() => setState('question')}>Zur Frage</button>
        </div>
      )}

      {(state === 'question' || state === 'result') && (
        <>
          <div className="question-card reading-card" style={{ marginBottom: 'var(--space-md)' }}>
            <span className="label">{item.title}</span>
            <p className="reading-text" style={{ marginTop: 'var(--space-sm)', fontSize: '15px', color: 'var(--text-muted)' }}>{item.text}</p>
          </div>
          <div className="question-card">
            <h2 className="question-word" style={{ fontSize: '18px' }}>{item.question}</h2>
          </div>
          <div className="options-grid">
            {item.options.map((opt, i) => {
              let cls = 'option-btn';
              if (selected !== null) {
                if (i === item.correctIndex) cls += ' correct';
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
              <span className={selected === item.correctIndex ? 'result-correct' : 'result-wrong'}>
                {selected === item.correctIndex ? 'Richtig!' : `${item.options[item.correctIndex]}`}
              </span>
              <button className="btn" onClick={next}>Weiter →</button>
            </div>
          )}
        </>
      )}
    </div></ErrorBoundary>
  );
}
