import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Greeting() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setName(session.user.user_metadata?.first_name || null);
      }
    });
  }, []);

  if (!name) return null;

  return (
    <p className="greeting">Hola, {name}!</p>
  );
}
