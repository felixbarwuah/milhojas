import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', title: 'Milhojas', heading: 'Milhojas' },
  { path: '/karteikarten/', title: 'Karteikarten', heading: 'Spaced Repetition' },
  { path: '/schreiben/', title: 'Schreiben', heading: 'Aktiv Erinnern' },
  { path: '/vocabulario/', title: 'Vokabel-Quiz', heading: 'Multiple Choice' },
  { path: '/conjugacion/', title: 'Konjugation', heading: 'Verben-Quiz' },
  { path: '/lesen/', title: 'Leseverständnis', heading: 'Leseverständnis' },
  { path: '/grammatik/', title: 'Grammatik', heading: 'Regeln und Übungen' },
  { path: '/fakten/', title: 'Fakten', heading: 'Fakten-Quiz' },
  { path: '/texte/', title: 'Lückentext', heading: 'Sätze vervollständigen' },
];

// ─── Smoke Tests: All pages load ───

for (const page of pages) {
  test(`${page.path} loads with correct title`, async ({ page: p }) => {
    await p.goto(page.path);
    await expect(p).toHaveTitle(new RegExp(page.title));
  });
}

// ─── Navigation ───

test('logo links to home', async ({ page }) => {
  await page.goto('/karteikarten/');
  await page.click('.logo');
  await expect(page).toHaveURL('/');
});

test('home button visible on subpages', async ({ page }) => {
  await page.goto('/vocabulario/');
  await expect(page.locator('.home-btn')).toBeVisible();
});

test('home button hidden on landing page', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.home-btn')).not.toBeVisible();
});

// ─── Landing Page ───

test('landing page shows all mode cards', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('.mode-card');
  await expect(cards).toHaveCount(8);
});

test('landing page shows stats bar', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.stats-bar')).toBeVisible();
});

// ─── Vocab Quiz ───

test('vocab quiz: can start and see question', async ({ page }) => {
  await page.goto('/vocabulario/');
  await page.click('.start-btn');
  await expect(page.locator('.question-card')).toBeVisible();
  await expect(page.locator('.options-grid')).toBeVisible();
});

test('vocab quiz: can answer question', async ({ page }) => {
  await page.goto('/vocabulario/');
  await page.click('.start-btn');
  await page.click('.option-btn >> nth=0');
  await expect(page.locator('.result-bar')).toBeVisible();
});

// ─── Conjugation Quiz ───

test('conjugation quiz: can start', async ({ page }) => {
  await page.goto('/conjugacion/');
  await page.click('.start-btn');
  await expect(page.locator('.question-card')).toBeVisible();
  await expect(page.locator('.conjugation-input')).toBeVisible();
});

// ─── Flashcards ───

test('flashcards: can start and flip card', async ({ page }) => {
  await page.goto('/karteikarten/');
  await page.click('.start-btn');
  await expect(page.locator('.flashcard')).toBeVisible();
  await page.click('.flashcard');
  await expect(page.locator('.flashcard-actions')).toBeVisible();
});

// ─── Cloze ───

test('cloze quiz: can start and see blank', async ({ page }) => {
  await page.goto('/texte/');
  await page.click('.start-btn');
  await expect(page.locator('.cloze-sentence')).toBeVisible();
  await expect(page.locator('.cloze-blank')).toBeVisible();
});

// ─── Grammar ───

test('grammar: shows topic cards', async ({ page }) => {
  await page.goto('/grammatik/');
  const topics = page.locator('.grammar-topic-card');
  const count = await topics.count();
  expect(count).toBeGreaterThan(0);
});

test('grammar: can select topic and read lesson', async ({ page }) => {
  await page.goto('/grammatik/');
  await page.click('.grammar-topic-card >> nth=0');
  await expect(page.locator('.grammar-explanation')).toBeVisible();
});

// ─── Reading ───

test('reading: can start and see text', async ({ page }) => {
  await page.goto('/lesen/');
  await page.click('.start-btn');
  await expect(page.locator('.reading-text')).toBeVisible();
});

// ─── Facts ───

test('facts: can start and see fact text', async ({ page }) => {
  await page.goto('/fakten/');
  await page.click('.start-btn');
  await expect(page.locator('.question-card')).toBeVisible();
});

// ─── PWA ───

test('manifest.json is accessible', async ({ page }) => {
  const response = await page.goto('/manifest.json');
  expect(response?.status()).toBe(200);
  const json = await response?.json();
  expect(json.name).toContain('Milhojas');
});

test('service worker is registered', async ({ page }) => {
  await page.goto('/');
  const swURL = await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.getRegistration();
    return reg?.active?.scriptURL || reg?.installing?.scriptURL || null;
  });
  expect(swURL).toContain('sw.js');
});

// ─── Mobile ───

test('chile stripe visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.chile-stripe')).toBeVisible();
});

test('no horizontal overflow', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  expect(overflow).toBe(false);
});
