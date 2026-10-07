import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

let warnedAboutMissingSupabaseConfig = false;

export async function initializeCounter() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    if (!warnedAboutMissingSupabaseConfig) {
      console.warn(
        "El contador de visitas está desactivado. Configura VITE_SUPABASE_URL y VITE_SUPABASE_KEY en .env.local."
      );
      warnedAboutMissingSupabaseConfig = true;
    }
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  try {
    // Insertar nueva visita
    await supabase.from("visits").insert([{ page: "/" }]);

    // Contar total de visitas
    const { count, error } = await supabase
      .from("visits")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    const counterElement = document.querySelector(".counter");
    if (counterElement) {
      counterElement.textContent = `Visitas: ${count || 0}`;
    }
  } catch (error) {
    console.error("Error al actualizar contador:", error);
  }
}