import { motion } from 'motion/react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 16 },
  },
};

/**
 * Animated hero section. This is an Astro "island" — it ships JS only for this
 * component (loaded via client:load in index.astro), keeping the rest static.
 */
export default function Hero() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '1.25rem',
      }}
    >
      <motion.p
        variants={item}
        style={{ margin: 0, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.85rem' }}
      >
        Hi, I'm
      </motion.p>

      <motion.h1
        variants={item}
        style={{
          margin: 0,
          fontSize: 'clamp(2.75rem, 8vw, 5.5rem)',
          lineHeight: 1.05,
          fontWeight: 800,
          background: 'linear-gradient(120deg, var(--accent), var(--accent-2))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Chris Parcel
      </motion.h1>

      <motion.p
        variants={item}
        style={{ margin: 0, fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'var(--fg)', maxWidth: '38rem' }}
      >
        Builder of things. This site is a work in progress — the animation you
        just saw is Motion running as an Astro island.
      </motion.p>

      <motion.div variants={item} style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
        <motion.a
          href="#about"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '0.7rem 1.4rem',
            borderRadius: '999px',
            background: 'var(--accent)',
            color: 'white',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Learn more
        </motion.a>
      </motion.div>
    </motion.section>
  );
}
