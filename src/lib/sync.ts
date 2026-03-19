/**
 * Sync logic between localStorage and Supabase
 * - On login: upload localStorage data to Supabase
 * - On app load (if logged in): download from Supabase
 * - localStorage remains the "hot" cache, Supabase is the backup
 */

import { supabase } from './supabase';

const SRS_KEY = 'milhojas-srs';
const XP_KEY = 'milhojas-xp';
const CUSTOM_VOCAB_KEY = 'milhojas-custom-vocab';


/** Upload current localStorage state to Supabase */
export async function uploadProgress(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  try {
    const xpRaw = localStorage.getItem(XP_KEY);
    const srsRaw = localStorage.getItem(SRS_KEY);
    const vocabRaw = localStorage.getItem(CUSTOM_VOCAB_KEY);

    const xp = xpRaw ? JSON.parse(xpRaw) : {};
    const srs = srsRaw ? JSON.parse(srsRaw) : {};
    const vocab = vocabRaw ? JSON.parse(vocabRaw) : [];

    const { error } = await supabase.from('user_progress').upsert({
      user_id: user.id,
      total_xp: xp.totalXP || 0,
      today_xp: xp.todayXP || 0,
      today_date: xp.todayDate || new Date().toISOString().slice(0, 10),
      streak: xp.streak || 0,
      longest_streak: xp.longestStreak || 0,
      daily_goal: xp.dailyGoal || 50,
      xp_history: xp.history || [],
      srs_data: srs,
      custom_vocab: vocab,
    }, { onConflict: 'user_id' });

    return !error;
  } catch {
    return false;
  }
}

/** Download progress from Supabase and write to localStorage */
export async function downloadProgress(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error || !data) return false;

    // Only overwrite localStorage if Supabase has more XP (newer data)
    const localXP = JSON.parse(localStorage.getItem(XP_KEY) || '{}');
    const remoteXP = data.total_xp || 0;
    const localTotal = localXP.totalXP || 0;

    if (remoteXP >= localTotal) {
      // Supabase has newer/more data - download it
      localStorage.setItem(XP_KEY, JSON.stringify({
        totalXP: data.total_xp,
        todayXP: data.today_xp,
        todayDate: data.today_date,
        streak: data.streak,
        longestStreak: data.longest_streak,
        dailyGoal: data.daily_goal,
        history: data.xp_history || [],
      }));

      if (data.srs_data && Object.keys(data.srs_data).length > 0) {
        localStorage.setItem(SRS_KEY, JSON.stringify(data.srs_data));
      }

      if (data.custom_vocab && data.custom_vocab.length > 0) {
        localStorage.setItem(CUSTOM_VOCAB_KEY, JSON.stringify(data.custom_vocab));
      }
    } else {
      // Local has more data - upload to Supabase
      await uploadProgress();
    }

    return true;
  } catch {
    return false;
  }
}

/** Get user's first name from Supabase */
export async function getUserName(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return user.user_metadata?.first_name || null;
}

/** Check if user is logged in */
export async function isLoggedIn(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}
