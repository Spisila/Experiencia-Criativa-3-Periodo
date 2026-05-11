import { createClient } from '@supabase/supabase-js'

const supaURL = import.meta.env.VITE_SUPABASE_URL
const supaKEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supaURL) {
  throw new Error("supabase url nao encontrada")
}

if (!supaKEY) {
  throw new Error("supabase api key nao encontrada")
}

export const supabase = createClient(supaURL, supaKEY);