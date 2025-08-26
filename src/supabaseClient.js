import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://sykdllxqhzeddnnnvbmm.supabase.co"  


const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5a2RsTHhxaHplZGRubm52Ym1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ3NjU4NjMsImV4cCI6MjA0MDM0MTg2M30.00-0000000000000000000000000000000000000000"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
