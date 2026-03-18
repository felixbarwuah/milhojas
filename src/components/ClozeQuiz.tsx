import { useState } from 'react';
import { cloze, type ClozeExercise } from '../data/cloze';
import { addXP } from '../data/srs';
import SpeakButton from './SpeakButton';
import ErrorBoundary from './ErrorBoundary';

type State = 'config' | 'playing' | 'result' | 'summary';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ClozeQuiz() {
  const [state, setState] = useState<State>('config');
  const [level, setLevel] = useState<'all' | 'A1' | 'A2'>('all');
  const [items, setItems] = useState<ClozeExercise[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const start = () => {
    let pool = [...cloze];
    if (level !== 'all') pool = pool.filter(c => c.level === level);
    setItems(shuffle(pool).slice(0, 12));
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setState('playing');
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
    setState('playing');
  };

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
        <button className="btn btn-primary start-btn" onClick={start}>Lückentext starten</button>
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
        <div className="summary-words">
          {items.map((item, i) => (
            <div key={item.id} className={`summary-word ${answers[i] ? 'correct' : 'wrong'}`}>
              <span className="summary-indicator">{answers[i] ? '✓' : '✗'}</span>
              <span className="summary-es">{item.sentence.replace('___', item.answer)}</span>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setState('config')}>Nochmal</button>
      </div></ErrorBoundary>
    );
  }

  const item = items[current];
  const parts = item.sentence.split('___');
  const fullSentence = item.sentence.replace('___', item.answer);

  return (
    <ErrorBoundary><div className="quiz-play">
      <div className="quiz-header">
        <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${((current + 1) / items.length) * 100}%` }} /></div>
        <div className="quiz-meta">
          <span className="label">{current + 1} / {items.length}</span>
          <span className="label" style={{ color: item.level === 'A1' ? 'var(--correct)' : 'var(--accent-blue)' }}>{item.topic}</span>
        </div>
      </div>

      <div className="question-card">
        <p className="cloze-sentence">
          {parts[0]}<span className={`cloze-blank ${selected !== null ? 'filled' : ''}`}>
            {selected !== null ? item.options[selected] : '______'}
          </span>{parts[1]}
        </p>
        {state === 'result' && (
          <div className="cloze-feedback">
            <SpeakButton text={fullSentence} />
            <p className="cloze-translation">{item.translation}</p>
          </div>
        )}
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
            {selected === item.correctIndex ? 'Richtig!' : `→ ${item.answer}`}
          </span>
          <button className="btn" onClick={next}>Weiter →</button>
        </div>
      )}
    </div></ErrorBoundary>
  );
}
