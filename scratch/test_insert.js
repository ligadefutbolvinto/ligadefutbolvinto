import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://flwrkxufkknrqbdlkvvp.supabase.co';
const supabaseKey = 'sb_publishable_DfAuK1SeqoO3ezIgdotLzg_mff0e7lB';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log("--- Testing Insert into jugadores ---");
  const testPlayer = {
    ci: '9999999',
    nombres: 'Test Player',
    apellidos: 'Sixers Test',
    fecha_nacimiento: '2000-01-01',
    foto_url: ''
  };

  const { data: jugData, error: jugErr } = await supabase
    .from('jugadores')
    .insert([testPlayer])
    .select();

  if (jugErr) {
    console.error("Insert jugadores failed:", jugErr);
  } else {
    console.log("Insert jugadores succeeded:", jugData);
  }

  console.log("\n--- Testing Insert into historial_participacion ---");
  // Sixers equipo_id is 36 (integer/bigint)
  const testParticipation = {
    jugador_ci: '9999999',
    equipo_id: 36,
    año: 2026,
    categoria_jugador: 'natural'
  };

  const { data: histData, error: histErr } = await supabase
    .from('historial_participacion')
    .insert([testParticipation])
    .select();

  if (histErr) {
    console.error("Insert historial_participacion failed:", histErr);
  } else {
    console.log("Insert historial_participacion succeeded:", histData);
  }

  // Clean up
  console.log("\n--- Cleaning Up ---");
  if (!histErr) {
    const { error: delHistErr } = await supabase.from('historial_participacion').delete().eq('jugador_ci', '9999999');
    console.log("Delete test participation:", delHistErr ? delHistErr.message : "OK");
  }
  if (!jugErr) {
    const { error: delJugErr } = await supabase.from('jugadores').delete().eq('ci', '9999999');
    console.log("Delete test player:", delJugErr ? delJugErr.message : "OK");
  }
}

testInsert();
