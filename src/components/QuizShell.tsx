import { type ReactNode } from 'react';

/**
 * Shared quiz layout components to reduce duplication across quiz modes.
 * These are presentational building blocks, not a full quiz engine.
 */

interface ProgressProps {
  current: number;
  total: number;
  label?: string;
  labelColor?: string;
  barColor?: string;
}

export function QuizProgress({ current, total, label, labelColor, barColor }: ProgressProps) {
  return (
    <div className="quiz-header">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${((current + 1) / total) * 100}%`, background: barColor }}
        />
      </div>
      <div className="quiz-meta">
        <span className="label">{current + 1} / {total}</span>
        {label && <span className="label" style={{ color: labelColor }}>{label}</span>}
      </div>
    </div>
  );
}

interface SummaryProps {
  correctCount: number;
  totalCount: number;
  xpEarned?: number;
  label?: string;
  children?: ReactNode;
  onRestart: () => void;
  restartLabel?: string;
}

export function QuizSummary({
  correctCount, totalCount, xpEarned, label = 'richtig',
  children, onRestart, restartLabel = 'Nochmal',
}: SummaryProps) {
  const pct = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  return (
    <div className="quiz-summary">
      <div className="summary-score-ring">
        <span className="summary-pct">{pct}%</span>
        <span className="summary-label">{label}</span>
      </div>
      <div className="summary-stats">
        <div className="stat">
          <span className="stat-value">{correctCount}/{totalCount}</span>
          <span className="stat-label">Richtig</span>
        </div>
        {xpEarned !== undefined && (
          <div className="stat">
            <span className="stat-value">+{xpEarned}</span>
            <span className="stat-label">XP</span>
          </div>
        )}
      </div>
      {children}
      <button className="btn btn-primary" onClick={onRestart}>{restartLabel}</button>
    </div>
  );
}

interface OptionsProps {
  options: string[];
  selected: number | null;
  correctIndex: number;
  onSelect: (index: number) => void;
}

export function QuizOptions({ options, selected, correctIndex, onSelect }: OptionsProps) {
  return (
    <div className="options-grid">
      {options.map((opt, i) => {
        let cls = 'option-btn';
        if (selected !== null) {
          if (i === correctIndex) cls += ' correct';
          else if (i === selected) cls += ' wrong';
          else cls += ' dimmed';
        }
        return (
          <button
            key={i}
            className={cls}
            onClick={() => onSelect(i)}
            disabled={selected !== null}
          >
            <span className="option-key">{i + 1}</span>
            <span className="option-text">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

interface ResultBarProps {
  correct: boolean;
  correctAnswer?: string;
  onNext: () => void;
}

export function QuizResultBar({ correct, correctAnswer, onNext }: ResultBarProps) {
  return (
    <div className="result-bar">
      <span className={correct ? 'result-correct' : 'result-wrong'}>
        {correct ? 'Richtig!' : (correctAnswer ? `→ ${correctAnswer}` : 'Falsch')}
      </span>
      <button className="btn" onClick={onNext}>Weiter →</button>
    </div>
  );
}
