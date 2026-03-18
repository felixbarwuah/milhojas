import { useState, useEffect } from 'react';

type Platform = 'ios' | 'android' | 'desktop' | 'unknown';

function getPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/android/.test(ua)) return 'android';
  return 'desktop';
}

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches
    || (window.navigator as any).standalone === true;
}

export default function InstallPrompt() {
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState<Platform>('unknown');
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already installed as PWA
    if (isStandalone()) return;
    // Don't show if previously dismissed
    try {
      if (localStorage.getItem('milhojas-install-dismissed')) return;
    } catch {}

    setPlatform(getPlatform());
    // Small delay so it doesn't pop up immediately
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    setShow(false);
    try { localStorage.setItem('milhojas-install-dismissed', '1'); } catch {}
  };

  if (!show || dismissed) return null;

  return (
    <div className="install-banner">
      <div className="install-content">
        <img src="/icons/logo-chili.png" alt="" width="32" height="32" className="install-icon" />
        <div className="install-text">
          <strong>Milhojas als App installieren</strong>
          {platform === 'ios' && (
            <p>Tippe auf die <span className="install-highlight">drei Punkte</span> unten rechts, dann <span className="install-highlight">Teilen</span>, runter wischen und <span className="install-highlight">Zum Home-Bildschirm</span> wählen.</p>
          )}
          {platform === 'android' && (
            <p>Tippe auf das <span className="install-highlight">Menü</span> (drei Punkte) und dann <span className="install-highlight">App installieren</span>.</p>
          )}
          {platform === 'desktop' && (
            <p>Klicke auf das Installieren-Symbol in der Adressleiste deines Browsers.</p>
          )}
          {platform === 'unknown' && (
            <p>Füge diese Seite zu deinem Startbildschirm hinzu für Offline-Zugriff.</p>
          )}
        </div>
        <button className="install-close" onClick={dismiss} aria-label="Schließen">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  );
}
