import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SPLASH_KEY = 'milhojas-splash-seen';

function isPWA(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches
    || (window.navigator as any).standalone === true;
}

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isPWA()) return;
    try {
      if (sessionStorage.getItem(SPLASH_KEY)) return;
      sessionStorage.setItem(SPLASH_KEY, '1');
    } catch {}
    setShow(true);
    const timer = setTimeout(() => setShow(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  const textStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10%',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: 'Impact, "Arial Black", sans-serif',
    fontSize: 'clamp(72px, 25vw, 220px)',
    fontWeight: 900,
    color: 'white',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    lineHeight: 1,
    userSelect: 'none',
  };

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              overflow: 'hidden',
              background: '#0a0a0a',
            }}
          >
            {/* Layer 1: MILHOJAS text (behind everything) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
              style={{ ...textStyle, zIndex: 1 }}
            >
              MILHOJAS
            </motion.div>

            {/* Layer 2: Chili photo with mix-blend-mode lighten
                Dark areas → transparent (text shows through)
                Bright red chilies → opaque (cover the text) */}
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                mixBlendMode: 'lighten',
              }}
            >
              <img
                src="/images/splash-pwa.jpg"
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </motion.div>

            {/* Layer 3: Subtle vignette for polish */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 3,
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
              pointerEvents: 'none',
            }} />
          </motion.div>
        )}
      </AnimatePresence>
      {!show && children}
      {show && <div style={{ display: 'none' }}>{children}</div>}
    </>
  );
}
