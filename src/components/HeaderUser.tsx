import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { uploadProgress, downloadProgress } from '../lib/sync';

export default function HeaderUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);

      // If logged in, sync on load
      if (session?.user) {
        downloadProgress();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const newUser = session?.user ?? null;
      setUser(newUser);

      // On login, upload local data then download merged
      if (newUser && _event === 'SIGNED_IN') {
        uploadProgress().then(() => downloadProgress());
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  if (!user) {
    return (
      <a href="/auth/login" className="header-user-btn" aria-label="Anmelden">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </a>
    );
  }

  const initial = (user.user_metadata?.first_name?.[0] || user.email?.[0] || '?').toUpperCase();

  return (
    <a href="/profil" className="header-avatar" aria-label="Profil">
      {initial}
    </a>
  );
}
