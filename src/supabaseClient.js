import { createClient } from '@supabase/supabase-js';

// Obtém as variáveis de ambiente do Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validação para garantir que as variáveis foram carregadas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Erro: Variáveis de ambiente Supabase (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) não estão definidas.");
  throw new Error("Configuração do Supabase ausente. Verifique o arquivo .env");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);