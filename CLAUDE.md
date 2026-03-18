# Milhojas - Spanisch lernen mit Felix

## Overview
PWA Spanish learning app for German speakers. Solo app, no backend, no auth, no costs.

**Live URL:** https://milhojas.pages.dev/
**GitHub:** https://github.com/felixbarwuah/milhojas
**Dev Server:** localhost:4322

## Owner
Felix Kleiner (felixbarwuah)

## Stack
- **Framework:** Astro 5 + React 19
- **Styling:** Pure CSS (no Tailwind, no framework)
- **SRS:** ts-fsrs (FSRS algorithm, same as Anki) in localStorage
- **Speech:** Web Speech API (TTS + STT, no backend)
- **Dictionary:** Wiktionary API (es.wiktionary.org)
- **Hosting:** Cloudflare Pages (auto-deploy on push not configured, manual: `wrangler pages deploy dist --project-name milhojas`)
- **PWA:** manifest.json + sw.js (network-first for HTML, cache-first for assets)
- **Tests:** Playwright E2E (27 smoke tests)
- **Fonts:** Outfit + Space Mono (self-hosted WOFF2)

## Architecture

### Repo Structure
```
milhojas/
├── src/
│   ├── pages/
│   │   ├── index.astro           # Landing (8 mode cards + dashboard)
│   │   ├── karteikarten/         # Flashcards (SRS)
│   │   ├── schreiben/            # Write mode (type translation)
│   │   ├── vocabulario/          # Vocab quiz (multiple choice)
│   │   ├── conjugacion/          # Conjugation quiz
│   │   ├── lesen/                # Reading comprehension
│   │   ├── grammatik/            # Grammar lessons + exercises
│   │   ├── fakten/               # Facts quiz (Chile, Spain, language)
│   │   └── texte/                # Cloze (fill-in-the-blank)
│   ├── components/
│   │   ├── Flashcards.tsx        # Flashcard mode
│   │   ├── WriteMode.tsx         # Write translation mode
│   │   ├── VocabTrainer.tsx      # Multiple choice vocab
│   │   ├── ConjugationQuiz.tsx   # Verb conjugation
│   │   ├── ReadingQuiz.tsx       # Reading comprehension
│   │   ├── GrammarQuiz.tsx       # Grammar lessons
│   │   ├── FactsQuiz.tsx         # Facts quiz
│   │   ├── ClozeQuiz.tsx         # Fill-in-the-blank
│   │   ├── Dashboard.tsx         # XP + Streak display
│   │   ├── SpeakButton.tsx       # TTS speaker icon
│   │   ├── LevelFilter.tsx       # A1/A2/B1 toggle
│   │   ├── InstallPrompt.tsx     # PWA install banner
│   │   ├── ErrorBoundary.tsx     # React error boundary
│   │   └── QuizShell.tsx         # Shared quiz components
│   ├── data/
│   │   ├── vocab.ts              # 615 words, 16 categories
│   │   ├── conjugations.ts       # 35 verbs, 3 tenses
│   │   ├── grammar.ts            # 8 lessons (A1/A2)
│   │   ├── reading.ts            # 12 reading texts
│   │   ├── cloze.ts              # 30 cloze exercises
│   │   ├── facts.ts              # 22 facts
│   │   ├── srs.ts                # FSRS engine + XP/Streak
│   │   ├── speech.ts             # Web Speech API utility
│   │   ├── dictionary.ts         # Wiktionary API client
│   │   └── custom-vocab.ts       # User-added words
│   └── layouts/
│       └── BaseLayout.astro      # Shared layout (header, footer, SW)
├── public/
│   ├── styles/
│   │   ├── global.css            # Design tokens, base styles
│   │   └── quiz.css              # All quiz/component styles
│   ├── fonts/                    # Self-hosted WOFF2
│   ├── icons/                    # PWA icons (chili photo)
│   ├── sw.js                     # Service worker
│   ├── manifest.json             # PWA manifest
│   └── robots.txt
├── tests/
│   └── smoke.spec.ts             # Playwright E2E tests
├── playwright.config.ts
└── CLAUDE.md
```

## Design System

### Philosophy
Light editorial theme with Chilean accent colors. Clean, minimal, no decoration. Like a premium language textbook that happens to be an app.

### Colors
```css
--bg: #FFF8F2;              /* warm beige background */
--bg-card: #FFFFFF;          /* card backgrounds */
--text: #1A1A1A;            /* primary text */
--text-secondary: #4A4540;   /* secondary text */
--text-muted: #6B6560;       /* muted text (WCAG AA) */
--accent: #D52B1E;           /* Chile red - primary accent */
--accent-blue: #0039A6;      /* Chile blue - secondary */
--correct: #16A34A;          /* green for correct answers */
--wrong: #D52B1E;            /* red for wrong answers */
```

### Level Colors (einheitlich in der ganzen App)
```css
--level-a1: #16A34A;   /* green */
--level-a2: #0039A6;   /* blue */
--level-b1: #9333EA;   /* purple */
```

### Typography
- **Outfit** (400, 600, 700, 800): All text
- **Space Mono** (400, 700): Labels, meta info, monospace
- text-wrap: balance (gleichmäßige Zeilenbreite)
- hyphens: none (keine Silbentrennung)

### Buttons
- Ghost/outline style, no filled buttons
- No hover color change on answer option buttons
- Uppercase, 13px, weight 600

### Cards
- White background, subtle border
- Border-radius: 6px
- Hover: slightly stronger border + shadow

## Key Conventions
- **Keine em dashes** - normale Hyphens oder Satz umschreiben
- **Echte Umlaute** (ö, ä, ü, ß) - niemals ASCII-Ersatz
- **UI auf Deutsch** - Beschriftungen, Buttons, Erklärungen auf Deutsch
- **Content auf Spanisch/Deutsch** - Vokabeln ES→DE, Grammatikerklärungen auf Deutsch
- **Kein Hover-Farbwechsel** bei Antwort-Buttons
- **Level-Badges** immer mit einheitlichen Farben (A1 grün, A2 blau, B1 lila)
- **ErrorBoundary** um alle React-Komponenten-Returns

## Data Model

### Vocab (src/data/vocab.ts)
```ts
interface VocabWord {
  id: string;          // e.g. "c01", "a2vb05"
  es: string;          // Spanish word/phrase
  de: string;          // German translation
  category: VocabCategory;  // 16 categories
  difficulty: 'easy' | 'medium' | 'hard';
  level?: 'A1' | 'A2' | 'B1';  // optional, undefined = A1
  example?: string;
}
```

### SRS (src/data/srs.ts)
- Uses ts-fsrs library (FSRS algorithm)
- Cards stored in localStorage as `milhojas-srs`
- XP + Streak in `milhojas-xp`
- Migration from old Leitner format is automatic
- Key functions: loadSRS, saveSRS, recordCorrect, recordWrong, getDueCards, getSRSStats

## Deploy
```bash
npm run build && wrangler pages deploy dist --project-name milhojas
```

## Test
```bash
npm test          # Playwright E2E (27 tests)
npm run check     # TypeScript check
npm run build     # Build (should be <1s)
```
