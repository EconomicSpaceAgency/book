import { createClient } from '@supabase/supabase-js';

let supabaseInstance = null;

function initiateSupabase(){
  if(!supabaseInstance){
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_API_KEY);
  }

  return supabaseInstance;
}

export { initiateSupabase }
