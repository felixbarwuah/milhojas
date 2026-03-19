import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function LoginForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim() || !password) return;
    if (password.length < 6) {
      setError('Passwort muss mindestens 6 Zeichen haben.');
      return;
    }
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: { first_name: name.trim() },
      },
    });

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      // Auto-login after signup
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (!loginError) {
        window.location.href = '/';
      } else {
        // If auto-login fails, show confirmation message
        setError('Account erstellt! Bitte bestätige deine E-Mail und logge dich dann ein.');
      }
    }
  };

  return (
    <div className="login-card">
      <form onSubmit={handleRegister} className="login-fields">
        <div className="login-field">
          <input
            type="text"
            className="login-input"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Vorname"
            required
            autoComplete="given-name"
          />
        </div>
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
            minLength={6}
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="login-btn" disabled={loading || !name.trim()}>
          {loading ? 'Lade...' : 'Konto erstellen'}
        </button>
      </form>

      {error && <p className="login-error">{error}</p>}

      <p className="login-hint">Mindestens 6 Zeichen für das Passwort.</p>
    </div>
  );
}
