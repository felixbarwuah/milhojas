/**
 * Spaced Repetition System (FSRS - Free Spaced Repetition Scheduler)
 *
 * Uses ts-fsrs for scientifically-optimized review intervals (same algorithm as Anki).
 * Cards progress through states: New → Learning → Review (with Relearning on lapse).
 * Review intervals adapt based on card difficulty and user performance.
 */

import {
  fsrs,
  generatorParameters,
  createEmptyCard,
  Rating,
  State,
  type Card,
  type RecordLogItem,
} from 'ts-fsrs';

const STORAGE_KEY = 'milhojas-srs';
const BACKUP_KEY = 'milhojas-srs-backup-v1';
const XP_KEY = 'milhojas-xp';

// FSRS instance (singleton)
const params = generatorParameters({ maximum_interval: 365 });
const f = fsrs(params);

// ── Types ──

export interface FSRSCardState {
  card: Card;
  timesCorrect: number;
  timesWrong: number;
}

export interface SRSData {
  version: 2;
  cards: Record<string, FSRSCardState>;
}

export interface XPData {
  totalXP: number;
  todayXP: number;
  todayDate: string;
  streak: number;
  longestStreak: number;
  dailyGoal: number;
  history: { date: string; xp: number }[];
}

export interface SRSStats {
  newCount: number;
  learning: number;
  review: number;
  relearning: number;
  dueNow: number;
  unseen: number;
  total: number;
}

// Re-export for components
export { Rating, State };

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

/** Reconstruct Date objects from JSON strings in a Card */
function reviveCard(card: Card): Card {
  return {
    ...card,
    due: new Date(card.due),
    last_review: card.last_review ? new Date(card.last_review) : undefined,
  } as Card;
}

/** Revive all cards in SRSData after JSON.parse */
function reviveSRSData(data: SRSData): SRSData {
  const cards: Record<string, FSRSCardState> = {};
  for (const [id, state] of Object.entries(data.cards)) {
    cards[id] = {
      ...state,
      card: reviveCard(state.card),
    };
  }
  return { ...data, cards };
}

// ── Migration from Leitner ──

interface OldCardState {
  box: number;
  lastSeen: number;
  timesCorrect: number;
  timesWrong: number;
  sessionLastSeen: number;
}

interface OldSRSData {
  cards: Record<string, OldCardState>;
  sessionCount: number;
  lastSessionDate: string;
}

function isOldFormat(data: unknown): data is OldSRSData {
  return typeof data === 'object' && data !== null && !('version' in data) && 'cards' in data;
}

function migrateFromLeitner(old: OldSRSData): SRSData {
  const cards: Record<string, FSRSCardState> = {};
  const now = new Date();

  for (const [id, oldCard] of Object.entries(old.cards)) {
    const card = createEmptyCard(now);

    if (oldCard.box >= 4) {
      card.state = State.Review;
      card.stability = oldCard.box === 5 ? 30 : 15;
      card.reps = oldCard.timesCorrect;
      card.difficulty = 5;
    } else if (oldCard.box >= 2) {
      card.state = State.Learning;
      card.stability = oldCard.box * 2;
      card.reps = oldCard.timesCorrect;
      card.difficulty = 6;
    } else {
      card.state = oldCard.timesWrong > 0 ? State.Relearning : State.New;
      card.reps = oldCard.timesCorrect;
      card.lapses = oldCard.timesWrong;
    }

    if (oldCard.lastSeen > 0) {
      card.last_review = new Date(oldCard.lastSeen);
      const intervalDays = Math.pow(2, oldCard.box - 1);
      card.due = new Date(oldCard.lastSeen + intervalDays * 86400000);
    }

    cards[id] = {
      card,
      timesCorrect: oldCard.timesCorrect,
      timesWrong: oldCard.timesWrong,
    };
  }

  return { version: 2, cards };
}

// ── SRS Core ──

function defaultSRS(): SRSData {
  return { version: 2, cards: {} };
}

export function loadSRS(): SRSData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSRS();

    const parsed = JSON.parse(raw);

    // Migrate from old Leitner format
    if (isOldFormat(parsed)) {
      saveJSON(BACKUP_KEY, parsed); // backup old data
      const migrated = migrateFromLeitner(parsed);
      saveSRS(migrated);
      return migrated;
    }

    return reviveSRSData(parsed as SRSData);
  } catch {
    return defaultSRS();
  }
}

export function saveSRS(data: SRSData): void {
  saveJSON(STORAGE_KEY, data);
}

export function getCardState(srs: SRSData, cardId: string): FSRSCardState {
  if (srs.cards[cardId]) return srs.cards[cardId];
  return {
    card: createEmptyCard(new Date()),
    timesCorrect: 0,
    timesWrong: 0,
  };
}

/** Is this card due for review now? */
export function isDue(cardState: FSRSCardState): boolean {
  return cardState.card.due <= new Date();
}

/** Record a correct answer (Rating.Good) */
export function recordCorrect(srs: SRSData, cardId: string): SRSData {
  const state = getCardState(srs, cardId);
  const now = new Date();
  const scheduling = f.repeat(state.card, now);
  const result = (scheduling as any)[Rating.Good] as RecordLogItem;

  return {
    ...srs,
    cards: {
      ...srs.cards,
      [cardId]: {
        card: result.card,
        timesCorrect: state.timesCorrect + 1,
        timesWrong: state.timesWrong,
      },
    },
  };
}

