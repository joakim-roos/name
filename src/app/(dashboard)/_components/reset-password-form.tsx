'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthError, type UserAttributes } from '@supabase/supabase-js';
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

const formSchema = z
  .object({
    email: z.string().email('Email is required.'),
    password: z.string().nonempty('Password is required'),
    repeatPassword: z.string().nonempty('This field is required'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords must match',
    path: ['repeatPassword'], // specify the field the error is attached to
  });

function ResetPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<AuthError | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const resetPasswordParams: UserAttributes = {
      email: values.email,
      password: values.password,
    };
    startTransition(async () => {
      try {
        const result = await client.auth.updateUser(resetPasswordParams, {
          emailRedirectTo: '/dashboard',
        });

        if (result?.error) {
          throw new Error(result.error.message);
        }

        router.push('/dashboard');
      } catch (error) {
        if (error instanceof AuthError) {
          setError(error);
        }
      }
    });
  }

  return (
    <Card className='px-6 pb-6'>
      <CardHeader className='px-0'>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Fill in your new password.</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
                <FormLabel>New Password</FormLabel>
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
          <FormField
            control={form.control}
            name='repeatPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat Password</FormLabel>
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
            Reset Password
          </Button>
        </form>
      </Form>

      {error && (
        <p className='text-center text-sm font-medium text-destructive'>
          {error.message}
        </p>
      )}
    </Card>
  );
}

export { ResetPasswordForm };
