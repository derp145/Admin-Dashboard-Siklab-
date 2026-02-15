import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://auueomffeyxzvftrfzco.supabase.co";
const supabaseAnonKey = "sb_publishable_HZvPxGVHly3etljTjribTQ_W6bQyjHi";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
