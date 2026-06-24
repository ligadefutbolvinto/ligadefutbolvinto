import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://flwrkxufkknrqbdlkvvp.supabase.co';
const supabaseKey = 'sb_publishable_DfAuK1SeqoO3ezIgdotLzg_mff0e7lB';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debug() {
  console.log("=== DELEGADOS ===");
  const { data: delegados, error: delError } = await supabase.from('delegados').select('*');
  console.log(delegados || delError);

  console.log("\n=== EQUIPOS ===");
  const { data: equipos, error: eqError } = await supabase.from('equipos').select('*');
  console.log(equipos || eqError);

  console.log("\n=== HISTORIAL PARTICIPACION (2026) ===");
  const { data: historial, error: histError } = await supabase.from('historial_participacion').select('*').eq('año', 2026);
  console.log(historial || histError);

  console.log("\n=== JUGADORES ===");
  const { data: jugadores, error: jugError } = await supabase.from('jugadores').select('*');
  console.log(jugadores || jugError);
}

debug();
