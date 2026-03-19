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
    const timer = setTimeout(() => setShow(false), 2200);
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
              background: '#000',
            }}
          >
            {/* MILHOJAS text BEHIND the image (behind subject effect) */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}>
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                style={{
                  fontFamily: 'Impact, "Arial Black", sans-serif',
                  fontSize: 'clamp(60px, 20vw, 180px)',
                  fontWeight: 900,
                  color: 'white',
                  margin: 0,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  userSelect: 'none',
                }}
              >
                MILHOJAS
              </motion.h1>
            </div>

            {/* Chili photo ON TOP - fullscreen from the start, slow zoom out */}
            <motion.div
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
              }}
            >
              <img
                src="/images/splash-pwa.jpg"
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  mixBlendMode: 'normal',
                }}
              />
              {/* Cut out center area to reveal text behind - simulated with gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 80% 40% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
              }} />
            </motion.div>

            {/* Foreground MILHOJAS text (visible part) */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
              pointerEvents: 'none',
            }}>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
                style={{
                  fontFamily: 'Impact, "Arial Black", sans-serif',
                  fontSize: 'clamp(50px, 16vw, 140px)',
                  fontWeight: 900,
                  color: 'white',
                  margin: 0,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  textShadow: '0 4px 30px rgba(0,0,0,0.6)',
                }}
              >
                MILHOJAS
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!show && children}
      {show && <div style={{ display: 'none' }}>{children}</div>}
    </>
  );
}
