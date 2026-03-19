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
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

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
            {/* Layer 1: Original photo as dark background */}
            <motion.img
              src="/images/splash-pwa.jpg"
              alt=""
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3.5, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.4,
                zIndex: 1,
              }}
            />

            {/* Layer 2: MILHOJAS text - BEHIND the chilies */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: '15%',
                left: 0,
                right: 0,
                textAlign: 'center',
                zIndex: 2,
              }}
            >
              <h1 style={{
                fontFamily: 'Impact, "Arial Black", sans-serif',
                fontSize: 'clamp(64px, 22vw, 200px)',
                fontWeight: 900,
                color: 'white',
                margin: 0,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                lineHeight: 1,
                textShadow: '0 4px 30px rgba(0,0,0,0.3)',
              }}>
                MILHOJAS
              </h1>
            </motion.div>

            {/* Layer 3: Freigestellte Chillis ÜBER dem Text */}
            <motion.img
              src="/images/chili-cutout.png"
              alt=""
              initial={{ scale: 1.1, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80vmin',
                maxWidth: 500,
                height: 'auto',
                zIndex: 3,
                filter: 'drop-shadow(0 8px 30px rgba(0,0,0,0.4))',
              }}
            />

            {/* Layer 4: Subtle vignette */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 4,
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
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
