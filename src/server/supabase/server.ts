import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { type Database } from './supabaseTypes';

export const supabase = () => {
  const _cookies = cookies();
  return createServerComponentClient<Database>({
    cookies: () => _cookies,
  });
};

export const getSession = async () => {
  const { data, error } = await supabase().auth.getSession();
  if (error) {
    throw error;
  }
  return data;
};

export const getUserAsAdmin = async (token: string) => {
  const { data, error } = await supabase().auth.getUser(token);

  if (error) {
    throw error;
  }

  return data;
};

export const storageBucketsNames = {
  portfolioFiles: 'portfolio-files',
};
