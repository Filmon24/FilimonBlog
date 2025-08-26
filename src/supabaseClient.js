import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
console.log(process.env.REACT_APP_SUPABASE_URL)
console.log("Supabase URL:", process.env.REACT_APP_SUPABASE_URL);
console.log("Supabase Key Loaded:", !!process.env.REACT_APP_SUPABASE_ANON_KEY);

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
