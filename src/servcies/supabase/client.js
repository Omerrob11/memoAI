import { createClient } from "@supabase/supabase-js";

// setting up a connection to supabase project
// export the connection to sore files, read/write to the database, handle authenticaiton
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, // where to connect
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // password to do the operation, to actuaaly connect
);

// what is supabase:
// storage - like google drive: we can update files, and store them safely, and download when we need it.
// Database: like excel but more powerfull, store information about pdf, store generated questions, store results
// authentication: like login with google, pepole can sign up log in and see only their files.
