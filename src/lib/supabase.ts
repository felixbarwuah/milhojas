import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://naemnerrstssaijilqdf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hZW1uZXJyc3Rzc2FpamlscWRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MTAyNDQsImV4cCI6MjA4OTQ4NjI0NH0.QZ0ijACoZesnDFaFSQhMgFS6703g6-nPcHqoTWwtqc8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
