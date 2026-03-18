import { useState, useEffect, useRef, useCallback } from 'react';
import { verbs, persons, personLabels, tenseLabels, type Verb, type Person } from '../data/conjugations';
import { loadSRS, saveSRS, recordCorrect, recordWrong, addXP } from '../data/srs';

type GameState = 'config' | 'playing' | 'result' | 'summary';

interface Question {
  verb: Verb;
  tense: string;
  person: Person;
  correct: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateQuestions(
  selectedVerbs: Verb[],
  selectedTenses: string[],
  count: number
): Question[] {
  const all: Question[] = [];
  for (const verb of selectedVerbs) {
    for (const tense of selectedTenses) {
      const forms = verb.forms[tense as keyof typeof verb.forms];
      if (!forms) continue;
      for (const person of persons) {
        all.push({
          verb,
          tense,
          person,
          correct: forms[person],
        });
      }
    }
  }
  return shuffle(all).slice(0, count);
}

function getHighScore(): number {
  try { return parseInt(localStorage.getItem('milhojas-conj-highscore') || '0', 10); } catch { return 0; }
}
function saveHighScore(s: number) {
  try { if (s > getHighScore()) localStorage.setItem('milhojas-conj-highscore', String(s)); } catch {}
}

export default function ConjugationQuiz() {
  const [state, setState] = useState<GameState>('config');
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [selectedTenses, setSelectedTenses] = useState<Set<string>>(new Set(['presente']));
  const [onlyIrregular, setOnlyIrregular] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answers, setAnswers] = useState<{ question: Question; given: string; correct: boolean }[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setHighScore(getHighScore()); }, []);

  const tenses = ['presente', 'preterito', 'imperfecto'];

  const toggleTense = (t: string) => {
    setSelectedTenses(prev => {
      const next = new Set(prev);
      if (next.has(t)) {
        if (next.size > 1) next.delete(t);
      } else {
        next.add(t);
      }
      return next;
    });
  };

  const startGame = () => {
    let pool = [...verbs];
    if (difficulty !== 'all') pool = pool.filter(v => v.difficulty === difficulty);
    if (onlyIrregular) pool = pool.filter(v => !v.regular);
    if (pool.length < 2) return;

    const qs = generateQuestions(pool, [...selectedTenses], 15);
    if (qs.length === 0) return;
    setQuestions(qs);
    setCurrent(0);
    setInput('');
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setAnswers([]);
    setShowResult(false);
    setState('playing');
  };

  const checkAnswer = useCallback(() => {
    if (showResult || !input.trim()) return;
    const q = questions[current];
    const normalized = input.trim().toLowerCase();
    const correct = normalized === q.correct.toLowerCase();

    setAnswers(prev => [...prev, { question: q, given: input.trim(), correct }]);

    // SRS tracking
    const cardId = `conj:${q.verb.infinitive}:${q.tense}:${q.person}`;
    const srs = loadSRS();
    const updated = correct ? recordCorrect(srs, cardId) : recordWrong(srs, cardId);
    saveSRS(updated);

    if (correct) {
      const streakBonus = streak * 5;
      const earned = 100 + streakBonus;
      setScore(prev => prev + earned);
      addXP(Math.round(earned / 10));
      setStreak(prev => {
        const next = prev + 1;
        setBestStreak(b => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
    }
    setShowResult(true);
  }, [input, showResult, questions, current, streak]);

  const nextQuestion = () => {
    if (current + 1 >= questions.length) {
      saveHighScore(score);
      setHighScore(Math.max(getHighScore(), score));
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
          <h3 className="config-title">Zeitform</h3>
          <div className="direction-toggle">
            {tenses.map(t => (
              <button
                key={t}
                className={`toggle-btn ${selectedTenses.has(t) ? 'active' : ''}`}
                onClick={() => toggleTense(t)}
              >
                {tenseLabels[t]}
              </button>
            ))}
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
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={onlyIrregular}
              onChange={e => setOnlyIrregular(e.target.checked)}
            />
            <span>Nur unregelmäßige Verben</span>
          </label>
        </div>

        <button className="btn btn-blue start-btn" onClick={startGame}>
          Quiz starten
        </button>
      </div>
    );
  }

  if (state === 'summary') {
    const correctCount = answers.filter(a => a.correct).length;
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
        <div className="summary-words conjugation-summary">
          {answers.map((a, i) => (
            <div key={i} className={`summary-word ${a.correct ? 'correct' : 'wrong'}`}>
              <span className="summary-indicator">{a.correct ? '✓' : '✗'}</span>
              <span className="summary-es">
                {a.question.verb.infinitive} ({personLabels[a.question.person]})
              </span>
              <span className="summary-de">
                {a.correct ? a.question.correct : (
                  <>{a.given} <span className="correction">→ {a.question.correct}</span></>
                )}
              </span>
            </div>
          ))}
        </div>
        <button className="btn btn-blue" onClick={() => setState('config')}>
          Nochmal spielen
        </button>
      </div>
    );
  }

  const q = questions[current];
  const lastAnswer = answers[answers.length - 1];

  return (
    <div className="quiz-play">
      <div className="quiz-header">
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{
            width: `${((current + (showResult ? 1 : 0)) / questions.length) * 100}%`,
            background: 'var(--accent-blue)',
          }} />
        </div>
        <div className="quiz-meta">
          <span className="label">{current + 1} / {questions.length}</span>
          <span className="score">{score} pts</span>
          {streak >= 2 && <span className="streak-badge">🔥 {streak}</span>}
        </div>
      </div>

      <div className="question-card conjugation-card">
        <span className="label">{tenseLabels[q.tense]}</span>
        <h2 className="question-word">{q.verb.infinitive}</h2>
        <p className="verb-translation">{q.verb.de}</p>
        <div className="person-badge">
          {personLabels[q.person]}
        </div>
      </div>

      <div className="conjugation-input-area">
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className={`conjugation-input ${showResult ? (lastAnswer?.correct ? 'input-correct' : 'input-wrong') : ''}`}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Konjugierte Form eingeben..."
            disabled={showResult}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {!showResult && (
            <button className="btn btn-blue check-btn" onClick={checkAnswer} disabled={!input.trim()}>
              Prüfen
            </button>
          )}
        </div>

        {showResult && (
          <div className="result-bar">
            <span className={lastAnswer?.correct ? 'result-correct' : 'result-wrong'}>
              {lastAnswer?.correct ? 'Richtig!' : (
                <>Falsch - <strong>{q.correct}</strong></>
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
