/**
 * Spaced Repetition System (Leitner-Box)
 *
 * Box 1: Review every session (new / wrong answers)
 * Box 2: Review every 2nd session
 * Box 3: Review every 4th session
 * Box 4: Review every 8th session
 * Box 5: Mastered (review every 16th session)
 *
 * Correct → move up one box
 * Wrong → back to box 1
 */

const STORAGE_KEY = 'milhojas-srs';
const XP_KEY = 'milhojas-xp';

export interface CardState {
  box: number;        // 1-5 (Leitner box)
  lastSeen: number;   // timestamp
  timesCorrect: number;
  timesWrong: number;
  sessionLastSeen: number; // session number when last reviewed
}

export interface SRSData {
  cards: Record<string, CardState>; // key = card id (e.g. "vocab:c01", "conj:hablar:presente:yo")
  sessionCount: number;
  lastSessionDate: string; // YYYY-MM-DD
}

export interface XPData {
  totalXP: number;
  todayXP: number;
  todayDate: string;   // YYYY-MM-DD
  streak: number;
  longestStreak: number;
  dailyGoal: number;   // default 50
  history: { date: string; xp: number }[]; // last 30 days
}

// ── Helpers ──

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveJSON<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

// ── SRS ──

function defaultSRS(): SRSData {
  return { cards: {}, sessionCount: 0, lastSessionDate: '' };
}

export function loadSRS(): SRSData {
  return loadJSON(STORAGE_KEY, defaultSRS());
}

export function saveSRS(data: SRSData): void {
  saveJSON(STORAGE_KEY, data);
}

export function getCardState(srs: SRSData, cardId: string): CardState {
  return srs.cards[cardId] || {
    box: 1,
    lastSeen: 0,
    timesCorrect: 0,
    timesWrong: 0,
    sessionLastSeen: 0,
  };
}

/** Should this card be reviewed in the current session? */
export function isDue(card: CardState, sessionCount: number): boolean {
  if (card.sessionLastSeen === 0) return true; // never seen
  const interval = Math.pow(2, card.box - 1); // box1=1, box2=2, box3=4, box4=8, box5=16
  return (sessionCount - card.sessionLastSeen) >= interval;
}

/** Record a correct answer */
export function recordCorrect(srs: SRSData, cardId: string): SRSData {
  const card = getCardState(srs, cardId);
  return {
    ...srs,
    cards: {
      ...srs.cards,
      [cardId]: {
        ...card,
        box: Math.min(card.box + 1, 5),
        lastSeen: Date.now(),
        timesCorrect: card.timesCorrect + 1,
        sessionLastSeen: srs.sessionCount,
      },
    },
  };
}

/** Record a wrong answer - back to box 1 */
export function recordWrong(srs: SRSData, cardId: string): SRSData {
  const card = getCardState(srs, cardId);
  return {
    ...srs,
    cards: {
      ...srs.cards,
      [cardId]: {
        ...card,
        box: 1,
        lastSeen: Date.now(),
        timesWrong: card.timesWrong + 1,
        sessionLastSeen: srs.sessionCount,
      },
    },
  };
}

/** Start a new session (call once when user begins a quiz) */
export function startSession(srs: SRSData): SRSData {
  const d = today();
  const isNewDay = srs.lastSessionDate !== d;
  return {
    ...srs,
    sessionCount: srs.sessionCount + 1,
    lastSessionDate: d,
  };
}

/** Get cards sorted by priority: due first, then by box (lower = higher priority) */
export function getDueCards(srs: SRSData, cardIds: string[]): string[] {
  const session = srs.sessionCount;
  const due: { id: string; card: CardState; priority: number }[] = [];
  const notDue: { id: string; card: CardState; priority: number }[] = [];

  for (const id of cardIds) {
    const card = getCardState(srs, id);
    const d = isDue(card, session);
    const priority = card.box * 100 - card.timesWrong; // lower box = higher priority
    if (d) due.push({ id, card, priority });
    else notDue.push({ id, card, priority });
  }

  // Sort due by priority (box 1 first, then more errors first)
  due.sort((a, b) => a.priority - b.priority);
  notDue.sort((a, b) => a.priority - b.priority);

  return [...due.map(d => d.id), ...notDue.map(d => d.id)];
}

/** Get stats for progress display */
export function getSRSStats(srs: SRSData, cardIds: string[]) {
  let box1 = 0, box2 = 0, box3 = 0, box4 = 0, box5 = 0, unseen = 0;
  for (const id of cardIds) {
    const card = getCardState(srs, id);
    if (card.sessionLastSeen === 0) { unseen++; continue; }
    if (card.box === 1) box1++;
    else if (card.box === 2) box2++;
    else if (card.box === 3) box3++;
    else if (card.box === 4) box4++;
    else box5++;
  }
  return { box1, box2, box3, box4, box5, unseen, total: cardIds.length };
}

// ── XP & Streak ──

function defaultXP(): XPData {
  return {
    totalXP: 0,
    todayXP: 0,
    todayDate: today(),
    streak: 0,
    longestStreak: 0,
    dailyGoal: 50,
    history: [],
  };
}

export function loadXP(): XPData {
  const data = loadJSON(XP_KEY, defaultXP());
  const d = today();

  // Roll over to new day
  if (data.todayDate !== d) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    // Save yesterday's XP to history
    if (data.todayXP > 0) {
      data.history = [...data.history, { date: data.todayDate, xp: data.todayXP }].slice(-30);
    }

    // Check streak: did they meet the goal yesterday?
    if (data.todayDate === yesterdayStr && data.todayXP >= data.dailyGoal) {
      data.streak += 1;
    } else if (data.todayXP < data.dailyGoal) {
      // Streak broken (unless they just opened the app today without playing yesterday)
      const dayDiff = Math.floor((new Date(d).getTime() - new Date(data.todayDate).getTime()) / 86400000);
      if (dayDiff > 1) {
        data.streak = 0;
      } else if (data.todayXP >= data.dailyGoal) {
        data.streak += 1;
      } else {
        data.streak = 0;
      }
    }

    data.longestStreak = Math.max(data.longestStreak, data.streak);
    data.todayXP = 0;
    data.todayDate = d;
    saveJSON(XP_KEY, data);
  }

  return data;
}

export function addXP(amount: number): XPData {
  const data = loadXP();
  data.totalXP += amount;
  data.todayXP += amount;

  // Check if daily goal just reached
  if (data.todayXP >= data.dailyGoal && (data.todayXP - amount) < data.dailyGoal) {
    data.streak += 1;
    data.longestStreak = Math.max(data.longestStreak, data.streak);
  }

  saveJSON(XP_KEY, data);
  return data;
}

export function getXPProgress(xp: XPData): number {
  return Math.min(1, xp.todayXP / xp.dailyGoal);
}
