import { getSession } from '~/server/supabase/server';

export default async function Dashboard({}: {
  params: {
    handle: string[];
    locale: string;
  };
}) {
  const data = await getSession();
  const email = data.session?.user.email;

  return <h1 className='m-auto max-w-sm'>zup, {email}</h1>;
}
