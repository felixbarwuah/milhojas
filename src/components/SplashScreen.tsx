import { useState, useEffect } from 'react';

const SPLASH_KEY = 'milhojas-splash-seen';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<'zoom' | 'title' | 'out'>('zoom');

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SPLASH_KEY)) return;
      sessionStorage.setItem(SPLASH_KEY, '1');
    } catch {}
    setShow(true);
    // Show title after zoom starts
    const t1 = setTimeout(() => setPhase('title'), 600);
    // Start fade out
    const t2 = setTimeout(() => setPhase('out'), 2000);
    // Remove splash
    const t3 = setTimeout(() => setShow(false), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (!show) return <>{children}</>;

  return (
    <>
      <div className={`splash2 ${phase === 'out' ? 'splash2-out' : ''}`}>
        <div className="splash2-bg" />
        <div className="splash2-img-wrap">
          <img src="/images/splash-chili.jpg" alt="" className="splash2-img" />
        </div>
        <div className={`splash2-overlay ${phase !== 'zoom' ? 'splash2-overlay-show' : ''}`}>
          <h1 className="splash2-title">Milhojas</h1>
          <p className="splash2-sub">Deine neue Spanischlernapp</p>
        </div>
      </div>
      <div style={{ display: 'none' }}>{children}</div>
    </>
  );
}
