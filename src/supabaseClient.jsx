import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ytslsnglcrtjifncfuas.supabase.co"; 
const supabaseAnonKey = "sb_publishable_aZYVsoKWZ8aOXlaM3PyCZA_P2LKZP-R";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
