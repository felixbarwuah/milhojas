import { useState } from 'react';
import { supabase } from '../lib/supabase';

type View = 'login' | 'forgot' | 'forgot-sent';

export default function LoginEmail() {
  const [view, setView] = useState<View>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim(), {
      redirectTo: `${window.location.origin}/auth/reset`,
    });

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setView('forgot-sent');
    }
  };

  if (view === 'forgot-sent') {
    return (
      <div className="login-sent">
        <div className="login-sent-icon">✉️</div>
        <h3>Check deine E-Mails</h3>
        <p>Wir haben dir einen Link zum Zurücksetzen an <strong>{resetEmail}</strong> geschickt.</p>
        <button className="btn" onClick={() => { setView('login'); setError(''); }} style={{ marginTop: '20px' }}>Zurück zum Login</button>
      </div>
    );
  }

  if (view === 'forgot') {
    return (
      <div className="login-card">
        <form onSubmit={handleResetPassword} className="login-fields">
          <div className="login-field">
            <input
              type="email"
              className="login-input"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
              placeholder="Deine E-Mail-Adresse"
              required
              autoComplete="email"
              autoFocus
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Sende...' : 'Reset-Link senden'}
          </button>
        </form>
        <button className="login-forgot" onClick={() => { setView('login'); setError(''); }}>
          Zurück zum Login
        </button>
        {error && <p className="login-error">{error}</p>}
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

      <button className="login-forgot" onClick={() => { setView('forgot'); setError(''); }} type="button">
        Passwort vergessen?
      </button>

      {error && <p className="login-error">{error}</p>}
    </div>
  );
}
