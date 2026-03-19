import { useState, useEffect, useCallback } from 'react';
import { vocab, categoryLabels, categoryColors, type VocabWord, type VocabCategory, type Level } from '../data/vocab';
import { loadSRS, saveSRS, startSession, recordCorrect, recordWrong, addXP } from '../data/srs';
import SpeakButton from './SpeakButton';
import LevelFilter from './LevelFilter';
import ErrorBoundary from './ErrorBoundary';

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
  const [level, setLevel] = useState<Level | 'all'>('all');
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
    if (level !== 'all') {
      pool = pool.filter(w => !w.level || w.level === level);
    }
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
    const q = questions[current];
    const correct = idx === q.correctIndex;
    setAnswers(prev => [...prev, correct]);

    // SRS tracking
    const cardId = `vocab:${q.word.id}`;
    const srs = loadSRS();
    const updated = correct ? recordCorrect(srs, cardId) : recordWrong(srs, cardId);
    saveSRS(updated);

    if (correct) {
      const timeBonus = Math.max(0, Math.floor((5000 - (Date.now() - startTime)) / 50));
      const streakBonus = streak * 5;
      const earned = 100 + timeBonus + streakBonus;
      setScore(prev => prev + earned);
      addXP(Math.round(earned / 10)); // 1 XP per 10 quiz points
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

  const [showCategories, setShowCategories] = useState(false);

  const categoryDE: Record<string, string> = {
    comida: 'Essen & Trinken', viaje: 'Reise & Transport', casa: 'Haus & Wohnung',
    trabajo: 'Arbeit & Büro', naturaleza: 'Natur', cuerpo: 'Körper & Gesundheit',
    ropa: 'Kleidung', ciudad: 'Stadt & Orte', familia: 'Familie & Personen',
    tiempo: 'Wetter & Klima', frases: 'Alltagssätze', verbos: 'Wichtige Verben', custom: 'Meine Wörter',
  };

  if (state === 'config') {
    return (
      <ErrorBoundary><div className="quiz-config">
        {highScore > 0 && (
          <div className="config-highscore">
            <span className="label">Highscore</span>
            <span className="score">{highScore} pts</span>
          </div>
        )}

        <LevelFilter value={level} onChange={setLevel} />

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
            <span className={`category-arrow ${showCategories ? 'open' : ''}`}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
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
          Quiz starten
        </button>
      </div></ErrorBoundary>
    );
  }

  if (state === 'summary') {
    const correctCount = answers.filter(Boolean).length;
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <ErrorBoundary><div className="quiz-summary">
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
      </div></ErrorBoundary>
    );
  }

  const q = questions[current];
  const isEsToDe = direction === 'es-de';
  const prompt = isEsToDe ? q.word.es : q.word.de;

  return (
    <ErrorBoundary><div className="quiz-play">
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
        <h2 className="question-word">{prompt}</h2>
        {isEsToDe && <SpeakButton text={q.word.es} />}
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
    </div></ErrorBoundary>
  );
}
