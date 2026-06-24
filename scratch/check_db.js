import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://flwrkxufkknrqbdlkvvp.supabase.co';
const supabaseKey = 'sb_publishable_DfAuK1SeqoO3ezIgdotLzg_mff0e7lB';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("--- Checking Row Counts ---");
  
  const { count: delCount, error: delErr } = await supabase.from('delegados').select('*', { count: 'exact', head: true });
  console.log("Delegados count:", delCount, delErr ? delErr.message : "OK");

  const { count: eqCount, error: eqErr } = await supabase.from('equipos').select('*', { count: 'exact', head: true });
  console.log("Equipos count:", eqCount, eqErr ? eqErr.message : "OK");

  const { count: jugCount, error: jugErr } = await supabase.from('jugadores').select('*', { count: 'exact', head: true });
  console.log("Jugadores count:", jugCount, jugErr ? jugErr.message : "OK");

  const { count: histCount, error: histErr } = await supabase.from('historial_participacion').select('*', { count: 'exact', head: true });
  console.log("Historial Participación count:", histCount, histErr ? histErr.message : "OK");

  if (jugCount > 0) {
    const { data: jugs } = await supabase.from('jugadores').select('*').limit(5);
    console.log("Sample Jugadores:", jugs);
  }

  if (histCount > 0) {
    const { data: hists } = await supabase.from('historial_participacion').select('*').limit(5);
    console.log("Sample Historial Participación:", hists);
  }

  if (delCount > 0) {
    const { data: dels } = await supabase.from('delegados').select('*').limit(5);
    console.log("Sample Delegados:", dels);
  }
}

check();
