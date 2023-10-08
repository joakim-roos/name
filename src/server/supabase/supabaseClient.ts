import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { type Database } from './supabaseTypes';

// export const getServiceSupabase = () =>
//   createClient<Database>(
//     env.NEXT_PUBLIC_SUPABASE_URL,
//     env.SUPABASE_SERVICE_KEY,
//     {
//       auth: {
//         autoRefreshToken: false,
//         persistSession: false,
//       },
//     },
//   );

const clientSupabase = createClientComponentClient<Database>();

const serviceSupabase = () => createClientComponentClient<Database>();

export const supabase = () =>
  typeof window === 'undefined' ? serviceSupabase() : clientSupabase;

export const getUserAsAdmin = async (token: string) => {
  const { data, error } = await serviceSupabase().auth.getUser(token);

  if (error) {
    throw error;
  }

  return data;
};

export const storageBucketsNames = {
  portfolioFiles: 'portfolio-files',
};
