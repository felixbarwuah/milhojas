import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  };

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setError(error.message);
  };

  if (sent) {
    return (
      <div className="login-form">
        <div className="login-sent">
          <h3>Check deine E-Mails</h3>
          <p>Wir haben dir einen Login-Link an <strong>{email}</strong> geschickt. Klick auf den Link um dich einzuloggen.</p>
          <button className="btn" onClick={() => setSent(false)}>Andere E-Mail</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-form">
      <form onSubmit={handleMagicLink}>
        <input
          type="email"
          className="login-input"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Deine E-Mail-Adresse"
          required
          autoComplete="email"
        />
        <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
          {loading ? 'Sende...' : 'Magic Link senden'}
        </button>
      </form>

      <div className="login-divider">
        <span>oder</span>
      </div>

      <button className="btn login-btn login-google" onClick={handleGoogle}>
        <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Mit Google anmelden
      </button>

      {error && <p className="login-error">{error}</p>}
    </div>
  );
}
