import { useState, useEffect } from 'react';

const SPLASH_KEY = 'milhojas-splash-seen';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Only show splash once per session
    try {
      if (sessionStorage.getItem(SPLASH_KEY)) return;
      sessionStorage.setItem(SPLASH_KEY, '1');
    } catch {}
    setShow(true);
    // Start fade out
    const timer1 = setTimeout(() => setFadeOut(true), 1800);
    // Remove splash
    const timer2 = setTimeout(() => setShow(false), 2200);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  if (!show) return <>{children}</>;

  return (
    <>
      <div className={`splash ${fadeOut ? 'splash-out' : ''}`}>
        <div className="splash-content">
          <img
            src="/icons/icon-512.png"
            alt=""
            className="splash-chili"
          />
          <h1 className="splash-title">Milhojas</h1>
        </div>
        <div className="splash-peppers">
          <span className="splash-mini" style={{ left: '10%', animationDelay: '0.3s' }}>🌶</span>
          <span className="splash-mini" style={{ left: '25%', animationDelay: '0.5s' }}>🌶</span>
          <span className="splash-mini" style={{ right: '20%', animationDelay: '0.4s' }}>🌶</span>
          <span className="splash-mini" style={{ right: '8%', animationDelay: '0.6s' }}>🌶</span>
          <span className="splash-mini" style={{ left: '45%', animationDelay: '0.2s' }}>🌶</span>
        </div>
      </div>
      <div style={{ display: 'none' }}>{children}</div>
    </>
  );
}
