import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wizwmfatayuozhcbnuda.supabase.co";
const supabaseKey = "sb_publishable_hQuehWhyYTcJIlU4Y0T31w_uG5JQI-P";

export const supabase = createClient(supabaseUrl, supabaseKey);
