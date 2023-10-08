'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  type AuthError,
  type SignInWithPasswordCredentials,
} from '@supabase/supabase-js';
import { Button } from '@ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/form';
import { Icons } from '@ui/icons';
import { Input } from '@ui/input';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { client } from '~/server/supabase/client';

import { ForgotPasswordDialog } from './forgot-password-dialog';

const formSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<AuthError | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const signInParams: SignInWithPasswordCredentials = {
        ...values,
      };

      const result = await client.auth.signInWithPassword(signInParams);

      // Check if the result contains an error
      if (result?.error) {
        setError(result.error);
        return;
      }

      if (Boolean(result.data)) {
        router.push('/dashboard');
      }
    });
  }

  return (
    <Card className='px-6 pb-6'>
      <CardHeader className='px-0'>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>This is where you sign in.</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='john.doe@acme.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='&#8226;&#8226;&#8226;&#8226;&#8226;'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='w-full' disabled={isPending} type='submit'>
            {isPending && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
            Sign in
          </Button>
        </form>
      </Form>
      <ForgotPasswordDialog label='I forgot my password.' />
      {error && (
        <p className='text-center text-sm font-medium text-destructive'>
          {error.message}
        </p>
      )}
    </Card>
  );
}

export { SignInForm };
