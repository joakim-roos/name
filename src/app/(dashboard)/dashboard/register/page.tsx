'use client';

import { RegisterForm } from '../../_components/register-form';

export default function Account({}: {
  params: {
    handle: string[];
    locale: string;
  };
}) {
  return (
    <div className='m-auto max-w-sm'>
      <RegisterForm />
    </div>
  );
}
