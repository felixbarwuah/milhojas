import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { loadXP } from '../data/srs';

const XP_KEY = 'milhojas-xp';
const SRS_KEY = 'milhojas-srs';
const SOUND_KEY = 'milhojas-sound';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Settings state
  const [name, setName] = useState('');
  const [nameEditing, setNameEditing] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);

  const [dailyGoal, setDailyGoal] = useState(50);
  const [goalSaved, setGoalSaved] = useState(false);

  const [soundOn, setSoundOn] = useState(true);

  const [newPassword, setNewPassword] = useState('');
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState('');

  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setName(user?.user_metadata?.first_name || '');
      setLoading(false);
    });
    const xp = loadXP();
    setDailyGoal(xp.dailyGoal || 50);
    try {
      setSoundOn(localStorage.getItem(SOUND_KEY) !== 'off');
    } catch {}
  }, []);

  // ── Name ändern ──
  const saveName = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { first_name: name.trim() },
    });
    if (!error) {
      setNameEditing(false);
      setNameSaved(true);
      setTimeout(() => setNameSaved(false), 2000);
    }
  };

  // ── Tagesziel ──
  const saveGoal = (goal: number) => {
    setDailyGoal(goal);
    try {
      const xp = JSON.parse(localStorage.getItem(XP_KEY) || '{}');
      xp.dailyGoal = goal;
      localStorage.setItem(XP_KEY, JSON.stringify(xp));
    } catch {}
    setGoalSaved(true);
    setTimeout(() => setGoalSaved(false), 2000);
  };

  // ── Sound ──
  const toggleSound = () => {
    const newVal = !soundOn;
    setSoundOn(newVal);
    try {
      localStorage.setItem(SOUND_KEY, newVal ? 'on' : 'off');
    } catch {}
  };

  // ── Passwort ──
  const changePassword = async () => {
    setPwError('');
    if (newPassword.length < 6) {
      setPwError('Mindestens 6 Zeichen.');
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setPwError(error.message);
    } else {
      setNewPassword('');
      setPwSaved(true);
      setTimeout(() => setPwSaved(false), 2000);
    }
  };

  // ── Reset ──
  const resetProgress = () => {
    try {
      localStorage.removeItem(XP_KEY);
      localStorage.removeItem(SRS_KEY);
      localStorage.removeItem('milhojas-custom-vocab');
    } catch {}
    setConfirmReset(false);
    window.location.reload();
  };

  // ── Delete ──
  const deleteAccount = async () => {
    // Sign out and redirect - actual deletion needs admin API
    await supabase.auth.signOut();
    try {
      localStorage.removeItem(XP_KEY);
      localStorage.removeItem(SRS_KEY);
      localStorage.removeItem('milhojas-custom-vocab');
    } catch {}
    window.location.href = '/';
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) return null;

  if (!user) {
    return (
      <div className="settings-container">
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

  return (
    <div className="settings-container">

      {/* Tagesziel */}
      <div className="settings-card">
        <h3 className="settings-title">Tagesziel</h3>
        <p className="settings-desc">Wie viel XP willst du pro Tag erreichen?</p>
        <div className="settings-goal-btns">
          {[30, 50, 100].map(g => (
            <button
              key={g}
              className={`settings-goal-btn ${dailyGoal === g ? 'active' : ''}`}
              onClick={() => saveGoal(g)}
            >
              {g} XP
            </button>
          ))}
        </div>
        {goalSaved && <p className="settings-saved">Gespeichert!</p>}
      </div>

      {/* Name */}
      <div className="settings-card">
        <h3 className="settings-title">Name</h3>
        {nameEditing ? (
          <div className="settings-row">
            <input
              type="text"
              className="settings-input"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Vorname"
              autoFocus
            />
            <button className="settings-save-btn" onClick={saveName}>Speichern</button>
          </div>
        ) : (
          <div className="settings-row">
            <span className="settings-value">{name || 'Nicht gesetzt'}</span>
            <button className="settings-edit-btn" onClick={() => setNameEditing(true)}>Ändern</button>
          </div>
        )}
        {nameSaved && <p className="settings-saved">Gespeichert!</p>}
      </div>

      {/* Passwort */}
      <div className="settings-card">
        <h3 className="settings-title">Passwort ändern</h3>
        <div className="settings-row">
          <input
            type="password"
            className="settings-input"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Neues Passwort"
          />
          <button className="settings-save-btn" onClick={changePassword}>Ändern</button>
        </div>
        {pwSaved && <p className="settings-saved">Passwort geändert!</p>}
        {pwError && <p className="settings-error">{pwError}</p>}
      </div>

      {/* Sound */}
      <div className="settings-card">
        <div className="settings-row">
          <div>
            <h3 className="settings-title" style={{ marginBottom: 0 }}>Aussprache (Sound)</h3>
            <p className="settings-desc">Text-to-Speech für spanische Wörter</p>
          </div>
          <button className={`settings-toggle ${soundOn ? 'on' : 'off'}`} onClick={toggleSound}>
            <span className="settings-toggle-knob" />
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="settings-card settings-danger">
        <h3 className="settings-title">Gefahrenzone</h3>

        {!confirmReset ? (
          <button className="settings-danger-btn" onClick={() => setConfirmReset(true)}>
            Fortschritt zurücksetzen
          </button>
        ) : (
          <div className="settings-confirm">
            <p>Bist du sicher? Alle XP, Streaks und Lernfortschritte werden gelöscht.</p>
            <div className="settings-confirm-btns">
              <button className="btn" onClick={() => setConfirmReset(false)}>Abbrechen</button>
              <button className="settings-danger-btn-confirm" onClick={resetProgress}>Ja, zurücksetzen</button>
            </div>
          </div>
        )}

        {!confirmDelete ? (
          <button className="settings-danger-btn" onClick={() => setConfirmDelete(true)} style={{ marginTop: '8px' }}>
            Account löschen
          </button>
        ) : (
          <div className="settings-confirm">
            <p>Bist du sicher? Dein Account und alle Daten werden gelöscht.</p>
            <div className="settings-confirm-btns">
              <button className="btn" onClick={() => setConfirmDelete(false)}>Abbrechen</button>
              <button className="settings-danger-btn-confirm" onClick={deleteAccount}>Ja, löschen</button>
            </div>
          </div>
        )}
      </div>

      <button className="prof-logout" onClick={handleLogout}>Abmelden</button>
    </div>
  );
}
