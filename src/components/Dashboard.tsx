import { useState, useEffect } from 'react';
import { loadXP, getXPProgress, type XPData } from '../data/srs';
import ErrorBoundary from './ErrorBoundary';

export default function Dashboard() {
  const [xp, setXp] = useState<XPData | null>(null);

  useEffect(() => {
    setXp(loadXP());
  }, []);

  if (!xp) return null;

  const progress = getXPProgress(xp);
  const goalReached = xp.todayXP >= xp.dailyGoal;

  // Don't show dashboard if user has never played
  if (xp.totalXP === 0) return null;

  return (
    <ErrorBoundary><div className="dashboard">
      <div className="dashboard-streak">
        <div className="streak-flame">{xp.streak > 0 ? '🔥' : '💤'}</div>
        <div className="streak-info">
          <span className="streak-count">{xp.streak}</span>
          <span className="streak-text">{xp.streak === 1 ? 'Tag Streak' : 'Tage Streak'}</span>
        </div>
      </div>

      <div className="dashboard-xp">
        <div className="xp-header">
          <span className="xp-today">{xp.todayXP} / {xp.dailyGoal} XP heute</span>
          {goalReached && <span className="xp-done">Tagesziel erreicht!</span>}
        </div>
        <div className="xp-bar">
          <div
            className="xp-bar-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div className="dashboard-total">
        <span className="label">Gesamt: {xp.totalXP} XP</span>
        {xp.longestStreak > 0 && (
          <span className="label">Längster Streak: {xp.longestStreak} Tage</span>
        )}
      </div>
    </div></ErrorBoundary>
  );
}
