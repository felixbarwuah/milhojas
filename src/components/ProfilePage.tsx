import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { uploadProgress } from '../lib/sync';
import { loadXP } from '../data/srs';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');
  const xp = loadXP();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    setSyncMsg('');
    const ok = await uploadProgress();
    setSyncMsg(ok ? 'Gespeichert!' : 'Fehler');
    setSyncing(false);
    setTimeout(() => setSyncMsg(''), 2000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) return null;

  if (!user) {
    return (
      <div className="prof-container">
        <div className="prof-header-card">
          <div className="prof-avatar-big">?</div>
          <h2 className="prof-name">Nicht angemeldet</h2>
          <p className="prof-email">Melde dich an um deinen Fortschritt zu speichern.</p>
        </div>
        <div className="prof-menu">
          <a href="/auth" className="prof-menu-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            <span>Anmelden / Registrieren</span>
            <svg className="prof-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </div>
      </div>
    );
  }

  const firstName = user.user_metadata?.first_name || 'Lerner';
  const email = user.email || '';
  const initial = firstName[0]?.toUpperCase() || '?';

  return (
    <div className="prof-container">
      <div className="prof-header-card">
        <div className="prof-avatar-big">{initial}</div>
        <h2 className="prof-name">{firstName}</h2>
        <p className="prof-email">{email}</p>
      </div>

      <div className="prof-menu">
        <a href="/settings/" className="prof-menu-item">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          <span>Einstellungen</span>
          <svg className="prof-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </a>

        <div className="prof-menu-item" onClick={handleSync}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
          <span>Cloud-Sync {syncMsg && <small style={{color: syncMsg === 'Gespeichert!' ? '#16A34A' : '#D52B1E'}}>{syncMsg}</small>}</span>
          <svg className="prof-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </div>

        <div className="prof-menu-section">Fortschritt</div>

        <div className="prof-menu-item prof-stats-row">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>{xp.totalXP} XP gesamt</span>
          <span className="prof-meta">{xp.todayXP}/{xp.dailyGoal} heute</span>
        </div>

        <div className="prof-menu-item prof-stats-row">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
          <span>{xp.streak} Tage Streak</span>
          <span className="prof-meta">Bester: {xp.longestStreak}</span>
        </div>

        <div className="prof-menu-section">Rechtliches</div>

        <a href="/impressum/" className="prof-menu-item">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <span>Impressum</span>
          <svg className="prof-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </a>

        <a href="/datenschutz/" className="prof-menu-item">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span>Datenschutz</span>
          <svg className="prof-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
      </div>

      <button className="prof-logout" onClick={handleLogout}>Abmelden</button>
    </div>
  );
}
