import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function LoginEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);
    if (error) {
      setError(error.message === 'Invalid login credentials'
        ? 'E-Mail oder Passwort falsch.'
        : error.message);
    } else {
      window.location.href = '/';
    }
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setError('Bitte gib deine E-Mail-Adresse ein.');
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/callback`,
    });
    if (error) {
      setError(error.message);
    } else {
      setResetSent(true);
    }
  };

  if (resetSent) {
    return (
      <div className="login-sent">
        <div className="login-sent-icon">✉️</div>
        <h3>Check deine E-Mails</h3>
        <p>Wir haben dir einen Link zum Zurücksetzen an <strong>{email}</strong> geschickt.</p>
        <button className="btn" onClick={() => setResetSent(false)} style={{ marginTop: '20px' }}>Zurück</button>
      </div>
    );
  }

  return (
    <div className="login-card">
      <form onSubmit={handleLogin} className="login-fields">
        <div className="login-field">
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="E-Mail"
            required
            autoComplete="email"
          />
        </div>
        <div className="login-field">
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Passwort"
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Lade...' : 'Einloggen'}
        </button>
      </form>

      <button className="login-forgot" onClick={handleResetPassword} type="button">
        Passwort vergessen?
      </button>

      {error && <p className="login-error">{error}</p>}
    </div>
  );
}
