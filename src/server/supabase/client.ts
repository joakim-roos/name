import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { type Database } from './supabaseTypes';

export const client = createClientComponentClient<Database>();

export const getUserAsAdmin = async (token: string) => {
  const { data, error } = await client.auth.getUser(token);

  if (error) {
    throw error;
  }

  return data;
};

export const storageBucketsNames = {
  portfolioFiles: 'portfolio-files',
};
