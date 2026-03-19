import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Mindestens 6 Zeichen.');
      return;
    }
    if (password !== confirm) {
      setError('Passwörter stimmen nicht überein.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="login-sent">
        <div className="login-sent-icon">✅</div>
        <h3>Passwort geändert!</h3>
        <p>Du kannst dich jetzt mit deinem neuen Passwort einloggen.</p>
        <a href="/auth/login" className="login-btn" style={{ display: 'inline-flex', textDecoration: 'none', marginTop: '20px', maxWidth: '300px' }}>
          Zum Login
        </a>
      </div>
    );
  }

  return (
    <div className="login-card">
      <form onSubmit={handleReset} className="login-fields">
        <div className="login-field">
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Neues Passwort"
            required
            minLength={6}
            autoComplete="new-password"
            autoFocus
          />
        </div>
        <div className="login-field">
          <input
            type="password"
            className="login-input"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="Passwort bestätigen"
            required
            minLength={6}
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Speichere...' : 'Neues Passwort setzen'}
        </button>
      </form>
      {error && <p className="login-error">{error}</p>}
    </div>
  );
}
