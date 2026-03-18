import { useState, useEffect, useCallback } from 'react';
import { vocab, categoryLabels, categoryColors, type VocabWord, type VocabCategory } from '../data/vocab';

type Direction = 'es-de' | 'de-es';
type GameState = 'config' | 'playing' | 'result' | 'summary';

interface QuizQuestion {
  word: VocabWord;
  options: string[];
  correctIndex: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestion(word: VocabWord, pool: VocabWord[], direction: Direction): QuizQuestion {
  const isEsToDe = direction === 'es-de';
  const correct = isEsToDe ? word.de : word.es;
  const distractors = shuffle(pool.filter(w => w.id !== word.id))
    .slice(0, 3)
    .map(w => isEsToDe ? w.de : w.es);
  const options = shuffle([correct, ...distractors]);
  return { word, options, correctIndex: options.indexOf(correct) };
}

function getHighScore(): number {
  try { return parseInt(localStorage.getItem('milhojas-vocab-highscore') || '0', 10); } catch { return 0; }
}
function saveHighScore(score: number) {
  try {
    const current = getHighScore();
    if (score > current) localStorage.setItem('milhojas-vocab-highscore', String(score));
  } catch {}
}

export default function VocabTrainer() {
  const [state, setState] = useState<GameState>('config');
  const [direction, setDirection] = useState<Direction>('es-de');
  const [selectedCategories, setSelectedCategories] = useState<Set<VocabCategory>>(new Set());
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => { setHighScore(getHighScore()); }, []);

  const categories = Object.keys(categoryLabels) as VocabCategory[];

  const toggleCategory = (cat: VocabCategory) => {
    setSelectedCategories(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const startGame = () => {
    let pool = [...vocab];
    if (selectedCategories.size > 0) {
      pool = pool.filter(w => selectedCategories.has(w.category));
    }
    if (difficulty !== 'all') {
      pool = pool.filter(w => w.difficulty === difficulty);
    }
    if (pool.length < 4) return;

    const selected = shuffle(pool).slice(0, Math.min(15, pool.length));
    const qs = selected.map(w => generateQuestion(w, pool, direction));
    setQuestions(qs);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setAnswers([]);
    setStartTime(Date.now());
    setState('playing');
  };

  const handleAnswer = useCallback((idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === questions[current].correctIndex;
    setAnswers(prev => [...prev, correct]);

    if (correct) {
      const timeBonus = Math.max(0, Math.floor((5000 - (Date.now() - startTime)) / 50));
      const streakBonus = streak * 5;
      setScore(prev => prev + 100 + timeBonus + streakBonus);
      setStreak(prev => {
        const next = prev + 1;
        setBestStreak(b => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
    }
    setState('result');
  }, [selected, questions, current, startTime, streak]);

  const nextQuestion = () => {
    if (current + 1 >= questions.length) {
      saveHighScore(score);
      setHighScore(Math.max(getHighScore(), score));
      setState('summary');
    } else {
      setCurrent(prev => prev + 1);
      setSelected(null);
      setStartTime(Date.now());
      setState('playing');
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (state === 'playing') {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 4) handleAnswer(num - 1);
      }
      if (state === 'result' && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        nextQuestion();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state, handleAnswer]);

  if (state === 'config') {
    return (
      <div className="quiz-config">
        {highScore > 0 && (
          <div className="config-highscore">
            <span className="label">Highscore</span>
            <span className="score">{highScore} pts</span>
          </div>
        )}

        <div className="config-section">
          <h3 className="config-title">Richtung</h3>
          <div className="direction-toggle">
            <button
              className={`toggle-btn ${direction === 'es-de' ? 'active' : ''}`}
              onClick={() => setDirection('es-de')}
            >
              ES → DE
            </button>
            <button
              className={`toggle-btn ${direction === 'de-es' ? 'active' : ''}`}
              onClick={() => setDirection('de-es')}
            >
              DE → ES
            </button>
          </div>
        </div>

        <div className="config-section">
          <h3 className="config-title">Schwierigkeit</h3>
          <div className="difficulty-toggle">
            {(['all', 'easy', 'medium', 'hard'] as const).map(d => (
              <button
                key={d}
                className={`toggle-btn ${difficulty === d ? 'active' : ''}`}
                onClick={() => setDifficulty(d)}
              >
                {d === 'all' ? 'Alle' : d === 'easy' ? 'Leicht' : d === 'medium' ? 'Mittel' : 'Schwer'}
              </button>
            ))}
          </div>
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
          Quiz starten
        </button>
      </div>
    );
  }

  if (state === 'summary') {
    const correctCount = answers.filter(Boolean).length;
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="quiz-summary">
        <div className="summary-score-ring">
          <span className="summary-pct">{pct}%</span>
          <span className="summary-label">richtig</span>
        </div>
        <div className="summary-stats">
          <div className="stat">
            <span className="stat-value">{correctCount}/{questions.length}</span>
            <span className="stat-label">Antworten</span>
          </div>
          <div className="stat">
            <span className="stat-value">{score}</span>
            <span className="stat-label">Punkte</span>
          </div>
          <div className="stat">
            <span className="stat-value">{bestStreak}</span>
            <span className="stat-label">Beste Serie</span>
          </div>
        </div>
        <div className="summary-words">
          {questions.map((q, i) => (
            <div key={q.word.id} className={`summary-word ${answers[i] ? 'correct' : 'wrong'}`}>
              <span className="summary-indicator">{answers[i] ? '✓' : '✗'}</span>
              <span className="summary-es">{q.word.es}</span>
              <span className="summary-de">{q.word.de}</span>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => setState('config')}>
          Nochmal spielen
        </button>
      </div>
    );
  }

  const q = questions[current];
  const isEsToDe = direction === 'es-de';
  const prompt = isEsToDe ? q.word.es : q.word.de;

  return (
    <div className="quiz-play">
      <div className="quiz-header">
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <div className="quiz-meta">
          <span className="label">{current + 1} / {questions.length}</span>
          <span className="score">{score} pts</span>
          {streak >= 2 && <span className="streak-badge">🔥 {streak}</span>}
        </div>
      </div>

      <div className="question-card">
        <span className="label" style={{ color: categoryColors[q.word.category] }}>
          {categoryLabels[q.word.category]}
        </span>
        <h2 className="question-word">{prompt}</h2>
        {state === 'result' && q.word.example && (
          <p className="question-example">"{q.word.example}"</p>
        )}
      </div>

      <div className="options-grid">
        {q.options.map((opt, i) => {
          let cls = 'option-btn';
          if (selected !== null) {
            if (i === q.correctIndex) cls += ' correct';
            else if (i === selected) cls += ' wrong';
            else cls += ' dimmed';
          }
          return (
            <button
              key={i}
              className={cls}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
            >
              <span className="option-key">{i + 1}</span>
              <span className="option-text">{opt}</span>
            </button>
          );
        })}
      </div>

      {state === 'result' && (
        <div className="result-bar">
          <span className={selected === q.correctIndex ? 'result-correct' : 'result-wrong'}>
            {selected === q.correctIndex ? 'Richtig!' : `Falsch - ${isEsToDe ? q.word.de : q.word.es}`}
          </span>
          <button className="btn" onClick={nextQuestion}>
            Weiter →
          </button>
        </div>
      )}
    </div>
  );
}
