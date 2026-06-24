import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://flwrkxufkknrqbdlkvvp.supabase.co';
const supabaseKey = 'sb_publishable_DfAuK1SeqoO3ezIgdotLzg_mff0e7lB';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testSchema() {
  console.log("--- Testing 'jugadores' columns ---");
  const { error: jugErr } = await supabase
    .from('jugadores')
    .select('ci, nombres, apellidos, fecha_nacimiento, foto_url')
    .limit(1);
  console.log("jugadores columns check:", jugErr ? `FAILED: ${jugErr.code} - ${jugErr.message}` : "OK");

  console.log("\n--- Testing 'historial_participacion' columns ---");
  const { error: histErr } = await supabase
    .from('historial_participacion')
    .select('id, año, categoria_jugador, equipo_id, jugador_ci')
    .limit(1);
  console.log("historial_participacion columns check:", histErr ? `FAILED: ${histErr.code} - ${histErr.message}` : "OK");

  console.log("\n--- Testing 'delegados' columns ---");
  const { error: delErr } = await supabase
    .from('delegados')
    .select('user_id, username, equipo_id, nombre_completo')
    .limit(1);
  console.log("delegados columns check:", delErr ? `FAILED: ${delErr.code} - ${delErr.message}` : "OK");

  console.log("\n--- Testing 'equipos' columns ---");
  const { error: eqErr } = await supabase
    .from('equipos')
    .select('id, nombre')
    .limit(1);
  console.log("equipos columns check:", eqErr ? `FAILED: ${eqErr.code} - ${eqErr.message}` : "OK");

  console.log("\n--- Testing Roster Join ---");
  const { error: joinErr } = await supabase
    .from('historial_participacion')
    .select(`
        id,
        categoria_jugador,
        jugadores (
            ci,
            nombres,
            apellidos,
            fecha_nacimiento,
            foto_url
        )
    `)
    .limit(1);
  console.log("Roster join check:", joinErr ? `FAILED: ${joinErr.code} - ${joinErr.message}` : "OK");

  console.log("\n--- Testing Search Join ---");
  const { error: searchJoinErr } = await supabase
    .from('jugadores')
    .select(`
        ci,
        nombres,
        apellidos,
        fecha_nacimiento,
        foto_url,
        historial_participacion (
            id,
            año,
            categoria_jugador,
            equipos:equipos!historial_participacion_equipo_id_fkey (
                id,
                nombre
            )
        )
    `)
    .limit(1);
  console.log("Search join check:", searchJoinErr ? `FAILED: ${searchJoinErr.code} - ${searchJoinErr.message}` : "OK");
}

testSchema();
