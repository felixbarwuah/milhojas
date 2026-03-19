import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const SPLASH_KEY = 'milhojas-splash-seen';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
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
            transition={{ duration: 0.4 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: '#FFF8F2',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
            }}
          >
            {/* Chili Image */}
            <motion.img
              src="/images/splash-chili.jpg"
              alt=""
              initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
              animate={{
                opacity: 1,
                scale: [0.5, 1.1, 1],
                rotate: [-15, 5, 0],
              }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{
                width: '50vmin',
                maxWidth: 280,
                height: 'auto',
                filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.12))',
              }}
            />

            {/* Wiggle after landing */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
              style={{ textAlign: 'center' }}
            >
              <motion.h1
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ delay: 1.2, duration: 0.4 }}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 'clamp(32px, 7vw, 48px)',
                  fontWeight: 800,
                  color: '#1A1A1A',
                  margin: 0,
                }}
              >
                Milhojas
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 15,
                  color: '#6B6560',
                  marginTop: 6,
                }}
              >
                Deine neue Spanischlernapp
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!show && children}
      {show && <div style={{ display: 'none' }}>{children}</div>}
    </>
  );
}
