import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { uploadProgress } from '../lib/sync';
import { loadXP, type XPData } from '../data/srs';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [xp, setXp] = useState<XPData | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
    setXp(loadXP());
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    setSyncMsg('');
    const ok = await uploadProgress();
    setSyncMsg(ok ? 'Fortschritt gespeichert!' : 'Fehler beim Speichern');
    setSyncing(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) return <p style={{ textAlign: 'center', padding: '40px', color: '#999' }}>Laden...</p>;

  if (!user) {
    return (
      <div className="profile-card">
        <div className="profile-guest">
          <h3>Nicht angemeldet</h3>
          <p>Melde dich an um deinen Fortschritt zu speichern und auf allen Geräten zu lernen.</p>
          <a href="/auth/login" className="login-btn" style={{ display: 'inline-flex', textDecoration: 'none', maxWidth: '300px', margin: '16px auto 0' }}>
            Jetzt registrieren
          </a>
        </div>
      </div>
    );
  }

  const firstName = user.user_metadata?.first_name || 'Lerner';
  const email = user.email || '';
  const initial = firstName[0]?.toUpperCase() || '?';

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">{initial}</div>
          <div>
            <h3 className="profile-name">Hola, {firstName}!</h3>
            <p className="profile-email">{email}</p>
          </div>
        </div>
      </div>

      {xp && (
        <div className="profile-card">
          <h3 className="profile-section-title">Dein Fortschritt</h3>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="profile-stat-value">{xp.totalXP}</span>
              <span className="profile-stat-label">Gesamt XP</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">{xp.streak}</span>
              <span className="profile-stat-label">Tage Streak</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">{xp.longestStreak}</span>
              <span className="profile-stat-label">Bester Streak</span>
            </div>
            <div className="profile-stat">
              <span className="profile-stat-value">{xp.todayXP}/{xp.dailyGoal}</span>
              <span className="profile-stat-label">Heute</span>
            </div>
          </div>
        </div>
      )}

      <div className="profile-card">
        <h3 className="profile-section-title">Cloud-Sync</h3>
        <p style={{ fontSize: '14px', color: '#6B6560', marginBottom: '12px' }}>
          Speichere deinen Fortschritt in der Cloud um auf allen Geräten weiterzulernen.
        </p>
        <button className="btn btn-primary" onClick={handleSync} disabled={syncing} style={{ width: '100%', justifyContent: 'center' }}>
          {syncing ? 'Speichern...' : 'Jetzt synchronisieren'}
        </button>
        {syncMsg && <p style={{ marginTop: '8px', fontSize: '13px', color: syncMsg.includes('Fehler') ? '#D52B1E' : '#16A34A', textAlign: 'center' }}>{syncMsg}</p>}
      </div>

      <div className="profile-card">
        <h3 className="profile-section-title">Account</h3>
        <button className="btn" onClick={handleLogout} style={{ width: '100%', justifyContent: 'center', color: '#D52B1E', borderColor: '#D52B1E' }}>
          Abmelden
        </button>
      </div>
    </div>
  );
}
