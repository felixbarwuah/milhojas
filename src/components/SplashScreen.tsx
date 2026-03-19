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
            {/* Fullscreen chili photo with slow zoom */}
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
                zIndex: 1,
              }}
            />

            {/* Dark overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.5) 100%)',
              zIndex: 2,
            }} />

            {/* MILHOJAS text - single line, big, top area */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: '12%',
                left: 0,
                right: 0,
                textAlign: 'center',
                zIndex: 3,
              }}
            >
              <h1 style={{
                fontFamily: 'Impact, "Arial Black", sans-serif',
                fontSize: 'clamp(48px, 14vw, 120px)',
                fontWeight: 900,
                color: 'white',
                margin: 0,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                lineHeight: 1,
                whiteSpace: 'nowrap',
                textShadow: '0 2px 20px rgba(0,0,0,0.4)',
              }}>
                MILHOJAS
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!show && children}
      {show && <div style={{ display: 'none' }}>{children}</div>}
    </>
  );
}
