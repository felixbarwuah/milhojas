import { useState } from 'react';
import { grammar, topicLabels, topicColors, type GrammarLesson, type GrammarTopic } from '../data/grammar';
import { addXP } from '../data/srs';

type State = 'topics' | 'lesson' | 'exercise' | 'result' | 'summary';

export default function GrammarQuiz() {
  const [state, setState] = useState<State>('topics');
  const [lesson, setLesson] = useState<GrammarLesson | null>(null);
  const [exIdx, setExIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const topics = [...new Set(grammar.map(g => g.topic))] as GrammarTopic[];

  const selectLesson = (l: GrammarLesson) => {
    setLesson(l);
    setExIdx(0);
    setSelected(null);
    setAnswers([]);
    setState('lesson');
  };

  const answer = (idx: number) => {
    if (selected !== null || !lesson) return;
    setSelected(idx);
    const correct = idx === lesson.exercises[exIdx].correctIndex;
    setAnswers(prev => [...prev, correct]);
    if (correct) addXP(10);
    setState('result');
  };

  const next = () => {
    if (!lesson) return;
    if (exIdx + 1 >= lesson.exercises.length) { setState('summary'); return; }
    setExIdx(prev => prev + 1);
    setSelected(null);
    setState('exercise');
  };

  // Topic selection
  if (state === 'topics') {
    return (
      <div className="quiz-config">
        <div className="grammar-topics">
          {grammar.map(l => (
            <button key={l.id} className="card grammar-topic-card" onClick={() => selectLesson(l)}>
              <div className="grammar-topic-header">
                <span className="grammar-level" data-level={l.level}>{l.level}</span>
                <span className="label" style={{ color: topicColors[l.topic] }}>{topicLabels[l.topic]}</span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{l.title}</h3>
              <span className="mode-cta">{l.exercises.length} Übungen</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!lesson) return null;

  // Lesson explanation
  if (state === 'lesson') {
    return (
      <div className="quiz-play">
        <div className="question-card grammar-lesson">
          <span className="label" style={{ color: topicColors[lesson.topic] }}>{topicLabels[lesson.topic]}</span>
          <h2 style={{ fontSize: '22px', margin: 'var(--space-sm) 0 var(--space-lg)' }}>{lesson.title}</h2>
          <div className="grammar-explanation">
            {lesson.explanation.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} style={{ fontWeight: 700, marginTop: 'var(--space-md)' }}>{line.replace(/\*\*/g, '')}</p>;
              }
              if (line.startsWith('- ')) {
                return <p key={i} style={{ paddingLeft: '16px', color: 'var(--text-secondary)' }}>{line}</p>;
              }
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>{line.replace(/\*\*/g, '')}</p>;
            })}
          </div>
          <button className="btn btn-primary" style={{ marginTop: 'var(--space-xl)', width: '100%', justifyContent: 'center' }} onClick={() => setState('exercise')}>
            Übungen starten ({lesson.exercises.length})
          </button>
        </div>
      </div>
    );
  }

  // Summary
  if (state === 'summary') {
    const correct = answers.filter(Boolean).length;
    return (
      <div className="quiz-summary">
        <div className="summary-score-ring">
          <span className="summary-pct">{Math.round((correct / lesson.exercises.length) * 100)}%</span>
          <span className="summary-label">richtig</span>
        </div>
        <div className="summary-stats">
          <div className="stat"><span className="stat-value">{correct}/{lesson.exercises.length}</span><span className="stat-label">Richtig</span></div>
          <div className="stat"><span className="stat-value">+{correct * 10}</span><span className="stat-label">XP</span></div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
          <button className="btn" onClick={() => { selectLesson(lesson); }}>Nochmal</button>
          <button className="btn btn-primary" onClick={() => setState('topics')}>Andere Lektion</button>
        </div>
      </div>
    );
  }

  // Exercise
  const ex = lesson.exercises[exIdx];

  return (
    <div className="quiz-play">
      <div className="quiz-header">
        <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${((exIdx + 1) / lesson.exercises.length) * 100}%`, background: topicColors[lesson.topic] }} /></div>
        <div className="quiz-meta">
          <span className="label">{exIdx + 1} / {lesson.exercises.length}</span>
          <span className="label" style={{ color: topicColors[lesson.topic] }}>{lesson.title}</span>
        </div>
      </div>

      <div className="question-card">
        <h2 className="question-word" style={{ fontSize: '20px' }}>{ex.question}</h2>
      </div>

      <div className="options-grid">
        {ex.options.map((opt, i) => {
          let cls = 'option-btn';
          if (selected !== null) {
            if (i === ex.correctIndex) cls += ' correct';
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
        <>
          <div className="result-bar">
            <span className={selected === ex.correctIndex ? 'result-correct' : 'result-wrong'}>
              {selected === ex.correctIndex ? 'Richtig!' : 'Falsch'}
            </span>
            <button className="btn" onClick={next}>Weiter →</button>
          </div>
          <p style={{ marginTop: 'var(--space-md)', fontSize: '14px', color: 'var(--text-muted)', maxWidth: '600px', margin: 'var(--space-md) auto 0', padding: '0 var(--space-lg)' }}>{ex.explanation}</p>
        </>
      )}
    </div>
  );
}
