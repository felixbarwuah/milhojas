import { useAuth } from './AuthProvider';

export default function UserMenu() {
  const { user, loading, signOut } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <a href="/auth/login" className="user-login-link">
        Anmelden
      </a>
    );
  }

  const initial = (user.email?.[0] || '?').toUpperCase();

  return (
    <div className="user-menu">
      <div className="user-avatar" title={user.email || ''}>
        {initial}
      </div>
      <button className="user-logout" onClick={signOut}>
        Abmelden
      </button>
    </div>
  );
}
