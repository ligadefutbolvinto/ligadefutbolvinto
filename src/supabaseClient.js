import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://flwrkxufkknrqbdlkvvp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_DfAuK1SeqoO3ezIgdotLzg_mff0e7lB';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
