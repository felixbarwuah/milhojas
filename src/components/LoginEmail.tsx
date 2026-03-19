import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function LoginEmail() {
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

  if (sent) {
    return (
      <div className="login-sent">
        <div className="login-sent-icon">✉️</div>
        <h3>Check deine E-Mails</h3>
        <p>Wir haben dir einen Login-Link an <strong>{email}</strong> geschickt.</p>
        <p>Klick auf den Link um dich einzuloggen.</p>
        <button className="btn" onClick={() => setSent(false)} style={{ marginTop: '20px' }}>Andere E-Mail</button>
      </div>
    );
  }

  return (
    <div className="login-card">
      <form onSubmit={handleMagicLink} className="login-fields">
        <div className="login-field login-field-single">
          <input
            type="email"
            className="login-input login-input-single"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="E-Mail-Adresse"
            required
            autoComplete="email"
          />
        </div>
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Sende...' : 'Einloggen'}
        </button>
      </form>

      {error && <p className="login-error">{error}</p>}

      <p className="login-hint">Du bekommst einen Link per E-Mail. Kein Passwort nötig.</p>
    </div>
  );
}