/** Record a wrong answer (Rating.Again) */
export function recordWrong(srs: SRSData, cardId: string): SRSData {
  const state = getCardState(srs, cardId);
  const now = new Date();
  const scheduling = f.repeat(state.card, now);
  const result = (scheduling as any)[Rating.Again] as RecordLogItem;

  return {
    ...srs,
    cards: {
      ...srs.cards,
      [cardId]: {
        card: result.card,
        timesCorrect: state.timesCorrect,
        timesWrong: state.timesWrong + 1,
      },
    },
  };
}

/** Record answer with specific FSRS rating (for flashcard 4-button mode) */
export function recordAnswer(srs: SRSData, cardId: string, rating: Rating): SRSData {
  const state = getCardState(srs, cardId);
  const now = new Date();
  const scheduling = f.repeat(state.card, now);
  const result = (scheduling as any)[rating] as RecordLogItem;
  const isCorrect = rating !== Rating.Again;

  return {
    ...srs,
    cards: {
      ...srs.cards,
      [cardId]: {
        card: result.card,
        timesCorrect: state.timesCorrect + (isCorrect ? 1 : 0),
        timesWrong: state.timesWrong + (isCorrect ? 0 : 1),
      },
    },
  };
}

/** Get next review intervals for display (e.g. "1m", "10m", "1d", "3d") */
export function getSchedulingInfo(srs: SRSData, cardId: string): Record<Rating, string> {
  const state = getCardState(srs, cardId);
  const now = new Date();
  const scheduling = f.repeat(state.card, now);

  const formatInterval = (item: RecordLogItem): string => {
    const due = new Date(item.card.due);
    const diffMs = due.getTime() - now.getTime();
    const diffMin = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMin < 60) return `${Math.max(1, diffMin)}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 30) return `${diffDays}d`;
    return `${Math.round(diffDays / 30)}mo`;
  };

  return {
    [Rating.Again]: formatInterval((scheduling as any)[Rating.Again]),
    [Rating.Hard]: formatInterval((scheduling as any)[Rating.Hard]),
    [Rating.Good]: formatInterval((scheduling as any)[Rating.Good]),
    [Rating.Easy]: formatInterval((scheduling as any)[Rating.Easy]),
  } as Record<Rating, string>;
}

/** Start a new session (no-op for FSRS, kept for API compatibility) */
export function startSession(srs: SRSData): SRSData {
  return srs;
}

/** Get cards sorted by priority: due first (most overdue first), then by due date */
export function getDueCards(srs: SRSData, cardIds: string[]): string[] {
  const now = new Date();
  const due: { id: string; dueDate: number }[] = [];
  const notDue: { id: string; dueDate: number }[] = [];

  for (const id of cardIds) {
    const state = getCardState(srs, id);
    const dueTime = state.card.due.getTime();
    if (dueTime <= now.getTime()) {
      due.push({ id, dueDate: dueTime });
    } else {
      notDue.push({ id, dueDate: dueTime });
    }
  }

  due.sort((a, b) => a.dueDate - b.dueDate);
  notDue.sort((a, b) => a.dueDate - b.dueDate);

  return [...due.map(d => d.id), ...notDue.map(d => d.id)];
}

/** Get SRS stats for display */
export function getSRSStats(srs: SRSData, cardIds: string[]): SRSStats {
  const now = new Date();
  let newCount = 0, learning = 0, review = 0, relearning = 0, unseen = 0, dueNow = 0;

  for (const id of cardIds) {
    if (!srs.cards[id]) { unseen++; continue; }
    const state = srs.cards[id];
    const s = state.card.state;
    if (s === State.New) newCount++;
    else if (s === State.Learning) learning++;
    else if (s === State.Review) review++;
    else if (s === State.Relearning) relearning++;

    if (state.card.due <= now) dueNow++;
  }

  return { newCount, learning, review, relearning, dueNow, unseen, total: cardIds.length };
}

/** Get state label in German */
export function getStateLabel(state: State): string {
  switch (state) {
    case State.New: return 'Neu';
    case State.Learning: return 'Lernen';
    case State.Review: return 'Wiederholen';
    case State.Relearning: return 'Nochmal';
    default: return '';
  }
}

// ── XP & Streak (unchanged) ──

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

  // Day rollover
  if (data.todayDate !== d) {
    // Save yesterday's XP to history
    if (data.todayXP > 0) {
      data.history = [...data.history, { date: data.todayDate, xp: data.todayXP }].slice(-30);
    }

    // Calculate days since last activity
    const dayDiff = Math.floor(
      (new Date(d).getTime() - new Date(data.todayDate).getTime()) / 86400000
    );

    // Streak logic: only continues if yesterday's goal was met
    if (dayDiff === 1 && data.todayXP >= data.dailyGoal) {
      // Yesterday was active and goal was met - streak continues
      // (streak was already incremented when goal was reached via addXP)
    } else if (dayDiff > 1) {
      // Missed a day - streak broken
      data.streak = 0;
    } else if (data.todayXP < data.dailyGoal) {
      // Yesterday didn't meet goal - streak broken
      data.streak = 0;
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
