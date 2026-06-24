import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://flwrkxufkknrqbdlkvvp.supabase.co';
const supabaseKey = 'sb_publishable_DfAuK1SeqoO3ezIgdotLzg_mff0e7lB';

export const supabase = createClient(supabaseUrl, supabaseKey);
