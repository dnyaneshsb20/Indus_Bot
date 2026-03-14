import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zicgpzsoufnmaomotuno.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppY2dwenNvdWZubWFvbW90dW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMjg1NjAsImV4cCI6MjA4ODYwNDU2MH0.t8WeSlR0HqvPV7V3lTRYEgjZVCz23s7RwkW00fRL_hc";

export const supabase = createClient(supabaseUrl, supabaseKey);