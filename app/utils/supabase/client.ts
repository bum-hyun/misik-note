import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const getSupabaseBrowserClient = () => createBrowserClient(supabaseUrl, supabaseAnonKey);
